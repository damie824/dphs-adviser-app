import { View } from "react-native";
import { Background, Texts, Title } from "../styles/styled.components";

export default function Notice(props) {
  return (
    <Background>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Title>{props.title}</Title>
        <Texts
          style={{
            marginTop: 10,
            fontSize: 12,
          }}
        >
          {props.desc}
        </Texts>
      </View>
    </Background>
  );
}
