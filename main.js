enchant();

window.onload = function(){

    var game = new Game(320, 320);

    game.fps = 30;
    
    game.preload("chara4.gif","bg.gif","sheep5.png","elephant.png","camel1,2.png");
    
    //初期設定
    game.life = 3;
    touching = false;
    game.time = 0;
    
    
    game.onload = function(){
 
        //マップを設定
        var map = new Sprite(320, 1280);
        map.image = game.assets["bg.gif"];
        map.y = -map.height + game.height;
		    map._element.style.zIndex = 1;
        game.rootScene.addChild(map);
		    
		    //自機の設定
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
		    
		    
       //フレームイベントが発生したら処理
		    car.addEventListener(Event.ENTER_FRAME, function(){
		        if (game.input.left && (car.x > 0)){ car.x = car.x - 4;	 }
			      if (game.input.right && (car.x < game.width-car.width)){ car.x = car.x + 4; }
		    });
		    
		    //sheepの追加
		    game.addSheep = function(x, speed) {
		    
		        //sheepの生成
		        var sheep = new Sprite(31, 27);
		        sheep.image = game.assets["sheep5.png"];
		        sheep.x = x;
		        sheep.y = -50;
		        sheep.frame = 15;
		        sheep.speed = speed;
            sheep._element.style.zIndex = 6;
		        game.rootScene.addChild(sheep);
		        
		        //スプライトの定期処理
		        sheep.addEventListener(Event.ENTER_FRAME, function() {
		            sheep.y += sheep.speed;
		            sheep._element.style.zIndex = sheep.y + sheep.height;

                //自機と衝突
		            if (car.within(sheep, 20 )) {
		                game.life --;
                    game.rootScene.removeChild(sheep);
                    if (game.life === 0) {
		                    game.end(game.score, "あなたのスコアは" + game.score); 
		                }
		            }
                else if (sheep.y > 320) {
		                game.rootScene.removeChild(sheep);
		            }
		            
		        });
        };
		    
		    //シーンの定期処理(sheep)
        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		        game.time++;
            if (game.time < 600 || game.time > 1800) {
		            //sheepの生成
		            if ((game.time % 10) === 0) {
		                var x     = Math.floor(Math.random() * 300);
		                var speed = 6;
		                game.addSheep(x,speed);
		            }
            }
		        
        });
        
        //elephantの追加
		    game.addElephant = function(x, speed) {
		        
		        //elephantの生成
		        var elephant = new Sprite(54, 40);
		        elephant.image = game.assets["elephant.png"];
		        elephant.x = x;
		        elephant.y = -50;
		        elephant.frame = 15;
		        elephant.speed = speed;
            elephant._element.style.zIndex = 5;
		        game.rootScene.addChild(elephant);
		    
		        //スプライトの定期処理(elephant)
		        elephant.addEventListener(Event.ENTER_FRAME, function() {
		            elephant.y += elephant.speed;
		            elephant._element.style.zIndex = elephant.y + elephant.height;
                //自機と衝突
		            if (car.within(elephant, 30 )) {
		                game.life -= 1;
                    game.rootScene.removeChild(elephant);
                    if (game.life === 0) {
		                    game.end(game.score, "あなたのスコアは" + game.score); 
		                }

		            }
                else if (elephant.y > 320) {
		                game.rootScene.removeChild(elephant);
		            }
		        });
		    };
		    
		    //シーンの定期処理(elephant)
		    game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
            if (game.time > 600 && game.time < 1200) {
		            //elephantの生成
		            if ((game.time % 5) === 0) {
		                var x     = Math.floor(Math.random() * 300);
		                var speed = 6;
		                game.addElephant(x,speed);
		            }
            }
		        
        });
		    
        //camelの追加
        game.addCamel = function(x, speed) {

            //camelの生成
            var camel = new Sprite(51, 38);
            camel.image = game.assets["camel1,2.png"]
            camel.x = x;
            camel.y = -38;
            camel.frame = 15;
            camel.speed = speed;
            camel._element.style.zIndex = 6;
            game.rootScene.addChild(camel);

            //スプライトの定期処理(camel)
            game.tick = 30 * 10
            camel.addEventListener(Event.ENTER_FRAME, function() {
                camel.y += camel.speed;
                camel._element.style.zIndex = camel.y + camel.height;
                camel.x --;
                if ((game.tick % 30) === 0) {
                    camel.frame ++;
                }
                //自機との衝突
                if (car.within(camel, 30 )) {
                    game.life -= 1;
                    game.rootScene.removeChild(camel);
                    if (game.life === 0) {
                        game.end(game.score, "あなたのスコアは" + game.score);
                    }
                }
                else if (camel.y > 320) {
                    game.rootScene.removeChild(camel);
                }
            });
        };

        //シーンの定期処理(camel)
        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
            if (game.time > 1200) {
                //camelの生成
                if ((game.time % 5) === 0) {
                    var x     = Math.floor(Math.random() * 300);
                    var speed = 6;
                    game.addCamel(x,speed);
                }
            }
        });
 
		    //スコアを表示
		    //draw.text.jsプラグインを使用
		    scoreLabel = new MutableText(8, 8, game.width, "");
        scoreLabel.score = 0;
        scoreLabel._element.style.zIndex = 9;
        
        //ライフを表示
        lifeLabel = new MutableText(320 - 135, 8, game.width, "");
        lifeLabel.addEventListener('enterframe', function(){
            this.text = "LIFE " + "OOOOOOOOO".substring(0, game.life);
        });
        lifeLabel._element.style.zIndex = 10;
        game.rootScene.addChild(lifeLabel);

        
        //毎フレーム自動的にスコアを更新する
        scoreLabel.addEventListener('enterframe', function(){ 
            this.text = this.score + " m";
            this.score = Math.floor(game.frame / 1);
        });
        game.rootScene.addChild(scoreLabel);
        game.score = 0;
		    
		    //ライフが０になったとき爆発する
		    if (game.life === 0) {
		        game.end(game.score, "あなたのスコアは" + game.score);
		    };
            

		
		    //フレームイベントが発生したらマップをスクロール
		    map.addEventListener(Event.ENTER_FRAME, function(){
	      map.y = map.y + 6;	// 下に移動
			  // マップがスクロールし終わったら再度上に戻す
			  if (map.y > -1){ map.y = -map.height + game.height; }
		    
        //タッチ操作に対応する処理
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
	
	game.start();	// ゲーム処理開始

};
