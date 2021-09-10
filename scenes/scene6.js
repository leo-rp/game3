class Scene6 extends Phaser.Scene {
	
	constructor(){
		super('Scene6');
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

		/*=============================*/
		/*THIRD LEVEL (Aprobado?)

		- numPlatforms : 10
		- goal limit : 8600
		- win : 8200
		- camera : 9000
		*/

		level_platformsX = [100, 880, 1800, 2700, 3600, 4600, 5500, 6250, 7150, 7950];
		level_platformsY = [790, 780, 830, 850, 760, 870, 740, 800, 720, 820];
		level_platformsColor = [3, 4, 1, 5, 2, 5, 4, 1, 7, 3];
        let numPlatforms = 10;
        let goalX = 8600;        
        let cameraWidth = 9000;


		/*=============================*/

		game.progressBar = _this.add.image(50, 50, 'progressBar', 0).setOrigin(0,0);
    	game.progressBar.setScrollFactor(0);
    	game.progressBarFill = _this.add.image(178, 62, 'progressBarFill', 0).setOrigin(0,0);
    	game.progressBarFill.setScrollFactor(0);
    	game.progressBarFill.setCrop(0, 0, 0, 0);
    	_this.add.image(150, 150, 'star3', 0).setOrigin(0,0).setScrollFactor(0);


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
    	_this.add.image(0, 990, 'backgroundBottom1A', 0).setOrigin(0,0);
    	_this.add.image(2880, 990, 'backgroundBottom1B', 0).setOrigin(0,0);		
		

    	for(var i = 0; i< numPlatforms; i++){
    		_this.physics.add.image(platforms[i].x - 60, game.config.height - 120, 'platformBottom').setOrigin(0,0);	
    	}

    	game.player.x = platforms[currentPlatform].x + (platforms[currentPlatform].width/2);
    	game.player.y = platforms[currentPlatform].y - 220;

    	let goal = _this.physics.add.image(goalX, 210, 'goal').setOrigin(0, 0);
    	goal.body.setSize(600, 100).setOffset(-100, 750);
    	goal.setImmovable(true)

    	
    	
    	let win = _this.physics.add.image(cameraWidth-960, 540, 'scene6GoodJob');
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
