import { moveColumn } from "../store/features/board";
import { useAppDispatch } from "../store/hooks";

const useBoardDrag = (
  type: string,
  destinationIndex: number,
  sourceIndex: number,
  draggableId: string
) => {
  const dispatcher = useAppDispatch();

  if (type === "column") {
    dispatcher(moveColumn({ destinationIndex, sourceIndex, draggableId }));
  }
};

export default useBoardDrag;
