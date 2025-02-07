import styled from "@emotion/styled";
import { Stack, Text, Link } from '@fluentui/react';

export const styles={
    outerContainer:styled("div")`
    background-color:black;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    `,
    logo:styled("img")`
    width:100px;
    border-radius: 10px;
    `,
    stack:styled(Stack)`
    
    color:white;`,
    text:styled(Text)` color:white;`,
    link:styled(Link)``
}