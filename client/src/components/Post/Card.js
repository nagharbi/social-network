import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FollowHandler from '../Profil/FollowHandler';
import { dateParser } from '../Utils';
import env from "react-dotenv";
import DeleteCard from './DeleteCard';
import UserContext from '../UserContext';
import LikeButton from './LikeButton';
import CardComments from './CardComments';
import { updatePost } from '../../actions/post';

const Card = ({ post }) => {
    const [isUpdated, setIsUpdated] = useState(false);
    const [message, setMessage] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const [ currentUser, ] = useContext(UserContext);
    const dispatch = useDispatch();

    const handleUpdatePost = () => {
        if (message) {
            dispatch(updatePost(post._id, message));
        }
        setIsUpdated(false);
    };

    return (
        <li className="card-container" key={post._id}>
            {usersData.length <= 0 ? (
                <i className="fas fa-spinner fa-spin"></i>
            ): (
                <>
                    <div className="card-left">
                        <img alt="poster-pic" src={env.API_BASE_URL + usersData.filter((user) => user._id === post.userId)[0]['picture']} />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>{usersData?.filter((user) => user._id === post?.userId)[0]['username']}</h3>
                                {post.userId !== currentUser?.user?.userId && (
                                    <FollowHandler followId={post.userId} type={"card"} />
                                )}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {!isUpdated && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea defaultValue={post.message} onChange={(e) => setMessage(e.target.value)}/>
                                <div className="button-container">
                                    <button className="btn" onClick={handleUpdatePost}>Valider modification</button>
                                </div>
                            </div>
                        )}
                        {post.picture && (
                            <img src={env.API_BASE_URL + post.picture} alt="card-pic" className="card-pic"/>
                        )}
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            ></iframe>
                        )}
                        {currentUser?.user?.userId === post.userId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit" />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img
                                    onClick={() => setShowComments(!showComments)}
                                    src="./img/icons/message1.svg"
                                    alt="comment"
                                />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    );
}

export default Card;