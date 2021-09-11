class Scene3 extends Phaser.Scene {
	

		 
	constructor(){
		super('Scene3');
		
	}

		
	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		
		_this.add.image(0, 0, 'background4A', 0).setOrigin(0,0);
		let backgroundPixels = _this.add.image(0, 0, 'backgroundPixels', 0).setOrigin(0,0);		
		
		addFullScreenButton('');	
		addSoundButton();

		/*=============================*/	
		/*FIRST LEVEL (Tutorial)
		- numPlatforms : 9
		- goal limit : 5200
		- camera : 5760
		*/


		level_platformsX = [200, 900, 1500] ;
		level_platformsY = [900, 750, 750];
		level_platformsColor = [2, 1, 3];

        let numPlatforms = 2 // Number of platforms per level
        let goalX = 5200;        
        let cameraWidth = 5760;

        /*=============================*/
		
		game.progressBar = _this.add.image(50, 50, 'progressBar', 0).setOrigin(0,0);
    	game.progressBar.setScrollFactor(0);
    	game.progressBarFill = _this.add.image(178, 62, 'progressBarFill', 0).setOrigin(0,0);
    	game.progressBarFill.setScrollFactor(0);
    	game.progressBarFill.setCrop(0, 0, 0, 0);
		_this.add.image(950, 50, 'star', 0).setOrigin(0,0).setScale(0.3);
    	_this.add.image(150, 150, 'star1', 0).setOrigin(0,0).setScrollFactor(0);
		

    	_this.add.image(game.config.width- 400, 50, 'score', 0).setOrigin(0,0).setScrollFactor(0);
    	
    	let style = {fontFamily: 'gotham-bold', fontSize: 60, color: "#ffffff", align: 'center', fontStyle: 'italic'};
		game.scoreText = this.add.text(1620, 65, 10, style);


		game.player  = this.physics.add.image(350, 750, 'player2').setScale(0.8);		
		game.player2  = this.physics.add.image(900, 400, 'player4').setScale(0.8);		

		for(var i = 0; i< numPlatforms; i++){
    		addPlatform(i);	
    	}
    	_this.add.image(0, 990, 'backgroundBottom4A', 0).setOrigin(0,0);

    	for(var i = 0; i< numPlatforms; i++){
    		_this.physics.add.image(platforms[i].x - 60, game.config.height - 120, 'platformBottom').setOrigin(0,0);	
    	}

    	_this.add.image(750, 130, 'step0', 0).setOrigin(0,0);
    	_this.add.image(200, 250, 'step1', 0).setOrigin(0,0);
    	_this.add.image(550, 450, 'step2', 0).setOrigin(0,0);
    	_this.add.image(1300, 350, 'step3', 0).setOrigin(0,0);		
		
    	let playButton = this.add.image(1600, 840,'playButton').setInteractive();		

    	playButton.on('pointerdown', function(){
			gameMusic.startGame.play();		
			playButton.setTint(0xf18a00);				
		});
		
		playButton.on('pointerup', function () {
				this.scene.start('Scene4');
		}, _this);		

	}
	
		
	update(){
		
		if (counter < 600){
			counter+=2;	
		}else{
			counter = 0;
		}
		
		game.progressBarFill.setCrop(0, 0, counter, game.progressBarFill.height);		

		if( platforms[0].y < 940){
			platforms[0].y+=0.5;
			game.player.y+= 0.5; 
		}else{
			platforms[0].y = 870;
			game.player.y = 720; 
		}

		
		if( game.player2.x < 1110){
			game.player2.x+= 2; 
			game.player2.y+= 2; 
		}else{
			game.player2.x= 900; 
			game.player2.y= 400; 
		}

	}
	
}