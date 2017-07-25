'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function loadDaumScript() {
  /* eslint-disable */
  window.daum = window.daum || {}, function (a) {
    function b() {
      for (var a = 0, b = l.length; b > a; a++) {
        document.write('<script charset="UTF-8" type="text/javascript" src="' + (i + l[a]) + '"></script>');
      }h = 2;
    }function c() {
      for (var a = 0, b = l.length; b > a; a++) {
        var c = document.createElement("script");n[l[a]] = !1, c.type = "text/javascript", c.charset = "utf-8", c.src = i + l[a], c.onload = function () {
          var b = l[a];return function () {
            var a = b;n[a] || (n[a] = !0), e() && f();
          };
        }(), c.onreadystatechange = function () {
          var b = l[a];return function () {
            /loaded|complete/.test(this.readyState) && (n[b] || (n[b] = !0), e() && f());
          };
        }(), document.getElementsByTagName("head")[0].appendChild(c);
      }
    }function d(a) {
      var b = {};return a.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, c, d) {
        b[c] = d;
      }), b;
    }function e() {
      for (var a = 0, b = 0, c = l.length; c > b; b++) {
        n[l[b]] && a++;
      }return a === l.length ? !0 : !1;
    }function f() {
      for (h = 2; g[0];) {
        g.shift()();
      }
    }a.postcode = {};var g = [],
        h = 0,
        i = "https:" == location.protocol ? "https:" : "http:",
        j = document.getElementsByTagName("script"),
        k = j[j.length - 1].src;j = null;var l = ["//s1.daumcdn.net/svc/attach/U03/cssjs/postcode/1495012223804/170517.js"];if (/\/map_js_init\/postcode.v2(\.dev){0,1}(\.update){0,1}\.js\b/.test(k)) {
      var m = d(k);"false" !== m.autoload && (b(), h = 2);
    }var n = {};a.postcode.version = "170517", a.postcode.load = function (a) {
      if (a && "function" == typeof a) switch (g.push(a), h) {case 0:
          h = 1, c();break;case 2:
          f();}
    };
  }(window.daum);
  /* eslint-enable */
}

exports.default = loadDaumScript;