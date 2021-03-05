 
/** Copyright (c) 2020 Sailthru, Inc. | Revision: bb2a11715e8bf6738c91392009de05950a898fc0 | Generated: 2020-04-20T15:00:16Z **/
 
(function(){var a,b=Array.prototype.indexOf||function(e){for(var d=0,c=this.length;d<c;d++){if(d in this&&this[d]===e){return d}}return -1};window.Sailthru=window.sailthru=a=(function(){var d;d=null;function c(){this.options={spider:true,concierge:false,track_url:true,useStoredTags:false,useFullUrl:false,cookieDomain:window.location.host};this.hidden=false;this.protocol=window.location.protocol}c.setup=function(l){var i,h,j,m,f,g,e;if(typeof l.domain==="undefined"){return}j=c;j.tracked={};if(!(j.__instance instanceof c)){j.__instance=new this;for(i in l){h=l[i];j.__instance.options[i]=l[i]}if(typeof j.__instance.options.tags==="undefined"){j.__instance.options.tags=j.__instance.getContentTags()}if(j.__instance.options.jQuery){c.jq=j.__instance.options.jQuery}else{if(window.jQuery){c.jq=window.jQuery}else{if(window.$){c.jq=window.$}}}f=j.__instance.cookieIsEnabled();e=document.location.search.indexOf("concierge_stage")!==-1;g=j.__instance.getCookie("sailthru_recommendation_hidden")==="true";if((j.__instance.options.concierge||e)&&f&&!g){j.__instance.options.concierge=j.__instance._conciergeDefaultOptions();if(l.concierge!==true){m=l.concierge;for(i in m){h=m[i];j.__instance.options.concierge[i]=l.concierge[i]}}if(e){j.__instance.options.concierge.stage=1}if(!l.concierge.stage_only||e){j.__instance._recommendationBox()}}else{if(typeof j.__instance.options.tags!=="undefined"||j.__instance.options.spider===true){j.__instance._horizonTrack()}}}return j.__instance};c.logFB=function(g){var i,h,e,f;if(g==null){g=false}if(g===false){g=window.location.href}h={};f=function(j,l){var k;if(typeof window.FB!=="undefined"){window.FB.api("/",{id:j},function(m){if(m.shares!=="undefined"){return l(m.shares)}})}else{k={url:"https://graph.facebook.com/?id="+encodeURIComponent(j),async:false,success:function(m){if(m.shares!=="undefined"){return l(m.shares)}}};$.ajax(k)}};if(window.FB){e=window.FB;i=(function(){var j;j=false;e.getLoginStatus(function(k){if(k.authResponse){if(k.authResponse.userID){j={logged_in:true,uid:k.authResponse.userID!=null}}}else{if(k.session){if(k.session.uid){j={uid:k.session.uid,logged_in:true}}}else{j=false}}});return j})();if(i!==false){h=i}}f(g,function(j){if(j!=="undefined"){h.shares=j}});return h};c.track=function(h){if(typeof h.domain==="undefined"){return}if(typeof h.spider==="undefined"){h.spider=1}var f,e,g=c;g.__trackInstance=new this;for(f in h){e=h[f];g.__trackInstance.options[f]=h[f]}if(typeof g.__trackInstance.options.tags==="undefined"){g.__trackInstance.options.tags=g.__trackInstance.getContentTags()}g.__trackInstance._horizonTrack()};c.prototype.getContentTags=function(){var j,f,i,h,g,e;j=document.getElementsByTagName("meta");if(j.length>0){for(i=0,g=j.length;i<g;i++){f=j[i];if(typeof f.name!=="undefined"&&f.name.toLowerCase()==="sailthru.tags"&&typeof f.content!=="undefined"){return f.content}}for(h=0,e=j.length;h<e;h++){f=j[h];if(typeof f.name!=="undefined"&&f.name.toLowerCase()==="keywords"&&typeof f.content!=="undefined"){return f.content}}}return null};c.prototype.getCookie=function(g){var j,f,i,h,e;if(this.cookieIsEnabled()!==true){return null}i=g+"=";f=document.cookie.split(";");for(h=0,e=f.length;h<e;h++){j=f[h];while(j.charAt(0)===" "){j=j.substring(1,j.length)}if(j.indexOf(i)===0){return j.substring(i.length,j.length)}}return null};c.prototype.setCookie=function(f,g,i){var h,e;if(this.cookieIsEnabled()!==true){return false}e=new Date();e.setDate(e.getDate()+i);h=f+"="+escape(g);if(i!==null){e=new Date();e.setDate(e.getDate()+i);h+=";expires="+e.toUTCString()}h+=";path=/;domain="+this.options.cookieDomain;document.cookie=h;return true};c.prototype.cookieIsEnabled=function(){return navigator.cookieEnabled||(b.call(document,"cookie")>=0&&(document.cookie.length>0||(document.cookie="test").indexOf.call(document.cookie,"test")>-1))};c.prototype.tagsToString=function(f){var e;e=f instanceof Array?f.join(","):f;return e};c.recommendationTrack=function(l,g,f,h,q){var p,m,n,j,i,e,o;if(typeof c.tracked==="undefined"){c.tracked={}}if(c.tracked[f]){return}c.tracked[f]=true;if(window.location.protocol==="https:"){e="https://horizon.sailthru.com/horizon/recommendtrack?id="+g;e+="&d="+l;sailthru_hid=this.getCookie("sailthru_hid");sailthru_bid=this.getCookie("sailthru_bid");if(sailthru_hid!==null){e+="&hid="+sailthru_hid}if(sailthru_bid!==null){e+="&bid="+sailthru_bid}}else{e=window.location.protocol+"//"+l+"/horizon/recommendtrack?id="+g}if(f){e+="&event="+f}if(h){for(j in h){o=h[j];e+="&"+j+"="+encodeURIComponent(o)}}if(q&&q.useFullUrl){e+="&from_url="+encodeURIComponent(document.location)}if(f==="click"){n=c.__instance;p=parseInt(n.getCookie("hcl"));p=isNaN(p)?1:p+1;n.setCookie("hcl",p,5)}i=parseInt(Math.random()*10000,10);e+="&cb="+i;m=new Image(1,1);m.src=e;m.onerror="";return};c.recommendationBoxCallback=function(e){return c.jq(document).trigger("SailthruDataLoaded",[e])};c.emailSignup=function(){var f=c.__instance.options;var e,g;g=c.jq(this).serialize();if(document.getElementById("sailthru_email_address")){e=window.location.protocol+"//"+f.domain+"/horizon/conciergesignup?format=jsonp&callback=?&"+g;if(f.concierge.stage){e+="&concierge_stage=1"}c.jq.getJSON(e)}return false};c.signupCallback=function(g){var f,e;f=c.jq(".recommendationSignup");f.html(g.content.html);e=f.find("form");e.submit(c.emailSignup);if(g.ok){setTimeout(function(){c.prototype._hide();c.__instance.hidden=true},1500)}};c.prototype.test=function(){if(typeof console!=="undefined"){console.log("this is test call")}return};c.prototype._conciergeDefaultOptions=function(){var f,e;f="ak.sail-horizon.com";return e={from:"top",threshold:400,delay:null,offsetBottom:0,cssPath:this.protocol+"//"+f+"/horizon/recommendation.css"}};c.prototype._recommendationBox=function(){var j,g,h,l,e,m,k,f,i;j=c.jq.extend({},this.options.concierge);e=null;g=false;if(this.protocol==="https:"){j.url="https://horizon.sailthru.com/recommend?format=jsonp&callback=?";sailthru_hid=this.getCookie("sailthru_hid");sailthru_bid=this.getCookie("sailthru_bid");j.url+="&d="+this.options.domain;if(sailthru_hid!==null){j.url+="&hid="+sailthru_hid}if(sailthru_bid!==null){j.url+="&bid="+sailthru_bid}}else{j.url=this.protocol+"//"+this.options.domain+"/recommend?format=jsonp&callback=?"}if(this.options.concierge.filter&&this.options.concierge.filter.tags){j.url+="&filter[tags]="+this.tagsToString(this.options.concierge.filter.tags)}if(this.options.spider!==true){j.url+="&nospider=1"}if(this.options.noPageview){j.url+="&nopageview=1"}if(this.options.useStoredTags){j.url+="&use_stored_tags=1"}if(this.options.tags){j.url+="&tags="+encodeURIComponent(this.tagsToString(this.options.tags))}if(this.getCookie("hcl")){j.url+="&num_clicks="+this.getCookie("hcl")}if(this.options.concierge.stage){j.url+="&concierge_stage=1"}if(this.options.useFullUrl){j.url+="&url="+encodeURIComponent(document.location)}j.domain=this.options.domain;this.data={};l=this;h=typeof this.options.delay!=="undefined"?this.options.delay:false;k=function(){var n=this;f(j.cssPath);c.jq(document).bind("SailthruDataLoaded",function(p,o){n.data=o;n.dataLoaded=true;return m.call(n)});c.jq.getJSON(j.url);c.jq(window).scroll(function(s){var r,p,q,t,o;if(n.dataLoaded===true){r=c.jq(this);q=r.scrollTop();p=c.jq(document).height()-c.jq(window).height();if(j.threshold instanceof jQuery){o=0-(j.threshold.eq(0).offset().top-c.jq(window).height());t=0}else{o=j.from==="bottom"?j.threshold:-j.threshold;t=j.from==="bottom"?p:0}if(q>=(t-o)&&!n.hidden){return i.call(n)}else{return c.__instance._hide()}}});if(h){return e=setTimeout(function(){clearTimeout(e);return i.call(n)},h)}};f=function(o){var n;n=document.createElement("link");n.href=o;n.rel="stylesheet";n.type="text/css";n.async=true;document.getElementsByTagName("head")[0].appendChild(n)};m=function(){var q,o,s,p,n,r=this;p=this.data.content;q=c.jq('<div class="recommendation sailthruRecommendation" />');if(navigator.appVersion.indexOf("MSIE 1")!=-1){q.addClass("ie")}if(typeof p.html!=="undefined"){q.html(p.html);o=q.find("a.closeRecommendation");s=q.find("a.openRecommendation");n=q.find("form");q.appendTo("body")}o.click(function(t){t.preventDefault();l.setCookie("sailthru_recommendation_hidden","true",30);r.hidden=true;c.__instance._hide();return false});s.click(function(t){t.preventDefault();l.setCookie("sailthru_recommendation_hidden","false",30);r.hidden=false;i.call(r);return false});n.submit(c.emailSignup);setTimeout(function(){var u,v,t;u=c.jq('<iframe id="sailthru_iframe" src="" FRAMEBORDER="0" />');v={bottom:j.offsetBottom,zIndex:"10000"};q.css(v);t={position:"fixed",width:q.outerWidth(),height:q.outerHeight(),zIndex:"9999",right:0,bottom:j.offsetBottom,display:"none"};u.css(t);u.appendTo("body");r.$elem=q;return r.$iframe=u},100)};i=function(){if(!navigator.cookieEnabled){return false}if(l.getCookie("sailthru_recommendation_hidden"==="true")){return false}if(c.__instance.hidden){return false}if(this.$elem&&!this.$elem.is(":animated")){this.$elem.find(".openWrapper").hide();this.$iframe.show();this.$elem.show().animate({right:0},"normal")}if(!this.data.content.id){return false}return c.recommendationTrack(j.domain,this.data.content.id,"show",this.data.track,this.options)};return k.call(this)};c.prototype._hide=function(){var k,g,i,e,h,f,j=this;g=c.jq(".sailthruRecommendation");i=c.jq("#sailthru_iframe");if(g&&!g.is(":animated")){e=g.find(".openWrapper");k=e.children("a");h=(g.outerHeight()/2)-11;e.show();f=g.outerWidth()-e.outerWidth();return g.animate({right:-f},"normal",function(){return i.hide()})}};c.prototype._horizonTrack=function(){var i,l,f,m,h,g,j,n,k,e;f=parseInt(Math.random()*10000,10);i=this.protocol==="https:"?"horizon.sailthru.com":this.options.domain;g=this.protocol+"//"+i+"/horizon/track";g+="?r="+f;if(this.options.track_url===true){g+="&url="+((this.options.url!=undefined)?encodeURIComponent(this.options.url):encodeURIComponent(document.location))}if(this.options.useFullUrl){g+="&url="+encodeURIComponent(document.location)}if(this.protocol==="https:"){g+="&d="+this.options.domain}m=this.getCookie("sailthru_hid");h=this.getCookie("sailthru_bid");if(m!==null&&(this.protocol==="https:")){g+="&hid="+m}if(h!==null&&(this.protocol==="https:")){g+="&bid="+h}if(typeof this.options.tag!=="undefined"){this.options.tags=this.options.tag}if(this.options.useStoredTags){g+="&use_stored_tags=1"}if(this.options.tags){if(this.options.tags instanceof Array){g+="&tags="+encodeURIComponent(this.options.tags.join(","))}else{if(this.options.tags instanceof Object){k=this.options.tags;for(j in k){e=k[j];g+="&tags["+encodeURIComponent(j)+"]="+encodeURIComponent(e)}}else{g+="&tags="+encodeURIComponent(this.options.tags)}}}if(this.options.spider){g+="&spider=1"}l=new Image(1,1);l.src=g;l.onerror="";return l};return c})()}).call(this);