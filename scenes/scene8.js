class Scene8 extends Phaser.Scene {
		 
	constructor(){
		super('Scene8');
		
	}

	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		addBackGround();
		vueltas = 0;
		
		addFullScreenButton('');	
		addSoundButton();
		addBackButton();

		
		let repetitions = this.add.image(100, 80,'repetitions').setOrigin(0,0);
		let style = {fontFamily: 'gotham-bold', fontSize: 60, color: "#ffffff", align: 'center' };
				
		userTouch = false;
		this.add.text(repetitions.x +70, repetitions.y +50, "Repeticiones", style);
		repetitionText = this.add.text(repetitions.x +200, repetitions.y +150, vueltas+"/10", style);
		
		this.input.addPointer(2);		
		let fingers = this.add.image(200, 870,'scene8Fingers');	
		
		canWorkout = false;
		
		/****/		
		rect1 = this.add.image( (game.config.width/2) - 350, (game.config.height/2),'scene8Rect');				
		fingerPrint1 = this.add.sprite(rect1.x+100, rect1.y ,'fingerPrint');
		fingerPrint1.setScale(1.3);
		fingerPrint1.setInteractive();
		this.input.setDraggable(fingerPrint1);		
		
		fingerPrint1.on('dragstart', function(pointer, gameObject, dragX, dragY){						
			userTouch = true;					
		});
		
		fingerPrint1.on('drag', function(pointer, gameObject, dragX, dragY){						
			if(canWorkout){
				if( (pointer.x  > (rect1.x - 223)) && (pointer.x < (rect1.x + 223) )){
					fingerPrint1.x = pointer.x;
				}
			}
		});
		
				
		fingerPrint1.on('dragend', function(pointer){						
			if(canWorkout){
				fingerPrint1.x = rect1.x+ 150;
				fingerPrint1.setScale(1.3);
			}
			userTouch = false;
			//if(!gameMusic.stretching.isPlaying){
				gameMusic.mainTheme.setVolume(0.5);
				gameMusic.stretching.setVolume(5);
				gameMusic.stretching.play();
			//}
		});		
		
		fingerPrint1.on('pointerdown', function(pointer, localX, localY, event){
			userTouch = true;	
			if(canWorkout){
				fingerPrint1.setScale(2);
			}
		});
		
		fingerPrint1.on('pointerup', function(){
			userTouch = false;
			
			if(canWorkout){
				fingerPrint1.x = rect1.x+ 150;
			}
			
			
		});		
		
		/**************/
		rect2 = this.add.image((game.config.width/2) + 350, (game.config.height/2),  'scene8Rect');			
		fingerPrint2 = this.add.sprite(rect2.x- 100, rect2.y,'fingerPrint');
		fingerPrint2.setScale(1.3);
		fingerPrint2.setInteractive();
		this.input.setDraggable(fingerPrint2);
		
		fingerPrint2.on('dragstart', function(pointer, gameObject, dragX, dragY){			
			userTouch = true;			
		});
		
		fingerPrint2.on('drag', function(pointer, gameObject, dragX, dragY){						
			if( canWorkout){
				if( (pointer.x  > (rect2.x - 223)) && (pointer.x < (rect2.x + 223) )){
					fingerPrint2.x = pointer.x
				}			
			}
		});
		
		fingerPrint2.on('dragend', function(pointer){						
			if(canWorkout){
				fingerPrint2.x = rect2.x- 150;
				fingerPrint2.setScale(1.3);
			}
			userTouch = false;
			//if(!gameMusic.stretching.isPlaying){
				gameMusic.mainTheme.setVolume(0.5);
				gameMusic.stretching.setVolume(5);
				gameMusic.stretching.play();
			//}
		});		
		
		fingerPrint2.on('pointerdown', function(pointer, localX, localY, event){
			userTouch2 = true;	
			if(canWorkout){			
				fingerPrint2.setScale(2);			
			}
		});
		
		fingerPrint2.on('pointerup', function(){
			userTouch2 = false;
			
			if(canWorkout){
				fingerPrint2.x = rect2.x- 150;
			}
			
			
		});
		
		/**/		
		speedoMeter = this.add.image(1800, 730,'speedoMeter');		
		
		meter = this.add.image(speedoMeter.x - 30 , 940, 'meter');
		meter.setOrigin(0, 0.5);
		direction = 1;
		counter = 4;
				
		a1 = false;
		b1 = false; 
		a2 = false; 
		b2 = false;				
	}	
	
	
	update(time,  delta){	

		//console.log(time)
		
		if( meter.y >= 500 && meter.y <= 940 ){						
			meter.y += level;
		}
			
		if(meter.y < 500){
			meter.y = 500;
		}
		
		if(canWorkout){
			if(fingerPrint1.x < (rect1.x - 150)){
				a1 = true;					
			}else{
				a1 = false;
			}
			
			if(fingerPrint1.x > (rect1.x + 100)){
				a2 = true;				
			}
			
			if(fingerPrint2.x < (rect2.x - 100)){
				b1 = true;
			}
			
			if(fingerPrint2.x > (rect2.x+ 150)){
				b2 = true;							
			}else{
				b2 = false;
			}
						
			if(a1 && a2 && b1 && b2){			
				repeticion();
			}
			
			//console.log(a1+'-'+a2+'-'+b1+'-'+b2 );
		}	
			
		if(vueltas == 0){
			if(counter !=0){
				fingerPrint1.x-=4;	
				
				if(fingerPrint1.x < 510){
					fingerPrint1.x = rect1.x + 170;
					counter-=1;
				}
				
				fingerPrint2.x+=4;	
				
				if(fingerPrint2.x > 1410){
					fingerPrint2.x = rect2.x - 170;
					counter-=1;
				}
			}else{				
				canWorkout = true;
			}
		}
	}				
}


	
function repeticion(){
	 meter.y -=100;

	if( vueltas <= 10){
		if(level == 1){
			if(meter.y > 600){
				vueltas+=1;		
				repetitionText.setText(vueltas+"/10");	
				gameMusic.repetition.play();
			}			
		}else{//level 2
			//if(meter.y < 600){
				vueltas+=1;		
				repetitionText.setText(vueltas+"/10");	
				gameMusic.repetition.play();
			//}
		}
	}
	
	
	a1 = false;
	b1 = false; 
	a2 = false; 
	b2 = false;
	
	//if(!gameMusic.stretching.isPlaying){
		//gameMusic.mainTheme.setVolume(0.2)
		
	//}
	
	
	
	if(vueltas == 10){
		canWorkout = false;		
		gameMusic.startGame.play();		
	    gameMusic.mainTheme.setVolume(1);
		_this.time.delayedCall(3000, () => {				
			if (level == 1){						
				_this.scene.start('FinishedAmateur');	
			}

			if (level == 2){	
				gameGoals[1] = true;
				_this.scene.start('Scene9');	
			}
				
		});
	}	
}

