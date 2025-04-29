import React, { useState, useEffect } from 'react';
import axios from "../Api";

const Stock = (props) => {
    const [data, setData] = useState([]);
    const [group, setGroup] = useState('');
    const [totalQuantity, setTotalQuantity] = useState('');
    const [bestbefore, setBestBefore] = useState('');
    const [editId, setEditId] = useState(null);

    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    useEffect(() => {
        axios.get(`/bank/fetch-blood-collection/${props.id}`).then((res) => {
            if (res.data) {
                setData(res.data);
            }
        }).catch(() => { alert("Something went wrong") });
    }, []);

    const addOrUpdateBloodGroup = () => {
        const formData = {
            bloodBankId: props.id,
            group,
            totalQuantity,
            bestbefore
        };

        if (editId) {
            axios.put(`/bank/update-blood-collection/${editId}`, formData)
                .then((r) => {
                    if (Array.isArray(r.data)) {
                        setData(r.data);
                    } else {
                        setData([r.data]);
                    }
                    resetForm();
                })
                .catch(() => alert("Something went wrong"));
        } else {
            axios.post("/bank/create-blood-collection", formData, { withCredentials: true })
                .then((r) => {
                    if (Array.isArray(r.data)) {
                        setData(r.data);
                    } else {
                        setData([r.data]);
                    }
                    resetForm();
                })
                .catch(() => alert("Something went wrong"));
        }
    };

    const editBloodGroup = (group) => {
        const selectedGroup = data.find(item => item.group === group);
        console.log(selectedGroup);
        if (selectedGroup) {
            setGroup(selectedGroup.group);
            setTotalQuantity(selectedGroup.totalQuantity);
        setBestBefore(new Date(selectedGroup.bestbefore).toISOString().split('T')[0]);
            setEditId(selectedGroup.id); // Assuming each group has a unique _id
        }
    };

    const deleteBloodGroup = (groupId) => {
        axios.delete(`/bank/delete-blood-collection/${groupId}`).then((r) => {
            console.log(r.data);
            setData(r.data);
        }).catch(() => { alert("Something went wrong") });
    };

    const resetForm = () => {
        setGroup('');
        setTotalQuantity('');
        setBestBefore('');
        setEditId(null);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-red-700 mb-8">Blood Stock Management</h1>
            <div className="flex flex-wrap justify-center gap-8">
                {bloodGroups.map((bg) => {
                    const stockItem = Object.values(data).find(item => item.group === bg);
                    return (
                        <div className={`h-48 w-48 flex flex-col justify-between items-center text-white rounded-xl shadow-lg p-4 transition-transform hover:scale-105 ${stockItem ? 'bg-red-500' : 'bg-gray-400'}`} key={bg}>
                            <code className="text-2xl font-bold bg-white text-red-600 px-3 py-2 rounded-md">{bg}</code>
                            <p className="font-bold text-lg mt-2">{stockItem ? `${stockItem.totalQuantity} mL` : "None"}</p>
                            <p className="text-sm mt-1">{stockItem ? `Use Before: ${new Date(stockItem.bestbefore).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}` : "No Stock"}</p>
                            {stockItem && (
                                <div className='flex gap-2 mt-3'>
                                    <button className='bg-green/80 hover:bg-green text-white px-3 py-1 rounded-lg transition-all' onClick={() => editBloodGroup(stockItem.group)}>Edit</button>
                                    <button className='bg-red/80 hover:bg-red text-white px-3 py-1 rounded-lg transition-all' onClick={() => deleteBloodGroup(stockItem.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="mt-12 bg-white p-8 shadow-md rounded-lg max-w-lg mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">{editId ? "Edit Blood Group" : "Add Blood Group"}</h2>
                <div className="flex flex-col gap-6">
                    <select className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" value={group} onChange={(e) => setGroup(e.target.value)}>
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                    <input className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" type="text" placeholder="Total Quantity (mL)" value={totalQuantity} onChange={(e) => setTotalQuantity(e.target.value)} />
                    <input className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" type="date" value={bestbefore} onChange={(e) => setBestBefore(e.target.value)} />
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all" onClick={addOrUpdateBloodGroup}>{editId ? "Update Blood Group" : "Add Blood Group"}</button>
                    {editId && <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all" onClick={resetForm}>Cancel</button>}
                </div>
            </div>
        </div>
    );
}

export default Stock;