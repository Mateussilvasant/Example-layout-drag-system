import styled from "styled-components";

export interface ElementContentSettings {
    isDragging: boolean
}

export const ElementoContent = styled.div`

    padding: 0.5rem 1rem;
    background-color: white;
    cursor: move;
    border: 1px solid red;
    opacity: ${(settings: ElementContentSettings) => settings.isDragging ? 0 : 1};

    .sub-groups{
        display: flex;
        flex-direction: column;
        padding: 20px 0;
    }

`