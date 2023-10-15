import styled from "styled-components/native";
import { Background } from "../../styles/styled.components";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";

export default function Planner({ navigation: { navigate } }) {
  isDark = useColorScheme() === "dark";

  const day = 10;
  const [sec, changeSec] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (play) {
        changeSec(sec + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [sec, play]);

  const hour = Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0");
  const min = Math.floor(sec / 60 - hour * 60)
    .toString()
    .padStart(2, "0");
  const second = (sec % 60).toString().padStart(2, "0");

  const perc = sec / day;

  return (
    <Background>
      <TimerContainer>
        <ProgressCircle
          style={{ height: 200 }}
          progress={perc}
          progressColor={sec > day ? "#ff4444" : "#4466ff"}
        />
        {sec > day ? (
          <PlanText>🔥목표 시간 달성!🔥</PlanText>
        ) : (
          <PlanText>오늘의 공부 시간</PlanText>
        )}
        <TimerText>{`${hour}:${min}:${second}`}</TimerText>
      </TimerContainer>
      <Controller
        onPress={() => {
          setPlay(!play);
        }}
      >
        <ControllerText color={play ? "#ff4f30" : "#3067ff"}>
          {play == false ? "공부 시작" : "공부 종료"}
        </ControllerText>
      </Controller>
      <PlannerTitle>
        오늘의 작은 노력이 내일의 큰 성취로 이어질 거야.
      </PlannerTitle>
      <PlannerItemContainer>
        <PlannerItemButton
          onPress={() => {
            navigate("Stack", { screen: "오늘 할 일" });
          }}
        >
          <PlannerItem>오늘 해야 할 것들</PlannerItem>
        </PlannerItemButton>
        <PlannerDivider></PlannerDivider>
        <PlannerItemButton>
          <PlannerItem>최근 공부 통계 확인</PlannerItem>
        </PlannerItemButton>
        <PlannerDivider></PlannerDivider>
        <PlannerItemButton>
          <PlannerItem>플래너 설정</PlannerItem>
        </PlannerItemButton>
      </PlannerItemContainer>
    </Background>
  );
}

const Controller = styled.TouchableOpacity`
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: -20px;
  margin-bottom: 20px;
  justify-content: center;
  border-radius: 20%;
  overflow: hidden;
`;

const ControllerText = styled.Text`
  color: white;
  background-color: ${(props) => props.color};
  padding: 10px 30px;
`;

const TimerContainer = styled.View`
  margin-top: 50px;
`;

const PlannerTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-family: "KyoboHandwriting";
  text-align: center;
  width: 50%;
  margin-top: -20px;
  font-size: 18px;
  margin: 0 auto;
`;

const PlanText = styled.Text`
  color: ${(props) => props.theme.textColor};
  text-align: center;
  font-size: 13px;
  top: -50%;
`;

const TimerText = styled.Text`
  color: ${(props) => props.theme.textColor};
  text-align: center;
  font-size: 25px;
  top: -50%;
`;

const PlannerItemContainer = styled.View`
  width: 80%;
  height: 150px;
  margin: 0 auto;
  margin-top: 30px;
  background-color: ${(props) => props.theme.subBackgroundColor};
  border-radius: 20px;
  padding: 10px 20px;
  justify-content: space-between;
  overflow: hidden;
`;

const PlannerItemButton = styled.TouchableOpacity`
  height: 30%;
  justify-content: center;
`;

const PlannerItem = styled.Text`
  color: ${(props) => props.theme.textColor};
  width: 100%;
`;

const PlannerDivider = styled.View`
  background-color: ${(props) => props.theme.textColor};
  height: 0.3px;
`;
