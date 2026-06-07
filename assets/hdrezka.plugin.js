(function () {
  'use strict';
  if (window.__hdrezkaPluginOnce) return;
  window.__hdrezkaPluginOnce = true;

  var HdrezkaPlugin = {
    init: function () {
      try {
        if (typeof Lampa === 'undefined' || !Lampa.Menu) return;

        // Add a simple menu button (visible when storage flag enabled)
        if (Lampa.Storage.get('hdrezka_plugin')) {
          var icon = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M3 3h18v18H3z"/></svg>';
          var btn = Lampa.Menu.addButton(icon, 'HDRezka Plugin', function () {
            // Try to search current opened card, otherwise open plugin activity
            var card = HdrezkaPlugin.getActiveCard();
            if (card) HdrezkaPlugin.searchCard(card);
            else Lampa.Activity.push({ url: '', title: 'HDRezka', component: 'hdrezka_plugin', page: 1 });
          });
          btn.addClass('hdrezka_plugin');
        }
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
