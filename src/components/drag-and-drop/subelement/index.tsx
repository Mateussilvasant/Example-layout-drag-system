import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { DropZoneData } from "../dropzone";
import { ChildrenElement, ItemTypes } from "../hooks/useLayoutDragSystem";
import { SubElementoContent } from "../subelement/styles";

export interface TSubElement {
    data: ChildrenElement;
    path: string;

}

export const ChildrenElementComponent: React.FC<TSubElement> = ({ data, path }) => {

    const ref = useRef<HTMLDivElement>(null);

    const zone: DropZoneData = {
        data: data,
        path: path,
        type: ItemTypes.CHILDREN,
    }

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CHILDREN,
        item: zone,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(ref);

    return (
        <SubElementoContent ref={ref} isDragging={isDragging}>
            {data.name}
        </SubElementoContent>
    );
}