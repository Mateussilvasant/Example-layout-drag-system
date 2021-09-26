import React, { Fragment, useRef } from "react";
import { useDrag } from "react-dnd";
import { DropZone, DropZoneData } from "../dropzone";
import { ItemTypes, ParentElement } from "../hooks/useLayoutDragSystem";
import { ChildrenElementComponent } from "../subelement";
import { ElementoContent } from "./styles";

export interface TElement {
    data: ParentElement;
    path: string;
    handleDrop: (dropZone: DropZoneData, item: DropZoneData) => void;
}

export const ParentElementComponent: React.FC<TElement> = ({ data, handleDrop, path }) => {
    const ref = useRef<HTMLDivElement>(null);

    const zone: DropZoneData = {
        data: data,
        path: path,
        type: ItemTypes.PARENT,
    };

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.PARENT,
        item: zone,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(ref);

    return (
        <ElementoContent ref={ref} isDragging={isDragging}>
            {data.name}
            <div className={"sub-groups"}>
                {data.subGroups.map((subElement, index) => {
                    const currentPath = `${path}-${index}`;
                    return (
                        <Fragment key={subElement.id}>
                            <DropZone
                                data={{
                                    path: currentPath,
                                    childrenCount: data.subGroups.length,
                                    data: subElement,
                                    type: ItemTypes.CHILDREN
                                }}
                                handleDrop={handleDrop}

                            />
                            <ChildrenElementComponent data={subElement} path={currentPath} />
                        </Fragment>
                    );
                })}
                <DropZone data={{
                    data: data.subGroups[data.subGroups.length - 1],
                    path: `${path}-${data.subGroups.length}`,
                    childrenCount: data.subGroups.length,
                    type: ItemTypes.CHILDREN
                }} handleDrop={handleDrop} isLast />
            </div>

        </ElementoContent>
    );
};
