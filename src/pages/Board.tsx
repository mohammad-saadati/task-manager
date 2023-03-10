import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

const Board = () => {
  const [board, setBoard] = useState({});
  let { id } = useParams();

  const getData = useCallback(async () => {
    try {
      const url = `/boards/${id}`;
      const res = await api.get(url);
      const { data } = res;
      console.log("res", res);

      setBoard(data.board);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return <div></div>;
};

export default Board;
