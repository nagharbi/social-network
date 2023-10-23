import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserContext from '../UserContext';
import FollowHandler from './FollowHandler';
import env from "react-dotenv";

const FriendsHint = () => {
    const [isLoading, setIsloading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [ currentUser, ] = useContext(UserContext);
    const usersData = useSelector((state) => state.usersReducer);

    useEffect(() => {
        console.log('useEffect FriendsHint is called');
        const findSuggestions = () => {
            let users = [];
            usersData.map((user) => {
                if (user._id !== currentUser?.user?.userId && !user.followers.includes(currentUser?.user?.userId)) {
                    users.push({ userId: user._id, username: user.username, picture: user.picture });
                }
                return user;
            });
            users.sort(() => 0.5 - Math.random());
            if (window.innerHeight > 780) {
                users.length = 3;
            } else if (window.innerHeight > 720) {
                users.length = 2;
            } else if (window.innerHeight > 615) {
                users.length = 1;
            } else {
                users.length = 0;
            }
            setSuggestions(users);
        };

        if (playOnce) {
            findSuggestions();
            setIsloading(false);
            setPlayOnce(false);
        }
    }, [playOnce, usersData, currentUser?.user?.userId]);

    return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ? (
                <div className="icon">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <ul>
                    {suggestions && suggestions.map((user) => {
                        return (<li key={user.userId} className="user-hint">
                            <img src={env.API_BASE_URL + user.picture} alt="user-pic" />
                            <p>{user.username}</p>
                            <FollowHandler followId={user.userId} type={"suggestion"} />
                        </li>);
                    })}
                </ul>
            )}
        </div>
    );
};

export default FriendsHint;