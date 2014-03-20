/*
Blockbreak 3d
*/
console.log('Loading blockbreak...');

/* Set up 3d environment */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialiasing: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/*
controls = new THREE.TrackballControls( camera );
controls.target.set( 0, 0, 0 )
*/

/* Create game objects */
gameBall = new ball(5, 8); // velocity, radius
gamePaddle = new paddle(100, 10, "#a00"); // width, height, colour
gameScore = new score();
gameLives = new lives();

blockWidth = 1;
blockHeight = 2;

blockRows = 10;
offset = 1; // Move wall down 5 rows
blockCols = 10;

// Create block arrray
blocks = new Array();
for (c = 0; c < blockCols; c++ ){
	blocks[c] = new Array();
	for (r = offset; r < blockRows; r++) {
        blocks[c][r] = new block();
        blocks[c][r].setPosition((c * 5) - 23, r - offset, -8);
        blocks[c][r].create();

        /* Get mesh */
    	scene.add(blocks[c][r].getMesh());
		console.log('Added block ' + c + ', ' + r);
	}
}

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( -2, -2, 1 );
scene.add( directionalLight );

camera.position.z = 5;

/* The game loop */
function render() {
	for (i = -blockCols; i < blockCols; i++) {
    //cubes[i].rotation.x += 0.01;
    //cubes[i].rotation.y += 0.03;
        blocks[1][1].getMesh().translateZ( 0.01 );
	//cube.position.z += 0.1;

	}
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}


function score() {
	this.score = 0;
            this.canvas_id = "canvas";
            this.layer_name = "score";
	this.x = 10;
	this.y = 10;

	this.draw = draw;
	this.hitBlock = hitBlock;

	function hitBlock()
	{
		this.score += 100;
	}

	function draw()
	{
		$(this.canvas_id).drawText({
			fillStyle: "#f00",
			strokeStyle: "#000",
			strokeWidth: 2,
			x: this.x, y: this.y,
			font: "36pt Verdana, Geneva, sans-serif",
			text: this.score,
			fromCenter:  false
		});
	}
}

function lives() {
	this.lives = 3;
            this.canvas_id = "canvas";
            this.layer_name = "lives";
	this.x = 10;
	this.y = 70;

	this.draw = draw;
	this.die = die;
	this.gameOver = gameOver;

	function die()
	{
		this.lives -= 1;
		if (this.lives < 1) {
			this.gameOver();
		}
	}

	function gameOver()
	{
		$(this.canvas_id).drawText({
			fillStyle: "#0f0",
			strokeStyle: "#000",
			strokeWidth: 2,
			x: 300, y: 200,
			font: "36pt Verdana, Geneva, sans-serif",
			text: "GAME OVER!",
			fromCenter:  false
		});
	}

	function draw()
	{
		$(this.canvas_id).drawText({
			fillStyle: "#0f0",
			strokeStyle: "#000",
			strokeWidth: 2,
			x: this.x, y: this.y,
			font: "36pt Verdana, Geneva, sans-serif",
			text: this.lives,
			fromCenter:  false
		});
	}
}

function paddle(width, height, colour) {

	this.height = height;
	this.width = width;
	this.canvas_id = "canvas";
    this.layer_name = "paddle";
	this.topY = 450;
	this.bottomY = this.topY + this.height;
	this.leftX = 200;
	this.rightX = this.leftX + this.width;
	this.colour = "#a00";
	this.x = this.leftX + (this.width / 2);
	this.y = this.topY + (this.height / 2);


	this.draw = draw;
	this.move = move;
	this.updateBounds = updateBounds;

	this.updateBounds();

	function draw()
	{
		$(this.canvas_id).drawRect({
		  name: this.layer_name,
		  fillStyle: this.colour,
		  x: this.leftX, y: this.topY,
		  width: this.width,
		  height: this.height,
		  fromCenter: false
		});
	}

	function move(x)
	{
		this.x = x;
		this.updateBounds();
	}

	function updateBounds()
	{
		this.topY = this.y - (this.height / 2);
		this.bottomY = this.y + (this.height / 2);
		this.leftX = this.x - (this.width / 2);
		this.rightX = this.x + (this.width / 2);
	}
}

function ball(velocity, radius) {
	// Variables
	this.x = 301;
	this.y = 300;
	this.canvas_id = "canvas";
	this.layer_name = "ball";
	this.velocityX = velocity;
	this.velocityY = velocity;
	this.radius = radius;
	this.topY = this.y - this.radius;
	this.bottomY = this.y + this.radius;
	this.leftX = this.x - this.radius;
	this.rightX = this.x + this.radius;

	// Methods
	this.draw = draw;
	this.move = move;
	this.reset = reset;

	/*
	Draw the ball

	return void
	*/
	function draw()
	{
		$(this.canvas_id).drawArc({
		  layer: true,
		  name: this.layer_name,
		  fillStyle: "#ff0000",
		  x: this.x, y: this.y,
		  radius: this.radius
		});
	}

	function move()
	{
		this.x += this.velocityX;
		this.y += this.velocityY;
		this.topY = this.y - this.radius;
		this.bottomY = this.y + this.radius;
		this.leftX = this.x - this.radius;
		this.rightX = this.x + this.radius;
	}

	// Calculate and return a new position, don't set it though

	function reset()
	{
		this.x = 301;
		this.y = 300;
	}

	this.hello = hello;
	function hello()
	{
		alert('here');
	}
}

render();
