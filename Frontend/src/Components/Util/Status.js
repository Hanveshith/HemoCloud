import React, { useState } from 'react'
import axios from "../Api"

const Status = (props) => {
    const [status, setStatus] = useState(props.status);
    console.log(props)
    const choices = ['Pending', 'Approved', 'Denied', (props.handle == "donations" ? 'Donated' : "Completed")];
    return (
        <div >
            <select name="status" value={props.approved ? "Approved" : "Pending"} id="status" onChange={async (k) => {
                if (k.target.value === "Donated") {
                    await axios.post(`/bank/create-donation`, { id:props.id,bloodGroup: props.bloodGroup, quantity: props.units, bloodBankId: props.bloodBankId, donorId: props.donorId })
                        .then(async (response) => {
                            alert("Stock Updated");
                            await axios.get(`/bank/fetch-blood-requests/${props.bloodBankId}`, { id: props.id, status: false })
                                .then(async (response) => {
                                   
                                    setStatus(k.target.value);
                                    props.setId(props.i);
                                    props.setStatus(k.target.value);
                                }, (error) => {
                                    alert("Something went wrong");
                                });
                        }, (error) => {
                            alert("Something went wrong");
                        });
                } else if (k.target.value === "Completed") {
                    await axios.put(`/bank/accept-blood-request`, { bloodBankId: props.bloodBankId,requestId: props.id ,bloodGroup: props.bloodGroup, units: props.units })
                        .then(async (response) => {
                            alert("Stock Updated");
                            await axios.get(`/bank/fetch-blood-requests/${props.bloodBankId}`, { id: props.id, status: false })
                                .then(async (response) => {
                                    setStatus(k.target.value);
                                    props.setId(props.i);
                                    props.setStatus(k.target.value);
                                }, (error) => {
                                    alert("Something went wrong");
                                });
                        }, (e) => {
                            alert(e.request.status == 404 ? "Not Enough Blood or No Blood Group Available" : "Something went wrong");
                        });
                } else if (k.target.value === "Approved" && props.handle == "requests") {
                    await axios.put(`/bank/approve-blood-request`, { bloodBankId: props.bloodBankId,requestId: props.id ,bloodGroup: props.bloodGroup, units: props.units })
                        .then(async (response) => {
                            alert("Stock Updated");
                            await axios.get(`/bank/fetch-blood-requests/${props.bloodBankId}`, { id: props.id, status: false })
                                .then(async (response) => {
                                    console.log(k.target.value, props.i)
                                    setStatus(k.target.value);
                                    props.setId(props.i);
                                    props.setStatus(k.target.value);
                                }, (error) => {
                                    alert("Something went wrong");
                                });
                        }, (e) => {
                            alert(e.request.status == 404 ? "Not Enough Blood or No Blood Group Available" : "Something went wrong");
                        });
                } else if (k.target.value === "Approved" && props.handle == "donations") {
                    await axios.put(`/bank/approve-donation/${props.id}`)
                        .then(async (response) => {
                            alert("Stock Updated");
                            await axios.get(`/bank/fetch-blood-requests/${props.bloodBankId}`, { id: props.id, status: false })
                                .then(async (response) => {
                                    setStatus(k.target.value);
                                    props.setId(props.i);
                                    props.setStatus(k.target.value);
                                }, (error) => {
                                    alert("Something went wrong");
                                });
                        }, (e) => {
                            alert(e.request.status == 404 ? "Not Enough Blood or No Blood Group Available" : "Something went wrong");
                        });
                }
                else {
                    await axios.get(`/bank/fetch-blood-requests/${props.bloodBankId}`, { id: props.id, status: false })
                        .then(async (response) => {
                            setStatus(k.target.value);
                            props.setId(props.i);
                            props.setStatus(k.target.value);
                        }, (error) => {
                            alert("Something went wrong");
                        });
                }
            }}
                disabled={status == "Denied" || status == "Donated" || status == "Completed"}
                className={(status == "Pending" ? "border-metal text-metal" : (status == "Approved" ? "border-yellowX text-yellowX " : (status == "Denied" ? "border-red text-red" : "border-green text-green"))) + ' border-2 px-4 py-2 rounded-xl hover:shadow-md cursor-pointer'}
            >
                {
                    choices.map((e) =>
                        <option value={e} selected={status === e}>{e}</option>
                    )
                }
            </select>
        </div >
    )
}

export default Status