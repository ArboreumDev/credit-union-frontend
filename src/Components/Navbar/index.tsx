import * as React from "react";

import { INavbar } from "./Navbar";
import {Session} from "../../utils/types";
import {Container, Content, Tab, TabPrimary, BoxRow, LogoImg, LogoTab, TabLink} from "./styles";
import {Images, Colors, Fonts} from "../../Themes";
import Button from '@material-ui/core/Button';

const Navbar: React.FunctionComponent<INavbar.IProps> = (props: { session?: Session }): JSX.Element => {
    return (
        <Container>
            <Content>
                <LogoTab>
                    <TabLink href="#">
                        <LogoImg src={Images.logoDark} />
                    </TabLink>
                </LogoTab>
                <BoxRow>
                    <Tab>
                        <Button style={{color: Colors.black}}>Loans</Button>
                    </Tab>
                    <Tab>
                        <Button style={{color: Colors.black}}>Invest</Button>
                    </Tab>
                    <Tab>
                        <Button style={{color: Colors.black}}>Insure</Button>
                    </Tab>
                </BoxRow>
            </Content>
            <Content>
                <BoxRow>
                    <Tab>
                        <Button style={{color: Colors.green}} >Login</Button>
                    </Tab>
                    <TabPrimary>
                        <Button style={{backgroundColor: Colors.green, color: Colors.snow}} variant={"contained"} size={'large'}>
                            Sign Up
                        </Button>
                    </TabPrimary>
                </BoxRow>
            </Content>
        </Container>
    );
};

export { Navbar };
