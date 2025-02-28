import React, { useState, useEffect } from "react";
import axios from "../Api";

const DonorRequests = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("/bank/fetch-donors-to-accept")
            .then((r) => {
                setData(r.data);  // Ensure the correct structure is stored
            })
            .catch(() => {
                alert("Something went wrong");
            });
    }, []);

    const handleAccept = (id) => {
        axios
            .put(`/bank/accept-donor/${id}`)
            .then(() => {
                setData((prevData) =>
                    prevData.map((d) =>
                        d.id === id ? { ...d, donor: { ...d.donor, status: true } } : d
                    )
                );
            })
            .catch(() => {
                alert("Something went wrong");
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white p-6">
            <h1 className="text-3xl font-bold text-red-600 mb-6">
                Donor Requests
            </h1>

            {data.length === 0 ? (
                <p className="text-gray-600 text-lg">No donor requests available</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map(({ id, donor, bloodGroup }) => (
                        <div
                            key={id}
                            className="bg-red-600 text-white shadow-lg rounded-xl p-6 w-72 flex flex-col items-center"
                        >
                            <p className="text-lg font-semibold">
                                {donor.firstName} {donor.lastName}
                            </p>
                            <p className="text-sm font-light">{donor.email}</p>
                            <p className="text-sm font-medium">📞 {donor.phone}</p>
                            <p className="text-sm font-medium">
                                Blood Group: <span className="font-bold">{bloodGroup}</span>
                            </p>
                            <p className="text-sm font-medium">Sex: {donor.sex.trim()}</p>

                            <button
                                onClick={() => handleAccept(id)}
                                disabled={donor.status}
                                className={`mt-4 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                                    donor.status
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-500 hover:text-white"
                                }`}
                            >
                                {donor.status ? "Accepted" : "Accept"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonorRequests;
