window.Tacky=function(){function a(a,b){function c(a){this.ctx=a}return c.prototype=a,function(a){return b.call(a,new c(a))}}var b=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","div","dl","dt","element","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","shadow","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"],c=Function.prototype,d=Array.prototype,e=c.bind,f=c.call,g=d.reduce,h=d.slice,i=d.map,j=d.filter,k=d.forEach,l=function(a){return a&&a.call==f};partial=function(a){var b=h.call(arguments,1);return function(){return a.apply(this,b.concat(h.call(arguments)))}},existsFilter=partial(j,function(a){return!!a}),reducer=function(a,b,c){return b[c]=partial(a,c),b};var m=function(){var a,c=e.call(Document.prototype.createTextNode,document),d=e.call(Document.prototype.createElement,document),f=e.call(Document.prototype.createDocumentFragment,document),j=function(a){return l(a)&&(a=a.call(this.ctx,this)),a?a instanceof Node?a:c(a.toString()):void 0},m=function(a,b){var c=partial(i,e.call(j,this)),d=partial(k,e.call(Node.prototype.appendChild,a));return d.call(existsFilter.call(c.call(b))),a},n=function(a,b){var c=d(a),e=h.call(arguments,2);for(var f in b)c.setAttribute(f,b[f]);return m.call(this,c,e)};return a=partial(g,partial(reducer,n)).call(b,{}),a.$frag=function(){return m.call(this,f(),h.call(arguments))},a}(),n=function(){var a,c=function(a){return a},d={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},f=function(a){return l(a)&&(a=a.call(this.ctx,this)),a?a.toString():void 0},j=function(a,b){var g=partial(i,e.call(f,this)),j=g.call(h.call(arguments,2)),k=[],l="";for(var m in b)k.push(c(m)+'="'+c(b[m])+'"');return k.length&&(l=" "+k.join(" ")),"<"+a+l+">"+(j.length||!d[a]?j.join("")+"</"+a+">":"")};return a=partial(g,partial(reducer,j)).call(b,{}),a.$frag=function(){var a=partial(i,e.call(f,this));return a.call(h.call(arguments,0)).join("")},a}();return{browser:m,stringer:n,tmpl:a}}();