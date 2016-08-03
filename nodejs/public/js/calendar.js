$(document).ready(function() {
	hanjiboongCalendar("hanjoboong-calendar-box");
});

function hanjiboongCalendar(id, changedDate = "today" ) { 
	var date;

	if(changedDate == "today") {
		date = new Date();
	}
	else {
		var strArray = changedDate.split("-");
		date = new Date(parseInt(strArray[0]), parseInt(strArray[1]-1), parseInt(strArray[2]));
	}

	var curYear = date.getFullYear();  // get current year
	var curMonth = date.getMonth() + 1; // get current month
	var curDate = date.getDate();  // get current date  - today
	var curDay = date.getDay();  // get current day of the week  // start index : 0 - sunday

	// 각 월의 마지막 날짜
	//                   1   2   3   4   5   6   7   8   9  10  11  12
	var lastDateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	// 윤년 계산 : 년도가 4의 배수이고 100의 배수가 아닐 때, 혹은 400의 배수일 때
	if( (curYear % 4 == 0 && curYear % 100 != 0) || curYear % 400 == 0 ) { lastDateList[1] = 29; }


	// 이번달의 첫번째 요일
	date.setDate(1);
	var firstDay = date.getDay();
	// 이번달의 마지막 날짜
	var lastDate = lastDateList[curMonth-1];

	// 이번달의 주 구함.. 달력의 row 정하기 위함.
	var weekRow = Math.ceil( (firstDay + lastDate ) / 7 );
	
	// 이전달
	var prevDate = "";
	if(curMonth == 1) {  // 현재 달이 1월 이라면 이전달은 작년 12월
		prevDate = (curYear - 1) + "-" + 12 + "-" + 1;
	}
	else {  // 1월이 아니면 -1
		prevDate = curYear + "-" + (curMonth - 1) + "-" + 1;
	}

	// 오늘 날짜가 지난달에 없을 경우... 
	// 예를 들어 오늘이 3월 31일인 경우 이전달은 2월이고 마지막 날짜는 28일 or 29일임.. 이때는 그 달의 마지막 날로 설정
	// 이건 머리아프니 걍 1일로 설정하자.... 어쩌면 내부적으로 처리할 수도?
	
	// 다음달
	var nextDate = "";
	if(curMonth == 12) { // 현재 달이 12월 이라면 다음달은 내년 1월
		nextDate = (curYear + 1) + "-" + 1 + "-" + 1;
	}
	else {  // 아니면 +1
		nextDate = curYear + "-" + (curMonth + 1) + "-" + 1;
	}
	// console.log(LOG_TAG + "nextDate : " + nextDate);

	var dateIndex = 1;
	var tempStr = "";
	var tempTag = "";

	tempTag 
		= "<div class=\"row\">\n"
		+ "<div class=\"col-xs-3 move\"><i class=\"fa fa-angle-left\""
		+ " onclick=\"javascript:hanjiboongCalendar('" + id + "', '" + prevDate + "');\"></i></div>\n"
		+ "<div class=\"col-xs-6 date\">"
		+ "<span class=\"year\">" + curYear + "년</span>&nbsp;&nbsp;<span class=\"month\">" + curMonth + "월</span></div>\n"
		+ "<div class=\"col-xs-3 move\"><i class=\"fa fa-angle-right\""
		+ " onclick=\"javascript:hanjiboongCalendar('" + id + "', '" + nextDate + "');\"></i></div>\n"
		+ "</div>\n"
		;

	tempTag
		+= "<div class=\"row\">\n"
		+ "<table class=\"table table-borderless\">"
		+ "<thead>\n<tr>\n"
		+ "<th>일</th>\n"
		+ "<th>월</th>\n"
		+ "<th>화</th>\n"
		+ "<th>수</th>\n"
		+ "<th>목</th>\n"
		+ "<th>금</th>\n"
		+ "<th>토</th>\n"
		+ "</tr>\n</thead>\n"
		+ "<tbody>"
		;


	// 오늘 인지 판별
	var realDate = new Date();
	var realCurYear = realDate.getFullYear();
	var realCurMonth = realDate.getMonth() + 1;
	var realCurDate = realDate.getDate();

	var isToday = false;
	if(realCurYear == curYear && realCurMonth == curMonth) { isToday = true; }
	
	for(var i=0; i<weekRow; i++) {
		tempTag += "<tr>";
		for(var j=0; j<7; j++) {
			// 첫번째 주 에서 1일 이전의 칸들은 공란
			if(i==0 && j<firstDay) {
				// tempStr += " -- |";
				tempTag += "<td><div class=\"detail-date-box\"></div></td>";
			}
			else if(dateIndex <= lastDate) {
				// 오늘 일때
				// if(isToday && dateIndex == curDate) {
				if(isToday && dateIndex == realCurDate) {  // 오늘이면 실제 오늘로 변경.. curDate 쓰면.. 날짜 변경시 1일로 설정됨.
					tempTag += "<td><div class=\"detail-date-box today\"><div class=\"detail-date\">"
							+ dateIndex + "</div></div></td>";
				}
				// 오늘 아니면
				else {
					tempTag += "<td><div class=\"detail-date-box\"><div class=\"detail-date\">" 
								+ dateIndex + "</div></div></td>";
				}
				
				dateIndex++;
			}
			// 나머지도 공란
			else {
				tempTag += "<td><div class=\"detail-date-box\"></div></td>";
			}
		}
		tempTag += "</tr>\n";
	}

	tempTag += "</tbody>\n</table>\n</div>";
	
	// $(".hanjoboong-calendar-box").remove();
	$("#" + id).empty()
	$("#" + id).append(tempTag);
}

