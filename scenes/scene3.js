class Scene3 extends Phaser.Scene {
	

		 
	constructor(){
		super('Scene3');
		
	}

		
	preload(){
		
	}
	
	create(){
		_this = this;			
		
		this.cameras.main.fadeIn(500);
		addBackGround('');
		
		addFullScreenButton();	
		addSoundButton();
		this.add.image(0,0,'scene3HowToPlay').setOrigin(0,0);
		
		/*
		let style = {fontFamily: 'gotham-bold', fontSize: 60, color: "#f18a00", align: 'center' };
		
		
		
		let oneFinger = this.add.image(200, 870,'oneFinger');	
		
		this.add.text(oneFinger.x + 10, 270, "1", style);
		*/

		this.time.delayedCall(5000, () => {
				this.scene.start('Scene4');
		});		

	}
	
		
	update(){		
		
	}
	
}