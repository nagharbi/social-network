import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post';
import UserContext from '../UserContext';

const EditDeleteComment = ({comment, postId}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const [currentUser] = useContext(UserContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(editComment(postId, {commentId: comment._id, text}));
            setText("");
            setEdit(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
            dispatch(deleteComment(postId, {commentId: comment._id}));
            setEdit(false);
        }
    };

    useEffect(() => {
        const checkAuthor = () => {
            if (currentUser.user?.userId === comment.userId) {
                setIsAuthor(true);
            }
        };
        checkAuthor();
    }, [currentUser, comment.userId]);

    return (
        <div className="edit-comment">
            {isAuthor && !edit && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="edit-comment" />
                </span>
            )}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                    <br/>
                    <input type="text" name="text" defaultValue={comment.text} onChange={(e) => setText(e.target.value)} />
                    <br/>
                    <div className="btn">
                        <span onClick={handleDelete}>
                            <img src="./img/icons/trash.svg" alt="delete" />
                        </span>
                    </div>
                    <input type="submit" value="Valider modification" />
                </form>
            )}
        </div>
    )
};

export default EditDeleteComment;