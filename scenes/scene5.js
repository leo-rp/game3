class Scene5 extends Phaser.Scene {
	
	constructor(){
		super('Scene5');
	}
	
	preload(){
		console.log('preload');
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		//addBackGround('11');
		_this.add.image(0, 0, 'background5', 0).setOrigin(0,0);
		_this.add.image(2800, 0, 'background5', 0).setOrigin(0,0);
		_this.add.image(5600, 0, 'background5', 0).setOrigin(0,0);
		
		
		let backgroundPixels = _this.add.image(0, 0, 'backgroundPixels', 0).setOrigin(0,0);
		backgroundPixels.setScrollFactor(0);
		pointer = _this.input.activePointer;


		addFullScreenButton('');	
		addSoundButton();		
		

		/* LIMITS
		(eje x) minimo : 400
		(eje y) maximo 900 (-y), minimo 650(+y)
		minimo 10 plataformas maximo 16
		*/

		/*=============================
		/*SECOND LEVEL
		- numPlatforms : 12
		- goal limit : 7600
		- camera : 8300
		*/

		level_platformsX = [110, 780, 1400, 2000, 2650, 3200, 3800, 4250, 4800, 5400, 6000, 6800 ];
		level_platformsY = [900, 780, 630,  900,  710,  850,  620,  870, 810, 730, 640, 880];
		level_platformsColor = [5, 1, 3,  1,  7,  6,  2,  1,  5, 3, 7, 1];
        let numPlatforms = 12; 
        let goalX = 7600;        
        let cameraWidth = 8300;

        /*=============================*/

		

		game.progressBar = _this.add.image(50, 50, 'progressBar', 0).setOrigin(0,0);
    	game.progressBar.setScrollFactor(0);
    	game.progressBarFill = _this.add.image(178, 62, 'progressBarFill', 0).setOrigin(0,0);
    	game.progressBarFill.setScrollFactor(0);
    	game.progressBarFill.setCrop(0, 0, 0, 0);
    	_this.add.image(150, 150, 'star2', 0).setOrigin(0,0).setScrollFactor(0);


    	 _this.add.image(game.config.width- 400, 50, 'score', 0).setOrigin(0,0).setScrollFactor(0);
    	
    	let style = {fontFamily: 'gotham-bold', fontSize: 60, color: "#ffffff", align: 'center', fontStyle: 'italic'};
		game.scoreText = this.add.text(1600, 65, score+"", style);
		game.scoreText.setScrollFactor(0);
		


		/*player*/		
		game.player  = this.physics.add.image(250, 100, 'player1');		
		game.player.body.setSize(100, 420)

		game.player.setBounce(0.1);
    	//game.player.setCollideWorldBounds(false); // don't go out of the map
    	game.player.setGravity(0, 1000)
    	_this.cameras.main.setBounds(0,0, cameraWidth, game.config.height);
    	_this.cameras.main.startFollow(game.player);
    	//_this.cameras.main.setZoom(2);    	
    	
    	currentPlatform = game.lastPlatform ? game.lastPlatform: 0;
    	score = game.score ? game.score: 0;

    	canLaunch = true;
    	
    	for(var i = 0; i< numPlatforms; i++){
    		addPlatform(i);	
    	}
    	_this.add.image(0, 990, 'backgroundBottom5', 0).setOrigin(0,0);
    	_this.add.image(2800, 990, 'backgroundBottom5', 0).setOrigin(0,0);
    	_this.add.image(5600, 990, 'backgroundBottom5', 0).setOrigin(0,0);
    	
		
    	/*
    	for(var i = 0; i< numPlatforms; i++){
    		_this.physics.add.image(platforms[i].x - 60, game.config.height - 120, 'platformBottom').setOrigin(0,0);	
    	}
    	*/

    	game.player.x = platforms[currentPlatform].x + (platforms[currentPlatform].width/2);
    	game.player.y = platforms[currentPlatform].y - 220;

    	let goal = _this.physics.add.image(goalX, 210, 'goal').setOrigin(0, 0);
    	goal.body.setSize(700, 100).setOffset(-100, 750);
    	goal.setImmovable(true)

    	
    	
    	let win = _this.physics.add.image(cameraWidth-960, 540, 'scene5GoodJob');
    	win.setVisible(false);
    	
    	updateProgressBar(currentPlatform)

    	_this.physics.add.collider(game.player, goal, (player, goal) =>{			
    		/*win*/
			if(game.player.body.touching.down && goal.body.touching.up){
				game.player.setVelocityX(0.4);
				game.player.setVelocityY(0);	
				//win.x = _this.cameras.main.midPoint.x;
				//win.y = _this.cameras.main.midPoint.y;
				game.progressBarFill.setCrop(0, 0, game.progressBarFill.width, game.progressBarFill.height);
				game.lastPlatform = 0;
				game.score = score;

				this.time.delayedCall(600, () => {
					win.setVisible(true);
				});

				
				this.time.delayedCall(10000, () => {
					this.scene.start('Scene6');
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

		addSnowFlakes();
	}
		
	update(){

		updateSnowFlakes();
		
		if(game.player.y > (game.config.height + 400)){
			game.lastPlatform = currentPlatform;
			game.score = score;
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