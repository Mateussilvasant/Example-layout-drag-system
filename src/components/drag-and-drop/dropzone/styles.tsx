import styled from "styled-components";

export interface DropZoneSettings {
    isActive: boolean,
    isHorizontal?: boolean,
    isLast?: boolean,
}

export const DropZoneContent = styled.div`

    flex: 0 0 auto;
    height: 40px;
    transition: 200ms all;

    :nth-of-type(2n){
        display: none;
    }

    ${(css: DropZoneSettings) => css.isActive && `
        background: #FF3639;
        transition: 100ms all;
    `}

    ${(css: DropZoneSettings) => !css.isHorizontal && css.isLast && `
        flex: 1 1 auto;
    `}

     ${(css: DropZoneSettings) => css.isHorizontal && `
        height: auto;
        width: 40px;
    `}
`;