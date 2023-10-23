import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post';
import Card from './Post/Card';
import { isEmpty } from './Utils';

const LIMIT = 5;

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [limit, setLimit] = useState(LIMIT);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    };

    useEffect(() => {
        console.log('useEffect Thread is called');
        if (loadPost) {
            dispatch(getPosts(limit));
            setLoadPost(false);
            setLimit(limit + LIMIT);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, limit]);

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) && posts.map(post => {
                    return <Card post={post} key={post._id} />;
                })}
            </ul>
        </div>
    );
};

export default Thread;
