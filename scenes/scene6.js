class Scene6 extends Phaser.Scene {
		 
	constructor(){
		super('Scene6');
	}

	preload(){
		
	}
	
	create(){
		_this = this;
		
		this.cameras.main.fadeIn(500);
		
		graphics = _this.add.graphics();
		graphics.clear();
		
		addBackGround();
		vueltas = 0;

		
		addFullScreenButton('');	
		addSoundButton();
		addBackButton();
		
		
		let repetitions = this.add.image(100, 80,'repetitions').setOrigin(0,0);
		let style = {fontFamily: 'gotham-bold', fontSize: 60, color: "#ffffff", align: 'center' };
		
		this.add.text(repetitions.x +70, repetitions.y +50, "Repeticiones", style);
		repetitionText = this.add.text(repetitions.x +200, repetitions.y +150, vueltas+"/20", style);
		
		let oneFinger = this.add.image(200, 870,'oneFinger');
		let bike = this.add.image(game.config.width/2+ 50, game.config.height/2 + 50,'bike');
				
		pedal = this.add.sprite(bike.x- 105, bike.y+ 220, 'pedal');
		pedal.setOrigin(0, 0.5);
		pedal.rotation = 1.5;
		
		circle = this.add.image(0,0, 'circle');		
		fingerPrint = this.add.sprite(pedal.x, pedal.y + 200,'fingerPrint');
		speedoMeter = this.add.image(1800, 730,'speedoMeter');		
		
		meter = this.add.image(speedoMeter.x - 30 , 940, 'meter');
		meter.setOrigin(0, 0.5);
		
		container1 = this.add.container(bike.x - 100, bike.y + 210, [circle]);
		container1.setSize(circle.width, circle.height);
		container1.setInteractive();
		this.input.setDraggable(container1);
		
		canWorkout = true;
		container1.on('dragstart', function(pointer, gameObject, dragX, dragY){});
		
		container1.on('drag', function(pointer, gameObject, dragX, dragY){
			if (canWorkout){
				
				if(pointer.x > (pedal.x - 200)  && pointer.x < (pedal.x + 200)){
					fingerPrint.x = pointer.x;
				}
				
				if(pointer.y > (pedal.y - 200) && pointer.y < (pedal.y + 200)){
					fingerPrint.y = pointer.y;
				}
				
				target = Phaser.Math.Angle.BetweenPoints(pedal, pointer);				
				pedal.rotation = target;				
				checkPedalPoints();
				gameMusic.mainTheme.setVolume(0.5);
				gameMusic.bike.setVolume(5);
				if(!gameMusic.bike.isPlaying){
					gameMusic.bike.play();
				}
			}			
		});
		
				
		container1.on('dragend', function(pointer){			
			circle.clearTint();
			pedal.rotation = Phaser.Math.Angle.RotateTo(pedal.rotation, 90, 500);
			points = [];			
			gameMusic.bike.pause();
			gameMusic.mainTheme.setVolume(1);
		});		
		
		container1.on('pointerdown', function(){
			userTouch = true;
		});
		
		container1.on('pointerup', function(){
			userTouch = false;
			circle.clearTint();
			gameMusic.bike.pause();
			gameMusic.mainTheme.setVolume(1);
		});
	
		tooFast = this.add.image(game.config.width/2, 220,'tooFast');
		tooFast.setVisible(false);
	
	
	}
	
	
	
	update(){
			

		if( meter.y >= 500 && meter.y <= 940 ){						
			meter.y += level;
		}

		if(meter.y < 500){
			meter.y = 500;				
		}
		
		if(level == 1){
			if(meter.y < 600){
				meter.y+=1;
				if(!tooFast.visible){						
					tooFast.setVisible(true);					
					_this.time.delayedCall(4000, () => {						
						tooFast.setVisible(false);							
					});
				}
			}				
		}
					
		if(userTouch){							
			circle.setTint(colors[0]);
				
			if(meter.y < 731 ){
				circle.setTint(colors[1]);				
			}
						
			if(meter.y < 600){
				circle.setTint(colors[2]);	
					
			}
		}	
	}
}


function vuelta(){	
	
	
	if(vueltas <= 20){
		meter.y -= 80; 
		
		
		if(level == 1){
			if(meter.y > 600){
				vueltas+=1;		
				repetitionText.setText(vueltas+"/20");	
				gameMusic.repetition.play();
			}else{
				
			}			
		}else{//level 2
			//if(meter.y < 600){
				vueltas+=1;		
				repetitionText.setText(vueltas+"/20");	
				gameMusic.repetition.play();
			//}
		}	
	}
	
	if(vueltas == 20){
		canWorkout = false;	
		gameMusic.startGame.play();
		
		_this.time.delayedCall(3000, () => {
				
			if (level == 1){	
				//gameMusic.mainTheme.setVolume(1);
				_this.scene.start('FinishedAmateur');	
			}

			if (level == 2){					
				gameGoals[0] = true;
				_this.scene.start('Scene7');
				
				//gameMusic.mainTheme.setVolume(1);
			}				
		});		
	}	
}


function checkPedalPoints(){		
	let angle = parseInt(pedal.angle.toFixed());
		
	if (angle >= 45 && angle <= 135) {		  
		points[0] = 1;		 			
	}
		
	if (angle >= 135 && angle <= 180) {		  
		points[1] = 2;
	}
				
	if (angle >= -135 && angle <= -45) {		  
	  points[2] = 3;
	}
	
	if (angle >= -45 && angle <= 0) {		  
	  points[3] = 4;
	
		if( (points[0] == 1) &&  (points[1] == 2) && (points[2] == 3) && (points[3] == 4)){
				points = [];
				vuelta();
		}		  
	}
		
		
		
}
	