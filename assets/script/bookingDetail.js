/** UserId 가져오기 */
async function getUserId() {
  try {
    const response = await fetch("http://localhost:4002/api/auth/getid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }

    const userData = await response.json();
    const userId = userData.user;

    return userId;
  } catch (error) {
    const errorData = await response.json();
    alert(errorData.errorMessage);
  }
}

/** 펫시터 정보 가져오기 */
async function getpetSitter() {
  try {
    const response = await fetch("http://localhost:4002/api/sitter", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch petSitter information");
    }

    const sitterData = await response.json();
    const data = sitterData.data;

    return data;
  } catch (error) {
    const errorData = await response.json();
    alert(errorData.errorMessage);
  }
}

/** 예약일자 리스트 가져오기 */
async function getBookedAtList(sitterId) {
  try {
    const response = await fetch("http://localhost:4002/api/booking/sitter/" + sitterId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch getBookedDtList information");
    }

    const bookedAtData = await response.json();
    const data = bookedAtData.data.booking;
    return data;
  } catch (error) {
    console.log("error:" + error);
    alert("서버 오류, 재로그인 후 동일할 경우 관리자에게 문의바랍니다.");
  }
}

/** 펫시터의 기존 예약일자는 달력에서 비활성화 */
async function getBookingSitters(sittierId, onloadchk) {
  // 제외일자는 달력에서 비활성화되도록
  const bookedAtList = await getBookedAtList(sittierId);

  let bookedAtArr = [];
  bookedAtList.forEach((x) => {
    // 문자열을 Date 객체로 변환
    const dateObject = new Date(x.bookedAt);

    // Date 객체를 이용하여 원하는 형식으로 포맷
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
    bookedAtArr.push(formattedDate);

    console.log("formattedDate:" + formattedDate);
  });

  console.log("bookedAtArr:" + bookedAtArr);

  // 이전에 생성된 datepicker 파괴
  if (!onloadchk) {
    $("#reservation-date").datepicker("destroy");
  }

  $("#reservation-date").datepicker({
    format: "yyyy-mm-dd", //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
    startDate: "0d", //달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
    datesDisabled: bookedAtArr, //선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
    autoclose: true,
    clearBtn: false,
    disableTouchKeyboard: false,
    language: "ko" //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
  });
}

/** 오늘날짜 yyyy-mm-dd로 변환 */
function getCurrentFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

/** 취소시 예약 목록 페이지로 이동 */
document.getElementById("cancel-button").addEventListener("click", function () {
  location.href = "main.html";
});

/**페이지 로드시 프로필 정보 가져오기*/
window.addEventListener("load", async (event) => {
  try {
    event.preventDefault();
    // 예약 달력 일자 넣기
    const reservationDate = document.querySelector("#reservation-date");
    reservationDate.value = getCurrentFormattedDate();

    // 사용자 ID 가져오기
    const userId = await getUserId();

    console.log("userId:" + userId);

    const response = await fetch("http://localhost:4002/api/users/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const responseData = await response.json();

      document.getElementById("headerTitle").textContent =
        responseData.data.user.users.nickname + "님의 예약 작성 페이지";

      const getSitter = await getpetSitter();
      const sitterSelect = document.getElementById("sitter-select");

      getSitter.forEach((x) => {
        const option = document.createElement("option");
        option.text = x.name + ", 서비스횟수: " + x.career + "번";
        option.value = x.sitterId;

        sitterSelect.add(option);
      });

      // 펫시터 초기값 구하기
      selectedOption = sitterSelect.options[0];
      selectedSitterId = selectedOption.value;

      await getBookingSitters(selectedSitterId, 1);
    } else {
      const errorData = await response.json();
      alert(errorData.errorMessage);
    }
  } catch (error) {
    console.log("error:" + error);
    alert("서버 오류, 재로그인 후 동일할 경우 관리자에게 문의바랍니다.");

    location.href = "../index.html";
  }
});

// sitter-select 요소를 가져옵니다.
const sitterSelect = document.getElementById("sitter-select");
let selectedOption;

let selectedSitterId;

// sitter-select에 change 이벤트 리스너를 추가합니다.
sitterSelect.addEventListener("change", async function () {
  // 선택된 option 엘리먼트를 가져옵니다.
  const selectedOption = sitterSelect.options[sitterSelect.selectedIndex];

  // 선택된 option의 id 속성을 가져옵니다.
  selectedSitterId = selectedOption.value;

  await getBookingSitters(selectedSitterId, 0);
});

/** 예약 정보 저장 API */
document.querySelector("#save-button").addEventListener("click", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#reservation-title").value;
  const content = document.querySelector("#reservation-content").value;
  const reservationDate = document.querySelector("#reservation-date").value;

  if (title === "" || !content || reservationDate === "") {
    alert("모든 필드를 입력해주세요.");
    return; // 폼 전송을 막습니다.
  }

  const response = await fetch("http://localhost:4002/api/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      sitterId: selectedSitterId,
      content,
      bookedAt: new Date(reservationDate)
    })
  });

  if (response.ok) {
    const responseData = await response.json();
    alert(responseData.message);
    location.href = "/html/main.html";
  } else {
    const errorData = await response.json();
    alert(errorData.errorMessage);
  }
});

