import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

async function reqMeal() {
  const currentDate = new Date();

  const meals = {
    date: `${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate.getDate().toString().padStart(2, "0")}`,
    data: [],
  };

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.getTime());
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
      meals.data.push({ status: "error", date: `${month} / ${day}` });
      continue;
    }

    let dishes = response.data.mealServiceDietInfo[1].row[0].DDISH_NM.split(
      "<br/>"
    ).map((dish) => dish.split(" ")[0].replace("H", ""));

    meals.data.push({ status: "ok", date: `${month} / ${day}`, data: dishes });
  }

  AsyncStorage.setItem("meals", JSON.stringify(meals));

  console.log("requested meals.");

  return meals;
}

export async function getMeal() {
  const date = new Date();
  let meals;
  try {
    const jsonValue = await AsyncStorage.getItem("meals");
    if (jsonValue === null) {
      meals = await reqMeal();
    } else {
      if (
        JSON.parse(jsonValue).date !=
        `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}`
      ) {
        meals = await reqMeal();
      } else {
        meals = JSON.parse(jsonValue);
      }
    }
  } catch (e) {
    meals = await reqMeal();
  }

  return meals.data;
}
