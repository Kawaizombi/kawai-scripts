// ==UserScript==
// @name        @kawai-scripts/hover-zoom
// @version     1.0.0
// @author      kawaizombi
// @description Show image preview on link hover
// @homepage    https://github.com/Kawaizombi/kawai-scripts/tree/master/projects/hover-zoom
// @supportURL  https://github.com/Kawaizombi/kawai-scripts/issues
// @match       *://*/*
// @license     MIT
// @grunt       none
// ==/UserScript==

!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,u){function i(e){try{c(r.next(e))}catch(e){u(e)}}function a(e){try{c(r.throw(e))}catch(e){u(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function a(u){return function(a){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,r=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=t.call(e,i)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,a])}}},o=this,u=["jpeg","jpg","png","gif","webp","bmp"],i={position:"absolute",zIndex:"9999999",pointerEvents:"none",maxWidth:"50%",maxHeight:"50%",border:"2px solid #ccc",borderRadius:"3px"};function a(e,t,n){e.style.left=t+"px",e.style.top=n+"px"}document.querySelectorAll("a").forEach((function(e){e.addEventListener("mouseenter",(function(t){var c=t.pageX,l=t.pageY;return n(o,void 0,void 0,(function(){var t,n,o;return r(this,(function(r){return t=e.getAttribute("href"),n=t.split(".").reverse()[0],u.includes(n)&&!e.querySelector("img")&&(o=function(e){var t=new Image;return Object.assign(t.style,i),t.src=e,t}(t),document.body.appendChild(o),a(o,c,l),function(e,t){var n=function(t){var n=t.pageX,r=t.pageY;return a(e,n,r)},r=function(){e.remove(),t.removeEventListener("mousemove",n),t.removeEventListener("mouseleave",r)};t.addEventListener("mousemove",n),t.addEventListener("mouseleave",r)}(o,e)),[2]}))}))}))}))}]);