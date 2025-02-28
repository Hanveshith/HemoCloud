import React from 'react'
import mapboxgl from "mapbox-gl";
import { useEffect } from 'react';
import axios from "../Api"

const Popup = (props) => {
    const [data, setData] = React.useState(null);
    console.log(props.data);
    useEffect(() => {
        axios.get(`/user/fetch-blood-bankdetails/${props.data}`).then((r) => {
            setData(r.data);
        }).catch((e) => {
            alert("Something went wrong");
        });
    }, [props.popup]);
    console.log(data);
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA';

    return (
        <div>
            {
                props.popup !== -1 && <div className="popup h-[150%] overflow-scroll">
                    <div className='popup_inner rounded-lg p-7 overflow-y-scroll'>
                        <div>
                            <h1 className='text-2xl font-bold inline-block'>
                                {props.handle} Details
                            </h1>
                            <i onClick={() => props.setPopup(-1)} className="fa-solid fa-circle-xmark text-blood fa-xl float-right cursor-pointer hover:opacity-80"></i>
                        </div><br />
                        <table className='w-full'>
                            {
                                data && <>
                                    {
                                        Object.keys(data).map((e) => {
                                            return (
                                                e !== "_id" && e !== "longitude" && e !== "latitude" && <tr className='border' key={e}>
                                                    <td className='font-bold p-4 border'>{e[0].toUpperCase() + e.substr(1,)}</td>
                                                    <td className='p-2'>{data[e] ? data[e] : "---"}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {data.Longitude && <tr className='border'>
                                        <td className='font-bold p-4 border'>Location</td>
                                        <td className='p-2'>
                                            <div id="map" className="w-full h-[200px]"></div>
                                            {
                                                (() => {
                                                    setTimeout(() => {
                                                        new mapboxgl.Marker().setLngLat([data.Longitude, data.latitude]).addTo(new mapboxgl.Map({
                                                            container: 'map', style: 'mapbox://styles/mapbox/streets-v12',
                                                            center: [data.Longitude, data.latitude], zoom: 10.7
                                                        }));
                                                    }, 100);
                                                    return <></>;
                                                })()
                                            }
                                        </td>
                                    </tr>}
                                </>
                            }
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}

export default Popup