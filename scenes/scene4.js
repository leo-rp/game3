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
		addBackGround('11');
		
		addFullScreenButton('');	
		addSoundButton();		
		

		//this.physics.world.bounds.width = 
		
		
		//x minimo : 400
		//y  maximo 900 , minimo 650
		//minimo 10 plataformas maximo 16

		level_platformsX = [100, 600, 1200, 1800, 2500, 3000, 3700, 4300, 4800];
		level_platformsY = [900, 850, 800,  800,  800,  700,  800,  700,  850];
		level_platformsColor = [1, 2, 3,  4,  5,  6,  7,  4,  2];
		
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
    	
    	for(var i = 0; i< 9; i++){
    		addPlatform(i);	
    	}
    	_this.backgroundImageBottom = _this.add.image(0, 990, 'background11Bottom', 0).setOrigin(0,0);		

    	for(var i = 0; i< 9; i++){
    		_this.physics.add.image(platforms[i].x - 60, game.config.height - 120, 'platformBottom').setOrigin(0,0);	
    	}

    	game.player.x = platforms[currentPlatform].x + (platforms[currentPlatform].width/2);
    	game.player.y = platforms[currentPlatform].y - 500;

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