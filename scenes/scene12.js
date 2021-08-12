class Scene12 extends Phaser.Scene {
	
	constructor(){
		super('Scene12');
	}
	
	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		addBackGround();
		
		addFullScreenButton('');	
		addSoundButton();
		
		let safeZone1 = this.add.image(game.config.width/2, game.config.height/2, 'scene12Text');			
		
		this.time.delayedCall(10000, () => {
				this.scene.start('Scene1');
		});	
	}
	
	update(){
		
	}
	
}