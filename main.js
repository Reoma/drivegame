enchant();

window.onload = function(){

    var game = new Game(320, 320);

    game.fps = 50;
    
    game.preload("chara4.gif","bg.gif","icon1.png","sheep5.png");
    
    //�����ݒ�
    game.life = 3;
    touching = false;
    game.time = 0;
    items = [];
    
    
    game.onload = function(){
        
        //�}�b�v��ݒ�
        var map = new Sprite(320, 1280);
        map.image = game.assets["bg.gif"];
        map.y = -map.height + game.height;
		    map._element.style.zIndex = 1;
        game.rootScene.addChild(map);
		    
		    //���@�̐ݒ�
		    var car = new Sprite(32, 32);
		    car.image = game.assets["chara4.gif"];
		    car.x = 160 - 16;
		    car.y = 320 - 50;
        car._element.style.zIndex = 3;
		    game.rootScene.addChild(car);
		    
		    
       //�t���[���C�x���g�����������珈��
		    car.addEventListener(Event.ENTER_FRAME, function(){
		        if (game.input.left && (car.x > 0)){ car.x = car.x - 4;	 }
			      if (game.input.right && (car.x < game.width-car.width)){ car.x = car.x + 4; }
		    });
		    
		    //��Q���̒ǉ�
		    game.addObstacle = function(x, speed) {
		    
		        //��Q���̐���
		        var obstacle = new Sprite(31, 27);
		        obstacle.image = game.assets["sheep5.png"];
		        obstacle.x = x;
		        obstacle.y = -50;
		        obstacle.frame = 15;
		        obstacle.speed = speed;

            
		        game.rootScene.addChild(obstacle);
		        
		        //�X�v���C�g�̒������
		        obstacle.addEventListener(Event.ENTER_FRAME, function() {
		            obstacle.y += obstacle.speed;
		            obstacle._element.style.zIndex = obstacle.y + obstacle.height;
                //���@�ƏՓ�
		            if (car.within(obstacle, 20 )) {
		                game.life -= 1;
                    game.rootScene.removeChild(obstacle);
		            }
                else if (obstacle.y > 640) {
		                game.rootScene.removeChild(obstacle);
		            }
		            else if (game.life === 0) {
                game.end(game.score, "���Ȃ��̃X�R�A��" + game.score);
		            }
		        });
        };
		    
		    //�V�[���̒������
        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		        game.time++;
            if (game.fps > 0) {
		            //��Q���̐���
		            if ((game.time % 10) === 0) {
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
        scoreLabel._element.style.zIndex = 5;
        
        //���C�t��\��
        lifeLabel = new MutableText(320 - 135, 8, game.width, "");
        lifeLabel.addEventListener('enterframe', function(){
            this.text = "LIFE " + "OOOOOOOOO".substring(0, game.life);
        });
        lifeLabel._element.style.zIndex = 4;
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
