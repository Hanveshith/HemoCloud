import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import data from "../../assets/data.json";
import axios from "../Api";
import BanksSearch from "./BanksSearch";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import mapboxgl from 'mapbox-gl';



const UserForm = () => {
    const { handle } = useParams();
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const [firstName, setfirstName] = useState("");
    const [units, setUnits] = useState(0);
    // const [date, setDate] = useState("");
    const [bank, setBank] = useState("");
    const [blood, setBlood] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("male");
    const [me, setMe] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [datetime, setDatetime] = useState(new Date());
    const [donorId, setDonorId] = useState(0);
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    useEffect(() => {
        if (handle == "donate") {
            setMe(true);
        }
    }, []);
    useEffect(() => {
        setfirstName(me ? user.firstName : "");
        setBlood(me ? bloodGroups.indexOf(user.bloodGroup) : 0);
        setAge(me ? user.age : 0)
        setGender(me ? user.gender : "male")
    }, [me]);

    

    const request = () => {
        const formData = {
            userId: user.id,
            bloodBankId: bank,
            group: bloodGroups[blood],
            age: age,
            gender: gender,
            quantity: units,
            currLocation_Lat: latitude,
            currLocation_Long: longitude
        };
        axios.post("/user/request-blood", formData, { withCredentials: true }).then((r) => {
            alert("Blood request sent successfully");
            navigate("/user/requests");
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


    const donate = () => {
        try {
            axios.get(`/u/donor/donor-status/${user.id}`,{ withCredentials: true }).then((r) => {
                setDonorId(r.id);
            }).catch((e) => {
                alert("Something went wrong");
            });
            const formData = {
                donorId: donorId,
                bloodBankId: bank,
                dateTime: datetime,
                quantity: units,
            };
            axios.post("/u/donor/create-donation-appointment", formData, { withCredentials: true }).then((r) => {
                alert("Donation request sent successfully");
                navigate("/user/donations");
            }).catch((e) => {
                alert("Something went wrong");
            });
        }
        catch (e) {
            alert("Something went wrong");
        }
    };
    return (
        <div className={`p-6 w-12/12`}>
            <form
                className="space-y-7"
                action=""
                onSubmit={(e) => { e.preventDefault(); if (bank == "") { alert("Select a blood bank"); return; } handle == "donate" ? donate() : request(); }}
            >
                <fieldset className="border border-solid border-gray-300 p-3">
                    <legend class="text-2xl font-bold">
                        &nbsp;{handle === "donate" ? "Donate Blood" : "Make Blood Request"} &nbsp;
                    </legend>
                    {handle == "request" && <legend align="right">
                        <input type="checkbox" id="me" value={me} onChange={(e) => setMe(!me)} />
                        <label for="me"> For me</label><br />
                    </legend>}
                    <p className=""></p>
                    <table className="w-full" cellPadding={10}>
                        <tr>
                            <td>
                                <label className="font-semibold leading-8">{handle == "request" && "Patient "}Name:<font color="red">*</font></label>
                                <input
                                    className="w-full p-3 text-md border border-silver rounded"
                                    type="text"
                                    placeholder="Enter your full name"
                                    required
                                    value={firstName}
                                    disabled={me || handle == "donate"}
                                    onChange={(e) => setfirstName(e.target.value)}
                                />
                            </td>
                            <td>
                                <label for="blood" className="font-semibold  leading-8">Blood Group:<font color="red">*</font></label>
                                <select name="blood"
                                    onChange={(e) => setBlood(e.target.value)}
                                    disabled={me || handle == "donate"}
                                    className="w-full p-3 text-md border border-silver rounded">
                                    {
                                        bloodGroups.map((e, i) => <option value={i} selected={blood === i}>{e}</option>)
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            {handle == "request" && <><td>
                                <label className="font-semibold  leading-8">Age:<font color="red">*</font></label>
                                <input
                                    className="w-full p-3 text-md border border-silver rounded"
                                    type="number"
                                    placeholder="Enter your age"
                                    required
                                    value={age}
                                    min={1}
                                    disabled={me}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </td><td><label for="gender" className="font-semibold  leading-8">Gender:<font color="red">*</font></label>
                                    <select name="gender" id="gender" disabled={me} onChange={(e) => setGender(e.target.value)} className="w-full p-3 text-md border border-silver rounded" >
                                        <option value="male" selected={gender === "male"}>Male</option>
                                        <option value="female" selected={gender === "female"}>Female</option>
                                    </select></td></>}
                        </tr>
                        <tr>

                        </tr>
                        <tr><td>
                            <label className="font-semibold leading-8">Units (in mL):<font color="red">*</font></label>
                            <input
                                className="w-full p-3 text-md border border-silver rounded"
                                type="number"
                                min={1}
                                max={350}
                                required
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
                            />
                        </td>
                            </tr>
                        <tr>
                            <td>
                                <label className="font-semibold leading-8">Date and Time:<font color="red">*</font></label>
                                <input
                                    className="w-full p-3 text-md border border-silver rounded"
                                    type="datetime-local"
                                    required
                                    value={datetime}
                                    onChange={(e) => setDatetime(e.target.value)}
                                />
                            </td>
                        </tr>
                    </table>
                    <BanksSearch latitude={latitude} handle={handle} user={user} longitude={longitude} setBank={setBank} />
                    <button
                        type="submit"
                        className="block mx-auto my-2 mt-4 w-4/12 px-9 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold"
                    >
                        Submit
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default UserForm