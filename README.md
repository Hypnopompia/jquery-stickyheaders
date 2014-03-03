jquery-stickyheaders
====================

Jquery plugin to stick headers while scrolling similar to instagram.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.stickyheaders.js"></script>
<link rel="stylesheet" href="/path/to/stickyheaders.css">
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

## Usage

Setup your content as such:
```html
<div class="stickyContainer">
	<div class="stickyHeader">Header 1</div>
	... content ...
	<div class="stickyHeader">Header 2</div>
	... content ...
	<div class="stickyHeader">Header 3</div>
	... content ...
</div>
```

```javascript
	$('.stickyContainer').stickyHeaders();
```

You can also register a callback to be fired during scrolling. $(this) will be the div element of the current header that is at the top of the scroll window. See the example for a use case.
```javascript
	$('.stickyContainer').stickyHeaders({
		onHeaderChange: function() { // When we scroll, trigger an event that tells us which header is currently at the top. We'll use this to update the select pulldown.
			var headerId = $(this).attr('data-header');
			$('#headerJumpSelect').val(headerId);
		}
	});
```

## Authors

[TJ Hunter](https://github.com/hypnopompia)