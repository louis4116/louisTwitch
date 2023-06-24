import { useDragLayer } from "react-dnd";
import { ItemTypes } from "../support/ItemTypes";
import BottomDetail from "../Bottom/BottomDetail";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};
function getItemStyles(initialOffset, currentOffset) {
  //抓取中的時候，被抓取的物件會呈現什麼狀態
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)  rotate(-5deg)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}
export const CustomDragLayer = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    //提取物件的屬性
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));
  //決定回傳的物件包含甚麼屬性
  function renderItem() {
    switch (itemType) {
      case ItemTypes.DETAIL:
        return (
          <BottomDetail
            key={item.id}
            id={item.id}
            userId={item.user_id}
            login={item.login}
            title={item.title}
            name={item.name}
            game={item.game}
            tags={item.tags}
            viewer={item.viewer}
            duration={item.duration}
            moveItem={item.moveItem}
          />
        );
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
      >
        {renderItem()}
      </div>
    </div>
  );
};
