class Scene10 extends Phaser.Scene {
		 
	constructor(){
		super('Scene10');
		
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
		let fingers = this.add.image(200, 870,'scene10Fingers');	
		
		canWorkout = false;
		
		isDragging = false;
		isDragging2 = false;
		rect1 = this.add.image( (game.config.width/2) + 50, (game.config.height/2),'scene10Rect');		
		dumbbell = this.add.image( (game.config.width/2) - 250, rect1.y + 250,'scene10Dumbbell');		
		
		fingerPrint1 = this.add.sprite(rect1.x, rect1.y - 250 ,'fingerPrint');
		fingerPrint1.setScale(1.3);
		fingerPrint1.setInteractive();
		this.input.setDraggable(fingerPrint1);		
		
		
		fingerPrint1.on('dragstart', function(pointer, gameObject, dragX, dragY){						
			userTouch = true;					
		});
		
		
		fingerPrint1.on('drag', function(pointer, gameObject, dragX, dragY){						
			if(canWorkout){				
				if( (pointer.y  > (rect1.y - 250)) && (pointer.y < (rect1.y + 250) )){
					fingerPrint1.y = pointer.y				
					dumbbellForce1 = (rect1.y + 250) - (fingerPrint1.y - ( rect1.y - 250));
					isDragging = true;
					
					gameMusic.mainTheme.setVolume(0.5);
					gameMusic.dumbbell.setVolume(5);
					if(!gameMusic.dumbbell.isPlaying){
						gameMusic.dumbbell.play();
					}
				}
			}
		});
		
				
		fingerPrint1.on('dragend', function(pointer){						
			if(canWorkout){
				fingerPrint1.y = rect1.y- 250;
				fingerPrint1.setScale(1.3);
			}
			userTouch = false;
			isDragging = false;
			gameMusic.dumbbell.pause();
			gameMusic.mainTheme.setVolume(1);
		});		
		
		fingerPrint1.on('pointerdown', function(pointer, localX, localY, event){
			userTouch = true;	
			if(canWorkout){
				fingerPrint1.setScale(2);
			}			
		});
		
		fingerPrint1.on('pointerup', function(){
			userTouch = false;
			isDragging = false;
			dumbbellForce1 = rect1.y - 250;
			if(canWorkout){
				fingerPrint1.y = rect1.y- 250;
			}
			gameMusic.dumbbell.pause();
			gameMusic.mainTheme.setVolume(1);
		});
		
		/**************/
		rect2 = this.add.image((game.config.width/2) + 450, (game.config.height/2),  'scene10Rect');			
		fingerPrint2 = this.add.sprite(rect2.x, rect2.y - 250, 'fingerPrint');
		fingerPrint2.setScale(1.3);
		fingerPrint2.setInteractive();
		this.input.setDraggable(fingerPrint2);
		
		fingerPrint2.on('dragstart', function(pointer, gameObject, dragX, dragY){			
			userTouch = true;			
		});
		
		fingerPrint2.on('drag', function(pointer, gameObject, dragX, dragY){						
			if( canWorkout){
				if( (pointer.y  > (rect2.y - 250)) && (pointer.y < (rect2.y + 250) )){
					fingerPrint2.y = pointer.y
					dumbbellForce2 = (rect2.y + 250) - (fingerPrint2.y - ( rect2.y - 250));
					isDragging2 = true;
					
					
					gameMusic.mainTheme.setVolume(0.5);
					gameMusic.dumbbell.setVolume(5);
					if(!gameMusic.dumbbell.isPlaying){
						gameMusic.dumbbell.play();
					}
					
				}			
			}
		});
				
		
		fingerPrint2.on('dragend', function(pointer){						
			if(canWorkout){
				fingerPrint2.y = rect2.y-250;
				fingerPrint2.setScale(1.3);
			}
			userTouch = false;
			isDragging2 = false;
			gameMusic.dumbbell.pause();
			gameMusic.mainTheme.setVolume(1);
		});		
		
		fingerPrint2.on('pointerdown', function(pointer, localX, localY, event){
			userTouch2 = true;	
			if(canWorkout){
				fingerPrint2.setScale(2);
			}
		});
		
		fingerPrint2.on('pointerup', function(){
			userTouch2 = false;
			isDragging2 = false;
			dumbbellForce2 = rect2.y - 250;
			if(canWorkout){
				fingerPrint2.y = rect2.y- 250;
			}
			gameMusic.dumbbell.pause();
			gameMusic.mainTheme.setVolume(1);
		});		
		
		
		speedoMeter = this.add.image(1800, 730,'speedoMeter');				
		meter = this.add.image(speedoMeter.x - 30 , 940, 'meter');
		meter.setOrigin(0, 0.5);		
				
		counter = 4;
		
		
		a1 = false;
		b1 = false; 
		a2 = false; 
		b2 = false;
		
		dumbbellForce1 = rect1.y - 250;
		dumbbellForce2 = rect2.y - 250;
	}	
	
	
	update(){
				
		if( meter.y >= 500 && meter.y <= 940 ){						
				meter.y += level;				
		}
			
		if(meter.y < 500){
			meter.y = 500;			
		}
		
		if(canWorkout){			
			
			if (isDragging && isDragging2){
				dumbbell.y = (( dumbbellForce1 + dumbbellForce2)/2);
				
				if(!gameMusic.dumbbell.isPlaying){
					//gameMusic.mainTheme.setVolume(0.2)
					gameMusic.dumbbell.play();
				}
				
			}else{
				dumbbell.y = rect1.y + 250;
			}
			
			if(fingerPrint1.y < (rect1.y - 210)){
				a1 = true;				
			}
			
			if(fingerPrint1.y > (rect1.y + 210)){
				a2 = true;				
			}else{
				a2 = false;
			}
			
			if(fingerPrint2.y < (rect2.y - 210)){
				b1 = true;
			}
			
			if(fingerPrint2.y > (rect2.y + 210)){
				b2 = true;				
			}else{
				b2 = false;
			}
			
			
			if(a1 && a2 && b1 && b2){
				repeticionpPesas();
			}
		}	
			

		if(vueltas == 0){
			if(counter !=0){				
				fingerPrint1.y+=5;	
				if(fingerPrint1.y > (rect1.y + 250)){
					fingerPrint1.y = rect1.y - 250;
					counter-=1;
				}
				
				fingerPrint2.y+=5;
				if(fingerPrint2.y > ( rect2.y + 250)){
					fingerPrint2.y = rect2.y - 250;
					counter-=1;
				}				
			}else{				
				canWorkout = true;
			}
		}
	}			

}


	
function repeticionpPesas(){
	
	a1 = false;
	b1 = false; 
	a2 = false; 
	b2 = false;
	
	meter.y-=100;
	
	if(vueltas <= 12){			
		if(level == 1){
			if(meter.y > 600){
				vueltas+=1;		
				repetitionText.setText(vueltas+"/12");	
				gameMusic.repetition.play();
			}			
		}else{//level 2
			//if(meter.y < 600){
				vueltas+=1;		
				repetitionText.setText(vueltas+"/12");	
				gameMusic.repetition.play();
			//}
		}
	}
	
		
	if(vueltas == 12){
		canWorkout = false;		
		gameMusic.startGame.play();
			_this.time.delayedCall(3000, () => {
				
				if (level == 1){						
					_this.scene.start('FinishedAmateur');	
				}
				if (level == 2){		
					gameGoals[2] = true;
					_this.scene.start('Scene11');	
				}				
			});		
			
	}	
}

