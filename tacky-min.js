(function(){var a=this,b={};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=b),exports.tacky=b):a.tacky=b;var c=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","div","dl","dt","element","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","shadow","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"],d=Function.prototype,e=Array.prototype,f=d.bind,g=d.call,h=e.reduce,i=e.slice,j=e.map,k=e.filter,l=e.forEach,m=function(a){return a&&a.call==g},n=function(a){var b=i.call(arguments,1);return function(){return a.apply(this,b.concat(i.call(arguments)))}},o=n(k,function(a){return!!a}),p=function(a,b,c){return b[c]=n(a,c),b};b.browser=function(){var a=Document.prototype,b=f.call(a.createTextNode,document),d=f.call(a.createElement,document),e=f.call(a.createDocumentFragment,document),g=function(a){return m(a)&&(a=a.call(this.ctx,this)),a?a instanceof Node?a:b(a.toString()):void 0},k=function(a,b){var c=f.call(g,this),d=n(j,c),e=f.call(Node.prototype.appendChild,a),h=n(l,e);return h.call(o.call(d.call(b))),a},q=function(a,b){var c=d(a),e=i.call(arguments,2);for(var f in b)c.setAttribute(f,b[f]);return k.call(this,c,e)},r=n(h,n(p,q)).call(c,{});return r.$frag=function(){return k.call(this,e(),i.call(arguments))},r}(),b.stringer=function(){var a=function(a){return a},b={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},d=function(a){return m(a)&&(a=a.call(this.ctx,this)),a?a.toString():void 0},e=function(c,e){var g=n(j,f.call(d,this)),h=g.call(i.call(arguments,2)),k=[],l="";for(var m in e)k.push(a(m)+'="'+a(e[m])+'"');return k.length&&(l=" "+k.join(" ")),"<"+c+l+">"+(h.length||!b[c]?h.join("")+"</"+c+">":"")},g=n(h,n(p,e)).call(c,{});return g.$frag=function(){var a=n(j,f.call(d,this));return a.call(i.call(arguments,0)).join("")},g}(),b.tmpl=function(a,b){function c(a){this.ctx=a}return c.prototype=a,function(a){return b.call(a,new c(a))}}}).call(this);