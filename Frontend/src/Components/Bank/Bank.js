import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import UserNav from '../User/UserNav';
import EditProfile from './EditProfile';
import History from '../Util/History';
import RegisterBank from './RegisterBank';
import Camps from './Camps';
import Stock from './Stock';
import DonorRequests from './DonorRequests';


const Bank = () => {
    const { user } = useContext(AuthContext);
    const { handle } = useParams();
    console.log(handle);

    const nav = [
        { to: "/bank/profile", icon: "fa-user", title: "Bank Profile" },
        { to: "/bank/stock", icon: "fa-layer-group", title: "Blood Stock" },
        { to: "/bank/donations", icon: "fa-hand-holding-medical", title: "Donations" },
        { to: "/bank/requests", icon: "fa-clock-rotate-left", title: "Requests" },
        { to: "/bank/camps", icon: "fa-clock-rotate-left", title: "Blood Donation Camps" },
        { to: "/bank/registerBank", icon: "fa-rotate", title: "Register new Camp" },
        { to: "/bank/donarrequests", icon: "fa-clock-rotate-left", title: "Donor Requests" },

    ];

    return (
        <div className="flex flex-col w-full">
            <UserNav data={nav} />
            <div className="w-full flex justify-center p-4">
                {handle === "profile" && <EditProfile />}
                {handle === "stock" && <Stock id={user.id}/>}
                {handle === "donations" && <History user="bank" id={user.id} handle={handle} />}
                {handle === "requests" && <History user="bank" id={user.id} handle={handle} />}
                {handle === "camps" && <Camps />}
                {handle === "registerBank" && <RegisterBank todo="register" bank={user} />}
                {handle === "donarrequests" && <DonorRequests handle={handle} />}

            </div>
        </div>
    );
};

export default Bank;
