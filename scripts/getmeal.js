import axios from "axios";

export async function getMeal() {
  const meals = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    const params = {
      KEY: process.env.EXPO_PUBLIC_API_KEY,
      Type: "json",
      ATPT_OFCDC_SC_CODE: process.env.EXPO_PUBLIC_STATECODE,
      SD_SCHUL_CODE: process.env.EXPO_PUBLIC_SCHULCODE,
      MLSV_YMD: `${year}${month}${day}`,
    };

    const response = await axios.get(
      "https://open.neis.go.kr/hub/mealServiceDietInfo",
      { params }
    );

    if (response.data?.RESULT?.CODE === "INFO-200") {
      meals.push({ status: "error", date: `${month} / ${day}` });
      continue;
    }

    let dishes = response.data.mealServiceDietInfo[1].row[0].DDISH_NM.split(
      "<br/>"
    ).map((dish) => dish.split(" ")[0].replace("H", ""));

    meals.push({ status: "ok", date: `${month} / ${day}`, data: dishes });
  }

  return meals;
}
