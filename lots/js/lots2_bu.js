// JavaScript Document

//※変数宣言の位置とスコープについて
//※書式について

$(function(){
	var VLINE_NUMBER = 5, //縦線の本数
		LOTS_WIDTH = 722, //あみだくじ本体の横幅
		LOTS_HEIGHT = 420, //あみだくじ本体の縦幅
		LOTS_VLINE_SPACE = LOTS_WIDTH / (VLINE_NUMBER - 1),
		vLines = [], //あみだくじの縦線のx座標用配列
		hLines = [], //縦線辺りの横線のy座標を入れた配列をまとめる配列
		hLineNum, //横線の本数
		hLineMaxY = 0; //一番下の横線のy座標
	
	//あみだくじを描画
	function drawLots(){
		//縦線の座標を決定
		for(var i = 0; i < VLINE_NUMBER; i++){
			//縦線の本数に従ってx座標を入れる
			vLines.push((LOTS_VLINE_SPACE * i) + 2.4);
		}
		
		//横線の座標を決定
		for(var i = 0; i < (VLINE_NUMBER - 1); i++){		
			//横線の本数をランダムに決定（1～4）
			hLineNum = Math.floor(Math.random()*4) + 1;
			
			//横線の本数に従ってy座標を入れる
			var currentLineY = [];
			for(var j = 0; j < hLineNum; j++){
				var newLineY = Math.floor(Math.random()* (LOTS_HEIGHT - 40))  + 20;
				currentLineY.push(newLineY);
				if(hLineMaxY < newLineY){
					hLineMaxY = newLineY;
				}
			}
			hLines.push(currentLineY);
		}
	
		//canvasに描画
		var canvas = document.getElementById('lots_body');
		
		var line = canvas.getContext('2d');
		line.lineWidth = 3;
		line.strokeStyle="#999";
		
		//縦線描画
		for(var i = 0; i < VLINE_NUMBER; i++){
			line.beginPath();
			line.moveTo(vLines[i],0); 
			line.lineTo(vLines[i], LOTS_HEIGHT);
			line.stroke();

			//横線描画
			if(i < (VLINE_NUMBER - 1)){
				for(var j = 0; j < hLines[i].length; j++){
					//console.log('縦' + i + '本目の' + j + '個目' + hLines[i][j]);
					line.beginPath();
					line.moveTo(vLines[i],hLines[i][j]); 
					line.lineTo(vLines[i] + LOTS_VLINE_SPACE, hLines[i][j]);
					line.stroke();
				}
			}
			
		}
	}
	
	drawLots();
	
	
	//スタートボタンクリックであみだくじ始まる
	$('#lots_header').on('click',function() {
		
		//辿るルートの座標を判定
		for(var i = 0; i < VLINE_NUMBER; i++){
			var nextLineX = [],nextCornerY = [0], count = 0, beforeY = 0, vLineFlg = 0, minY = 0;
			var startLineNum = i; //0～4
			var currentPoint = {vLineNum:startLineNum, x:vLines[startLineNum], y:0};
			
			console.log('いまのライン' + hLines[currentPoint.vLineNum]);
			console.log('いっぽんまえ' + hLines[currentPoint.vLineNum - 1]);
			console.log('一番下のy' + hLineMaxY);
			
			do{	
				if(minY === LOTS_HEIGHT){
					break;
				} else {
					minY = LOTS_HEIGHT;
				}
				//console.log(minY.hascontent);
	
				//4本目（右端）の縦線にきたら、その線は評価しない
				if(currentPoint.vLineNum !== 4){
					for(var j = 0; j < hLines[currentPoint.vLineNum].length; j++){
						if(hLines[currentPoint.vLineNum][j] < minY && hLines[currentPoint.vLineNum][j] > beforeY){
							nextX = vLines[currentPoint.vLineNum + 1];
							minY = hLines[currentPoint.vLineNum][j];
							vLineFlg = 1;
						}
					}
				}
				//0本目（左端）の縦線にきたら、その線は評価しない
				if(currentPoint.vLineNum !== 0){
					for(var j = 0; j < hLines[currentPoint.vLineNum-1].length; j++){
						if(hLines[currentPoint.vLineNum - 1][j] < minY && hLines[currentPoint.vLineNum - 1][j] > beforeY){
							nextX = vLines[currentPoint.vLineNum - 1];
							minY = hLines[currentPoint.vLineNum - 1][j];
							vLineFlg = 0;
						}
					}
				}
				//次の縦線が何本目か
				if(vLineFlg){
					currentPoint.vLineNum = currentPoint.vLineNum + 1;
				} else {
					currentPoint.vLineNum = currentPoint.vLineNum - 1;
				}
				
				beforeY = minY;
				if(minY === LOTS_HEIGHT){
					break;
				}
				nextLineX.push(nextX);
				nextCornerY.push(minY);
				//console.log('nextLineX：' + nextLineX);
				//console.log('nextCornerY：' + nextCornerY);
				//console.log('currentPoint.vLineNum：' + currentPoint.vLineNum);
				
				count++;
			} 
			while(nextCornerY[count] < hLineMaxY);
			
			console.log(startLineNum + '番目のnextLineX：' + nextLineX);
			console.log(startLineNum + '番目のnextCornerY：' + nextCornerY);
		}
		
		
		
		//○を描く
		var canvas = document.getElementById('lots_point');
		var circle = canvas.getContext('2d');
		
		var point_1 = {x:vLines[1],y:0};
		var timer;//タイマー
		
		function draw(x,y){
			circle.clearRect(0,0,730,420);//カンバス全体を消さなければ軌跡も描ける
			circle.fillStyle = '#CC0000';
			circle.beginPath();
			circle.arc(x, y, 10, 0, Math.PI*2, false);
			circle.fill();
		}
		
		function loop(){
			//point_1の数値をparの分だけ増やす
			//point_1.x = point_1.x + 1;
			currentPoint.y = currentPoint.y + 2;
			//描画処理を呼び出す
			draw(currentPoint.x,currentPoint.y);
			//タイマー(一度クリアしてから再設定。)
			clearTimeout(timer);
			timer = setTimeout(loop,10);
		}
		
		loop();
		
	});
	
		
});