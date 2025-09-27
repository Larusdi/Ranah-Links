/* ============================================================================
 * Analytics loader (PLAUSIBLE)
 * ----------------------------------------------------------------------------
 * Memuat script analytics "plausible.js" secara dinamis.
 * Catatan: atribut "asnyc" di bawah ini memang TYPO dari "async",
 * namun diminta TIDAK DIUBAH, jadi dibiarkan apa adanya.
 * ========================================================================== */
var plausibleScript = document.createElement("script");
plausibleScript.src = "plausible.js";
plausibleScript.setAttribute("asnyc", ""); // <- sesuai original (TYPO), jangan diubah
plausibleScript.setAttribute("defer", "");
plausibleScript.setAttribute("data-domain", "bio.link");
document.head.appendChild(plausibleScript);


/* ============================================================================
 * APP BUNDLE (hasil bundling/webpack)
 * ----------------------------------------------------------------------------
 * Bagian ini adalah IIFE (Immediately Invoked Function Expression) yang
 * memuat seluruh logika halaman: helper, event handler, AJAX, cookie, dsb.
 * Kode di bawah dirapikan indentasi & ditambahkan komentar blok.
 * Tidak ada perubahan logika ataupun isi string/variabel.
 * ========================================================================== */
(() => {
  var e,
    t = {
      757: (e, t, r) => {
        e.exports = r(666);
      },
      80: (e, t, r) => {
        "use strict";
        var n = r(757),
          o = r.n(n);

        // -------------------------------------------------------------------
        // Helper untuk menjalankan generator (polyfill regenerator-runtime)
        // -------------------------------------------------------------------
        function a(e, t, r, n, o, a, i) {
          try {
            var s = e[a](i),
              c = s.value;
          } catch (e) {
            return void r(e);
          }
          s.done ? t(c) : Promise.resolve(c).then(n, o);
        }

        // -------------------------------------------------------------------
        // Handler toggle embed (buka/tutup konten ter-embed)
        // -------------------------------------------------------------------
        function i(e) {
          var t = e.target.closest(".page-item-wrap"),
            r = t.querySelector(".show-embed-item"),
            n = t.querySelector(".embed-iframe"),
            o = parseInt(r.getAttribute("data-height")),
            a = 0;
          r.getAttribute("data-type") && (a = 20),
            t.classList.toggle("show-embed"),
            (n.src = n.getAttribute("data-src")),
            (n.style.cssText = "height: ".concat(0 == n.offsetHeight ? o - a : 0, "px")),
            (r.style.cssText = "height: ".concat(0 == r.offsetHeight ? o + 16 : "0", "px"));
        }

        // -------------------------------------------------------------------
        // Cookie getter sederhana
        // -------------------------------------------------------------------
        function s(e) {
          for (var t = e + "=", r = document.cookie.split(";"), n = 0; n < r.length; n++) {
            for (var o = r[n]; " " === o.charAt(0); ) o = o.substring(1, o.length);
            if (0 === o.indexOf(t)) return o.substring(t.length, o.length);
          }
          return null;
        }

        // -------------------------------------------------------------------
        // Hapus cookie pada main domain & reload
        // -------------------------------------------------------------------
        function c(e) {
          if (
            s(e) &&
            ((t = e),
            (r = location.hostname.split(".").reverse()),
            (n = r[1] + "." + r[0]),
            (document.cookie =
              t + "=; domain=" + n + "; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"),
            !s(e))
          ) {
            try {
              location.reload(!0);
            } catch (e) {}
            location.reload();
          }
          var t, r, n;
        }

        // -------------------------------------------------------------------
        // Variabel global dari DOM & URLSearchParams
        // -------------------------------------------------------------------
        var u = document.getElementById("app-url").value,
          l = document.getElementById("is-featured").value,
          d = window.location.search,
          h = new URLSearchParams(d).get("preview"),
          f = !1;

        // -------------------------------------------------------------------
        // Submit email subscribe (AJAX + CSRF)
        // -------------------------------------------------------------------
        function m() {
          var e = document.getElementById("subscribe-btn"),
            t = document.getElementById("subsc-email").value,
            r = e.getAttribute("data-pageID"),
            n = e.getAttribute("data-campId");
          if ("" != t) {
            document.getElementById("btn-text").classList.toggle("op-0"),
              document.getElementById("btn-loader").classList.toggle("op-0"),
              (document.getElementById("subsc-email-error").innerText = ""),
              document.getElementById("subscribers-email-wrap").classList.remove("error-wrap");
            var o = new FormData();
            o.append("email", t);
            var a = decodeURIComponent(s("XSRF-TOKEN")),
              i = new XMLHttpRequest();
            (i.withCredentials = !0),
              (i.onreadystatechange = function () {
                if (4 === i.readyState && 200 === i.status) {
                  document.getElementById("btn-text").classList.toggle("op-0"),
                    document.getElementById("btn-loader").classList.toggle("op-0");
                  var e = document.getElementById("subsc-email").value;
                  (document.getElementById("thank_you_msg").innerHTML =
                    "You’re subscribed as " + e),
                    (document.getElementById("subsc-email").value = "");
                  for (
                    var t = document.getElementsByClassName("hide-after-success"), r = 0;
                    r < t.length;
                    r++
                  )
                    t[r].style.display = "none";
                  (f = !0),
                    document
                      .getElementsByClassName("show-after-success")[0]
                      .classList.remove("hidden"),
                    setTimeout(function () {
                      document
                        .getElementsByClassName("thank-you-title")[0]
                        .classList.toggle("hidden"),
                        (document.getElementById("featured-subscribers").style.cursor =
                          "pointer"),
                        document
                          .getElementById("featured-subscribers")
                          .classList.toggle("hide-subscribers");
                    }, 3e3);
                } else
                  "" != i.responseText &&
                    JSON.parse(i.responseText).errors &&
                    p(JSON.parse(i.responseText).errors.email[0]),
                    (f = !1);
              }),
              i.open(
                "post",
                "".concat(u, "/api/pages/").concat(r, "/campaign/").concat(n, "/subscriber")
              ),
              i.setRequestHeader("X-XSRF-TOKEN", a),
              i.send(o);
          } else p("Please enter a valid email.");
        }

        // -------------------------------------------------------------------
        // Attach click listener ke tombol subscribe
        // -------------------------------------------------------------------
        function g() {
          document.getElementById("subscribe-btn").addEventListener(
            "click",
            (function () {
              var e,
                t = ((e = o().mark(function e(t) {
                  return o().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          m();
                        case 1:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })),
                function () {
                  var t = this,
                    r = arguments;
                  return new Promise(function (n, o) {
                    var i = e.apply(t, r);
                    function s(e) {
                      a(i, n, o, s, c, "next", e);
                    }
                    function c(e) {
                      a(i, n, o, s, c, "throw", e);
                    }
                    s(void 0);
                  });
                });
              return function (e) {
                return t.apply(this, arguments);
              };
            })()
          );
        }

        // -------------------------------------------------------------------
        // Tampilkan error input email
        // -------------------------------------------------------------------
        function p(e) {
          document.getElementById("subscribers-email-wrap").classList.add("error-wrap"),
            (document.getElementById("subsc-email-error").innerText = e),
            document.getElementById("btn-text").classList.remove("op-0"),
            document.getElementById("btn-loader").classList.add("op-0");
        }

        // -------------------------------------------------------------------
        // Reset error input email
        // -------------------------------------------------------------------
        function y() {
          document.getElementById("subscribers-email-wrap").classList.remove("error-wrap"),
            (document.getElementById("subsc-email-error").innerText = "");
        }

        // -------------------------------------------------------------------
        // onload: lazy-load image, track click, toggle embed, cookie refresh,
        // toggle subscribers bar, enter-to-submit, fetch CSRF cookie, dll.
        // -------------------------------------------------------------------
        window.onload = function () {
          // Lazy-load semua <img data-src=...>
          !(function () {
            for (var e = document.getElementsByTagName("img"), t = 0; t < e.length; t++) {
              var r = e[t];
              r.getAttribute("data-src") && r.setAttribute("src", r.getAttribute("data-src"));
            }
          })(),
            // Tracking klik semua <a>
            (function () {
              for (
                var e = document.getElementsByTagName("a"), t = 0;
                t < e.length;
                t++
              )
                e[t].addEventListener("click", function (e) {
                  var t = e.currentTarget,
                    r = ["trackEvent", t.getAttribute("data-type"), "Click", t.getAttribute("data-id"), 1];
                  try {
                    _paq.push(r);
                  } catch (e) {}
                });
            })(),
            // Toggle embed content pada elemen dengan class .show-embed
            (function () {
              for (
                var e = document.getElementsByClassName("show-embed"), t = 0;
                t < e.length;
                t++
              )
                e[t].addEventListener("click", i);
            })(),
            // Clear cookie penanda update halaman (preview / non-preview)
            (function () {
              try {
                new URLSearchParams(window.location.search).get("preview")
                  ? c("page_has_updated_preview")
                  : c("page_has_updated");
              } catch (e) {}
            })();

          // Setup toggle untuk featured-subscribers bar (jika featured)
          var e,
            t = document.getElementById("page-type").value;
          null == h &&
            "true" == l &&
            ("creator-page" == t &&
              (document
                .getElementById("toggle-subscription-btn")
                .addEventListener("click", function (e) {
                  document.getElementById("featured-subscribers").classList.toggle("hide-subscribers"),
                    f &&
                      document
                        .getElementsByClassName("thank-you-title")[0]
                        .classList.toggle("hidden"),
                    (document.getElementById("featured-subscribers").style.cursor = "default");
                }),
              "true" === l &&
                document.querySelector("#featured-subscribers") &&
                document
                  .querySelector("#featured-subscribers")
                  .addEventListener("click", function (e) {
                    document
                      .getElementById("featured-subscribers")
                      .classList.contains("hide-subscribers") &&
                    "toggle-subscription-btn" !== e.target.id &&
                    "sub-toggle" !== e.target.id
                      ? (document
                          .getElementById("featured-subscribers")
                          .classList.toggle("hide-subscribers"),
                        f &&
                          document
                            .getElementsByClassName("thank-you-title")[0]
                            .classList.toggle("hidden"),
                        (document.getElementById("featured-subscribers").style.cursor =
                          "default"))
                      : document
                          .getElementById("featured-subscribers")
                          .classList.contains("hide-subscribers") &&
                        (document.getElementById("featured-subscribers").style.cursor = "pointer");
                  }))),
            // Submit dengan tombol Enter pada input email
            document.getElementById("subsc-email").addEventListener("keyup", function (e) {
              "Enter" === e.key && m();
            }),
            // Pasang handler klik subscribe
            g(),
            // Ambil CSRF cookie (Sanctum)
            ((e = new XMLHttpRequest()).open("GET", "".concat(u, "/sanctum/csrf-cookie"), !0),
            (e.withCredentials = !0),
            e.send(null)),
            // Reset error saat input berubah
            document.getElementById("subsc-email").addEventListener("input", y);
        };
      },
      662: () => {},
      328: () => {},
      666: (e) => {
        // -------------------------------------------------------------------
        // regenerator-runtime (polyfill) — bagian internal generator/async
        // -------------------------------------------------------------------
        var t = (function (e) {
          "use strict";
          var t,
            r = Object.prototype,
            n = r.hasOwnProperty,
            o = "function" == typeof Symbol ? Symbol : {},
            a = o.iterator || "@@iterator",
            i = o.asyncIterator || "@@asyncIterator",
            s = o.toStringTag || "@@toStringTag";
          function c(e, t, r) {
            return (
              Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }),
              (e[t] = r)
            );
          }
          try {
            c({}, "");
          } catch (e) {
            c = function (e, t, r) {
              return (e[t] = r);
            };
          }
          function u(e, t, r, n) {
            var o = t && t.prototype instanceof p ? t : p,
              a = Object.create(o.prototype),
              i = new _(n || []);
            return (a._invoke = (function (e, t, r) {
              var n = d;
              return function (o, a) {
                if (n === f) throw new Error("Generator is already running");
                if (n === m) {
                  if ("throw" === o) throw a;
                  return N();
                }
                for (r.method = o, r.arg = a; ; ) {
                  var i = r.delegate;
                  if (i) {
                    var s = I(i, r);
                    if (s) {
                      if (s === g) continue;
                      return s;
                    }
                  }
                  if ("next" === r.method) (r.sent = r._sent = r.arg);
                  else if ("throw" === r.method) {
                    if (n === d) throw ((n = m), r.arg);
                    r.dispatchException(r.arg);
                  } else "return" === r.method && r.abrupt("return", r.arg);
                  n = f;
                  var c = l(e, t, r);
                  if ("normal" === c.type) {
                    if (((n = r.done ? m : h), c.arg === g)) continue;
                    return { value: c.arg, done: r.done };
                  }
                  "throw" === c.type && ((n = m), (r.method = "throw"), (r.arg = c.arg));
                }
              };
            })(e, r, i)),
            a;
          }
          function l(e, t, r) {
            try {
              return { type: "normal", arg: e.call(t, r) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          e.wrap = u;
          var d = "suspendedStart",
            h = "suspendedYield",
            f = "executing",
            m = "completed",
            g = {};
          function p() {}
          function y() {}
          function v() {}
          var b = {};
          (b[a] = function () {
            return this;
          });
          var w = Object.getPrototypeOf,
            E = w && w(w(T([])));
          E && E !== r && n.call(E, a) && (b = E);
          var L = (v.prototype = p.prototype = Object.create(b));
          function x(e) {
            ["next", "throw", "return"].forEach(function (t) {
              c(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function B(e, t) {
            function r(o, a, i, s) {
              var c = l(e[o], e, a);
              if ("throw" !== c.type) {
                var u = c.arg,
                  d = u.value;
                return d && "object" == typeof d && n.call(d, "__await")
                  ? t.resolve(d.__await).then(
                      function (e) {
                        r("next", e, i, s);
                      },
                      function (e) {
                        r("throw", e, i, s);
                      }
                    )
                  : t.resolve(d).then(
                      function (e) {
                        (u.value = e), i(u);
                      },
                      function (e) {
                        return r("throw", e, i, s);
                      }
                    );
              }
              s(c.arg);
            }
            var o;
            this._invoke = function (e, n) {
              function a() {
                return new t(function (t, o) {
                  r(e, n, t, o);
                });
              }
              return (o = o ? o.then(a, a) : a());
            };
          }
          function I(e, r) {
            var n = e.iterator[r.method];
            if (n === t) {
              if (((r.delegate = null), "throw" === r.method)) {
                if (e.iterator.return && ((r.method = "return"), (r.arg = t), I(e, r), "throw" === r.method))
                  return g;
                (r.method = "throw"), (r.arg = new TypeError("The iterator does not provide a 'throw' method"));
              }
              return g;
            }
            var o = l(n, e.iterator, r.arg);
            if ("throw" === o.type) return (r.method = "throw"), (r.arg = o.arg), (r.delegate = null), g;
            var a = o.arg;
            return a
              ? a.done
                ? ((r[e.resultName] = a.value),
                  (r.next = e.nextLoc),
                  "return" !== r.method && ((r.method = "next"), (r.arg = t)),
                  (r.delegate = null),
                  g)
                : a
              : ((r.method = "throw"),
                (r.arg = new TypeError("iterator result is not an object")),
                (r.delegate = null),
                g);
          }
          function k(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function O(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function _(e) {
            (this.tryEntries = [{ tryLoc: "root" }]), e.forEach(k, this), this.reset(!0);
          }
          function T(e) {
            if (e) {
              var r = e[a];
              if (r) return r.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function r() {
                    for (; ++o < e.length; ) if (n.call(e, o)) return (r.value = e[o]), (r.done = !1), r;
                    return (r.value = t), (r.done = !0), r;
                  };
                return (i.next = i), i;
              }
            }
            return { next: N };
          }
          function N() {
            return { value: t, done: !0 };
          }
          return (
            (y.prototype = L.constructor = v),
            (v.constructor = y),
            (y.displayName = c(v, s, "GeneratorFunction")),
            (e.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return !!t && (t === y || "GeneratorFunction" === (t.displayName || t.name));
            }),
            (e.mark = function (e) {
              return (
                Object.setPrototypeOf ? Object.setPrototypeOf(e, v) : ((e.__proto__ = v), c(e, s, "GeneratorFunction")),
                (e.prototype = Object.create(L)),
                e
              );
            }),
            (e.awrap = function (e) {
              return { __await: e };
            }),
            x(B.prototype),
            (B.prototype[i] = function () {
              return this;
            }),
            (e.AsyncIterator = B),
            (e.async = function (t, r, n, o, a) {
              void 0 === a && (a = Promise);
              var i = new B(u(t, r, n, o), a);
              return e.isGeneratorFunction(r) ? i : i.next().then(function (e) { return e.done ? e.value : i.next(); });
            }),
            x(L),
            c(L, s, "Generator"),
            (L[a] = function () {
              return this;
            }),
            (L.toString = function () {
              return "[object Generator]";
            }),
            (e.keys = function (e) {
              var t = [];
              for (var r in e) t.push(r);
              return (
                t.reverse(),
                function r() {
                  for (; t.length; ) {
                    var n = t.pop();
                    if (n in e) return (r.value = n), (r.done = !1), r;
                  }
                  return (r.done = !0), r;
                }
              );
            }),
            (e.values = T),
            (_.prototype = {
              constructor: _,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(O),
                  !e)
                )
                  for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var r = this;
                function o(n, o) {
                  return (s.type = "throw"), (s.arg = e), (r.next = n), o && ((r.method = "next"), (r.arg = t)), !!o;
                }
                for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                  var i = this.tryEntries[a],
                    s = i.completion;
                  if ("root" === i.tryLoc) return o("end");
                  if (i.tryLoc <= this.prev) {
                    var c = n.call(i, "catchLoc"),
                      u = n.call(i, "finallyLoc");
                    if (c && u) {
                      if (this.prev < i.catchLoc) return o(i.catchLoc, !0);
                      if (this.prev < i.finallyLoc) return o(i.finallyLoc);
                    } else if (c) {
                      if (this.prev < i.catchLoc) return o(i.catchLoc, !0);
                    } else {
                      if (!u) throw new Error("try statement without catch or finally");
                      if (this.prev < i.finallyLoc) return o(i.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r];
                  if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                    var a = o;
                    break;
                  }
                }
                a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
                var i = a ? a.completion : {};
                return (i.type = e), (i.arg = t), a ? ((this.method = "next"), (this.next = a.finallyLoc), g) : this.complete(i);
              },
              complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg), (this.method = "return"), (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                g;
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), O(r), g;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r.tryLoc === e) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var o = n.arg;
                      O(r);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, r, n) {
                return (this.delegate = { iterator: T(e), resultName: r, nextLoc: n }), "next" === this.method && (this.arg = t), g;
              },
            }),
            e
          );
        })(e.exports);
        try {
          regeneratorRuntime = t;
        } catch (e) {
          Function("r", "regeneratorRuntime = r")(t);
        }
      },
    },
    r = {};

  // -------------------------------------------------------------------------
  // require-like loader untuk modul bundling
  // -------------------------------------------------------------------------
  function n(e) {
    var o = r[e];
    if (void 0 !== o) return o.exports;
    var a = (r[e] = { exports: {} });
    return (t[e](a, a.exports, n), a.exports);
  }

  // -------------------------------------------------------------------------
  // Runtime webpack: queue & chunk loader
  // -------------------------------------------------------------------------
  (n.m = t),
    (e = []),
    (n.O = (t, r, o, a) => {
      if (!r) {
        var i = 1 / 0;
        for (u = 0; u < e.length; u++) {
          for (var [r, o, a] = e[u], s = !0, c = 0; c < r.length; c++)
            (!1 & a || i >= a) && Object.keys(n.O).every((e) => n.O[e](r[c]))
              ? r.splice(c--, 1)
              : ((s = !1), a < i && (i = a));
          s && (e.splice(u--, 1), (t = o()));
        }
        return t;
      }
      a = a || 0;
      for (var u = e.length; u > 0 && e[u - 1][2] > a; u--) e[u] = e[u - 1];
      e[u] = [r, o, a];
    }),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
    (n.d = (e, t) => {
      for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = { 773: 0, 432: 0, 170: 0 };
      (n.O.j = (t) => 0 === e[t]);
      var t = (t, r) => {
          var o,
            a,
            [i, s, c] = r,
            u = 0;
          for (o in s) n.o(s, o) && (n.m[o] = s[o]);
          for (c && c(n), t && t(r); u < i.length; u++)
            (a = i[u]), n.o(e, a) && e[a] && e[a][0](), (e[i[u]] = 0);
          n.O();
        },
        r = (self.webpackChunk = self.webpackChunk || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })(),
    n.O(void 0, [432, 170], () => n(80)),
    n.O(void 0, [432, 170], () => n(662));
  var o = n.O(void 0, [432, 170], () => n(328));
  o = n.O(o);
})();





