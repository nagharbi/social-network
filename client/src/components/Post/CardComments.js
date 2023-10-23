import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserContext from '../UserContext';
import env from "react-dotenv";
import FollowHandler from '../Profil/FollowHandler';
import { timestampParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';
import { addComment } from '../../actions/post';

const CardComments = ({ post }) => {
    const [text, setText] = useState("");
    const [currentUser] = useContext(UserContext);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(addComment(post._id, { text }));
            setText('');
        }
    };

    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    <div
                        key={comment._id}
                        className={comment.userId === currentUser.user?.userId ? "comment-container client" : "comment-container"}
                    >
                        <div className="left-part">
                            <img alt="commenter-pic" src={env.API_BASE_URL + usersData.filter((user) => user._id === comment.userId)[0]['picture']} />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.username}</h3>
                                    {comment.userId !== currentUser.user?.userId && (
                                        <FollowHandler followId={comment.userId} type={"card"} />
                                    )}
                                </div>
                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id} />
                        </div>
                    </div>
                );
            })}
            {currentUser.user && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Laisser un commentaire" />
                    <br />
                    <input type="submit" value="Envoyer" />
                </form>
            )}
        </div>
    )
};

export default CardComments;