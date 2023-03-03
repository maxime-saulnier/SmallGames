var img_smiley_blood,imghome,imgspr_1,imgspr_2_1,imgspr_2_2,imgetoile,font;

var smiley_sprite,group_smiley;

var home,home1,home2,group_home;

var spr,x_egal,y_egal,wall_sprg,wall_sprd;
var bouge,click,lance;

var wall_g,wall_d,wall_h,wall_b,wall_spr_g,wall_spr_d,wall_lance;

var nombretoile,etoiles,etoile,etoileTimeout;

var imobileTimeout,imobile,imobileTime,imo,tcol;

var seconde;
var niveau;
var mort;
var speed,p,speedLance,speedTimeout;
var temps_niveau=0;
function preload() {
    img_smiley_blood=loadImage("image/smiley_blood1.png");
	imghome=loadImage("image/home.png");
	imgspr_1=loadImage("image/smiley1.png");
	imgspr_2_1=loadImage("image/smiley2.1.png");
	imgspr_2_2=loadImage("image/smiley2.2.png");
	imgetoile=loadImage("image/etoile1.png");
	fond=loadImage("image/fond.jpg");
}
function homeposition(){
	home.position.x=random(101,699);
	home.position.y=random(40,160);
	home1.position.x=random(101,699);
	home1.position.y=random(240,360);
	home2.position.x=random(101,699);
	home2.position.y=random(440,560);
}
function creeretoile() {
	if(random(1,2)<2 && nombretoile<10){
		etoile=true;
		nombretoile++;
	}

etoileTimeout=setTimeout(creeretoile,5000);
}
function viret(spr,et){
	et.remove();
	nombretoile--;
	speed+=0.5;
	if(speed>10)speed=10;
}
function viretout(){
	 etoiles.removeSprites();
	 nombretoile=0;
}
function speedTime(){
	speed-=0.2;
	speedTimeout=setTimeout(speedTime,200);
}
function imobileTime(){
	imobile-=0.05;
	if(i==4.5 || i== 3.5  || i==2.5 || i==1.5 || i==0.5) tcol="lightsalmon";
	else if(i==5 || i==4  || i==3  || i==2 || i==1) tcol="red";
	imobileTimeout=setTimeout(imobileTime,50);
}
function setup() {
	wid=window.innerHeight;
    canvas =createCanvas(wid*1.33,wid);
	canvas.position((window.innerWidth-window.innerHeight*1.33)/2,0);
	initwidth=800;
	initheight=600;
	  camera.on = function() {
    if(!camera.active)
    {
      cameraPush.call(pInst);
      camera.active = true;
	  camera.zoom = zoom;
	  camera.mouseX = pInst.mouseX;
	  camera.mouseY = pInst.mouseY;
    }
  };
	camera.zoom = wid/initheight;
	camera.position.x=initwidth/2;
	camera.position.y=initheight/2;

	pe=false;
	
	i=5;
    wall_g=createSprite(59,300,1,600);
	wall_g.shapeColor = color(0,255,0,0);
    wall_d=createSprite(740,300,1,600);
	wall_d.shapeColor = color(0,255,0,0);
    wall_h=createSprite(initwidth/2,-2,800,4);
    wall_b=createSprite(initwidth/2,602,800,4);
	wall_b.shapeColor = color(0,0,0,0);
		
	wall_spr_g=createSprite(-2,300,5,600);
	wall_spr_d=createSprite(802,300,5,600);
	
	wall_lance=createSprite(-4,300,5,600);
	wall_lance.shapeColor = color(0,255,0,100);
	niveau=1;
	nombretoile=0;
	speed=3;
	lance=false;
	bouge=false;
	click=true;
	etoile=falseimo=true;
	seconde=0;
	mort=0;
	p=0;
	imobile=5;

	
	group_home=new Group();
	   home=createSprite(random(101,699), random(40,160));
		home.addImage(imghome);
		home.immovable=true;
		group_home.add(home);
		home1=createSprite(random(101,699), random(240,360));
        home1.addImage(imghome);
		home1.immovable=true;
		group_home.add(home1);
		home2=createSprite(random(101,699), random(440,560));
        home2.addImage(imghome);
		home2.immovable=true;
		group_home.add(home2);
		
	etoiles=new Group();
	
	
    group_smiley=new Group();
    for (i=0;i<3;i=i+1){
        smiley_sprite=createSprite(random(81,719),random(21,579));
        smiley_sprite.addImage(img_smiley_blood);
        smiley_sprite.setVelocity(random(-3,3),random(-3,3));
		smiley_sprite.setCollider("circle",0,0,20);
        group_smiley.add(smiley_sprite);
	}
     
			spr = createSprite(25,300);
			spr.addImage("stop",imgspr_1);
			spr.addImage("move_1",imgspr_2_1);
			spr.addImage("move_2",imgspr_2_2);
			spr.setCollider ("circle",0,0,20)
			spr.friction = 0.30;
			
    wall_d.immovable=true;
	wall_spr_d.immovable=true;
    wall_g.immovable=true;
	wall_spr_g.immovable=true;
    wall_h.immovable=true;
    wall_b.immovable=true;
}
function windowResized() {
	wid=window.innerHeight;
	canvas.resizeCanvas(wid*1.33,wid);
	canvas.position((window.innerWidth-window.innerHeight*1.33)/2,0);
	camera.zoom = wid/initheight;
}
function draw() {
	x_egal=spr.position.x;y_egal=spr.position.y;
	if(spr.position.x>90 && lance==false) {
		lance=true;	
		creeretoile();
		wall_lance.position.x=58;
	}
	if (mouseIsPressed && speed>0 && lance==true) {
		spr.friction = 0.10;
		if(speedLance==true){
			speedLance=false;
			speedTime()
		}
	}
	else{
		spr.friction = 0.23;
		speedLance=true
		clearTimeout(speedTimeout);
	}
		if(speed<0 ){
		speed=0;
	}
	if(etoile==true){	
		var j;
		j = createSprite(random(101,699), random(40,560));
		j.addImage(imgetoile);
		etoiles.add(j);
		etoile=false;}

	if(spr.bounce(group_smiley)){
		click=false;
		bouge=false;
		alert("Tu va recommencer le niveau "+niveau+"! dommage! Et tu va avoir 15 seconde de plus parceque tu aperdu!");
			seconde+=15*60;
			temps_niveau+=15*60;
			if(pe==true) fullscreen(); 
		speed-=1;
			spr.changeImage("stop");
			spr.rotateToDirection=false;
			spr.rotation=0;
			spr.position.x = 25;
			spr.position.y = 300;
			lance=false;
			imo==true;
			clearTimeout(etoileTimeout);
			clearTimeout(imobileTimeout);
			homeposition();
			imobile=5;
			wall_lance.position.x=-3;
			mort++;
			if(speed<1)speed=1;
			viretout();
			spr.position.x = 25;
			spr.position.y = 300;
			click=true;
	}
    if(spr.collide(wall_spr_d)){click=false;bouge=false;
		spr.position.x = 25;
		spr.position.y = 300;
		if(niveau==20){
			alert("Tu a gagné en "+Math.round((seconde/60))+" seconde. Tu peux recommencer si tu veux...");
			parent.document.location.reload();
			}
		else{alert("Niveau "+niveau+" terminé en "+Math.round((temps_niveau/60))+"seconde. Passage au niveau "+(niveau+1)+"!");
			temps_niveau=0;
			if(pe==true) fullscreen(); 
			niveau++;
			var smiley_sprite;
			smiley_sprite=createSprite(random(81,719),random(21,579));
			smiley_sprite.addImage(img_smiley_blood);
			smiley_sprite.setVelocity(random(-3,3),random(-3,3));
			smiley_sprite.setCollider("circle",0,0,20);
			group_smiley.add(smiley_sprite);
			bouge=false;
			spr.changeImage("stop");
			spr.rotateToDirection=false;
			spr.rotation=0;
			spr.position.x = 25;
			spr.position.y = 300;
			
			lance=false;
			imo==true;
			homeposition();
			clearTimeout(etoileTimeout);
			clearTimeout(imobileTimeout);
			wall_lance.position.x=-3;
			imobile=5;
			viretout();
			if(speed<1){speed=1;
			}
			spr.position.x = 25;
			spr.position.y = 300;
			click=true;
		}
	}
	
	
    background(fond);
	noStroke();
	fill(0,255,0,100);
	rect(0,0,60,600);
	rect(740,0,60,600);
	fill(255);
	rect(0,600,800,400);
    if(bouge==true) {
		if(Math.sqrt(Math.pow(spr.position.x-mouseX/camera.zoom,2)+Math.pow(spr.position.y-mouseY/camera.zoom,2))>6){
			spr.attractionPoint(0.5, mouseX/camera.zoom, mouseY/camera.zoom); 
			
			if(spr.position.x-mouseX/camera.zoom>=0) spr.changeImage("move_2");
			else spr.changeImage("move_1");
			spr.rotateToDirection=true;
			clearTimeout(imobileTimeout);
			imobile=5;
			imo=true;
		}
		else{spr.changeImage("stop");
		spr.rotateToDirection=false;
		spr.rotation=0;}
		if(imo==true){imobileTimeout=setTimeout(imobileTime,500);imo=false;}
		seconde++;
		temps_niveau++;
		}
	
	if(imobile<=0){
			click=false;
			bouge=false;
			alert("Tu va recommencer le niveau "+niveau+"! Tu es resté au même endroit sans bouger pendent plus de 5 s!");
			if(pe==true) fullscreen(); 
			speed-=1;
			spr.changeImage("stop");
			spr.rotateToDirection=false;
			spr.rotation=0;
			spr.position.x = 25;
			spr.position.y = 300;
			lance=false;
			imo==true;
			clearTimeout(etoileTimeout);
			clearTimeout(imobileTimeout);
			homeposition();
			imobile=5;
			wall_lance.position.x=-3;
			mort++;
			if(speed<1)speed=1;
			viretout();
			spr.position.x = 25;
			spr.position.y = 300;
			click=true;
	}
    group_smiley.bounce(wall_g);
    group_smiley.bounce(wall_d);
    group_smiley.bounce(wall_b);
    group_smiley.bounce(wall_h);
	group_smiley.bounce(group_home);

	group_smiley.bounce(group_smiley);
	spr.collide(wall_spr_g);
	spr.collide(wall_lance);
    spr.collide(wall_b);
    spr.collide(wall_h);
	if(speed<10){spr.overlap(etoiles,viret);
	}
    drawSprites();
	i=Math.round(imobile*100)/100;
	p=(Math.round(speed*100)/100);
}
function mousePressed() {
if(click==true && mouseIsPressed && mouseX/camera.zoom>=0 && mouseX/camera.zoom<=800 && mouseY/camera.zoom>=0 && mouseY/camera.zoom<=600){bouge=true;
	}
}