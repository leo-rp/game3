class Scene4 extends Phaser.Scene {
	
	constructor(){
		super('Scene4');
	}
	
	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		addBackGround('1');
		
		addFullScreenButton('');	
		addSoundButton();		
		

		//this.physics.world.bounds.width = 
		
		level_platforms = [100, 500, 1000]
		
		/*player*/
		game.player  = this.physics.add.image(200, 300, 'player').setOrigin(0, 0);
		game.player.setBounce(0.1); // our player will bounce from items
    	game.player.setCollideWorldBounds(true); // don't go out of the map

    	//add frist platform

    	let currentPlatform = 0;
    	addPlatform(0);
    	addPlatform(1);
    	addPlatform(2);

		
	}
		
	update(){
		//game.player.Y = platforms[currentPlatform].
	}	
}