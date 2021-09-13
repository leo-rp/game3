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
		
		_this.add.image(0, 0, 'background6', 0).setOrigin(0,0).setScrollFactor(0);
		game.water = [];
		game.water[0] = _this.add.tileSprite(0, 230, 1920, 1080, 'water2').setOrigin(0,0).setScrollFactor(0);
		game.water[1] = _this.add.tileSprite(0, 140, 1920, 216, 'water1').setOrigin(0,0).setScrollFactor(0);		
		

		game.water[2] = _this.add.tileSprite(0, 500, 1920, 675, 'waterBottom2', 0).setOrigin(0,0).setScrollFactor(0);		
		game.water[3] = _this.add.tileSprite(0, 700, 1920, 403, 'waterBottom1', 0).setOrigin(0,0).setScrollFactor(0);		

		for(var i = 0; i< 6; i++){    	
			_this.add.image((i * 1920), 960, 'floor6A', 0).setOrigin(0,0);
			_this.add.image((i * 1920), 780, 'floor6B', 0).setOrigin(0,0);
		}
				
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
		level_platformsColor = [1, 4, 3, 5, 2, 5, 4, 1, 7, 3];
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
    	game.player.setGravity(0, 1000)
    	_this.cameras.main.setBounds(0,0, cameraWidth, game.config.height);
    	_this.cameras.main.startFollow(game.player);    	
    	
    	currentPlatform = game.lastPlatform ? game.lastPlatform: 0;
    	score = game.score ? game.score: 0;

    	canLaunch = true;
    	
    	for(var i = 0; i< numPlatforms; i++){
    		addPlatform(i);	
    	}

		for(var i = 0; i< 6; i++){    	
    		_this.add.image((i * 1920), 990, 'backgroundBottom6', 0).setOrigin(0,0);    	
    	}
		
    	game.player.x = platforms[currentPlatform].x + (platforms[currentPlatform].width/2);
    	game.player.y = platforms[currentPlatform].y - 220;

    	let goal = _this.physics.add.image(goalX, 210, 'goal').setOrigin(0, 0);
    	goal.body.setSize(600, 100).setOffset(-100, 750);
    	goal.setImmovable(true)

    	let win = _this.physics.add.image(cameraWidth-960, 600, 'scene6GoodJob').setDepth(1);
    	win.setVisible(false);
    	let winMusic = true;
    	updateProgressBar(currentPlatform)

    	game.nextSceneButton = this.add.image(8650, 930,'nextSceneButton').setInteractive().setScale(1).setDepth(1);
		game.nextSceneButton.setVisible(false);
		game.nextSceneButton.on('pointerdown', function(){
			gameMusic.startGame.play();		
			game.nextSceneButton.setTint(0xf18a00);				
		});
		
		game.nextSceneButton.on('pointerup', function () {
				this.scene.start('Scene1');
		}, _this);

    	_this.physics.add.collider(game.player, goal, (player, goal) =>{			
    		/*win*/
			if(game.player.body.touching.down && goal.body.touching.up){
				game.player.setVelocityX(0.4);
				game.player.setVelocityY(0);	
				game.progressBarFill.setCrop(0, 0, game.progressBarFill.width, game.progressBarFill.height);
				game.lastPlatform = 0;
				game.score = score;
				
				if(winMusic){
					addBubbles();
					gameMusic.win.play();						
					winMusic = false;
				}


				this.time.delayedCall(600, () => {
					win.setVisible(true);
					game.nextSceneButton.setVisible(true);
				});

				
				this.time.delayedCall(20000, () => {
					this.scene.start('Scene1');
				});
			}			
		});		

    	let canAddBubbles = true;
		_this.input.on('pointerdown', function(){
			if(canAddBubbles){
				addBubbles();
				canAddBubbles = false;
			}
		});

		_this.input.on('pointerup', function(){	
			canAddBubbles = true;		
			if(canLaunch && (pointer.x < 1800 && pointer.y > 200)){
				gameMusic.jump.play();	
				launch(touchDuration);
				game.player.setTexture('player4');
				game.player.body.setSize(200, 420)
				canLaunch = false;				
				touchDuration = 0;
			}
		});

		bubbles = [];
		lastBubbles = 0;
	}
		
	update(){

		game.water[0].tilePositionX+= 2;	
		game.water[1].tilePositionX-= 2;	
		game.water[2].tilePositionX+= 0.5;	
		game.water[3].tilePositionX-= 0.5;	

		updateBubbles();

		if(game.player.y > (game.config.height + 400)){
			game.lastPlatform = currentPlatform;
			game.score = score;
			gameMusic.lose.play();
			
			_this.scene.restart();
		}

		if(pointer.isDown && canLaunch && (pointer.x < 1800 && pointer.y > 200)){
		
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
