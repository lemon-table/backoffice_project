// 로그인 API 연결
document.querySelector("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#loginForm #email").value;
  const password = document.querySelector("#loginForm #password").value;

  const response = await fetch("http://localhost:4002/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
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
