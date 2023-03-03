function preload() {
    img_cip=loadImage("image/pic.png");
}
function cree_mur(a,b){
	mur = createSprite(a,b+13,50,25);
	mur.immovable=true;
	mur.velocity.x=-7;
	mur.shapeColor = color(255,135,45);
	murs.add(mur);
	nbm++
	cree_sol(a,b,50,25);
}
function cree_sol(a,b,c,d){
	sol = createSprite(a,b-12,50,25);
	sol.immovable=true;
	sol.velocity.x=-7;
	sol.shapeColor = color(109,34,27);
	sols.add(sol);
	nbs++
}
function cree_pic(a,b){
	pic = createSprite(a,b);
	pic.addImage(img_cip);
	pic.immovable=true;
	pic.velocity.x=-7;
	pics.add(pic);
	nbp++	
}

function mur_pic(){
	np=Math.floor(random(0,2));
	if(1==Math.floor(random(1,3)))
	{
		for(i=1600;i<1750;i=i+50)
		{
			cree_mur(i,525);
		}
	}
	else
	{
		for(i=1600;i<1750;i=i+50)
		{
			cree_pic(i,530);
		}
	}
	if(1==Math.floor(random(1,3)))
	{
		for(i=1900;i<2050;i=i+50)
		{
			cree_mur(i,525);
		}
	}
	else
	{
		for(i=1900;i<2050;i=i+50)
		{
			cree_pic(i,530);
		}
	}
	if(0<np)
	{
		if(1==Math.floor(random(1,3)))
		{
			for(i=2200;i<2350;i=i+50)
			{
				cree_mur(i,525);
			}
		}
		else
		{
			for(i=2200;i<2350;i=i+50)
			{
				cree_pic(i,530);
			}
		}
	}
	if(1<np)
	{
		if(1==Math.floor(random(1,3)))
		{
			for(i=2500;i<2650;i=i+50)
			{
				cree_mur(i,525);
			}
		}
		else
		{
			for(i=2500;i<2650;i=i+50)
			{
				cree_pic(i,530);
			}
		}
	}

}
function pic1_mur3(){
	for(i=1500;i<1950;i=i+50){cree_mur(i,525);}
	for(i=1650;i<1800;i=i+50){cree_pic(i,480);}	
}
function pic1_mur4(){
	for(i=1500;i<2100;i=i+50)
	{
		cree_mur(i,525);
	}
	for(i=1650;i<1800;i=i+50)
	{
		cree_pic(i,480);
	}	
	for(i=1800;i<2100;i=i+50)
	{
		cree_mur(i,475);
	}
	for(i=1950;i<2100;i=i+50)
	{
		cree_pic(i,430);
	}
}
function monter(){
	cree_mur(1600,525);
	cree_mur(1870,475);
	cree_mur(2140,425);
	cree_mur(2410,375);
	for(i=1650;i<2450;i=i+50)
	{
		cree_pic(i,530);
	}
	if(1<random(0,2))
	{
		cree_mur(2680,325);
		cree_pic(2680,280);
	}
}
function petit_passage(){
	cree_mur(1500,525);
	cree_mur(1500,475);
	cree_pic(1500,430);
	cree_mur(1500,225);
	cree_mur(1500,175);	
	cree_mur(1500,125);
	cree_mur(1500,75);
	cree_mur(1500,25);
	
	cree_mur(1850,525);
	cree_mur(1850,475);
	cree_pic(1850,430);
	cree_mur(1850,225);
	cree_mur(1850,175);	
	cree_mur(1850,125);
	cree_mur(1850,75);
	cree_mur(1850,25);
}

