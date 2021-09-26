import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    
    :root{
        --color-background: #FAFAFA;
    }

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        outline: 0;
        list-style: none;
        border: 0;      
    }

    a {
        text-decoration: none;
    }

    body,input,button,textarea,a {
        font-family: 'Segoe UI';
        font-size: 1rem;
    }

    body{
        background-color: var(--color-background);
        -webkit-font-smoothing: antialiased;
    }





`