// 회원가입 API 연결
document.querySelector("#registrationForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#registrationForm #email").value;
  const password = document.querySelector("#registrationForm #password").value;
  const confirmPassword = document.querySelector("#registrationForm #passwordConfirm").value;
  const nickname = document.querySelector("#registrationForm #nickname").value;
  const gender = document.querySelector("#registrationForm input[name='gender']:checked").value;

  const name = document.querySelector("#registrationForm #name").value;

  const age = document.querySelector("#registrationForm #age").value;

  console.log(email, password, confirmPassword, nickname, gender, name, age);

  if (email === "" || password === "" || confirmPassword === "" || nickname === "" || !gender || name === "") {
    alert("모든 필드를 입력해주세요.");
    return; // 폼 전송을 막습니다.
  }

  const response = await fetch("http://localhost:4002/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      confirmPassword,
      nickname,
      gender,
      name,
      age
    })
  });

  if (response.ok) {
    const responseData = await response.json();
    alert(responseData.message);
    location.href = "../index.html";
  } else {
    const errorData = await response.json();
    alert(errorData.errorMessage);
  }
});

window.addEventListener("load", async (event) => {
  //repeatScalingAnimation();
  const scalingElement = document.querySelector(".header");

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
