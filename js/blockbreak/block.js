/* @todo - do we create first, then set attributes or create after?.. probably first so change it. */

function block() {

    /* Defaults */
    this.scoreValue = 1;

    this.shapeX = 5;
    this.shapeY = 1;
    this.shapeZ = 1;

    this.positionX = 0;
    this.positionY = 0;
    this.positionZ = 0;

    this.colour = 0;

    this.red = 1;
    this.blue = 1;
    this.green = 1;

    /* Methods */
    this.create = create;
    this.setScoreValue = setScoreValue;
    this.setShape = setShape;
    this.setColour = setColour;
    this.setRandomColour = setRandomColour;
    this.setPosition = setPosition;
    this.getMesh = getMesh;


    this.mesh = 'Call create() on block first.';

    /* Apply a random colour to the block */
    this.setRandomColour();

    function create()
    {
        var geometry = new THREE.CubeGeometry(this.shapeX, this.shapeY, this.shapeZ);
        var material = new THREE.MeshLambertMaterial();
        material.color.setRGB(this.red, this.green, this.blue);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(this.positionX, this.positionY, this.positionZ);
    }

    function setScoreValue(scoreValue)
    {

    }

    function setShape(x, y, z)
    {
        this.shapeX = x;
        this.shapeY = y;
        this.shapeZ = z;

        // Update shape
    }

    function setColour(r, g, b)
    {

    }

    function setRandomColour()
    {
        this.red = Math.floor((Math.random()*5));
        this.green = Math.floor((Math.random()*5));
        this.blue = Math.floor((Math.random()*5));
    }

    function setPosition(x, y, z)
    {
        this.positionX = x;
        this.positionY = y;
        this.positionZ = z;

        /* If it's created */
        //this.mesh.position.set(x, y, z);
    }

    function getMesh()
    {
        return this.mesh;
    }
}
