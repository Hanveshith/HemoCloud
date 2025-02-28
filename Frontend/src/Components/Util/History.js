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
    console.log(props.donorId)
    useEffect(() => {
        if (props.handle == "donations") {
            axios.get(`/u/donor/donation-appointments/${props.donorId}`, { withCredentials: true }).then((r) => {
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
    }, [props.handle, props.donorId, props.user, props.id]);

    useEffect(() => {
        if (id != -1) {
            data[id].status = newStat;
        }
    }, [id]);

    console.log(data)
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
                                <td className='border underline decoration-dotted underline-offset-4 cursor-pointer p-3' onClick={() => setPopup(i)}>{props.handle == "donations" ? e.userId.name : e.name} Hanveshith</td>
                                <td className='border p-3'>{props.handle == "donations" ? e.userId.age : e.age} 21</td>
                                <td className='border p-3'>{props.handle == "donations" ? e.userId.bloodGroup : e.bloodGroup} AB+</td>
                                {/* <td className='border p-3'>{
                                    props.handle == "donations" ?
                                        e.userId.gender[0].toUpperCase() + e.userId.gender.substr(1,) :
                                        e.gender[0].toUpperCase() + e.gender.substr(1,)
                                }</td> */}
                                <td className='border p-3'>M</td>
                                <td className='border p-3'>1</td>
                                <td className='border p-3'>{props.handle == "donations" ? (e.disease ? e.disease : "---") : (e.reason ? e.reason : "---")}</td>
                                <td className='border p-3'>{(() => {
                                    let date = e.date.split(" ");
                                    return <>
                                        {date[2]}<br />
                                        <code><small>{date[0] + date[1]}</small></code>
                                    </>
                                })()}</td>
                                <td className='border p-3'>
                                    <Status status={status == "All" ? e.status : status} id={e.id} i={i} setId={setId} units={e.quantity} bloodGroup={props.handle == "donations" ? e.userId.bloodGroup : e.group} setStatus={setnewStat} handle={props.handle} />
                                </td>
                            </tr> : <tr className={status == "All" ? "" : status != e.status ? "hidden" : ""}>
                                <td className='border p-3'>{e.quantity}</td>
                                {/* <td className='border p-3'>{props.handle == "donations" ? (e.disease ? e.disease : "---") : (e.reason ? e.reason : "---")}</td> */}
                                <td className='border p-3'>
                                    {e.dateTime ? new Date(e.dateTime).toLocaleString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : 'N/A'}
                                </td>
                                <td className='border p-3 cursor-pointer underline decoration-dotted underline-offset-4' onClick={() => setPopup(i)}>view</td>
                                <td className='border p-3'><span className={(e.status == false ? "border-metal text-metal" : (e.status == true ? "border-yellowX text-yellowX " : (e.rejected == false ? "border-red text-red" : "border-green text-green"))) + ' border-2 px-4 py-2 rounded-xl hover:shadow-md'}>{(e.status == false ? "Pending" : "Accepted")}</span></td>
                                <td className='border p-3'>
                                    <button className='border-2 px-2 py-2 bg-red hover:bg-red/70 rounded-xl hover:shadow-md' onClick={() => {
                                        axios.delete(`/user/delete-blood-request/${e.id}`, { withCredentials: true }).then((r) => {
                                            alert("Deleted");
                                            window.location.reload();
                                        }).catch((e) => {
                                            alert("Something went wrong");
                                        });
                                    }}>Cancel</button>
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