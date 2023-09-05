import { TouchableOpacity } from "react-native";
import { Background, Title } from "../../styles/styled.components";
import styled from "styled-components/native";

export default function Settings({ navigation: { navigate } }) {
  return (
    <Background style={{ paddingTop: 40, paddingHorizontal: 30 }}>
      <Title style={{ textAlign: "center" }}>설정을 관리해 보세요!</Title>
      <Divider></Divider>
      <TouchableOpacity
        onPress={() => {
          navigate("Stack", { screen: "UserInfo" });
        }}
      >
        <Title>반 번호 변경</Title>
      </TouchableOpacity>
      <Divider></Divider>
      <Title style={{ fontSize: 15, textAlign: "center", marginTop: 20 }}>
        ..더 많은 내용들이 곧 추가될 거에요!
      </Title>
    </Background>
  );
}

const Divider = styled.View`
  width: 100%;
  height: 0.5px;
  margin: 20px auto;
  background-color: white;
`;
