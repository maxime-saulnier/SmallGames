var selection=0;
var pionSelect=[0,0,""];
var rockSelect=0;
var pionSelectWin=[0,0,""];
var rockSelectWin=0;
var test= [["n♖", "n♘", "n♗", "n♕", "n♔", "n♗", "n♘", "n♖"],
			["n♙", "n♙", "n♙", "n♙", "n♙", "n♙", "n♙", "n♙"],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["b♙", "b♙", "b♙", "b♙", "b♙", "b♙", "b♙", "b♙"],
			["b♖", "b♘", "b♗", "b♕", "b♔", "b♗", "b♘", "b♖"]];
var pion = [["n♖", "n♘", "n♗", "n♕", "n♔", "n♗", "n♘", "n♖"],
			["n♙", "n♙", "n♙", "n♙", "n♙", "n♙", "n♙", "n♙"],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["b♙", "b♙", "b♙", "b♙", "b♙", "b♙", "b♙", "b♙"],
			["b♖", "b♘", "b♗", "b♕", "b♔", "b♗", "b♘", "b♖"]];
var HUD_Move  =[[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0]];
var HUD_Possible  =[[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0]];
function positionRest(){
HUD_Move  =[[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0]];
 }
function ResetWin(){
	HUD_Possible  =[[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0]];
}
var nombreMove=0;
var couleur = "b";
var WinResult = 0;
var TestCouleur = "b";
var pionTest="";
var testBon=true;
var CavalierConfig= ["simple","♘",[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]]];
var fouConfig= ["multi","♗",[[1,-1],[1,1],[-1,-1],[-1,1]]];
var tourConfig= ["multi","♖",[[0,1],[0,-1],[1,0],[-1,0]]];
var dameConfig= ["multi","♕",[[0,1],[0,-1],[1,0],[-1,0],[1,-1],[1,1],[-1,-1],[-1,1]],];
var roiConfig= ["simple","♔",[[0,1],[0,-1],[1,0],[-1,0],[1,-1],[1,1],[-1,-1],[-1,1]]];
var pionNConfig= ["simple","♙",[[1,1],[1,-1]],[1,2],1,6];
var pionBConfig= ["simple","♙",[[-1,1],[-1,-1]],[-1,-2],6,1];

var roquePossibleBlanc = [true,true,true,7];
var roquePossibleNoir = [true,true,true,0];

function setup() {
	positionRest();
	new Canvas('1:1');
	testWin();
	redessine();
}
function windowResized() {
	new Canvas('1:1');
	redessine();
}
function redessine(){
	for(var y=0;y<height;y+=height/4){
		for(var x=0;x<width;x+=width/4){
			strokeWeight(1);//debut quadrillage
			stroke(0);
			fill(185);
			rect(x,y,width/8,height/8);
			fill(120);
			rect(x+width/8,y,width/8,height/8);
			fill(185);
			rect(x+width/8,y+height/8,width/8,height/8);
			fill(120);
			rect(x,y+height/8,width/8,height/8);//fin quadrillage
		}
	}
	for(var y=0;y<8;y+=1){  
		for(var x=0;x<8;x+=1){
			textAlign(CENTER,CENTER);textSize(width/9);strokeWeight(1);//debut pion
			if(pion[y][x].includes("b")){noStroke();fill(255);}
			else{noStroke();fill(0);}
			text(pion[y][x].replace("b","").replace("n",""),width/16+x*width/8,y*height/8+height/16);//fin pion

			strokeWeight(2);//debut HUD
			stroke(0);
			if(HUD_Possible[y][x]==-1){
				fill(255,0,0,100);
				rect(x*width/8,y*height/8,width/8,height/8);//carre rouge	
			}
			if(HUD_Possible[y][x]==1){
				fill(255,128,0,100);
				rect(x*width/8,y*height/8,width/8,height/8);//carre orange
			}
			strokeWeight(2);
			stroke(0);
			if(HUD_Move[y][x]==1){
				fill(0,255,0,100);
				rect(x*width/8,y*height/8,width/8,height/8);//carre vert
			}
			if(HUD_Move[y][x]==2||HUD_Move[y][x]==4){
				fill(128,128,128);
				circle(x*width/8+width/16, y*height/8+height/16, height/40);//cercle gris
			}
			if(HUD_Move[y][x]==3){
				fill(255,0,0,100);
				circle(x*width/8+width/16, y*height/8+height/16, height/40);//cercle rouge
			}//fin HUD
		}
	}
}

