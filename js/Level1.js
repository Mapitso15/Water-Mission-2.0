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
 this.load.image ('ocean', 'assets/ocean5.png');
 this.load.image('player', 'assets/scubac1.png');
 this.load.image('ground', 'assets/coral.png');
 this.load.image('obstacle1', 'assets/shipwreck1.png' );
 this.load.image('enemy1', 'assets/octup1.png');
 this.load.image('enemy2', 'assets/seahorse1.png');
 this.load.image('ruby', 'assets/ruby.png');
 this.load.image('fish', 'assets/shark1.png');
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


 /*this.add.image(400, 300, 'fish');

    var image1 = this.add.image(1500, 1200, 'fish', 0);

    this.tweens.add({
        targets: image1,
        props: {
            x: { value: 700, duration: 2000, flipX: true },
            y: { value: 100, duration: 3000,  },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });*/

var image2 = this.add.image(1900, 80, 'fish', 1);

    this.tweens.add({
        targets: image2,
        props: {
            x: { value: 1120, duration: 2000, flipX: true },
            y: { value: 600, duration: 10000,  },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });
	
/* var image3 = this.add.image(1600, 200, 'fish', 2).setFlipX(true);

    this.tweens.add({
        targets: image3,
        props: {
            x: { value: 70, flipX: true },
            y: { value: 150 },
        },
        duration: 3000,
        ease: 'Power1',
        yoyo: true,
        repeat: -1
    });


 /* var image4 = this.add.image(1800, 550, 'fish', 2).setScale(0.75);

    this.tweens.add({
        targets: image4,
        props: {
            x: { value: 700, duration: 2000, flipX: true },
            y: { value: 50, duration: 15000,  },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });	

//add items
/*this.items = this.add.group({
	key: 'obstacle1',
	setXY: {
		x:800,
		y:500
	}
});
this.items = this.add.group({
	key: 'obstacle2',
	setXY: {
		x:40,
		y:520
	}
});*/

//Player

player = this.physics.add.sprite(100, 700, 'player');

player.setCollideWorldBounds(true);

/*this.anims.create({
     key: 'right',
     frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
     frameRate: 10,
     repeat: -1
 });*/

 cursors = this.input.keyboard.createCursorKeys();

//
//  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(0, 0, 2400 , 600);
    this.physics.world.setBounds(0, 0, 2400 , 600);

    //  Mash 4 images together to create our background

this.cameras.main.startFollow(player);

/*this.cameras.main.followOffset.set(-300, 0);*/
//end camera
//add enemy1
 this.physics.world.gravity.y = 60;

    var group = this.physics.add.group({
        defaultKey: 'enemy1',
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true
    });

	

    group.create(200, 300).setVelocityX(280);
    group.create(350, 300).setGravity(0, 120);
  group.create(2000, 300).setGravity(0, -120);
   group.create(1500, 300).setGravity(0, -180);
    group.create(600, 300, 'enemy1').body.allowGravity = true;

	//add enemy2
  var sprite1 = this.add.image(1000, 100, 'enemy2');
  var sprite2 = this.add.image(400, 100, 'enemy2');


    //add shark
    //sprite3 = this.add.image(1450, 150, 'shark');

    this.physics.world.enable([ sprite1, sprite2]);

   sprite1.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
   sprite2.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

//this.physics.add.collider(player, group, sprite1, sprite2, null, this);
    //collider
   /* this.physics.add.collider(player, sprite1, null, this);
    this.physics.add.collider(player, sprite2, null, this);
	//this.physics.add.collider(player, sprite3);*/
	
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
this.physics.add.overlap(player, sprite1, collectRuby2, null, this);
this.physics.add.overlap(player, sprite2, collectRuby3, null, this);

platforms.create(370, 538, 'ground');
platforms.create(1200, 538, 'ground');
platforms.create(720, 270, 'rock1');
platforms.create(100, 170, 'rock2');
platforms.create(900, 580, 'rock2');
platforms.create(2200, 508, 'obstacle1');
platforms.create(1900, 230, 'rock1');
platforms.create(1500, 550, 'rock2');
//collectRuby

/*this.physics.add.collider(player,group, hitBomb, null, this);
function hitBomb (player,group)
{
    this.physics.pause();

    player.gameObject.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
	
	var gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', { fontSize: '32px', fill: '#fff' });
}*/

// Shark zone
function collectRuby1 (player, group)
{
    group.disableBody(true, true);
	 player.setTint(0xff0000);
this.physics.pause();
    score += 5;
	//this.add.text(900, 0, 'Score: ' + score).setFont('32px Arial Black').setFill('#ffffff');
	 //gameText = this.add.text(16, 16, 'GAME OVER',{fontSize:'80', fill:'#fffff'});
	 gameText = this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', { fontSize: '50px', fill: '#0xff0000' })
	 

    //scoreText.setText('Score: ' + score);
}

function collectRuby2 (player, sprite1)
{
    sprite1.disableBody(true, true);
	 player.setTint(0xff0000);
this.physics.pause();
 
	 gameText = this.add.text(16, 16, 'GAME OVER',{fontSize:'32', fill:'#fffff'});

    //scoreText.setText('Score: ' + score);
}
function collectRuby2 (player, sprite2)
{
    sprite1.disableBody(true, true);
	 player.setTint(0xff0000);
this.physics.pause();
    
	 gameText = this.add.text(16, 16, 'GAME OVER',{fontSize:'32', fill:'#fffff'});

    //scoreText.setText('Score: ' + score);
}
function collectRuby3 (player, sprite2)
{
    sprite2.disableBody(true, true);
	 player.setTint(0xff0000);
this.physics.pause();
   
	 gameText = this.add.text(16, 16, 'GAME OVER',{fontSize:'32', fill:'#fffff'});

    //scoreText.setText('Score: ' + score);
}
function collectRuby (player, ruby)
{
    ruby.disableBody(true, true);

    score += 5;
	 this.add.text(800, 16, 'Score:'+ score, { fontSize: '32px', fill: '#ffffff' });

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




/*this.physics.world.collide(sprite1,sprite2);

function collectStar (player, ruby)
{
    ruby.disableBody(true, true);
}*/


