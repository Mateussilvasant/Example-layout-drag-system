import styled from "styled-components";

export const MainApp = styled.div`

    display: flex;
    flex-direction: column;

    nav{
        height: 60px;
        width: 100vw;
        position: fixed;
        z-index: 1000;
        display: flex;
        flex-direction: row;
        background-color: #FFFFFF;
        border: 1px solid #E5E5E5;
    }

    main{
      display: flex;
      flex-direction: row;
    }

    main .main-content{
      padding-left: 280px;
      padding-top: 40px;
      margin-top: 20px;
      width: 100%;
    }

    aside{
      display: flex;
      flex-direction: column;
      width: 280px;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: #FFFFFF;
      border: 1px solid #f0f0f0;
      overflow: auto;

      @media (max-width: 700px) {
        position: fixed;
      }

    }

`