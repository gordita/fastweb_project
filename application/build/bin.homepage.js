function qf(){var a=new I;J(K("/me/home"),function(b){b.data&&!b.error?a.w(b):a.B(b)});return a};function rf(){O.call(this)}u(rf,O);
rf.prototype.u=function(a){a.wf=Wa;var b=new M;b.append('<div id="',N(a.id),'" class="',"H8A",'"><div class="',"H8B",'"><div class="',"H8C",'">',a.wf?'<div class="H8D H8E"><a href="fb://upload/actions" class="H8F">upload photo</a></div>':"",'<div class="',"H8D",'"><div class="',"H93",'"><textarea id="',N(a.id),'_text" type="text"  class="',"H91",'" placeholder="Share something"></textarea></div></div><div class="',"H8D"," ","H90",'"><input id="',N(a.id),'_send" type="button" value="Share" class="',"H92",
'"/></div></div></div></div>');a=b.toString();return a.toString()};rf.prototype.i=function(){rf.d.i.call(this);var a=Q(this,"text");D(P(this),a,fc,this.Mc);D(P(this),a,"blur",this.df)};rf.prototype.Mc=function(){Q(this,"text");Q(this,"text").focus()};rf.prototype.df=function(){var a=Q(this,"text");a.scrollTop=0;a.scrollLeft=0};function sf(a){$.call(this,a)}u(sf,$);sf.prototype.L=function(a){var b=a.data;return!q(b.data)||!b.data.length?kf(a):sf.d.L.call(this,a)};sf.prototype.O=function(){return qf()};function tf(){O.call(this);var a=new X,b=new S;Y(a,b);b=new rf;Y(a,b);b=new sf("me");Z(a,b);this.Vc=a;this.g(a)}u(tf,R);tf.prototype.Vc=j;L.homepage=tf;
