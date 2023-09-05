import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function getSchedules() {
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
    console.warn(e);
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

  schedule.reduce((perio, a) => {
    todaySchedule.push(a.ITRT_CNTNT);
    return perio + 1;
  }, 1);

  return { status: "ok", grade: grade, class: clss, data: todaySchedule };
}