function mouseClicked() {
	for(var y=0;y<8;y+=1){  
		for(var x=0;x<8;x+=1){
			if(mouseX > x*width/8 && mouseX < x*width/8+width/8 && mouseY > y*height/8 && mouseY < y*height/8+height/8){
				if(HUD_Move[y][x]==0&&pion[y][x].includes(couleur)&&pion[y][x]!=""){
					positionRest();
					if(pion[y][x].includes("b♙")&&couleur=="b")MovePion(y,x,pionBConfig);
					else if(pion[y][x].includes("n♙")&&couleur=="n")MovePion(y,x,pionNConfig);
					else if(pion[y][x].includes("♖")&&pion[y][x].includes(couleur))AutrePieces(y,x,tourConfig);
					else if(pion[y][x].includes("♘")&&pion[y][x].includes(couleur))AutrePieces(y,x,CavalierConfig);
					else if(pion[y][x].includes("♗")&&pion[y][x].includes(couleur))AutrePieces(y,x,fouConfig);
					else if(pion[y][x].includes("♕")&&pion[y][x].includes(couleur))AutrePieces(y,x,dameConfig);
					else if(pion[y][x].includes("♔")&&pion[y][x].includes(couleur))AutrePieces(y,x,roiConfig);
				}
				else if(selection==1){
					if(HUD_Move[y][x]==1){
						selection=0;
						positionRest();
					}
					else if(HUD_Move[y][x]>1){
						if(HUD_Move[y][x]==4){
							pion[pionSelect[0]][pionSelect[1]]="";
							pion[y][x]=pionSelect[2];
							if(x==6){
								pion[rockSelect][7]="";
								pion[rockSelect][5]=couleur+"♖";
							}
							else {
								pion[rockSelect][0]="";
								pion[rockSelect][3]=couleur+"♖";
							}
							
						}
						else{
							pion[pionSelect[0]][pionSelect[1]]="";
							pion[y][x]=pionSelect[2];
						}
						selection=0;
						
						if(couleur=="b"){
							if(pion[roquePossibleBlanc[3]][4]!="b♔")
								roquePossibleBlanc[0]=false;
							if(pion[roquePossibleBlanc[3]][0]!="b♖")
								roquePossibleBlanc[1]=false;
							if(pion[roquePossibleBlanc[3]][7]!="b♖")
								roquePossibleBlanc[2]=false;
						}
						else {
							if(pion[roquePossibleNoir[3]][4]!="n♔")
								roquePossibleNoir[0]=false;
							if(pion[roquePossibleNoir[3]][0]!="n♖")
								roquePossibleNoir[1]=false;
							if(pion[roquePossibleNoir[3]][7]!="n♖")
								roquePossibleNoir[2]=false;
						}
						if(couleur=="b")couleur ="n";
						else couleur ="b";
						positionRest();
						ResetWin();
						redessine();
						testWin();
						if(WinResult==1){
							alert("Win Blanc");
							noLoop();
						}
						else if(WinResult==2){
							alert("Win Noir");
							noLoop();
						}
						else if(WinResult==3){
							alert("Match Null");
							noLoop();
						}
					}
				}
				redessine();
			}
		}
	}
}

function RoiRoqueMove(rockconfig){
	if(rockconfig[0]==true){
		rockSelect=rockconfig[3]
		if(rockconfig[1]==true&&pion[rockconfig[3]][1]==""&&pion[rockconfig[3]][2]==""&&pion[rockconfig[3]][3]==""){
			if(testMovePossible(rockconfig[3],2,pionSelect,rockSelect))
				HUD_Move[rockconfig[3]][2]=4;
		}
		if(rockconfig[2]==true&&pion[rockconfig[3]][5]==""&&pion[rockconfig[3]][6]==""){
			console.log("petit");
			if(testMovePossible(rockconfig[3],6,pionSelect,rockSelect))
				HUD_Move[rockconfig[3]][6]=4;
		}
	}
}
function MovePion(y,x,moveOption){
	pionSelect=[y,x,couleur+moveOption[1]];
	selection=1;
	HUD_Move[y][x]=1;
	if(y==moveOption[5]){pionSelect[2]=couleur+"♕";}
	simpleMoves(y+moveOption[3][0],x,"move");
	if(y==moveOption[4]&&pion[y+moveOption[3][0]][x]==""){
		simpleMoves(y+moveOption[3][1],x,"move");
	}
	simpleMoves(y+moveOption[2][0][0],x+moveOption[2][0][1],"kill");
	simpleMoves(y+moveOption[2][1][0],x+moveOption[2][1][1],"kill");
}
function AutrePieces(y,x,moveOption) {
	pionSelect=[y,x,couleur+moveOption[1]];
	selection=1;
	HUD_Move[y][x]=1;
	if(moveOption[0]=="simple"){
		moveOption[2].forEach(function (item) {
			simpleMoves(y+item[0],x+item[1]);
		});
	}
	else if(moveOption[0]=="multi"){
		moveOption[2].forEach(function (item) {
			multiMoves(y,x,item[0],item[1]);
		});
    }
	if(moveOption[1]=="♔"&&couleur=="b"){RoiRoqueMove(roquePossibleBlanc);}
	else if(moveOption[1]=="♔"&&couleur=="n"){RoiRoqueMove(roquePossibleNoir);}
}
function multiMoves(y,x,moveY,moveX){
	for(var i=1;i<8;i++){ 
		test="";
		var PY= y+i*moveY;
		var PX= x+i*moveX;
		if(PY>-1&&PX>-1&&PY<8&&PX<8&&!pion[PY][PX].includes(couleur)&&!pion[PY][PX].includes("♔")){
			if(pion[PY][PX]==""){
				if(testMovePossible(PY,PX,pionSelect))
					HUD_Move[PY][PX]=2;
			}
			else{
				if(testMovePossible(PY,PX,pionSelect))
					HUD_Move[PY][PX]=3;
				i=20;
			}
		}
		else{i=20;}
	}
}
function simpleMoves(y,x,moveType){
	if(y>-1&&x>-1&&y<8&&x<8){
		if((undefined==moveType||moveType=="move")&&pion[y][x]==""){
			if(testMovePossible(y,x,pionSelect))
				HUD_Move[y][x]=2;
		}
		else if((undefined==moveType||moveType=="kill")&&!pion[y][x]==""&&!pion[y][x].includes(couleur)&&!pion[y][x].includes("♔")){
			if(testMovePossible(y,x,pionSelect))
				HUD_Move[y][x]=3;
		}
	}
}

