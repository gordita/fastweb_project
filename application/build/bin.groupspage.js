function ag(a){var b=new G;H(pd("/"+a+"/groups"),function(a){a.data&&q(a.data)?b.A(a):b.D(a)});return b};function bg(a){Z.call(this,a)}u(bg,Z);bg.prototype.Vb=j;bg.prototype.h=function(){bg.d.h.call(this)};
bg.prototype.S=function(a){var b=a.data.data;if(!q(b)||!b.length)a=mf(a);else{b=new K;b.append('<div id="',L(a.id),'_result" class="',"H68",'">');var c=b||new K;c.append("<div>");for(var d=a.data.data,f=d.length,g=0;g<f;g++){var h=d[g],h={Jd:h.id,name:h.name,re:h.unread,xc:a.data.access_token};(c||new K).append('<a href="/profile?id=',L(h.Jd),'"  class="',"H6A",'"><img src="https://graph.facebook.com/',L(h.Jd),"/picture?access_token=",L(h.xc),'" class="',"H6C",'" /><span class="',"H6E",'">',L(h.name),
"</span>",h.re>0?'<span class="H6F">'+L(h.re)+"</span>":"",'<span class="',"H70",'">&#0155;</span></a>')}c.append("</div>");b.append("</div>");a=b.toString();a=a.toString()}return a};bg.prototype.$=function(){return ag(this.gb)};function cg(){M.call(this);var a=Td(window).w.get("id"),b=new W,c=new R;b.N.e(c);a=new bg(a);X(b,a);this.e(b)}u(cg,Q);I.groupspage=cg;
