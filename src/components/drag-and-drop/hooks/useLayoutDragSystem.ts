import { useState } from "react";
import { DropZoneData } from "../dropzone";


export interface ParentElement extends ChildrenElement {
    subGroups: Array<ChildrenElement>;
}

export interface ChildrenElement {
    id: string;
    name: string;
}
export const ItemTypes = {
    PARENT: "parent",
    CHILDREN: "children",
};

export interface TLayoutDragSystem {

    moveElementWithinLayout: (toZone: DropZoneData, item: DropZoneData) => void;

    moveChildrenWithinParent: (toZone: DropZoneData, item: DropZoneData) => void;

    moveChildrenFromParentToLayout: (toZone: DropZoneData, item: DropZoneData) => void;

    moveChildrenFromLayoutToParent: (toZone: DropZoneData, item: DropZoneData) => void;

    layout: Array<ParentElement | ChildrenElement>;
}

export const useLayoutDragSystem = (initialLayout: Array<ParentElement | ChildrenElement>) => {

    const [layout, setLayout] = useState<Array<ParentElement | ChildrenElement>>(initialLayout);

    const reorder = (array: Array<ParentElement | ChildrenElement>, startIndex: number, endIndex: number) => {
        const result = Array.from(array);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const moveElementWithinLayout = (toZone: DropZoneData, item: DropZoneData) => {

        const indexItem = Number(item.path.split("-")[0]);
        const indexZone = Number(toZone.path.split("-")[0]);

        if (indexItem < indexZone) {
            const array = reorder(layout, indexItem, indexZone - 1);
            setLayout(array);
        } else {
            const array = reorder(layout, indexItem, indexZone);
            setLayout(array);
        }

    }

    const moveChildrenWithinParent = (toZone: DropZoneData, item: DropZoneData) => {

        const newArray = [...layout];

        const positionZoneArray = toZone.path.split("-") as unknown as number[];;

        const positionItemArray = item.path.split("-") as unknown as number[];

        const posParent = positionZoneArray[0];

        const posItem = positionItemArray[0];

        const direction = posItem < posParent;

        const parent = newArray[direction ? posParent - 1 : posParent] as ParentElement;

        const indexItemChildren = positionItemArray[1];

        const indexZoneChildren = positionZoneArray[1];

        if (indexItemChildren < indexZoneChildren) {
            const array = reorder(parent.subGroups, indexItemChildren, indexZoneChildren - 1);
            parent.subGroups = array;
        } else {
            const array = reorder(parent.subGroups, indexItemChildren, indexZoneChildren);
            parent.subGroups = array;
        }

        setLayout(newArray);
    }

    const moveChildrenFromParentToLayout = (toZone: DropZoneData, item: DropZoneData) => {

        const newArray = removeChildrenWithinParent(item.path);
        addElementWithinLayout(newArray, item, toZone);
        setLayout(newArray);

    }

    const moveChildrenFromLayoutToParent = (toZone: DropZoneData, item: DropZoneData) => {

        const newArray = removeElementFromLayout(item.path);
        addChildrenWithinParent(newArray, item, toZone);
        setLayout(newArray);

    }

    const addElementWithinLayout = (array: Array<ParentElement | ChildrenElement>, item: DropZoneData, zone: DropZoneData) => {
        const posZone = Number(zone.path.split("-")[0]);
        array.splice(posZone, 0, item.data);
    }

    const addChildrenWithinParent = (array: Array<ParentElement | ChildrenElement>, item: DropZoneData, zone: DropZoneData) => {

        const positions = zone.path.split("-");

        const posItem = Number(item.path.split("-")[0]);

        const posParent = Number(positions[0]);

        const posChildren = Number(positions[1]);

        const direction = posItem < posParent;

        const parent = array[direction ? posParent - 1 : posParent] as ParentElement;

        parent.subGroups.splice(posChildren, 0, item.data);

    }

    const removeChildrenWithinParent = (path: string) => {

        const positions = path.split("-");

        const posParent = Number(positions[0]);

        const posChildren = Number(positions[1]);

        const newArray = [...layout];

        const parent = newArray[posParent] as ParentElement;

        const newChildrens = parent.subGroups.filter((value, index) => index !== posChildren);

        parent.subGroups = newChildrens;

        return newArray;

    }

    const removeElementFromLayout = (path: string) => {

        const positions = path.split("-");

        const pos = Number(positions[0]);

        const newArray = layout.filter((value, index) => index !== pos);

        return newArray;
    }

    const features: TLayoutDragSystem = {
        moveChildrenFromLayoutToParent: moveChildrenFromLayoutToParent,
        moveChildrenFromParentToLayout: moveChildrenFromParentToLayout,
        moveChildrenWithinParent: moveChildrenWithinParent,
        moveElementWithinLayout: moveElementWithinLayout,
        layout: layout
    }

    return features;
}