
var MIN_VOTE_ITEM = 2;
var MAX_VOTE_ITEM = 4;
var vote_item_index = 2;
var isVoteMultipleSelected = false;
var isDeadlineTime = false;

$(document).ready(function() {
	$(".fa-check-square-o").click(function() { 
		showVoteModal();
	});


	function showVoteModal(el){
		var temp = $("#vote-modal");
		var bg = temp.prev().hasClass('vote-backdrop');	//dimmed 레이어를 감지하기 위한 boolean 변수

		if(bg){
			$('.vote-box').show();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
		}

		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) {
			temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		}
		else {
			temp.css('top', '0px');
		}

		if (temp.outerWidth() < $(document).width() ) {
			temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		}
		else {
			temp.css('left', '0px');
		}
		

		temp.find('a.cbtn').click(function(e){
			if(bg){
				$('.vote-box').hide(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
			}
			e.preventDefault();
		});

		temp.find('.fa.fa-times').click(function(e){
			if(bg){
				$('.vote-box').hide(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
			}
			e.preventDefault();
		});

		$('.vote-box .vote-backdrop').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
			$('.vote-box').hide();
			e.preventDefault();
		});

	}

	$("#vote-pop-add-item").click(function() {
		if(vote_item_index < MAX_VOTE_ITEM) {
			vote_item_index++;
			var addVoteItemTag = "<div class=\"vote-item-box\"><input type=\"text\" "
							+ "name=\"vote_item_" + vote_item_index + "\" "
							+ "placeholder=\"항목 입력\" />"
							+ " <i class=\"fa fa-minus\" aria-hidden=\"true\"></i></div>";
			$(".vote-pop-body").children(".ctxt.mb20").append(addVoteItemTag);
			// $(".vote-pop-body").append(addVoteItemTag);
		}
		else {
			alert("더이상 항목을 추가할 수 없습니다.");
		}
	});

	$("#vote-modal .vote-pop-body .fa.fa-minus").click(function() {
		if(vote_item_index > MIN_VOTE_ITEM) {
			vote_item_index--;
			$("#vote-modal .vote-pop-body .ctxt.mb20 .vote-item-box:last-child").remove();
		}
		else {
			alert("항목의 수는 최소 " + MIN_VOTE_ITEM + "개 이상이여야 합니다.");
		}
	});


	$(".cbtn").click(function() {
		vote_item_index = MIN_VOTE_ITEM;
		isDeadlineTime = false;
		isVoteMultipleSelected = false;
	});
	

	$("#vote-deadline-time").click(function() {
		if(isDeadlineTime) {
			$(this).attr("class", "fa fa-check-circle-o");
			isDeadlineTime = false;
		}
		else {
			$(this).attr("class", "fa fa-check-circle");
			isDeadlineTime = true;
		}

	});

	$("#vote-multiple-select").click(function() {
		if(isVoteMultipleSelected) {
			$(this).attr("class", "fa fa-check-circle-o");
			isVoteMultipleSelected = false;
		}
		else {
			$(this).attr("class", "fa fa-check-circle");
			isVoteMultipleSelected = true;
		}
	});
	

	
});