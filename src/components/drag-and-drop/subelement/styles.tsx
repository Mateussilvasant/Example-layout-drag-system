import styled from "styled-components";

export interface ElementContentSettings {
    isDragging: boolean
}

export const SubElementoContent = styled.div`

    padding: 0.5rem 1rem;
    background-color: white;
    cursor: move;
    opacity: ${(settings: ElementContentSettings) => settings.isDragging ? 0 : 1};
    border: 1px solid blue;
    flex: 1 1 100%;
    padding: 10px;
    
`