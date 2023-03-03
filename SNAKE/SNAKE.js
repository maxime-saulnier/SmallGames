var initwidth,initheight;
var spr,nvspr,sprx,spry,group_spr,CR;
var nourriture,score,bon=true;
var murh,murb,murd,murg;
function perdu()
{
	alert("Tu as perdu ! Tu as un score de "+score+" ! Tu peux recommencer si tu veux...");
	parent.frames[0].location.href = 'SNAKE.html';
	
	

} 
function cree()
{
	nvspr = createSprite(1000, initheight/2, 19, 19);
	nvspr.shapeColor = color(255);
	nb++;
	group_spr.add(nvspr);
}
function nour()
{
	nourriture.position.x=Math.round(random(2,38))*20+10;
	nourriture.position.y=Math.round(random(2,38))*20+10;
	for(z=nb;z>-1;z--)
	{
		if(nourriture.position.x==group_spr[z].position.x && nourriture.position.y==group_spr[z].position.y)
		{
			nour();
		}	
	}
}
function move()
{ 
	bon=false;
	for(z=nb;z>-1;z--)
	{
		if(spr.position.x==group_spr[z].position.x && spr.position.y==group_spr[z].position.y)
		{
			perdu();
		}	
	}
	for(z=nb;z>0;z--)
	{
		w=z-1;
		group_spr[z].position = createVector(group_spr[w].position.x,group_spr[w].position.y);
	}
	group_spr[0].position = createVector(spr.position.x,spr.position.y);
	spr.position.x+=sprx;
	spr.position.y+=spry;
	if(CR==true)
	{
		CR=false;cree();
	}
	bon=true;
	setTimeout(move,50);
}
function setup()
{
	group_mur=new Group();
	document.getElementById("titre").innerHTML=document.URL;
	wid=window.innerHeight;
	canvas = createCanvas(wid, wid);
	canvas.position((window.innerWidth-window.innerHeight)/2,0);
	initwidth=860;
	initheight=860;
	score=0;
	camera.on = function()
	{
		if(!camera.active)
		{
			cameraPush.call(pInst);
			camera.active = true;
			camera.zoom = zoom;
			camera.mouseX = pInst.mouseX;
			camera.mouseY = pInst.mouseY;
		}
	};
	camera.zoom = wid/(initwidth-80);
	camera.position.x=initwidth/2;
	camera.position.y=initwidth/2;
	group_spr=new Group();
	a=20;
	nb=2;
	CR=false;
	for (i=0;i<3;i=i+1)
	{
		nvspr = createSprite(initwidth/2, initheight/2+a, 19, 19);
		nvspr.shapeColor = color(255);
		a+=20;
		group_spr.add(nvspr);
	} 
 	spr = createSprite(initwidth/2, initheight/2, 19, 19);
	spr.shapeColor = color(141,245,24);
    nourriture = createSprite(Math.round(random(2,38))*20+10, Math.round(random(2,38))*20+10, 19, 19);
	nourriture.shapeColor = color(255,0,0);
	sprx=0;
	spry=0;
    murh = createSprite(initwidth/2, 20, initwidth, 40);
	murh.shapeColor = color(0);
	group_mur.add(murh);
    murb = createSprite(initwidth/2, 840, initwidth, 40);
	murb.shapeColor = color(0);
	group_mur.add(murb);
    murd = createSprite(840, initheight/2, 40, initheight);
	murd.shapeColor = color(0);
	group_mur.add(murd);
    murg = createSprite(20, initheight/2, 40, initheight);
	murg.shapeColor = color(0);
	group_mur.add(murg);
	start=true;
}
function windowResized() {
	wid=window.innerHeight;
	resizeCanvas(wid, wid);
	canvas.position((window.innerWidth-window.innerHeight)/2,0);
	camera.zoom = wid/(initwidth-80);
}
function draw()
{
	background(50);
	noStroke();
	stroke(51,134,255,50);
	for(i=1;i<41;i++)
	{
		line(40,i*20+20,820,i*20+20);
		line(i*20+20,40,i*20+20,820);
	}
		noStroke();
	if(spr.overlap(nourriture,nour))
	{	
		score+=100;
		CR=true;
	}
	spr.collide(group_mur,perdu);
    drawSprites();
	if(mouseX>width/2-width/8 && mouseX<width/2+width/8 && mouseY>width/2+width/17*2 && mouseY<width/2+width/17*4 && start==true)
	{
		stroke(0); 
		noFill();
		strokeWeight(4);
		rect(initwidth/2-initwidth/8+10,initwidth/2+initwidth/17*2+5,initwidth/8*2-20,initwidth/17*2-10);
		noStroke();
		fill(255);
		rect(initwidth/2-initwidth/8+10,initwidth/2+initwidth/17*2+5,initwidth/8*2-20,initwidth/17*2-10);
		textAlign(CENTER,CENTER);
		textStyle(BOLD);
		fill(0);
		textSize(40);
		text("play",initwidth/2,initwidth/2+initwidth/17*3);
	}
    else
	{
		if(start==true)
		{
			stroke(0);
			noFill();
			strokeWeight(4);
			rect(initwidth/2-initwidth/8,initwidth/2+initwidth/17*2,initwidth/8*2,initwidth/17*2);
			noStroke();
			fill(255);
			rect(initwidth/2-initwidth/8,initwidth/2+initwidth/17*2,initwidth/8*2,initwidth/17*2);
			textAlign(CENTER,CENTER);
			textStyle(BOLD);
			fill(0);
			textSize(49);
			text("play",initwidth/2,initwidth/2+initwidth/17*3);
		}
	}
	
}
function keyPressed()
{
	if (keyCode == RIGHT_ARROW && sprx!=-20 && bon==true)
	{
		sprx=20;
		spry=0;
	}
	if (keyCode == LEFT_ARROW && sprx!=20 && bon==true)
	{
		sprx=-20;
		spry=0;
	}
	if (keyCode == DOWN_ARROW && spry!=-20 && bon==true)
	{
		spry=20;
		sprx=0;
	}
	if (keyCode == UP_ARROW && spry!=20 && bon==true)
	{
		spry=-20;
		sprx=0;
	}
	if ((keyCode == 13 || keyCode == 32) && start==true)
	{
		setTimeout(move,50);
		sprx=0;
		spry=-20;
		start=false;
	}
}
function mousePressed() {
	if(mouseX>width/2-width/8 && mouseX<width/2+width/8 && mouseY>width/2+width/17*2 && mouseY<width/2+width/17*4 && start==true)
	{
		setTimeout(move,50);
		sprx=0;
		spry=-20;
		start=false;
	}
}