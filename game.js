	/*debug settings*/
	let scene;
	let DEBUG = false;
	let fullScreenButton;
	
	/*game elements*/
	
	let gameMusic = {};
	let mute;
	let win = false;
	
	let graphics;		
	let game;
	let config;

	let _this;
	let level;
	let platforms = [];
	let level_platformsX;
	let level_platformsY;
	let level_platformsColor;
	let warningImg = false;
	
	let horizontalCamera; 
	let currentPlatform;
	let score;
	let pointer;
	let touchDuration = 0;
	let canLaunch;
	let snowFlakes = [];
	let bubbles = [];
	let lastBubbles =0;
	let counter = 0;

	if(DEBUG){
		backgroundColor	= '#000fff';
	}else{
		backgroundColor	= '#000000';
	}
	
document.addEventListener("DOMContentLoaded", function(event) {
		loadFont('gotham-bold', 'assets/fonts/gotham_bold.otf');
		loadFont('gotham-medium', 'assets/fonts/gotham_medium.otf');
		loadFont('gotham-regular', 'assets/fonts/gotham_regular.otf');

		config = {
			type: Phaser.AUTO,
			backgroundColor: backgroundColor,		
			scene: [Scene0, Scene1, Scene2, Scene3, Scene4, Scene5 , Scene6],				
			
			scale: {			
				mode: Phaser.Scale.FIT,			
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: 1920, height: 1080
			},
			audio: {
				disableWebAudio: false
			},
			physics: {
				default: 'arcade',
				arcade: {
					//gravity: { y: 800},
					debug: false
				}
			},
			input: {
				activePointers: 1
			} 
		};	
		
		game = new Phaser.Game(config);				
	});
	
	
	/**/
	function checkOrientation(orientation){	
		if(orientation === Phaser.Scale.PORTRAIT){			
			warningImg = _this.add.image(game.config.width/2, game.config.height/2, 'rotateDevice', 0);
			warningImg.setScale(6);
			warningImg.setDepth(1);
			_this.scene.pause();			
			
		}else if(orientation === Phaser.Scale.LANDSCAPE){	
			if (warningImg){
				_this.scene.resume();
				_this.cameras.main.fadeIn(500);		
				warningImg.destroy();				
			}
		}
	}
	
	function addSoundButton(){
			var soundButton = _this.add.image(game.config.width-24, 126, 'soundButton', 0).setOrigin(1, 0).setInteractive();
			soundButton.setScrollFactor(0)

			if(_this.sound.mute){
				soundButton.setFrame(1);
			}else{
				soundButton.setFrame(0);
			}
			soundButton.on('pointerdown', function(){
				soundButton.setTint(0xa61bc9);	
				mute  = _this.sound.mute;
				if(mute){
					_this.sound.setMute(false)//enable sound;
					soundButton.setFrame(0);
				}else{
					_this.sound.setMute(true)//disable sound;
					soundButton.setFrame(1);
				}
				
			});
			
			
			soundButton.on('pointerdown', function(){
				soundButton.clearTint();
			})
	}
	
	function addFullScreenButton(color){		
		if(_this.scale.fullscreen.available){
			fullScreenButton = _this.add.image(game.config.width-24, 32, 'fullscreen'+color, 0).setOrigin(1, 0).setInteractive();
			fullScreenButton.setScrollFactor(0);

			fullScreenButton.on('pointerdown', function(){
				fullScreenButton.setTint(0xa61bc9);	
			});
			fullScreenButton.on('pointerup', function () {
				fullScreenButton.clearTint();	
				
				fullScreenButton.x = game.config.width-24
				if (_this.scale.isFullscreen){
						fullScreenButton.setFrame(0);
						_this.scale.stopFullscreen();
				}else{
					fullScreenButton.setFrame(1);
					_this.scale.startFullscreen();		
					//console.log('forcing');
				}
			}, _this);
		}
		
	}
	
	/*helpers*/
	
	
	function loadFont(name, url) {
		var newFont = new FontFace(name, `url(${url})`);
		newFont.load().then(function (loaded) {
			document.fonts.add(loaded);		
		}).catch(function (error) {
			return error;
		});
	}

		
	function nextScene(number){
		_this.scene.start('Scene'+number);
	}
	

	
	function addPlatform(n){		
		let forceX = 0;
	    let forceY = 0;

		platforms[n] = _this.physics.add.image(level_platformsX[n], level_platformsY[n], 'platform'+ level_platformsColor[n]).setOrigin(0,0);
		 
		platforms[n].setScale(1);
		platforms[n].setImmovable(true);
		platforms[n].body.allowGravity = false;
		platforms[n].id = n;

		_this.physics.add.collider(game.player, platforms[n], (player, platform) =>{			
			game.player.setVelocityX(0);

			if(game.player.body.touching.down && platform.body.touching.up){
				canLaunch = true;
				game.player.setTexture('player1');
				game.player.body.setSize(100, 420)
				if(platform.id == currentPlatform){			
				}else{						
					currentPlatform = platform.id;
					addBubbles();		
					score+=10;
					updateProgressBar(currentPlatform);
				}
			}else{
				canLaunch = false;
			}
			
		});			
	}
	

	function launch(forceY){	
		forceX = 400;			
		game.player.setVelocityX(forceX);
		forceY = forceY * 4;
		forceY+= 200;		
		forceY = forceY > 1500 ? 1500 : forceY;
		game.player.setVelocityY(-forceY);
		
		addBubbles();
		_this.tweens.add({
                targets: platforms[currentPlatform],
                y: level_platformsY[currentPlatform],
                duration: 300,
                ease: 'Elastic',
                easeParams: [ 0.5, 0.5 ],
                delay: 0
        });
	}

	function updateProgressBar(currentPlatform){
		let w = game.progressBarFill.width;
		w = w/level_platformsX.length
		w = w * currentPlatform;		
		game.progressBarFill.setCrop(0, 0, w , game.progressBarFill.height);
		game.scoreText.setText(score);	
	}

	/**/

	function randomByRange(range){
		return Math.floor(Math.random() * range)
	}

	/*snowFlakes functions */
	function addSnowFlakes(){
		for(let i = 0; i < 128; i++){
			let x = randomByRange(game.config.width);			
			let y = randomByRange(game.config.height);
			let frame = randomByRange(3);
			frame = frame > 2 ? 2 : frame;				
			snowFlakes[i] = _this.add.image(x, y, 'snowFlakes', frame).setOrigin(0, 0).setScrollFactor(0);
			snowFlakes[i].speed = (randomByRange(10) * 0.2);
			snowFlakes[i].ticks = randomByRange(1024);
			snowFlakes[i].setAlpha(randomByRange(10) * 0.2);
		}
	}
	
	
	function updateSnowFlakes(){
		for(let i = 0; i < snowFlakes.length; i++){				
			if(snowFlakes[i].y < game.config.height){				
				snowFlakes[i].y+= snowFlakes[i].speed;
				snowFlakes[i].x--;				
			}else{
				snowFlakes[i].setAlpha(randomByRange(10) * 0.2);
				snowFlakes[i].y = randomByRange(game.config.height);
				snowFlakes[i].x = randomByRange(game.config.width);
			}			
		}	
	}
	

	/*bubbles functions */
	function addBubbles(){
		if(_this.scene.scene.scene.key == 'Scene6'){
			for(let i = 0; i < 9; i++){
				let x = randomByRange(platforms[currentPlatform].width) + platforms[currentPlatform].x;			
				let y = randomByRange(platforms[currentPlatform].y);
				let frame = randomByRange(3);
				frame = frame > 2 ? 2 : frame;				

				bubbles[i+lastBubbles] = _this.add.image(x, y, 'bubbles', frame).setOrigin(0, 0);
				bubbles[i+lastBubbles].speed = (randomByRange(10) * 0.2);
				bubbles[i+lastBubbles].ticks = randomByRange(1024);
				bubbles[i+lastBubbles].setAlpha(randomByRange(10) * 0.2);
				
			}
			lastBubbles+= 9;
		}
	}
	
	
	function updateBubbles(){
		for(let i = 0; i < bubbles.length; i++){				
			if(bubbles[i].y > -64){				
				bubbles[i].y-= bubbles[i].speed;							
			}else{
				bubbles[i].setAlpha(randomByRange(10) * 0.2);
				bubbles[i].y = -100  				
			}			
		}	
	}