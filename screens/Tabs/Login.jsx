import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Background, Texts, Title } from "../../styles/styled.components";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login(props) {
  const [Grade, setGrade] = useState(1);
  const [Clss, setClss] = useState(1);

  const grade = [
    { key: 1, value: "1" },
    { key: 2, value: "2" },
    { key: 3, value: "3" },
  ];
  const clss = [
    { key: 1, value: "1" },
    { key: 2, value: "2" },
    { key: 3, value: "3" },
    { key: 4, value: "4" },
    { key: 5, value: "5" },
    { key: 6, value: "6" },
    { key: 7, value: "7" },
    { key: 8, value: "8" },
    { key: 9, value: "9" },
    { key: 10, value: "10" },
  ];

  let isDark = useColorScheme() === "dark";

  return (
    <Background>
      <Container>
        <View style={{ marginBottom: 20 }}>
          <Title>학년과 반을 선택해 주세요!</Title>
        </View>
        <SelectList
          setSelected={(e) => {
            setGrade(e);
          }}
          data={grade}
          save='value'
          maxHeight={120}
          searchicon={
            <Ionicons
              name='search'
              style={{ marginRight: 10 }}
              size={20}
              color={isDark ? "#9c9c9c" : "#161616"}
            />
          }
          arrowicon={
            <Ionicons
              name='chevron-down'
              size={20}
              color={isDark ? "#9c9c9c" : "#161616"}
            />
          }
          closeicon={
            <Ionicons
              name='chevron-up'
              size={20}
              color={isDark ? "#9c9c9c" : "#161616"}
            />
          }
          placeholder='학년을 선택해 주세요.'
          dropdownTextStyles={{ color: isDark ? "#FFFFFF" : "#161616" }}
          inputStyles={{ color: isDark ? "#FFFFFF" : "#161616" }}
          boxStyles={{ width: 300 }}
        />
        <View style={{ height: 15 }}></View>
        <SelectList
          setSelected={(e) => {
            setClss(e);
          }}
          data={clss}
          save='value'
          searchicon={
            <Ionicons
              name='search'
              style={{ marginRight: 10 }}
              size={20}
              color={isDark ? "#9c9c9c" : "#161616"}
            />
          }
          arrowicon={
            <Ionicons
              name='chevron-down'
              size={20}
              color={isDark ? "#9c9c9c" : "#161616"}
            />
          }
          closeicon={
            <Ionicons
              name='chevron-up'
              size={20}
              color={isDark ? "#9c9c9c" : "#161616"}
            />
          }
          placeholder='반을 선택해 주세요.'
          dropdownTextStyles={{ color: isDark ? "#FFFFFF" : "#161616" }}
          inputStyles={{ color: isDark ? "#FFFFFF" : "#161616" }}
          boxStyles={{ width: 300 }}
        />
        <View style={{ height: 30 }}></View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "설정을 완료할게요!",
              `${Grade}학년 ${Clss}반이 맞나요?`,
              [
                {
                  text: "Yes",
                  onPress: async () => {
                    try {
                      await AsyncStorage.setItem("grade", Grade);
                      await AsyncStorage.setItem("clss", Clss);
                      await AsyncStorage.setItem("logined", "true");
                      props.setLogin(true);
                    } catch (e) {
                      Alert.alert("에러가 발생했어요!", `${e}`);
                    }
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text
            style={{
              color: isDark ? "#FFFFFF" : "#161616",
              fontSize: 15,
              paddingHorizontal: 40,
              paddingVertical: 10,
              borderColor: isDark ? "#FFFFFF" : "#161616",
              borderWidth: 0.5,
              borderRadius: 10,
            }}
          >
            다 선택했어요!
          </Text>
        </TouchableOpacity>
      </Container>
    </Background>
  );
}

let Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${(props) => {
    props.theme.textColor;
  }};
`;
