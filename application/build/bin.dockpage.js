function fe(a,b){return aa[a]=b}C.prototype.ceil=fe(2,function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this});x.prototype.preventDefault=fe(1,function(){this.Eb=!1});yb.prototype.preventDefault=fe(0,function(){yb.d.preventDefault.call(this);var a=this.Tb;a.preventDefault?a.preventDefault():a.returnValue=!1});
function ge(a,b){var c=a.createElement("div");c.innerHTML=b;if(c.childNodes.length==1)return c.removeChild(c.firstChild);else{for(var d=a.createDocumentFragment();c.firstChild;)d.appendChild(c.firstChild);return d}}function he(a){return a.querySelectorAll&&a.querySelector&&(document.compatMode=="CSS1Compat"||Fa["528"]||(Fa["528"]=ya(Ca,"528")>=0))}var ie={};
function je(a,b){var c,d,f,g;c=b||document;if(he(c)&&a)return c.querySelectorAll(""+(a?"."+a:""));if(a&&c.getElementsByClassName){var h=c.getElementsByClassName(a);return h}h=c.getElementsByTagName("*");if(a){g={};for(d=f=0;c=h[d];d++){var k=c.className;typeof k.split=="function"&&Ha(k.split(/\s+/),a)>=0&&(g[f++]=c)}g.length=f;return g}else return h}function ke(a){return ie[a]||(ie[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))}function le(a,b,c){a.style[ke(c)]=b}
function me(a,b){var c=b||document;if(he(c))return c.querySelectorAll("."+a);else if(c.getElementsByClassName)return c.getElementsByClassName(a);return je(a,b)}function ne(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.unshift.apply(b,c);return a.apply(this,b)}}function oe(a,b){q(b)?le(a,i,b):db(b,ne(le,a))}function pe(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}
pe.prototype.K=function(){return new pe(this.left,this.top,this.width,this.height)};pe.prototype.toString=function(){return"("+this.left+", "+this.top+" - "+this.width+"w x "+this.height+"h)"};pe.prototype.contains=function(a){return a instanceof pe?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};pe.prototype.Oa=function(){return new C(this.width,this.height)};
function qe(){var a=new E;F(G("/me/home"),function(b){b.data&&!b.error?a.z(b):a.B(b)});return a}function re(a){var b=a||document,c=j;return(c=he(b)?b.querySelector(".H50"):me("H50",a)[0])||j}function se(a,b){this.x=ha(a)?a:0;this.y=ha(b)?b:0}se.prototype.K=function(){return new se(this.x,this.y)};se.prototype.toString=function(){return"("+this.x+", "+this.y+")"};function te(a){var b=a.length-13;return b>=0&&a.indexOf(".facebook.com",b)==b}var ue="ontouchstart"in window;
function ve(a){a=a.Tb;return ue?a.touches&&a.touches[0]?a.touches:a.changedTouches&&a.changedTouches[0]?a.changedTouches:a.targetTouches&&a.targetTouches[0]?a.targetTouches:[a]:[a]};var we={};we.go=function(a,b,c){var b=b||window,a=new uc(a),d=P(b);if(a.L=="facebook.com"||te(a.L)||a.L==d.L){if(a.toString()!=d.toString()){xc(a,d.L);vc(a,d.aa);yc(a,d.ka);var f=a.u,g=d.u;v(g.ga(),function(a){f.get(a)||f.set(a,g.get(a))});Ac(a,f);Ya?b.history.pushState({},"",a.toString()):(c=a.toString(),b.location.hash="!"+c.substr(c.indexOf(a.ua)));we.$c=d;Cd(we)}}else c&&!Va?b.open(a.toString()):b.location.href=a.toString()};we.$c=j;we.Me=function(){return we.$c?we.$c.K():j};function xe(){L.call(this)}t(xe,L);var ye=j;l=xe.prototype;l.qc=j;l.zf=5;l.h=function(){xe.d.h.call(this);A(N(this),this.e(),hc,this.ef);A(N(this),this.e(),"click",this.df)};l.ef=function(a){ye&&(Ra(ye,"H4"),ye=j);this.qc=j;var b=a.target;switch(b.nodeType){case 3:b=b.parentNode;break;case 1:break;default:return}if(b=b.getAttribute("cmd"))this.ae(b.toLowerCase(),a);else{var b=ve(a)[0],a=b.clientX,b=b.clientY,c=this.zf;this.qc=new pe(a-c,b-c,a+c,b+c)}};
l.df=function(a){for(var b=a.target,c=0,d=b.href;c<3&&b&&!d;)d=b.href,b=b.parentNode,c++;if(d&&!this.$e(d,a)){a.preventDefault();if(this.qc&&(a=ve(a)[0],!this.qc.contains(new se(a.clientX,a.clientY))))return;ye=b;Qa(b,"H4");we.go(d,Yc(this.o.k),!0)}};l.ae=ea;l.$e=ea;function R(a){this.a=a||new ze;L.call(this)}t(R,xe);R.prototype.a=j;R.prototype.s=function(a){a.qd=this.a.me?we.Me():j;var b=new J;b.append('<div id="',K(a.id),'" class="',"H16"," ","H7",'"><div class="',"H0",'"><div class="',"H1",'">',a.qd?'<div class="H2"><a href="'+K(a.qd)+'" class="H18">&lsaquo;</a></div><div class="H2 H19"></div>':"",'<div class="',"H2",'"><a href="/" class="',"H17",'">fastweb</a></div></div></div></div>');a=b.toString();return a.toString()};function ze(){}ze.prototype.me=!0;var Ae="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix,S="ontouchstart"in window,Be="webkitTransform"in document.documentElement.style,Ce=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){return window.setTimeout(a,1)};function De(a){return Ce.apply(window,arguments)}
var Ee=window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||window.clearTimeout;function Fe(a){Ee.apply(window,arguments)}var Ge="onorientationchange"in window?"orientationchange":"resize",He=S?"touchstart":"mousedown",Ie=S?"touchmove":"mousemove",Je=S?"touchend":"mouseup",Ke=S?"touchcancel":"mouseup",Le="translate"+(Ae?"3d(":"("),Me=Ae?",0)":")";function Ne(){}l=Ne.prototype;l.tb=!0;l.rc=!0;l.Mb=!0;l.ye=!1;l.Zb=!0;l.Xe=!0;l.va=!0;l.ca=!1;l.xf=0;l.td=!1;l.Pa=!0;l.Ha=!0;l.Jc=!1;l.Wb=!0;l.Ke=Ae;l.cd="";l.zoom=!1;l.ma=1;l.Ia=4;l.Ge=2;l.If="scroll";l.Ea=!1;l.nc=1;l.ce=j;l.$d=function(a){a.preventDefault()};l.Xd=j;l.Vc=j;l.Zd=j;l.de=j;l.Yd=j;l.Ab=j;l.ee=j;l.be=j;l.Wa=j;l.fe=j;l.Va=j;/*
 PiScroll v4.1.8 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 Released under MIT license, http://cubiq.org/license
*/
function Oe(a,b,c){this.handleEvent=this.handleEvent;this.Ed=c=c||document;this.W=Yc((new fd(c)).k);this.eb=[];this.X=q(a)?document.getElementById(a):a;this.X.style.overflow="hidden";this.n=this.X.children[0];this.a=new Ne;Pe(this,b)}l=Oe.prototype;l.Ed=j;l.W=j;l.Z=!1;l.a=j;l.n=j;l.Ie=!0;l.ud=0;l.f=0;l.b=0;l.X=j;l.na=!1;l.eb=j;l.Vb=!1;l.Ra=!1;l.ta=!1;l.md=!1;l.hb=!1;l.Pb=0;l.Qb=0;l.jb=0;l.kb=0;l.lb=0;l.mb=0;l.gd=0;l.oc=0;l.hc=0;l.ic=0;l.v=0;l.r=0;l.F=0;l.Da=0;l.Fb=0;l.wa=0;l.tc=0;l.uc=0;l.sc=0;
l.ib=0;l.q=1;l.Ma=0;l.Cc=0;l.D=[];l.J=[];l.nb=j;l.cb=j;
l.handleEvent=function(a){switch(a.type){case He:if(!S&&a.button!==0)break;this.hd(a);break;case Ie:var b=a.touches,c=S?b[0]:a,d=c.pageX-this.hc,f=c.pageY-this.ic,g=this.f+d,h=this.b+f,k=a.timeStamp||(new Date).getTime();this.a.Zd&&this.a.Zd.call(this,a);if(this.a.zoom&&S&&b.length>1)g=Math.abs(b[0].pageX-b[1].pageX),b=Math.abs(b[0].pageY-b[1].pageY),this.Af=Math.sqrt(g*g+b*b),this.Ja=!0,b=1/this.Bf*this.Af*this.q,b<this.a.ma?b=0.5*this.a.ma*Math.pow(2,b/this.a.ma):b>this.a.Ia&&(b=2*this.a.Ia*Math.pow(0.5,
this.a.Ia/b)),this.Sa=b/this.q,g=this.bc-this.bc*this.Sa+this.f,h=this.cc-this.cc*this.Sa+this.b,this.n.style.webkitTransform=Le+g+"px,"+h+"px"+Me+" scale("+b+")",this.a.fe&&this.a.fe.call(this,a);else{this.hc=c.pageX;this.ic=c.pageY;if(g>0||g<this.v)g=this.a.Mb?this.f+d/2:g>=0||this.v>=0?0:this.v;if(h>this.F||h<this.r)h=this.a.Mb?this.b+f/2:h>=this.F||this.r>=0?this.F:this.r;if(this.jb<6&&this.kb<6)this.Cd+=d,this.Dd+=f,this.jb=Math.abs(this.Cd),this.kb=Math.abs(this.Dd);else{if(this.a.Xe)if(this.jb>
this.kb+5)h=this.b,f=0;else if(this.kb>this.jb+5)g=this.f,d=0;this.ta=!0;Qe(this,g,h);this.Pb=d>0?-1:d<0?1:0;this.Qb=f>0?-1:f<0?1:0;if(k-this.cb>300)this.cb=k,this.gd=this.f,this.oc=this.b;this.a.de&&this.a.de.call(this,a,this)}}break;case Je:case Ke:Re(this,a);break;case Ge:Se(this);break;case "mousewheel":Te(this,a);break;case "mouseout":a:{if(b=a.relatedTarget)for(;b=b.parentNode;)if(b==this.X)break a;Re(this,a)}break;case "webkitTransitionEnd":a.target==this.n&&(V(this,"webkitTransitionEnd"),
Ue(this))}};
function Pe(a,b){if(b)for(var c in b)a.a[c]=b[c];a.a.va=Be?a.a.va:!1;a.a.Pa=a.a.tb&&a.a.Pa;a.a.Ha=a.a.rc&&a.a.Ha;a.a.zoom=a.a.va&&a.a.zoom;a.a.ca=a.a.ca;a.n.style.webkitTransitionProperty=a.a.va?"-webkit-transform":"top left";a.n.style.webkitTransitionDuration="0";a.n.style.webkitTransformOrigin="0 0";a.a.ca&&(a.n.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.66,0.66,1)");a.a.va?a.n.style.webkitTransform=Le+"0,0"+Me:a.n.style.cssText+=";position:absolute;top:0;left:0";if(a.a.ca)a.a.Jc=!0;
a.refresh();Ve(a,Ge,a.W);Ve(a,He);S||(Ve(a,"mouseout",a.X),Ve(a,"mousewheel"));if(a.a.td)a.ud=a.W.setInterval(function(){!a.ta&&!a.Ja&&!(a.na||a.Fb==a.n.offsetWidth*a.q&&a.Da==a.n.offsetHeight*a.q)&&a.refresh()},500)}
function We(a,b){var c=a.Ed,d,f=b=="h";d=!f;var g=f?a.Qa:a.gb,h=f?a.ub:a.Jb;if(f&&!a.Ra||d&&!a.hb){if(g)if(Be&&(h.style.webkitTransform=""),g.parentNode.removeChild(g),d)a.gb=j,a.Jb=j;else if(f)a.Qa=j,a.ub=j}else{if(!g){d=c.createElement("div");a.a.cd?d.className=a.a.cd+b.toUpperCase():d.style.cssText="position:absolute;z-index:100;"+(b=="h"?"height:7px;bottom:1px;left:2px;right:"+(a.hb?"7":"2")+"px":"width:7px;bottom:"+(a.Ra?"7":"2")+"px;top:2px;right:1px");d.style.cssText+=";pointer-events:none;-webkit-transition-property:opacity;-webkit-transition-duration:"+
(a.a.Ke?"350ms":"0")+";overflow:hidden;opacity:"+(a.a.Wb?"0":"1");a.X.appendChild(d);g=d;d=c.createElement("div");if(!a.a.cd)d.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-webkit-background-clip:padding-box;-webkit-box-sizing:border-box;"+(b=="h"?"height:100%":"width:100%")+";-webkit-border-radius:3px;border-radius:3px";d.style.cssText+=";pointer-events:none;-webkit-transition-property:-webkit-transform;-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;-webkit-transform:"+
Le+"0,0"+Me;a.a.ca&&(d.style.cssText+=";-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)");g.appendChild(d);h=d}f?(a.Qa=g,a.ub=h,a.Oc=a.Qa.clientWidth,a.Nc=Math.max(Math.round(a.Oc*a.Oc/a.Fb),8),a.ub.style.width=a.Nc+"px",a.Kd=a.Oc-a.Nc,a.Oe=a.Kd/a.v):(a.gb=g,a.Jb=h,a.od=a.gb.clientHeight,a.nd=Math.max(Math.round(a.od*a.od/a.Da),8),a.Jb.style.height=a.nd+"px",a.ue=a.od-a.nd,a.Gf=a.ue/a.r);Xe(a,b,!0)}}function Se(a){a.W.setTimeout(function(){a.refresh()},0)}
function Qe(a,b,c){b=a.Vb?b:0;c=a.md?c:0;a.a.va?a.n.style.webkitTransform=Le+b+"px,"+c+"px"+Me+" scale("+a.q+")":(b=Math.round(b),c=Math.round(c),a.n.style.left=b+"px",a.n.style.top=c+"px");a.f=b;a.b=c;Xe(a,"h");Xe(a,"v")}
function Xe(a,b,c){var d=b=="h",f=d?a.f:a.b,g=d?a.Qa:a.gb,h=d?a.ub:a.Jb,k=d?a.Nc:a.nd,o=d?a.Kd:a.ue;if(d?a.Ra:a.hb)f*=d?a.Oe:a.Gf,f<0?(a.a.Jc||(d=k+Math.round(f*3),d<8&&(d=8),h.style[b=="h"?"width":"height"]=d+"px"),f=0):f>o&&(a.a.Jc?f=o:(d=k-Math.round((f-o)*3),d<8&&(d=8),h.style[b=="h"?"width":"height"]=d+"px",f=o+(k-d))),g.style.webkitTransitionDelay="0",g.style.opacity=c&&a.a.Wb?"0":"1",h.style.webkitTransform=Le+(b=="h"?f+"px,0":"0,"+f+"px")+Me}
l.hd=function(a){var b=this.W,c=a.touches,d=S?c[0]:a,f,g;if(this.Ie){this.a.$d&&this.a.$d.call(this,a);(this.a.ca||this.a.zoom)&&Ye(this,0);this.Ja=this.na=this.ta=!1;this.Qb=this.Pb=this.kb=this.jb=this.Dd=this.Cd=0;if(this.a.zoom&&S&&c.length>1)f=Math.abs(c[0].pageX-c[1].pageX),g=Math.abs(c[0].pageY-c[1].pageY),this.Bf=Math.sqrt(f*f+g*g),this.bc=Math.abs(c[0].pageX+c[1].pageX-this.tc*2)/2-this.f,this.cc=Math.abs(c[0].pageY+c[1].pageY-this.uc*2)/2-this.b,this.a.Wa&&this.a.Wa.call(this,a);if(this.a.Zb&&
(this.a.va?(c=b.getComputedStyle(this.n,j).webkitTransform.replace(/[^0-9-.,]/g,"").split(","),b=c[4]*1,c=c[5]*1):(c=b.getComputedStyle(this.n,j),f=/[^0-9-]/g,b=c.left.replace(f,"")*1,c=c.top.replace(f,"")*1),b!=this.f||c!=this.b))this.a.ca?V(this,"webkitTransitionEnd"):Fe(this.nb),this.eb=[],Qe(this,b,c);this.lb=this.f;this.mb=this.b;this.gd=this.f;this.oc=this.b;this.hc=d.pageX;this.ic=d.pageY;this.cb=a.timeStamp||(new Date).getTime();this.a.Vc&&this.a.Vc.call(this,a,this);Ve(this,Ie);Ve(this,Je);
Ve(this,Ke)}};
function Re(a,b){var c=b.touches;if(!(S&&c.length!=0)){var d=S?b.changedTouches[0]:b,f,g,h={oa:0,time:0},k={oa:0,time:0},o=(b.timeStamp||(new Date).getTime())-a.cb,c=a.f,p=a.b;V(a,Ie);V(a,Je);V(a,Ke);a.a.Yd&&a.a.Yd.call(a,b);if(a.Ja)c=a.q*a.Sa,c=Math.max(a.a.ma,c),c=Math.min(a.a.Ia,c),a.Sa=c/a.q,a.q=c,a.f=a.bc-a.bc*a.Sa+a.f,a.b=a.cc-a.cc*a.Sa+a.b,c=a.n.style,c.webkitTransitionDuration="200ms",c.webkitTransform=Le+a.f+"px,"+a.b+"px"+Me+" scale("+a.q+")",a.Ja=!1,a.refresh(),a.a.Va&&a.a.Va.call(a,b);
else{if(a.ta){if(o<300&&a.a.Zb){h=c?Ze(c-a.gd,o,-a.f,a.Fb-a.ib+a.f,a.a.Mb?a.ib:0):h;k=p?Ze(p-a.oc,o,-a.b,a.r<0?a.Da-a.wa+a.b-a.F:0,a.a.Mb?a.wa:0):k;c=a.f+h.oa;p=a.b+k.oa;if(a.f>0&&c>0||a.f<a.v&&c<a.v)h={oa:0,time:0};if(a.b>a.F&&p>a.F||a.b<a.r&&p<a.r)k={oa:0,time:0}}if(h.oa||k.oa){h=Math.max(Math.max(h.time,k.time),10);if(a.a.Ea)k=c-a.lb,o=p-a.mb,Math.abs(k)<a.a.nc&&Math.abs(o)<a.a.nc?a.scrollTo(a.lb,a.mb,200):(k=$e(a,c,p),c=k.x,p=k.y,h=Math.max(k.time,h));a.scrollTo(c,p,h)}else a.a.Ea?(k=c-a.lb,o=
p-a.mb,Math.abs(k)<a.a.nc&&Math.abs(o)<a.a.nc?a.scrollTo(a.lb,a.mb,200):(k=$e(a,a.f,a.b),(k.x!=a.f||k.y!=a.b)&&a.scrollTo(k.x,k.y,k.time))):af(a,200)}else{if(S)a.Rb&&a.a.zoom?(a.W.clearTimeout(a.Rb),a.Rb=j,a.a.Wa&&a.a.Wa.call(a,b),a.zoom(a.hc,a.ic,a.q==1?a.a.Ge:1),a.a.Va&&a.W.setTimeout(function(){a.a.Va.call(a,b)},200)):a.Rb=a.W.setTimeout(function(){a.Rb=j;for(f=d.target;f.nodeType!=1;)f=f.parentNode;if(f.tagName!="SELECT"&&f.tagName!="INPUT"&&f.tagName!="TEXTAREA")g=document.createEvent("MouseEvents"),
g.initMouseEvent("click",!0,!0,b.view,1,d.screenX,d.screenY,d.clientX,d.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,0,j),g.Jf=!0,f.dispatchEvent(g)},a.a.zoom?250:0);af(a,200)}a.a.ee&&a.a.ee.call(a,b)}}}
function af(a,b){var c=a.f>=0?0:a.f<a.v?a.v:a.f,d=a.b>=a.F||a.r>0?a.F:a.b<a.r?a.r:a.b;if(c==a.f&&d==a.b){if(a.ta)a.ta=!1,a.a.Ab&&a.a.Ab.call(a,a);if(a.Ra&&a.a.Wb)a.Qa.style.webkitTransitionDelay="300ms",a.Qa.style.opacity="0";if(a.hb&&a.a.Wb)a.gb.style.webkitTransitionDelay="300ms",a.gb.style.opacity="0"}else a.scrollTo(c,d,b||0)}
function Te(a,b){var c,d;"wheelDeltaX"in b?(c=b.wheelDeltaX/12,d=b.wheelDeltaY/12):c="detail"in b?d=-b.detail*3:d=-b.wheelDelta;if(a.a.If=="zoom"){d=a.q*Math.pow(2,1/3*(d?d/Math.abs(d):0));if(d<a.a.ma)d=a.a.ma;if(d>a.a.Ia)d=a.a.Ia;d!=a.q&&(!a.sc&&a.a.Wa&&a.a.Wa.call(a,b),a.sc++,a.zoom(b.pageX,b.pageY,d,400),a.W.setTimeout(function(){a.sc--;!a.sc&&a.a.Va&&a.a.Va.call(a,b)},400))}else{c=a.f+c;d=a.b+d;if(c>0)c=0;else if(c<a.v)c=a.v;if(d>a.F)d=a.F;else if(d<a.r)d=a.r;a.scrollTo(c,d,0)}}
function Ue(a){var b=a.f,c=a.b,d=(new Date).getTime(),f,g;if(!a.na)if(a.eb.length){f=a.eb.shift();if(f.x==b&&f.y==c)f.time=0;a.na=!0;a.ta=!0;if(a.a.ca)Ye(a,f.time),Qe(a,f.x,f.y),a.na=!1,f.time?Ve(a,"webkitTransitionEnd"):af(a,0);else{var h=function(){var k=(new Date).getTime();if(k>=d+f.time)Qe(a,f.x,f.y),a.na=!1,a.a.Xd&&a.a.Xd.call(a),Ue(a);else if(k=(k-d)/f.time-1,g=Math.sqrt(1-k*k),k=(f.x-b)*g+b,Qe(a,k,(f.y-c)*g+c),a.na)a.nb=De(h)};h()}}else af(a,400)}
function Ye(a,b){b+="ms";a.n.style.webkitTransitionDuration=b;a.Pa&&(a.ub.style.webkitTransitionDuration=b);a.Ha&&(a.Jb.style.webkitTransitionDuration=b)}function Ze(a,b,c,d,f){var b=Math.abs(a)/b,g=b*b/0.0012;a>0&&g>c?(c+=f/(6/(g/b*6.0E-4)),b=b*c/g,g=c):a<0&&g>d&&(d+=f/(6/(g/b*6.0E-4)),b=b*d/g,g=d);g*=a<0?-1:1;return{oa:g,time:Math.round(b/6.0E-4)}}
function bf(a,b){for(var c=-b.offsetLeft,d=-b.offsetTop;b=b.offsetParent;)c-=b.offsetLeft,d-=b.offsetTop;b!=a.X&&(c*=a.q,d*=a.q);return{left:c,top:d}}
function $e(a,b,c){var d,f,g;g=a.D.length-1;d=0;for(f=a.D.length;d<f;d++)if(b>=a.D[d]){g=d;break}g==a.Ma&&g>0&&a.Pb<0&&g--;b=a.D[g];f=(f=Math.abs(b-a.D[a.Ma]))?Math.abs(a.f-b)/f*500:0;a.Ma=g;g=a.J.length-1;for(d=0;d<g;d++)if(c>=a.J[d]){g=d;break}g==a.Cc&&g>0&&a.Qb<0&&g--;c=a.J[g];d=(d=Math.abs(c-a.J[a.Cc]))?Math.abs(a.b-c)/d*500:0;a.Cc=g;return{x:b,y:c,time:Math.round(Math.max(f,d))||200}}function Ve(a,b,c){(c||a.n).addEventListener(b,a,!1)}function V(a,b,c){(c||a.n).removeEventListener(b,a,!1)}
l.Aa=function(){if(!this.Z)this.Z=!0,this.n.style.webkitTransform="",this.hb=this.Ra=!1,We(this,"h"),We(this,"v"),V(this,Ge,this.W),V(this,He),V(this,Ie),V(this,Je),V(this,Ke),this.a.Of&&(V(this,"mouseout",this.X),V(this,"mousewheel")),this.a.ca&&V(this,"webkitTransitionEnd"),this.a.td&&this.W.clearInterval(this.ud),this.a.be&&this.a.be.call(this)};
l.refresh=function(){if(!this.Z){var a,b=0,c=0;if(this.q<this.a.ma)this.q=this.a.ma;this.ib=this.X.clientWidth||1;this.wa=this.X.clientHeight||1;this.F=-this.a.xf||0;this.Fb=Math.round(this.n.offsetWidth*this.q);this.Da=Math.round((this.n.offsetHeight+this.F)*this.q);this.v=this.ib-this.Fb;this.r=this.wa-this.Da+this.F;this.Qb=this.Pb=0;this.a.ce&&this.a.ce.call(this);this.Vb=this.a.tb&&this.v<0;this.md=this.a.rc&&(!this.a.ye&&!this.Vb||this.Da>this.wa);this.Ra=this.Vb&&this.a.Pa;this.hb=this.md&&
this.a.Ha&&this.Da>this.wa;a=bf(this,this.X);this.tc=-a.left;this.uc=-a.top;if(typeof this.a.Ea=="string"){this.D=[];this.J=[];a=this.n.querySelectorAll(this.a.Ea);for(var c=0,d=a.length;c<d;c++)b=bf(this,a[c]),b.left+=this.tc,b.top+=this.uc,this.D[c]=b.left<this.v?this.v:b.left*this.q,this.J[c]=b.top<this.r?this.r:b.top*this.q}else if(this.a.Ea){for(this.D=[];b>=this.v;)this.D[c]=b,b-=this.ib,c++;this.v%this.ib&&(this.D[this.D.length]=this.v-this.D[this.D.length-1]+this.D[this.D.length-1]);c=b=0;
for(this.J=[];b>=this.r;)this.J[c]=b,b-=this.wa,c++;this.r%this.wa&&(this.J[this.J.length]=this.r-this.J[this.J.length-1]+this.J[this.J.length-1])}We(this,"h");We(this,"v");if(!this.Ja)this.n.style.webkitTransitionDuration="0",af(this,200)}};l.scrollTo=function(a,b,c,d){var f=a;this.stop();f.length||(f=[{x:a,y:b,time:c,qf:d}]);a=0;for(b=f.length;a<b;a++){if(f[a].qf)f[a].x=this.f-f[a].x,f[a].y=this.b-f[a].y;this.eb.push({x:f[a].x,y:f[a].y,time:f[a].time||0})}Ue(this)};
l.stop=function(){if(this.a.ca)V(this,"webkitTransitionEnd");else if(this.nb)Fe(this.nb),this.nb=0;this.eb=[];this.na=this.ta=!1};
l.zoom=function(a,b,c,d){var f=c/this.q;if(this.a.va)this.Ja=!0,d=d===i?200:d,a=a-this.tc-this.f,b=b-this.uc-this.b,this.f=a-a*f+this.f,this.b=b-b*f+this.b,this.q=c,this.refresh(),this.f=this.f>0?0:this.f<this.v?this.v:this.f,this.b=this.b>this.F?this.F:this.b<this.r?this.r:this.b,this.n.style.webkitTransitionDuration=d+"ms",this.n.style.webkitTransform=Le+this.f+"px,"+this.b+"px"+Me+" scale("+c+")",this.Ja=!1};function cf(a){L.call(this);this.jc=new Ed(this.P,50,this);this.a=a||new Ne}t(cf,L);l=cf.prototype;l.jc=j;l.c=j;l.a=j;l.s=function(a){var b=new J;b.append('<div id="',K(a.id),'" class="',"H21",'"><div id="',K(a.id),'_body" class="',"H3B",'"></div></div>');a=b.toString();return a.toString()};l.C=function(){return O(this,"body")};l.i=function(){cf.d.i.call(this);bb(this.jc)};l.h=function(){cf.d.h.call(this);this.c=new Oe(this.e(),this.a,this.o.k);this.refresh();A(N(this),I.H(),mc,this.refresh)};
l.M=function(){cf.d.M.call(this);this.c.Aa();this.c=j};l.refresh=function(a){if(this.c)a&&a.type==mc&&this.c.scrollTo(0,0),a=this.jc,!a.fb&&!a.he?Fd(a):a.mc=!0};l.scrollTo=function(a,b,c,d,f){if(f)d=this.c.r,b<d?b=d:b>0&&(b=0);this.c.scrollTo(a,b,c)};l.P=function(){Ld(this)&&this.c&&this.c.refresh()};function W(a){L.call(this);this.Qc=new df;this.g(this.Qc);this.rd=new df;this.g(this.rd);this.xc=new ef;this.g(this.xc);this.rb=new ff;this.g(this.rb);this.c=new cf(a);this.xc.g(this.c)}t(W,L);l=W.prototype;l.Qc=j;l.xc=j;l.rb=j;l.c=j;l.g=function(a){W.d.g.call(this,a)};l.s=function(a){var b=new J;b.append('<div id="',K(a.id),'" class="',"H27",'"></div>');a=b.toString();return a.toString()};l.h=function(){W.d.h.call(this);this.c.refresh();A(N(this),I.H(),mc,this.c.refresh,!1,this.c)};
l.refresh=function(){this.c&&this.c.refresh()};function X(a,b){a.Qc.g(b)}function Y(a,b,c){c?a.rd.g(b):a.c.g(b)}function df(){L.call(this)}t(df,L);df.prototype.s=function(a){var b=new J;b.append('<div class="',"H38",'"><div class="',"H36",'"><div id="',K(a.id),'_content" class="',"H37",'"></div></div></div>');a=b.toString();return a.toString()};df.prototype.C=function(){return O(this,"content")};function ef(){L.call(this)}t(ef,L);
ef.prototype.s=function(a){var b=new J;b.append('<div class="',"H3A",'"><div class="',"H36",'"><div id="',K(a.id),'_content" class="',"H37",'"></div></div></div>');a=b.toString();return a.toString()};ef.prototype.C=function(){return O(this,"content")};function ff(){L.call(this)}t(ff,L);ff.prototype.s=function(a){var b=new J;b.append('<div class="',"H39",'"><div class="',"H36",'"><div id="',K(a.id),'_content" class="',"H37",'"></div></div></div>');a=b.toString();return a.toString()};
ff.prototype.C=function(){return O(this,"content")};function Z(a,b){(b||new J).append('<li class="',"H2A",'"><a href="',K(a.href),'?id=me" class="',"H2D",'"><span class="icon-',K(a.type)," ","H2E",'"></span><strong class="',"H2F",'">',K(a.text),"</strong></a></li>")};function gf(){L.call(this)}t(gf,xe);
gf.prototype.s=function(a){var b=new J;b.append('<div id="',K(a.id),'" class="',"H28",'"><ul class="',"H29",'">');Z({text:"News Feed",type:"newsfeed",href:"/home"},b);Z({text:"Profile",type:"profile",href:"/profile"},b);Z({text:"Friends",type:"friends",href:"/friends"},b);Z({text:"Messages",type:"messages",href:"/messages"},b);Z({text:"Places",type:"places",href:"/places"},b);Z({text:"Groups",type:"groups",href:"/groups"},b);Z({text:"Events",type:"events",href:"/events"},b);Z({text:"Photos",type:"photos",
href:"/albums"},b);Z({text:"Chat",type:"chat",href:"/chat"},b);Z({text:"Notes",type:"notes",href:"/notes"},b);b.append("</ul></div>");a=b.toString();return a.toString()};gf.prototype.h=function(){gf.d.h.call(this);this.ha=me("H2A",this.e());this.le();var a=Yc(this.o.k);A(N(this),a,["resize",lc],this.le)};gf.prototype.ha=j;
gf.prototype.le=function(){if(this.ha&&this.ha.length){var a=this.sb(),b=!Ld(this)||!this.Lb||!this.ha||!this.ha.length?new C(0,0):Id(this.ha[0]),c;c=a.width>=a.height?2:3;for(var d=Math.floor(a.width/b.width),d=d>1?(a.width-b.width*d)/(d-1):0,d=Math.round(d),f=1,g=this.ha?this.ha.length:0,h=0,k=0,o=0;o<g;o++)oe(this.ha[o],{left:h+"px",top:k+"px"}),f++,f>c?(f=1,k=0,h+=b.width,a.width%h!=0&&(h+=d)):k+=b.height;Gd(this.e(),Math.ceil((h+b.width)/a.width)*a.width,a.height);Cd(this)}};function hf(){L.call(this)}t(hf,L);hf.prototype.s=function(a){var b=new J;b.append('<div id="',K(a.id),'" class="',"H30",'"></div>');a=b.toString();return a.toString()};hf.prototype.update=function(a,b){if(this.e()){var c=[],d=0;if(b>1)for(;d<b;){var f=c,g=d,h;h={selected:a===d};var k=new J;k.append(h.selected?'<span class="H31 H32"></span>':'<span class="H31"></span>');h=k.toString();f[g]=h;d++}this.e().innerHTML=c.join("")}};function $(a){L.call(this);this.Ga=a}t($,xe);l=$.prototype;l.Ic=!1;l.Na=j;l.Ga="";l.T=function(){e(Error("unimplemented abstract method"))};
l.N=function(a){var b;b=new J;b.append('<div id="',K(a.id),'_result">');var c={Te:a.data.data},a=b||new J;a.append("<ul>");for(var c=c.Te,d=c.length,f=0;f<d;f++){var g={item:c[f],defer:f>3},h=a||new J;h.append('<li class="',"H4A"," ",g.defer?"H6":"",'"><div class="',"H4B",'"><div class="',"H4C",'"><div class="',"H4D",'">');var k=g;(h||new J).append(k.item.from?'<img class="H55" src="//graph.facebook.com/'+K(k.item.from.id)+'/picture" alt=""/>':k.item.icon?'<img class="H55" src="'+K(k.item.icon)+'" alt=""/>':
"");h.append('</div><div class="',"H4E",'">');var o=g,k=h||new J;o.item.actions&&o.item.actions.length==2&&(k.append('<div tabindex="1" cmd="like_or_comment" class="',"H4F",'">'),(k||new J).append('<div class="',"H50",'"><a cmd="',K(o.item.actions[1].name),'" nohref="',K(o.item.actions[1].link),'" class="',"H54"," ","H53",'">Like</a><a cmd="',K(o.item.actions[0].name),'" nohref="',K(o.item.actions[0].link),'" class="',"H53",'">Comment</a><i class="',"H51",'"></i><i class="',"H52",'"></i></div>'),
k.append("</div>"));k=g;(h||new J).append(k.item.from?'<a href="//www.facebook.com/profile.php?id='+K(k.item.from.id)+'" class="H56">'+K(k.item.from.name)+"</a>":"");k=h||new J;switch(g.item.type){case "video":(k||new J).append('<div class="',"H57",'"><h4><a href="',K(g.item.source),'">',K(g.item.name),"</a></h4>",g.item.caption?'<div class="H58">'+K(g.item.caption)+"</div>":"",g.item.description?'<div class="H59">'+K(g.item.description)+"</div>":"","</div>");break;case "status":(k||new J).append('<div class="',
"H5A",'">',g.item.message?K(g.item.message):"","</div>");break;case "link":(k||new J).append(g.item.message?'<div class="H5B">'+K(g.item.message)+"</div>":"",g.item.description?g.item.link?'<div><a href="'+K(g.item.link)+'">'+K(g.item.description)+"</a></div>":"":"",g.item.caption?'<div class="H58">'+K(g.item.caption)+"</div>":"");break;case "photo":k=k||new J;if(g.item.link){if(g.item.name&&(k.append('<div><a href="',K(g.item.link),'">',K(g.item.name),"</a></div>"),g.item.properties))for(var o=g.item.properties,
p=o.length,T=0;T<p;T++){var r=o[T];k.append(r.text?(r.name?"<span>"+K(r.name)+" : </span>":"")+(r.href?'<a href="'+K(r.href)+'">'+K(r.text)+"</a>":K(r.text))+"<br />":"")}k.append(g.item.picture?'<a href="'+K(g.item.link)+'" class="H5C"><img src="'+K(g.item.picture)+'" class="H5D" /></a>':"")}break;default:k.append("### ",K(g.item.type)," ###")}h.append("</div></div></div></li>")}a.append("</ul>");b.append("</div>");b=b.toString();return b.toString()};
l.Bc=function(a){var b=new J;b.append('<div id="',K(a.id),'_error" class="',"H46",'">Oops. Something went wrong. Try again and reload later.',a.error?'<div class="H47">'+(a.type?K(a.type)+"<br />":"")+K(a.error)+"</div>":"","</div>");a=b.toString();return a.toString()};
l.s=function(a){var b=new J;b.append('<div id="',K(a.id),'">');(b||new J).append('<div class="',"H48",'"><div class="',"H3F",'"><i class="',"H40",'"></i><i class="',"H41",'"></i><i class="',"H42",'"></i></div></div>');b.append("</div>");a=b.toString();return a.toString()};l.h=function(){$.d.h.call(this);this.P()};l.ae=function(a,b){switch(a){case "like_or_comment":jf(this,b);break;default:return!1}b.preventDefault();return!0};
function jf(a,b){function c(a){if(!(a.target==g||dd(d,a.target)))d.style.display="",f.A(),f=d=j}var d=re(b.target);d.style.display="block";var f=new $b,g=b.target;A(f,a.o.k,hc,c,!0,a);A(f,a.o.k,"click",c,!0,a)}
l.P=function(){if(this.Na){var a=da("error.message",this.Na),b=da("error.type",this.Na),a={data:this.Na,type:b?String(b):"",error:a?String(a):"",id:M(this)},c;if(this.Ic)c=this.Bc(a);else try{c=this.N(a)}catch(d){a.error=d.message,Error.captureStackTrace&&Error.captureStackTrace(d,arguments.callee),c=this.Bc(a)}this.C().innerHTML=c;Cd(this)}else c=this.T(),F(c,this.bf,this),Uc(c,this.Ze,this)};l.bf=function(a){this.Na=a;this.Ic=!1;this.P()};l.Ze=function(a){this.Na=a;this.Ic=!0;this.P()};function kf(a){$.call(this,"me");this.sd=a;this.la=new $b(this)}t(kf,$);l=kf.prototype;l.sd="";l.ja=j;l.Xa=j;l.dc=j;l.ia=!1;l.Hc=j;l.b=0;l.c=j;l.j=j;l.kc=j;l.C=function(){if(!this.Hc)this.Hc=this.o.xa("div");return this.Hc};l.s=function(a){var b=new J;b.append('<div id="',K(a.id),'" class="',"H33"," ","H7",'">&nbsp;</div>');a=b.toString();return a.toString()};l.h=function(){kf.d.h.call(this)};
l.T=function(){var a=new E;F(qe(),function(b){if(!this.Z){var c=this.o,d;d={id:M(this),caption:this.sd};var f=new J;f.append('<div id="',K(d.id),'_panel"  tabindex="1" class="',"H34",'"><div tabindex="1" id="',K(d.id),'_panelCaption" class="',"H33"," ","H7",'">',K(d.caption),'</div><div class="',"H35",'" id="',K(d.id),'_panelBody"></div></div>');d=f.toString();d=d.toString.call(d);c=ge(c.k,d);d=this.o.k.body.firstChild;d.parentNode&&d.parentNode.insertBefore(c,d);this.ja=c;this.Xa=O(this,"panelCaption",
!0);this.dc=O(this,"panelBody",!0);A(N(this),D.H(),pc,this.se);this.se();lf(this);this.kc=s(a.z,a,b)}},this);return a};l.M=function(){kf.d.M.call(this);cd(this.ja);cd(this.dc);this.c&&this.c.A();this.dc=this.ja=j;B(this.la)};function lf(a){B(a.la);A(a.la,a.Xa,hc,a.ac)}l.se=function(){var a=D.H().Oa(),b=a.K();b.height-=this.Xa.offsetHeight-1;Gd(this.ja,a);Gd(O(this,"panelBody",!0),b);this.Ua(this.ia?0:b.height);this.c&&this.c.refresh()};
l.ac=function(a){B(this.la);w(this.Xa,"H9",!0);A(this.la,this.o.k,kc,kf.prototype.Wc);A(this.la,this.o.k,ic,kf.prototype.Bb);var b=ve(a)[0];this.j={zb:0,sa:D.H().Oa().height-this.Xa.offsetHeight+1,ed:b.clientY,oe:this.b,Vd:!1,Rc:b.clientY,Rd:b.clientY,startTime:qa()};a.preventDefault()};l.Wc=function(a){var b=ve(a)[0];this.j.Vd=!0;this.j.Ve=qa();this.j.Rd=this.j.Rc;this.j.Rc=b.clientY;b=this.j.oc+(b.clientY-this.j.ed);if(b<this.j.zb)b=this.j.zb;else if(b>this.j.sa)b=this.j.sa;this.Ua(b);a.preventDefault()};
l.Bb=function(a){B(this.la);a.preventDefault();if(this.j.Vd)a=(this.j.Rc-this.j.Rd)/(qa()-this.j.Ve),this.ia=Math.abs(a)>2?a<0:this.b<this.j.sa/2;else if(qa()-this.j.startTime<500)this.ia=!this.ia;else{lf(this);return}a=this.ia?0:this.j.sa;Ae?(this.ja.style.webkitTransition="-webkit-transform 300ms ease-"+(this.ia?"in":"out"),dc(this.la,this.ja,"webkitTransitionEnd",this.Xc),this.O(this.Xc,1E3),this.O(this.Ua,1,a)):(this.O(this.Ua,1,a),this.O(this.Xc,2))};
l.Xc=function(){if(this.j&&(w(this.Xa,"H9",!1),this.ja.style.webkitTransition="",this.j=j,B(this.la),lf(this),this.ia&&!this.c&&this.kc))this.c=new cf,Od(this.c,this.dc),this.c.C().appendChild(this.C()),this.kc(),this.kc=j,this.c.refresh()};l.Ua=function(a){if(this.b!==a)Ae?this.ja.style.webkitTransform=Le+("0,"+a+"px")+Me:this.ja.style.top=a+"px",this.b=a};function mf(){L.call(this);var a=new Ne;a.rc=!1;a.tb=!0;a.Zb=!1;a.Pa=!1;a.Ha=!1;a.Ea=!0;a.Ab=s(this.Uc,this);var a=new W(a),b=new ze;b.me=!1;b=new R(b);X(a,b);b=new gf;Y(a,b);var c=new hf;a.rb.g(c);var d=new kf("Notifications");a.rb.g(d);this.g(a);this.Pe=b;this.Fd=c;this.Sc=a}t(mf,Q);mf.prototype.Sc=j;mf.prototype.Pe=j;mf.prototype.Fd=j;mf.prototype.Uc=function(a){Ld(this)&&this.Fd.update(a.Ma,a.D.length)};H.dockpage=mf;
