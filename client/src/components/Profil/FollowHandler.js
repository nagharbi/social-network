import React, { useContext, useState } from 'react';
import UserContext from '../UserContext';

const FollowHandler = ({ followId, type }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [currentUser] = useContext(UserContext);

    const handleFollow = () => {
        setIsFollowed(true);
    }

    const handleUnfollow = () => {
        setIsFollowed(false);
    }

    return (
        <>
            {isFollowed && currentUser?.user && (
                <span onClick={handleUnfollow}>
                    {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
                    {type === "card" && <img src="./img/icons/checked.svg" alt="checked"/>}
                </span>
            )}
            {!isFollowed && currentUser?.user && (
                <span onClick={handleFollow}>
                    {type === "suggestion" && <button className="follow-btn">Suivre</button>}
                    {type === "card" && <img src="./img/icons/check.svg" alt="check"/>}
                </span>
            )}
        </>
    );
};

export default FollowHandler;
