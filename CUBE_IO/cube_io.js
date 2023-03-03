if( typeof helper == 'undefined' ) {
  var helper = { } ;
}
helper.arr = {
         /**
     * Function to sort multidimensional array
     * 
     * param {array} [arr] Source array
     * param {array} [columns] List of columns to sort
     * param {array} [order_by] List of directions (ASC, DESC)
     * returns {array}
     */
    multisort: function(arr, columns, order_by) {
        if(typeof columns == 'undefined') {
            columns = []
            for(x=0;x<arr[0].length;x++) {
                columns.push(x);
            }
        }

        if(typeof order_by == 'undefined') {
            order_by = []
            for(x=0;x<arr[0].length;x++) {
                order_by.push('ASC');
            }
        }

        function multisort_recursive(a,b,columns,order_by,index) {  
            var direction = order_by[index] == 'DESC' ? 1 : 0;

            var is_numeric = !isNaN(a[columns[index]]-b[columns[index]]);

            var x = is_numeric ? a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? b[columns[index]] : b[columns[index]].toLowerCase();

            if(!is_numeric) {
                x = helper.string.to_ascii(a[columns[index]].toLowerCase(),-1),
                y = helper.string.to_ascii(b[columns[index]].toLowerCase(),-1);
            }

            if(x < y) {
                    return direction == 0 ? -1 : 1;
            }

            if(x == y)  {
                return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
            }

            return direction == 0 ? 1 : -1;
        }

        return arr.sort(function (a,b) {
            return multisort_recursive(a,b,columns,order_by,0);
        });
    }
}

