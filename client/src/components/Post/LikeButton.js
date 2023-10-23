import React, { useContext } from 'react';
import UserContext from '../UserContext';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from 'react-redux';
import { likePost, getAllPosts } from '../../actions/post';

const LikeButton = ({ post }) => {
    const [currentUser] = useContext(UserContext);
    const dispatch = useDispatch();

    const handleLike = (like) => {
        dispatch(likePost(post._id, { userId: currentUser?.user?.userId, like }));
        dispatch(getAllPosts());
    };

    return (
        <div className="like-container">
            {currentUser?.user === null && (
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup>
            )}
            {currentUser?.user?.userId && !post.usersLiked.includes(currentUser?.user?.userId) && (
                <img src="./img/icons/heart.svg" onClick={() => handleLike(true)} alt="like" />
            )}
            {currentUser?.user?.userId && post.usersLiked.includes(currentUser?.user?.userId) && (
                <img src="./img/icons/heart-filled.svg" onClick={() => handleLike(false)} alt="unlike" />
            )}
            <span>{post.usersLiked.length}</span>
        </div>
    );
};

export default LikeButton;