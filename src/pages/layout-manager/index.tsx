import React, { Fragment } from "react";
import {
  DropZone,
  DropZoneData,
} from "../../components/drag-and-drop/dropzone";
import { ParentElementComponent } from "../../components/drag-and-drop/element";
import {
  ChildrenElement,
  ItemTypes,
  ParentElement,
  useLayoutDragSystem,
} from "../../components/drag-and-drop/hooks/useLayoutDragSystem";
import { ChildrenElementComponent } from "../../components/drag-and-drop/subelement";
import { LayoutManagerContent } from "./styles";

export const LayoutManager: React.FC<{}> = () => {
  const initialLayout: Array<ParentElement | ChildrenElement> = [
    {
      id: "children01",
      name: "Sub item 1",
    },
    {
      id: "parent02",
      name: "Item 2",
      subGroups: [
        {
          id: "children02",
          name: "Sub item 2",
        },
      ],
    },
    {
      id: "parent03",
      name: "Item 3",
      subGroups: [],
    },
    {
      id: "children03",
      name: "Sub item 3",
    },
  ];

  const {
    layout,
    moveElementWithinLayout,
    moveChildrenFromLayoutToParent,
    moveChildrenFromParentToLayout,
    moveChildrenWithinParent,
  } = useLayoutDragSystem(initialLayout);

  const handleDrop = (dropZone: DropZoneData, item: DropZoneData) => {
    const dropZoneArray = dropZone.path.split("-");
    const itemArray = item.path.split("-");

    //Movendo entre o layoout
    if (dropZoneArray.length === 1 && itemArray.length === 1) {
      moveElementWithinLayout(dropZone, item);

      //Movendo do layout para dentro de algum parent
    } else if (
      itemArray.length === 1 &&
      dropZoneArray.length === 2 &&
      item.type === ItemTypes.CHILDREN
    ) {
      moveChildrenFromLayoutToParent(dropZone, item);
    } else if (
      itemArray.length === 2 &&
      dropZoneArray.length === 1 &&
      item.type === ItemTypes.CHILDREN
    ) {
      moveChildrenFromParentToLayout(dropZone, item);
    } else if (
      itemArray.length === 2 &&
      dropZoneArray.length == 2 &&
      ItemTypes.CHILDREN
    ) {
      moveChildrenWithinParent(dropZone, item);
    }
  };

  const render = (
    element: ParentElement | ChildrenElement,
    currentPath: string
  ) => {
    if ((element as ParentElement).subGroups !== undefined) {
      return (
        <ParentElementComponent
          data={element as ParentElement}
          handleDrop={handleDrop}
          path={currentPath}
        />
      );
    }

    return (
      <ChildrenElementComponent
        data={element as ChildrenElement}
        path={currentPath}
      />
    );
  };

  return (
    <LayoutManagerContent>
      <div className="area-layout">
        {layout.map((element, index) => {
          const currentPath = `${index}`;

          return (
            <Fragment key={element.id}>
              <DropZone
                data={{
                  data: element,
                  path: currentPath,
                  type: ItemTypes.PARENT,
                  childrenCount: layout.length,
                }}
                handleDrop={handleDrop}
              />
              {render(element, currentPath)}
            </Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${layout.length}`,
            childrenCount: layout.length,
            data: layout[layout.length - 1],
            type: ItemTypes.PARENT,
          }}
          handleDrop={handleDrop}
          isLast
        />
      </div>
    </LayoutManagerContent>
  );
};
