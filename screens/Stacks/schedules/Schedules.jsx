import { useAsync } from "react-async";
import { Dimensions, ScrollView, View } from "react-native";
import Notice from "../../../components/Notice";
import { Background, Title } from "../../../styles/styled.components";
import styled from "styled-components/native";
import { getSchedules } from "../../../scripts/schedules/getschedules";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Schedules() {
  const { data: schedules, isErr, isLoading } = useAsync(getSchedules, []);

  if (isLoading) {
    return <Notice title='로딩중이에요!' desc='오늘 하루도 응원할게요!' />;
  }

  if (isErr) {
    return (
      <Notice title='에러가 발생했어요!' desc='잠시 후 다시 시도해 주세요.' />
    );
  }

  if (schedules.status === "error") {
    return <Notice title='시간표 정보 없음' desc='오늘 쉬는 날인가 봐요!' />;
  }

  return (
    <Background>
      <View style={{ alignItems: "center", paddingTop: 20 }}>
        <View style={{ height: 10 }}></View>
        <Title>
          {schedules.grade}학년 {schedules.class}반의 시간표에요!
        </Title>
        <View style={{ height: 15 }}></View>
        <ScrollView style={{ width: SCREEN_WIDTH, marginTop: 10 }}>
          {schedules.data.map((a, i) => {
            return (
              <ScheduleContainer key={i}>
                <Title>{a}</Title>
              </ScheduleContainer>
            );
          })}
        </ScrollView>
      </View>
    </Background>
  );
}

const ScheduleContainer = styled.View`
  padding: 5px 20px;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 15px;
  justify-content: space-between;
  border-radius: 10px;
`;
