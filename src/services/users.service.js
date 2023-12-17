import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import multer from "multer";
import fs from "fs";

import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, listAll, uploadBytes, deleteObject } from "firebase/storage";

//.env에 있는 여러 값들을, prosess.env 객체 안에 추가하게 된다.
dotEnv.config();

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  createUser = async (email, nickname, password, confirmPassword, gender, name, age) => {
    const isValidEmail = validator.isEmail(email);

    // 이메일 형식 검증
    if (!isValidEmail) throw new Error("INVALID_EMAIL_FORMAT");
    // 패스워드 체크 (6자리 미만)
    if (password.length < 6) throw new Error("PASSWORD_LENGTH_ERROR");
    // 패스워드 체크(비밀번호 확인란 일치여부))
    if (password !== confirmPassword) throw new Error("PASSWORD_MISMATCH");

    const chkUser = await this.usersRepository.findUser(email);

    // 계정 사용여부 체크
    if (chkUser) throw new Error("EMAIL_ALREADY_IN_USE");

    // 위 이상 없으면 password bcrypt 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createUser(email, nickname, hashedPassword, gender, name, age);

    const userInfo = await this.usersRepository.createUserInfo(user.userId, gender, name, age);

    // password,를 뺀 상태로, Controller에게 Response 전달한다.
    return {
      email: user.email,
      nickname: user.nickname,
      gender: userInfo.gender,
      name: userInfo.name,
      age: userInfo.age,
      createdAt: user.createdAt
    };
  };

  loginUser = async (email, password) => {
    const user = await this.usersRepository.findUser(email);

    // 계정 사용여부 체크
    if (!user) throw new Error("INVALID_CREDENTIALS");

    if (!(await bcrypt.compare(password, user.password))) throw new Error("INVALID_CREDENTIALS");

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" } // 10분 유효기간 설정
    );

    return { email: user.email, token: token };
  };

  readUser = async (userId) => {
    const user = await this.usersRepository.readUser(userId);

    // 프로필 상세정보 조회 안될 때
    if (!user) throw new Error("USER_ID_NOT_FOUND_ERROR");

    return { user };
  };

  updateUser = async (userId, userIdParam, name, nickname, age, gender, profileImage) => {
    console.log("userIdParam:" + userIdParam);
    const user = await this.usersRepository.readUser(userIdParam);

    // 프로필 상세정보 조회 안될 때
    if (!user) throw new Error("USER_ID_NOT_FOUND_ERROR");

    console.log("user.userId:" + user.userId);

    // 글 수정 권한 없는 사용자의 경우
    if (Number(user.userId) !== Number(userIdParam)) throw new Error("NO_PERMISSION_TO_UPDATE_ERROR");

    const updateUser = await this.usersRepository.updateUser(userId, nickname);
    const updateUserInfo = await this.usersRepository.updateUserInfo(userId, name, age, gender, profileImage);

    return { updateUser };
  };

  getUserImage = async (userId) => {
    const user = await this.usersRepository.readUser(userId);

    // 프로필 상세정보 조회 안될 때
    if (!user) throw new Error("USER_ID_NOT_FOUND_ERROR");

    const listRef = ref(storage, "/backoffice/");
    const chkStr = user.users.email;

    let urls = [];

    const listResult = await listAll(listRef);

    await Promise.all(
      listResult.items.map(async (itemRef) => {
        const img_name = String(itemRef).split("/")[4];

        if (img_name.includes(chkStr)) {
          // 팀원 사진 가져오기
          const url = await getDownloadURL(ref(storage, "/backoffice/" + img_name));
          urls.push(url);
        }
      })
    );
    if (urls.length === 0) urls.push("../images/img2.png");

    return urls;
  };

  putUserImage = async (userId, image) => {
    const { filename, mimetype } = image;
    const user = await this.usersRepository.readUser(userId);

    // 프로필 상세정보 조회 안될 때
    if (!user) throw new Error("USER_ID_NOT_FOUND_ERROR");

    const userEmail = user.users.email;

    console.log("user.userId:" + user.userId);
    console.log("user.users.email:" + user.users.email);

    //console.log("image.fs:" + image[0].path);
    for (const pair of image.entries()) {
      console.log(pair[0], pair[1]);
    }

    let metadata = {
      contentType: image[0].mimetype
    };

    //const imageBuffer = require("fs").readFileSync(image[0].path);
    //const imageBuffer = await fs.promises.readFile(image[0].path);
    const imageBuffer = image[0].buffer;

    const originalName = image[0].originalname;

    // 파일 이름에서 마지막 마침표 이후의 문자열을 추출
    const fileExtension = originalName.slice(((originalName.lastIndexOf(".") - 1) >>> 0) + 2);

    //console.log("imageBuffer:" + imageBuffer);

    const imageRef = ref(storage, "/backoffice/" + userEmail + "." + fileExtension);

    const listRef = ref(storage, "/backoffice/");
    const chkStr = userEmail;
    let existImage = false;
    let tempImageName = "";

    console.log("chkStr:" + chkStr);

    const listResult = await listAll(listRef);

    await Promise.all(
      listResult.items.map(async (itemRef) => {
        const img_name = String(itemRef).split("/")[4];

        //이미지 이름이 이메일명과 같을 때
        if (img_name.includes(chkStr)) {
          const fileExtensionImage = img_name.slice(((originalName.lastIndexOf(".") - 1) >>> 0) + 2);

          //바꾸려는 이미지와 기존 있는 이미지 형식이 다르면
          if (fileExtension !== fileExtensionImage) {
            //기존 파일 지우기
            const desertRef = ref(storage, "backoffice/" + img_name);

            await deleteObject(desertRef);
          }
          existImage = true;
          tempImageName = img_name;
        }
      })
    );

    await uploadBytes(imageRef, imageBuffer, metadata);

    return user;
  };
}
