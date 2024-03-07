import styles from "./DraggableItem.module.scss";
import interact from "interactjs";
import uuid from "uuid-random";

type DraggableItemProps = {
  x?: number;
  y?: number;
};

export default function DraggableItem({ x = 0, y = 0 }: DraggableItemProps) {
  const id = `draggable-${uuid()}`;
  const position = { x: x, y: y };
  startDraggable(id, position);

  return (
    <>
      <div
        className={styles.draggable_item}
        id={id}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        Drag me 😚
      </div>
    </>
  );
}

const startDraggable = (id: string, position: { x: number; y: number }) => {
  interact(`#${id}`).draggable({
    listeners: {
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [interact.snappers.grid({ x: 0, y: 0 })],
        range: Infinity,
        relativePoints: [{ x: 0, y: 0 }],
      }),
      interact.modifiers.restrict({
        restriction: "parent",
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        endOnly: true,
      }),
    ],
    inertia: false,
  });
};
