// HDRezka plugin for Lampa.mx
// Simple search + source extraction (falls back to browser fetch)

const HD_HOST = 'https://hdrezka.co';

async function hd_fetchText(url, opts = {}) {
  if (typeof Lampa !== 'undefined' && typeof Lampa.Reguest === 'function') {
    return await new Promise((resolve, reject) => {
      try {
        const net = new Lampa.Reguest();
        if (net.clear) net.clear();
        if (net.timeout) net.timeout(opts.timeout || 15000);
        net.silent(url, function(res) {
          if (typeof res === 'string') return resolve(res);
          if (res && typeof res === 'object') {
            if (typeof res.data === 'string') return resolve(res.data);
            if (typeof res.html === 'string') return resolve(res.html);
            try { return resolve(JSON.stringify(res)); } catch (e) { return resolve(''); }
          }
          resolve('');
        }, function(a, c) {
          reject(new Error('Network error'));
        }, opts.params || {});
      } catch (e) {
        reject(e);
      }
    });
  }

  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return await res.text();
}

function hd_uniq(arr) { return Array.from(new Set(arr)); }

async function hd_searchByName(name) {
  const q = encodeURIComponent(name);
  // HDRezka supports a search endpoint; try common pattern
  const url = `${HD_HOST}/search/?do=search&subaction=search&q=${q}`;
  const html = await hd_fetchText(url);

  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi;
  const candidates = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    let href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (!href) continue;
    if (href.startsWith('/')) href = HD_HOST + href;
    if (!href.startsWith('http')) href = HD_HOST + '/' + href.replace(/^\//, '');
    const tn = text.toLowerCase();
    const nn = name.toLowerCase();
    if (tn.includes(nn) || nn.split(' ').every(w => w.length>2 ? tn.includes(w) : true)) {
      candidates.push({href, text});
    }
  }

  if (!candidates.length) {
    const alt = html.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/i);
    if (alt) {
      let href = alt[1];
      if (href.startsWith('/')) href = HD_HOST + href;
      if (!href.startsWith('http')) href = HD_HOST + '/' + href.replace(/^\//, '');
      candidates.push({href, text: name});
    }
  }
  console.log('HDRezka', 'candidates', candidates);
  return candidates.map(c => c.href);
}

function hd_extractSourcesFromHtml(html) {
  const urls = [];
  const ifr = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (ifr) urls.push(ifr[1]);

  const fileRe = /file\s*["']?\s*[:=]\s*["'](https?:\/\/[^"'\\s]+)["']/gi;
  let m;
  while ((m = fileRe.exec(html)) !== null) urls.push(m[1].replace(/\\/g, ''));

  const directRe = /(https?:\/\/[^"'<>\\s]+\.(?:m3u8|mp4|webm)(?:\?[^"'\\s<>]*)?)/gi;
  while ((m = directRe.exec(html)) !== null) urls.push(m[1]);

  const srcArr = html.match(/sources\s*:\s*(\[[^\]]+\])/i) || html.match(/\"sources\"\s*:\s*(\[[^\]]+\])/i);
  if (srcArr) {
    try {
      const parsed = JSON.parse(srcArr[1].replace(/(['"])?([a-zA-Z0-9_]+)\1?\s*:/g, '"$2":'));
      if (Array.isArray(parsed)) parsed.forEach(s => { if (s && s.file) urls.push(s.file); if (s && s.src) urls.push(s.src); });
    } catch (e) {}
  }

  return hd_uniq(urls).map(u => u.replace(/\\/g, ''));
}

async function hd_resolveMovieByName(name) {
  const candidates = await hd_searchByName(name);
  for (const link of candidates) {
    try {
      const page = await hd_fetchText(link);
      const sources = hd_extractSourcesFromHtml(page);
      if (sources.length) return {link, sources};
    } catch (e) {
      // continue
    }
  }
  return null;
}

(function(exports){
  if (typeof module !== 'undefined' && module.exports) module.exports = exports;
  else if (typeof define === 'function' && define.amd) define(function(){ return exports; });
  else if (typeof window !== 'undefined') { window.hdrezka = exports; if (window.lampa && typeof window.lampa.addPlugin === 'function') try{ window.lampa.addPlugin(exports); }catch(e){} }
  else if (typeof globalThis !== 'undefined') globalThis.hdrezka = exports;
})({
  id: 'hdrezka',
  title: 'HDRezka',
  version: '1.0',

  play: async function(item, done) {
    try {
      const name = (item && (item.title || item.name || item.title_ru)) || '';
      if (!name) return done([]);
      const found = await hd_resolveMovieByName(name);
      if (!found) return done([]);
      const out = found.sources.map(u => ({ title: this.title, url: u, type: u.includes('.m3u8') ? 'hls' : 'mp4' }));
      done(out);
    } catch (e) { done([]); }
  }
});

// minimal runner: capture full card data and expose getter
(function(){
  var fullData = {};
  function startPlugin(){
    if (typeof Lampa === 'undefined' || !Lampa.Listener) return;
    Lampa.Listener.follow('full', function (e) { 
        if (e.type == 'complite') { 
            fullData = e; 
            try{ 
                window.hdrezka_full = fullData; 
            } catch(e){} 
            console.log('[HDRezka] full captured'); 
        } 
    });
    try { 
        if (window && window.hdrezka) window.hdrezka.getFullData = function(){ return fullData; }; 
    } catch(e) {}
  }
  if (window && window.appready) startPlugin(); 
  else if (typeof Lampa !== 'undefined' && Lampa.Listener) startPlugin(); 
    else if (typeof Lampa !== 'undefined') Lampa.Listener.follow('app', function(ev){ 
        if (ev.type=='ready') startPlugin(); 
}); 
else if (document && document.addEventListener) document.addEventListener('DOMContentLoaded', startPlugin);
})();
