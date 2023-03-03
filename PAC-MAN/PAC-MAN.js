var mur,murs,spr,sprx,spry;
var fantome,fantomes,JAUNEimg,BLEUimg,ROUGEimg,ROSEJimg;
var coin;
var clik;
var nourriture;
var fan0y,fan1y,fan2y,fan3y;
var fan0x,fan1x,fan2x,fan3x;
var spx,spy;
var vitesse;
var viespr;
function preload() {
    sprimg=loadImage("image/spr.png");
	sprimg_bleu=loadImage("image/spr_bleu.png");
	vieimg=loadImage("image/vieimg.png");
    JAUNEimg=loadImage("image/jaune.png");
	BLEUimg=loadImage("image/bleu.png");
	ROUGEimg=loadImage("image/rouge.png");
	ROSEJimg=loadImage("image/rose.png");
	fond=loadImage("image/fond2.png");
	nom=loadImage("image/nom.png");
	geant=loadImage("image/sprgeant.png");
	h_img=loadImage("image/h.png");
	b_img=loadImage("image/b.png");
	d_img=loadImage("image/d.png");
	g_img=loadImage("image/g.png");
}

function murcree(a,b,c,d) {
	mur = createSprite(a, b, c,d);
	mur.shapeColor = color(51,134,255,0);
	murs.add(mur);
}

