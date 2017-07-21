# UI Toolbar [![Build Status](https://travis-ci.org/youseedk/uitoolbar.svg?branch=master)](https://travis-ci.org/youseedk/uitoolbar)
A tool created for developers working with user interfaces

## Note
This is still work in progress

## Install options

1: Click this button and drag it to your bookmarks bar. It's that simple.
[![UI Toolbar](https://youseedk.github.io/uitoolbar/bookmarklet.png)](https://yousee.dk)

---
<a href="javascript:!function(){if(!document.getElementById('debugscript')){var b=document.createElement('script');b.src='https://youseedk.github.io/uitoolbar/uitoolbar.js',b.id='debugscript',document.head?document.head.appendChild(b):document.getElementsByTagName('head')[0].appendChild(b)}}();">
test
</a>

2: Right-click on the bookmarks bar and choose "Add Page". Give the bookmarklet a title ("UI Toolbar" would be good) and paste below code into the URL field. 

## Code
```javascript
javascript:!function(){if(!document.getElementById("debugscript")){var b=document.createElement("script");b.src="https://youseedk.github.io/uitoolbar/uitoolbar.js",b.id="debugscript",document.head?document.head.appendChild(b):document.getElementsByTagName("head")[0].appendChild(b)}}();
```

## Usage
Visit a page, click the bookmarklet.
