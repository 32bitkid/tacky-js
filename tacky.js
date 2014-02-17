window.Tacky = (function() {
  var elements =["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","div","dl","dt","element","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","shadow","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"],
      funcProto = Function.prototype,
      arrayProto = Array.prototype,
      
      bind = funcProto.bind,
      call = funcProto.call,
      
      reduce = arrayProto.reduce,
      slice = arrayProto.slice,
      map = arrayProto.map,
      filter = arrayProto.filter,
      forEach = arrayProto.forEach,
      
      isFunction = function(fn) { return fn && fn.call == call; }
      
      partial = function(fn) {
        var args = slice.call(arguments,1);
        return function() {
          return fn.apply(this, args.concat(slice.call(arguments)));
        };
      },
      existsFilter = partial(filter, function(val) { return !!val; }),
      reducer = function(fn, DOM, tagName) { DOM[tagName] = partial(fn, tagName); return DOM; };
  
  var browser = (function() {
    var browser,
        createText = bind.call(Document.prototype.createTextNode, document),
        createElement = bind.call(Document.prototype.createElement, document),
        createFragment = bind.call(Document.prototype.createDocumentFragment, document),
        toNodes = function(content) {
          if(isFunction(content)) content = content.call(this.ctx, this);
          if(!content) return;
          if(content instanceof Node) return content;
          return createText(content.toString());
        },
        doAppend = function(tag, children) {
          var boundToNodes = partial(map, bind.call(toNodes, this));
          var appender = partial(forEach, bind.call(Node.prototype.appendChild, tag));
          appender.call(existsFilter.call(boundToNodes.call(children)));
          return tag;
        };
    
    var fn = function(tagName, attrs) {
      var tag = createElement(tagName),
          children = slice.call(arguments, 2);
      
      for(var attr in attrs) {
        tag.setAttribute(attr, attrs[attr]); 
      }
      
      return doAppend.call(this, tag, children);
    };
    
    browser = partial(reduce, partial(reducer, fn)).call(elements, {});
    browser.$frag = function() { 
      return doAppend.call(this, createFragment(), slice.call(arguments));
    };
    
    return browser;
  }());
  
  
  var stringer = (function() {
    var stringer, 
        esc = function(s) { return s; },
        isSelfClosing = {
          "area":true, "base":true, "br":true, "col":true, "command":true,
          "embed":true, "hr":true, "img":true, "input":true, "link":true,
          "meta":true, "param":true, "source":true, "track": true, "wbr":true    
        };
    
    var renderChildren = function(content) {
      if(isFunction(content)) content = content.call(this.ctx, this);
      if(!content) return;
      return content.toString();
    };
    
    var fn = function(tagName, attrs) {
      var boundRenderChildren = partial(map, bind.call(renderChildren, this));
      var children = boundRenderChildren.call(slice.call(arguments, 2));
      var attrsArray = [], attrString = '';
      for(var i in attrs) {
        attrsArray.push(esc(i)+"=\""+esc(attrs[i])+"\"");
      }
      if(attrsArray.length) attrString = " "+attrsArray.join(" ");
      
      return "<"+tagName+attrString+">" + 
        ((children.length || !isSelfClosing[tagName]) ?
         children.join("") +  "</"+tagName +">" : "");  
    };
    
    stringer = partial(reduce, partial(reducer, fn)).call(elements, {});
    stringer.$frag = function() {
      var boundRenderChildren = partial(map, bind.call(renderChildren, this));
      return boundRenderChildren.call(slice.call(arguments,0)).join("");
    };
    return stringer;
  }());

  function tmpl(browser, fn) {
    function DerivedContext(ctx) { this.ctx = ctx; };
    DerivedContext.prototype = browser;
    return function(ctx) {
      return fn.call(ctx, new DerivedContext(ctx));
    }
  }
         
  return {
    browser: browser,
    stringer: stringer,
    tmpl: tmpl
  };
})();