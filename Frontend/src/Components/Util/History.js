import React, { useState, useEffect, useContext } from 'react'
import Popup from './Popup'
import axios from "../Api"
import Status from './Status'


const History = (props) => {
    const [popup, setPopup] = useState(-1);
    const s1 =
        "bg-white-900 mx-3 mt-5 text-center h-max rounded-md text-base font-medium";
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("All");
    const choices = ["All", 'Pending', 'Approved', 'Denied', props.handle == "donations" ? 'Donated' : "Completed"];
    const [id, setId] = useState(-1);
    const [newStat, setnewStat] = useState("");
    useEffect(() => {
        console.log(props)
        if (props.handle == "donations" && props.user == "user") {
            axios.get(`/u/donor/donation-appointments/${props.donorId}`, { withCredentials: true }).then((r) => {
                setData(r.data);
            }).catch((e) => {
                alert("Something went wrong")
            });
        }
        else if (props.handle == "donations" && props.user == "bank") {
            axios.get(`/bank/fetch-donating-appointments/${props.id}`, { withCredentials: true }).then((r) => {
                console.log(r.data)
                setData(r.data);
            }).catch((e) => {
                alert("Something went wrong")
            });
        } else {
            axios.get(`/${props.user}/fetch-blood-requests/${props.id}`, { withCredentials: true }).then((r) => {
                setData(r.data);
            }).catch((e) => {
                alert("Something went wrong")
            });
        }
    }, [props.handle, props.donorId, props.user, props.id, status]);

    useEffect(() => {
        if (id != -1) {
            data[id].status = newStat;
        }
    }, [id]);

    console.log("data", data)
    return (
        <div className={s1}>
            <div className='text-right'>
                <span className='text-lg'>Status:</span> <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}
                    className={'border-2 px-2 mb-2 rounded-xl hover:shadow-md cursor-pointer'}
                >
                    {
                        choices.map((e) =>
                            <option value={e} selected={status === e}>{e}</option>
                        )
                    }
                </select>
            </div>
            <table className='rounded-md'>
                <thead>
                    {props.user == "bank" ? <tr>
                        <th className='border p-4 px-4'>{props.handle == "donations" ? "Donor" : "Patient"} Name</th>
                        <th className='border p-2 px-4'>Age</th>
                        <th className='border p-4 px-4'>Blood Group</th>
                        <th className='border p-4 px-4'>Gender</th>
                        <th className='border p-4 px-4'>Units(mL)</th>
                        <th className='border p-4 px-4'>Date</th>
                        <th className='border p-4 px-4'>Status</th>
                        <th className='border p-4 px-4'>Cancel</th>
                    </tr> : <tr>
                        <th className='border p-4 px-7'>Units(mL)</th>
                        <th className='border p-2'>Date</th>
                        <th className='border p-2'>Blood Bank</th>
                        <th className='border p-2'>Status</th>
                        <th className='border p-2'>Cancel</th>
                    </tr>}
                </thead>
                <tbody>
                    {
                        data.map((e, i) =>
                            props.user == "bank" ? <tr className={status == "All" ? "" : status != e.status ? "hidden" : ""}>
                                <td className='border underline decoration-dotted underline-offset-4 cursor-pointer p-3' onClick={() => setPopup(i)}>{props.handle == "donations" ? e.name : e.userName}</td>
                                <td className='border p-3'>{props.handle == "donations" ? e.donarAge : e.useAge} 21</td>
                                <td className='border p-3'>{props.handle == "donations" ? e.bloodGroup : e.group}</td>
                                <td className='border p-3'>{e.donorGender} M</td>
                                <td className='border p-3'>{e.quantity}</td>
                                <td className='border p-3'>
                                    {e.date ? new Date(e.date).toLocaleString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : 'N/A'}
                                </td>
                                <td className='border p-3'>
                                    <Status
                                        status={status === "All" ? e.status : status}
                                        id={e.id}
                                        i={i}
                                        setId={setId}
                                        units={e.quantity}
                                        bloodGroup={props.handle === "donations" ? e.bloodGroup : e.group}
                                        bloodBankId={e.bloodBankId}
                                        donorId={e.donorId ? e.donorId : 0}
                                        setStatus={setnewStat}
                                        handle={props.handle}
                                        approved={e.approved}
                                    />
                                </td>
                                <td className='border p-3'>
                                    <button
                                        className='border-2 px-2 py-2 bg-red hover:bg-red/70 rounded-xl hover:shadow-md'
                                        onClick={() => {
                                            if (props.handle == "requests") {
                                                axios.delete(`/user/delete-blood-request/${e.id}`, { withCredentials: true }).then((r) => {
                                                    alert("Deleted");
                                                    window.location.reload();
                                                }).catch((e) => {
                                                    alert("Something went wrong");
                                                });
                                            }
                                            else if (props.handle == "donations") {
                                                axios.delete(`/u/donor/delete-donation-appointment/${e.id}`, { withCredentials: true }).then((r) => {
                                                    alert("Deleted");
                                                    window.location.reload();
                                                }).catch((e) => {
                                                    alert("Something went wrong");
                                                });
                                            }
                                        }}
                                        disabled={e.approved || e.status === true}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr> : <tr className={status === "All" ? "" : status !== e.status ? "hidden" : ""}>
                                <td className='border p-3'>{e.quantity}</td>
                                <td className='border p-3'>
                                    {e.date ? new Date(e.date).toLocaleString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : 'N/A'}
                                </td>
                                <td className='border p-3 cursor-pointer underline decoration-dotted underline-offset-4' onClick={() => setPopup(i)}>view</td>
                                <td className='border p-3'>
                                    <span
                                        className={
                                            (e.status === false && e.approved === true
                                                ? "border-yellowX text-yellowX"
                                                : e.status === false
                                                    ? "border-metal text-metal"
                                                    : e.rejected === true
                                                        ? "border-red text-red"
                                                        : "border-green text-green") +
                                            " border-2 px-4 py-2 rounded-xl hover:shadow-md"
                                        }
                                    >
                                        {e.status === false && e.approved === true
                                            ? "Approved"
                                            : e.status === false
                                                ? "Pending"
                                                : e.rejected === true
                                                    ? "Rejected"
                                                    : "Accepted"}
                                    </span>
                                </td>
                                <td className='border p-3'>
                                    <button
                                        className='border-2 px-2 py-2 bg-red hover:bg-red/70 rounded-xl hover:shadow-md'
                                        onClick={() => {
                                            if (props.handle == "requests") {
                                                axios.delete(`/user/delete-blood-request/${e.id}`, { withCredentials: true }).then((r) => {
                                                    alert("Deleted");
                                                    window.location.reload();
                                                }).catch((e) => {
                                                    alert("Something went wrong");
                                                });
                                            }
                                            else if (props.handle == "donations") {
                                                axios.delete(`/u/donor/delete-donation-appointment/${e.id}`, { withCredentials: true }).then((r) => {
                                                    alert("Deleted");
                                                    window.location.reload();
                                                }).catch((e) => {
                                                    alert("Something went wrong");
                                                });
                                            }
                                        }}
                                        disabled={e.approved || e.status === true}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Popup popup={popup} setPopup={setPopup} data={popup == -1 ? [] : props.user == "bank" ? data[popup].donorId : data[popup].bloodBankId} handle={props.user == "bank" ? "user" : "Blood Bank"} />
        </div>
    )
}

export default History