function Sf(a){a.jc.stop();a.P()}function Tf(a){var b=new F;G(H("/"+a),function(a){a.images&&n(a.images)?b.z(a):b.B(a)});return b};function Uf(a,b){M.call(this);this.Ka=b;this.ie=a;var c=new Ne;c.rc=!1;c.tb=!0;c.Zb=!1;c.Pa=!1;c.Ha=!1;c.Ea=!0;if(Ua)c.zoom=!0,c.ma=1,c.Ia=3;c.Ab=s(this.Uc,this);this.c=new cf(c);this.g(this.c)}t(Uf,M);l=Uf.prototype;l.Ka="";l.ie="";l.c=j;l.Ya=j;l.dd=j;l.G=j;
l.s=function(a){var b=new K;b.append('<div id="',L(a.id),'" class="',"H20",'"><div id="',L(a.id),'_content" class="',"H21",'"></div><div class="',"H26",'" id="',L(a.id),'_bottom"><i id="',L(a.id),'_prev" class="',"H27",'" tabindex="1">&larr;</i><i id="',L(a.id),'_next" class="',"H27",'" tabindex="1">&rarr;</i></div></div>');a=b.toString();return a.toString()};l.C=function(){return P(this,"content")};
l.Uc=function(a){if(this.G){var b=this.G[a.Ma];if(b)Vf(this,b),(a=this.G[a.Ma+1])&&Vf(this,a),this.dd=b}};function Wf(a,b,c){var d=b.images;if(!n(d)||!d.length)return b.width&&b.height?b:j;var f=d[0];Ja(d,function(a){if(a.width<=c.width&&a.height<=c.height)return!0;f=a},a);return f}l.h=function(){Uf.d.h.call(this);Xf(this);B(O(this),E.H(),oc,this.kf)};l.M=function(){Uf.d.M.call(this);this.c.A();this.c=j};
l.kf=function(){if(this.G){var a=this.dd;if(a&&a!=this.G[0]){Yf(this);Sf(this.c);var b=P(this,a.Sb).cloneNode(!0);b.style.padding=[a.ke.top+"px",a.ke.left+"px"].join(" ");b.style.left=0;b.style.zIndex=1E4;b.id="";this.c.C().appendChild(b);this.O(function(){bd(b);this.c.scrollTo(-a.lf,0,0);Sf(this.c)},800)}else this.P()}};
l.sf=function(a){var b=da("error.message",a),c=da("error.type",a),b={data:a,type:c?String(c):"",error:b?String(b):"",id:N(this)},a=this.c.C();c=new K;c.append('<div id="',L(b.id),'_error" class="',"H1E",'">Oops. Something went wrong. Try again and reload later.',b.error?'<div class="H1F">'+(b.type?L(b.type)+"<br/>":"")+L(b.error)+"</div>":"","</div>");b=c.toString();a.innerHTML=b.toString.call(b);this.Nb=j};
function Zf(a){var b=a.c.C(),c;c=new K;c.append('<div id="',L(i.id),'_empty" class="',"H1D",'">No content available for now.</div>');c=c.toString();b.innerHTML=c.toString.call(c);a.Nb=j}function Xf(a){a.G&&a.G[0]?a.P():G(Tc(Tf(a.ie),a.sf,a),function(a){this.G=[a];this.Ya=a;this.Ka?G(Tc(Pf(this.Ka),this.P,this),function(c){if(n(c.data)&&c.data.length)c.data.unshift(a),this.G=c.data;this.P()},this):this.P()},a)}
function Vf(a,b){if(a.e()){if(b==a.Ya)a.Ya=j;if(!b.Ld){var c=P(a,b.Sb);if(!c)return;b.Ld=!0;var d;d={src:b.source};var f=new K;f.append('<img src="',L(d.src),'" class="',"H25",'" />');d=f.toString();c.innerHTML=d.toString.call(d)}a.dd=b}else a.Ya=b}l.P=function(){Yf(this);this.c.refresh()};
function Yf(a){if(!a.e()||!a.G||!a.G.length)Zf(a);else{if(!a.Nb)a.Nb=$f(a);var b=0,c=a.sb();v(a.G,function(a){var f=Wf(this,a,c);if(f){var g;g=f.width/f.height;var h;c.width>c.height?(h=Math.min(c.height-0,f.height),f=g*h):(f=Math.min(c.width,f.width),h=f/g);f=Math.round(f);h=Math.round(h);g=new pe(Math.floor((c.width-f)/2),Math.floor((c.height-h)/2),f,h);f=b;h=P(this,a.Sb);oe(h,{width:g.width+"px",height:g.height+"px",left:g.left+f+"px",top:g.top+"px"});a.ke=g;a.lf=b;b+=c.width}},a);oe(a.Nb,{width:c.width*
a.G.length+"px",height:c.height+"px"});a.Ya?Vf(a,a.Ya):Vf(a,a.G[0])}}
function $f(a){var b=Ia(a.G,function(a){a.Sb="x"+(Jd++).toString(16);a.Ld=!1;var a={id:N(this),He:a.Sb},b=new K;b.append('<div id="',L(a.id),"_",L(a.He),'" style="width:',L(a.width),"px;height:",L(a.height),"px;left:",L(a.left),"px;top:",L(a.top),';" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" class="',"H24",'"></div>');a=b.toString();return a},a),c=a.o.xa("div","H23");c.innerHTML=b.join("");a.c.C().appendChild(c);return c};function ag(){M.call(this);var a=Ud(window).v,b=a.get("fbid"),c=a.get("id");a.get("type")==1&&a.get("set")&&(c=b,b="");a=new Uf(c,b);b=new R;if(b.S)Qa(b.S,"H1C");else{if(!b.za)b.za=[];b.za.push("H1C")}c=new Pd;c.g(a);c.g(b);this.g(c)}t(ag,Q);I.photopage=ag;