function hasard(){
	var hsrd=Math.floor(random(1,9));
	// var hsrd=9;
	if(1==hsrd || 2==hsrd)
	{
		mur_pic();
	}
	else
	{
		if(3==hsrd || 4==hsrd)
		{
			pic1_mur3();
		}
		else
		{
			if(5==hsrd || 6==hsrd){
				pic1_mur4();
			}
			else
			{
				if(7==hsrd)
				{
					monter();
				}
				else
				{
					petit_passage()
				}
			}
		}
	}
}
function setup() {
	wid=window.innerHeight;
	createCanvas(window.innerWidth, window.innerHeight);
	initwidth=1350;
	initheight=580;
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
	camera.zoom = window.innerHeight/initheight;
	camera.position.x=initwidth/2;
	camera.position.y=initheight/2;
  
	pics=new Group();
	sols=new Group();
	murs=new Group();

	JUMP=-20;
	verif=0;
	joue=true;
	remove_bloc = createSprite(-70,initheight/2,30,initheight);
	remove_bloc.shapeColor = color(109,34,27);
	
	terrin = createSprite(initwidth/2,565,initwidth,30);
	terrin.shapeColor = color(109,34,27);
	spr = createSprite(325,525,50,50);
	spr.shapeColor = color(0,0,255);
	spr.velocity.x=0;
	spr.velocity.y=0;
	nbp=0;
	nbm=0;
	nbs=0;
	vitesse=1;
	for(i=700;i<850;i=i+50)
	{
		cree_pic(i,530);
	}
	for(i=1000;i<1150;i=i+50)
	{
		cree_mur(i,525);
	}
	for(i=1500;i<1650;i=i+50)
	{
		cree_mur(i,525);
	}
	for(i=25;i<550;i=i+50)
	{
		cree_mur(25,i);
	}
	for(i=25;i<550;i=i+50)
	{
		cree_mur(75,i);
	}
	for(i=25;i<550;i=i+50)
	{
		cree_mur(125,i);
	}
	for(i=25;i<550;i=i+50)
	{
		cree_mur(175,i);
	}
	for(i=25;i<550;i=i+50)
	{
		cree_mur(225,i);
	}
	for(i=25;i<550;i=i+50)
	{
		cree_mur(275,i);
	}
}
function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
	camera.zoom = window.innerHeight/initheight;
}
function draw() {
	if(spr.collide(murs))
	{
		perdu();
	}
	if(spr.position.x>338 || spr.position.x<338)
		spr.position.x=338;
	verif=0;
	for(z=nbp-1;z>-1;z--)
	{
		if(pics[z].position.x>1150)
		{
			verif++
		}
	}
	for(z=nbm-1;z>-1;z--){
	if(murs[z].position.x>1150){verif++}
	}
	if(verif==0){hasard();}
 background(200,0,100);
 spr.velocity.y+=1;
 if(spr.collide(sols)){
	 spr.velocity.y=3;spr.position.y+=1;
	 if(keyIsDown(32) && joue==true){//keyWentDown("space")
		 spr.velocity.y = JUMP;
	 }
	}
 if(spr.collide(terrin)){
	 spr.velocity.y=3;spr.position.y+=1;
	 if(keyIsDown(32) && joue==true){//keyWentDown("space")
		 spr.velocity.y = JUMP;
	 }
	}
	if(joue==false){sangs.collide(terrin);sangs.collide(sols);sangs.collide(sangs);sangs.collide(murs);}
	spr.overlap(pics,spr_pic);
    drawSprites();
	remove_bloc.overlap(pics,remove_pics);
	remove_bloc.overlap(sols,remove_sols);
	remove_bloc.overlap(murs,remove_murs);
}


function mousePressed() {
}
function  remove_pics(re,de){
	de.remove();
	nbp--;
}
function  remove_sols(re,de){
	de.remove();
	nbs--;
}
function  remove_murs(re,de){
	de.remove();
	nbm--;
}
function perdu(){
	for(p=nbp-1;p>-1;p--){
	pics[p].velocity.x=0
	}
	for(m=nbm-1;m>-1;m--){
	murs[m].velocity.x=0
	}
	for(s=nbs-1;s>-1;s--){
	sols[s].velocity.x=0
	}
	sangs=new Group()
	
	
	for(y=0;y<3;y+=1){	
		for(k=-15;k<15;k+=1){
			sang = createSprite(spr.position.x+k*15,spr.position.y-4*y-20,17,4);
			sang.shapeColor = color(255,0,0);
			sang.velocity.y=5;
			sangs.add(sang);	
		}
	}

	spr.remove();
	joue=false;
}
function spr_pic(spr,p){
	if(Math.sqrt(Math.pow((spr.position.x-p.position.x),2)+Math.pow((spr.position.y-p.position.y),2))<45){
		perdu();
		
	}
}