function nour(a,b) {
	nourriture = createSprite(a, b, 10,10);
	nourriture.shapeColor = color(255,255,0);
	nourritures.add(nourriture);
	
	nourriture = createSprite(initwidth-a, b, 10,10);
	nourriture.shapeColor = color(255,255,0);
	nourritures.add(nourriture);
	nombre+=2;
}
function CoinsHautDroitEtGauche(a,b,c,d){
	coin = createSprite(a, b, c,d);
	coin.shapeColor = color(255,0,0,trans);
	coins_haut_droit.add(coin);
	
	coin = createSprite(initwidth-a, b, c,d);
	coin.shapeColor = color(0,255,0,trans);
	coins_haut_gauche.add(coin);
	nour(a,b);
}
function CoinsBasDroitEtGauche(a,b,c,d){
	coin = createSprite(a, b, c,d);
	coin.shapeColor = color(255,255,0,trans);
	coins_bas_gauche.add(coin);
	
	coin = createSprite(initwidth-a, b, c,d);
	coin.shapeColor = color(0,255,255,trans);
	coins_bas_droit.add(coin);
	nour(a,b);
}
function to(a,b,c,d){
	coin = createSprite(a, b, c,d);
	coin.shapeColor = color(255,255,255,trans);
	Tous.add(coin);
	
	coin = createSprite(initwidth-a, b, c,d);
	coin.shapeColor = color(255,255,255,trans);
	Tous.add(coin);
	nour(a,b);
}
function pb(a,b,c,d){
	coin = createSprite(a, b, c,d);
	coin.shapeColor = color(248,46,147,trans);
	pas_bas.add(coin);
	
	coin = createSprite(initwidth-a, b, c,d);
	coin.shapeColor = color(248,46,147,trans);
	pas_bas.add(coin);
	nour(a,b);
}
function ph(a,b,c,d){
	coin = createSprite(a, b, c,d);
	coin.shapeColor = color(0,0,255,trans);
	pas_haut.add(coin);
	
	coin = createSprite(initwidth-a, b, c,d);
	coin.shapeColor = color(0,0,255,trans);
	pas_haut.add(coin);
	nour(a,b);
}
function pdetpg(a,b,c,d){
	coin = createSprite(a, b, c,d);
	coin.shapeColor = color(128,128,128,trans);
	pas_gauche.add(coin);
	
	coin = createSprite(initwidth-a, b, c,d);
	coin.shapeColor = color(150,0,150,trans);
	pas_droi.add(coin);
	nour(a,b);
}
function bon(a,b){
	coin = createSprite(a, b,25,25);
	coin.shapeColor = color(0,0,255);
	bonus.add(coin);
	coin = createSprite(initwidth-a, b, 25,25);
	coin.shapeColor = color(0,0,255);
	bonus.add(coin);
}
function windowResized() {
	hei=window.innerHeight;
	wih=window.innerHeight-window.innerHeight/10;
	resizeCanvas(wih, hei);
	canvas.position((window.innerWidth-(window.innerHeight-window.innerHeight/10))/2,0);
	camera.zoom = hei/(initheight);
}
function setup() {
	murs=new Group();
	fantomes=new Group();
	regle=false;
	clik="";
	bonustemps=0;
	restart=false;
	coins_haut_droit=new Group();
	coins_haut_gauche=new Group();
	coins_bas_droit=new Group();
	coins_bas_gauche=new Group();
	Tous=new Group();
	pas_bas=new Group();
	pas_haut=new Group();
	pas_gauche=new Group();
	pas_droi=new Group();
	abscisse=new Group();
	ordonne=new Group();
	nourritures=new Group();
	vies=new Group();
	bonus=new Group();
	jouer=true;
	scores=0;
	trans=0;
	nombre=0;
	niveau=1;
	vitesse=2.5;
	gagnier=true;
	go=true;
	pr=false;
	Cparti=false;
	
	hei=window.innerHeight;
	wih=window.innerHeight-window.innerHeight/10;
	canvas =createCanvas(wih, hei);
	canvas.position((window.innerWidth-(window.innerHeight-window.innerHeight/10))/2,0);
	initheight=900;
	initwidth=800;
	camera.on = function()
	{
		if(!camera.active)
		{
			cameraPush.call(pInst);
			camera.active = true;
			camera.zoom = zoom;
			camera.mouseX = pInst.mouseX;
			camera.mouseY = pInst.mouseY;
			camera.position = pInst.createVector(x, y);
		}
	};
	camera.zoom = hei/(initheight);
	camera.position.x=initwidth/2;
	camera.position.y=initheight/2;
	pause=false;
	spr = createSprite(initwidth/2, 395);
	spr.addImage("spr",sprimg);
	spr.addImage("spr_bleu",sprimg_bleu);;
	spr.setCollider ("circle",0,0,25);
	spr.rotation=180;
	spr.shapeColor = color(141,245,24);

	fantome = createSprite(40,40);
	fantome.addImage(JAUNEimg);
	fantomes.add(fantome);
	
	o_j = createSprite(40,40);
	o_j.addImage("h",h_img);
	o_j.addImage("b",b_img);
	o_j.addImage("d",d_img);
	o_j.addImage("g",g_img);
	
	fantome = createSprite(40,800);
	fantome.addImage(BLEUimg);
	fantomes.add(fantome);
	
	o_b = createSprite(40,800);
	o_b.addImage("h",h_img);
	o_b.addImage("b",b_img);
	o_b.addImage("d",d_img);
	o_b.addImage("g",g_img);
	
	fantome = createSprite(initwidth-40,40);
	fantome.addImage(ROUGEimg);
	fantomes.add(fantome);
	
	o_rouge = createSprite(initwidth-40,40);
	o_rouge.addImage("h",h_img);
	o_rouge.addImage("b",b_img);
	o_rouge.addImage("d",d_img);
	o_rouge.addImage("g",g_img);
	
	fantome = createSprite(initwidth-40,800);
	fantome.addImage(ROSEJimg);
	fantomes.add(fantome);
	
	o_rose = createSprite(initwidth-40,800);
	o_rose.addImage("h",h_img);
	o_rose.addImage("b",b_img);
	o_rose.addImage("d",d_img);
	o_rose.addImage("g",g_img);
	
	viespr = createSprite(40,initheight-33);
	viespr.addImage(vieimg);
	viespr.rotation=180;
	vies.add(viespr);
	viespr = createSprite(100,initheight-33);
	viespr.addImage(vieimg);
	viespr.rotation=180;
	vies.add(viespr);
	
	sprv=3;
	sprx=0;
	spry=0;
	vie=2;
	murcree(initwidth/2,5,initwidth,10);
	murcree(initwidth/2,initheight-35,initwidth,70);
	murcree(5,initheight/5.7+5,10,initwidth/2+2);
	murcree(5,initheight-initheight/3.7+6,10,initwidth/1.7);
	murcree(initwidth-5,initheight/5.7+5,10,initwidth/2+2);
	murcree(initwidth-5,initheight-initheight/3.7+6,10,initwidth/1.7);
	murcree(110,100,80,50);
	murcree(initwidth-110,100,80,50);
	murcree(270,100,100,50);
	murcree(initwidth-270,100,100,50);
	murcree(110,200,80,25);
	murcree(initwidth-110,200,80,25);
	murcree(initwidth/2,60,20,125);
	murcree(initwidth/2,235,20,90);
	murcree(initwidth/2,200,185,25);
	murcree(225,275,20,170);
	murcree(initwidth-225,275,20,170);
	murcree(265,275,100,20);
	murcree(initwidth-265,275,100,20);
	murcree(80,316,145,95);
	murcree(initwidth-80,316,145,95);
	murcree(80,initheight-425,145,95);
	murcree(initwidth-80,initheight-425,145,95);
	murcree(225,initheight-425,20,95);
	murcree(initwidth-225,initheight-425,20,95);
	murcree(initwidth/2,510,185,25);
	murcree(initwidth/2,553,20,100);
	murcree(initwidth/2,680,185,25);
	murcree(initwidth/2,723,20,100);
	murcree(265,initheight-400+95,100,20);
	murcree(initwidth-265,initheight-400+95,100,20);
	murcree(initwidth/4,762,240,20);
	murcree(initwidth-initwidth/4,762,240,20);
	murcree(initwidth/3.5-3,717,20,100);
	murcree(initwidth-initwidth/3.5+3,717,20,100);
	murcree(35,680,80,25);
	murcree(initwidth-35,680,80,25);
	murcree(144,640,20,108);
	murcree(initwidth-144,640,20,108);
	murcree(110,596,80,20);
	murcree(initwidth-110,596,80,20);

	CoinsHautDroitEtGauche(760,40,40,40);
	CoinsHautDroitEtGauche(355,40,40,40);
	CoinsHautDroitEtGauche(355,240,40,40);
	CoinsHautDroitEtGauche(530,320,40,40);
	CoinsHautDroitEtGauche(355,555,40,40);
	CoinsHautDroitEtGauche(355,725,40,40);
	CoinsHautDroitEtGauche(760,725,40,40);
	CoinsHautDroitEtGauche(760,555,40,40);
	CoinsHautDroitEtGauche(105,635,40,40);
	
	CoinsBasDroitEtGauche(40,800,40,40);
	CoinsBasDroitEtGauche(40,635,40,40);
	CoinsBasDroitEtGauche(270,725,40,40);
	CoinsBasDroitEtGauche(615,725,40,40);
	CoinsBasDroitEtGauche(40,240,40,40);
	CoinsBasDroitEtGauche(270,240,40,40);
	
	to(185,155,40,40);
	to(185,395,40,40);
	to(185,555,40,40);
	to(270,395,40,40);
	to(355,395,40,40);
	to(355,320,40,40);
	
	pb(355,800,40,40);
	pb(355,635,40,40);
	pb(355,460,40,40);
	pb(355,155,40,40);
	pb(270,555,40,40);
	pb(105,725,40,40);
	
	ph(270,635,40,40);
	ph(185,40,40,40);
	ph(270,155,40,40);
	
	pdetpg(40,155,40,40);
	pdetpg(270,460,40,40);
	pdetpg(615,240,40,40);
	pdetpg(185,635,40,40);
	
	nour(40,100);
	nour(185,100);
	nour(355,100);
	nour(110,40);
	nour(110,155);
	nour(110,240);
	nour(270,40);
	nour(185,320);
	nour(185,460);
	nour(185,800);
	nour(105,800);
	nour(270,800);
	nour(105,555);
	bon(40,555);
	bon(40,240);
	nourritures[14].remove();
	nourritures[14].remove();
	nourritures[24].remove();
	nourritures[24].remove();
	setInterval(bonus_temps,1000);
	setInterval(anim,300);
}
function draw() {
	o_j.position.x=fantomes[0].position.x;
	o_j.position.y=fantomes[0].position.y;
	
	o_b.position.x=fantomes[1].position.x;
	o_b.position.y=fantomes[1].position.y;
	
	o_rouge.position.x=fantomes[2].position.x;
	o_rouge.position.y=fantomes[2].position.y;
	
	o_rose.position.x=fantomes[3].position.x;
	o_rose.position.y=fantomes[3].position.y;
	
	if(fantomes[0].velocity.x==-vitesse){o_j.changeImage("d");}
	if(fantomes[0].velocity.x==vitesse){o_j.changeImage("g");}
	if(fantomes[0].velocity.y==-vitesse){o_j.changeImage("h");}
	if(fantomes[0].velocity.y==vitesse){o_j.changeImage("b");}
	
	if(fantomes[1].velocity.x==-vitesse){o_b.changeImage("d");}
	if(fantomes[1].velocity.x==vitesse){o_b.changeImage("g");}
	if(fantomes[1].velocity.y==-vitesse){o_b.changeImage("h");}
	if(fantomes[1].velocity.y==vitesse){o_b.changeImage("b");}
	
	if(fantomes[2].velocity.x==-vitesse){o_rouge.changeImage("d");}
	if(fantomes[2].velocity.x==vitesse){o_rouge.changeImage("g");}
	if(fantomes[2].velocity.y==-vitesse){o_rouge.changeImage("h");}
	if(fantomes[2].velocity.y==vitesse){o_rouge.changeImage("b");}
	
	if(fantomes[3].velocity.x==-vitesse){o_rose.changeImage("d");}
	if(fantomes[3].velocity.x==vitesse){o_rose.changeImage("g");}
	if(fantomes[3].velocity.y==-vitesse){o_rose.changeImage("h");}
	if(fantomes[3].velocity.y==vitesse){o_rose.changeImage("b");}
	
	for(z=3;z>-1;z--)
	{
		if(fantomes[z].position.x<-21)
			fantomes[z].position.x=820;
		if(fantomes[z].position.x>821)
			fantomes[z].position.x=-20;
	}
	if(spr.position.x<-21)
		spr.position.x=820;
	if(spr.position.x>821)
		spr.position.x=-20;
	fill(0,0,255);
	rect(-100,-100,1000,1100);
	image(fond, 0, 0);
	spr.position.x+=sprx;
	spr.position.y+=spry;
	spr.collide(murs);
    drawSprites();
	if(pause==false)
	{
		fantomes.overlap(coins_haut_droit,bouge_haut_droit);
		fantomes.overlap(coins_bas_droit,bouge_bas_droit);
		fantomes.overlap(coins_haut_gauche,bouge_haut_gauche);
		fantomes.overlap(coins_bas_gauche,bouge_bas_gauche);
		fantomes.overlap(Tous,bouge_tous);
		fantomes.overlap(pas_bas,bouge_pas_bas);
		fantomes.overlap(pas_haut,bouge_pas_haut);
		fantomes.overlap(pas_droi,bouge_pas_droit);
		fantomes.overlap(pas_gauche,bouge_pas_gauche);
		spr.overlap(coins_haut_droit,spr_haut_droit);
		spr.overlap(coins_bas_droit,spr_bas_droit);
		spr.overlap(coins_haut_gauche,spr_haut_gauche);
		spr.overlap(coins_bas_gauche,spr_bas_gauche);
		spr.overlap(Tous,spr_tous);
		spr.overlap(pas_bas,spr_pas_bas);
		spr.overlap(pas_haut,spr_pas_haut);
		spr.overlap(pas_droi,spr_pas_droit);
		spr.overlap(pas_gauche,spr_pas_gauche);
		//spr.overlap(ordonne,spr_ordonne);
		//spr.overlap(abscisse,spr_abscisse);
		spr.overlap(nourritures,spr_nour);
		spr.overlap(bonus,spr_bonus);
		spr.overlap(fantomes,perdu);
		stroke(255,0,0);
	}
	else
	{ 
		noStroke();
		fill(65,65,65,150);
		rect(0,0,800,900);
		fill(255,255,255,125);
		rect(325,345,50,200);
		rect(425,345,50,200);}

	if(pr==true)
	{
		noStroke();
		fill(255,0,0,128);
		rect(0,0,800,900);
		textAlign(CENTER,CENTER);
		textStyle(BOLD);
		fill(0);
		textSize(49);
		text("Game Over !",400,395);
		textStyle(NORMAL);
		fill(128);
		textSize(50);
		text("Game Over !",400,395);
  }
	if(mouseX>wih/2-wih/8 && mouseX<wih/2+wih/8 && mouseY>hei/2+hei/9 && mouseY<hei/2+hei/6 && restart==true)
	{
		stroke(0); 
		noFill();
		strokeWeight(4);
		rect(initwidth/2-95,555,190,40);
		noStroke();
		fill(255);
		rect(initwidth/2-95,555,190,40);
		textAlign(CENTER,CENTER);
		textStyle(BOLD);
		fill(0);
		textSize(40);
		text("Rejouer",400,575);
		if (mouseIsPressed)
		{
			parent.document.location.reload();
		}
	}
	else
	{
		if(restart==true)
		{
			stroke(0);
			noFill();
			strokeWeight(4);
			rect(initwidth/2-100,550,200,50);
			noStroke();
			fill(255);
			rect(initwidth/2-100,550,200,50);
			textAlign(CENTER,CENTER);
			textStyle(BOLD);
			fill(0);
			textSize(49);
			text("Rejouer",400,575);
		}
	}
	if(gagnier==true && nombre==0)
	{
		gagnier=false;
		niveau++;
		bonustemps=0;
		vitesse+=0.2;
		spr.rotation=180;
		clik="";
		spr.position.x=initwidth/2;
		spr.position.y=395;
		sprx=0;
		spry=0;
		fantomes[0].position.x=40;fantomes[0].position.y=40;
		fantomes[1].position.x=40;fantomes[1].position.y=800;
		fantomes[2].position.x=760;fantomes[2].position.y=40;
		fantomes[3].position.x=760;fantomes[3].position.y=800;
		fantomes[0].velocity.x=0;fantomes[0].velocity.y=0;
		fantomes[1].velocity.x=0;fantomes[1].velocity.y=0;
		fantomes[2].velocity.x=0;fantomes[2].velocity.y=0;
		fantomes[3].velocity.x=0;fantomes[3].velocity.y=0;
		Cparti=true;cree_nour();
	}
	stroke(0,25,255);
	fill(0);
	strokeWeight(8);
	textAlign(RIGHT,CENTER);//LEFT
	textStyle(BOLD);
	textSize(35);
	text("niveau : "+niveau,770,870);
	textAlign(CENTER,CENTER);
	text("scores : "+scores,400,870);
	if(bonustemps>3)
	{
		spr.changeImage("spr_bleu");
	}
	else if(bonustemps==0)
	{
		spr.changeImage("spr");
	}
	if(jouer==true)
	{
		fill(0)
		rect(0,0,800,900);
		image(geant, 5, 50);
		image(nom, 5, 20);
		if(mouseX>wih/2-wih/8 && mouseX<wih/2+wih/8 && mouseY>hei/2 && mouseY<hei/2+hei/18)
		{
			stroke(0); 
			noFill();
			strokeWeight(4);
			rect(initwidth/2-95,455,190,40);
			noStroke();
			fill(255);
			rect(initwidth/2-95,455,190,40);
			textAlign(CENTER,CENTER);
			textStyle(BOLD);
			fill(0);
			textSize(40);
			text("jouer",400,475);
			if(mouseIsPressed)
			{
				jouer=false;
				Cparti=true;
				regle=false;
			}
		}
		else
		{
			stroke(0);
			noFill();
			strokeWeight(4);
			rect(initwidth/2-100,450,200,50);
			noStroke();
			fill(255);
			rect(initwidth/2-100,450,200,50);
			textAlign(CENTER,CENTER);
			textStyle(BOLD);
			fill(0);
			textSize(49);
			text("jouer",400,475);
		}
	}
	if(mouseX>wih/2-wih/8 && mouseX<wih/2+wih/8 && mouseY>hei/2+hei/9 && mouseY<hei/2+hei/6 && pause==true)
	{
		stroke(0); 
		noFill();
		strokeWeight(4);
		rect(initwidth/2-95,555,190,40);
		noStroke();
		fill(255);
		rect(initwidth/2-95,555,190,40);
		textAlign(CENTER,CENTER);
		textStyle(BOLD);
		fill(0);
		textSize(40);
		text("Règles",400,575);
	}
    else
	{
		if(pause==true)
		{
			stroke(0);
			noFill();
			strokeWeight(4);
			rect(initwidth/2-100,550,200,50);
			noStroke();
			fill(255);
			rect(initwidth/2-100,550,200,50);
			textAlign(CENTER,CENTER);
			textStyle(BOLD);
			fill(0);
			textSize(49);
			text("Règles",400,575);
		}
	}
    if(regle==true || jouer==true)
	{
		fill(255);
		textAlign(LEFT,CENTER);
		textStyle(NORMAL);
		textSize(40);
		text("La touche p = pause!",15,initheight-95);
		text("La touche Entrer = start!",15,initheight-175);
		text("les flèches = bouger votre bonhomme!",15,initheight-135);
		text("Le but = manger toutes les pastilles ",15,initheight-215);
	}
}


