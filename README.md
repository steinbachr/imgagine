Want a cool grid of random Imgur pictures on YOUR site? Well, yeah that doesn't sound too great does it..but with imgagine you can have it! To use, simply include the imgagine.min.js file on the page, include imgagine.css as well. Then create a div (or other container element) with class $('.imgur-container') Last additional requirement is jQuery, but you should have that anyway.

<h2>Usage</h2>
$('.imgur-container').imgagine(<i>options</i>)

<h2>Options</h2>
<div><b>boxViewSel:</b> the selector for the button / element which is clicked to create a box view of the imgur data</div>
<div><b>gridViewSel:</b> The selector for the button / element which is clicked to create a grid view of the imgur data</div>
<div><b>regenerateSel:</b> The selector for the button / element which is clicked to fetch new data from imgur</div>
