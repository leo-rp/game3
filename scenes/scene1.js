class Scene1 extends Phaser.Scene {
	
	constructor(){
		super('Scene1');
	}
	
	preload(){				
	}
	
	create(){
		_this = this;
		
		this.cameras.main.fadeIn(500);
		//addBackGround('');


		
		

		game.background = this.add.tileSprite(game.config.width/2, game.config.height/2, 1920, 1080, 'background');
		let backgroundA = this.physics.add.image(0, -400,'backgroundA').setOrigin(0,0);
		backgroundA.setGravity(0, 2000);
		
		let backgroundA_invisible = this.physics.add.image(0, 750,'invisible');
		backgroundA_invisible.setImmovable(true);
		backgroundA_invisible.body.allowGravity = false;

		this.physics.add.collider(backgroundA, backgroundA_invisible);

		game.cloud = this.add.image(1900, 330,'cloud');		

		let title = this.physics.add.image(game.config.width/2, -100,'title');		
		title.setBounce(0.4); 
		title.setGravity(0, 4000);
		
		let title_invisible = this.physics.add.image(game.config.width/2, 850,'invisible');		
		title_invisible.setImmovable(true);
		title_invisible.body.allowGravity = false;
		this.physics.add.collider(title, title_invisible);
		
		//gameMusic.mainTheme.loop = true;
		//gameMusic.mainTheme.play();		
		
		addFullScreenButton('');
		addSoundButton();		
		let playButton = this.add.image(800, 800,'playButton').setInteractive();		

		playButton.on('pointerdown', function(){
			//gameMusic.startGame.play();		
			playButton.setTint(0xf18a00);				
		});
		
		playButton.on('pointerup', function () {
				this.scene.start('Scene2');
		}, _this);
	}
	
	update(){

		game.background.tilePositionX+= 0.4;	

		game.cloud.x--;
		if(game.cloud.x < -300 ){
			game.cloud.x = 2200;
		}
	}
}