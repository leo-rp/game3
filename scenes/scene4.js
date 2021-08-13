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
		
		level_platforms = [100, 600, 1500]
		
		/*player*/
		//game.player  = this.physics.add.image(200, 300, 'player').setOrigin(0, 0);
		game.player  = this.physics.add.image(250, 400, 'player');
		game.player.setScale(1.5)
		game.player.body.setSize(60, 265)

		game.player.setBounce(0.1); // our player will bounce from items
    	game.player.setCollideWorldBounds(false); // don't go out of the map
    	game.player.setGravity(0, 1000)

    	_this.cameras.main.setBounds(0,0, game.config.width, game.config.height);
    	_this.cameras.main.startFollow(game.player, true);
    	//_this.cameras.main.setZoom(2);



    	//add frist platform

    	let currentPlatform = 0;
    	addPlatform(0);
    	addPlatform(1);
    	addPlatform(2);

		
	}
		
	update(){
		//game.player.Y = platforms[currentPlatform].
		if(game.player.y > game.config.height){
			_this.scene.restart();
		}
	}	
}