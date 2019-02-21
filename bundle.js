(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.viktortween = {})));
}(this, (function (exports) { 'use strict';

  var easing={linear:function b(a){return a},easeInQuad:function b(a){return a*a},easeOutQuad:function b(a){return a*(2-a)},easeInOutQuad:function b(a){return .5>a?2*a*a:-1+(4-2*a)*a},easeInCubic:function b(a){return a*a*a},easeOutCubic:function b(a){return--a*a*a+1},easeInOutCubic:function b(a){return .5>a?4*a*a*a:(a-1)*(2*a-2)*(2*a-2)+1},easeInQuart:function b(a){return a*a*a*a},easeOutQuart:function b(a){return 1- --a*a*a*a},easeInOutQuart:function b(a){return .5>a?8*a*a*a*a:1-8*--a*a*a*a},easeInQuint:function b(a){return a*a*a*a*a},easeOutQuint:function b(a){return 1+--a*a*a*a*a},easeInOutQuint:function b(a){return .5>a?16*a*a*a*a*a:1+16*--a*a*a*a*a},easeInBack:function c(a){var b=1.70158;return a*a*((b+1)*a-b)},easeOutBack:function c(a){var b=1.70158;return--a*a*((b+1)*a+b)+1},easeInOutBack:function c(a){var b=1.70158;return 1>(a/=.5)?.5*(a*a*(((b*=1.525)+1)*a-b)):.5*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},elastic:function b(a){return-1*Math.pow(4,-8*a)*Math.sin((6*a-1)*(2*Math.PI)/2)+1},bounce:function b(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},bouncePast:function b(a){return a<1/2.75?7.5625*a*a:a<2/2.75?2-(7.5625*(a-=1.5/2.75)*a+.75):a<2.5/2.75?2-(7.5625*(a-=2.25/2.75)*a+.9375):2-(7.5625*(a-=2.625/2.75)*a+.984375)}};var defaultEasing=easing.easeOutQuad,tweenProp=function(a,b,c,d,e,f){var g=window.performance.now(),h=!1,i=[],j=[],k=function(l){var m=Math.min;if(!h){var n=m(1,(l-g)/e);a[b]=c+(d-c)*f(n),i.forEach(function(a){return a(n)}),1>n?window.requestAnimationFrame(k):j.forEach(function(a){return a()});}};window.requestAnimationFrame(k);var l={stop:function a(){return h=!0,l},onUpdate:function b(a){return i.push(a),l},onComplete:function b(a){return j.push(a),l}};return l};var tween=function(a,b,c,d,e){var f=5<arguments.length&&arguments[5]!==void 0?arguments[5]:defaultEasing;if(c instanceof Object){a[b]||(a[b]={});var g=Object.keys(c).map(function(g){return tweenProp(a[b],g,c[g],d[g],e,f)}),h={stop:function a(){return g.forEach(function(a){return a.stop()}),h},onUpdate:function b(a){return g.forEach(function(b){return b.onUpdate(a)}),h},onComplete:function b(a){return g.forEach(function(b){return b.onComplete(a)}),h}};return h}return tweenProp(a,b,c,d,e,f)};

  exports.easing = easing;
  exports.tween = tween;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
