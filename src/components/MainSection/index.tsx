import * as React from "react";

import { IMainSection } from "./MainSection";
import { Session } from "../../utils/types";
import { Images } from "../../Themes";
import { UtilityService } from "../../Services";
import { homeScreenData } from "../../Fixtures";
import {
  TitleText,
  TitleImg,
  IntroGif,
  Content,
  Container,
  LeftBox,
  RightBox,
  DescText,
} from "./styles";

const MainSection: React.FunctionComponent<IMainSection.IProps> = (props: {
  session?: Session;
}): JSX.Element => {
  if (
    UtilityService.checkEmpty(homeScreenData.getHomeScreenData().mainSection)
  ) {
    homeScreenData.getHomeScreenData().mainSection.map((data) => {
      return (
        <Container>
          <Content>
            <LeftBox>
              <IntroGif src={Images.featureOne} />
            </LeftBox>
            <RightBox>
              <TitleText>{data.title}</TitleText>
              <DescText>{data.desc}</DescText>
            </RightBox>
          </Content>
        </Container>
      );
    });
  }
};

export { MainSection };