function anim(){
	if(bonustemps>0 && bonustemps<4)
	{
		spr.changeImage("spr");
		setTimeout(anim2,100)
	}
}
function anim2(){
	if(bonustemps>0 && bonustemps<4)
	{
		spr.changeImage("spr_bleu");
	}
}

function  cree_nour()
{
	nour(760,40);
	nour(355,40);
	nour(355,240);
	nour(530,320);
	nour(355,555);
	nour(355,725);
	nour(760,725);
	nour(760,555);
	nour(105,635);
	
	nour(40,800);
	nour(40,635);
	nour(270,725);
	nour(615,725);
	nour(40,240);
	nour(270,240);
	
	nour(185,155);
	nour(185,395);
	nour(185,555);
	nour(270,395);
	nour(355,395);
	nour(355,320);
	
	nour(355,800);
	nour(355,635);
	nour(355,460);
	nour(355,155);
	nour(270,555);
	nour(105,725);
	
	nour(270,635);
	nour(185,40);
	nour(270,155);
	
	nour(40,155);
	nour(270,460);
	nour(615,240);
	nour(185,635);
	
	nour(40,100);
	nour(185,100);
	nour(355,100);
	nour(110,40);
	nour(110,155);
	nour(110,240);
	nour(270,40);
	nour(185,320);
	nour(185,460);
	nour(185,800);
	nour(105,800);
	nour(270,800);
	nour(105,555);
	bon(40,555);
	bon(40,240);
	nourritures[14].remove();
	nourritures[14].remove();
	nourritures[24].remove();
	nourritures[24].remove();
}
function spr_nour(spr,no)
{
	
	no.remove();
	nombre--;
	scores+=50;
}
function bonus_temps()
{
	if(bonustemps>0)
	{
		bonustemps--;
	}
}
function spr_bonus(spr,no)
{
	no.remove();
	scores+=100;
	nombre--;
	bonustemps+=11;
}
function temps()
{
	if(Math.floor(random(0,2))==1)
	{
		fantomes[0].velocity.x=vitesse;
		fantomes[0].velocity.y=0;
	}
	else
	{
		fantomes[0].velocity.x=0;
		fantomes[0].velocity.y=vitesse;
	}
	if(Math.floor(random(0,2))==1)
	{
		fantomes[1].velocity.x=vitesse;
		fantomes[1].velocity.y=0;
	}
	else
	{
		fantomes[1].velocity.x=0;
		fantomes[1].velocity.y=-vitesse;
	}		
	if(Math.floor(random(0,2))==1)
	{
		fantomes[2].velocity.x=-vitesse;
		fantomes[2].velocity.y=0;
	}
	else
	{
		fantomes[2].velocity.x=0;
		fantomes[2].velocity.y=vitesse;
	}	
	if(Math.floor(random(0,2))==1)
	{
		fantomes[3].velocity.x=-vitesse;
		fantomes[3].velocity.y=0;
	}
	else
	{
		fantomes[3].velocity.x=0;
		fantomes[3].velocity.y=-vitesse;
	}
	sprx=-sprv;
	spry=0;
	go=true;
	clik="";
}
function perdu(spr,fan)
{
	if(bonustemps>0)
	{
		scores+=50;
		if(2>random(1,5))
		{
			fan.position.x=40;
			fan.position.y=40;
			if(Math.floor(random(0,2))==1)
			{
				fan.velocity.x=vitesse;
				fan.velocity.y=0;
			}
			else
			{
				fan.velocity.x=0;
				fan.velocity.y=vitesse;
			}
		}
		else
		{
			if(2>random(1,4))
			{
				fan.position.x=40;
				fan.position.y=800;
				if(Math.floor(random(0,2))==1)
				{
					fan.velocity.x=vitesse;
					fan.velocity.y=0;
				}
				else
				{
					fan.velocity.x=0;
					fan.velocity.y=-vitesse;
				}
			}
			else
			{
				if(2>random(1,3))
				{
					fan.position.x=760;
					fan.position.y=40;
					if(Math.floor(random(0,2))==1)
					{
						fan.velocity.x=-vitesse;
						fan.velocity.y=0;
					}
					else
					{
						fan.velocity.x=0;
						fan.velocity.y=vitesse;
					}
				}
				else
				{
					fan.position.x=760;
					fan.position.y=800;
					if(Math.floor(random(0,2))==1)
					{
						fan.velocity.x=-vitesse;
						fan.velocity.y=0;
					}
					else
					{
						fan.velocity.x=0;
						fan.velocity.y=-vitesse;
					}
				}
			}
		}
	}
	
	else
	{
		if(go==true)
		{
			go=false;
			if(vie==0)
			{
				rect(0,0,800,900);
				spr.rotation=180;
				clik="";
				spr.position.x=initwidth/2;
				spr.position.y=395;
				sprx=0;
				spry=0;
				fantomes[0].position.x=40;fantomes[0].position.y=40;
				fantomes[1].position.x=40;fantomes[1].position.y=800;
				fantomes[2].position.x=760;fantomes[2].position.y=40;
				fantomes[3].position.x=760;fantomes[3].position.y=800;
				fantomes[0].velocity.x=0;fantomes[0].velocity.y=0;
				fantomes[1].velocity.x=0;fantomes[1].velocity.y=0;
				fantomes[2].velocity.x=0;fantomes[2].velocity.y=0;
				fantomes[3].velocity.x=0;fantomes[3].velocity.y=0;
				pr=true;
				restart=true;
				Cparti=true;
		
			}
			else
			{
				vie-=1;
				vies[vie].remove();
				fill(255,0,0,128);
				rect(0,0,800,900);
				spr.rotation=180;
				clik="";
				spr.position.x=initwidth/2;
				spr.position.y=395;
				sprx=0;
				spry=0;
				fantomes[0].position.x=40;fantomes[0].position.y=40;
				fantomes[1].position.x=40;fantomes[1].position.y=800;
				fantomes[2].position.x=760;fantomes[2].position.y=40;
				fantomes[3].position.x=760;fantomes[3].position.y=800;
				fantomes[0].velocity.x=0;fantomes[0].velocity.y=0;
				fantomes[1].velocity.x=0;fantomes[1].velocity.y=0;
				fantomes[2].velocity.x=0;fantomes[2].velocity.y=0;
				fantomes[3].velocity.x=0;fantomes[3].velocity.y=0;
				Cparti=true
			}
		}
	}
}

