# tutorial-html5ui-hide-show #
Date: 2016-01-01<br>
Last Update 2016-02-11

This is code for a tutorial to hide and show an HTML5 element, such as `<div>`, `<span>`, `<iframe>`, and more. I have not written a blog post this yet.

The App starts with an `<iframe>` hidden. Clicking the button at the top of the screen toggles the `<iframe>` to "visible"; clicking again, hides the `<iframe>`.

## About the Code ##

This code example is intended to work with [*Phonegap Build*](https://build.phonegap.com/), a cloud-based build service by Phonegap/Adobe.

In addition, this works with the latest version (`cli-5.2.0`) of the tools set, as of this date (2016-01-01).

It also demonstrates how to use the new Cordova `whitelist` plugin. The requirements for this plugin are [heinous](https://en.wiktionary.org/wiki/heinous#Adjective) and tedious. This `app` hopes to demostrate how best to apply the parameters for this ***one example***.

A couple of things to note. 

1. In the `index.html`, there is no `<style></style>` block, `<script></script>` block, or `style=` attribute to any HTML elements. If such elements were used, it would require that the CSP filter contain the attribute `unsafe-inline` for both `script-src` and `style-src`.
2. In the `config.xml`, you will find multiple domains listed with `<allow-navigate (...) />`. The list encompasses all the *third-party* domains that support the one webpage we are loading. NOTE: because of the filter, any attempts to leave the webpage will end in failure &ndash; unless that domain is also `whitelist`ed.

## Files ##
- index.html - **required**
- config.xml - **required**
- default.css - style
- app.js - the main code for this app
- zepto-1.1.6.js - a jquery clone
- fastclick.js - a simple javascript utility to remove the 300ms delay from Android's webview library
- LICENSE - what it says
- README.md - this files

## Loading Order and API Requirements ##

Two important requirements for Cordova/Phonegap are to:

1. List `<script src="cordova.js"></script>` in the `index.html` (or `phonegap.js` for phonegap). (Do not include the file in the bundle.)
2. Wait for the `deviceready` event, which is given by `cordova.js` once it has finished loading *itself* and all the *plugins*.

### The `whitelist` plugin requirement ##

To note, if `cordova.js` does not load, then no plugins work. This means that the `whitelist` plugin does not work. If a `whitelist` system is not implemented, then your app may be rejected by *Google Play* and *Apple iTunes*.

## Load the `<iframe (...) />` ##

There are a couple of notes here.

**Why not "create and fill"?**

What is not apparent is that when loading an `iframe`, the thing that takes the most time is to fetch a webpage and all it's components. As such, the time taken for "create and fill" is but a fraction of time - from the UX (user experience) point of view.

However, as many "front-end" experts advise - \*[avoid reflow](https://www.google.com/search?q=html+front-end+avoid+reflow)\*. One respected website lists *"Modify Hidden Elements"* as a technique to [Minimize Reflows and Improve Performance](http://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/). As a matter of fact, [*DOM manipulation (element addition, deletion, altering, or changing element order)*](http://frontendbabel.info/articles/webpage-rendering-101/) is consider an action that causes the dreaded "reflow".

To be clear, both methods we are looking at will cause *reflow*, but the objective is to minimize *reflow*.

**why use the `hide` CSS class?**

As such, when using a CSS class that hides an HTML element (with let us say `display:none;`) and then displays that element (with let us say `display:block;`), we have reduced the reflow by not forcing the `viewport` to add an HTML element into the DOM tree. 

To be clear, dynamically adding an HTML element into a webpage, forces the entire webpage to be reorder (the DOM), recalculate, and repaint. If instead we just make the HTML element visible, the webpage recalculates from that point until the end of the page and NOT the entire webpage; reorder never takes place and repaint happens regardless. (This effects varies from webview engine to webview engine.)
