import React from "react";
import { useDrop } from "react-dnd";
import {
  ChildrenElement,
  ItemTypes,
  ParentElement,
} from "../hooks/useLayoutDragSystem";
import { DropZoneContent } from "./styles";

export interface DropZoneData {
  data: ChildrenElement | ParentElement;
  type: string;
  path: string;
  childrenCount?: number;
}

export interface TDropZone {
  data: DropZoneData;
  handleDrop: (dropZone: DropZoneData, item: DropZoneData) => void;
  canDropItem?: (dropZone: DropZoneData, item: DropZoneData) => boolean;
  isLast?: boolean;
  isHorizontal?: boolean;
}

export const DropZone: React.FC<TDropZone> = ({
  data,
  handleDrop,
  canDropItem,
  isHorizontal,
  isLast,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.PARENT, ItemTypes.CHILDREN],
    drop: (item: DropZoneData, monitor) => {
      handleDrop(data, item);
    },
    canDrop: (item: DropZoneData, monitor) => {
      const dropZonePathArray = data.path.split("-");
      const itemPathArray = item.path.split("-");

      if (item.path === data.path) {
        return false;
      }

      // Current area
      if (itemPathArray.length === dropZonePathArray.length) {
        const pathToItem = itemPathArray.slice(0, -1).join("-");
        const currentItemIndex = Number(itemPathArray.slice(-1)[0]);

        const pathToDropZone = dropZonePathArray.slice(0, -1).join("-");
        const currentDropZoneIndex = Number(dropZonePathArray.slice(-1)[0]);

        if (pathToItem === pathToDropZone) {
          const nextDropZoneIndex = currentItemIndex + 1;

          if (nextDropZoneIndex === currentDropZoneIndex) {
            return false;
          }
        }
      }

      if (canDropItem) {
        return canDropItem(data, item);
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <DropZoneContent
      ref={drop}
      isActive={isActive}
      isLast={isLast}
      isHorizontal={isHorizontal}
    />
  );
};
