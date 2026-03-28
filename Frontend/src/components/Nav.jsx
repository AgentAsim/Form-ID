import React from 'react'
import { ImCancelCircle } from "react-icons/im";
import { RiAddLargeLine } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { useContext, useState, useEffect } from 'react';
import { ContainerContext } from '../Context/context';



export const Nav = () => {

    const { API_Connect, Show, setShow, isUpdate, setisUpdate, setupdateForm } = useContext(ContainerContext)

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // };

    // useEffect(() => {

    //     try {
    //         const isIDvalid = async (getted_ID) => {
    //             getted_ID.preventDefault();

    //             // Getting update ID response
    //             let res = await fetch(`${API_Connect}/getUpdateID`, {
    //                 method: "POST",
    //                 header: {
    //                     "content-type": "application/json"
    //                 },
    //                 body: JSON.stringify(getted_ID)
    //             })
    //             if (!res.ok) throw Error("ID for Update Not found!")

    //             let update_id = await res.json();
    //             return update_id
    //         }
    //     }
    //     catch (err) {
    //         console.error(`Error in sending ID! ${err}`)
    //     }


    // }, [])


    return (
        <>
            <nav>
                <div id='logo'>
                    Shop
                </div>
                <div className="btnholder">
                    <div onClick={() => setShow("form")} className='add' style={{ marginRight: '0px' }}>
                        <RiAddLargeLine />
                    </div>
                    <div onClick={() => (setupdateForm(true), setShow(null))} className='add'>
                        <MdModeEdit />
                    </div>
                </div>
            </nav>
            {/* <div className="getid" style={isUpdate ? { display: 'flex' } : { display: 'none' }}>
                <div className='form-theme confirmation-Box'>
                    <div className="form-group">
                        <label className='cancel'>
                            <h3>Enter ID for Update</h3>
                            <ImCancelCircle size={25} color='#ff0606' onClick={() => setisUpdate(false)} />
                        </label>
                        <input type="text" name="id" placeholder='e.g. 1' required />
                    </div>
                    <div className="form-actions btn" style={{ marginTop: '4px' }} onClick={() => (setupdateForm(true), setShow(""))}>
                        <button type="submit" className="submit-btn btn">Update ID</button>
                    </div>
                </div>
            </div> */}
        </>
    )
}
