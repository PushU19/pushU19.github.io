(function () {
  'use strict';
  if (window.__hdrezkaPluginOnce) return;
  window.__hdrezkaPluginOnce = true;

  const PLUGIN_ID = 'hdrezka_plugin';
  const PLUGIN_TITLE = 'HDRezka Plugin';
  const PLUGIN_ICON = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M3 3h18v18H3z"/></svg>';
  const STORAGE_KEY = 'hdrezka_plugin';
  const NAME = 'HDRezka';

  var HdrezkaPlugin = {
    init: function () {
      console.log(PLUGIN_ID, 'init');
      try {
        if (typeof Lampa === 'undefined' || !Lampa.Menu) return;

        // Add a simple menu button (visible when storage flag enabled)
        if (Lampa.Storage.get(STORAGE_KEY)) {
          console.log(PLUGIN_ID, 'adding_menu_button', { storage: Lampa.Storage.get(STORAGE_KEY) });
          var icon = PLUGIN_ICON;
          var btn = Lampa.Menu.addButton(icon, PLUGIN_TITLE, function () {
            // Try to search current opened card, otherwise open plugin activity
            var card = HdrezkaPlugin.getActiveCard();
            console.log(PLUGIN_ID, 'menu_button_clicked', { hasCard: !!card, card: card });
            if (card) HdrezkaPlugin.searchCard(card);
            else Lampa.Activity.push({ url: '', title: NAME, component: PLUGIN_ID, page: 1 });
          });
          btn.addClass(PLUGIN_ID);
        }

        // Inject play button into full film card when opened
        Lampa.Listener.follow('full', function (e) {
          if (e.type === 'complite') {
          //setTimeout(function () {
            try {
              var activity = Lampa.Activity.active().activity.render();
              console.log(PLUGIN_ID, 'activity_render', activity);
              if (!activity || activity.find('.view--hdrezka_online').length) return;

              var ico = '<svg class="hd-online-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M17 14.5 21.2 10 4.9 1.2z" fill="currentColor"/></svg>';
              var btnHtml = "<div style='position:relative' class='full-start__button selector view--hdrezka_online'>" + ico + "<span>Play</span></div>";

              // Prefer existing button container
              if (activity.find('.full-start-new__buttons').length) {
                activity.find('.full-start-new__buttons').prepend($(btnHtml));
              } 

              var btnEl = activity.find('.view--hdrezka_online');
              console.log(PLUGIN_ID, 'inject_button', { inserted: !!btnEl.length, e });
              btnEl.on('hover:enter', function () {
                var c = HdrezkaPlugin.getActiveCard(e.data);
                console.log(PLUGIN_ID, 'play_button_clicked', { card: c });
                if (c) HdrezkaPlugin.searchCard(c);
                else Lampa.Noty.show('Фильмы не найдены');
              });
            } catch (ee) {}
          //}, 350);
            }
        });
      } catch (e) {}
    },

    // Try to find currently opened card in activity
    getActiveCard: function (e = null) {
        if (e) { return e.movie; }

      try {
        var act = Lampa.Activity.active();
        if (!act) return null;
        console.log(PLUGIN_ID, 'get_active_card', { activity: act });
        var comp = act.activity && act.activity.component;
        if (comp) {
          if (comp.movie) return comp.movie;
          if (comp.card) return comp.card;
          if (comp.params && comp.params.movie) return comp.params.movie;
        }
        // Fallback to global card variable if present (used by some plugins)
        if (window.cards) return window.cards;
      } catch (e) {}
      return null;
    },

    // Build search URLs for balansers and present options to user
    searchCard: function (card) {
      if (!card) return Lampa.Noty.show('No card found');
      var title = card.title || card.name || card.original_title || card.original_name || '';
      var q = encodeURIComponent(title.trim());
      var urls = {
        //hdrezka: 'https://hdrezka.co/search/?do=search&subaction=search&q=' + q,
        veoveo: 'https://veoveo.ru/search.php?q=' + q
      };

      // Instead of showing a small select, open the online activity so user sees balancers selector (like modss.tv.js)
      try {
        var params = {
          url: '',
          title: NAME + ' - Online',
          component: PLUGIN_ID,
          search: title,
          search_one: title,
          search_two: card.original_title || card.original_name || '',
          movie: card,
          page: 1
        };
        console.log(PLUGIN_ID, 'push_online_activity', params);
        Lampa.Activity.push(params);
      } catch (e) {
        console.log(PLUGIN_ID, 'push_online_error', e);
        // fallback: open hdrezka search in browser
        if (window && window.open) window.open(urls.hdrezka, '_blank');
      }

      this.searchSource('veoveo', card.title)

        // Also attempt to fetch playable sources from both balansers and offer direct play
        /*var self = this;
        var fetches = Object.keys(urls).map(function (k) {
          return self.fetchSourcesFromBalancer(k, urls[k], card);
        });*/

        /*Promise.all(fetches).then(function (results) {
          var all = [];
          results.forEach(function (r) {
            if (r && r.length) all = all.concat(r);
          });
          if (all.length) {
            var items = all.map(function (s) {
              return {
                title: s.title || s.url,
                subtitle: s.source || s.url,
                play: s
              };
            });
            Lampa.Select.show({
              title: 'Found sources',
              items: items,
              onBack: function () {
                Lampa.Select.hide();
                Lampa.Controller.toggle('content');
              },
              onSelect: function (it) {
                Lampa.Select.hide();
                try {
                  var play = {
                    title: card.title || card.name,
                    url: it.play.url,
                    thumbnail: card.poster_path || card.poster,
                    subtitles: it.play.subtitles || []
                  };
                  console.log(PLUGIN_ID, 'play_selected', play);
                  Lampa.Player.play(play);
                } catch (e) {
                  console.log(PLUGIN_ID, 'play_error', e);
                  if (window && window.open) window.open(it.play.url, '_blank');
                }
              }
            });
          } else {
            console.log(PLUGIN_ID, 'no_sources_found', { movie: card, urls: urls });
          }
        })["catch"](function (e) {
          console.log(PLUGIN_ID, 'fetch_sources_error', e);
        });*/
    },

    searchSource: async function (balanser, title) {
        switch (balanser) {
            case 'hdrezka':
                return 'https://hdrezka.co/search/?do=search&subaction=search&q=' + encodeURIComponent(title.trim());
            case 'veoveo':
                const token = 'b491a97893498a3bec2a6cff3f891c5f';
                const page = await this.fetchHTML('https://veoveo.ru/search.php?q=' + encodeURIComponent(title.trim()));

                if (page) {
                    // Try to find first search result URL
                    const data = [];
                    const dom = new DOMParser().parseFromString(page, 'text/html');
                    const items = dom.querySelectorAll('article');
                    
                    for (let item of items) {
                        const cardLink = item.querySelector('a')?.href ?? '';

                        if (cardLink) {
                            const cardPage = await this.fetchHTML(cardLink);
                            const cardDom = new DOMParser().parseFromString(cardPage, 'text/html');
                            const iframe = cardDom.querySelector('.movie-player iframe');
                            console.log(PLUGIN_ID, 'data', {iframe, iv: iframe.contentDocumennt?.querySelector('video')})
                            data.push({
                                title: item.querySelector('.card-title')?.textContent ?? '',
                                card_url: item.querySelector('a')?.href ?? '',
                                iframe: iframe.src
                            });
                        }
                    }

                    return data;
                }

                return null;
            default:
                return null;
        }
    },

    fetchHTML: function (url) {
        return new Promise(function (resolve, reject) {
          try {
            var network = new Lampa.Reguest();
            network.timeout(10000);
            network["native"](url, function (html) {
              try {
                resolve(html);
              } catch (e) { reject(e); }
            });
          } catch (e) { reject(e); }
        });
    },

    // Fetch and parse pages for direct video links
    fetchSourcesFromBalancer: function (name, url, card) {
        return new Promise(function (resolve) {
          try {
            var network = new Lampa.Reguest();
            network.timeout(10000);
            network["native"](url, function (html) {
              try {
                var found = [];
                // find direct video links (.m3u8, .mp4)
                var re = /https?:\/\/[^\"'\s<>]+?(?:m3u8|mp4)(?:[^\"'\s<>]*)/ig;
                var m;
                while ((m = re.exec(html)) !== null) {
                  found.push({ url: m[0], source: name, title: card.title });
                }
                // also try <video src>
                var vRe = /<video[^>]+src=["']([^"']+)["']/ig;
                while ((m = vRe.exec(html)) !== null) {
                  found.push({ url: m[1], source: name, title: card.title });
                }
                // remove duplicates
                var uniq = [];
                var map = {};
                found.forEach(function (f) {
                  if (!map[f.url]) { map[f.url] = true; uniq.push(f); }
                });
                resolve(uniq);
              } catch (e) { resolve([]); }
            }, function () { resolve([]); }, false, { dataType: 'html' });
          } catch (e) { resolve([]); }
        });
    }
  };

  // Expose plugin object and run init
  window.HdrezkaPlugin = HdrezkaPlugin;
  HdrezkaPlugin.init();
})();