function testMovePossible(y,x,TestSelect,TestRock){
	testBon= true;
	test = pion.map(i => ([ ...i ]));
	if(undefined!=TestRock){
		test[TestSelect[0]][TestSelect[1]]="";
		test[y][x]=TestSelect[2];
		if(x==6){
			test[TestRock][7]="";
			test[TestRock][5]=couleur+"♖";
		}
		else {
			test[TestRock][0]="";
			test[TestRock][3]=couleur+"♖";
		}
	}
	else {
		test[TestSelect[0]][TestSelect[1]]="";
		test[y][x]=TestSelect[2];
	}
	
	if(couleur=="b")TestCouleur ="n";
	else TestCouleur ="b";
	for (var testRY = 0; testRY < 8; testRY++) {
        for (var testRX = 0; testRX < 8; testRX++) {
            if (test[testRY][testRX].includes("♔")&&test[testRY][testRX].includes(couleur)) {
                testroiY = testRY;
                testroiX = testRX;
				if(TestCouleur=="n")TouTest(testroiY,testroiX,pionBConfig)
				else TouTest(testroiY,testroiX,pionNConfig)
				TouTest(testroiY,testroiX,tourConfig)
				TouTest(testroiY,testroiX,CavalierConfig)
				TouTest(testroiY,testroiX,fouConfig)
				TouTest(testroiY,testroiX,dameConfig)
				TouTest(testroiY,testroiX,roiConfig)
                break; 
            }
        }
    }
	if(testBon==false) return false;
	else return true;
}
function TouTest(testy,testx,testOption) {
	pionTest= testOption[1];
	if(testOption[0]=="simple"){
		testOption[2].forEach(function (item) {
			simpleTest(testy+item[0],testx+item[1]);
		});
	}
	else if(testOption[0]=="multi"){
		testOption[2].forEach(function (item) {
			multiTest(testy,testx,item[0],item[1]);
		});
    }
}
function multiTest(testy,testx,testMY,testMX){
	for(var i=1;i<8;i++){ 
		var testPY= testy+i*testMY;
		var testPX= testx+i*testMX;
		if(testPY>-1&&testPX>-1&&testPY<8&&testPX<8){
			if(test[testPY][testPX]==""){
			}
			else{
				if(test[testPY][testPX].includes(TestCouleur)&&test[testPY][testPX].includes(pionTest))
					testBon=false;
                i=20;
			}
		}
		else{i=20;}
	}
}
function simpleTest(testy,testx){
	if(testy>-1&&testx>-1&&testy<8&&testx<8){
		if(test[testy][testx]==""){
		}
		else if(test[testy][testx].includes(TestCouleur)&&test[testy][testx].includes(pionTest)){
			testBon=false;
		}
	}
}

