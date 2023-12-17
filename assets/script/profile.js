//import { listRef } from "./config.js";

const profileImage = document.getElementById("userImage");

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

/** 사용자 프로필 가져오기 */
async function getUserImage() {
  try {
    const response = await fetch("http://localhost:4002/api/users/getimage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }

    const imageData = await response.json();
    const url = imageData.data[0];

    // 사용자 프로필 사진 가져오기
    profileImage.style.backgroundImage = `url(${url})`;
    //return url;
  } catch (error) {
    const errorData = await response.json();
    alert(errorData.errorMessage);
  }
}

/**페이지 로드시 프로필 정보 가져오기*/
window.addEventListener("load", async (event) => {
  try {
    event.preventDefault();
    // 사용자 프로필 이미지 가져오기
    await getUserImage();

    // 사용자 id 가져오기
    const userId = await getUserId();

    console.log("userId:" + userId);

    // 사용자 프로필 정보 가져오기
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

      nicknameInput.value = responseData.data.user.users.nickname;
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
    console.log("err:" + error);
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

// document.querySelector("#userImage").addEventListener("click", handleImageChange);

// async function handleImageChange(event) {
//   const selectedImage = event.target.files[0];
//   const result = confirm("사진을 수정하시겠습니까?");

//   if (result) {
//     console.log("선택된 이미지:", selectedImage);
//     // 이미지 수정 로직 추가
//   } else {
//     // 취소 시 동작
//   }
// }

//동하님 사진 수정 이벤트
document.querySelector("#userImage").addEventListener("click", async function (event) {
  var result = confirm("사진을 수정하시겠습니까?");

  if (result) {
    $("#uploadUserImage").click();

    $("#userImage");
    console.log("chk:" + $("#uploadUserImage"));
    //window.location.reload();
  }
});

document.querySelector("#uploadUserImage").addEventListener("change", async function (e) {
  //const selectedImage = event.target.files[0];
  const fileInput = document.querySelector("#uploadUserImage");
  const file = fileInput.files[0];
  // 서버로 이미지 전송하는 로직 호출
  //sendImageToServer(selectedImage);

  console.log("fileInput:" + fileInput);

  const formData = new FormData();
  formData.enctype = "multipart/form-data";
  formData.append("image", file);

  // FormData의 모든 키-값 쌍을 배열로 변환하여 출력
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    /*
    $.ajax({
      type: "POST",
      url: "http://localhost:4002/api/users/putimage",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log("Image uploaded successfully!", response);
        window.location.reload();
      },
      error: function (error) {
        console.error("Error uploading image:", error);
      }
    });*/

    const response = await fetch("http://localhost:4002/api/users/putimage", {
      method: "POST",
      headers: {},
      body: formData
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }

    alert("프로필 이미지가 수정 되었습니다.");
    window.location.reload();
  } catch (error) {
    alert("서버 오류, 재로그인 후 동일할 경우 관리자에게 문의바랍니다.");
    console.log("err:" + error);
  }
});