window.addEventListener("load", async (event) => {
  //repeatScalingAnimation();
  const scalingElement = document.querySelector(".header-image");

  scalingElement.addEventListener("animationiteration", function () {
    // 애니메이션 반복 시 배경 이미지 변경
    const currentImage = scalingElement.style.backgroundImage;
    let changeImageUrl = 'url("../images/dog1.png")';

    if (currentImage.includes("dog1.png")) changeImageUrl = 'url("../images/dog2.png")';
    else if (currentImage.includes("dog2.png")) changeImageUrl = 'url("../images/dog3.png")';
    else scalingElement.style.backgroundImage = 'url("../images/dog1.png")';

    scalingElement.style.backgroundImage = changeImageUrl;
  });

  // 페이지 로드 후 스케일 애니메이션 시작
  scalingElement.classList.add("animated");
});

// 펫시터 매칭 서비스 제목 클릭시 메인페이지 이동
document.querySelector(".header-image").addEventListener("click", function () {
  location.href = "main.html";
});

/** 달력 포맷 지정 (예약한 날짜는 비활성화) */
/*
$("#reservation-date").datepicker({
  format: "yyyy-mm-dd", //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
  startDate: "-10d", //달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
  datesDisabled: bookedAtArr, //선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
  autoclose: true,
  clearBtn: false,
  disableTouchKeyboard: false,
  language: "ko" //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
});
.on("show", function (e) {
    console.log("chk:" + bookedAtList);
    //이벤트의 종류
    //show : datePicker가 보이는 순간 호출
    //hide : datePicker가 숨겨지는 순간 호출
    //clearDate: clear 버튼 누르면 호출
    //changeDate : 사용자가 클릭해서 날짜가 변경되면 호출 (개인적으로 가장 많이 사용함)
    //changeMonth : 월이 변경되면 호출
    //changeYear : 년이 변경되는 호출
    //changeCentury : 한 세기가 변경되면 호출 ex) 20세기에서 21세기가 되는 순간

    console.log(e); // 찍어보면 event 객체가 나온다.
    //간혹 e 객체에서 date 를 추출해야 하는 경우가 있는데
    // e.date를 찍어보면 Thu Jun 27 2019 00:00:00 GMT+0900 (한국 표준시)
    // 위와 같은 형태로 보인다.
    // 추후에 yyyy-mm-dd 형태로 변경하는 코드를 업로드 하겠습니다.
  });*/
/*
$(function () {
  $("#reservation-date").datepicker({
    format: "yyyy-mm-dd", //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
    startDate: "-10d", //달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
    endDate: "+10d", //달력에서 선택 할 수 있는 가장 느린 날짜. 이후로 선택 불가 ( d : 일 m : 달 y : 년 w : 주)
    autoclose: true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
    calendarWeeks: false, //캘린더 옆에 몇 주차인지 보여주는 옵션 기본값 false 보여주려면 true
    clearBtn: false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
    datesDisabled: ["2023-12-24", "2023-12-25"], //선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
    daysOfWeekDisabled: [0, 6], //선택 불가능한 요일 설정 0 : 일요일 ~ 6 : 토요일
    daysOfWeekHighlighted: [3], //강조 되어야 하는 요일 설정
    disableTouchKeyboard: false, //모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
    immediateUpdates: false, //사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false
    multidate: false, //여러 날짜 선택할 수 있게 하는 옵션 기본값 :false
    multidateSeparator: ",", //여러 날짜를 선택했을 때 사이에 나타나는 글짜 2019-05-01,2019-06-01
    templates: {
      leftArrow: "&laquo;",
      rightArrow: "&raquo;"
    }, //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
    showWeekDays: true, // 위에 요일 보여주는 옵션 기본값 : true
    title: "테스트", //캘린더 상단에 보여주는 타이틀
    todayHighlight: true, //오늘 날짜에 하이라이팅 기능 기본값 :false
    toggleActive: true, //이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
    weekStart: 0, //달력 시작 요일 선택하는 것 기본값은 0인 일요일
    language: "ko" //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
  }); //datepicker end
}); //ready end*/
