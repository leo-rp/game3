class Scene2 extends Phaser.Scene {
	
	constructor(){
		super('Scene2');
	}
	
	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);		
		
		game.background = this.add.tileSprite(game.config.width/2, game.config.height/2, 1920, 1080, 'background');
		let backgroundA = this.add.image(0, 0,'backgroundPixels').setOrigin(0,0);
		
		
		game.cloud = this.add.image(1900, 330,'cloud');
		let tutorialImage = this.add.image(game.config.width/2, game.config.height/2,'tutorialImage');			
		addFullScreenButton('');	
		addSoundButton();
		this.time.delayedCall(10000, () => {
				this.scene.start('Scene3');
		});		
	}
	
	update(){
		game.background.tilePositionX+= 0.4;
		game.cloud.x--;
		if(game.cloud.x < -300 ){
			game.cloud.x = 2200;
			game.cloud.y-= 200;
		}
	}
	
}