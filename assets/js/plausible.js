// /*! plausible-lite.js – readable build */
// (function () {
//   'use strict';

//   var loc  = window.location;
//   var doc  = document;
//   var tag  = doc.currentScript;

//   // Endpoint event: default ke origin script + /api/event
//   var API  = tag.getAttribute('data-api') || (new URL(tag.src).origin + '/api/event');
//   var DOM  = tag.getAttribute('data-domain');

//   function ignore(reason) {
//     console.warn('Ignoring Event:', reason);
//   }

//   // API global: window.plausible(name, {meta, props, callback})
//   function plausible(name, opts) {
//     // Abaikan ketika di localhost / file: / headless automation
//     if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(loc.hostname) || loc.protocol === 'file:') {
//       return ignore('localhost');
//     }
//     if (window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) {
//       return ignore('automation');
//     }

//     // Optional flag untuk mematikan tracking
//     try {
//       if (window.localStorage.plausible_ignore === 'true') return ignore('localStorage flag');
//     } catch (_) {}

//     var payload = {
//       n: name,               // event name
//       u: loc.href,           // current URL
//       d: DOM,                // domain (dari data-domain)
//       r: doc.referrer || null,
//       w: window.innerWidth
//     };

//     if (opts && opts.meta)  payload.m = JSON.stringify(opts.meta);
//     if (opts && opts.props) payload.p = opts.props;

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', API, true);
//     xhr.setRequestHeader('Content-Type', 'text/plain');
//     xhr.send(JSON.stringify(payload));
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4 && opts && opts.callback) opts.callback();
//     };
//   }

//   // Proses antrian panggilan sebelumnya (jika dipanggil sebelum script load)
//   var queue = (window.plausible && window.plausible.q) || [];
//   window.plausible = plausible;
//   for (var i = 0; i < queue.length; i++) plausible.apply(this, queue[i]);

//   // Auto pageview + SPA tracking
//   var lastPath;
//   function trackPageview() {
//     if (lastPath !== loc.pathname) {
//       lastPath = loc.pathname;
//       plausible('pageview');
//     }
//   }

//   // Hook history API (SPA)
//   var hist = window.history;
//   if (hist.pushState) {
//     var _pushState = hist.pushState;
//     hist.pushState = function () {
//       _pushState.apply(this, arguments);
//       trackPageview();
//     };
//     window.addEventListener('popstate', trackPageview);
//   }

//   // Prerender → visible
//   if (doc.visibilityState === 'prerender') {
//     doc.addEventListener('visibilitychange', function () {
//       if (!lastPath && doc.visibilityState === 'visible') trackPageview();
//     });
//   } else {
//     trackPageview();
//   }
// })();