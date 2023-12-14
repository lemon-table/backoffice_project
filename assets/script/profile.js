//import { listRef } from "./config.js";

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

/**페이지 로드시 프로필 정보 가져오기*/
window.addEventListener("load", async (event) => {
  try {
    event.preventDefault();
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
      console.log(responseData.data);

      const nicknameInput = document.getElementById("nickname");
      const usernameInput = document.getElementById("username");
      const genderInputs = document.querySelectorAll('input[name="gender"]');
      const ageInput = document.getElementById("age");

      nicknameInput.value = responseData.data.user.User.nickname;
      usernameInput.value = responseData.data.user.name;
      ageInput.value = responseData.data.user.age;

      // 성별 입력란 체크
      for (const genderInput of genderInputs) {
        if (genderInput.value === responseData.data.user.gender) {
          genderInput.checked = true;
        }
      }
    } else {
      const errorData = await response.json();
      alert(errorData.errorMessage);
    }
  } catch (error) {
    alert("서버 오류, 재로그인 후 동일할 경우 관리자에게 문의바랍니다.");

    location.href = "../index.html";
  }
});

/**프로필 수정*/
document.querySelector("#profileForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nickname = document.querySelector("#profileForm #nickname").value;
  const gender = document.querySelector("#profileForm input[name='gender']:checked").value;
  const name = document.querySelector("#profileForm #username").value;
  const age = document.querySelector("#profileForm #age").value;

  console.log(nickname, gender, name, age);

  if (nickname === "" || !gender || name === "") {
    alert("모든 필드를 입력해주세요.");
    return; // 폼 전송을 막습니다.
  }

  const userId = await getUserId();

  console.log("profile upt userId:" + userId);

  const response = await fetch("http://localhost:4002/api/users/" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nickname,
      gender,
      name,
      age
    })
  });

  if (response.ok) {
    const responseData = await response.json();
    alert(responseData.message);
    location.reload();
  } else {
    const errorData = await response.json();
    alert(errorData.errorMessage);
  }
});
