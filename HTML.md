# HTML

* Geolocation API - Now visitors can choose to share their physical location with your web application.
* Drag and Drop API
* Web Storage API <br />
`localStorage` - stores data with no expiration date <br />
`sessionStorage` - stores data for one session (data is lost when the browser tab is closed) <br />
* Web Workers 
```
// simple web worker that count numbers in the background
if (typeof(Worker) !== "undefined") {
	if (typeof(w) == "undefined") {
		w = new Worker("demo_workers.js");
	}
} else {
	// Sorry! No Web Worker support..
}
w.onmessage = function(event){
	document.getElementById("result").innerHTML = event.data;
};
w.terminate();
```


 **Since web workers are in external files, they do not have access to the following JavaScript objects:** <br /> 
* The window object <br />
* The document object <br />
* The parent object <br />

#### Global Attirubute : <br />
`contenteditable` - Specifies whether the content of an element is editable or not <br />
`data-*` - Used to store custom data private to the page or application <br />
`tabindex` - Specifies the tabbing order of an element <br />

#### Global Event Attributes: <br />
`onerror` - script	Script to be run when an error occurs <br />
`onhashchange` - script	Script to be run when there has been changes to the anchor part of the a URL <br />
`onload` - script	Fires after the page is finished loading <br />
`onoffline` - script	Script to be run when the browser starts to work offline <br />
`ononline` - Script to be run when the browser starts to work online <br />
`onpagehide` - Script to be run when a user navigates away from a page <br />
`onstorage` - Script to be run when a Web Storage area is updated <br />
`onunload` - Fires once a page has unloaded (or the browser window has been closed) <br />
`onpageshow` - Script to be run when a user navigates to a page <br />

#### Events:
`onBlur`, `onChange`, `onFocus`, `onInput`, `onSelect`, `onSubmit` and manymore

#### HTML Language Code Reference
`ISO Language Codes` - You should always include the lang attribute inside the <html> tag, to declare the language of the Web page. This is meant to assist search engines and browsers:
```
<html lang="en"> </html>

// In XHTML, the language is declared inside the <html> tag as follows:
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
``` 
#### HTML Keys :
`<!DOCTYPE html>` - The declaration is not an HTML tag. It is an "information" to the browser about what document type to expect. <br />
`URL` - Uniform Resource Locator <br />
`Semantic HTML` - Semantic HTML is one style of coding, where the tags convey the meaning of the text <br />
`non-semantic elements` - div and span <br />
`semantic elements` - form, table, and article <br />
`HTTP` - Hypertext Transfer Protocol - <br />
* It is designed to enable communications between clients and servers. <br />
* HTTP works as a request-response protocol between a client and server. <br />

`HTML Entities` - Reserved characters in HTML must be replaced with character entities. <br>
```
Result	Description   	Entity Name	  Entity Number 
    <	  less than			&lt;		    &#60;

// HTML charset Attribute
<meta charset="UTF-8">
To display an HTML page correctly, a web browser must know the character set used in the page.
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <p>I will display A B C</p>
        <p>I will display &#65; &#66; &#67;</p>
    </body>
</html>

```
`srcset` - 
```
<picture>
  <source srcset="img_smallflower.jpg" media="(max-width: 600px)">
  <source srcset="img_flowers.jpg" media="(max-width: 1500px)">
  <source srcset="flowers.jpg">
  <img src="img_smallflower.jpg" alt="Flowers">
</picture>
```
`SVG` - HTML SVG is used to describe the two-dimensional vector and vector or raster graphics. SVG images and their behaviors are defined in XML text files. So as XML files, you can create and edit an SVG image with the text editor. It is mostly used for vector type diagrams like pie charts, 2-Dimensional graphs in an X, Y coordinate system.
```
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="yellow" stroke-width="4" fill="red" />
</svg>
```
`Media Query` - 
```
<style>
.left, .right {
  float: left;
  width: 20%; /* The width is 20%, by default */
}

.main {
  float: left;
  width: 60%; /* The width is 60%, by default */
}

/* Use a media query to add a breakpoint at 800px: */
@media screen and (max-width: 800px) {
  .left, .main, .right {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}
</style>
```

