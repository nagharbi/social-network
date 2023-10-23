import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getTrends } from '../actions/trend';
import env from "react-dotenv";
import { isEmpty } from './Utils';

const Trends = () => {
    const posts = useSelector((state) => state.postsReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendingList = useSelector((state) => state.trendingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect Trends is called');
        if (Object.keys(posts).length > 0) {
            const trendingPosts = Object.keys(posts).map((i) => posts[i]);
            let sortedTrendingPosts = trendingPosts.sort((a, b) => b.usersLiked.length - a.usersLiked.length);
            sortedTrendingPosts.length = 3;
            dispatch(getTrends(sortedTrendingPosts));
        }
    }, [posts, dispatch]);

    return (
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink exact="true" to="/trending">
                <ul>
                    {trendingList.length && trendingList.map((post) => {
                        return (
                            <li key={post._id}>
                                <div>
                                    {post.picture && <img src={env.API_BASE_URL + post.picture} alt="post-pic" />}
                                    {isEmpty(post.picture) && (
                                        <img alt="profil-pic" src={env.API_BASE_URL + usersData.filter((user) => user._id === post.userId)[0]['picture']} />
                                    )}
                                </div>
                                <div className="trend-content">
                                    <p>{post.message}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </NavLink>
        </div>
    );
};

export default Trends;