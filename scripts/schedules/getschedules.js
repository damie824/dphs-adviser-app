import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const trasfer = [
  "한국지리",
  "세계지리",
  "세계사",
  "동아시아사",
  "경제",
  "정치와 법",
  "사회 문화",
  "생활과 윤리",
  "윤리와 사상",
  "물리학 I",
  "화학 I",
  "생명과학 I",
  "지구과학 I",
  "여행지리",
  "사회문제 탐구",
  "고전과 윤리",
  "물리학 II",
  "화학 II",
  "생명과학 II",
  "지구과학 II",
  "과학사",
  "생활과 과학",
  "융합과학",
  "공학 일반",
  "창의 경영",
  "프로그래밍",
];

async function reqSchedules() {
  const date = new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let grade = "";
  let clss = "";

  try {
    grade = await AsyncStorage.getItem("grade");
    clss = await AsyncStorage.getItem("clss");
  } catch (e) {
    return {
      status: "error",
      grade: grade,
      class: clss,
      date: `${month} / ${day}`,
    };
  }

  const params = {
    KEY: process.env.EXPO_PUBLIC_API_KEY,
    Type: "json",
    SEM: month < 8 ? 1 : 2,
    ATPT_OFCDC_SC_CODE: process.env.EXPO_PUBLIC_STATECODE,
    SD_SCHUL_CODE: process.env.EXPO_PUBLIC_SCHULCODE,
    GRADE: grade,
    CLASS_NM: clss,
    ALL_TI_YMD: `${year}${month}${day}`,
  };

  const response = await axios.get("https://open.neis.go.kr/hub/hisTimetable", {
    params,
  });

  if (response.data?.RESULT?.CODE === "INFO-200") {
    return {
      status: "error",
      grade: grade,
      class: clss,
      date: `${month} / ${day}`,
    };
  }

  let schedule = response.data.hisTimetable[1].row;

  let todaySchedule = [];

  schedule.map((a, i) => {
    if (a.PERIO - 1 != i) {
      todaySchedule.push("이동수업");
    }

    if (trasfer.indexOf(a.ITRT_CNTNT) == -1) {
      todaySchedule.push(a.ITRT_CNTNT);
    } else {
      todaySchedule.push("이동수업");
    }
  });

  await AsyncStorage.setItem(
    "schedules",
    JSON.stringify({
      status: "ok",
      date: `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}`,
      grade: grade,
      class: clss,
      data: todaySchedule,
    })
  );

  console.log("Requested Schedules");

  return {
    status: "ok",
    date: `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    grade: grade,
    class: clss,
    data: todaySchedule,
  };
}

export async function getSchedules() {
  const date = new Date();
  let schedule;
  try {
    const jsonValue = await AsyncStorage.getItem("schedules");
    if (jsonValue === null) {
      schedule = await reqSchedules();
    } else {
      if (
        JSON.parse(jsonValue).date !=
        `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}`
      ) {
        schedule = await reqSchedules();
      } else {
        schedule = JSON.parse(jsonValue);
      }
    }
  } catch (e) {
    schedule = await reqSchedules();
  }

  return schedule;
}
