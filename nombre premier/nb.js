var Nmax=prompt("Jusqu'à quel nombre voulez-vous calculer les nombres premiers ?(Max 500000000)","");
var ntour,ntrue;
var np = new Array,np=[2];
function setup() {
	for(i=3;i<=Nmax;i=i+2){
		ntour=0,ntrue=true;
		while(ntrue==true && np[ntour]<=Math.ceil(Math.sqrt(i))){
			if(i % np[ntour] === 0)ntrue=false;
			else ntour+=1;
		}
		if(ntrue==true)if(i=>2)np.push(i);
	}
	save(np, 'NP 1 à '+Nmax+'.txt');	
}