function testWin(){
	nombreMove=0;
    for(var winY=0;winY<8;winY++){
        for(var winX=0;winX<8;winX++){
			if(pion[winY][winX].includes("b♙")&&couleur=="b")MovePionWin(winY,winX,pionBConfig);
			else if(pion[winY][winX].includes("n♙")&&couleur=="n")MovePionWin(winY,winX,pionNConfig);
			else if(pion[winY][winX].includes("♖")&&pion[winY][winX].includes(couleur))AutrePiecesWin(winY,winX,tourConfig);
			else if(pion[winY][winX].includes("♘")&&pion[winY][winX].includes(couleur))AutrePiecesWin(winY,winX,CavalierConfig);
			else if(pion[winY][winX].includes("♗")&&pion[winY][winX].includes(couleur))AutrePiecesWin(winY,winX,fouConfig);
			else if(pion[winY][winX].includes("♕")&&pion[winY][winX].includes(couleur))AutrePiecesWin(winY,winX,dameConfig);
			else if(pion[winY][winX].includes("♔")&&pion[winY][winX].includes(couleur))AutrePiecesWin(winY,winX,roiConfig);
		}
    }
    if(nombreMove==0){
		pionSelectWin=[0,0,pion[0][0]];
		if(testMovePossible(0,0,pionSelectWin))WinResult=3;//Null
		else if(couleur=="b")WinResult=2;//Win Noir
		else if(couleur=="n")WinResult=1;//Win Blanc
	}
	else{WinResult=0;}
}
function RoiRoqueWin(rockconfig){
	var testnombre=0;
	if(rockconfig[0]==true){
		rockSelectWin=rockconfig[3]
		if(rockconfig[1]==true&&pion[rockconfig[3]][1]==""&&pion[rockconfig[3]][2]==""&&pion[rockconfig[3]][3]==""){
			
				if(testMovePossible(rockconfig[3],2,pionSelectWin,rockSelectWin))
					testnombre+=1;
		}
		if(rockconfig[2]==true&&pion[rockconfig[3]][5]==""&&pion[rockconfig[3]][6]==""){
			if(testMovePossible(rockconfig[3],6,pionSelectWin,rockSelectWin))
				testnombre+=1;
		}
	}
	return testnombre;
}
function MovePionWin(winY,winX,moveOption){
	var testnombre=0;
	pionSelectWin=[winY,winX,couleur+moveOption[1]];
	if(winY==moveOption[5]){pionSelectWin[2]=couleur+"♕";}
	testnombre+=simpleMovesWin(winY+moveOption[3][0],winX,"move");
	if(winY==moveOption[4]&&pion[winY+moveOption[3][0]][winX]==""){
		testnombre+=simpleMovesWin(winY+moveOption[3][1],winX,"move");
	}
	testnombre+=simpleMovesWin(winY+moveOption[2][0][0],winX+moveOption[2][0][1],"kill");
	testnombre+=simpleMovesWin(winY+moveOption[2][1][0],winX+moveOption[2][1][1],"kill");
	if(testnombre==0){HUD_Possible[winY][winX]=-1;}
	else {HUD_Possible[winY][winX]=1;}
	nombreMove+=testnombre;
}
function AutrePiecesWin(winY,winX,moveOption) {
	var testnombre=0;
	pionSelectWin=[winY,winX,couleur+moveOption[1]];
	if(moveOption[0]=="simple"){
		moveOption[2].forEach(function (item) {
			testnombre+=simpleMovesWin(winY+item[0],winX+item[1]);
		});
	}
	else if(moveOption[0]=="multi"){
		moveOption[2].forEach(function (item) {
			testnombre+=multiMovesWin(winY,winX,item[0],item[1]);
		});
    }
	if(moveOption[1]=="♔"&&couleur=="b"){testnombre+=RoiRoqueWin(roquePossibleBlanc);}
	else if(moveOption[1]=="♔"&&couleur=="n"){testnombre+=RoiRoqueWin(roquePossibleNoir);}
	if(testnombre==0){HUD_Possible[winY][winX]=-1;}
	else {HUD_Possible[winY][winX]=1;}
	nombreMove+=testnombre;
}
function multiMovesWin(winY,winX,winMY,winMX){
	var testnombre=0;
	for(var i=1;i<8;i++){
		var winPY= winY+i*winMY;
		var winPX= winX+i*winMX;
		if(winPY>-1&&winPX>-1&&winPY<8&&winPX<8&&!pion[winPY][winPX].includes(couleur)&&!pion[winPY][winPX].includes("♔")){
			if(pion[winPY][winPX]==""){
				if(testMovePossible(winPY,winPX,pionSelectWin))
					testnombre+=1;
			}
			else{
				if(testMovePossible(winPY,winPX,pionSelectWin))
					testnombre+=1;
				i=20;
			}
		}
		else{i=20;}
	}
	return testnombre;
}
function simpleMovesWin(winY,winX,winXMT){
	var testnombre=0;
	if(winY>-1&&winX>-1&&winY<8&&winX<8){
		if((undefined==winXMT||winXMT=="move")&&pion[winY][winX]==""){
			if(testMovePossible(winY,winX,pionSelectWin))
				testnombre+=1;
		}
		else if((undefined==winXMT||winXMT=="kill")&&!pion[winY][winX]==""&&!pion[winY][winX].includes(couleur)&&!pion[winY][winX].includes("♔")){
			if(testMovePossible(winY,winX,pionSelectWin))
				testnombre+=1;
		}
	}
	return testnombre;
}