/* ===== Modal Store ===== */
(function () {
  function findStoreAnchor(){
    const titles = document.querySelectorAll('.page-item-each .item-title');
    for (const t of titles) {
      if (/^\s*Store\s*\|\s*Larusdi\s*$/i.test(t.textContent || '')) {
        return t.closest('a.page-item-each');
      }
    }
    return null;
  }

  function buildModal(){
    const wrap = document.createElement('div');
    wrap.id = 'store-modal';
    wrap.className = 'bl-modal';
    wrap.setAttribute('aria-hidden','true');
    wrap.setAttribute('role','dialog');
    wrap.setAttribute('aria-labelledby','store-modal-title');

    wrap.innerHTML = `
      <div class="bl-overlay" aria-hidden="true"></div>
      <div class="bl-dialog" role="document">
        <button class="bl-close" type="button" aria-label="Tutup">×</button>
        <h3 id="store-modal-title" class="bl-title">Store Larusdi</h3>
        <p class="bl-copy">
          Di sini teman-teman bisa berbelanja produk resmi Larusdi: merchandise,
          item digital, dan koleksi pilihan. Kami sedang menyiapkan pengalaman
          belanja yang lebih nyaman dan aman untukmu.
        </p>
        <p class="bl-note">Terima kasih sudah menunggu!</p>
        <p class="bl-note">Coming Soon.</p>
      </div>
    `;
    document.body.appendChild(wrap);
    return wrap;
  }

  function openModal(modal){
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal(modal){
    const dlg = modal.querySelector('.bl-dialog');
    dlg.classList.add('closing');
    setTimeout(() => {
      modal.setAttribute('aria-hidden','true');
      dlg.classList.remove('closing');
      document.body.classList.remove('modal-open');
    }, 220);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const anchor = findStoreAnchor();
    if (!anchor) return;

    const modal = buildModal();
    const closeBtn = modal.querySelector('.bl-close');

    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modal);
    });

    closeBtn.addEventListener('click', () => closeModal(modal));

    modal.querySelector('.bl-overlay').addEventListener('click', e => e.stopPropagation());
    window.addEventListener('keydown', e => {
      if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') e.preventDefault();
    });
  });
})();



