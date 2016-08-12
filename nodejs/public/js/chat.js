var chatId = prompt("id를 입력하세요");

var socket = io.connect();
//var socket = io();

var sendToServerMsg = function(){
    var obj = {};
    var str = $('#msg').val();
    obj.msg = str;
    obj.id = chatId;
    if(str !== ""){
      socket.emit('sendMessage',obj);
    }
};

var getNowTime = function(){
    // 현재 시간
    var now = new Date();

    var hour = now.getHours();
    var hour = now.getHours();
    var str_ampm;

    // 오전 오후 체크
    if (hour == 0) {  // ex)00:30이 오전12:30이 아닌 오후12:30으로 표시됩니다.
        str_ampm = "오후";
    } else if (hour < 13) { // ex)12:30은 오후12:30이 아닌 오전12:30으로 표시됩니다.
        str_ampm = "오전";
    } else { // ex)23:30은 오후 11:30으로 표시됩니다.
        hour -= 12;
        str_ampm = "오후";
    }
    hour = (hour == 0) ? 12 : hour; // 0시면 12시로 표시, 그 이외는 그대로

    var nowTime = str_ampm;
    nowTime += " " + hour + ':' + now.getMinutes();

    return nowTime;
};// 현재 시간 함수


// (7) 서버가 발생시키는 이벤트에 귀 귀울이기, 서버로 갔던 메시지가 다시 클라이언트로 돌아온다.
socket.on("getMessage",function(data){

    var nowTime = getNowTime();

    if(chatId == data.id) {

        // 내 메시지 출력
        var newMsg = $("<div/>").addClass('chat_form_my');

        // 시간 출력
        $("<span/>").addClass('chat_date2').text(nowTime).appendTo(newMsg);
        // 메시지 출력
        $("<span/>").addClass('chat_msg2').text(data.msg).appendTo(newMsg);

        $("<div/>").addClass('chat_form2 clearfix').append(newMsg).appendTo('.chat_get');


        $('.chat_bg').scrollTop(999999999999);
        $('#msg').val("");
    }
    else {
        // 다른 사람 메시지
        var newMsg = $("<div/>").addClass('chat_form');

        if(data.lastMsgId !== data.lastSecondMsgId){
            newMsg.css('margin-top','20px');
            // 프로필사진, 이름 추가
            $("<div/>").addClass('chat_profile').appendTo(newMsg);
            $("<div/>").addClass('chat_name').text(data.id).appendTo(newMsg);
        };

        $("<span/>").addClass('chat_msg').text(data.msg).appendTo(newMsg);

        // 시간 출력
        $("<span/>").addClass('chat_date').text(nowTime).appendTo(newMsg);
        newMsg.appendTo('.chat_get');

        $('.chat_bg').scrollTop(999999999999);
        $('#msg').val("");
    }

});//getMessage socket on


$('#sendBtn').click(function(){
    sendToServerMsg();
});

$("#msg").keydown(function (key) {
    if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        sendToServerMsg();
    }
});

$(function(){
    var now = new Date();
    var date = "";
    date += " " + now.getFullYear() + "년 " + now.getMonth() + "월 " + now.getDate() + "일";
    //$("<div/>").text(date).addClass('chat_notice').appendTo('.chat_bg');
    $("#nowDate").text(date);
});
