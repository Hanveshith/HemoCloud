import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import data from "../../assets/data.json";
import axios from "../Api";
import BanksSearch from "./BanksSearch";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BecomeDonor = () => {
    const { handle } = useParams();
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const [firstName, setfirstName] = useState("");
    const [blood, setBlood] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [bank, setBank] = useState("");

    useEffect(() => {
        setfirstName(user.firstName);
        setBlood(user.bloodGroup);
    }, []);

    const becomeDonor = () => {
        const formData = {
            userId: user.id,
            bloodBankId: bank
        }
        axios.post("/user/become-donor", formData, { withCredentials: true }).then((r) => {
            alert("Donor request sent successfully");
            navigate("/user/profile");
        }).catch((e) => {
            alert("Something went wrong");
        });
    };

    const fetchGeo = async () => {
        await navigator.geolocation.getCurrentPosition((p) => {
            console.log(p.coords.latitude, p.coords.longitude);
            setLatitude(p.coords.latitude);
            setLongitude(p.coords.longitude);
        }, () => {
            alert("Please allow location access");
            setLatitude(0);
            setLongitude(0);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });

    };

    useEffect(() => {
        fetchGeo().then(({ latitude, longitude }) => {
            console.log(latitude, longitude);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div className="flex flex-col w-full items-center">
            <div className="w-1/2 p-4">
                <div className="text-2xl font-bold text-blood">Become a Donor</div>
                <div className="flex flex-col">
                    <div className="flex flex-col my-2">
                        <label for="name" className="font-semibold">Name:</label>
                        <input disabled type="text" id="name" value={firstName} onChange={(e) => setfirstName(e.target.value)} className="p-2 border border-silver rounded" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label  for="blood" className="font-semibold">Blood Group:</label>
                        <input disabled type="text" id="blood" value={blood} onChange={(e) => setBlood(e.target.value)} className="p-2 border border-silver rounded" />
                    </div>
                    <BanksSearch latitude={latitude} handle={handle} user={user} longitude={longitude} setBank={setBank} />
                    <div className="flex justify-center my-2">
                        <button onClick={becomeDonor} className="bg-blood text-white p-2 rounded">Become Donor</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeDonor;