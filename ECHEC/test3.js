var selection=0;
var tours=0;
var coucou=[0,""];
var test= ["n♖", "n♘", "n♗", "n♕", "n♔", "n♗", "n♘", "n♖",
			"n♙", "n♙", "n♙", "n♙", "n♙", "n♙", "n♙", "n♙",
			"", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "",
			"b♙", "b♙", "b♙", "b♙", "b♙", "b♙", "b♙", "b♙",
			"b♖", "b♘", "b♗", "b♕", "b♔", "b♗", "b♘", "b♖"];
var pion = ["n♖", "n♘", "n♗", "n♕", "n♔", "n♗", "n♘", "n♖",
			"n♙", "n♙", "n♙", "n♙", "n♙", "n♙", "n♙", "n♙",
			"", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "",
			"b♙", "b♙", "b♙", "b♙", "b♙", "b♙", "b♙", "b♙",
			"b♖", "b♘", "b♗", "b♕", "b♔", "b♗", "b♘", "b♖"];
var position  = [0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0];
function stop(){
	position  = [0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0];
}
function setup() {
	stop();
	wid=window.innerHeight;
	canvas = createCanvas(wid, wid);
	canvas.position((window.innerWidth-window.innerHeight)/2,0);

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
	camera.zoom = wid/(800);
	camera.position.x=800/2;
	camera.position.y=800/2;
	redessine();
}
function windowResized() {
	wid=window.innerHeight;
	resizeCanvas(wid, wid);
	canvas.position((window.innerWidth-window.innerHeight)/2,0);
	camera.zoom = wid/(800);
	redessine();
}
function redessine(){
	for(var y=0;y<height;y+=height/4){
		for(var x=0;x<width;x+=width/4){
			strokeWeight(1);
			stroke(0);
			fill(185);
			rect(x,y,width/8,height/8);
			fill(120);
			rect(x+width/8,y,width/8,height/8);
			fill(185);
			rect(x+width/8,y+height/8,width/8,height/8);
			fill(120);
			rect(x,y+height/8,width/8,height/8);
	  
		}
	}
	for(var y=0;y<8;y+=1){  
		for(var x=0;x<8;x+=1){
			
			textAlign(CENTER,CENTER);textSize(width/9);strokeWeight(1);
			if(pion[y*8+x].includes("b")){noStroke();fill(255);}
			else{noStroke();fill(0);}
			text(pion[y*8+x].replace("b","").replace("n",""),width/16+x*width/8,y*height/8+height/16);
		}
	}
	if(selection==1){
		for(var y=0;y<8;y+=1){  
			for(var x=0;x<8;x+=1){
				strokeWeight(2);
				stroke(0);
				if(position[y*8+x]==1){
					fill(0,255,0,100);
					rect(x*width/8,y*height/8,width/8,height/8);	
				}
				if(position[y*8+x]==2){
					fill(128,128,128);
					circle(x*width/8+width/16, y*height/8+height/16, height/40);
				}
				if(position[y*8+x]==3){
					fill(255,0,0,100);
					circle(x*width/8+width/16, y*height/8+height/16, height/40);	
				}
			}
		}
	}
}

function mouseClicked() {
	for(var y=0;y<8;y+=1){  
		for(var x=0;x<8;x+=1){
			if(mouseX > x*width/8 && mouseX < x*width/8+width/8 && mouseY > y*height/8 && mouseY < y*height/8+height/8){
				if(selection==0 && pion[y*8+x]!=""){
					if(pion[y*8+x]=="b♙"&&tours % 2 == 0)pionblanc(y,x);
					if(pion[y*8+x]=="n♙"&&tours % 2 == 1)pionnoir(y,x);
					if(pion[y*8+x]=="b♖"&&tours % 2 == 0)tour(y,x,"b");
					if(pion[y*8+x]=="n♖"&&tours % 2 == 1)tour(y,x,"n");
					if(pion[y*8+x]=="b♘"&&tours % 2 == 0)Cavalier(y,x,"b");
					if(pion[y*8+x]=="n♘"&&tours % 2 == 1)Cavalier(y,x,"n");
					if(pion[y*8+x]=="b♗"&&tours % 2 == 0)fou(y,x,"b");
					if(pion[y*8+x]=="n♗"&&tours % 2 == 1)fou(y,x,"n");
					if(pion[y*8+x]=="b♕"&&tours % 2 == 0)dame(y,x,"b");
					if(pion[y*8+x]=="n♕"&&tours % 2 == 1)dame(y,x,"n");
					if(pion[y*8+x]=="b♔"&&tours % 2 == 0)roi(y,x,"b");
					if(pion[y*8+x]=="n♔"&&tours % 2 == 1)roi(y,x,"n");
				}
				else if(selection==1){
					if(position[y*8+x]==1){
						selection=0;
						stop();
					}
					if(position[y*8+x]==3||position[y*8+x]==2){
						pion[coucou[0]]="";
						pion[y*8+x]=coucou[1];
						
						selection=0;
						stop();
						tours++
					}
				}
				redessine();
			}
		}
	}		
}
function pionblanc(y,x){
	coucou=[y*8+x,"b♙"];
	selection=1;
	position[y*8+x]=1;
	if(y==1){coucou[1]="b♕";}
	if(y-1>-1){
		if(pion[(y-1)*8+x]==""){
			if(TestMoveAutre((y-1)*8+x,"b"))
			{position[(y-1)*8+x]=2;}
			if(pion[(y-2)*8+x]==""&&y==6){
				if(TestMoveAutre((y-2)*8+x,"b"))
				{position[(y-2)*8+x]=2;}
			}
		}
	}
	if(y-1>-1&&x+1<8){
		if(pion[(y-1)*8+x+1].includes("n")&&!pion[(y-1)*8+x+1].includes("♔")){
			if(TestMoveAutre((y-1)*8+x+1,"b"))
				position[(y-1)*8+x+1]=3;
		}
	}
	if(y-1>-1&&x-1>-1){
		if(pion[(y-1)*8+x-1].includes("n")&&!pion[(y-1)*8+x-1].includes("♔")){
			if(TestMoveAutre((y-1)*8+x-1,"b"))
				position[(y-1)*8+x-1]=3;
		}
	}
}
function pionnoir(y,x){
	coucou=[y*8+x,"n♙"];
	selection=1;
	position[y*8+x]=1;
	
		if(y==6){coucou[1]="n♕";}
	if(y+1<8){
		if(pion[(y+1)*8+x]==""){
			if(TestMoveAutre((y+1)*8+x,"n"))
				position[(y+1)*8+x]=2;
			if(pion[(y+2)*8+x]==""&&y==1){
				if(TestMoveAutre((y+2)*8+x,"n"))
					position[(y+2)*8+x]=2;
			}
		}

	}
	if(y+1<8&&x+1<8){
		if(pion[(y+1)*8+x+1].includes("b")&&!pion[(y+1)*8+x+1].includes("♔")){
			if(TestMoveAutre((y+1)*8+x+1,"n"))
				position[(y+1)*8+x+1]=3;
		}
	}
	if(y+1<8&&x-1>-1){
		if(pion[(y+1)*8+x-1].includes("b")&&!pion[(y+1)*8+x-1].includes("♔")){
			if(TestMoveAutre((y+1)*8+x-1,"n"))
				position[(y+1)*8+x-1]=3;
		}
	}
}
function tour(y,x,nb){
	coucou=[y*8+x,nb+"♖"];
	selection=1;
	position[y*8+x]=1;
	for(var i=1;x+i<8;i++){  
		if(!pion[y*8+x+i].includes(nb)&&!pion[y*8+x+i].includes("♔")){
			if(pion[y*8+x+i]==""){
				if(TestMoveAutre(y*8+x+i,nb))
					position[y*8+x+i]=2;
			}
			else{
				if(TestMoveAutre(y*8+x+i,nb))
					position[y*8+x+i]=3;
				i=20;
			}
		}
		else{i=20;}
	}
	for(var i=1;x-i>-1;i++){  
		if(!pion[y*8+x-i].includes(nb)&&!pion[y*8+x-i].includes("♔")){
			if(pion[y*8+x-i]==""){
				if(TestMoveAutre(y*8+x-i,nb))
					position[y*8+x-i]=2;
			}
			else{
				if(TestMoveAutre(y*8+x-i,nb))
					position[y*8+x-i]=3;
				i=20;
			}
		}
		else{i=20;}
	}
	for(var i=1;y+i<8;i++){  
		if(!pion[(y+i)*8+x].includes(nb)&&!pion[(y+i)*8+x].includes("♔")){
			if(pion[(y+i)*8+x]==""){
				if(TestMoveAutre((y+i)*8+x,nb))
					position[(y+i)*8+x]=2;
			}
			else{
				if(TestMoveAutre((y+i)*8+x,nb))
					position[(y+i)*8+x]=3;
				i=20;
			}
		}
		else{i=20;}
	}
	for(var i=1;y-i>-1;i++){  
		if(!pion[(y-i)*8+x].includes(nb)&&!pion[(y-i)*8+x].includes("♔")){
			if(pion[(y-i)*8+x]==""){
				if(TestMoveAutre((y-i)*8+x,nb))
					position[(y-i)*8+x]=2;
			}
			else{
				if(TestMoveAutre((y-i)*8+x,nb))
					position[(y-i)*8+x]=3;
				i=20;
			}
		}
		else{i=20;}
	}
}
function Cavalier(y,x,nb){
	coucou=[y*8+x,nb+"♘"];
	selection=1;
	position[y*8+x]=1;
	if(y+2<8&&x+1<8){
		if(pion[(y+2)*8+x+1]==""){
			if(TestMoveAutre((y+2)*8+x+1,nb))
				position[(y+2)*8+x+1]=2;
		}
		else if(!pion[(y+2)*8+x+1].includes(nb)&&!pion[(y+2)*8+x+1].includes("♔")){
			if(TestMoveAutre((y+2)*8+x+1,nb))
				position[(y+2)*8+x+1]=3;
		}
	}
	if(y+2<8&&x-1>-1){
		if(pion[(y+2)*8+x-1]==""){
			if(TestMoveAutre((y+2)*8+x-1,nb))
				position[(y+2)*8+x-1]=2;
		}
		else if(!pion[(y+2)*8+x-1].includes(nb)&&!pion[(y+2)*8+x-1].includes("♔")){
			if(TestMoveAutre((y+2)*8+x-1,nb))
				position[(y+2)*8+x-1]=3;
		}
	}
	if(y-2>-1&&x+1<8){
		if(pion[(y-2)*8+x+1]==""){
			if(TestMoveAutre((y-2)*8+x+1,nb))
				position[(y-2)*8+x+1]=2;
		}
		else if(!pion[(y-2)*8+x+1].includes(nb)&&!pion[(y-2)*8+x+1].includes("♔")){
			if(TestMoveAutre((y-2)*8+x+1,nb))
				position[(y-2)*8+x+1]=3;
		}
	}
	if(y-2>-1&&x-1>-1){
		if(pion[(y-2)*8+x-1]==""){
			if(TestMoveAutre((y-2)*8+x-1,nb))
				position[(y-2)*8+x-1]=2;
		}
		else if(!pion[(y-2)*8+x-1].includes(nb)&&!pion[(y-2)*8+x-1].includes("♔")){
			if(TestMoveAutre((y-2)*8+x-1,nb))
				position[(y-2)*8+x-1]=3;
		}
	}
	if(y+1<8&&x+2<8){
		if(pion[(y+1)*8+x+2]==""){
			if(TestMoveAutre((y+1)*8+x+2,nb))
			position[(y+1)*8+x+2]=2;
		}
		else if(!pion[(y+1)*8+x+2].includes(nb)&&!pion[(y+1)*8+x+2].includes("♔")){
			if(TestMoveAutre((y+1)*8+x+2,nb))
				position[(y+1)*8+x+2]=3;
		}
	}
	if(y+1<8&&x-2>-1){
		if(pion[(y+1)*8+x-2]==""){
			if(TestMoveAutre((y+1)*8+x-2,nb))
				position[(y+1)*8+x-2]=2;
		}
		else if(!pion[(y+1)*8+x-2].includes(nb)&&!pion[(y+1)*8+x-2].includes("♔")){
			if(TestMoveAutre((y+1)*8+x-2,nb))
				position[(y+1)*8+x-2]=3;
		}
	}
	
		if(y-1>-1&&x+2<8){
		if(pion[(y-1)*8+x+2]==""){
			if(TestMoveAutre((y-1)*8+x+2,nb))
			position[(y-1)*8+x+2]=2;
		}
		else if(!pion[(y-1)*8+x+2].includes(nb)&&!pion[(y-1)*8+x+2].includes("♔")){
			if(TestMoveAutre((y-1)*8+x+2,nb))
				position[(y-1)*8+x+2]=3;
		}
	}
	if(y-1>-1&&x-2>-1){
		if(pion[(y-1)*8+x-2]==""){
			if(TestMoveAutre((y-1)*8+x-2,nb))
				position[(y-1)*8+x-2]=2;
		}
		else if(!pion[(y-1)*8+x-2].includes(nb)&&!pion[(y-1)*8+x-2].includes("♔")){
			if(TestMoveAutre((y-1)*8+x-2,nb))
				position[(y-1)*8+x-2]=3;
		}
	}
}
function fou(y,x,nb){
	coucou=[y*8+x,nb+"♗"];
	selection=1;
	position[y*8+x]=1;
	for(var i=1;i<8;i++){  
		if(y+i<8&&x-i>-1){
			if(pion[(y+i)*8+x-i]==""){
				if(TestMoveAutre((y+i)*8+x-i,nb))
					position[(y+i)*8+x-i]=2;
			}
			else if(!pion[(y+i)*8+x-i].includes(nb)&&!pion[(y+i)*8+x-i].includes("♔")){
				if(TestMoveAutre((y+i)*8+x-i,nb))
					position[(y+i)*8+x-i]=3;
				i=20;
			}
			else{i=20;}
		}
		else{i=20;}
	}
	for(var i=1;i<8;i++){  
		if(y+i<8&&x+i<8){
			if(pion[(y+i)*8+x+i]==""){
				if(TestMoveAutre((y+i)*8+x+i,nb))
					position[(y+i)*8+x+i]=2;
			}
			else if(!pion[(y+i)*8+x+i].includes(nb)&&!pion[(y+i)*8+x+i].includes("♔")){
				if(TestMoveAutre((y+i)*8+x+i,nb))
					position[(y+i)*8+x+i]=3;
				i=20;
			}
			else{i=20;}
		}
		else{i=20;}
	}
	for(var i=1;i<8;i++){  
		if(y-i>-1&&x+i<8){
			if(pion[(y-i)*8+x+i]==""){
				if(TestMoveAutre((y-i)*8+x+i,nb))
					position[(y-i)*8+x+i]=2;
			}
			else if(!pion[(y-i)*8+x+i].includes(nb)&&!pion[(y-i)*8+x+i].includes("♔")){
				if(TestMoveAutre((y-i)*8+x+i,nb))
					position[(y-i)*8+x+i]=3;
				i=20;
			}
			else{i=20;}
		}
		else{i=20;}
	}
	for(var i=1;i<8;i++){  
		if(y-i>-1&&x-i>-1){
			if(pion[(y-i)*8+x-i]==0){
				if(TestMoveAutre((y-i)*8+x-i,nb))
					position[(y-i)*8+x-i]=2;
			}
			else if(!pion[(y-i)*8+x-i].includes(nb)&&!pion[(y-i)*8+x-i].includes("♔")){
				if(TestMoveAutre((y-i)*8+x-i,nb))
					position[(y-i)*8+x-i]=3;
				i=20;
			}
			else{i=20;}
		}
		else{i=20;}
	}
}
function dame(y,x,nb){
	fou(y,x,nb);
	tour(y,x,nb);
	coucou=[y*8+x,nb+"♕"];
}
function roi(y,x,nb){
	selection=1;
	coucou=[y*8+x,nb+"♔"];
	position[y*8+x]=1;
	if(y-1>-1){
		if(!pion[(y-1)*8+x].includes(nb)&&!pion[(y-1)*8+x].includes("♔")){
			if(pion[(y-1)*8+x]==""){
				if(TestMoveAutre((y-1)*8+x,nb))
					position[(y-1)*8+x]=2;
			}
			else{
				if(TestMoveAutre((y-1)*8+x))
					position[(y-1)*8+x]=3;
				o=20;
			}
		}
	}
	if(y+1<8){
		if(!pion[(y+1)*8+x].includes(nb)&&!pion[(y+1)*8+x].includes("♔")){
			if(pion[(y+1)*8+x]==""){
				if(TestMoveAutre((y+1)*8+x,nb))
					position[(y+1)*8+x]=2;
			}
			else{
				if(TestMoveAutre((y+1)*8+x))
					position[(y+1)*8+x]=3;
				o=20;
			}
		}
	}
	if(x-1>-1){
		if(!pion[y*8+x-1].includes(nb)&&!pion[y*8+x-1].includes("♔")){
			if(pion[y*8+x-1]==""){
				if(TestMoveAutre(y*8+x-1,nb))
					position[y*8+x-1]=2;
			}
			else{
				if(TestMoveAutre(y*8+x-1))
					position[y*8+x-1]=3;
				o=20;
			}
		}
	}
	if(x+1<8){
		if(!pion[y*8+x+1].includes(nb)&&!pion[y*8+x+1].includes("♔")){
			if(pion[y*8+x+1]==""){
				if(TestMoveAutre(y*8+x+1,nb))
					position[y*8+x+1]=2;
			}
			else{
				if(TestMoveAutre(y*8+x+1))
					position[y*8+x+1]=3;
				o=20;
			}
		}
	}
	if(y+1<8&&x+1<8){
		if(pion[(y+1)*8+x+1]==""){
			if(TestMoveAutre((y+1)*8+x+1,nb))
				position[(y+1)*8+x+1]=2;
		}
		else if(!pion[(y+1)*8+x+1].includes(nb)&&!pion[(y+1)*8+x+1].includes("♔")){
			if(TestMoveAutre((y+1)*8+x+1,nb))
				position[(y+1)*8+x+1]=3;
		}
	}
	if(y-1>-1&&x+1<8){
		if(pion[(y-1)*8+x+1]==""){
			if(TestMoveAutre((y-1)*8+x+1,nb))
				position[(y-1)*8+x+1]=2;
		}
		else if(!pion[(y-1)*8+x+1].includes(nb)&&!pion[(y-1)*8+x+1].includes("♔")){
			if(TestMoveAutre((y-1)*8+x+1,nb))
				position[(y-1)*8+x+1]=3;
		}
	}
	if(y-1>-1&&x-1>-1){
		if(pion[(y-1)*8+x-1]==""){
			if(TestMoveAutre((y-1)*8+x-1,nb))
				position[(y-1)*8+x-1]=2;
		}
		else if(!pion[(y-1)*8+x-1].includes(nb)&&!pion[(y-1)*8+x-1].includes("♔")){
			if(TestMoveAutre((y-1)*8+x-1,nb))
				position[(y-1)*8+x-1]=3;
		}
	}
	if(y+1<8&&x-1>-1){
		if(pion[(y+1)*8+x-1]==""){
			if(TestMoveAutre((y+1)*8+x-1,nb))
				position[(y+1)*8+x-1]=2;
		}
		else if(!pion[(y+1)*8+x-1].includes(nb)&&!pion[(y+1)*8+x-1].includes("♔")){
			if(TestMoveAutre((y+1)*8+x-1,nb))
				position[(y+1)*8+x-1]=3;
		}
	}
}


function TestMoveAutre(xy,bn){ 
	for(var y=0;y<8;y+=1){  
		for(var x=0;x<8;x+=1){
			test[y*8+x]=pion[y*8+x];
		}
	}
	test[coucou[0]]="";
	test[xy]=coucou[1];
	for(var y=0;y<8;y+=1){  
		for(var x=0;x<8;x+=1){
			if(test[y*8+x]!=""){
				if(test[y*8+x]=="b♔"&&bn=="b"){
					if(testtour(y,x,"n")==false)return false;
					if(testfou(y,x,"n")==false)return false
					if(testCavalier(y,x,"n")==false)return false;
					if(testpionblanc(y,x)==false)return false;
					if(testroi(y,x,"n")==false)return false;
				}
				else if(test[y*8+x]=="n♔"&&bn=="n"){
					if(testtour(y,x,"b")==false)return false;
					if(testfou(y,x,"b")==false)return false;
					if(testCavalier(y,x,"b")==false)return false;
					if(testpionnoir(y,x)==false)return false;
					if(testroi(y,x,"b")==false)return false;
				}
			}
		}
	}
	return true;
}
function testpionblanc(y,x){
	if(y-1>-1&&x+1<8){
		if(test[(y-1)*8+x+1]=="n♙"){
			return false;
		}
	}
	if(y-1>-1&&x-1>-1){
		if(test[(y-1)*8+x-1]=="n♙"){
			return false;
		}
	}
	return true;
}
function testpionnoir(y,x){
	if(y+1<8&&x+1<8){
		if(test[(y+1)*8+x+1]=="b♙"){
			return false;
		}
	}
	if(y+1<8&&x-1>-1){
		if(test[(y+1)*8+x-1]=="b♙"){
			return false;
		}
	}
	return true;
}
function testtour(y,x,nb){
	for(var i=1;x+i<8;i++){
		if(test[y*8+x+i]==""){}
		else if(test[y*8+x+i]==nb+"♕"||test[y*8+x+i]==nb+"♖"){
			return false;
		}
		else{i=20;}
	}
	for(var i=1;x-i>-1;i++){
		if(test[y*8+x-i]==""){}
		else if(test[y*8+x-i]==nb+"♕"||test[y*8+x-i]==nb+"♖"){
			return false;
		}
		else{i=20;}
	}
	
	for(var i=1;y+i<8;i++){
		if(test[(y+i)*8+x]==""){}
		else if(test[(y+i)*8+x]==nb+"♕"||test[(y+i)*8+x]==nb+"♖"){
			return false;
		}
		else{i=20;}
	}
	for(var i=1;y-i>-1;i++){
		if(test[(y-i)*8+x]==""){}
		else if(test[(y-i)*8+x]==nb+"♕"||test[(y-i)*8+x]==nb+"♖"){
			return false;
		}
		else{i=20;}
	}
	return true;
}
function testCavalier(y,x,nb){
	if(y+2<8&&x+1<8){
		if(test[(y+2)*8+x+1]==nb+"♘"){
			return false;
		}
	}
	if(y+2<8&&x-1>-1){
		if(test[(y+2)*8+x-1]==nb+"♘"){
			return false;
		}
	}
	if(y-2>-1&&x+1<8){
		if(test[(y-2)*8+x+1]==nb+"♘"){
			return false;
		}
	}
	if(y-2>-1&&x-1>-1){
		if(test[(y-2)*8+x-1]==nb+"♘"){
			return false;
		}
	}
	if(y+1<8&&x+2<8){
		if(test[(y+1)*8+x+2]==nb+"♘"){
			return false;
		}
	}
	if(y+1<8&&x-2>-1){
		if(test[(y+1)*8+x-2]==nb+"♘"){
			return false;
		}
	}
	
	if(y-1>-1&&x+2<8){
		if(test[(y-1)*8+x+2]==nb+"♘"){
			return false;
		}
	}
	if(y-1>-1&&x-2>-1){
		if(test[(y-1)*8+x-2]==nb+"♘"){
			return false;
		}
	}
	return true;
}
function testfou(y,x,nb){
	for(var i=1;i<8;i++){  
		if(y+i<8&&x-i>-1){
			if(test[(y+i)*8+x-i]==""){}
			else if(test[(y+i)*8+x-i]==nb+"♕"||test[(y+i)*8+x-i]==nb+"♗"){
				return false;
			}
			else{i=20;}
		}
		else{i=20;}
	}
	for(var i=1;i<8;i++){  
		if(y+i<8&&x+i<8){
			if(test[(y+i)*8+x+i]==""){}
			else if(test[(y+i)*8+x+i]==nb+"♕"||test[(y+i)*8+x+i]==nb+"♗"){
				return false;
			}
			else{i=20;}
		}
		else{i=20;}
	}
	for(var i=1;i<8;i++){  
		if(y-i>-1&&x+i<8){
			if(test[(y-i)*8+x+i]==""){}
			else if(test[(y-i)*8+x+i]==nb+"♕"||test[(y-i)*8+x+i]==nb+"♗"){
				return false;
			}
			else{i=20;}
		}
		else{i=20;}
	}
	for(var i=1;i<8;i++){  
		if(y-i>-1&&x-i>-1){
			if(test[(y-i)*8+x-i]==""){}
			else if(test[(y-i)*8+x-i]==nb+"♕"||test[(y-i)*8+x-i]==nb+"♗"){
				return false;
			}
			else{i=20;}
		}
		else{i=20;}
	}
	return true;
}
function testroi(y,x,nb){
	if(y-1>-1){
		if(test[(y-1)*8+x]==nb+"♔"){
			return false;
		}
	}
	if(y+1<8){
		if(test[(y+1)*8+x]==nb+"♔"){
			return false;
		}
	}
	if(x-1>-1){
		if(test[y*8+x-1]==nb+"♔"){
			return false;
		}
	}
	if(x+1<8){
		if(test[y*8+x+1]==nb+"♔"){
			return false;
		}
	}
	if(y+1<8&&x+1<8){
		if(test[(y+1)*8+x+1]==nb+"♔"){
			return false;
		}
	}
	if(y-1>-1&&x+1<8){
		if(test[(y-1)*8+x+1]==nb+"♔"){
			return false;
		}
	}
	if(y-1>-1&&x-1>-1){
		if(test[(y-1)*8+x-1]==nb+"♔"){
			return false;
		}
	}
	if(y-1<8&&x-1>-1){
		if(test[(y+1)*8+x-1]==nb+"♔"){
			return false;
		}
	}
	return true;
}