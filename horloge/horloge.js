 function setup() {
	wid=window.innerHeight;
	canvas = createCanvas(wid, wid);
	canvas.position((window.innerWidth-window.innerHeight)/2,0);
	angleMode(DEGREES);
 }
 function windowResized() {
	wid=window.innerHeight;
	resizeCanvas(wid, wid);
	canvas.position((window.innerWidth-window.innerHeight)/2,0);
}

 function draw() {
	background(0);
	translate(width/2, width/2);
	
	const start = Date.now();
    hr = hour() ;
    mn = minute();
    sc = start%60000;
	strokeWeight(8*width/400);
	noFill();
	stroke(255, 100, 150);
	arc(0, 0, 300*width/400, 300*width/400, -90, (360/60000*sc)-90);
	stroke(150, 100, 255);
	arc(0, 0, 280*width/400, 280*width/400, -90, (360/60*mn)+(360/3600000*sc)-90);
	stroke(150, 255, 100);
	arc(0, 0, 260*width/400, 260*width/400, -90, (360/12*hr)+(360/720*mn)+(360/43200000*sc)-90);

	push();
	rotate((360/60000*sc)-90);
	stroke(255, 100, 150);
	line(0, 0, 100*width/400, 0);
	pop();
	push();
	rotate((360/60*mn)+(360/3600000*sc)-90);
	stroke(150, 100, 255);
	line(0, 0, 75*width/400, 0);
	pop();
	push();
	rotate((360/12*hr)+(360/720*mn)+(360/43200000*sc)-90);
	stroke(150, 255, 100);
	line(0, 0, 50*width/400, 0);
	pop();
	
	stroke(255);
	point(0, 0);
	
    fill(255);
	
    noStroke();
	textAlign(CENTER);
	textSize(width*0.03);
    text(hr + ':' + mn + ':' + ((int) (sc/1000)), 0, 180*width/400);
	document.getElementById('titre').innerHTML=hr + ':' + mn + ':' + ((int) (sc/1000)), 0, 180*width/400;


}
