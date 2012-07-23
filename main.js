enchant();

window.onload = function(){

    var game = new Game(320, 320);

    game.fps = 30;
    
    game.preload("chara4.gif","bg.png","icon1.png");
    
    //�����ݒ�
    game.life = 3;
    touching = false;
    game.time = 0;
    
    items = [];
    
    
    game.onload = function(){
        
        //�}�b�v��ݒ�
        var map = new Sprite(320, 640);
        map.image = game.assets["bg.png"];
        map.y = -map.height + game.height;
		    game.rootScene.addChild(map);
		    
		    //���@�̐ݒ�
		    var car = new Sprite(32, 32);
		    car.image = game.assets["chara4.gif"];
		    car.x = 160;
		    car.y = game.height - car.height;
		    game.rootScene.addChild(car);
		    
		    //�t���[���C�x���g�����������珈��
		    car.addEventListener(Event.ENTER_FRAME, function(){
		        if (game.input.left && (car.x > 0)){ car.x = car.x - 4;	 }
			      if (game.input.right && (car.x < game.width-car.width)){ car.x = car.x + 4; }
			      if (game.input.up && (car.y > 80)){ car.y = car.y - 4;	 }
			      if (game.input.down && (car.y < game.height-car.height)){ car.y = car.y + 4; }
		    });
		    
		    //��Q���̒ǉ�
		    game.addObstacle = function(x, speed) {
		    
		        //��Q���̐���
		        var obstacle = new Sprite(16, 16);
		        obstacle.image = game.assets["icon1.png"];
		        obstacle.x = x;
		        obstacle.y = -16;
		        obstacle.frame = 15;
		        obstacle.speed = speed;
		        game.rootScene.addChild(obstacle);
		    
		        //�X�v���C�g�̒������
		        obstacle.addEventListener(Event.ENTER_FRAME, function() {
		            obstacle.y += obstacle.speed;
		            //���@�ƏՓ�
		            if (car.within(obstacle, 16)) {
		                game.life -= 1;
		                if (game.life <= 0) {
		                    game.end(game.score, "���Ȃ��̃X�R�A��" + game.score);
		                }
		                game.rootScene.removeChild(obstacle);

		            
		            }
		            
		        });
        };
		    
		    //�V�[���̒������
		    game.tick = 32 * 10;
		    game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		        game.tick--;
		        if (game.tick > 0) {
		            //��Q���̐���
		            if ((game.tick % 10) === 0) {
		                var x     = Math.floor(Math.random() * 300);
		                var speed = 4;
		                game.addObstacle(x,speed);
		            }
		        
		        }
		    });
		    
		    //�X�R�A��\��
		    //draw.text.js�v���O�C�����g�p
		    scoreLabel = new MutableText(8, 8, game.width, "");
        scoreLabel.score = 0;
        
        
        //���C�t��\��
        lifeLabel = new MutableText(320 - 135, 8, game.width, "");
        lifeLabel.addEventListener('enterframe', function(){
            this.text = "LIFE " + "OOOOOOOOO".substring(0, game.life);
        });
        game.rootScene.addChild(lifeLabel);

        
        //���t���[�������I�ɃX�R�A���X�V����
        scoreLabel.addEventListener('enterframe', function(){ 
            this.text = this.score + " m";
            this.score = Math.floor(game.frame / 1);
        });
        game.rootScene.addChild(scoreLabel);
        game.score = 0;
		    
		
		//�t���[���C�x���g������������}�b�v���X�N���[��
		map.addEventListener(Event.ENTER_FRAME, function(){
	      map.y = map.y + 4;	// ���Ɉړ�
			  // �}�b�v���X�N���[�����I�������ēx��ɖ߂�
			  if (map.y > -1){ map.y = -map.height + game.height; }
		    
		});
	
	}
	
	game.start();	// �Q�[�������J�n


}
