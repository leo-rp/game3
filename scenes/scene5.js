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
		gameMode = 'cycling';
		
		cycling.on('pointerdown', function(pointer, localX, localY, event){ 
			gameMode = 'cycling';
			cycling.setTint(0xf18a00);							
			gameMusic.startGame.play();
		});		
				
		cycling.on('pointerup', function(pointer, localX, localY, event){ 
			_this.scene.start('StartAmateur');
		});
				
		stretching.on('pointerdown', function(pointer, localX, localY, event){ 
			gameMode = 'stretching';
			stretching.setTint(0xf18a00);							
			gameMusic.startGame.play();
		});
		
		stretching.on('pointerup', function(pointer, localX, localY, event){ 
			_this.scene.start('StartAmateur');
		});
		
		
		lifting.on('pointerdown', function(pointer, localX, localY, event){ 
			gameMode = 'lifting';
			lifting.setTint(0xf18a00);							
			gameMusic.startGame.play();
		});
					
		lifting.on('pointerup', function(pointer, localX, localY, event){ 
			_this.scene.start('StartAmateur');
		});
	}
		
	update(){
	}
	
}