enchant();

window.onload = function(){

    var game = new Game(320, 320);

    game.fps = 30;
    
    game.preload("chara4.gif","bg.gif","sheep5.png","elephant.png","camel1,2.png");
    
    //�����ݒ�
    game.life = 3;
    touching = false;
    game.time = 0;
    
    
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
        car.targetX = 0;
        car._element.style.zIndex = 2;
		    game.rootScene.addChild(car);

        car.addEventListener('enterframe', function() {
            if (touching) {
                car.x += (car.targetX - (car.x + 16)) /3;
            }
        });
		    
		    
       //�t���[���C�x���g�����������珈��
		    car.addEventListener(Event.ENTER_FRAME, function(){
		        if (game.input.left && (car.x > 0)){ car.x = car.x - 4;	 }
			      if (game.input.right && (car.x < game.width-car.width)){ car.x = car.x + 4; }
		    });
		    
		    //sheep�̒ǉ�
		    game.addSheep = function(x, speed) {
		    
		        //sheep�̐���
		        var sheep = new Sprite(31, 27);
		        sheep.image = game.assets["sheep5.png"];
		        sheep.x = x;
		        sheep.y = -50;
		        sheep.frame = 15;
		        sheep.speed = speed;
            sheep._element.style.zIndex = 6;
		        game.rootScene.addChild(sheep);
		        
		        //�X�v���C�g�̒������
		        sheep.addEventListener(Event.ENTER_FRAME, function() {
		            sheep.y += sheep.speed;
		            sheep._element.style.zIndex = sheep.y + sheep.height;

                //���@�ƏՓ�
		            if (car.within(sheep, 20 )) {
		                game.life --;
                    game.rootScene.removeChild(sheep);
                    if (game.life === 0) {
		                    game.end(game.score, "���Ȃ��̃X�R�A��" + game.score); 
		                }
		            }
                else if (sheep.y > 320) {
		                game.rootScene.removeChild(sheep);
		            }
		            
		        });
        };
		    
		    //�V�[���̒������(sheep)
        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		        game.time++;
            if (game.time < 600 || game.time > 1800) {
		            //sheep�̐���
		            if ((game.time % 10) === 0) {
		                var x     = Math.floor(Math.random() * 300);
		                var speed = 6;
		                game.addSheep(x,speed);
		            }
            }
		        
        });
        
        //elephant�̒ǉ�
		    game.addElephant = function(x, speed) {
		        
		        //elephant�̐���
		        var elephant = new Sprite(54, 40);
		        elephant.image = game.assets["elephant.png"];
		        elephant.x = x;
		        elephant.y = -50;
		        elephant.frame = 15;
		        elephant.speed = speed;
            elephant._element.style.zIndex = 5;
		        game.rootScene.addChild(elephant);
		    
		        //�X�v���C�g�̒������(elephant)
		        elephant.addEventListener(Event.ENTER_FRAME, function() {
		            elephant.y += elephant.speed;
		            elephant._element.style.zIndex = elephant.y + elephant.height;
                //���@�ƏՓ�
		            if (car.within(elephant, 30 )) {
		                game.life -= 1;
                    game.rootScene.removeChild(elephant);
                    if (game.life === 0) {
		                    game.end(game.score, "���Ȃ��̃X�R�A��" + game.score); 
		                }

		            }
                else if (elephant.y > 320) {
		                game.rootScene.removeChild(elephant);
		            }
		        });
		    };
		    
		    //�V�[���̒������(elephant)
		    game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
            if (game.time > 600 && game.time < 1200) {
		            //elephant�̐���
		            if ((game.time % 5) === 0) {
		                var x     = Math.floor(Math.random() * 300);
		                var speed = 6;
		                game.addElephant(x,speed);
		            }
            }
		        
        });
		    
        //camel�̒ǉ�
        game.addCamel = function(x, speed) {

            //camel�̐���
            var camel = new Sprite(51, 38);
            camel.image = game.assets["camel1,2.png"]
            camel.x = x;
            camel.y = -38;
            camel.frame = 15;
            camel.speed = speed;
            camel._element.style.zIndex = 6;
            game.rootScene.addChild(camel);

            //�X�v���C�g�̒������(camel)
            game.tick = 30 * 10
            camel.addEventListener(Event.ENTER_FRAME, function() {
                camel.y += camel.speed;
                camel._element.style.zIndex = camel.y + camel.height;
                camel.x --;
                if ((game.tick % 30) === 0) {
                    camel.frame ++;
                }
                //���@�Ƃ̏Փ�
                if (car.within(camel, 30 )) {
                    game.life -= 1;
                    game.rootScene.removeChild(camel);
                    if (game.life === 0) {
                        game.end(game.score, "���Ȃ��̃X�R�A��" + game.score);
                    }
                }
                else if (camel.y > 320) {
                    game.rootScene.removeChild(camel);
                }
            });
        };

        //�V�[���̒������(camel)
        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
            if (game.time > 1200) {
                //camel�̐���
                if ((game.time % 5) === 0) {
                    var x     = Math.floor(Math.random() * 300);
                    var speed = 6;
                    game.addCamel(x,speed);
                }
            }
        });
 
		    //�X�R�A��\��
		    //draw.text.js�v���O�C�����g�p
		    scoreLabel = new MutableText(8, 8, game.width, "");
        scoreLabel.score = 0;
        scoreLabel._element.style.zIndex = 9;
        
        //���C�t��\��
        lifeLabel = new MutableText(320 - 135, 8, game.width, "");
        lifeLabel.addEventListener('enterframe', function(){
            this.text = "LIFE " + "OOOOOOOOO".substring(0, game.life);
        });
        lifeLabel._element.style.zIndex = 10;
        game.rootScene.addChild(lifeLabel);

        
        //���t���[�������I�ɃX�R�A���X�V����
        scoreLabel.addEventListener('enterframe', function(){ 
            this.text = this.score + " m";
            this.score = Math.floor(game.frame / 1);
        });
        game.rootScene.addChild(scoreLabel);
        game.score = 0;
		    
		    //���C�t���O�ɂȂ����Ƃ���������
		    if (game.life === 0) {
		        game.end(game.score, "���Ȃ��̃X�R�A��" + game.score);
		    };
            

		
		    //�t���[���C�x���g������������}�b�v���X�N���[��
		    map.addEventListener(Event.ENTER_FRAME, function(){
	      map.y = map.y + 6;	// ���Ɉړ�
			  // �}�b�v���X�N���[�����I�������ēx��ɖ߂�
			  if (map.y > -1){ map.y = -map.height + game.height; }
		    
        //�^�b�`����ɑΉ����鏈��
        game.rootScene.addEventListener('touchstart', function(e){
            touching = true;
        });
        game.rootScene.addEventListener('touchend', function(e){
            touching = false;
        });
        game.rootScene.addEventListener('touchmove', function(e){
            car.targetX = e.localX;
        })

		});
	
	}
	
	game.start();	// �Q�[�������J�n

};
