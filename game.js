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
	let level_platforms;
	let warningImg = false;
	
	
	
	
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
			scene: [Scene0, Scene1, Scene2, Scene3, Scene4, Scene5 , Scene6, Scene7, Scene8, Scene9],				
			
			scale: {			
				mode: Phaser.Scale.FIT,			
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: 1920, height: 1080
			},
			audio: {
				disableWebAudio: true
			},
			physics: {
				default: 'arcade',
				arcade: {
					//gravity: { y: 800},
					debug: false
				}
			},
		};	
		
		game = new Phaser.Game(config);				
	});
	
	
	/**/
	function addBackGround(n){
		
		_this.scale.lockOrientation('landscape');

		if(!DEBUG){
			graphics = _this.add.graphics();
			graphics.fillStyle(0xffffff, 1);
			graphics.fillRect(0, 0, game.config.width, game.config.height );			
			_this.backgroundImage = _this.add.image(0, 0, 'background'+n, 0).setOrigin(0,0);
			_this.backgroundImageA = _this.add.image(0, 0, 'backgroundA', 0).setOrigin(0,0);			
		}
	}
	
	
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
	
	function addBackButton(){
			var backButton = _this.add.image(game.config.width-54, 250, 'homeButton', 0).setInteractive();
			
			backButton.on('pointerdown', function(){
				backButton.setTint(0xa61bc9);	
				gameMusic.startGame.play();
			});			
			
			backButton.on('pointerup', function(){				
				//_this.time.delayedCall(2000, () => {
					_this.scene.start('Scene5');					
				//});		
			})
	}
	
	function addFullScreenButton(color){		
		if(_this.scale.fullscreen.available){
			fullScreenButton = _this.add.image(game.config.width-24, 32, 'fullscreen'+color, 0).setOrigin(1, 0).setInteractive();

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
	

	function collides(a, b ){
		let collision = false;

		let x1 = a.x - (a.width/2);
		let w1 = a.width;
		let y1 = a.y - (a.height/2);
		let h1 = a.height;

		let x2 = b.x - (b.width/2);
		let w2 = b.width;
		let y2 = b.y - (b.height/2);
		let h2 = b.height;

		let s1 = x1 + w1; // r1 right edge past r2 left
		let s2 = x2 + w2; // r1 left edge past r2 right
		let s3 = y1 + h1; // r1 top edge past r2 bottom
		let s4 = y2 + h2; // r1 bottom edge past r2 top*/

		if( x2 >= s1 || s2 <= x1 || y2 >= s3 || s4 <= y1 ){
			collision =  false;
			return true;
		}else{
			collision = true;
			if(DEBUG){		
				var drop = _this.add.graphics();
				drop.fillStyle(0x222222, 0.8);
				drop.fillRect(270, 1500, 550, 150);
			}
			return false;
			
		}
	}

	function addPlatform(n){
		let y = 700;
		let forceX = 0;
	    let forceY = 0;

		platforms[n] = _this.physics.add.image(level_platforms[n], y, 'platform1').setOrigin(0,0);
		platforms[n].setImmovable(true);
		platforms[n].body.allowGravity = false;
		platforms[n].setInteractive();
		_this.input.setDraggable(platforms[n]);	


		_this.physics.add.collider(game.player, platforms[n], (player, platform) =>{
			//console.log('colission'+platform);
			game.player.setVelocityX(0);
			
		});

		
		
		
		platforms[n].on('dragstart', function(pointer, gameObject, dragX, dragY){
		});
		
		platforms[n].on('drag', function(pointer, gameObject, dragX, dragY){
			//if(pointer.y > (y - (platforms[n].height/2))){
			if(pointer.y > y && pointer.y < (y + 250)){
				
				for (var i = 0; i < (pointer.y - platforms[n].y ); i++) {
					//platforms[n].y = pointer.y;	   
					platforms[n].y++
					game.player.y++;
				}
				//platforms[n].y = dragY;	
				//console.log(pointer.y);
			}
			
		});
		
				
		platforms[n].on('dragend', function(pointer){
			console.log('dragend');

			if(n < (platforms.length-1)){
				forceX = platforms[n+1].x - platforms[n].x;
			}else{
				forceX = 100;
			}
			
			forceY = (platforms[n].y - y);
			
			launch(forceX, forceY);

			//platforms[n].setImmovable(true);
			platforms[n].body.allowGravity = false;
			


			_this.tweens.add({
                targets: platforms[n],
                y: y,
                duration: 250,
                ease: 'Elastic',
                easeParams: [ 0.5, 0.5 ],
                delay: 0
            });
			
			
		});		
		
		platforms[n].on('pointerdown', function(pointer, localX, localY, event){			
			//platforms[n].setImmovable(false);
			//platforms[n].input.enabled = true;
			
			
		});
		
		platforms[n].on('pointerup', function(){			
			/*
			for (var i = 0; i < (platforms[n].y - ); i++) {
					//platforms[n].y = pointer.y;	   
					platforms[n].y++
				   
			}
			*/
			//platforms[n].input.enabled = false
			
		});		

	}
	
	function launch(forceX, forceY){
		//game.player.setGravityY(0);
		game.player.setVelocityX(forceX);		
		//forceY = (forceY+ game.player.body.gravity.y)
		forceY = forceY * 4;
		game.player.setVelocityY(-forceY);
		console.log(' X:'+forceX+' Y:'+forceY);
	}