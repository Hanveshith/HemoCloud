import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Temp = (props) => {
    return (
        <>
            <i className={`fa-solid ${props.icon}`}></i>&nbsp;&nbsp;&nbsp; {props.title}
        </>
    )
};

const UserNav = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const s1 = "px-9 ml-2 mt-1 py-2 text-white-400 font-semibold text-lg rounded-md shadow-sm bg-red  hover:drop-shadow-md hover:opacity-80";

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center md:hidden">
                <div className="text-xl font-bold">Menu</div>
                <button
                    className="text-xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
            <div className={`flex-col md:flex-row ${menuOpen ? 'flex' : 'hidden'} md:flex justify-around items-center`}>
                {props.data.map((e, index) => (
                    <Link key={index} to={e.to}  className={s1}>
                        <Temp  icon={e.icon} title={e.title} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default UserNav;
