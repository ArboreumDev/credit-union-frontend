import styled from "styled-components";
import {Colors, Fonts} from "../../Themes";

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: '100%';
    box-shadow: 0 5px 4px rgba(0,0,0,.04);
`;

export const BoxRow = styled.div`
    display:table-row;
`;

export const Content = styled.div`
    padding-left: 35px;
    width: '100%';
    background-color: ${Colors.snow};
    /*background-image: linear-gradient(${Colors.cyan}, ${Colors.teal});*/
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const LogoImg = styled.img` 
    height: 30px;
    background: ${Colors.transparent};
`;

export const LogoTab = styled.div`
    display: flex!important;
    line-height: 60px;
    width: 30%;
    cursor: pointer;
    justify-content: center!important;
    align-items: center!important;
    background: ${Colors.transparent};
    margin-right: 20px;
`;

export const Tab = styled.div`
    display:table-cell; 
    width:20%; 
    padding:10px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 20px;
    font-family: ${Fonts.type.upgrage};
    font-weight: 300;
`;

export const TabLink = styled.a`
    color: #FFF!important;
    text-decoration: none!important;
    padding: 9px 15px;
    font-size: 20px;
    line-height: 25px;
    margin: 0;
    cursor: pointer;
    text-align: center;
    -webkit-transition: .2s linear;
    transition: .2s linear;
`;

export const TabPrimary = styled.div`
    flex: 1;
    height: 30px;
    display:table-cell;
    padding:10px;
    font-size: 20px;
    font-family: ${Fonts.type.upgrage};
    font-weight: 300;
`;

export const TabActiveLink = styled.a`
    background: ${Colors.primary};
    color: #FFF!important;
    text-decoration: none!important;
    padding: 9px 15px;
    font-size: 20px;
    line-height: 25px;
    margin: 0;
    cursor: pointer;
    text-align: center;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    border-width: thick;
    border-radius: 5px;
`;