**What is the difference between a block-level element and an inline element?**

A block-level element is drawn as a block that stretches to fill the full width available to it i.e, the width of its container and will always start on a new line.
Elements that are block-level by default: (div), (img), (section), (form), (nav).

Inline elements are drawn where they are defined and only take up space that is absolutely needed. The easiest way to understand how they work is to look at how text flows on a page.
Examples of elements that are inline by default: (span), (b), (strong), (a), (input).

**What is semantic HTML?** <br />
It is the use of HTML markup to reinforce the semantics or meaning of the content.

**How to create a nested webpage in HTML?**
```
<!DOCTYPE html>
<html>
    <body>
        <h2>HTML example</h2>
        Use the height and width attributes to specify the size of the iframe:
        <iframe src="https://www.edureka.co/" height="300" width="400"></iframe>
    </body>
</html>
```

**What is the difference between DIV and SPAN in HTML?** <br />
The difference between span and div is that a span element is in-line and usually used for a small chunk of HTML inside a line,such as inside a paragraph. Whereas, a div or division element is block-line which is equivalent to having a line-break before and after it and used to group larger chunks of code.
```
<div id="HTML">
    This is <span class="Web Dev">interview</span>
</div>
```

### Server-Sent Events
HTML5 introduces events which flow from web server to the web browsers and they are called Server-Sent Events (SSE). <br>
A server side script should send Content-type header specifying the type text/event-stream as follows.
print "Content-Type: text/event-stream\n\n";
After setting Content-Type, server side script would send an Event: tag followed by event name. Following example would send Server-Time as event name terminated by a new line character.

### HTML5 new features
`New Semantic Elements` − These are like (header), (footer), and (section).
The following tags have been introduced for better structure −
`section` − This tag represents a generic document or application section. It can be used together with h1-h6 to indicate the document structure. <br>
`article` − This tag represents an independent piece of content of a document, such as a blog entry or newspaper article. <br>
`aside` − This tag represents a piece of content that is only slightly related to the rest of the page. <br>
`header` − This tag represents the header of a section. <br>
`footer` − This tag represents a footer for a section and can contain information about the author, copyright information, et cetera. <br>
`nav` − This tag represents a section of the document intended for navigation. <br>
`dialog` − This tag can be used to mark up a conversation. <br>
`figure` − This tag can be used to associate a caption together with some embedded content, such as a graphic or video. <br>

Forms 2.0 − Improvements to HTML web forms where new attributes have been introduced for <input> tag.

Persistent Local Storage − To achieve without resorting to third-party plugins. <br>
Cookies are limited to about 4 KB of data. Not enough to store required data. <br>

### WebSocket
`WebSocket` − WebSockets is a next-generation bidirectional communication technology for web applications which operates over a single socket and is exposed via a JavaScript interface in HTML 5 compliant browsers. <br>

Once you get a Web Socket connection with the web server, you can send data from browser to server by calling a send() method, and receive data from server to browser by an onmessage event handler.
var Socket = new WebSocket(url, [protocal] );
```
Socket.close() 
Socket.send()
Socket.onmessage = function (evt) { 
      var received_msg = evt.data;
      alert("Message is received...");
   };
```

### [Responsive](https://medium.com/@nids.nitesh/understanding-the-viewport-meta-tag-b5ccd8c4f0e6)
The viewport meta element is what turns a regular website page into a responsive page
```
<meta name=”viewport” content=”width=device-width,initial-scale=1">
```
This is telling the browser to set the width of the content to the width of the device itself, and to scale that content to 1 on load. <br>
The width=device-width part sets the width of the page to follow the screen-width of the device (which will vary depending on the device).

The initial-scale=1.0 part sets the initial zoom level when the page is first loaded by the browser.

















