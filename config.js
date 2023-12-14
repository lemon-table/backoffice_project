import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  uploadBytes
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import dotEnv from "dotenv";

//.env에 있는 여러 값들을, prosess.env 객체 안에 추가하게 된다.
dotEnv.config();

// Firebase 구성 정보 설정
const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBESE_PROJECT_ID,
  storageBucket: process.env.FIREBESE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

///////////////////////  팀원 프로필 데이터 가져오기  ///////////////////////

// 팀원 데이터 가져오기
const docRef = doc(db, "profile", "beomsuk");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

// Create a reference with an initial file path and name
const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, "/backoffice/");
const chkStr = "test@naver.com";

export default listRef;

/*
//팀원 사진명 리스트 조회
listAll(listRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      const img_name = String(itemRef).split("/")[4];
      console.log("itemRef:" + img_name);
      console.log("chk:" + img_name.includes(chkStr));

      if (img_name.includes(chkStr)) {
        //팀원 사진 가져오기
        getDownloadURL(ref(storage, "/backoffice/" + img_name))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();

            $("#img_dongha").attr("src", url);
          })
          .catch((error) => {
            // Handle any errors
          });
      }

      // All the items under listRef.
    });
  })
  .catch((error) => {
    // Uh-oh, an error occurred!
  });
*/
