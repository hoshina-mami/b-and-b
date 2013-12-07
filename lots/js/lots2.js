//****************************************************
//* 早帰りDay決めあみだくじ ver 2.2
//****************************************************

$(function() {
    var VLINE_NUMBER = 5,                                   //縦線の本数
        LOTS_HLINE_MAXNUMBER = 4,                           //横線の最大本数
        LOTS_WIDTH = 722,                                   //あみだくじ本体の横幅
        LOTS_HEIGHT = 420,                                  //あみだくじ本体の縦幅
        LOTS_VLINE_SPACE = LOTS_WIDTH / (VLINE_NUMBER - 1), //縦線と縦線の間隔
        LOTS_HLINE_MINSPACE = 10,                           //横線間隔の最小値
        LOTS_HLINE_SPACE = 20,                              //横線間隔が最小値以下のときに開ける間隔
        LEFT_MARGIN = 2.4,                                  //縦線を描く範囲のマージン
        TOP_MARGIN = 20,                                    //横線を描く範囲のマージン
        BOTTOM_MARGIN = 40,                                 //横線を描く範囲のマージン
        ADJUST_SHAPE_X = 10,                                //cssでcanvasをずらしている分を補正
        LINE_WEIGHT = 3,                                    //あみだくじの線の太さ
        vLines = [],                                        //初期状態あみだくじの縦線のx座標を入れる配列
        hLines = [],                                        //「縦線それぞれの、横線のy座標を入れた配列」をまとめる配列
        xPoints = [],                                       //○がたどるx座標をまとめる配列
        yPoints = [],                                       //○がたどるy座標をまとめる配列
        lineColorSet = '#999',                              //あみだくじの線の色
        pointColorSet = ['#E95413', '#00A0E8', '#E50012', '#009139', '#F7B52C']; //○の色



	lotsInit();



    //----------------------------------------------------
	//-あみだくじの初期状態の描画
	//----------------------------------------------------
    function drawLots() {
    	var canvas = document.getElementById('lots_body'),
    	    line = canvas.getContext('2d');

        //描画するあみだくじの座標を決定
		setLotsPoint();

        //描画する
        line.lineWidth = LINE_WEIGHT;
        line.strokeStyle = lineColorSet;

        //縦線描画
        line.beginPath();
        for (var i = 0; i < VLINE_NUMBER; i++) {
            vLine = vLines[i];
            line.moveTo(vLine,0);
            line.lineTo(vLine, LOTS_HEIGHT);

            //横線描画
            if (i < (VLINE_NUMBER - 1)) {
                for (var j = 0, len = hLines[i].length; j < len; j++) {
                    line.moveTo(vLine,hLines[i][j]);
                    line.lineTo(vLine + LOTS_VLINE_SPACE, hLines[i][j]);
                }
            }
        }
        line.stroke();
    }


	//----------------------------------------------------
	//-あみだくじの初期状態の座標を決定
	//----------------------------------------------------
	function setLotsPoint() {
		var currentLineY = [], allLineY = [], hLineNum, newLineY;

		//縦線のx座標を配列に入れる
        for (var i = 0; i < VLINE_NUMBER; i++) {
            vLines.push((LOTS_VLINE_SPACE * i) + LEFT_MARGIN);
        }


		//縦線それぞれに対して、横線の本数と座標を決定
        for (var i = 0; i < (VLINE_NUMBER - 1); i++) {
            //横線の本数を決める
            hLineNum = Math.floor(Math.random() * LOTS_HLINE_MAXNUMBER) + 1;

            //横線本数分のy座標を入れた配列を生成
            currentLineY = [];
            for (var j = 0; j < hLineNum; j++) {
                newLineY = Math.floor(Math.random()* (LOTS_HEIGHT - BOTTOM_MARGIN) + TOP_MARGIN);
                newLineY = alterNearY(newLineY,allLineY);
               if (newLineY !== 0) {
                	currentLineY.push(newLineY);
                }
            }

            hLines.push(currentLineY);
        }
	}


	//----------------------------------------------------
	//-y座標に同じ値や近すぎる値が入らないようにする
	//----------------------------------------------------
	function alterNearY(y,arrey) {
		//比較するための配列をソート
		arrey.sort(
	        function(a,b) {
        	    return a - b;
            }
        );

		//求めたy座標から一定範囲内に別の横線があれば、値をずらす
		for (var i = 0, len = arrey.length; i < len; i++) {
			if ((y - LOTS_HLINE_MINSPACE) < arrey[i] && arrey[i] < (y + LOTS_HLINE_MINSPACE)) {
				if ((y + LOTS_HLINE_SPACE) < (LOTS_HEIGHT - TOP_MARGIN)) {
				    y = y + LOTS_HLINE_SPACE;
				} else {
					//LOTS_HLINE_SPACEを足したときに線の描画範囲を超える場合、その線自体を消す
					y = 0;
				}
			}
		}
		arrey.push(y);
		return y;
	}



    //----------------------------------------------------
	//-○が辿るルートの座標を保存する
	//----------------------------------------------------
	function saveRoute() {
		var startLineNum, nextLineX, nextCornerY,
            beforeY, nextY, vLineFlg, currentPoint;

		//○それぞれについてルートを保存
		for (var i = 0; i < VLINE_NUMBER; i++) {
            nextLineX = [];
            nextCornerY = [0];
            beforeY = 0;
            vLineFlg = 0;
            nextY = 0;
            startLineNum = i;
            currentPoint = { vLineNum:startLineNum, x:vLines[startLineNum], y:0 };


			for (var k = 0; nextCornerY[k] !== LOTS_HEIGHT; k++) {
				nextY = LOTS_HEIGHT;

                //今○がいる縦線をみる（右端の線にいる場合はみない）
                if (currentPoint.vLineNum !== (VLINE_NUMBER - 1)) {
					saveRouteYPoint(hLines[currentPoint.vLineNum],beforeY,1);
                }

                //今○がいる縦線の左の縦線をみる（左端の線にいる場合はみない）
                if (currentPoint.vLineNum !== 0) {
					saveRouteYPoint(hLines[currentPoint.vLineNum - 1],beforeY,0);
                }

                //○が移動する縦線が右か左か判別
				currentPoint.vLineNum = desideNextVLine(vLineFlg,currentPoint.vLineNum);

                nextLineX.push(nextX);
                nextCornerY.push(nextY);

				beforeY = nextY;

            }

            //この○について生成した配列を、まとめの配列に加える
			xPoints[startLineNum] = nextLineX;
            yPoints[startLineNum] = nextCornerY;

        }

		//----------------------------------------------------
	    //-横線の座標チェック
	    //----------------------------------------------------
	    function saveRouteYPoint(hLinesArrey,beforeY,desideVLineFlg) {
		    for (var j = 0, len = hLinesArrey.length; j < len; j++) {
				//該当する横線があれば、x座標とy座標を保存
			    if (hLinesArrey[j] < nextY && hLinesArrey[j] > beforeY) {
					if (desideVLineFlg === 0) {
                        nextX = vLines[currentPoint.vLineNum - 1] + ADJUST_SHAPE_X;
					} else {
						nextX = vLines[currentPoint.vLineNum + 1] + ADJUST_SHAPE_X;
					}
                    nextY = hLinesArrey[j];
                    vLineFlg = desideVLineFlg;
                 }
            }
	    }

		//----------------------------------------------------
	    //-○が移動する縦線が右か左か判別
	    //----------------------------------------------------
	    function desideNextVLine(vLineFlg,vLineNum) {
		    if (vLineFlg) {
                vLineNum = vLineNum + 1;
            } else {
                vLineNum = vLineNum - 1;
            }
		    return vLineNum;
	    }

	}



	//----------------------------------------------------
	//-push startであみだくじ始まる
	//----------------------------------------------------
    $('#mask').on('click',function() {
        var pointCanvas = document.getElementById('lots_point'),
            stage = new createjs.Stage(pointCanvas),
            shapes = [], point, shape;

        //マスクを消してから○アニメーション開始
		$(this).off('click').animate( { 'opacity':0 }, { complete:function () {

        	//○を生成
            for (var i = 0; i < VLINE_NUMBER; i++) {
            	point = new createjs.Graphics();
            	point.beginFill(pointColorSet[i]).drawCircle(0,0,10);

            	shape = new createjs.Shape(point);
            	shape.x = vLines[i] + ADJUST_SHAPE_X;
            	shape.y = 0;
            	shapes.push(shape);
                stage.addChild(shape);

                //アニメーションスタート
                drawTween(shapes[i],i,0);
            }
        }});

        //アニメーションのフレッシュレート設定
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addListener(stage);

    });


    //----------------------------------------------------
	//-○のアニメーションの定義
	//----------------------------------------------------
    function drawTween(target,pointNum,drawCount) {
        createjs.Tween.get(target)
            .to(
            	{ y:yPoints[pointNum][drawCount + 1] },
            	(yPoints[pointNum][drawCount + 1] - yPoints[pointNum][drawCount]) / LOTS_HEIGHT * 1500
            )
            .to( { x:xPoints[pointNum][drawCount] }, 500)
            .call(function() {
                if (xPoints[pointNum][drawCount] === undefined) {
                    return;
                } else {
                    drawCount++;
                    drawTween(target,pointNum,drawCount);
                }
            });
    }



	//----------------------------------------------------
	//-初期化
	//----------------------------------------------------
    function lotsInit() {

        //あみだくじを描画
        drawLots();

        //辿るルートの座標を保存
		saveRoute();

	}

});