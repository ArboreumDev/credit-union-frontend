import * as React from "react";

import { INavbar } from "./Navbar";
import {Session} from "../../../utils/types";
import {Container, Content, Tab, TabPrimary, BoxRow, LogoImg, LogoTab, TabLink, TabActiveLink} from "./styles";
import {Images, Colors, Fonts} from "../../Themes";

const Navbar: React.FunctionComponent<INavbar.IProps> = (props: { session?: Session }): JSX.Element => {
    return (
        <Container>
            <Content>
                <LogoTab>
                    <TabLink href="">
                        <LogoImg src={Images.logoDark} />
                    </TabLink>
                </LogoTab>
                <BoxRow>
                    <Tab>
                        <TabLink href="">Loans</TabLink>
                    </Tab>
                    <Tab>
                        <TabLink href="">Invest</TabLink>
                    </Tab>
                    <Tab>
                        <TabLink href="">Insure</TabLink>
                    </Tab>
                </BoxRow>
            </Content>
            <Content>
                <BoxRow>
                    <Tab>
                        <TabLink href="">Login</TabLink>
                    </Tab>
                    <TabPrimary>
                        <TabActiveLink href="">Sign Up</TabActiveLink>
                    </TabPrimary>
                </BoxRow>
            </Content>
        </Container>
    );
};

export { Navbar };