function setup() {
angle=0;
canvas = createCanvas(window.innerWidth, window.innerHeight);
document.getElementById("scored").style.visibility='hidden';
document.getElementById('spectateur').style.visibility='hidden';
document.getElementById('numberm').style.visibility='hidden';
spectateur=false;
nourritures=new Group();
lesnoms= new Array;
hsrd=Math.round(random(0,5));
mult=2;
lesnoms= ['Goldford','Orangina','Volubal','Dwargard','Stelill','Drenwen','Kinwerth','Girthdard','Yestamai','Azrod','Lurggar','Balkhmog','Durbamog','Pepsi','Balkhgar','Bolog','Balkhnarb','Luzgar','Azog','Ognarb','Volgar','Vendetta','Brutality','Insidious','Mayhem','Lunatic','Reloaded','Mercified','MostHated','MostWanted','MostRated','Perfection','Judgement','Diagnosed','Memorize','Vengeance','iCrew','Needles','Neal','Whity','Anastasia','Nokes','Lips','Messiah','Clamps','Jantser','Righteous','Sawney','Audacious','Luciano','Escobar','Accardo','Safecrack','Cardiac','Phenomenal','Makaveli','Drizzy','Rozay','Shady','Clue','Killah','Thurnis','Skunk','Treyson','Heroina','Ketamine','Mystical','Luxury','Lustrous','Territory','Overdoze','Purified','Sadistik','Kyuubi','Zyklon','Abvolate','Agony','Artisteh','Givenchy','Deception','Depost','Dhezire','Diabolize','Distractious','GodLezz','Insanez','Revolt','Dramatikz','Voltaism','Anacrisis','Dvshing','Maddness','Hated','Elevate','Verszce','Acceptions','Genesis','Lightning','Nesta','Kratos','Jussein','Hussein','Anosis','Angelo','Ravage','Akihiro','Mystosa','Vorlox','Soap','Loki','Jay','Azerko','Tyga','Neko','Fantazy'];
jouer=false;
pafait=true;
temps=true;
pseudo=document.getElementById("pseudo").value;

  camera.on = function() {
    if(!camera.active)
    {
      cameraPush.call(pInst);
      camera.active = true;
	  camera.mouseX = pInst.mouseX;
	  camera.mouseY = pInst.mouseY;
    }
  };
  
murh = createSprite(0,-1500*2*mult-125,1500*4*mult+500,250);
murh.shapeColor = color(0,0,0);
murh.immovable=true;

murb = createSprite(0,1500*2*mult+125,1500*4*mult+500,250);
murb.shapeColor = color(0,0,0);
murb.immovable=true;

murd = createSprite(1500*2*mult+125,0,250,1500*4*mult+500);
murd.shapeColor = color(0,0,0);
murd.immovable=true;

murg = createSprite(-1500*2*mult-125,0,250,1500*4*mult+500);
murg.shapeColor = color(0,0,0);
murg.immovable=true;
spr = createSprite(1500*4*mult,1500*4*mult,250,250);
spr.shapeColor = color(0,0,0);
spr.velocity.x=0;
spr.velocity.y=0;
spr.immovable=false;
aleatoire = createSprite(-1500*4*mult,-1500*4*mult,250,250);
aleatoire.shapeColor = color(0,0,0,0);
aleatoire.velocity.x=0;
aleatoire.velocity.y=0;
aleatoire.immovable=false;
aleatoiren = createSprite(-1500*4*mult,-1500*4*mult,50,50);
aleatoiren.shapeColor = color(0,0,0,0);
aleatoiren.velocity.x=0;
aleatoiren.velocity.y=0;
aleatoiren.immovable=false;
n=new Array;
nom=new Array;
mechans=new Group();
nbm=0;
nbn=0;
mouve=50*(100/spr.width);
n[1]="";nom[1]=100;
n[2]="";nom[2]=100;
n[3]="";nom[3]=100;
n[4]="";nom[4]=100;
n[5]="";nom[5]=100;
if(mult==1){setInterval(cree_nour,400);}
if(mult==2){setInterval(cree_nour,50);}
if(mult==3){setInterval(cree_nour,50);}
if(mult==4){setInterval(cree_nour,50);}

cree_mechas();



}
function windowResized() {
	wid=window.innerHeight;
	resizeCanvas(window.innerWidth, window.innerHeight);
	camera.zoom = wid/(800);
}
function draw() {
background(255,255,255);
document.getElementById("mechnum").style.fontSize=(20/1050*height)+"px";

document.getElementById("score").style.fontSize=(30/1050*height)*2+"px";
	 document.getElementById("pseudo").style.fontSize=(30/1050*height)+"px";
	 document.getElementById("jouer").style.fontSize=(30/1050*height)*2+"px";
	 document.getElementById("spec").style.fontSize=(20/1050*height)*2+"px";
	 document.getElementById("bouton1").style.fontSize=(29/1050*height)+"px";
	 document.getElementById("bouton2").style.fontSize=(29/1050*height)+"px";
	for(m=0;m<nbm;m++){
		dist=3*(mechans[m].width/100)+1;
		if(mechans[m].width<1200){
		for(v=0;v<nbn;v++){
		deplacement=Math.sqrt(Math.pow(mechans[m].position.x-nourritures[v].position.x,2)+Math.pow(mechans[m].position.y-nourritures[v].position.y,2))-nourritures[v].width-mechans[m].width*2;
		if(deplacement<1.50*(mechans[m].width/100)){
				if(deplacement<dist){dist=deplacement;
				anglem=(Math.atan2((mechans[m].position.x-nourritures[v].position.x),-(mechans[m].position.y-nourritures[v].position.y)))*(180/Math.PI)+90;
				if(anglem<0)anglem+=360;
				mechans[m].setSpeed(50*(100/mechans[m].width),anglem);
		}}}}
		for(g=0;g<nbm;g++){
			rapp=Math.round(mechans[g].width/mechans[m].width*100)/100;
			deplacement=Math.sqrt(Math.pow(mechans[m].position.x-mechans[g].position.x,2)+Math.pow(mechans[m].position.y-mechans[g].position.y,2))-mechans[g].width-mechans[m].width*2;
		if(deplacement<1.25*(mechans[m].width/100)){
				
				if(rapp<0.97){
				if(m!=g){
				if(deplacement<dist){dist=deplacement;
				anglem=(Math.atan2((mechans[m].position.x-mechans[g].position.x),-(mechans[m].position.y-mechans[g].position.y)))*(180/Math.PI)+90;
				if(anglem<0)anglem+=360;
				mechans[m].setSpeed(50*(100/mechans[m].width),anglem); 
			}}}
		}}

		for(g=0;g<nbm;g++){
			rapp=Math.round(mechans[g].width/mechans[m].width*100)/100;
			deplacement=Math.sqrt(Math.pow(mechans[m].position.x-mechans[g].position.x,2)+Math.pow(mechans[m].position.y-mechans[g].position.y,2))-mechans[g].width-mechans[m].width*2;
		if(deplacement<2*(mechans[m].width/100)){
		
			if(rapp>1.03){
				if(m!=g){
				if(deplacement<dist){dist=deplacement;
				anglem=(Math.atan2((mechans[m].position.x-mechans[g].position.x),-(mechans[m].position.y-mechans[g].position.y)))*(180/Math.PI)+90;
				if(anglem<0)anglem+=360;
				anglem+=180;
				anglem=random(anglem-90,anglem+90);
				mechans[m].setSpeed(50*(100/mechans[m].width),anglem); 
			}}}
		}}

			rapp=Math.round(spr.width/mechans[m].width*100)/100;
			deplacement=Math.sqrt(Math.pow(mechans[m].position.x-spr.position.x,2)+Math.pow(mechans[m].position.y-spr.position.y,2))-spr.width-mechans[m].width*2;
		if(deplacement<1.25*(mechans[m].width/100)){
				
				if(rapp<0.97){
				if(deplacement<dist){dist=deplacement;
				anglem=(Math.atan2((mechans[m].position.x-spr.position.x),-(mechans[m].position.y-spr.position.y)))*(180/Math.PI)+90;
				if(anglem<0)anglem+=360;
				mechans[m].setSpeed(50*(100/mechans[m].width),anglem); 
			}}
		
			else{if(rapp>1.03){
				
				if(deplacement<dist){dist=deplacement;
				anglem=(Math.atan2((mechans[m].position.x-spr.position.x),-(mechans[m].position.y-spr.position.y)))*(180/Math.PI)+90;
				if(anglem<0)anglem+=360;
				anglem+=180;
				anglem=random(anglem-60,anglem+60);
				mechans[m].setSpeed(50*(100/mechans[m].width),anglem); 
			}}}
		}

	}
	
if(document.getElementById("comme").style.visibility=='visible'){
	document.getElementById("scored").style.visibility='hidden';
	document.getElementById('spectateur').style.visibility='hidden';
	document.getElementById('numberm').style.visibility='hidden';
}

stroke(128);
strokeWeight(6);
for(l=murg.position.x*4+125*4;l<murd.position.x*4-99;l=l+250){
	line(l,murh.position.y*3,l,murb.position.y*3)
}
for(l=murh.position.y*4+125*4;l<murb.position.y*4-99;l=l+250){
	line(murg.position.x*4,l,murd.position.x*4,l)
}


strokeWeight(1);
pseudo=document.getElementById("pseudo").value;

if(jouer==true){mouvespr();}

mechans.collide(murh,h_m);
mechans.collide(murb,b_m);
mechans.collide(murd,d_m);
mechans.collide(murg,g_m);
spr.overlap(mechans,remove_moi);
mechans.overlap(mechans,remove_mechans);



if((spr.width>1200*mult && pafait==true) || (jouer==false && pafait==true)){pafait=false;}

if(jouer==false || spr.width>1200*mult){
	if(spectateur==true && jouer==false){
		if(nbm<document.getElementById("mechnum").value){document.getElementById("mechnum").value=nbm;}
		if(0>document.getElementById("mechnum").value){document.getElementById("mechnum").value=-document.getElementById("mechnum").value;}
		if(sptype=='#1'){mechnum=ranking[0].name;}
		else{if(sptype=='1,2,..' && 0<document.getElementById("mechnum").value)mechnum=document.getElementById("mechnum").value-1;
			 if(document.getElementById("mechnum").value==0)mechnum=0}
		camera.zoom = 1.25*(100/mechans[mechnum].width)/1050*height;
		camera.position.x = mechans[mechnum].position.x;
		camera.position.y = mechans[mechnum].position.y;	
	}
	else{
	camera.zoom = 0.12/mult/1050*height;
	camera.position.x=0;
	camera.position.y=0;	
	}

}
else{
camera.zoom = 1.25*(100/spr.width)/1050*height;
camera.position.x = spr.position.x;
camera.position.y = spr.position.y;}

nourritures.overlap(spr,remove_nour);
nourritures.overlap(mechans,remove_nour);
textAlign(CENTER,CENTER);

textAlign(CENTER);
stroke(0);
textSize((40*spr.width)/250);
strokeWeight(1);
drawSprites();
if(jouer==true){text(pseudo,spr.position.x,spr.position.y);}

for(m=0;m<nbm;m++){
	textAlign(CENTER);
	stroke(0);
	textSize((40*mechans[m].width)/250);
	if(mechans[m].shapeColor/255<=0.5){fill(mechans[m].shapeColor);}
	if(mechans[m].shapeColor/255>0.5){fill(mechans[m].shapeColor);}
	text(lesnoms[(m+15*hsrd)],mechans[m].position.x,mechans[m].position.y)
	}
	
	stroke(255);
	textSize(120);
	
if(jouer==true){
	
	if(pseudo=="") pseudo="nameless";
		peoples=[
		{name: 100, points: spr.width}
		];
	}
	else{
		peoples=[
		{name:100, points: 0}
		];
	}
		
	for(m=0;m<nbm;m++){
		peoples.push({name: m, points: mechans[m].width});
	}	
	
// sort this list by points, if points is equal, sort by name.


 ranking = helper.arr.multisort(peoples, ['points', 'name'], ['DESC','ASC']);

for (z=0;z<nbm+1;z++){if(ranking[z].name==100) {montop=z+1;}if(jouer==false){montop="N-C";}}
	
	n[1]=ranking[0].points;nom[1]=ranking[0].name;
	n[2]=ranking[1].points;nom[2]=ranking[1].name;
	n[3]=ranking[2].points;nom[3]=ranking[2].name;
	n[4]=ranking[3].points;nom[4]=ranking[3].name;
	n[5]=ranking[4].points;nom[5]=ranking[4].name;
	n[6]=ranking[5].points;nom[6]=ranking[5].name;
	n[7]=ranking[6].points;nom[7]=ranking[6].name;
	n[8]=ranking[7].points;nom[8]=ranking[7].name;
	n[9]=ranking[8].points;nom[9]=ranking[8].name;
	n[10]=ranking[9].points;nom[10]=ranking[9].name;
	n[11]=ranking[10].points;nom[11]=ranking[10].name;
	

	var ts =height*0.022;
	lesclassements="<table width=100% border=0 style=\"font-size:" + ts + "px\"><tr><tr/><tr><tr/><tr><td width=10% align=right>";
	for(z=1;z<12;z++) {
	if(nom[z]==100) nom[z]=pseudo;
	else nom[z]=lesnoms[(nom[z]+15*hsrd)];
	}

	if(montop!=1 && nbm>0)lesclassements+="<font color=black>"+1+".";
		else lesclassements+="<font color=red>"+montop+".";
	if(montop!=2 && nbm>1)lesclassements+="<br><font color=black>"+2+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(montop!=3 && nbm>2)lesclassements+="<br><font color=black>"+3+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(montop!=4 && nbm>3)lesclassements+="<br><font color=black>"+4+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(montop!=5 && nbm>4)lesclassements+="<br><font color=black>"+5+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(montop!=6 && nbm>5)lesclassements+="<br><font color=black>"+6+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(montop!=7 && nbm>6)lesclassements+="<br><font color=black>"+7+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(montop!=8 && nbm>7)lesclassements+="<br><font color=black>"+8+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(montop!=9 && nbm>8)lesclassements+="<br><font color=black>"+9+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(montop!=10 && nbm>9)lesclassements+="<br><font color=black>"+10+".";
	else lesclassements+="<br><font color=red>"+montop+".";
	if(jouer==true && montop>10)lesclassements+="<br><font color=red>"+montop+".";
	else{if(jouer==true || nbm>10)lesclassements+="<br><font color=black>"+11+".";}
	lesclassements+="</td><td align=right>";
	if(montop!=1 && nbm>0)lesclassements+="<font color=black>"+nom[1];
		else lesclassements+="<font color=red>"+pseudo;
	if(montop!=2 && nbm>1)lesclassements+="<br><font color=black>"+nom[2];
	else lesclassements+="<br><font color=red>"+pseudo;
	if(montop!=3 && nbm>2)lesclassements+="<br><font color=black>"+nom[3];
	else lesclassements+="<br><font color=red>"+pseudo;
	if(montop!=4 && nbm>3)lesclassements+="<br><font color=black>"+nom[4];
	else lesclassements+="<br><font color=red>"+pseudo;
	if(montop!=5 && nbm>4)lesclassements+="<br><font color=black>"+nom[5];
	else lesclassements+="<br><font color=red>"+pseudo;
	if(montop!=6 && nbm>5)lesclassements+="<br><font color=black>"+nom[6];
	else lesclassements+="<br><font color=red>"+pseudo;
	if(montop!=7 && nbm>6)lesclassements+="<br><font color=black>"+nom[7];
	else lesclassements+="<br><font color=red>"+pseudo;
	if(montop!=8 && nbm>7)lesclassements+="<br><font color=black>"+nom[8];
	else lesclassements+="<br><font color=red>"+pseudo;
	if(montop!=9 && nbm>8)lesclassements+="<br><font color=black>"+nom[9];
	else lesclassements+="<br><font color=red>"+pseudo;
	if(montop!=10 && nbm>9)lesclassements+="<br><font color=black>"+nom[10];
	else lesclassements+="<br><font color=red>"+pseudo
	if(jouer==true && montop>10)lesclassements+="<br><font color=red>"+pseudo;
	else{if(jouer==true || nbm>10)lesclassements+="<br><font color=black>"+nom[11];}
	lesclassements+="</td></tr></table>";
	document.getElementById("classement").innerHTML=lesclassements;
	textAlign(CENTER);
	diminution();

if(jouer==true){
	document.getElementById("score").innerHTML=Math.round((spr.width-240)*2);}
else{if(spectateur==true){document.getElementById("score").innerHTML=Math.round((mechans[mechnum].width-240)*2)}}
}


function mouvespr() {
mouve=  50*(100/spr.width);
angle=(Math.atan2((width/2-mouseX),-(height/2-mouseY)))*(180/Math.PI)+90;
if(angle<0)angle+=360;

spr.setSpeed(mouve,angle);
max=spr.height/2+murh.height/2;
if(spr.collide(murh)){spr.position.y=murh.position.y+max}
if(spr.collide(murb)){spr.position.y=murb.position.y-max}
if(spr.collide(murg)){spr.position.x=murg.position.x+max}
if(spr.collide(murd)){spr.position.x=murd.position.x-max}
}

function h_m(se,me){
se.setSpeed((50*(100/se.width)),random(180,0));
}
function b_m(se,me){
se.setSpeed((50*(100/se.width)),random(180,360));	
}
function d_m(se,me){
se.setSpeed((50*(100/se.width)),random(90,270));	
}
function g_m(se,me){
se.setSpeed((50*(100/se.width)),random(random(270,360),random(0,90)));
}

function remove_nour(nour,se){
	
	se.width=Math.sqrt(Math.pow((se.width),2)+Math.pow((nour.width/4),2));
	se.height=Math.sqrt(Math.pow((se.height),2)+Math.pow((nour.height/4),2));
	nour.remove();
	nbn--;
}

function remove_mechans(se,me){
	petitm="";
	if(se.width<me.width){petitm="se";rapport=se.width/me.width;}
	else{petitm="me";rapport=me.width/se.width;}
if(rapport<0.98){
	if(me.position.x<se.position.x+se.width/2 && me.position.x>se.position.x-se.width/2 && me.position.y<se.position.y+se.width/2 && me.position.y>se.position.y-se.width/2 && petitm=="me"){
	mt=250;
	se.width=Math.sqrt(Math.pow((me.width),2)/3+Math.pow((se.width),2));
	se.height=Math.sqrt(Math.pow((me.height),2)/3+Math.pow((se.height),2));
	me.width=250;
	me.height=250;
	alea(250);
	while(aleatoire.overlap(mechans) && aleatoire.overlap(spr)) alea(mt);
	me.position.x=aleatoire.position.x;
	me.position.y=aleatoire.position.y;
	aleatoire.position.x=-1664*4*mult;aleatoire.position.y=-1664*4*mult;
	me.shapeColor = color(random(0,255),random(0,255),random(0,255));	
	
	}
	else{if(se.position.x<me.position.x+me.width/2 && se.position.x>me.position.x-me.width/2 && se.position.y<me.position.y+me.width/2 && se.position.y>me.position.y-me.width/2 && petitm=="se"){
	mt=250;
	me.width=Math.sqrt(Math.pow((me.width),2)+Math.pow((se.width),2)/3);
	me.height=Math.sqrt(Math.pow((me.height),2)+Math.pow((se.height),2)/3);
	se.width=250;
	se.height=250;
	alea(250);
	while(aleatoire.overlap(mechans) && aleatoire.overlap(spr)) alea(mt);
	se.position.x=aleatoire.position.x;
	se.position.y=aleatoire.position.y;
	aleatoire.position.x=-1664*4*mult;aleatoire.position.y=-1664*4*mult;
	se.shapeColor = color(random(0,255),random(0,255),random(0,255));
	}}
}	

}
function remove_moi(se,me){
	petitm="";
	if(se.width<me.width){petitm="se";rapport=se.width/me.width;}
	else{petitm="me";rapport=me.width/se.width;}
if(rapport<0.98){
	if(me.position.x<se.position.x+se.width/2 && me.position.x>se.position.x-se.width/2 && me.position.y<se.position.y+se.width/2 && me.position.y>se.position.y-se.width/2 && petitm=="me"){

	se.width=Math.sqrt(Math.pow((me.width),2)/3+Math.pow((se.width),2));
	se.height=Math.sqrt(Math.pow((me.height),2)/3+Math.pow((se.height),2));
	me.width=250;
	me.height=250;
	alea(250);
	while(aleatoire.overlap(mechans) && aleatoire.overlap(spr)) alea(mt);
	me.position.x=aleatoire.position.x;
	me.position.y=aleatoire.position.y;
	aleatoire.position.x=-1664*4*mult;aleatoire.position.y=-1664*4*mult;
	me.shapeColor = color(random(0,255),random(0,255),random(0,255));
	}
	else{if(se.position.x<me.position.x+me.width/2 && se.position.x>me.position.x-me.width/2 && se.position.y<me.position.y+me.width/2 && se.position.y>me.position.y-me.width/2 && petitm=="se"){
	me.width=Math.sqrt(Math.pow((me.width),2)+Math.pow((se.width),2)/3);
	me.height=Math.sqrt(Math.pow((me.height),2)+Math.pow((se.height),2)/3);
	se.setSpeed(0,0);
	se.width=250;se.height=250;
		se.position.x=1664*4*mult
		se.position.y=1664*4*mult
		document.getElementById("comme").style.visibility='visible';
		document.getElementById("scored").style.visibility='hidden';
		jouer=false;
		murh.shapeColor = color(0,0,0);
		murb.shapeColor = color(0,0,0);
		murd.shapeColor = color(0,0,0);
		murg.shapeColor = color(0,0,0);
		}
		}
	
}
}
function alea(k){
	aleatoire.width=k;
	aleatoire.height=k;
	aleatoire.position.x=random(murg.position.x+125+k/2,murd.position.x-125-k/2);
	aleatoire.position.y=random(murh.position.y+125+k/2,murb.position.y-125-k/2);
}
function alean(k){
	aleatoiren.width=k;
	aleatoiren.height=k;
	aleatoiren.position.x=random(murg.position.x+125+k/2,murd.position.x-125-k/2);
	aleatoiren.position.y=random(murh.position.y+125+k/2,murb.position.y-125-k/2);
}
function cree_mechas(){
	if(mult==1){nbm=10}
	if(mult==2){nbm=19}
	if(mult==3){nbm=34}
	if(mult==4){nbm=49}
	document.getElementById("mechnum").max=nbm;
	document.getElementById("mechnum").value=1;
for(o=0;o<nbm;o++){
mt=random(250,1000);

mechan = createSprite(random(murg.position.x+25+mt/2,murd.position.x-25-mt/2),random(murh.position.y+25+mt/2,murb.position.y-25-mt/2),mt,mt);
mechan.setSpeed((50*(100/mechan.width)),random(0,360));
mechan.shapeColor = color(random(0,255),random(0,255),random(0,255));
mechans.add(mechan);
}
}

function cree_nour(){
	if(mult==1){
		if(nbn<100){
			alean(50);
			while(aleatoiren.overlap(mechans) && aleatoiren.overlap(spr) && aleatoiren.overlap(nourritures)) alean(mt);
			nour = createSprite(aleatoiren.position.x,aleatoiren.position.y,50,50);
			aleatoiren.position.x=-1664*4*mult;aleatoiren.position.y=-1664*4*mult;
			nour.shapeColor = color(random(0,250),random(0,250),random(0,250));
			nourritures.add(nour);
			nbn++;
		}
	}
	else{if(nbn<250){
			alean(50);
			while(aleatoiren.overlap(mechans) && aleatoiren.overlap(spr) && aleatoiren.overlap(nourritures)) alean(mt);
			nour = createSprite(aleatoiren.position.x,aleatoiren.position.y,50,50);
			aleatoiren.position.x=-1664*4*mult;aleatoiren.position.y=-1664*4*mult;
			nour.shapeColor = color(random(0,250),random(0,250),random(0,250));
			nourritures.add(nour);
			nbn++;
		}
	}
}

function diminution(){
	for(m=nbm-1;m>-1;m--){
		if(mechans[m].width>500){
				mechans[m].width-=0.00001*(mechans[m].width-500);
				mechans[m].height=mechans[m].width;
		}
	}
	if(spr.width>500){
		spr.width-=0.00001*(spr.width-500);
		spr.height=spr.width;
	}	
}
function keyPressed() {
if((keyCode==27 || keyCode==32) && spectateur==true && jouer==false && temps==false){
	spectateur=false;
	document.getElementById("comme").style.visibility='visible';
	setTimeout(time,300);
}
}
function time(){
	temps=true;
}