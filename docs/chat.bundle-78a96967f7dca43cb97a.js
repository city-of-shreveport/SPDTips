(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{23:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return a}));var i=n(24),s=n.n(i),o={"~x(":"at-wits-end.gif","x(":"angry-or-grumpy.gif",";;)":"batting-eyelashes.gif",">:d<":"big-hug.gif",'=">':"blushing.gif","=((":"broken-heart.gif",":-/":"confused.gif","b-)":"sunglasses-or-cool.gif",":((":"crying.gif","8->":"daydreaming.gif",">:)":"devil.gif",":-$":"do-not-tell-anyone.gif","#-o":"doh!.gif","=p~":"drooling.gif",x_x:"i-do-not-want-to-see.gif",":-*":"kiss.gif",":))":"laughing.gif",":x":"love-struck.gif",":-ss":"nail-biting.gif",":-b":"nerd.gif","[-(":"not-talking.gif",":)]":"on-the-phone.gif","<:-p":"party.gif",">:p":"phbbbbt-or-upset.gif","/:)":"raised-eyebrow.gif","8-|":"rolling-eyes.gif",":-w":"waiting.gif",":-h":"wave.gif","#:-s":"whew.gif",";)":"winking.gif",":-s":"worried.gif","(:|":"yawn.gif",">-)":"alien.gif","b-(":"beat-up.gif",":-@":"chatterbox.gif",":-??":"confused-or-i-don't-know.gif","\\:d/":"dancing.gif",":-l":"frustrated.gif",";))":"giggle-or-hee-hee.gif","%-(":"not-listening.gif",':-"':"whistling.gif",":(":"sad-or-frown-face.gif","=))":"rolling-on-the-floor-laughing.gif",":&":"sick.gif",":-<":"sigh.gif","|-)":"sleepy.gif",":)":"smile-or-happy-face.gif",":>":"smug.gif",":p":"frustrated-or-sticking-tongue-out.gif",":|":"straight-face.gif",":o":"surprised.gif",":-?":"thinking.gif",":d":"big-grin.gif"},r=Object.keys(o),a=function(e){for(var t=e||"",n=0;n<r.length;n++)for(var i=r[n],a=o[i],u=s()(i),f='<img src="/emoticons/'.concat(a,'" />');t.includes(u);)t=t.replace(u,f);return t}},5:function(e,t,n){"use strict";n.r(t),function(e){var i=n(39),s=n.n(i),o=n(67),r=n.n(o),a=n(23);e.translateToImg=a.b;var u=function(e,t){return{type:e,username:t}},f={data:function(){return{user:u(),sid:void 0,server:void 0,chats:[],db:null,_refreshChatsLoopTimeout:null}},methods:{init:function(e){this.server=s()(e,{autoConnect:!1}),this.server.on("connect",this._onConnectionStateChange.bind(this,!0)),this.server.on("disconnect",this._onConnectionStateChange.bind(this,!1)),this.server.on("newMessage",this._onNewMessage),this.server.on("isTypingFlag",this._onIsTypingFlag),this.server.on("connetedToRandomUser",this._onConnetedToRandomUser),this.server.open(),this.startRefreshChatsLoop()},login:function(e){var t=this;return new Promise((function(n,i){t.server.emit("auth",e,(function(e,s){e?i(e):(t.user=u(s.type,s.username),r()({name:"".concat(JSON.stringify(t.user),".db"),memory:!1,browser:!0,collections:["chats"]}).then((function(e){t.db=e,t._loadChats(),t.$emit("login",s.type,s.username),setTimeout((function(){t.server.emit("askForPendingMessages",(function(){}))})),n()})))}))}))},logout:function(){var e=this;this._clearChats(),setTimeout((function(){e.user=u(),e.$emit("logout"),setTimeout((function(){location.reload()}),100)}),900)},connectToRandomUser:function(){var e=this;return new Promise((function(t,n){e.server.emit("connectToRandomUser",(function(i,s){if(i||!s)n(i);else{var o=e._upsertChat(s.type,s.username);e._saveChats(),t(o)}}))}))},cancelConnectToRandomUser:function(){var e=this;return new Promise((function(t){e.server.emit("cancelConnectToRandomUser",(function(e){t()}))}))},_onConnetedToRandomUser:function(e){var t=e.type,n=e.username,i=this._upsertChat(t,n);this._saveChats(),this.$emit("connetedToRandomUser",i)},sendMessage:function(e,t){var n=this;return new Promise((function(i,s){n.server.emit("sendMessage",{user:e.user,body:t},(function(t,o){t&&s(t),e.messages.push({from:"me",body:Object(a.b)(o.body),date:o.date}),n._saveChats(),i()}))}))},sendIsTypingFlag:function(e){var t=this;return new Promise((function(n,i){t.server.emit("sendIsTypingFlag",{user:{type:e.user.type,username:e.user.username}},(function(e){e?i():n()}))}))},_onIsTypingFlag:function(e){this.$emit("isTypingFlag",e)},getChat:function(e){var t=e.type,n=e.username;return this._upsertChat(t,n)},deleteChat:function(e){this.chats.splice(this.chats.indexOf(e),1),this.db.chats.remove((function(t){return t.user.type===e.user.type&&t.user.username===e.user.username}))},refreshChat:function(e){var t=this;return new Promise((function(n){t.server.emit("getUserStatus",e.user,(function(t,i){e.isOnline=!t&&i,n(e.isOnline)}))}))},startRefreshChatsLoop:function(){var e=this;clearTimeout(this._refreshChatsLoopTimeout),this.chats.forEach((function(t){e.refreshChat(t)})),this._refreshChatsLoopTimeout=setTimeout((function(){e.startRefreshChatsLoop()}),1e4)},_onNewMessage:function(e){var t=e.from,n=t.type,i=t.username,s=e.body,o=e.date,r=this._upsertChat(n,i);r.isOnline=!0,r.messages.push({from:"its",body:Object(a.b)(s),date:o}),this._saveChats(),this.$emit("newMessage",{user:u(n,i),body:s,date:o})},_saveChats:function(){var e=this;"persist"===this.user.type&&this.db&&setTimeout((function(){e.chats.forEach((function(t){try{e.db.chats.update(t)}catch(n){e.db.chats.insert(t)}}))}))},_loadChats:function(){"persist"===this.user.type&&this.db?(this.chats=this.db.chats.find((function(){return!0})).map((function(e){return e.isOnline=null,JSON.parse(JSON.stringify(e))})),this.startRefreshChatsLoop()):this.chats=[]},_clearChats:function(){this.chats=[]},_onConnectionStateChange:function(e){!0===e?(this.sid=this.server.id,this.$emit("connect",this.sid)):(location.reload(),this.$emit("disconnect"))},_upsertChat:function(e,t){var n=this.chats.find((function(n){return n.user.type===e&&n.user.username===t}));return n||(n={user:u(e,t),isOnline:null,messages:[],pendingMessages:[],badge:0},this.chats.unshift(n)),n}}};t.default=f}.call(this,n(9))},64:function(e,t){},67:function(e,t,n){var i=n(68),s=n(36);e.exports=function(e){var t=e.name,n=e.memory,o=void 0!==n&&n,r=e.browser,a=void 0!==r&&r,u=e.collections,f=void 0===u?[]:u;return new Promise((function(e){var n,r=function(){var t={};f.forEach((function(e){var i;t[e]=(i=n,function(e){var t=i.getCollection(e)||i.addCollection(e);return{insert:function(e){return setTimeout(u),t.insert(e)},find:function(e){return t.where(e)},remove:function(e){return"function"==typeof e?t.removeWhere(e):(setTimeout(u),t.remove(e))},update:function(e,n){return"function"==typeof e?t.updateWhere(e,n):(setTimeout(u),t.update(e))}}})(e)})),e(t)},u=function(){n&&!o&&n.save()},c={};o||(c.autoload=!0,c.autoloadCallback=r),a&&(c.adapter=new s),n=new i(t,c),o&&r()}))}}}]);