var initwidth,initheight;
var spr,sprx=0,spry=0,group_new_spr;
var food,score,start;
var group_walls;

function windowResized()
{
	window.innerHeight=window.innerHeight;
	resizeCanvas(window.innerHeight, window.innerHeight);
	canvas.position((window.innerWidth-window.innerHeight)/2,0);
	camera.zoom = window.innerHeight/(initwidth-80);
}

function init_display() {
	canvas = createCanvas(window.innerHeight, window.innerHeight);
	canvas.position((window.innerWidth-window.innerHeight)/2,0);
	initwidth=860;
	initheight=860;
	
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
	camera.zoom = window.innerHeight/(initwidth-80);
	camera.position.x=initwidth/2;
	camera.position.y=initwidth/2;
}

function init_walls(){
	if (!(undefined == group_walls) && (group_walls.length)!=0) removeALL(group_walls);
	create_wall(initwidth/2, 20, initwidth, 40);//mur haut
	create_wall(initwidth/2, 840, initwidth, 40);//mur bas
	create_wall(840, initheight/2, 40, initheight);//mur droite
	create_wall(20, initheight/2, 40, initheight);//mur gauche
}

function init_spr(){
	if (!(undefined == spr)) spr.remove();
	spr = createSprite(initwidth/2, initheight/2, 18, 18);
	spr.shapeColor = color(141,245,24);
	init_new_spr();
}

function init_new_spr(){
	if (!(undefined == group_new_spr) && (group_new_spr.length)!=0) removeALL(group_new_spr);
	nb=3;
	for (k=20;k<(nb*20+10);k=k+20)
	{
		create_new_spr(initwidth/2,initheight/2+k);
	}
}

function init_food(){
	if (!(undefined == food)){
		eat_food();
	}
	else{
		food = createSprite(-50, -50, 18, 18);
		food.shapeColor = color(255,0,0);
		init_food();
	}
	
}

function removeALL(group){
	while(group.length!=0) group[0].remove();
}

function init_stat(){
	score=0;
	start=false;
}

function setup()
{
	init_display();
	init_walls();
	init_spr();
	init_food();
	init_stat();
}

function  create_wall(x,y,w,h){
	if (undefined == group_walls) group_walls=new Group();
    var wall = createSprite(x, y, w, h);
	wall.shapeColor = color(0);
	group_walls.add(wall);
}

function create_new_spr(x,y){
	if(undefined == x || undefined == y)
	{x= initwidth*9;y=initwidth*9;}
	if (undefined == group_new_spr) group_new_spr=new Group();
	new_spr = createSprite(x, y, 19, 19);
	new_spr.shapeColor = color(255);
	group_new_spr.add(new_spr);
}

function grid(){
	background(50);
	stroke(51,134,255,50);
	for(i=1;i<41;i++)
	{
		line(40,i*20+20,820,i*20+20);
		line(i*20+20,40,i*20+20,820);
	}
	noStroke();
}

function draw()
{
	grid();
    drawSprites();

	if(start==false)
	{
		if(mouseX>width/2-width/8 && mouseX<width/2+width/8 && mouseY>width/2+width/17*2 && mouseY<width/2+width/17*4)
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
	if(start==true){
		if (keyCode == RIGHT_ARROW && sprx!=-20 ){sprx=20;spry=0;}
		if (keyCode == LEFT_ARROW && sprx!=20){sprx=-20;spry=0;}
		if (keyCode == DOWN_ARROW && spry!=-20){spry=20;sprx=0;}
		if (keyCode == UP_ARROW && spry!=20){spry=-20;sprx=0;}
	} else if ((keyCode == 13 || keyCode == 32) && start==false){setTimeout(move,50);sprx=0;spry=-20;start=true;}
}
function mousePressed() {
	if(mouseX>width/2-width/8 && mouseX<width/2+width/8 && mouseY>width/2+width/17*2 && mouseY<width/2+width/17*4 && start==false)
	{
		setTimeout(spr_move,50);
		sprx=0;
		spry=-20;
		start=true;
	}
}
function spr_move()
{
	spr.collide(group_walls,perdu);
	eat_new_spr();
	spr.overlap(food,eat_food);
	for(k=group_new_spr.length-1;k>0;k--)
		group_new_spr[k].position = createVector(group_new_spr[k-1].position.x,group_new_spr[k-1].position.y);
	group_new_spr[0].position = createVector(spr.position.x,spr.position.y);
	spr.position.x+=sprx;
	spr.position.y+=spry;
	setTimeout(spr_move,100);
}

function eat_new_spr(){
	for(z=0;z<group_new_spr.length;z++)
		if(spr.position.x==group_new_spr[z].position.x && spr.position.y==group_new_spr[z].position.y)
			perdu();
}

function eat_food(){
	create_new_spr();
	score+=100;
	food_posotion();
}

function food_posotion(){
	food.position.x=Math.round(random(2,38))*20+10;
	food.position.y=Math.round(random(2,38))*20+10;
	for(z=group_new_spr.length-1;z>-1;z--)
		if(food.position.x==group_new_spr[z].position.x && food.position.y==group_new_spr[z].position.y)
		food_posotion();
}

function perdu()
{
	alert("Tu as perdu ! Tu as un score de "+score+" ! Tu peux recommencer si tu veux...");
	parent.frames[0].location.href = 'SNAKE.html';
} 









