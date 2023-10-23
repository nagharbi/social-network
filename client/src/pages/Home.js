import React, { useContext, useEffect } from "react";
import NewPostForm from "../components/Post/NewPostForm";
import Auth from "../components/Auth";
import UserContext from "../components/UserContext";
import LeftNav from "../components/LeftNav";
import { useDispatch } from "react-redux";
import Thread from "../components/Thread";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";
import { getUser } from "../actions/user";

const Home = () => {
    const [ currentUser, ] = useContext(UserContext);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect Home is called');
        if (currentUser?.user) dispatch(getUser(currentUser?.user.userId));
    }, [currentUser, dispatch]);

    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    { currentUser?.user ? <NewPostForm /> : <Auth signin={true} /> }
                </div>
                <Thread />
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <div className="wrapper">
                        <Trends />
                        {currentUser?.user && <FriendsHint />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;