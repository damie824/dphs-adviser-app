import { Text, View } from "react-native";
import { Background, Texts, Title } from "../../styles/styled.components";

export default function Planner() {
  return (
    <Background>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Title>플래너 기능은 아직 개발하고 있어요!</Title>
        <Texts
          style={{
            marginTop: 10,
            fontSize: 12,
          }}
        >
          최대한 빠르게 사용하실 수 있게 만들어 드릴게요 : )
        </Texts>
      </View>
    </Background>
  );
}
