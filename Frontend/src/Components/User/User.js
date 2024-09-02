import React from 'react';
import UserNav from './UserNav';
import { useParams } from 'react-router-dom';
import EditProfile from './EditProfile';
import UserForm from './UserForm';
import History from '../Util/History';
import Camps from './Camps';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import BecomeDonor from './BecomeDonor';

const User = () => {
    const { handle } = useParams();
    const { user } = useContext(AuthContext);
    const nav = [
        { to: "/user/profile", icon: "fa-user", title: "My Profile" },
        { to: user.donorStatus == true ? "/user/donate" : "/user/become-donor", icon: "fa-hand-holding-medical", title: user.donorStatus == true ? "Donate Blood" : "Become a Donor"},
        { to: "/user/donations", icon: "fa-clock-rotate-left", title: "Donation History" },
        { to: "/user/camps", icon: "fa-location-dot", title: "Blood Donation Camps" },
        { to: "/user/request", icon: "fa-rotate", title: "Blood Request" },
        { to: "/user/requests", icon: "fa-clock-rotate-left", title: "Request History" }
    ];

    return (
        <div className="flex flex-col w-full">
            <UserNav data={nav} />
            <div className="w-full flex justify-center p-4">
                {handle === "profile" && <EditProfile />}
                {handle === "donate" && <UserForm />}
                {handle === "become-donor" && <BecomeDonor />}
                {handle === "request" && <UserForm />}
                {handle === "donations" && <History user="user" id={user.id} handle={handle} />}
                {handle === "requests" && <History user="user" id={user.id} handle={handle} />}
                {handle === "camps" && <Camps />}
            </div>
        </div>
    );
}

export default User;
