enchant();

window.onload = function(){

    var game = new Game(320, 320);

    game.fps = 50;
    
    game.preload("chara4.gif","bg.gif","icon1.png","sheep5.png");
    
    //初期設定
    game.life = 3;
    touching = false;
    game.time = 0;
    items = [];
    
    
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
        car._element.style.zIndex = 3;
		    game.rootScene.addChild(car);
		    
		    
       //フレームイベントが発生したら処理
		    car.addEventListener(Event.ENTER_FRAME, function(){
		        if (game.input.left && (car.x > 0)){ car.x = car.x - 4;	 }
			      if (game.input.right && (car.x < game.width-car.width)){ car.x = car.x + 4; }
		    });
		    
		    //障害物の追加
		    game.addObstacle = function(x, speed) {
		    
		        //障害物の生成
		        var obstacle = new Sprite(31, 27);
		        obstacle.image = game.assets["sheep5.png"];
		        obstacle.x = x;
		        obstacle.y = -50;
		        obstacle.frame = 15;
		        obstacle.speed = speed;

            
		        game.rootScene.addChild(obstacle);
		        
		        //スプライトの定期処理
		        obstacle.addEventListener(Event.ENTER_FRAME, function() {
		            obstacle.y += obstacle.speed;
		            obstacle._element.style.zIndex = obstacle.y + obstacle.height;
                //自機と衝突
		            if (car.within(obstacle, 20 )) {
		                game.life -= 1;
                    game.rootScene.removeChild(obstacle);
		            }
                else if (obstacle.y > 640) {
		                game.rootScene.removeChild(obstacle);
		            }
		            else if (game.life === 0) {
                game.end(game.score, "あなたのスコアは" + game.score);
		            }
		        });
        };
		    
		    //シーンの定期処理
        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		        game.time++;
            if (game.fps > 0) {
		            //障害物の生成
		            if ((game.time % 10) === 0) {
		                var x     = Math.floor(Math.random() * 300);
		                var speed = 4;
		                game.addObstacle(x,speed);
		            }
            }
		        
        });

		    //スコアを表示
		    //draw.text.jsプラグインを使用
		    scoreLabel = new MutableText(8, 8, game.width, "");
        scoreLabel.score = 0;
        scoreLabel._element.style.zIndex = 5;
        
        //ライフを表示
        lifeLabel = new MutableText(320 - 135, 8, game.width, "");
        lifeLabel.addEventListener('enterframe', function(){
            this.text = "LIFE " + "OOOOOOOOO".substring(0, game.life);
        });
        lifeLabel._element.style.zIndex = 4;
        game.rootScene.addChild(lifeLabel);

        
        //毎フレーム自動的にスコアを更新する
        scoreLabel.addEventListener('enterframe', function(){ 
            this.text = this.score + " m";
            this.score = Math.floor(game.frame / 1);
        });
        game.rootScene.addChild(scoreLabel);
        game.score = 0;
		    
		
		//フレームイベントが発生したらマップをスクロール
		map.addEventListener(Event.ENTER_FRAME, function(){
	      map.y = map.y + 4;	// 下に移動
			  // マップがスクロールし終わったら再度上に戻す
			  if (map.y > -1){ map.y = -map.height + game.height; }
		    
		});
	
	}
	
	game.start();	// ゲーム処理開始

}
