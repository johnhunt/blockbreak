/*
Blockbreak 3d

@todo - Create a base class for the different objects.. everything needs a create() method!
@todo - Tidy up a bit before moving on.
@todo - Use translateX on paddle movement.. should be smoother.

*/
console.log('Loading blockbreak...');

/* Set up 3d environment */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialiasing: true});

var projector = new THREE.Projector(); // Used for mapping the 3d world to the 2d one

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


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

globalDepth = -10;

// Create block arrray
blocks = new Array();
for (c = 0; c < blockCols; c++ ){
	blocks[c] = new Array();
	for (r = offset; r < blockRows; r++) {
        blocks[c][r] = new block();
        blocks[c][r].setPosition((c * 5) - 23, r - offset, globalDepth);
        blocks[c][r].create();

        /* Get mesh */
    	scene.add(blocks[c][r].getMesh());
		console.log('Added block ' + c + ', ' + r);
	}
}

// Create paddle
paddle = new paddle();
paddle.create();
paddle.setPosition(0,-10, globalDepth);
scene.add(paddle.getMesh());

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
    // blocks[1][1].getMesh().translateZ( 0.01 ); // movement test
	//cube.position.z += 0.1;

	}
    $('body').mousemove(function(event) {
        var vector = new THREE.Vector3(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1,
            0.5 );

        projector.unprojectVector( vector, camera );

        var dir = vector.sub( camera.position ).normalize();

        var distance = - camera.position.z / dir.z - paddle.positionZ + 5;

        var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
        paddle.setPosition(pos.x, paddle.positionY, paddle.positionZ);
    });


/*
    $('body').mousemove(function(event) {
        paddle.setPosition(event.pageX / 100, paddle.positionY, paddle.positionZ);
    });
*/
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
