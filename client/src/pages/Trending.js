import React, { useContext } from "react";
import { useSelector } from "react-redux";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
import FriendsHint from "../components/Profil/FriendsHint";
import Trends from "../components/Trends";
import UserContext from "../components/UserContext";

const Trending = () => {
    const [currentUser] = useContext(UserContext);
    const trendingList = useSelector((state) => state.trendingReducer);

    return (
        <div className="trending-page">
            <LeftNav />
            <div className="main">
                <ul>
                    {Object.keys(trendingList).length > 0 && trendingList.map((post) => <Card post={post} key={post._id}/>)}
                </ul>
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <Trends />
                    {currentUser?.user && <FriendsHint />}
                </div>
            </div>
        </div>
    );
};

export default Trending;