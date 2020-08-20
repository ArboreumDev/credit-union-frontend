import styled from "styled-components";
import { Colors, Fonts } from "../../Themes";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
`;

export const Content = styled.div`
    padding-left: 35px;
    width: 50%;
    background-color: ${Colors.snow};
    /*background-image: linear-gradient(${Colors.cyan}, ${Colors.teal});*/
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const BoxRow = styled.div`
  display: table-row;
`;

export const LeftBox = styled.div`
  display: table-cell;
  margin-top: 2%;
  margin-left: 2%;
  padding: 5%;
  line-height: 60px;
  font-size: 20px;
  font-family: ${Fonts.type.upgrage};
  font-weight: 300;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.snow};
`;

export const RightBox = styled.div`
  display: table-cell;
  margin-top: 2%;
  margin-right: 12%;
  line-height: 60px;
  font-size: 20px;
  font-family: ${Fonts.type.upgrage};
  font-weight: 300;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: flex-start;
  background: ${Colors.snow};
`;

export const TitleText = styled.p`
  color: ${Colors.black}!important;
  padding: 9px 1px;
  font-size: 48px;
  line-height: 48px;
  font-family: ${Fonts.type.upgrage};
  font-weight: 300;
  letter-spacing: 2px;
`;

export const DescText = styled.p`
  color: ${Colors.black}!important;
  padding: 10px 1px;
  font-size: 20px;
  line-height: 30px;
  font-family: ${Fonts.type.upgrage};
  font-weight: 150;
  word-spacing: 2px;
`;

export const TitleImg = styled.img`
  height: 70px;
  width: 150px;
  background: ${Colors.transparent};
  margin-bottom: 30px;
`;

export const IntroGif = styled.img`
  height: "100%";
  background: ${Colors.transparent};
`;
