// LordFilm plugin for Lampa.mx
// Attempts to find a film on https://vo.lordfilm135.ru by name
// and extract playable video sources when the user presses Play.

const HOST = 'https://vo.lordfilm135.ru';

async function fetchText(url, opts = {}) {
  // Prefer Lampa native request (bypasses CORS in host app) when available
  if (typeof Lampa !== 'undefined' && typeof Lampa.Reguest === 'function') {
    return await new Promise((resolve, reject) => {
      try {
        const net = new Lampa.Reguest();
        if (net.clear) net.clear();
        if (net.timeout) net.timeout(opts.timeout || 15000);
        net.silent(url, function(res) {
          // `silent` may return parsed JSON or raw text
          if (typeof res === 'string') return resolve(res);
          if (res && typeof res === 'object') {
            // try common properties
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

  // Fallback to browser fetch (will be blocked by CORS if remote doesn't allow it)
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return await res.text();
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

async function searchByName(name) {
  console.log('Lordfilm', `Searching for "${name}"...`);
  const q = encodeURIComponent(name);
  const url = `${HOST}/index.php?do=search&subaction=search&story=${q}`;
  const html = await fetchText(url);

  // Find candidate links (relative or absolute)
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi;
  const candidates = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    let href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (!href) continue;
    if (href.startsWith('/')) href = HOST + href;
    if (!href.startsWith('http')) href = HOST + '/' + href.replace(/^\//, '');
    // Heuristic: candidate link that contains words from the name
    const tn = text.toLowerCase();
    const nn = name.toLowerCase();
    if (tn.includes(nn) || nn.split(' ').every(w => w.length>2 ? tn.includes(w) : true)) {
      candidates.push({href, text});
    }
  }

  // fallback: try to extract first result link from search results
  if (candidates.length === 0) {
    const alt = html.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/i);
    if (alt) {
      let href = alt[1];
      if (href.startsWith('/')) href = HOST + href;
      if (!href.startsWith('http')) href = HOST + '/' + href.replace(/^\//, '');
      candidates.push({href, text: name});
    }
  }
  console.log('Lordfilm', 'candidates', candidates);
  return candidates.map(c => c.href);
}

function extractSourcesFromHtml(html) {
  const urls = [];

  // iframe src
  const ifr = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (ifr) urls.push(ifr[1]);

  // JSON-like file: 'file':'https://...'
  const fileRe = /file\s*["']?\s*[:=]\s*["'](https?:\/\/[^"'\\s]+)["']/gi;
  let m;
  while ((m = fileRe.exec(html)) !== null) {
    urls.push(m[1].replace(/\\/g, ''));
  }

  // direct links to .m3u8/.mp4/webm
  const directRe = /(https?:\/\/[^"'<>\\s]+\.(?:m3u8|mp4|webm)(?:\?[^"'\\s<>]*)?)/gi;
  while ((m = directRe.exec(html)) !== null) {
    urls.push(m[1]);
  }

  // sources array patterns: "sources": [ ... ]
  const srcArr = html.match(/sources\s*:\s*(\[[^\]]+\])/i) || html.match(/\"sources\"\s*:\s*(\[[^\]]+\])/i);
  if (srcArr) {
    try {
      const parsed = JSON.parse(srcArr[1].replace(/(['"])?([a-zA-Z0-9_]+)\1?\s*:/g, '"$2":'));
      if (Array.isArray(parsed)) {
        parsed.forEach(s => {
          if (s && s.file) urls.push(s.file);
          if (s && s.src) urls.push(s.src);
        });
      }
    } catch (e) {
      // ignore
    }
  }

  return uniq(urls).map(u => u.replace(/\\/g, ''));
}

async function resolveMovieByName(name) {
  const candidates = await searchByName(name);
  for (const link of candidates) {
    try {
      const page = await fetchText(link);
      const sources = extractSourcesFromHtml(page);
      if (sources.length) return {link, sources};
    } catch (e) {
      console.error('Lordfilm', 'Error occurred while resolving movie:', e);
      // continue to next
    }
  }
  return null;
}

/*(function(exports){
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  } else if (typeof define === 'function' && define.amd) {
    define(function(){ return exports; });
  } else if (typeof window !== 'undefined') {
    window.lordfilm = exports;
    if (window.lampa && typeof window.lampa.addPlugin === 'function') {
      try { window.lampa.addPlugin(exports); } catch(e) {}
    }
  } else if (typeof globalThis !== 'undefined') {
    globalThis.lordfilm = exports;
  }
})({
  id: 'lordfilm',
  title: 'LordFilm (vo.lordfilm135.ru)',
  version: '1.0',

  // Play handler called by Lampa when user presses Play on a film card.
  // `item` should contain `.title` (movie/series name). `done` is a callback to return sources.
  play: async function(item, done) {
    try {
      const name = (item && (item.title || item.name || item.title_ru)) || '';
      if (!name) return done([]);

      const found = await resolveMovieByName(name);
      if (!found) return done([]);

      const out = found.sources.map(u => ({
        title: this.title,
        url: u,
        type: u.includes('.m3u8') ? 'hls' : 'mp4'
      }));

      done(out);
    } catch (e) {
      done([]);
    }
  }
});*/

// Start plugin behaviour similar to other Lampa plugins (capture full card data)
(function(){
  var fullData = {};

  function startPlugin() {
    if (typeof Lampa === 'undefined' || !Lampa.Listener) return;

    Lampa.Listener.follow('full', async function (e) {
      if (e.type == 'complite') {
        fullData = e;
        try { window.lordfilm_full = fullData; } catch (err) {}
        console.log('Lordfilm', 'full card data captured', e);

        const found = await resolveMovieByName(e.data.movie.title);
        
        console.log('Lordfilm', 'found links', found);
      }
    });

    // expose getter on the exported object when available
    try {
      if (window && window.lordfilm) window.lordfilm.getFullData = function(){ return fullData; };
    } catch (e) {}

    // add a simple setting to toggle plugin (optional)
    try {
      if (Lampa.SettingsApi && Lampa.SettingsApi.addParam) {
        Lampa.SettingsApi.addParam({
          component: 'card_mod',
          param: { name: 'enable_lordfilm', type: 'trigger', "default": true },
          field: { name: 'Enable LordFilm plugin' }
        });
      }
    } catch (e) {}
  }

  if (window && window.appready) {
    startPlugin();
  } else if (typeof Lampa !== 'undefined' && Lampa.Listener) {
    // If Lampa is already available
    startPlugin();
  } else if (typeof Lampa !== 'undefined') {
    Lampa.Listener.follow('app', function (ev) {
      if (ev.type == 'ready') startPlugin();
    });
  } else {
    // fallback: try on DOMContentLoaded
    if (document && document.addEventListener) document.addEventListener('DOMContentLoaded', startPlugin);
  }
})();
