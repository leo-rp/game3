let loadingBar;

class Scene0 extends Phaser.Scene {
	
	constructor(){
		super('Scene0');
	}

	
	//f18a00
	preload(){
		
		this.load.on('progress', function(value){			
			progressBar.clear();
			progressBar.fillStyle(0xf18a00, 1);
			progressBar.fillRect((game.config.width/2)-150, (game.config.height/2)+10, 300 * value, 30);
		});
		
		this.load.on('fileprogress', function(file){
			//console.log('loading: '+file.key);
		});
		
		this.load.on('complete', function(){			
			progressBar.destroy();
			progressBox.destroy();
		});
		
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect((game.config.width/2)-160, (game.config.height/2), 320, 50);
		
		this.load.image('rotateDevice', 'assets/gui/rotateDevice.png');		
		
		this.load.spritesheet('fullscreen', 'assets/buttons/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
		
		this.load.image('background', 'assets/gui/background.png');
		this.load.image('backgroundPixels', 'assets/gui/backgroundPixels.png');

		this.load.image('cloud', 'assets/gui/cloud.png');		

		this.load.image('invisible', 'assets/gui/invisible.png');		
		this.load.image('progressBar', 'assets/gui/progressBar.png');
		this.load.image('progressBarFill', 'assets/gui/progressBarFill.png');
		this.load.image('score', 'assets/gui/score.png');		
		this.load.image('star1', 'assets/gui/star1.png');		
		this.load.image('star2', 'assets/gui/star2.png');		
		this.load.image('star3', 'assets/gui/star3.png');		

		this.load.image('player1', 'assets/gui/player/player1.png');	
		this.load.image('player2', 'assets/gui/player/player2.png');			
		this.load.image('player4', 'assets/gui/player/player4.png');	
		this.load.image('platform1', 'assets/gui/platforms/platform1.png');
		this.load.image('platform2', 'assets/gui/platforms/platform2.png');
		this.load.image('platform3', 'assets/gui/platforms/platform3.png');
		this.load.image('platform4', 'assets/gui/platforms/platform4.png');
		this.load.image('platform5', 'assets/gui/platforms/platform5.png');
		this.load.image('platform6', 'assets/gui/platforms/platform6.png');		
		this.load.image('platform7', 'assets/gui/platforms/platform7.png');		
		this.load.image('platformBottom', 'assets/gui/platforms/platformBottom.png');	
		this.load.image('goal', 'assets/gui/goal.png');						
		
		/*buttons*/		
			this.load.spritesheet('soundButton', 'assets/buttons/soundButton.png', { frameWidth: 64, frameHeight: 64 });
			this.load.spritesheet('closeButton', 'assets/buttons/closeButton.png', { frameWidth: 64, frameHeight: 64 });			
			this.load.image('nextSceneButton', 'assets/buttons/nextSceneButton.png');			

		/* Audio */		
			this.load.audio('jump', 'assets/music/jump.wav');
			this.load.audio('lose', 'assets/music/lose.wav');		
			this.load.audio('main_theme', 'assets/music/main_theme.mp3');		
			this.load.audio('start_game', 'assets/music/start_game.wav');			
			this.load.audio('win', 'assets/music/win.wav');	
		
		/* Scenes */

			// Scene 0
			this.load.image('logo', 'assets/scenes/scene0/logo.png');
			this.load.spritesheet('fullscreenWhite', 'assets/scenes/scene0/fullscreen.png', { frameWidth: 64, frameHeight: 64 });		
			this.load.image('loadingBar', 'assets/scenes/scene0/loadingBar.png');
			this.load.image('loading', 'assets/scenes/scene0/loading.png');
			// Scene 1 		
			this.load.image('title', 'assets/scenes/scene1/title.png');					
			this.load.image('playButton', 'assets/buttons/playButton.png');			
			// Scene 2 		
			this.load.image('tutorialImage', 'assets/scenes/scene2/tutorial.png');						
			//Scene 3 
			this.load.image('scene3HowToPlay', 'assets/scenes/scene3/scene3HowToPlay.jpg');			
			this.load.image('step0', 'assets/scenes/scene3/step0.png');			
			this.load.image('step1', 'assets/scenes/scene3/step1.png');			
			this.load.image('step2', 'assets/scenes/scene3/step2.png');			
			this.load.image('step3', 'assets/scenes/scene3/step3.png');			
			this.load.image('star', 'assets/scenes/scene3/star.png');			
			//Scene4
			this.load.image('background4A', 'assets/scenes/scene4/background4A.png');
			this.load.image('background4B', 'assets/scenes/scene4/background4B.png');
			this.load.image('backgroundBottom4A', 'assets/scenes/scene4/backgroundBottom4A.png');
			this.load.image('backgroundBottom4B', 'assets/scenes/scene4/backgroundBottom4B.png');
			this.load.image('scene4GoodJob', 'assets/scenes/scene4/scene4GoodJob.png');			
			//Scene5
			this.load.image('background5', 'assets/scenes/scene5/background5.png');			
			this.load.image('backgroundBottom5', 'assets/scenes/scene5/backgroundBottom5.png')
			this.load.image('scene5GoodJob', 'assets/scenes/scene5/scene5GoodJob.png');			
			this.load.spritesheet('snowFlakes', 'assets/scenes/scene5/snowFlakes.png', { frameWidth: 64, frameHeight: 64 });
			//Scene6
			this.load.image('scene6GoodJob', 'assets/scenes/scene6/scene6GoodJob.png');		
			this.load.image('background6', 'assets/scenes/scene6/background6.png');
			this.load.image('floor6A', 'assets/scenes/scene6/floor6A.png');			
			this.load.image('floor6B', 'assets/scenes/scene6/floor6B.png');			
			this.load.image('waterBottom1', 'assets/scenes/scene6/waterBottom1.png');						
			this.load.image('waterBottom2', 'assets/scenes/scene6/waterBottom2.png');
			this.load.image('water1', 'assets/scenes/scene6/water1.png');
			this.load.image('water2', 'assets/scenes/scene6/water2.png');
			this.load.image('backgroundBottom6', 'assets/scenes/scene6/backgroundBottom6.png');	
			this.load.spritesheet('bubbles', 'assets/scenes/scene6/bubbles.png', { frameWidth: 64, frameHeight: 64 });
	}
	
	create(){					
		_this = this;
		
		checkOrientation(this.scale.orientation);
		this.scale.on('orientationchange', checkOrientation,  this);
				
		this.cameras.main.setBackgroundColor('0x1d1d1b');		
		let logo = this.add.image(game.config.width/2, (game.config.height/2)-150,'logo');
				
		loadingBar = this.add.tileSprite((game.config.width/2), (game.config.height-117), 570, 75, 'loadingBar');		
		let loading = this.add.image(game.config.width/2, (game.config.height-150),'loading');
		
		logo.scale = 0.7;
		addFullScreenButton('White');
		
		/*music*/				
		gameMusic.jump = this.sound.add('jump');
		gameMusic.lose = this.sound.add('lose');
		gameMusic.mainTheme = this.sound.add('main_theme');
		gameMusic.startGame = this.sound.add('start_game');		
		gameMusic.win = this.sound.add('win');
		
		let style = {fontFamily: 'gotham-bold', fontSize: 50, color: "#ffffff", align: 'center' };
		this.add.text(game.config.width/2 - 400, 50, "Acabas de ingresar a un juego de", style);
				
		style = {fontFamily: 'gotham-medium', fontSize: 34, color: "#ffffff", align: 'center' };
		this.add.text(300, 650, "Una serie de experiencias diseñadas para ayudar a encontrar el alivio a través de \n la gamificación. Una herramienta tecnológica que contribuye a la mejora \n en la calidad de vida desde los avances de la ciencia y la medicina.", style);
		
		this.cameras.main.once('camerafadeoutcomplete', function (camera) {
				_this.scene.start('Scene1');		
        });

		this.time.delayedCall(7000, () => {
			_this.cameras.main.fadeOut(1000, 0, 0, 0);
		});		
	}
	 
	update(){		
		loadingBar.tilePositionX+= 4;
	}
	
}


