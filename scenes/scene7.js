class Scene7 extends Phaser.Scene {
	
	constructor(){
		super('Scene7');
	}

	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		addBackGround();
		
		addFullScreenButton('');	
		addSoundButton();
		
		let safeZone1 = this.add.image(game.config.width/2, game.config.height/2,'safeZone1');
		this.time.delayedCall(10000, () => {
				
				if(gameGoals[0] && gameGoals[1] && gameGoals[2]){
					this.scene.start('Scene12'); //end game
				}else{
					this.scene.start('Scene5');
				}
					
		});		
	}
	
	update(){
		
	}
	
}