/* ===== Modal Profile ===== */
(function () {
  function ensureProfileModal() {
    let modal = document.getElementById('profile-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'profile-modal';
    modal.className = 'bl-modal';
    modal.setAttribute('aria-hidden','true');
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-labelledby','profile-modal-title');

    modal.innerHTML = `
      <div class="bl-overlay" aria-hidden="true"></div>
      <div class="bl-dialog" role="document">
        <button class="bl-close" type="button" aria-label="Tutup">×</button>
        <h3 id="profile-modal-title" class="bl-title">Halo, aku Latif Rusdi</h3>
        <p class="bl-copy">
          Selamat datang di <strong>Ranah Link.</strong> satu pintu ke semua tautanku.
          Di sini kamu bisa temukan sosial media, karya, donasi, dan info terbaru.
        </p>
        <p class="bl-note">
          Terima kasih sudah mampir. Semoga betah ya! ✨
        </p>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function openModal(modal){
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }
  function closeModal(modal){
    const dlg = modal.querySelector('.bl-dialog');
    dlg.classList.add('closing');
    setTimeout(() => {
      modal.setAttribute('aria-hidden','true');
      dlg.classList.remove('closing');
      document.body.classList.remove('modal-open');
    }, 220);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const avatar = document.querySelector('.display-image');
    if (!avatar) return;

    const modal = ensureProfileModal();
    const closeBtn = modal.querySelector('.bl-close');

    // buka modal saat foto profil diklik
    avatar.addEventListener('click', () => openModal(modal));

    // wajib pakai tombol X untuk menutup (overlay & ESC diblok)
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.querySelector('.bl-overlay').addEventListener('click', e => e.stopPropagation());
    window.addEventListener('keydown', e => {
      if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') e.preventDefault();
    });
  });
})();



/* ===== Modal ceklis Biru ===== */
(function(){
  function createBadgeModal(){
    let m = document.getElementById('vb-verified');
    if (m) return m;

    m = document.createElement('div');
    m.id = 'vb-verified';
    m.className = 'vb-modal';
    m.setAttribute('aria-hidden','true');
    m.innerHTML = `
      <div class="vb-card" role="dialog" aria-labelledby="vb-title" aria-modal="true">
        <button class="vb-close" type="button" aria-label="Tutup">×</button>
        <h3 id="vb-title" class="vb-title">Akun Terverifikasi</h3>
        <p class="vb-copy">
          Lencana ini menandakan profil <strong>Latif Rusdi</strong> resmi dan terpercaya.
        </p>
        <p class="vb-note">Terima kasih sudah berkunjung ke <strong>Ranah Link</strong> ✨</p>
      </div>`;
    document.body.appendChild(m);
    return m;
  }

  function openModal(m){
    m.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }
  function closeModal(m){
    const card = m.querySelector('.vb-card');
    card.classList.add('closing');
    setTimeout(()=> {
      m.setAttribute('aria-hidden','true');
      card.classList.remove('closing');
      document.body.classList.remove('modal-open');
    }, 220);
  }

  function burstConfetti(target){
    const rect = target.getBoundingClientRect();
    const root = target.closest('.verified-badge') || target.parentElement;
    for(let i=0;i<12;i++){
      const s = document.createElement('span');
      s.className = 'vb-confetti';
      s.textContent = ['✨','⭐','💎','✅'][i % 4];
      const angle = (Math.PI * 2 * i / 12) + (Math.random()*0.6 - 0.3);
      const dist  = 26 + Math.random()*18;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist * -1; // naik sedikit
      const rot = (Math.random()*140 - 70) + 'deg';
      s.style.setProperty('--tx', tx+'px');
      s.style.setProperty('--ty', ty+'px');
      s.style.setProperty('--rot', rot);
      s.style.left = (rect.width/2 - 7) + 'px';
      s.style.top  = (rect.height/2 - 7) + 'px';
      (root || target).appendChild(s);
      setTimeout(()=> s.remove(), 820);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    const badge = document.querySelector('.verified-badge');
    if (!badge) return;

    const modal = createBadgeModal();
    const closeBtn = modal.querySelector('.vb-close');

    badge.addEventListener('click', () => {
      // animasi wiggle + konfeti
      badge.classList.add('wiggle');
      burstConfetti(badge);
      setTimeout(()=> badge.classList.remove('wiggle'), 620);

      // buka modal
      openModal(modal);
    });

    // Wajib tutup pakai X
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', e => {
      // blok klik overlay; biarkan klik hanya pada tombol X
      if (e.target === modal) e.stopPropagation();
    });
    window.addEventListener('keydown', e => {
      // block ESC agar benar2 harus klik X
      if (modal.getAttribute('aria-hidden')==='false' && e.key === 'Escape') e.preventDefault();
    });
  });
})();



/* ===== Modal Briefz ===== */
(function(){
  function ensurePopover(){
    let el = document.getElementById('lt-powered-pop');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'lt-powered-pop';
    el.className = 'lt-pop';
    el.setAttribute('role','dialog');
    el.setAttribute('aria-live','polite');
    el.setAttribute('aria-hidden','true');
    el.innerHTML = `
      <h4 class="lt-pop__title">Powered by Briefz</h4>
      <p class="lt-pop__desc">
        Halaman link ini berjalan di atas layanan <strong>Briefz.</strong> biar rapi,
        cepat, dan gampang dikelola.
      </p>
      <p class="lt-pop__hint">Ketuk di luar atau tekan Esc untuk menutup.</p>
    `;
    document.body.appendChild(el);
    return el;
  }

  function openPop(pop){
    pop.dataset.open = "true";
    pop.setAttribute('aria-hidden','false');
  }
  function closePop(pop){
    pop.dataset.open = "false";
    pop.setAttribute('aria-hidden','true');
  }

  window.addEventListener('DOMContentLoaded', () => {
    const brand = document.querySelector('.lt-chip__brand');
    if (!brand) return;

    const pop = ensurePopover();

    brand.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = pop.dataset.open === "true";
      if (isOpen) { closePop(pop); }
      else { openPop(pop); }
    });

    document.addEventListener('click', (e) => {
      if (pop.dataset.open !== "true") return;
      const clickedBrand = e.target.closest('.lt-chip__brand');
      const clickedPop   = e.target.closest('#lt-powered-pop');
      if (!clickedBrand && !clickedPop) closePop(pop);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pop.dataset.open === "true") closePop(pop);
    });
  });
})();



/* ===== Modal Icon Sosial di Bawah Bio ===== */
document.addEventListener('DOMContentLoaded', () => {
  const SOCIAL_INFO = {
    linkedin: {
      title: "LinkedIn",
      html: `
        <p>Tempat buat <strong>jejaring profesional</strong>, rangkum pengalaman, proyek, dan kolaborasi.</p>
        <ul>
          <li>Portfolio singkat & pencapaian</li>
          <li>Kesempatan kerja & kolaborasi</li>
          <li>DM profesional</li>
        </ul>`
    },
    instagram: {
      title: "Instagram",
      html: `
        <p>Feed, Reels, dan <strong>story harian</strong>—highlight live, klip, dan behind-the-scenes.</p>
        <ul>
          <li>Cuplikan live gaming</li>
          <li>Tantangan & interaksi cepat</li>
          <li>Update visual</li>
        </ul>`
    },
    facebook: {
      title: "Facebook",
      html: `
        <p><strong>Komunitas & pengumuman</strong> dengan posting panjang, event, dan diskusi.</p>
        <ul>
          <li>Posting detail & album</li>
          <li>Event & RSVP</li>
          <li>Grup komunitas</li>
        </ul>`
    },
    twitter: {
      title: "Twitter / X",
      html: `
        <p><strong>Update cepat</strong>, pengumuman real-time, dan obrolan saat live.</p>
        <ul>
          <li>Pengumuman singkat</li>
          <li>Thread cepat</li>
          <li>Interaksi realtime</li>
        </ul>`
    }
  };

  function buildModal(key){
    const data = SOCIAL_INFO[key];
    if(!data) return null;
    const wrap = document.createElement('div');
    wrap.className = 'modal hidden';
    wrap.id = `modal-${key}`;
    wrap.setAttribute('role','dialog');
    wrap.setAttribute('aria-modal','true');
    wrap.setAttribute('aria-labelledby', `ttl-${key}`);
    wrap.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-card">
        <button class="modal-close" aria-label="Tutup">×</button>
        <h3 id="ttl-${key}" style="margin:0 32px 10px 0;font:700 18px/1.2 Inter,system-ui">${data.title}</h3>
        ${data.html}
      </div>`;
    document.body.appendChild(wrap);
    wireModal(wrap);
    return wrap;
  }

  function openModal(el){ el && el.classList.remove('hidden'); }
  function closeModal(el){ el && el.classList.add('hidden'); }

  function wireModal(modal){
    const closeBtn  = modal.querySelector('.modal-close');
    const backdrop  = modal.querySelector('.modal-backdrop');
    const card      = modal.querySelector('.modal-card');

    closeBtn?.addEventListener('click', () => closeModal(modal));

    const deny = () => {
      if (!card?.animate) return;
      card.animate(
        [
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(0) scale(.985)' },
          { transform: 'translateY(0) scale(1)' }
        ],
        { duration: 150, easing: 'ease-out' }
      );
    };
    backdrop?.addEventListener('click', (e) => { e.stopPropagation(); deny(); });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { e.stopPropagation(); deny(); }
    });

    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && !modal.classList.contains('hidden')) {
        ev.preventDefault();
      }
    });
  }

  document.querySelectorAll('.social-icon-anchor').forEach(a => {
    const key = a.dataset.id;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      let modal = document.getElementById(`modal-${key}`);
      if (!modal) modal = buildModal(key);
      openModal(modal);
    });
  });
});