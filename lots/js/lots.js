// JavaScript Document
$(function(){
	//あみだくじの横線のパターン（ほんとはランダムにしたい）
	var patterns = { 'pattern_1' : [1,3,4,6,9,11,12,15,17,18],
					 'pattern_2' : [2,3,5,7,10,11,13,14,15,17,18],
					 'pattern_3' : [1,4,8,9,10,12,16,17],
					 'pattern_4' : [1,2,5,7,9,11,12,15,18],
					 'pattern_5' : [3,5,6,8,10,13,14,16,17] };

	//辿るルート（ほんとはランダムに対応してほしい）
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

	//ルートまとめ
	var routes = [route_pattern1,route_pattern2,route_pattern3,route_pattern4,route_pattern5];
	//曜日を準備
	var days = ['Mon','Tue','Wed','Thu','Fri'];


	//読み込み時にあみだくじのパターンを決定------------------------------------------------------------------
	//横線のパターンを5種類から選ぶ
	var patternNum = Math.round(Math.random()*4 + 1);
	var currentPttern = patterns['pattern_' + patternNum];

	//曜日の順序をシャッフルして入れる
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

	//あみだくじを初期化する
	initLots();


	//あみだくじを初期化する関数---------------------------------------------------------------------------
	function initLots(){
		//前回のあみだくじを消去
		$('.lots_cross').removeClass('on').css('width',180 + 'px');
		$('.lots_line_cross').remove();
		$('.lots_line_bar').remove();

		//まっさらな状態のあみだくじを表示
		for(i = 0; i < currentPttern.length; i++){
			//横線のパターンに従って横線を表示し、ルートを辿る用の赤線を準備
			$('#cross_' + patterns['pattern_' + patternNum][i]).addClass('on')
			.after('<div class="lots_line_cross" id="line_cross_' + currentPttern[i] + '"></div>');
		}
	}

	//ボタンをクリックであみだくじスタート--------------------------------------------------------------------
	$('.lots_selectBtn').on('click',function() {
		var bar_num = $(this).attr('id'); //押したボタンが何番目か判別
		var currentRoute = routes[patternNum - 1][bar_num]; //今回通るルート
		var count = 0; //横線を辿る回数をかぞえる変数
		var currentBarTop = 0; //縦線の垂直位置を保存する変数

		//このボタンを使用不可にする
		$(this).css('background','#999').off('click');

		//あみだくじを初期化する
		initLots();

		//縦線を引く用の赤線divを生成
		for(i = 0; i<5; i++){
			$('<div class="lots_line_bar" id="line_sb' + (i+1) + '"></div>').appendTo('#lots_main');
		}

		//スタートする赤線divを決定
		var $currentLineBar = $('#line_' + bar_num);

		writeLine();


		//あみだくじを辿る描画
		function writeLine(){
			var newBarLeft;
			if(count === currentRoute.length - 1){//横線を全て辿り終えた場合
				//下端までの値を取得
				var nextCrossTop = 420 - parseInt($currentLineBar.css('top'));
				$currentLineBar.show().animate( {'height':nextCrossTop + 'px'}, {complete:function (){
					//到達した結果を表示
					$('#resultBtn_' + currentRoute[count]['goal']).find('p').animate( {'opacity':0},500);
				}});
			} else {
				//最初の横線のtopの値を取得
				for(var key in currentRoute[count]){
					var nextCrossTop = parseInt($('#' + key).css('top')) - parseInt($currentLineBar.css('top'));
					currentBarTop = currentBarTop + nextCrossTop;

					$currentLineBar.show().animate( {'height':nextCrossTop + 'px'}, {complete:function (){
						if(currentRoute[count][key] === 'left'){
							//左から右に進む場合
							$('#line_' + key).css('z-index','3').css('width','5px').show().animate( {'width':'180px'}, {complete:function(){
								//次の縦線divを生成
								newBarLeft = parseInt($currentLineBar.css('left')) + 180;
								$currentLineBar = $('<div class="lots_line_bar"></div>').appendTo('#lots_main')
								                  .css('top',currentBarTop + 'px').css('left',newBarLeft + 'px').show();
								count++;
								writeLine(count);
							}});
						} else if (currentRoute[count][key] === 'right'){
							//右から左に進む場合
							$('#line_' + key).show();
							$('#' + key).animate( {'width':'0px'}, {complete:function(){
								//次の縦線divを生成
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