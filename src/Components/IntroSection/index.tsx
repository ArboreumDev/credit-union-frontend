import * as React from "react";

import { IIntroSection } from "./IntroSection";
import {Session} from "../../utils/types";
import {Images} from "../../Themes";
import {homeScreenData} from "../../Fixtures";
import {TitleText, TitleImg, IntroGif, Content, Container, LeftBox, RightBox, DescText} from "./styles";

const IntroSection: React.FunctionComponent<IIntroSection.IProps> = (props: { session?: Session }): JSX.Element => {
    return (
        <Container>
            <Content>
                <LeftBox>
                    <TitleImg src={Images.automataLogo}/>
                    <TitleText>
                        {homeScreenData.getHomeScreenData().introSection.title}
                    </TitleText>
                    <DescText>
                        {homeScreenData.getHomeScreenData().introSection.desc}
                    </DescText>
                </LeftBox>
                <RightBox>
                    <IntroGif src={Images.analyticsTwo}/>
                </RightBox>
            </Content>
        </Container>
    );
};

export { IntroSection };
