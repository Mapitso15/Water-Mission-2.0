var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false,
            setBounds: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var map;
var player;
var cursors;
var platforms;
var gameText;
var gameOver = false;
var score = 0;
var scoreText;
var groundLayer;
var rubyLayer;
var ruby;
var collectStar;


//var scoreText.fixedToCamera = true;

function preload()
{
 this.load.image ('ocean', 'assets/under3.png');
 this.load.image('player', 'assets/scubac1.png');
 this.load.image('ground', 'assets/coral.png');
 this.load.image('obstacle1', 'assets/shipwreck1.png' );
 this.load.image('enemy1', 'assets/octup1.png');
 this.load.image('enemy2', 'assets/seahorse1.png');
 this.load.image('ruby', 'assets/ruby.png');
 this.load.image('fish', 'assets/shark12.png');
 this.load.image('ruby', 'assets/yellowdiamond1.png');
 this.load.image('rock1', 'assets/rocklayer1.png');
 this.load.image('rock2', 'assets/rocklayer2.png');
 this.load.image('float', 'assets/float.png');
 this.load.image('reefrock', 'assets/reefrock.png');
 this.load.image('ship2', 'assets/shipwreck2.png');
 

 //this.load.image('fish', 'assets/shark1.png', { frameWidth: 200, frameHeight: 80 });
}

function create()
{

 //background image
this.add.sprite(0,0, 'ocean').setOrigin(0,0);





//Player

player = this.physics.add.sprite(100, 700, 'player');

player.setCollideWorldBounds(true);


 cursors = this.input.keyboard.createCursorKeys();

//  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(0, 0, 2400 , 600);
    this.physics.world.setBounds(0, 0, 2400 , 600);

    

this.cameras.main.startFollow(player);


 this.physics.world.gravity.y = 60;

    var group = this.physics.add.group({
        defaultKey: 'enemy1',
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true
    });

    var group = this.physics.add.group({
        defaultKey: 'enemy2',
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true
    });

    var group = this.physics.add.group({
        defaultKey: 'fish',
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true
    });






    group.create(200, 300, 'enemy2').setVelocityX(280);
    //group.create(350, 300).setGravity(0, 120);
  group.create(1300, 300, 'enemy2').setGravity(0, -120);
   group.create(1500, 300, 'enemy2').setGravity(0, -180);
  group.create(550, 300, 'enemy1').setGravity(0, -120);
  group.create(800, 300, 'enemy1').body.allowGravity = true;
  group.create(1700, 300, 'enemy1').setVelocityX(280);
  group.create(1200, 300, 'enemy1').body.allowGravity = true;
 group.create(2100, 500, 'fish').setGravity(20, -180);


    //ruby
    ruby = this.physics.add.group({
        key: 'ruby',
        repeat: 80,
        setXY: { x: 100, y: 20, stepX: 80 }
    });

    ruby.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });


    //platform for rubies
platforms = this.physics.add.staticGroup();
this.physics.add.collider(ruby, platforms);
this.physics.add.collider(player, platforms);
//this.physics.add.overlap(player, fish, null, this);
this.physics.add.overlap(player, ruby, collectRuby, null, this);
this.physics.add.overlap(player, group, collectRuby1, null, this);


platforms.create(350, 538, 'ground');
platforms.create(1300, 280, 'ground');
platforms.create(720, 270, 'rock1');
platforms.create(100, 170, 'rock2');
platforms.create(1000, 580, 'rock2');
platforms.create(2200, 508, 'obstacle1');
platforms.create(1800, 230, 'rock1');
platforms.create(1500, 550, 'rock2');
//collectRuby



// Shark zone
function collectRuby1 (player, group)
{
    group.disableBody(true, true);
	 player.setTint(0xff0000);
this.physics.pause();
   
	
	//this.add.text(900, 0, 'Score: ' + score).setFont('32px Arial Black').setFill('#ffffff');
	 //gameText = this.add.text(16, 16, 'GAME OVER',{fontSize:'80', fill:'#fffff'});
	 gameText = this.add.text(150, 300, 'GAME OVER', { fontSize: '38px', fill: '#FF0000', backgroundColor: '#000000' });
   gameText = this.add.text(550, 300, 'GAME OVER', { fontSize: '38px', fill: '#FF0000', backgroundColor: '#ffffff' });
   gameText = this.add.text(1000, 300, 'GAME OVER', { fontSize: '38px', fill: '#FF0000', backgroundColor: '#000000'});
   gameText = this.add.text(1600, 300, 'GAME OVER', { fontSize: '38px', fill: '#FF0000', backgroundColor: '#ffffff' });
   gameText = this.add.text(2100, 300, 'GAME OVER', { fontSize: '38px', fill: '#FF0000',backgroundColor: '#00000' });




   
}
 //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

scoreText = this.add.text(1300, 16, 'Score:' + score, { fontSize: '32px', fill: '#ffffff' });
scoreText.fixedToCamera = true;

function collectRuby (player, ruby)
{
    ruby.disableBody(true, true);

     score += 5;
 
    scoreText.setText('Score: '+score);
	 

	 //this.add.text(800, 16, 'Score:'+ score, { fontSize: '32px', fill: '#ffffff' });

   if (score === 15)
   {
      gameText = this.add.text(1800, 300, ' Mission Complete!', { fontSize: '35px', fill: '#F00000', backgroundColor: '#ffffff' });
	  gameText = this.add.text(1000, 300, ' Mission Complete!', { fontSize: '35px', fill: '#F00000', backgroundColor: '#000000' });
      this.physics.pause();
   }

    //scoreText.setText('Score: ' + score);
}



}




function update ()
{
    player.setVelocity(10);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-500);
        player.setFlipX(false);
        this.cameras.main.followOffsetX = 300;
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(500);
        player.setFlipX(false);
        this.cameras.main.followOffsetX = -300;
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-500);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(500);
    }


    }




