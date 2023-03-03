var m,t,mouve;
function preload() {

}
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
	h=0;
	m=2;
	s=5;
	fait='Start';
	document.getElementById('stop').style.visibility='hidden';
	document.getElementById('Start').style.visibility='visible';
}
function draw() {
	background(255);

	hselect=document.getElementById('heure').value;
	mselect=document.getElementById('minute').value;
	sselect=document.getElementById('seconde').value;
	if(hselect<0){hselect=0;}
	if(mselect<0){mselect=0;}
	if(sselect<0){sselect=0;}
	if(mselect>60){mselect=60;}
	if(sselect>60){sselect=60;}
	document.getElementById('heure').value=hselect;
	document.getElementById('minute').value=mselect;
	document.getElementById('seconde').value=sselect;
	if(fait=='Start'){
		h=hselect;
		m=mselect;
		s=sselect;
	}
	document.getElementById('titre').innerHTML=t;
if(h<10){t="0"+h+":";}
else{t=h+":";}

if(m<10){t+="0"+m+":";}
else{t+=m+":";}

if(s<10){t+="0"+s;}
else{t+=s;}
textSize(window.innerWidth/7);
textAlign(CENTER);
text(t,width/2,height/2);
}
function temps(){
	if(s==0 && (m!=0 || h!=0)){
		m-=1;
		s=59;
		if(h!=0){
			if(m==0){
				h-=1;
				m=59;
			}
		}
	}
	else{
		if(s==0 && m==0 && h==0){
			fait='Start';
			clearInterval(ss);
			document.getElementById('stop').style.visibility='hidden';
			document.getElementById('Start').style.visibility='visible'
		}
		else{
			s-=1;
		}
	}
}