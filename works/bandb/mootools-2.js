window.addEvent("load",function(){
	var scroll = new Fx.Scroll("scroll", {
	wait: false,
	duration: 1024,
	offset: {'x': 0, 'y': 0},
	transition: Fx.Transitions.Quad.easeInOut
	});


$('link1').addEvent('click', function(event) {
	event = new Event(event).stop();
	scroll.toElement('content1');
});
 
$('link2').addEvent('click', function(event) {
	event = new Event(event).stop();
	scroll.toElement('content2');
});
 
$('link3').addEvent('click', function(event) {
	event = new Event(event).stop();
	scroll.toElement('content3');
});
 
$('link4').addEvent('click', function(event) {
	event = new Event(event).stop();
	scroll.toElement('content4');
});




});
		