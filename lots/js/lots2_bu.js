// JavaScript Document

//���ϐ��錾�̈ʒu�ƃX�R�[�v�ɂ���
//�������ɂ���

$(function(){
	var VLINE_NUMBER = 5, //�c���̖{��
		LOTS_WIDTH = 722, //���݂������{�̂̉���
		LOTS_HEIGHT = 420, //���݂������{�̂̏c��
		LOTS_VLINE_SPACE = LOTS_WIDTH / (VLINE_NUMBER - 1),
		vLines = [], //���݂������̏c����x���W�p�z��
		hLines = [], //�c���ӂ�̉�����y���W����ꂽ�z����܂Ƃ߂�z��
		hLineNum, //�����̖{��
		hLineMaxY = 0; //��ԉ��̉�����y���W
	
	//���݂�������`��
	function drawLots(){
		//�c���̍��W������
		for(var i = 0; i < VLINE_NUMBER; i++){
			//�c���̖{���ɏ]����x���W������
			vLines.push((LOTS_VLINE_SPACE * i) + 2.4);
		}
		
		//�����̍��W������
		for(var i = 0; i < (VLINE_NUMBER - 1); i++){		
			//�����̖{���������_���Ɍ���i1�`4�j
			hLineNum = Math.floor(Math.random()*4) + 1;
			
			//�����̖{���ɏ]����y���W������
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
	
		//canvas�ɕ`��
		var canvas = document.getElementById('lots_body');
		
		var line = canvas.getContext('2d');
		line.lineWidth = 3;
		line.strokeStyle="#999";
		
		//�c���`��
		for(var i = 0; i < VLINE_NUMBER; i++){
			line.beginPath();
			line.moveTo(vLines[i],0); 
			line.lineTo(vLines[i], LOTS_HEIGHT);
			line.stroke();

			//�����`��
			if(i < (VLINE_NUMBER - 1)){
				for(var j = 0; j < hLines[i].length; j++){
					//console.log('�c' + i + '�{�ڂ�' + j + '��' + hLines[i][j]);
					line.beginPath();
					line.moveTo(vLines[i],hLines[i][j]); 
					line.lineTo(vLines[i] + LOTS_VLINE_SPACE, hLines[i][j]);
					line.stroke();
				}
			}
			
		}
	}
	
	drawLots();
	
	
	//�X�^�[�g�{�^���N���b�N�ł��݂������n�܂�
	$('#lots_header').on('click',function() {
		
		//�H�郋�[�g�̍��W�𔻒�
		for(var i = 0; i < VLINE_NUMBER; i++){
			var nextLineX = [],nextCornerY = [0], count = 0, beforeY = 0, vLineFlg = 0, minY = 0;
			var startLineNum = i; //0�`4
			var currentPoint = {vLineNum:startLineNum, x:vLines[startLineNum], y:0};
			
			console.log('���܂̃��C��' + hLines[currentPoint.vLineNum]);
			console.log('�����ۂ�܂�' + hLines[currentPoint.vLineNum - 1]);
			console.log('��ԉ���y' + hLineMaxY);
			
			do{	
				if(minY === LOTS_HEIGHT){
					break;
				} else {
					minY = LOTS_HEIGHT;
				}
				//console.log(minY.hascontent);
	
				//4�{�ځi�E�[�j�̏c���ɂ�����A���̐��͕]�����Ȃ�
				if(currentPoint.vLineNum !== 4){
					for(var j = 0; j < hLines[currentPoint.vLineNum].length; j++){
						if(hLines[currentPoint.vLineNum][j] < minY && hLines[currentPoint.vLineNum][j] > beforeY){
							nextX = vLines[currentPoint.vLineNum + 1];
							minY = hLines[currentPoint.vLineNum][j];
							vLineFlg = 1;
						}
					}
				}
				//0�{�ځi���[�j�̏c���ɂ�����A���̐��͕]�����Ȃ�
				if(currentPoint.vLineNum !== 0){
					for(var j = 0; j < hLines[currentPoint.vLineNum-1].length; j++){
						if(hLines[currentPoint.vLineNum - 1][j] < minY && hLines[currentPoint.vLineNum - 1][j] > beforeY){
							nextX = vLines[currentPoint.vLineNum - 1];
							minY = hLines[currentPoint.vLineNum - 1][j];
							vLineFlg = 0;
						}
					}
				}
				//���̏c�������{�ڂ�
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
				//console.log('nextLineX�F' + nextLineX);
				//console.log('nextCornerY�F' + nextCornerY);
				//console.log('currentPoint.vLineNum�F' + currentPoint.vLineNum);
				
				count++;
			} 
			while(nextCornerY[count] < hLineMaxY);
			
			console.log(startLineNum + '�Ԗڂ�nextLineX�F' + nextLineX);
			console.log(startLineNum + '�Ԗڂ�nextCornerY�F' + nextCornerY);
		}
		
		
		
		//����`��
		var canvas = document.getElementById('lots_point');
		var circle = canvas.getContext('2d');
		
		var point_1 = {x:vLines[1],y:0};
		var timer;//�^�C�}�[
		
		function draw(x,y){
			circle.clearRect(0,0,730,420);//�J���o�X�S�̂������Ȃ���΋O�Ղ��`����
			circle.fillStyle = '#CC0000';
			circle.beginPath();
			circle.arc(x, y, 10, 0, Math.PI*2, false);
			circle.fill();
		}
		
		function loop(){
			//point_1�̐��l��par�̕��������₷
			//point_1.x = point_1.x + 1;
			currentPoint.y = currentPoint.y + 2;
			//�`�揈�����Ăяo��
			draw(currentPoint.x,currentPoint.y);
			//�^�C�}�[(��x�N���A���Ă���Đݒ�B)
			clearTimeout(timer);
			timer = setTimeout(loop,10);
		}
		
		loop();
		
	});
	
		
});