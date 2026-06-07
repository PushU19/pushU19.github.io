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
        Lampa.Listener.follow('activity', function (e) {
          if (e.component !== 'full') return;
          if (e.type !== 'create' && e.type !== 'start') return;
    
          setTimeout(function () {
            try {
              var activity = Lampa.Activity.active().activity.render();
              console.log(PLUGIN_ID, 'activity_render', activity);
              if (!activity || activity.find('.view--hdrezka_online').length) return;

              var card = HdrezkaPlugin.getActiveCard();
              var ico = '<svg class="hd-online-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M17 14.5 21.2 10 4.9 1.2z" fill="currentColor"/></svg>';
              var btnHtml = "<div style='position:relative' class='full-start__button selector view--hdrezka_online'>" + ico + "<span>HDRezka / VeoVeo</span></div>";
                console.log(PLUGIN_ID, 'inject_button_into', {el: activity.find('.full-start-new__buttons')});
              // Prefer existing button container
              if (activity.find('.full-start-new__buttons').length) {
                
                activity.find('.full-start-new__buttons').prepend($(btnHtml));
              } 

              var btnEl = activity.find('.view--hdrezka_online');
              console.log(PLUGIN_ID, 'inject_button', { inserted: !!btnEl.length });
              btnEl.on('hover:enter', function () {
                var c = HdrezkaPlugin.getActiveCard() || card;
                console.log(PLUGIN_ID, 'play_button_clicked', { card: c });
                if (c) HdrezkaPlugin.searchCard(c);
                else Lampa.Noty.show('No card data');
              });
            } catch (ee) {}
          }, 150);
        });
      } catch (e) {}
    },

    // Return available balansers — include hdrezka and veoveo
    balansers: function () {
      return {
        "hdrezka": "HDRezka  <span style=\"font-weight:700;color:rgb(236,151,31)\">VIP</span>",
        "veoveo": "VeoVeo (veoveo.ru)",
        "samplebal": "SampleBalancer"
      };
    },

    // Try to find currently opened card in activity
    getActiveCard: function () {
      try {
        var act = Lampa.Activity.active();
        if (!act) return null;
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
        hdrezka: 'https://hdrezka.ag/search/?q=' + q,
        veoveo: 'https://veoveo.ru/?s=' + q
      };

      var items = [];
      items.push({ title: '🔎 Search HDRezka', subtitle: urls.hdrezka, url: urls.hdrezka });
      items.push({ title: '🔎 Search VeoVeo', subtitle: urls.veoveo, url: urls.veoveo });
      items.push({ title: '🌐 Open HDRezka in browser', subtitle: urls.hdrezka, url: urls.hdrezka });
      items.push({ title: '🌐 Open VeoVeo in browser', subtitle: urls.veoveo, url: urls.veoveo });

      Lampa.Select.show({
        title: 'Search on balancers',
        items: items,
        onBack: function () {
          Lampa.Select.hide();
          Lampa.Controller.toggle('content');
        },
        onSelect: function (it) {
          Lampa.Select.hide();
          // Open in external browser/tab
          if (it && it.url) {
            try {
              // Attempt to open in Lampa browser if available
              if (window && window.open) window.open(it.url, '_blank');
            } catch (e) { }
          }
        }
      });
    }
  };

  // Expose plugin object and run init
  window.HdrezkaPlugin = HdrezkaPlugin;
  HdrezkaPlugin.init();
})();
