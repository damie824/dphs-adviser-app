import {
  Background,
  MainContainer,
  Texts,
  Title,
} from "../../../styles/styled.components";
import { getMeal } from "../../../scripts/meals/getmeal";
import PagerView from "react-native-pager-view";
import { useAsync } from "react-async";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import * as WebBrowser from "expo-web-browser";
import Notice from "../../../components/Notice";

export default function Meals() {
  const { data: meals, error, isLoading } = useAsync(getMeal, []);

  if (isLoading)
    return <Notice title='로딩중이에요!' desc='점심 맛있게 드세요!' />;

  if (error) {
    return (
      <Notice title='에러가 발생했어요!' desc='잠시 후 다시 시도해 주세요.' />
    );
  }

  return (
    <Background>
      <MainContainer style={{ marginLeft: 10 }}>
        <PagerView
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          {meals.map((meal, i) =>
            meal.status === "ok" ? (
              <DishesContainer key={i} date={meal.date} dishes={meal.data} />
            ) : (
              <NoMealInfo key={i} date={meal.date} />
            )
          )}
        </PagerView>
      </MainContainer>
    </Background>
  );
}

const DishesContainer = ({ date, dishes }) => (
  <>
    <DateHeader date={date} />
    {dishes?.map((dish, i) => (
      <Dish key={i} dish={dish} />
    ))}
  </>
);

const NoMealInfo = ({ date }) => (
  <>
    <DateHeader date={date} />
    <CenteredHalfFlexBox>
      <Title>급식 정보 없음</Title>
    </CenteredHalfFlexBox>
  </>
);

const CenteredHalfFlexBox = styled.View`
  justify-content: center;
  align-items: center;
  flex: 0.5;
`;

const DateHeader = ({ date }) => (
  <DateContainer>
    <Title>{date}</Title>
  </DateContainer>
);

const DateContainer = styled.View`
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Dish = ({ dish }) => {
  const _OpenSearchTab = async () =>
    await WebBrowser.openBrowserAsync(
      `https://www.google.com/search?query=${encodeURIComponent(dish)}`
    );

  return (
    <TouchableOpacity onPress={_OpenSearchTab}>
      <DishContainer>
        <Title>{dish}</Title>
      </DishContainer>
    </TouchableOpacity>
  );
};

const DishContainer = styled.View`
  width: 90%;
  padding: 10px;
`;
