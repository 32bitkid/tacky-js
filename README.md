# Tacky.js

Tacky javascript is a simple javascript programatic DOM wrapper and templating engine.

## Documentation

[Annotated Source](http://32bitkid.github.io/tacky-js/docs/tacky.html)

## Usage

Tacky provides two interfaces: `browser` and `stringer`. The `browser` interface will
return DOM elements while the `stringer` interface returns a simple string representation
of the same DOM.

For example, to create a simple link with tacky:

    var linkToGoogle = Tacky.browser.a({href:"http://google.com"}, "Google")

Tags can be nested in each other

    var list = Tacky.browser.ul({"class": "groceries"}, 
      Tacky.browser.li({}, "Milk"),
      Tacky.browser.li({}, "Eggs"),
      Tacky.browser.li({}, "Bread")
    );

## Templates

Templates take the form of simple functions that will recieve a `DOM` object.

    var sayHi = function(DOM) {
        return DOM.div({"class": "greeter"}, "Hello ", this.name);
    }
    
To turn this into a template, it needs to be bound to a renderer using the `tmpl()` helper:

    var sayHiTmpl = Tacky.tmpl(Tacky.browser, sayHi);
    
Then you can invoke the template with a context:

    sayHiTmpl({name: "Bob"});

## Inspirations

This project started while I was doing a quick prototype that was functional-centric, I ended up writing
a line of code that looked like this:

    var $new = Function.prototype.bind.call(Document.prototype.createElement, document);
    
From that, I started to realize that I could dynamically generate a collection of partial application functions,
for each known element name. The end goal was to attempt to provide a nicer way of quickly generate DOM elements using
the default DOM JS API.

After thrashing around with the API, I started hunting on the internet to see if anyone else had done anything similar. 
I realized that the API that I had constructed was very similar to both [React](http://facebook.github.io/react/) and
[DOMjs](https://github.com/medikoo/domjs).
