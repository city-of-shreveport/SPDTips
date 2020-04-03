(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{10:function(e,t){e.exports.forEachSync=function(e,t){return new Promise((function(n,s){var r=0;!function i(o){if(o>=e.length)return n(e);var a=t(e[o],o);return r+=1,a instanceof Promise&&a.then((function(){return i(r)})).catch(s),i(r)}(0)}))},e.exports.minifyStr=function(e,t){return e.length<=t?e:"".concat(e.substr(0,Math.ceil(t/2))).concat(e.substr(e.length-Math.floor(t/2)))},e.exports.strToNumber=function(e,t){for(var n=1,s=0;s<e.length;s++)n=Math.imul(n,e.charCodeAt(s));var r=(Math.cos(n)+1)/2,i=Math.floor(r*t)-1;return i<0&&i++,i>=t&&(i=t-1),Math.floor(r*t)},e.exports.copyToClipboard=function(e){var t=document.createElement("input");return t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.value=e,t.select(),t.setSelectionRange(0,99999),document.execCommand("copy"),setTimeout((function(){t.remove()})),!0}},5:function(e,t,n){"use strict";n.r(t);var s=n(10),r=n(36),i=n.n(r);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(e,t){var n=e?"".concat(e.toUpperCase(),"-").concat(Object(s.minifyStr)(t,10)):"";return{type:e,xid:t,name:n}},u={data:function(){return{user:c(),sid:void 0,server:void 0,chats:[]}},methods:{init:function(e){this.server=i()(e,{autoConnect:!1}),this.server.on("connect",this._onConnectionStateChange.bind(this,!0)),this.server.on("disconnect",this._onConnectionStateChange.bind(this,!1)),this.server.on("newMessage",this._onNewMessage),this.server.on("isTypingFlag",this._onIsTypingFlag),this.server.on("connetedToRandomUser",this._onConnetedToRandomUser)},login:function(e,t){var n=this;return new Promise((function(s,r){n.server.open(),n.$once("connect",(function(){n.server.emit("login",{type:e,data:t},(function(t,i){t?(n.server.close(),r()):(n.sid=n.server.id,n.user=c(e,i),n._loadChats(),n.$emit("login",n.auth),s())}))}))}))},logout:function(){this._clearChats(),this.user=c(),this.server.close(),this.$emit("logout")},connectToRandomUser:function(){var e=this;return new Promise((function(t,n){e.server.emit("connectToRandomUser",(function(s,r){if(s||!r)n(s);else{var i=e._upsertChat(r.type,r.xid);e._saveChats(),t(i)}}))}))},_onConnetedToRandomUser:function(e){var t=e.type,n=e.xid,s=this._upsertChat(t,n);this._saveChats(),this.$emit("connetedToRandomUser",s)},sendMessage:function(e,t){var n=this;return new Promise((function(s,r){n.server.emit("sendMessage",{user:e.user,body:t},(function(i){var o={from:"me",body:t};"receiver-is-offline"===i?(e.isOnline=!1,e.pendingMessages.push(o),n._saveChats(),s()):i?r(i):(e.messages.push(o),n._saveChats(),s())}))}))},resendPendingMessages:function(e){var t=this,n=0;return Object(s.forEachSync)(e.pendingMessages.slice(0),(function(s,r){return new Promise((function(i){t.server.emit("sendMessage",{user:e.user,body:s.body},(function(o){var a={from:"me",body:s.body};o||(e.pendingMessages.splice(r+n,1),n--,e.messages.push(a),t._saveChats(),i())}))}))}))},sendIsTypingFlag:function(e){var t=this;return new Promise((function(n,s){t.server.emit("sendIsTypingFlag",{user:{type:e.user.type,xid:e.user.xid}},(function(e){e?s():n()}))}))},_onIsTypingFlag:function(e){this.$emit("isTypingFlag",e)},getChat:function(e){var t=e.type,n=e.xid;return this._upsertChat(t,n)},refreshChat:function(e){var t=this;return new Promise((function(n,s){t.server.emit("getUserStatus",e.user,(function(r,i){r?s():(e.isOnline=i,i&&t.resendPendingMessages(e),n(i))}))}))},_onNewMessage:function(e){var t=e.user,n=t.type,s=t.xid,r=e.body,i=this._upsertChat(n,s);i.isOnline=!0,i.messages.push({from:"its",body:r}),this._saveChats(),this.$emit("newMessage",{user:c(n,s),body:r})},_saveChats:function(){var e=this.chats.map((function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{isOnline:null})}));localStorage.setItem("".concat(this.user.type,":").concat(this.user.xid,":chats"),JSON.stringify(e))},_loadChats:function(){var e=localStorage.getItem("".concat(this.user.type,":").concat(this.user.xid,":chats"));e&&(this.chats=JSON.parse(e).map((function(e){return e.pendingMessages||(e.pendingMessages=[]),e})))},_clearChats:function(){localStorage.removeItem("".concat(this.user.type,":").concat(this.user.xid,":chats")),this.chats=[]},_onConnectionStateChange:function(e){!0===e?(this.sid=this.server.id,this.$emit("connect",this.sid)):(this.sid=void 0,this.$emit("disconnect"))},_upsertChat:function(e,t){var n=this.chats.find((function(n){return n.user.type===e&&n.user.xid===t}));return n||(n={user:c(e,t),isOnline:null,messages:[],pendingMessages:[]},this.chats.unshift(n)),n}}};t.default=u},61:function(e,t){}}]);