function spr_haut_gauche(spr,bou){  
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv))
  {
    if(clik=="d")
	{
		sprx=sprv;
		spry=0;
		spr.position.y=bou.position.y;
		spr.rotation=0;
		clik=="";
	}
  }
if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="b"){spry=sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=90;clik=="";}
	
  }
}
function spr_haut_droit(spr,bou){
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="g"){sprx=-sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=180;clik=="";}
  }
if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="b"){spry=sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=90;clik=="";}
  }
}
function spr_bas_gauche(spr,bou){
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="d"){sprx=sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=0;clik=="";}
  }

if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="h"){spry=-sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=270;clik=="";}
  }
}
function spr_bas_droit(spr,bou){
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="g"){sprx=-sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=180;clik=="";}
  }
if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="h"){spry=-sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=270;clik=="";}
  }

}
function spr_pas_bas(spr,bou){
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="g"){sprx=-sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=180;clik=="";}
  }

  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="d"){sprx=sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=0;clik=="";}
  }

if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="h"){spry=-sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=270;clik=="";}
  }
}
function spr_pas_haut(spr,bou){
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="g"){sprx=-sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=180;clik=="";}
  }

  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="d"){sprx=sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=0;clik=="";}
  }
if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="b"){spry=sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=90;clik=="";}
	
  }
}
function spr_pas_droit(spr,bou){
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="g"){sprx=-sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=180;clik=="";}
  }
