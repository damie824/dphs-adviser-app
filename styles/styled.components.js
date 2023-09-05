import styled from "styled-components/native";

export const Background = styled.View`
  background-color: ${({ theme }) => theme.mainBgColor};
  flex: 1;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${(props) => props.theme.textColor};
`;

export const Texts = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export const MainContainer = styled.View`
  flex: 1;
  padding-top: 10px;
`;
