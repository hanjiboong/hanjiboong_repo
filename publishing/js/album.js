//albumContents 자바스크립트

//스크롤시 뒤로 버튼 생성 제거
$(document).ready(function () {
    $(document).scroll(function() {
        var btn = $("#albumSubNav");
        var position = $(window).scrollTop();
        if (position > 20) {
            btn.fadeIn(100);
        } else if (position < 20) {
            btn.fadeOut(100);
        }
    });
    //하트 버튼
    $(".contentsWrap #albumHeart").click(function() {
        $(this).toggleClass("fa-heart-o");
        $(this).toggleClass("fa-heart");
    });
    //댓글 버튼
    $(".contentsWrap .commentBtn").click(function() {
        var selectedCommentTag = $(this).parent().parent().find(".commentTxtInputWrap");
        selectedCommentTag.slideToggle(200);
        selectedCommentTag.children(".commentTxtInput").children(".commentBox").focus();
    });

    $(".commentSendBtn").click(function() {
        var commentInputTag = $(this).parent().parent().children(".commentTxtInput").children("input");

        var comment = commentInputTag.val();
        commentInputTag.val("");

        var date = new Date();
        var curYear = date.getFullYear();
        var curMonth = date.getMonth() - 1;
        var curDate = date.getDate();

        var dateTxt = curYear + "년 " + curMonth + "월 " + curDate + "일";
        var addTag = "<div class=\"contentsComment\">\n" + "<div class=\"commentImgWrap\">\n" + "<div class=\"commentImg\">\n" + "</div>\n</div>\n" + "<div class=\"commentTxtBlank\"></div>\n" + "<div class=\"commentTxtWrap\">\n" + "<div class=\"commentTxt\">" + comment + "<div class=\"commentDate\">" + dateTxt + "</div>\n</div>\n</div>\n</div>";

        $(this).parent().parent().parent().children(".contentsCommentWrap").append(addTag);
    });
})
    