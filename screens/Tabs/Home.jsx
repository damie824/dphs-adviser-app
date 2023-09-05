import React from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import PagerView from "react-native-pager-view";
import styled from "styled-components/native";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import {
  Background,
  MainContainer,
  Texts,
  Title,
} from "../../styles/styled.components";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Home({ navigation: { navigate } }) {
  const isDark = useColorScheme() === "dark";

  return (
    <Background>
      <PagerView
        style={{ width: "100%", minHeight: SCREEN_HEIGHT / 3 }}
        initialPage={0}
      >
        <BannerContainer key='1'>
          <TouchableOpacity
            onPress={async () => {
              await WebBrowser.openBrowserAsync("https://damie.works");
            }}
          >
            <Banner background='#7534ca'>
              <ImageBackground
                style={{ width: "100%", height: "100%" }}
                source={require("../../assets/banner-1.png")}
              />
            </Banner>
          </TouchableOpacity>
        </BannerContainer>
      </PagerView>
      <MainContainer>
        <View style={{ height: 30 }}></View>
        <Title style={{ textAlign: "center" }}>
          전 이런 것들을 할 수 있어요!
        </Title>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigate("Stack", { screen: "급식" });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{ marginBottom: 5, width: "100%", alignItems: "center" }}
            >
              <Ionicons
                name='fast-food'
                size={30}
                color={isDark ? "white" : "black"}
              />
            </View>
            <Texts>급 식</Texts>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate("Stack", { screen: "시간표" });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{ marginBottom: 5, width: "100%", alignItems: "center" }}
            >
              <Ionicons
                name='md-pencil'
                size={30}
                color={isDark ? "white" : "black"}
              />
            </View>
            <Texts>시간표</Texts>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate("Stack", { screen: "디데이" });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{ marginBottom: 5, width: "100%", alignItems: "center" }}
            >
              <Ionicons
                name='calendar'
                size={30}
                color={isDark ? "white" : "black"}
              />
            </View>
            <Texts>디데이</Texts>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigate("Tab", { screen: "Planner" });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{ marginBottom: 5, width: "100%", alignItems: "center" }}
            >
              <Ionicons
                name='book-sharp'
                size={30}
                color={isDark ? "white" : "black"}
              />
            </View>
            <Texts>플래너</Texts>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate("Stack", { screen: "실험실" });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{ marginBottom: 5, width: "100%", alignItems: "center" }}
            >
              <Ionicons
                name='flask'
                size={30}
                color={isDark ? "white" : "black"}
              />
            </View>
            <Texts>실험실</Texts>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await WebBrowser.openBrowserAsync("https://dphs.damie.works");
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{ marginBottom: 5, width: "100%", alignItems: "center" }}
            >
              <Ionicons
                name='ios-information-circle-outline'
                size={30}
                color={isDark ? "white" : "black"}
              />
            </View>
            <Texts>앱 정보</Texts>
          </TouchableOpacity>
        </View>
      </MainContainer>
    </Background>
  );
}

const BannerContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Banner = styled.View`
  background-color: ${(props) => props.background};
  flex: 1;
  width: 100%;
  margin-left: -50%;
`;
