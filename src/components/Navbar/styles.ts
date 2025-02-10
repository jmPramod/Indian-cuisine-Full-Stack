import styled from "@emotion/styled";
import {
  Field,
  Menu,
  MenuItem,
  MenuPopover,
  SearchBox,
  Toolbar,
} from "@fluentui/react-components";

import { FaPizzaSlice } from "react-icons/fa6";

export const styles = {
  ToolbarContainer: styled(Toolbar)<{
    $isHomePage: boolean;
  }>`
    min-height: ${({ $isHomePage }) => ($isHomePage ? " 90px" : " 60px")};
    display: flex;
    background-color: ${({ $isHomePage }) =>
      $isHomePage ? "transparent" : "gray"};
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    width: 100%;
    margin: 0 auto;
     position: ${({ $isHomePage }) => ($isHomePage ? "absolute" : "static")};
    z-index: 30;
    color: rgba(0, 0, 0, 0.87);
    width: 100%;
     color: #fff;

    @media (max-width: 768px) {
       padding: 10px;
    }
  `,
logo:styled(FaPizzaSlice)`

@media (0<width<780px) {
      font-size: 10px;
    }`,
  searchDropdown: styled("div")`
    position: absolute;
    top: 100%;
     width: 100%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10;
     max-width: 468px;
    margin: 0 auto;
  `,
  searchItem: styled("div")`
    color: black;
    padding: 8px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  `,
  LogoButton: styled("div")<{
    $isHomePage: boolean;
  }>`
    font-size: 20px;
    font-weight: bold;
    display: flex;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: ${({ $isHomePage }) =>
      $isHomePage ? "1px solid white" : "1px solid white"};
    color: white;
    :hover {
      transform: scale(1.1);
    }
    @media (0<width<780px) {
      font-size: 10px;
      gap: 5px;
    }
  `,

  menuContainer: styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
      display: none; 
    }
  `,

  mobileMenuButton: styled("div")`
    display: none;
    color: black;
    @media (max-width: 768px) {
      display: flex; 
      background-color: white;
      border: none;
      cursor: pointer;
      font-size: 18px;
      
      flex-wrap: wrap;
     
      padding: 8px 12px;
      border-radius: 7px;
    }
  `,

  profileImage: styled("img")`
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 1px solid black;
    cursor: pointer;


  `,

  MenuPopoverContainer: styled(MenuPopover)`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    padding: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  `,

  menuWrapper: styled(Menu)`
    position: relative;
  `,

  menuItem: styled(MenuItem)`
    width: 100%;
  `,

  field: styled(Field)`
    width: 40%;
    position: relative;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      width: auto;
    }

    @media (max-width: 480px) {
      width: auto;
    }
  `,

  searchBox: styled(SearchBox)`
    width: 100%;
  `,
  searchConatiner: styled("div")`
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:space-between;
   padding:5px`,
   buttonWrapper:styled("div")`
   padding: 16px;
   gap: 10px;
   display: flex;
   flex-direction: column `,
   img:styled("img")`
   width:50px;`
};
