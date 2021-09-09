class Scene4 extends Phaser.Scene {
	
	constructor(){
		super('Scene4');
	}
	
	preload(){
		console.log('preload');
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		//addBackGround('11');
		_this.add.image(0, 0, 'background1A', 0).setOrigin(0,0);
		_this.add.image(2880, 0, 'background1B', 0).setOrigin(0,0);
		
		_this.backgroundPixels = _this.add.image(0, 0, 'backgroundPixels', 0).setOrigin(0,0);
		_this.backgroundPixels.setScrollFactor(0);


		addFullScreenButton('');	
		addSoundButton();		
		

		//this.physics.world.bounds.width = 
		
/* LIMITS
	(eje x) minimo : 400
	(eje y) maximo 900 (-y), minimo 650(+y)
	minimo 10 plataformas maximo 16
*/

/*=============================
FIRST LEVEL (Tutorial)

- numPlatforms : 9
- goal limit : 5100
- win : 4800
- camera : 5760
*/

		level_platformsX = [100, 600, 1200, 1800, 2500, 3000, 3700, 4300, 4800];
		level_platformsY = [900, 850, 800,  800,  800,  700,  800,  700,  850];
		level_platformsColor = [1, 2, 3,  4,  5,  6,  7,  4,  2];
        let numPlatforms = 9; // Number of platforms per level


/*=============================
SECOND LEVEL (Aprobado?)

- numPlatforms : 12
- goal limit : 7600
- win : 7600
- camera : 8300

		level_platformsX = [110, 780, 1400, 2000, 2650, 3200, 3800, 4250, 4800, 5400, 6000, 6800 ];
		level_platformsY = [900, 780, 630,  900,  710,  850,  620,  870, 810, 730, 640, 880];
		level_platformsColor = [5, 1, 3,  1,  7,  6,  2,  1,  5, 3, 7, 1];
        let numPlatforms = 12; // Number of platforms per level
*/


/*=============================
THIRD LEVEL (Aprobado?)

- numPlatforms : 11
- goal limit : 7800
- win : 7800
- camera : 8300

		level_platformsX = [100, 960, 1600, 2350, 2900, 3600, 4200, 4850, 5500, 6400, 7000];
		level_platformsY = [630, 780, 830, 700,  850,  620,  870, 750, 640, 800, 720];
		level_platformsColor = [5, 1, 3, 7,  6,  2,  1, 3, 5, 1, 6];
        let numPlatforms = 11; // Number of platforms per level
*/





		/*player*/
		//game.player  = this.physics.add.image(200, 300, 'player').setOrigin(0, 0);
		game.player  = this.physics.add.image(250, 100, 'player1');
		//game.player.setScale(1.5)
		game.player.body.setSize(100, 420)

		game.player.setBounce(0.1); // our player will bounce from items
    	//game.player.setCollideWorldBounds(false); // don't go out of the map
    	game.player.setGravity(0, 1000)

    	_this.cameras.main.setBounds(0,0, 5760, game.config.height);
    	_this.cameras.main.startFollow(game.player);
        //horizontalCamera = _this.cameras.add(0,0, game.config.width, game.config.height);

    	//_this.cameras.main.setZoom(2);
    	pointer = _this.input.activePointer;

    	
    	currentPlatform = game.lastPlatform ? game.lastPlatform: 0;
    	canLaunch = true;


    	for(var i = 0; i< numPlatforms; i++){
    		addPlatform(i);	
    	}
    	_this.add.image(0, 990, 'backgroundBottom1A', 0).setOrigin(0,0);
    	_this.add.image(2880, 990, 'backgroundBottom1B', 0).setOrigin(0,0);		
		

    	for(var i = 0; i< numPlatforms; i++){
    		_this.physics.add.image(platforms[i].x - 60, game.config.height - 120, 'platformBottom').setOrigin(0,0);	
    	}

    	game.player.x = platforms[currentPlatform].x + (platforms[currentPlatform].width/2);
    	game.player.y = platforms[currentPlatform].y - 220;

    	let goal = _this.physics.add.image(5100, 210, 'goal').setOrigin(0, 0);
    	goal.body.setSize(600, 100).setOffset(0, 750);
    	goal.setImmovable(true)

    	let win = _this.physics.add.image(4800, 540, 'scene4GoodJob');
    	win.setVisible(false);
    	

    	_this.physics.add.collider(game.player, goal, (player, goal) =>{			

			if(game.player.body.touching.down && goal.body.touching.up){
				game.player.setVelocityX(0.4);
				game.player.setVelocityY(0);	
				//win.x = _this.cameras.main.midPoint.x;
				//win.y = _this.cameras.main.midPoint.y;
				win.setVisible(true);
				game.lastPlatform = 0;
				this.time.delayedCall(10000, () => {
					this.scene.start('Scene1');
				});
			}
			
		});		


		_this.input.on('pointerdown', function(){
		});

		_this.input.on('pointerup', function(){			
			if(canLaunch){
				launch(touchDuration);
				game.player.setTexture('player4');
				game.player.body.setSize(200, 420)
				canLaunch = false;				
				touchDuration = 0;
			}
		});
	}
		
	update(){
		
		if(game.player.y > (game.config.height + 400)){
			game.lastPlatform = currentPlatform;
			_this.scene.restart();
		}

		if(pointer.isDown && canLaunch){
			touchDuration+=6;
			game.player.setTexture('player2');
			game.player.body.setSize(100, 382)
			
			if(platforms[currentPlatform].y < (game.config.height - 150)){				
				platforms[currentPlatform].y+= 6;
				game.player.y+= 6;				
			}
			
		}
	}	
}