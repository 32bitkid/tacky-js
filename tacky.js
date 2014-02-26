/* jshint strict: true, undef: true, unused: true */
/* global module, exports: true, document, Document, Node */

(function() {
  "use strict";
  // Base setup
  // ----------
  
  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this,
      // Create the tacky object.
      tacky = {};
  
  // Export the tacky object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = tacky;
    }
    exports.tacky = tacky;
  } else {
    root.tacky = tacky;
  }
  
  // A list of HTML5 element names.
  var elements =["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","div","dl","dt","element","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","shadow","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"];
      
  // Create quick references to prototypes that are used.
  var funcProto = Function.prototype,
      arrayProto = Array.prototype,
      
      // Create quick references to `Function` prototype methods that are used. 
      bind = funcProto.bind,
      call = funcProto.call,
      
      // Create quick references to `Array` prototype methods that are used
      reduce = arrayProto.reduce,
      slice = arrayProto.slice,
      map = arrayProto.map,
      filter = arrayProto.filter,
      forEach = arrayProto.forEach,
      
      // Return `true` if the arugment is a function
      isFunction = function(fn) { return fn && fn.call == call; },
      
      // [Partial application](http://en.wikipedia.org/wiki/Partial_application) implementation.
      // Partial applications are heavily used in this library, and 
      partial = function(fn) {
        var args = slice.call(arguments,1);
        return function() {
          return fn.apply(this, args.concat(slice.call(arguments)));
        };
      },
      
      // Create a `filter` that will remove all falsey values from an array.
      // For example:
      //     existsFilter.call([1,undefined,true,"Hello",false]); // => [1,true,"Hello"]
      existsFilter = partial(filter, function(val) { return !!val; }),
      
      // This helper reduces the list of HTML5 elements into a single object. The `fn` arguments
      // is partially applied by each implementation: `browser` and `stringer`.
      reducer = function(fn, DOM, tagName) { DOM[tagName] = partial(fn, tagName); return DOM; };
  
  // Browser
  // -------
  // This implemenation will generate *actual* DOM elements in a browser.
  tacky.browser = (function() {
    var // Create a quick reference to the `Document` prototype
        docProto = Document.prototype,
        
        // Bind `createTextNode` to the current `document`
        createText = bind.call(docProto.createTextNode, document),
        
        // Bind `createElement` to the current 'document`
        createElement = bind.call(docProto.createElement, document),
        
        // Bind `createDocumentFragment` to the current `document`
        createFragment = bind.call(docProto.createDocumentFragment, document),
        
        // A helper function that will always return a `Node`.
        toNodes = function(content) {
          // If the content is a function then it will be invoked.
          if(isFunction(content)) content = content.call(this.ctx, this);
          
          // If the content is falsey then return `undefined`.
          if(!content) return;
          
          // If the content is already a `Node` then just return it. 
          if(content instanceof Node) return content;
          
          // Otherwise, covert the object into a string, and wrap it in a `TextNode`
          return createText(content.toString());
        },
        
        // Append multi all `children` to `element`
        doAppend = function(element, children) {
          // Bind `toNodes` to `this`. This is important for rendering templates
          // and to properly forward the context of the template
          var boundToNodes = bind.call(toNodes, this);
          
          // Create a `map` to convert children to into nodes.
          var mapToNodes = partial(map, boundToNodes);
          
          // Bind `appendChild` to the current element.
          var appendChildToElement = bind.call(Node.prototype.appendChild, element);
          
          // Create a `forEach` that will append each child to the element.
          var appender = partial(forEach, appendChildToElement);
          
          // Convert the children into the nodes, filter down to children that actually exist,
          // and finally append them to the element.
          appender.call(existsFilter.call(mapToNodes.call(children)));
          
          return element;
        };
    
    // Create a generator function for the `reducer`. This function
    // is used to generate a element of a specific type, and optionally
    // apply a collection of attributes to that element, and append also
    // zero or more children.
    var generator = function(tagName, attrs) {
      
      // Create the element of the desired tag name.
      var element = createElement(tagName),
          
          // Slice the remaining arguments as `children`.
          children = slice.call(arguments, 2);
      
      // Set the attributes on the element.
      for(var attr in attrs) {
        element.setAttribute(attr, attrs[attr]); 
      }
      
      // Append the children to the element
      return doAppend.call(this, element, children);
    };

    // Partially apply our generator to the reducer.
    // Then create a `reduce` from the generic reducer.
    // Finally, call it with all of the elements we want
    // to generate helpers for, and with an empty object
    // to start.
    var browser = partial(reduce, partial(reducer, generator)).call(elements, {});
    
    // Create a fragment helper, for creating sibling elements without a parent element.
    browser.$frag = function() { 
      return doAppend.call(this, createFragment(), slice.call(arguments));
    };
    
    // Return the fully constructed `browser` object.
    return browser;
  }());
  
  // Stringer
  // --------
  // This implementation will generate HTML strings, for use when DOM elements are not available.
  tacky.stringer = (function() {
    
    var // This function should return HTML escaped strings   
        esc = function(s) { return s; },
        
        // A list of elements that are self closing -- given they have no content.
        isSelfClosing = {
          "area":true, "base":true, "br":true, "col":true, "command":true,
          "embed":true, "hr":true, "img":true, "input":true, "link":true,
          "meta":true, "param":true, "source":true, "track": true, "wbr":true    
        };

    // Render all children into a string
    var renderChildren = function(content) {
      // If the content is a function then invoke it.
      if(isFunction(content)) content = content.call(this.ctx, this);
      
      // If the content is falsy, then return undefined
      if(!content) return;
      
      // Return the content as a string.
      return content.toString();
    };
    
    // Create a generator function for the `reducer`. This function
    // is used to generate a element of a specific type, and optionally
    // apply a collection of attributes to that element, and append also
    // zero or more children.
    var generator = function(tagName, attrs) {
      // Create a map to `renderChildren`
      var boundRenderChildren = partial(map, bind.call(renderChildren, this)),
          // Slice `children` off of end of arguments and render each one
          children = boundRenderChildren.call(slice.call(arguments, 2)),
          // Helpers for building the attributes part of the element
          attrsArray = [], attrString = '';
      
      // Generate the attributes part 
      for(var i in attrs) {
        attrsArray.push(esc(i)+"=\""+esc(attrs[i])+"\"");
      }
      // If there are attributes, then join them together
      if(attrsArray.length) attrString = " "+attrsArray.join(" ");
      
      // Build the string version of the element and return it.
      return "<"+tagName+attrString+">" + 
        ((children.length || !isSelfClosing[tagName]) ?
         children.join("") +  "</"+tagName +">" : "");  
    };
    
    // Partially apply our generator to the reducer.
    // Then create a `reduce` from the generic reducer.
    // Finally, call it with all of the elements we want
    // to generate helpers for, and with an empty object
    // to start.    
    var stringer = partial(reduce, partial(reducer, generator)).call(elements, {});
    
    // Create a fragment helper, for creating sibling elements without a parent element.
    stringer.$frag = function() {
      var boundRenderChildren = partial(map, bind.call(renderChildren, this));
      return boundRenderChildren.call(slice.call(arguments,0)).join("");
    };
    
    // Return the fully constructed `stringer` object
    return stringer;
  }());

  // Templating 
  // ----------
  
  // > This is a work in progress...
  tacky.tmpl = function(browser, fn) {
    function DerivedContext(ctx) { this.ctx = ctx; }
    DerivedContext.prototype = browser;
    return function(ctx) {
      return fn.call(ctx, new DerivedContext(ctx));
    };
  };
}).call(this);