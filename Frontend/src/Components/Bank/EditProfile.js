import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../Api";
import AuthContext from "../context/AuthContext";
import mapboxgl from "mapbox-gl";

const EditProfile = () => {
    const { handle } = useParams();
    const { getLoggedIn, user, role } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [edit, setEdit] = useState(true);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        setName(user.Name || "");
        setPhone(user.phone || "");
        setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
        setAddress(user.Address || "");
        setLatitude(user.latitude);
        setLongitude(user.Longitude);
    }, [user]);

    useEffect(() => {
        if (longitude === 0) return;
        mapboxgl.accessToken = 'pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [longitude, latitude],
            zoom: 10.7
        });
        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    }, [latitude, longitude]);

    const update = async () => {
        const formData = {
            Name: name,
            phone: phone,
            address: address,
            latitude: latitude,
            longitude: longitude,
        };

        await axios.put(`/bank`, formData)
            .then(async (response) => {
                setEdit(!edit);
                await getLoggedIn();
                alert("Blood Bank updated successfully");
            }, (error) => {
                alert("Something went wrong");
            });
    };

    const fetchGeo = async () => {
        if (latitude === user.latitude && longitude === user.longitude) return;
        await navigator.geolocation.getCurrentPosition((p) => {
            setLatitude(p.coords.latitude);
            setLongitude(p.coords.longitude);
        }, () => {
            alert("Please allow location access");
            setLatitude(user.latitude);
            setLongitude(user.Longitude);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    };

    return (
        <div className="p-4 sm:p-8">
            <section className="flex justify-center items-center">
                <form
                    className="space-y-4"
                    onSubmit={(e) => { e.preventDefault(); update(); }}
                >
                    <table className="w-full" cellPadding={15}>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <label className="font-semibold leading-8">Blood Bank Name:<font color="red">*</font></label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="text"
                                        required
                                        disabled={edit}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="font-semibold leading-8">Mobile:<font color="red">*</font></label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="number"
                                        placeholder="Enter your mobile"
                                        required
                                        disabled={edit}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <label className="font-semibold leading-8">Password:<font color="red">*</font></label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="password"
                                        placeholder="Enter your password"
                                        required
                                        disabled
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <label className="font-semibold leading-8">Address:</label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="text"
                                        placeholder="Enter your address"
                                        disabled={edit}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <label className="font-semibold leading-8">Location:<font color="red">*</font></label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <div id="map" className="w-full h-64"></div>
                                        </div>
                                        <div className="space-y-4">
                                            <input
                                                className="w-full p-3 text-md border border-silver rounded"
                                                type="number"
                                                step="0.01"
                                                placeholder="Latitude"
                                                disabled
                                                value={latitude}
                                                onChange={(e) => setLatitude(e.target.value)}
                                                required
                                            />
                                            <input
                                                className="w-full p-3 text-md border border-silver rounded"
                                                type="number"
                                                step="0.01"
                                                placeholder="Longitude"
                                                disabled
                                                value={longitude}
                                                onChange={(e) => setLongitude(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                disabled={edit}
                                                className="w-full bg-purple text-center text-white-900 rounded-lg mt-4 px-4 py-2"
                                                onClick={() => fetchGeo()}
                                            >
                                                Update Geocode
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setEdit(!edit)}
                                        className="bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold px-6 py-2"
                                    >
                                        {edit ? "Edit" : "Cancel"}
                                    </button>
                                    <button
                                        type="submit"
                                        className={`bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold px-6 py-2 ${edit && "hidden"}`}
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </section>
        </div>
    );
};

export default EditProfile;
