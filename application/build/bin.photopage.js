function Rf(a){a.kc.stop();a.P()}function Sf(a){var b=new G;H(pd("/"+a),function(a){a.images&&q(a.images)?b.A(a):b.D(a)});return b};function Tf(a,b){M.call(this);this.Ka=b;this.ie=a;var c=new Me;c.sc=!1;c.ub=!0;c.$b=!1;c.Pa=!1;c.Ha=!1;c.Fa=!0;if(Ta)c.zoom=!0,c.na=1,c.Ia=3;c.Bb=t(this.Uc,this);this.c=new bf(c);this.e(this.c)}u(Tf,M);l=Tf.prototype;l.Ka="";l.ie="";l.c=j;l.Ya=j;l.cd=j;l.G=j;
l.s=function(a){var b=new K;b.append('<div id="',L(a.id),'" class="',"H1F",'"><div id="',L(a.id),'_content" class="',"H20",'"></div><div class="',"H25",'" id="',L(a.id),'_bottom"><i id="',L(a.id),'_prev" class="',"H26",'" tabindex="1">&larr;</i><i id="',L(a.id),'_next" class="',"H26",'" tabindex="1">&rarr;</i></div></div>');a=b.toString();return a.toString()};l.B=function(){return P(this,"content")};
l.Uc=function(a){if(this.G){var b=this.G[a.Ma];if(b)Uf(this,b),(a=this.G[a.Ma+1])&&Uf(this,a),this.cd=b}};function Vf(a,b,c){var d=b.images;if(!q(d)||!d.length)return b.width&&b.height?b:j;var f=d[0];Ia(d,function(a){if(a.width<=c.width&&a.height<=c.height)return!0;f=a},a);return f}l.i=function(){Tf.d.i.call(this);Wf(this);C(O(this),F.H(),mc,this.jf)};l.M=function(){Tf.d.M.call(this);this.c.z();this.c=j};
l.jf=function(){if(this.G){var a=this.cd;if(a&&a!=this.G[0]){Xf(this);Rf(this.c);var b=P(this,a.Tb).cloneNode(!0);b.style.padding=[a.ke.top+"px",a.ke.left+"px"].join(" ");b.style.left=0;b.style.zIndex=1E4;b.id="";this.c.B().appendChild(b);this.O(function(){$c(b);this.c.scrollTo(-a.kf,0,0);Rf(this.c)},800)}else this.P()}};
l.rf=function(a){var b=ea("error.message",a),c=ea("error.type",a),b={data:a,type:c?String(c):"",error:b?String(b):"",id:N(this)},a=this.c.B();c=new K;c.append('<div id="',L(b.id),'_error" class="',"H1D",'">Oops. Something went wrong. Try again and reload later.',b.error?'<div class="H1E">'+(b.type?L(b.type)+"<br/>":"")+L(b.error)+"</div>":"","</div>");b=c.toString();a.innerHTML=b.toString.call(b);this.Ob=j};
function Yf(a){var b=a.c.B(),c;c=new K;c.append('<div id="',L(i.id),'_empty" class="',"H1C",'">No content available for now.</div>');c=c.toString();b.innerHTML=c.toString.call(c);a.Ob=j}function Wf(a){a.G&&a.G[0]?a.P():H(Rc(Sf(a.ie),a.rf,a),function(a){this.G=[a];this.Ya=a;this.Ka?H(Rc(Of(this.Ka),this.P,this),function(c){if(q(c.data)&&c.data.length)c.data.unshift(a),this.G=c.data;this.P()},this):this.P()},a)}
function Uf(a,b){if(a.f()){if(b==a.Ya)a.Ya=j;if(!b.Ld){var c=P(a,b.Tb);if(!c)return;b.Ld=!0;var d;d={src:b.source};var f=new K;f.append('<img src="',L(d.src),'" class="',"H24",'" />');d=f.toString();c.innerHTML=d.toString.call(d)}a.cd=b}else a.Ya=b}l.P=function(){Xf(this);this.c.refresh()};
function Xf(a){if(!a.f()||!a.G||!a.G.length)Yf(a);else{if(!a.Ob)a.Ob=Zf(a);var b=0,c=a.tb();w(a.G,function(a){var f=Vf(this,a,c);if(f){var g;g=f.width/f.height;var h;c.width>c.height?(h=Math.min(c.height-0,f.height),f=g*h):(f=Math.min(c.width,f.width),h=f/g);f=Math.round(f);h=Math.round(h);g=new oe(Math.floor((c.width-f)/2),Math.floor((c.height-h)/2),f,h);f=b;h=P(this,a.Tb);ne(h,{width:g.width+"px",height:g.height+"px",left:g.left+f+"px",top:g.top+"px"});a.ke=g;a.kf=b;b+=c.width}},a);ne(a.Ob,{width:c.width*
a.G.length+"px",height:c.height+"px"});a.Ya?Uf(a,a.Ya):Uf(a,a.G[0])}}
function Zf(a){var b=Ha(a.G,function(a){a.Tb="x"+(Id++).toString(16);a.Ld=!1;var a={id:N(this),He:a.Tb},b=new K;b.append('<div id="',L(a.id),"_",L(a.He),'" style="width:',L(a.width),"px;height:",L(a.height),"px;left:",L(a.left),"px;top:",L(a.top),';" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" class="',"H23",'"></div>');a=b.toString();return a},a),c=a.o.ya("div","H22");c.innerHTML=b.join("");a.c.B().appendChild(c);return c};function $f(){M.call(this);var a=Td(window).w,b=a.get("fbid"),a=a.get("id"),b=new Tf(a,b),a=new R;if(a.T)Pa(a.T,"H1B");else{if(!a.Aa)a.Aa=[];a.Aa.push("H1B")}var c=new Od;c.e(b);c.e(a);this.e(c)}u($f,Q);I.photopage=$f;