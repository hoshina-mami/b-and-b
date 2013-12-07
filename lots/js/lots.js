// JavaScript Document
$(function(){
	//���݂������̉����̃p�^�[���i�ق�Ƃ̓����_���ɂ������j
	var patterns = { 'pattern_1' : [1,3,4,6,9,11,12,15,17,18],
					 'pattern_2' : [2,3,5,7,10,11,13,14,15,17,18],
					 'pattern_3' : [1,4,8,9,10,12,16,17],
					 'pattern_4' : [1,2,5,7,9,11,12,15,18],
					 'pattern_5' : [3,5,6,8,10,13,14,16,17] };

	//�H�郋�[�g�i�ق�Ƃ̓����_���ɑΉ����Ăق����j
	var route_pattern1 = {'sb1':[{'cross_1':'left'}, {'cross_6':'left'}, {'cross_11':'left'},{'cross_12':'right'}, {'cross_9':'right'},{'goal':'2'}],
			              'sb2':[{'cross_1':'right'}, {'cross_3':'left'}, {'cross_4':'right'},{'goal':'1'}],
			              'sb3':[{'cross_6':'right'}, {'cross_3':'right'}, {'cross_4':'left'}, {'cross_9':'left'},{'goal':'3'}],
			              'sb4':[{'cross_15':'left'}, {'cross_17':'right'}, {'cross_18':'left'},{'goal':'5'}],
			              'sb5':[{'cross_15':'right'}, {'cross_11':'right'}, {'cross_12':'left'}, {'cross_17':'left'}, {'cross_18':'right'},{'goal':'4'}]},
		route_pattern2 = {'sb1':[{'cross_2':'left'}, {'cross_7':'left'}, {'cross_13':'left'}, {'cross_18':'left'},{'goal':'5'}],
			              'sb2':[{'cross_2':'right'}, {'cross_3':'left'}, {'cross_5':'right'},{'goal':'1'}],
			              'sb3':[{'cross_10':'left'}, {'cross_15':'left'}, {'cross_17':'right'}, {'cross_13':'right'}, {'cross_14':'left'},{'goal':'4'}],
			              'sb4':[{'cross_10':'right'}, {'cross_11':'left'}, {'cross_17':'left'}, {'cross_18':'right'}, {'cross_14':'right'},{'goal':'3'}],
			              'sb5':[{'cross_15':'right'}, {'cross_11':'right'}, {'cross_7':'right'}, {'cross_3':'right'}, {'cross_5':'left'},{'goal':'2'}]},
		route_pattern3 = {'sb1':[{'cross_1':'left'}, {'cross_8':'left'}, {'cross_9':'right'},{'goal':'2'}],
			              'sb2':[{'cross_1':'right'}, {'cross_4':'left'}, {'cross_9':'left'},{'goal':'3'}],
			              'sb3':[{'cross_10':'left'}, {'cross_16':'left'}, {'cross_17':'right'},{'goal':'4'}],
			              'sb4':[{'cross_10':'right'}, {'cross_12':'left'}, {'cross_17':'left'},{'goal':'5'}],
			              'sb5':[{'cross_16':'right'}, {'cross_12':'right'}, {'cross_8':'right'}, {'cross_4':'right'},{'goal':'1'}]},
		route_pattern4 = {'sb1':[{'cross_1':'left'}, {'cross_2':'right'}, {'cross_5':'left'},{'goal':'2'}],
			              'sb2':[{'cross_1':'right'}, {'cross_2':'left'}, {'cross_7':'left'}, {'cross_12':'left'}, {'cross_18':'left'},{'goal':'5'}],
			              'sb3':[{'cross_11':'left'}, {'cross_12':'right'}, {'cross_9':'right'}, {'cross_5':'right'},{'goal':'1'}],
			              'sb4':[{'cross_15':'left'}, {'cross_18':'right'},{'goal':'4'}],
			              'sb5':[{'cross_15':'right'}, {'cross_11':'right'}, {'cross_7':'right'}, {'cross_9':'left'},{'goal':'3'}]},
		route_pattern5 = {'sb1':[{'cross_3':'left'}, {'cross_8':'left'}, {'cross_13':'left'}, {'cross_14':'right'},{'goal':'3'}],
			              'sb2':[{'cross_6':'left'}, {'cross_8':'right'}, {'cross_5':'right'},{'goal':'1'}],
			              'sb3':[{'cross_10':'left'}, {'cross_16':'left'}, {'cross_17':'right'}, {'cross_13':'right'}, {'cross_14':'left'},{'goal':'4'}],
			              'sb4':[{'cross_10':'right'}, {'cross_6':'right'}, {'cross_3':'right'}, {'cross_5':'left'},{'goal':'2'}],
			              'sb5':[{'cross_16':'right'}, {'cross_17':'left'},{'goal':'5'}]};

	//���[�g�܂Ƃ�
	var routes = [route_pattern1,route_pattern2,route_pattern3,route_pattern4,route_pattern5];
	//�j��������
	var days = ['Mon','Tue','Wed','Thu','Fri'];


	//�ǂݍ��ݎ��ɂ��݂������̃p�^�[��������------------------------------------------------------------------
	//�����̃p�^�[����5��ނ���I��
	var patternNum = Math.round(Math.random()*4 + 1);
	var currentPttern = patterns['pattern_' + patternNum];

	//�j���̏������V���b�t�����ē����
	var i = days.length;
	while(i){
		var j = Math.floor(Math.random()*i);
	    var t = days[--i];
	    days[i] = days[j];
	    days[j] = t;
	}

	for(i = 0; i < days.length; i++){
		var $resultBox = $('<div id="resultBtn_' + (i+1) + '" class="lots_resultBtn"></div>').addClass(days[i]).appendTo('#lots_result');
		$('<p></p>').appendTo($resultBox);
	}

	//���݂�����������������
	initLots();


	//���݂�����������������֐�---------------------------------------------------------------------------
	function initLots(){
		//�O��̂��݂�����������
		$('.lots_cross').removeClass('on').css('width',180 + 'px');
		$('.lots_line_cross').remove();
		$('.lots_line_bar').remove();

		//�܂�����ȏ�Ԃ̂��݂�������\��
		for(i = 0; i < currentPttern.length; i++){
			//�����̃p�^�[���ɏ]���ĉ�����\�����A���[�g��H��p�̐Ԑ�������
			$('#cross_' + patterns['pattern_' + patternNum][i]).addClass('on')
			.after('<div class="lots_line_cross" id="line_cross_' + currentPttern[i] + '"></div>');
		}
	}

	//�{�^�����N���b�N�ł��݂������X�^�[�g--------------------------------------------------------------------
	$('.lots_selectBtn').on('click',function() {
		var bar_num = $(this).attr('id'); //�������{�^�������Ԗڂ�����
		var currentRoute = routes[patternNum - 1][bar_num]; //����ʂ郋�[�g
		var count = 0; //������H��񐔂���������ϐ�
		var currentBarTop = 0; //�c���̐����ʒu��ۑ�����ϐ�

		//���̃{�^�����g�p�s�ɂ���
		$(this).css('background','#999').off('click');

		//���݂�����������������
		initLots();

		//�c���������p�̐Ԑ�div�𐶐�
		for(i = 0; i<5; i++){
			$('<div class="lots_line_bar" id="line_sb' + (i+1) + '"></div>').appendTo('#lots_main');
		}

		//�X�^�[�g����Ԑ�div������
		var $currentLineBar = $('#line_' + bar_num);

		writeLine();


		//���݂�������H��`��
		function writeLine(){
			var newBarLeft;
			if(count === currentRoute.length - 1){//������S�ĒH��I�����ꍇ
				//���[�܂ł̒l���擾
				var nextCrossTop = 420 - parseInt($currentLineBar.css('top'));
				$currentLineBar.show().animate( {'height':nextCrossTop + 'px'}, {complete:function (){
					//���B�������ʂ�\��
					$('#resultBtn_' + currentRoute[count]['goal']).find('p').animate( {'opacity':0},500);
				}});
			} else {
				//�ŏ��̉�����top�̒l���擾
				for(var key in currentRoute[count]){
					var nextCrossTop = parseInt($('#' + key).css('top')) - parseInt($currentLineBar.css('top'));
					currentBarTop = currentBarTop + nextCrossTop;

					$currentLineBar.show().animate( {'height':nextCrossTop + 'px'}, {complete:function (){
						if(currentRoute[count][key] === 'left'){
							//������E�ɐi�ޏꍇ
							$('#line_' + key).css('z-index','3').css('width','5px').show().animate( {'width':'180px'}, {complete:function(){
								//���̏c��div�𐶐�
								newBarLeft = parseInt($currentLineBar.css('left')) + 180;
								$currentLineBar = $('<div class="lots_line_bar"></div>').appendTo('#lots_main')
								                  .css('top',currentBarTop + 'px').css('left',newBarLeft + 'px').show();
								count++;
								writeLine(count);
							}});
						} else if (currentRoute[count][key] === 'right'){
							//�E���獶�ɐi�ޏꍇ
							$('#line_' + key).show();
							$('#' + key).animate( {'width':'0px'}, {complete:function(){
								//���̏c��div�𐶐�
								newBarLeft = parseInt($currentLineBar.css('left')) - 180;
								$currentLineBar = $('<div class="lots_line_bar"></div>').appendTo('#lots_main')
								                  .css('top',currentBarTop + 'px').css('left',newBarLeft + 'px').show();
								count++;
								writeLine(count);
							}});
						}

					}});
				}
			}
		}
	});
});