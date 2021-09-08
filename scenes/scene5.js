class Scene5 extends Phaser.Scene {
		 
	constructor(){
		super('Scene5');		
	}
	
	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		addBackGround();
		
		addFullScreenButton('');	
		addSoundButton();
		
		this.add.image(game.config.width/2, 300,'scene5Title');
		let cycling = this.add.image(game.config.width/2 - 500, game.config.height/2 + 100,'scene5Cycling').setInteractive();
		
		let stretching = this.add.image(game.config.width/2, game.config.height/2 + 100,'scene5Stretching').setInteractive();
		let lifting = this.add.image(game.config.width/2 + 500, game.config.height/2+ 100,'scene5Lifting').setInteractive();
		
		level = 1;
		
	}
		
	update(){
	}
	
}