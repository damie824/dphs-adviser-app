import styled from "styled-components/native";
import { Background } from "../../../styles/styled.components";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlannerToDos() {
  const [inputValue, setValue] = useState("");

  const [toDos, setToDos] = useState([]);

  const loadToDos = async () => {
    try {
      const data = await AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_TODOS_KEY
      );

      if (data != null) {
        const date = new Date();
        if (data[1]?.date !== `${date.getMonth() + 1}/${date.getDate()}`) {
          data.shift();
        }
        newToDos[0] = newToDos[0] ?? { date: "", data: {} };
        newToDos[1] = newToDos[1] ?? {
          date: `${date.getMonth + 1}/${date.getDate}`,
          data: {},
        };
        setToDos(JSON.parse(data));
      }
    } catch (e) {}
  };

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(
      process.env.EXPO_PUBLIC_TODOS_KEY,
      JSON.stringify(toSave)
    );
  };

  const addToDo = async () => {
    if (inputValue === "") {
      return;
    }

    const date = new Date();
    const newToDos = [...toDos];

    newToDos[0] = newToDos[0] ?? { date: "", data: {} };

    if (newToDos[1]?.date !== `${date.getMonth() + 1}/${date.getDate()}`) {
      newToDos.shift();
    }

    newToDos[1] = newToDos[1] ?? {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      data: {},
    };

    newToDos[1].data = {
      ...toDos[1]?.data,
      [Date.now()]: { value: inputValue, subject: "없음", isDone: false },
    };

    await saveToDos(newToDos);
    setToDos(newToDos);
    console.log(newToDos);
    setValue("");
  };

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <Background>
      <InputContainer>
        <ToDosInput
          maxLength={20}
          onChangeText={(e) => {
            setValue(e);
          }}
          placeholder='오늘의 계획은 어떠신가요?'
          value={inputValue}
        />
        <ToDosButton onPress={addToDo}>
          <Ionicons name='checkmark' size={24} color='white' />
        </ToDosButton>
      </InputContainer>
      <ToDosContainer></ToDosContainer>
    </Background>
  );
}

const InputContainer = styled.View`
  width: 90%;
  flex-direction: row;
  margin: 0 auto;
  overflow: hidden;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const ToDosInput = styled.TextInput`
  width: 80%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
`;

const ToDosButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border: 1px solid white;
  text-align: center;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
`;

const ToDosContainer = styled.ScrollView``;
