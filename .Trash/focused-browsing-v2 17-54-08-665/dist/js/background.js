(()=>{var t,e={562:()=>{var t={twitter:{focus:!0}},e={};function r(e,r,o){var s=o.url;r&&"complete"===r.status&&s.includes("twitter.com")&&t.twitter.focus&&(i(s)?n("twitter","focus","initial"):"https://twitter.com/"!=s&!s.includes("/i/display")&&n("twitter","focus","hidePanels"),s)}function o(t){if("log"==t.event){var e=t.log;console.log(e)}}function n(t,r,o){try{chrome.tabs.query({active:!0,currentWindow:!0},(function(t){var n=t[0].url,i=function(t){return e[t]}(t[0].id),s={url:n,status:r,method:o};i.postMessage(s)}))}catch(t){console.log("background script hasn't initialized port")}}function i(t){return"https://twitter.com/home"===t}function s(e,r){t[e].focus?n(0,"unfocus",r):n(0,"focus",r),t[e].focus=!t[e].focus}chrome.runtime.onConnect.addListener((function(t){console.assert("Focused Browsing"==t.name);var r=t.sender.tab;e[r.id]=t,e[r.id].onMessage.addListener(o)})),chrome.tabs.onUpdated.addListener(r),chrome.tabs.onUpdated.addListener(r),chrome.commands.onCommand.addListener((function(t,e){chrome.tabs.get(e.id,(function(t){var e=t.url;e.includes("twitter.com")&&(i(e)?s("twitter","toggle"):s("twitter","hidePanels"))}))})),chrome.runtime.onMessage.addListener((function(t,e,r){var o=e.tab.url.includes("twitter.com")?"twitter":"";"unfocus"==t.intent&&s(o,"toggle")}))},337:()=>{},835:()=>{},606:()=>{}},r={};function o(t){var n=r[t];if(void 0!==n)return n.exports;var i=r[t]={exports:{}};return e[t](i,i.exports,o),i.exports}o.m=e,t=[],o.O=(e,r,n,i)=>{if(!r){var s=1/0;for(u=0;u<t.length;u++){for(var[r,n,i]=t[u],c=!0,a=0;a<r.length;a++)(!1&i||s>=i)&&Object.keys(o.O).every((t=>o.O[t](r[a])))?r.splice(a--,1):(c=!1,i<s&&(s=i));c&&(t.splice(u--,1),e=n())}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[r,n,i]},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={248:0,348:0,447:0,741:0};o.O.j=e=>0===t[e];var e=(e,r)=>{var n,i,[s,c,a]=r,u=0;for(n in c)o.o(c,n)&&(o.m[n]=c[n]);if(a)var d=a(o);for(e&&e(r);u<s.length;u++)i=s[u],o.o(t,i)&&t[i]&&t[i][0](),t[s[u]]=0;return o.O(d)},r=self.webpackChunk=self.webpackChunk||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})(),o.O(void 0,[348,447,741],(()=>o(562))),o.O(void 0,[348,447,741],(()=>o(337))),o.O(void 0,[348,447,741],(()=>o(835)));var n=o.O(void 0,[348,447,741],(()=>o(606)));n=o.O(n)})();