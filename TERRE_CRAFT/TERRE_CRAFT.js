let player, groundSensor, grass, water, coins;
let grassImg, waterImg, coinsImg, charactersImg,txt;
let score = 0;
let back,block,item;
var rooms = new Array();
function preload() {
	grassImg = loadImage('image/grass.png');
	waterImg = loadImage('image/water.png');
	coinsImg = loadImage('image/coin.png');
	charactersImg = loadImage('image/characters.png');
	//txt = loadStrings("./rooms/startRoom.txt", 'txt');
	rooms[0]=room_tuils("room1");
	rooms[1]=room_tuils("room2");

}

function room_tuils(room) {
    this.back = loadStrings("./rooms/"+room+"/back.txt", 'txt');
    this.block = loadStrings("./rooms/"+room+"/block.txt", 'txt');
    this.item = loadStrings("./rooms/"+room+"/item.txt", 'txt');
	return this;
}

function windowResized() {
	new Canvas(initwidth, initheight, 'pixelated');
}

function setup() {
	initwidth=200;
	initheight=160;
	
	new Canvas(initwidth, initheight, 'pixelated');
	camera.x = initwidth/2;
	camera.y = initheight/2;
	world.gravity.y = 10;
	allSprites.pixelPerfect = true;
	
	grass = new Group();
	grass.layer = 0;
	grass.collider = 'static';
	
	grass.img = grassImg;
	grass.tile = 'g';


	test1 = new Group();
	test1.layer = 0;
	test1.collider = 'dynamic';
	test1.img = grassImg;
	test1.h = 13;
	test1.w = 13;
	test1.tile = 't';

	water = new Group();
	water.layer = 2;
	water.collider = 'static';
	water.img = waterImg;
	water.h = 2;
	water.tile = 'w';

	coins = new Group();
	coins.collider = 'static';
	coins.spriteSheet = coinsImg;
	coins.addAni({ w: 16, h: 16, row: 0, frames: 14 });
	coins.tile = 'c';
	back = new Tiles(
		rooms[0].back,
		-4,-0,16,16
	);
	block = new Tiles(
		rooms[0].block,
		-4,-0,16,16
	);
	item = new Tiles(
		rooms[0].item,
		-4,-0,16,16
	);

	player = new Sprite(48, 100, 10, 14);
	player.layer = 1;
	player.anis.w = 16;
	player.anis.h = 16;
	player.anis.offset.y = 1;
	player.anis.frameDelay = 8;
	player.spriteSheet = charactersImg;
	console.log(player.frames);
	player.addAnis({
		idle: { row: 0, frames: 4 },
		knockback: { row: 0, frames: 1 },
		run: { row: 1, frames: 3 },
		jump: { row: 1, col: 3, frames: 2 }
	});
	player.ani = 'idle';
	player.rotationLock = true;

	// IMPORTANT! prevents the player from sticking to the sides of walls
	player.friction = 0;

	player.overlaps(coins, collectCoin);

	// This groundSensor sprite is used to check if the player
	// is close enough to the ground to jump. But why not use
	// `player.colliding(grass)`? Because then the player could
	// jump if they were touching the side of a wall!
	// Also the player's collider bounces a bit when it hits
	// the ground, even if its bounciness is set to 0. When
	// making a platformer game, you want the player to 
	// be able to jump right after they land.
	// This approach was inspired by this tutorial:
	// https://www.iforce2d.net/b2dtut/jumpability
	noStroke()
	groundSensor = new Sprite(player.x, player.y+8, 7, 4);
	groundSensor.color =color(0, 255, 0,128)
	groundSensor.visible = true;
	groundSensor.mass = 0.01;
	groundSensor.overlaps(allSprites);
	new GlueJoint(player, groundSensor);
	ceilingSensor = new Sprite(player.x, player.y-8, 7, 4);
	ceilingSensor.color =color(0, 255, 0,128)
	ceilingSensor.visible = true;
	ceilingSensor.mass = 0.01;
	ceilingSensor.overlaps(allSprites);
	new GlueJoint(player, ceilingSensor);
	
	deadSensor = new Sprite(player.x, player.y+2, 10, 14);
	deadSensor.color =color(255, 204, 0,128)
	deadSensor.visible = true;
	deadSensor.mass = 0.01;
	deadSensor.overlaps(allSprites);
	new GlueJoint(player, deadSensor);
	

	textAlign(CENTER);
}

function collectCoin(player, coin) {
	coin.remove();
	score++;
}

function draw() {
	background('skyblue');
	fill(255);
	text('Score: ' + score, 160, 20);

/*
	// make the player slower
	if (groundSensor.overlapping(water)) {
		player.drag = 20;
		player.friction = 10;
	} else {
		player.drag = 0;
		player.friction = 0;
	}
*/
	player.vel.x = 0;
	player.ani = 'idle';
	if (!ceilingSensor.overlapping(grass) && groundSensor.overlapping(grass) && (kb.pressing('up') || kb.pressing('space') || contro.pressing('up'))) {
		//player.ani = 'jump';
		player.vel.y = -3.5;
	}
	if (kb.pressing('left') || contro.pressing('left')) { player.vel.x += -1.5; }
	if (kb.pressing('right') || contro.pressing('right')) { player.vel.x += 1.5; }
	if (player.vel.x < 0) { player.ani = 'run'; player.mirror.x = true; }
	if (player.vel.x > 0) { player.ani = 'run'; player.mirror.x = false; }
/*
	if(!(deadSensor.overlapping(monster) && groundSensor.overlapping(monster))){
		//mechan meure
	}
	else if(deadSensor.overlapping(monster)){
		//player meure
	}
*/

	// if player falls, reset them
	if ((player.y > 400 || deadSensor.overlapping(water))) {
		player.speed = 0;
		player.x = 48;
		player.y = 100;
	}
}