if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="h"){spry=-sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=270;clik=="";}
  }

if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="b"){spry=sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=90;clik=="";}
	
  }
}
function spr_pas_gauche(spr,bou){
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="d"){sprx=sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=0;clik=="";}
  }

if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="h"){spry=-sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=270;clik=="";}
  }

if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="b"){spry=sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=90;clik=="";}
	
  }
}
function spr_tous(spr,bou){
  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="g"){sprx=-sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=180;clik=="";}
  }

  if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.x==Math.abs(sprv)){
    if(clik=="d"){sprx=sprv;spry=0;spr.position.y=bou.position.y;spr.rotation=0;clik=="";}
  }

if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="h"){spry=-sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=270;clik=="";}
  }

if (18>Math.sqrt(Math.pow((spr.position.x-bou.position.x),2)+Math.pow((spr.position.y-bou.position.y),2)) || spr.velocity.y==Math.abs(sprv)){
    if(clik=="b"){spry=sprv;sprx=0;spr.position.x=bou.position.x;spr.rotation=90;clik=="";}
	
  }
}


function bouge_tous(fan,bou){
if(vitesse>Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))){
if(Math.floor(random(0,4))==1 && fan.velocity.x!=-vitesse){fan.velocity.x=vitesse;fan.velocity.y=0;fan.position.x=bou.position.x+vitesse;fan.position.y=bou.position.y;}
else {if(Math.floor(random(0,3))==1 && fan.velocity.x!=vitesse){fan.velocity.x=-vitesse;fan.velocity.y=0;fan.position.x=bou.position.x-vitesse;fan.position.y=bou.position.y;}
		else {if(Math.floor(random(0,2))==1 && fan.velocity.y!=-vitesse){fan.velocity.x=0;fan.velocity.y=vitesse;fan.position.x=bou.position.x;fan.position.y=bou.position.y+vitesse;}
			else{if(fan.velocity.y!=vitesse){fan.velocity.x=0;fan.velocity.y=-vitesse;fan.position.x=bou.position.x;fan.position.y=bou.position.y-vitesse}
				else{fan.position.x=bou.position.x;fan.position.y=bou.position.y}}
			}
		}
}
}
function bouge_pas_bas(fan,bou){
if(vitesse+1>Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))){
if(Math.floor(random(0,3))==1 && fan.velocity.x!=-vitesse){fan.velocity.x=vitesse;fan.velocity.y=0;fan.position.x=bou.position.x+vitesse;fan.position.y=bou.position.y;}
else {if(Math.floor(random(0,2))==1 && fan.velocity.x!=vitesse){fan.velocity.x=-vitesse;fan.velocity.y=0;fan.position.x=bou.position.x-vitesse;fan.position.y=bou.position.y;}
		else {if(fan.velocity.y!=vitesse){fan.velocity.x=0;fan.velocity.y=-vitesse;fan.position.x=bou.position.x;fan.position.y=bou.position.y-vitesse}
			else{fan.position.x=bou.position.x;fan.position.y=bou.position.y}}
		}
}
	
}
function bouge_pas_haut(fan,bou){
if(vitesse+1>Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))){
if(Math.floor(random(0,3))==1 && fan.velocity.x!=-vitesse){fan.velocity.x=vitesse;fan.velocity.y=0;fan.position.x=bou.position.x+vitesse;fan.position.y=bou.position.y;}
else {if(Math.floor(random(0,2))==1 && fan.velocity.x!=vitesse){fan.velocity.x=-vitesse;fan.velocity.y=0;fan.position.x=bou.position.x-vitesse;fan.position.y=bou.position.y;}
		else{if(fan.velocity.y!=-vitesse){fan.velocity.x=0;fan.velocity.y=vitesse;fan.position.x=bou.position.x;fan.position.y=bou.position.y+vitesse}
				else{fan.position.x=bou.position.x;fan.position.y=bou.position.y}}
			}
		}

	
}
function bouge_pas_droit(fan,bou){
if(vitesse>Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))){
if(Math.floor(random(0,3))==1 && fan.velocity.x!=vitesse){fan.velocity.x=-vitesse;fan.velocity.y=0;fan.position.x=bou.position.x-vitesse;fan.position.y=bou.position.y;}
		else {if(Math.floor(random(0,2))==1 && fan.velocity.y!=-vitesse){fan.velocity.x=0;fan.velocity.y=vitesse;fan.position.x=bou.position.x;fan.position.y=bou.position.y+vitesse;}
			else{if(fan.velocity.y!=vitesse){fan.velocity.x=0;fan.velocity.y=-vitesse;fan.position.x=bou.position.x;fan.position.y=bou.position.y-vitesse}
				else{fan.position.x=bou.position.x;fan.position.y=bou.position.y}}
			}
		}
	
}
function bouge_pas_gauche(fan,bou){
if(vitesse>Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))){
if(Math.floor(random(0,3))==1 && fan.velocity.x!=-vitesse){fan.velocity.x=vitesse;fan.velocity.y=0;fan.position.x=bou.position.x+vitesse;fan.position.y=bou.position.y;}
else {if(Math.floor(random(0,2))==1 && fan.velocity.y!=-vitesse){fan.velocity.x=0;fan.velocity.y=vitesse;fan.position.x=bou.position.x;fan.position.y=bou.position.y+vitesse;}
			else{if(fan.velocity.y!=vitesse){fan.velocity.x=0;fan.velocity.y=-vitesse;fan.position.x=bou.position.x;fan.position.y=bou.position.y-vitesse}
				else{fan.position.x=bou.position.x;fan.position.y=bou.position.y}}
			}
		}

	
}
function bouge_haut_droit(fan,bou){
	if(vitesse>Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))){	
	if(fan.velocity.y==-vitesse){
		fan.position.x=bou.position.x-vitesse;
		fan.position.y=bou.position.y;
		fan.velocity.y=0;
		fan.velocity.x=-vitesse;}
	else{if(fan.velocity.x==vitesse){
		fan.position.y=bou.position.y+vitesse;
		fan.position.x=bou.position.x;
		fan.velocity.y=vitesse;
		fan.velocity.x=0;}}

	}
	
}
function bouge_haut_gauche(fan,bou){
if(Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))<vitesse){	
	if(fan.velocity.y==-vitesse){
		fan.position.x=bou.position.x+vitesse;
		fan.position.y=bou.position.y;
		fan.velocity.y=0;
		fan.velocity.x=vitesse;}
	else{if(fan.velocity.x==-vitesse){
		fan.position.y=bou.position.y+vitesse;
		fan.position.x=bou.position.x;
		fan.velocity.y=vitesse;
		fan.velocity.x=0;}}

	}	
	
}
function bouge_bas_droit(fan,bou){
if(vitesse>Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))){	
	if(fan.velocity.y==vitesse){
		fan.position.x=bou.position.x-vitesse;
		fan.position.y=bou.position.y;
		fan.velocity.y=0;
		fan.velocity.x=-vitesse;}
	else{if(fan.velocity.x==vitesse){
		fan.position.y=bou.position.y-vitesse;
		fan.position.x=bou.position.x;
		fan.velocity.y=-vitesse;
		fan.velocity.x=0;}}

	}
	
}
function bouge_bas_gauche(fan,bou){

if(vitesse>Math.sqrt(Math.pow((fan.position.x-bou.position.x),2)+Math.pow((fan.position.y-bou.position.y),2))){	
	if(fan.velocity.y==vitesse){
		fan.position.x=bou.position.x+vitesse;
		fan.position.y=bou.position.y;
		fan.velocity.y=0;
		fan.velocity.x=vitesse;}
	else{if(fan.velocity.x==-vitesse){
		fan.position.y=bou.position.y-vitesse;
		fan.position.x=bou.position.x;
		fan.velocity.y=-vitesse;
		fan.velocity.x=0;}}

	}
	
}
function keyPressed() {

  if (keyCode ==13 && Cparti==true && pr!=true){Cparti=false;temps();gagnier=true}
  if (keyCode ==80 && Cparti==false){
	  if(pause==false){
		spx=sprx;spy=spry;
		fan0x=fantomes[0].velocity.x;fan0y=fantomes[0].velocity.y;
		fan1x=fantomes[1].velocity.x;fan1y=fantomes[1].velocity.y;
		fan2x=fantomes[2].velocity.x;fan2y=fantomes[2].velocity.y;
		fan3x=fantomes[3].velocity.x;fan3y=fantomes[3].velocity.y;
		fantomes[0].velocity.x=0;fantomes[0].velocity.y=0;
		fantomes[1].velocity.x=0;fantomes[1].velocity.y=0;
		fantomes[2].velocity.x=0;fantomes[2].velocity.y=0;
		fantomes[3].velocity.x=0;fantomes[3].velocity.y=0;
		sprx=0;
		spry=0;
		pause=true
	  }
  else{	  
	  fantomes[0].velocity.x=fan0x;fantomes[0].velocity.y=fan0y;
	  fantomes[1].velocity.x=fan1x;fantomes[1].velocity.y=fan1y;
	  fantomes[2].velocity.x=fan2x;fantomes[2].velocity.y=fan2y;
	  fantomes[3].velocity.x=fan3x;fantomes[3].velocity.y=fan3y;
	  sprx=spx;
	  spry=spy;
	  regle=false;
	  pause=false;}
  }
  
  if(pause==false){
  	 if (keyCode ==37) {
		if(sprx==sprv){clik="";sprx=-sprv;spr.rotation=180;}
		else{clik="g";}
  }
  if (keyCode ==39) {
		if(sprx==-sprv){clik="";sprx=sprv;spr.rotation=0;}
		else{clik="d";}
  }

  if (keyCode ==38) {
		if(spry==sprv){clik="";spry=-sprv;spr.rotation=270;}
		else{clik="h";}
  }

  if (keyCode ==40) {
		if(spry==-sprv){clik="";spry=sprv;spr.rotation=90;}
		else{clik="b";}
  }
  }
  if (keyCode ==13 && pause==true) {
	  if(regle==true){regle=false;}
	  else {regle=true;}
	}
}
function mousePressed() {
  if (mouseX>wih/2-wih/8 && mouseX<wih/2+wih/8 && mouseY>hei/2+hei/9 && mouseY<hei/2+hei/6 && pause==true) {
	  if(regle==true){regle=false;}
	  else {regle=true;}
	}
}