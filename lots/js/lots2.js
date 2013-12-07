//****************************************************
//* ���A��Day���߂��݂����� ver 2.2
//****************************************************

$(function() {
    var VLINE_NUMBER = 5,                                   //�c���̖{��
        LOTS_HLINE_MAXNUMBER = 4,                           //�����̍ő�{��
        LOTS_WIDTH = 722,                                   //���݂������{�̂̉���
        LOTS_HEIGHT = 420,                                  //���݂������{�̂̏c��
        LOTS_VLINE_SPACE = LOTS_WIDTH / (VLINE_NUMBER - 1), //�c���Əc���̊Ԋu
        LOTS_HLINE_MINSPACE = 10,                           //�����Ԋu�̍ŏ��l
        LOTS_HLINE_SPACE = 20,                              //�����Ԋu���ŏ��l�ȉ��̂Ƃ��ɊJ����Ԋu
        LEFT_MARGIN = 2.4,                                  //�c����`���͈͂̃}�[�W��
        TOP_MARGIN = 20,                                    //������`���͈͂̃}�[�W��
        BOTTOM_MARGIN = 40,                                 //������`���͈͂̃}�[�W��
        ADJUST_SHAPE_X = 10,                                //css��canvas�����炵�Ă��镪��␳
        LINE_WEIGHT = 3,                                    //���݂������̐��̑���
        vLines = [],                                        //������Ԃ��݂������̏c����x���W������z��
        hLines = [],                                        //�u�c�����ꂼ��́A������y���W����ꂽ�z��v���܂Ƃ߂�z��
        xPoints = [],                                       //�������ǂ�x���W���܂Ƃ߂�z��
        yPoints = [],                                       //�������ǂ�y���W���܂Ƃ߂�z��
        lineColorSet = '#999',                              //���݂������̐��̐F
        pointColorSet = ['#E95413', '#00A0E8', '#E50012', '#009139', '#F7B52C']; //���̐F



	lotsInit();



    //----------------------------------------------------
	//-���݂������̏�����Ԃ̕`��
	//----------------------------------------------------
    function drawLots() {
    	var canvas = document.getElementById('lots_body'),
    	    line = canvas.getContext('2d');

        //�`�悷�邠�݂������̍��W������
		setLotsPoint();

        //�`�悷��
        line.lineWidth = LINE_WEIGHT;
        line.strokeStyle = lineColorSet;

        //�c���`��
        line.beginPath();
        for (var i = 0; i < VLINE_NUMBER; i++) {
            vLine = vLines[i];
            line.moveTo(vLine,0);
            line.lineTo(vLine, LOTS_HEIGHT);

            //�����`��
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
	//-���݂������̏�����Ԃ̍��W������
	//----------------------------------------------------
	function setLotsPoint() {
		var currentLineY = [], allLineY = [], hLineNum, newLineY;

		//�c����x���W��z��ɓ����
        for (var i = 0; i < VLINE_NUMBER; i++) {
            vLines.push((LOTS_VLINE_SPACE * i) + LEFT_MARGIN);
        }


		//�c�����ꂼ��ɑ΂��āA�����̖{���ƍ��W������
        for (var i = 0; i < (VLINE_NUMBER - 1); i++) {
            //�����̖{�������߂�
            hLineNum = Math.floor(Math.random() * LOTS_HLINE_MAXNUMBER) + 1;

            //�����{������y���W����ꂽ�z��𐶐�
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
	//-y���W�ɓ����l��߂�����l������Ȃ��悤�ɂ���
	//----------------------------------------------------
	function alterNearY(y,arrey) {
		//��r���邽�߂̔z����\�[�g
		arrey.sort(
	        function(a,b) {
        	    return a - b;
            }
        );

		//���߂�y���W������͈͓��ɕʂ̉���������΁A�l�����炷
		for (var i = 0, len = arrey.length; i < len; i++) {
			if ((y - LOTS_HLINE_MINSPACE) < arrey[i] && arrey[i] < (y + LOTS_HLINE_MINSPACE)) {
				if ((y + LOTS_HLINE_SPACE) < (LOTS_HEIGHT - TOP_MARGIN)) {
				    y = y + LOTS_HLINE_SPACE;
				} else {
					//LOTS_HLINE_SPACE�𑫂����Ƃ��ɐ��̕`��͈͂𒴂���ꍇ�A���̐����̂�����
					y = 0;
				}
			}
		}
		arrey.push(y);
		return y;
	}



    //----------------------------------------------------
	//-�����H�郋�[�g�̍��W��ۑ�����
	//----------------------------------------------------
	function saveRoute() {
		var startLineNum, nextLineX, nextCornerY,
            beforeY, nextY, vLineFlg, currentPoint;

		//�����ꂼ��ɂ��ă��[�g��ۑ�
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

                //����������c�����݂�i�E�[�̐��ɂ���ꍇ�݂͂Ȃ��j
                if (currentPoint.vLineNum !== (VLINE_NUMBER - 1)) {
					saveRouteYPoint(hLines[currentPoint.vLineNum],beforeY,1);
                }

                //����������c���̍��̏c�����݂�i���[�̐��ɂ���ꍇ�݂͂Ȃ��j
                if (currentPoint.vLineNum !== 0) {
					saveRouteYPoint(hLines[currentPoint.vLineNum - 1],beforeY,0);
                }

                //�����ړ�����c�����E����������
				currentPoint.vLineNum = desideNextVLine(vLineFlg,currentPoint.vLineNum);

                nextLineX.push(nextX);
                nextCornerY.push(nextY);

				beforeY = nextY;

            }

            //���́��ɂ��Đ��������z����A�܂Ƃ߂̔z��ɉ�����
			xPoints[startLineNum] = nextLineX;
            yPoints[startLineNum] = nextCornerY;

        }

		//----------------------------------------------------
	    //-�����̍��W�`�F�b�N
	    //----------------------------------------------------
	    function saveRouteYPoint(hLinesArrey,beforeY,desideVLineFlg) {
		    for (var j = 0, len = hLinesArrey.length; j < len; j++) {
				//�Y�����鉡��������΁Ax���W��y���W��ۑ�
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
	    //-�����ړ�����c�����E����������
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
	//-push start�ł��݂������n�܂�
	//----------------------------------------------------
    $('#mask').on('click',function() {
        var pointCanvas = document.getElementById('lots_point'),
            stage = new createjs.Stage(pointCanvas),
            shapes = [], point, shape;

        //�}�X�N�������Ă��灛�A�j���[�V�����J�n
		$(this).off('click').animate( { 'opacity':0 }, { complete:function () {

        	//���𐶐�
            for (var i = 0; i < VLINE_NUMBER; i++) {
            	point = new createjs.Graphics();
            	point.beginFill(pointColorSet[i]).drawCircle(0,0,10);

            	shape = new createjs.Shape(point);
            	shape.x = vLines[i] + ADJUST_SHAPE_X;
            	shape.y = 0;
            	shapes.push(shape);
                stage.addChild(shape);

                //�A�j���[�V�����X�^�[�g
                drawTween(shapes[i],i,0);
            }
        }});

        //�A�j���[�V�����̃t���b�V�����[�g�ݒ�
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addListener(stage);

    });


    //----------------------------------------------------
	//-���̃A�j���[�V�����̒�`
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
	//-������
	//----------------------------------------------------
    function lotsInit() {

        //���݂�������`��
        drawLots();

        //�H�郋�[�g�̍��W��ۑ�
		saveRoute();

	}

});