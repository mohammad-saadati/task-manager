import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { initialboard } from "../store/features/board";
import api from "../utils/axios";
import TaskManagment from "../components/TaskManagment";

const Board = () => {
  const dispatcher = useAppDispatch();
  const board = useAppSelector((state) => state.board);
  // const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  let { id } = useParams();

  const getData = useCallback(async () => {
    try {
      const url = `/boards/${id}`;
      const res = await api.get(url);
      const { data } = res;
      console.log("res", res);

      // setBoard(data.board);
      dispatcher(initialboard(data.board));
      console.log(board);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return <div>{Object.keys(board).length ? <TaskManagment /> : null}</div>;
};

export default Board;
