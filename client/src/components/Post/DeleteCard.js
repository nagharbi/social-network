import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post";

const DeleteCard = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          dispatch(deletePost(id));
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteCard;
