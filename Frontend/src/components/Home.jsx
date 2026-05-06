import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ContainerContext } from '../Context/context'
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";


export const Home = () => {

    const { API_Connect, setoldData, searchData, authorized, access_token, setAuthorized } = useContext(ContainerContext)

    const url = useLocation();
    const navigate = useNavigate();

    const [HomeData, setHomeData] = useState([])
    let showonPage = url.pathname.startsWith("/post/search/") ? searchData : HomeData

    const [delete_log_ID, setdelete_log_ID] = useState({
        id: ''
    })

    const [delete_doc, setdelete_doc] = useState(false)


    useEffect(() => {
        const api_connect = async () => {
            try {
                let res = await fetch(`${API_Connect}/home`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!res.ok) console.log("Unable to connect HomeDataBase!");
                if (res.status === 401) {
                    navigate('/login')
                    localStorage.setItem(login_state, false)
                }

                let HomeData = await res.json();
                setAuthorized(true);
                setHomeData(HomeData);
            }
            catch (err) {
                console.error(`Error Occure in Backend Connection ${err}`)
            }
        }

        api_connect();


    }, [API_Connect, url.pathname])


    const delete_log = async () => {
        try {
            let res = await fetch(`${API_Connect}/delete/post`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(delete_log_ID)
            });

            if (!res.ok) throw Error("log not delete");

            let delete_res = await res.json();
            return delete_res;
        }
        catch (err) {
            console.error(`Error: ${err}`)
        }
        finally {
            setdelete_doc(false)
            setdelete_log_ID({ id: "" })
            window.location.reload()
        }
    };

    if (delete_doc) {
        // set(() => {
        delete_log();
        // }, 500);
    };


    const handleRoute = () => {
        if (authorized) {
            navigate(`/update/log`)
        }
        else {
            navigate("/login")
        }
    }

    return (
        <>
            <div className={`card-container`}>
                {showonPage.map((row) => (
                    <div key={row.id} className="service-card">
                        {/* Card Header: Name and ID */}
                        <div className="card-header">
                            <div className="editBox">
                                <h3 className="user-name">{row.Name}</h3>
                            </div>
                            <div className='btn-holder'>
                                <MdModeEdit size='25' onClick={() => (setoldData(row), handleRoute('edit'))} />
                                <FaTrashAlt size='20' color='#ff4343' name='id' value={delete_log_ID} onClick={() => (setdelete_doc(true), setdelete_log_ID({ id: row.id }))} />
                            </div>
                        </div>

                        {/* Card Body: All other details */}
                        <div className="card-body">
                            <div className="data-row">
                                <span className="label">Contact</span>
                                <a className="value" href={`tel:${row.Contact}`}>{row.Contact}</a>
                            </div>
                            <div className="data-row">
                                <span className="label">Service</span>
                                <span className="value">{row.Service}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Service Type</span>
                                <span className="value">{row.Service_Type}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Created At</span>
                                <span className="value">{row.Created_At}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Application ID</span>
                                <span className="value">{row.Application_ID}</span>
                            </div>

                            {/* Financials grouped together visually */}
                            <div className="financials">
                                <div className="data-row">
                                    <span className="label">Govt Fee</span>
                                    <span className="value">₹{row.Govt_Fee}</span>
                                </div>
                                <div className="data-row">
                                    <span className="label">Service Fee</span>
                                    <span className="value">₹{row.Service_Charge}</span>
                                </div>
                                <div className="data-row total-row">
                                    <span className="label">Total Fee</span>
                                    <span className="value">₹{row.Total_Amount}</span>
                                </div>
                                <div className="data-row due-row">
                                    <span className="label">Due Amount</span>
                                    <span className="value">₹{row.Due}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

