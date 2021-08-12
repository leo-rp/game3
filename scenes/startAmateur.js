class StartAmateur extends Phaser.Scene {
		 
	constructor(){
		super('StartAmateur');		
	}

	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		addBackGround();
		
		addFullScreenButton('');	
		addSoundButton();

		this.add.image(game.config.width/2, game.config.height/2, 'startAmateur');
		level = 1;
				
		if(gameMode == 'cycling'){			
			_this.time.delayedCall(7000, () => {
				_this.scene.start('Scene6');
			});		
		}
				
		if(gameMode == 'stretching'){			
			_this.time.delayedCall(7000, () => {
				_this.scene.start('Scene8');
			});		
		}
		
		if(gameMode == 'lifting'){			
			_this.time.delayedCall(7000, () => {
				_this.scene.start('Scene10');
			});		
		}		
		
		let nextSceneButton = _this.add.image(game.config.width/2, game.config.height- 100, 'nextSceneButton').setInteractive();
		
		nextSceneButton.on('pointerdown', function(){			
			nextSceneButton.setTint(0xf18a00);				
		});
		
		nextSceneButton.on('pointerup', function () {				
			if(gameMode == 'cycling'){						
				_this.scene.start('Scene6');
			}				
			if(gameMode == 'stretching'){			
				_this.scene.start('Scene8');
			}		
			if(gameMode == 'lifting'){						
				_this.scene.start('Scene10'); 
			}		
		}, _this);
	}	
	
	update(){
	}
	
}