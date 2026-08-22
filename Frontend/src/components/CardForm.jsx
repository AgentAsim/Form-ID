import React from 'react'
import { useContext } from 'react';
import { ContainerContext } from '../Context/context';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Notification } from './Notification';

export const CardForm = () => {
    const { API_Connect, oldData, setoldData, access_token, notification, setNotification } = useContext(ContainerContext)

    const { handleSubmit, formState: { isSubmitting } } = useForm();

    // home page pointer
    const navigate = useNavigate();
    const handleRoute = () => {
        navigate(`/`)
    }


    // track form field Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setoldData({ ...oldData, [name]: value });
    };


    // Handle form submition
    const handle_Submit = async (e) => {
        //e.preventDefault();
        delete oldData.Total_Amount

        try {
            // post data 
            let res = await fetch(`${API_Connect}/post/update`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(oldData)
            })

            if (!res.ok) {
                setNotification({
                    ...notification,
                    "is_error": true,
                    "status_code": res.status,
                    "message": res.statusText
                })
                throw new Error(`Log at ID ${oldData.id} not updated!`)
            }

            let newData = await res.json()

            // back to home page
            handleRoute()

            return newData


        }
        catch (err) {
            console.error(`Error in Updating error: ${err}`)
        }
    };

    if (notification.is_error) {
        return <Notification />
    }


    return (<>
        <div className={`form-page-container`}>
            <form className="theme-form" onSubmit={handleSubmit(handle_Submit)} autoComplete='off'>
                <div className="form-header">
                    <h2>Update Log Details</h2>
                    <p>Update the service details below.</p>
                </div>

                <div className="form-grid">
                    {/* Text Inputs */}
                    <div className="form-group">
                        <label>Log ID</label>
                        <input type="text" name="id" value={oldData.id} onChange={handleChange} placeholder='Enter ID' disabled required />
                    </div>
                    
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="Name" value={oldData.Name} onChange={handleChange} placeholder='Enter Name' required />
                    </div>

                    <div className="form-group">
                        <label>Contact</label>
                        <input type="text" name="Contact" value={oldData.Contact} onChange={handleChange} placeholder='1234567890' required />
                    </div>

                    <div className="form-group">
                        <label>Service</label>
                        <input type="text" name="Service" value={oldData.Service} onChange={handleChange} placeholder='Service Name' required />
                    </div>

                    <div className="form-group">
                        <label>Service Type</label>
                        <input type="text" name="Service_Type" value={oldData.Service_Type} onChange={handleChange} placeholder='Service Type' required />
                    </div>

                    <div className="form-group">
                        <label>Month</label>
                        <input type="text" name="Month" value={oldData.Month} onChange={handleChange} placeholder='Month' />
                    </div>

                    <div className="form-group full-width">
                        <label>Created At</label>
                        <input type="text" name="Created_At" value={oldData.Created_At} onChange={handleChange} placeholder='e.g. YYYY-MM-DD' required />
                    </div>

                    <div className="form-group full-width">
                        <label>Application ID</label>
                        <input type="text" name="Application_ID" value={oldData.Application_ID} onChange={handleChange} placeholder='Application no.' />
                    </div>

                    {/* Financial/Integer Inputs */}
                    <div className="form-group">
                        <label>Govt Fee</label>
                        <input type="number" name="Govt_Fee" value={oldData.Govt_Fee} onChange={handleChange} placeholder='0' />
                    </div>

                    <div className="form-group">
                        <label>Service Charge</label>
                        <input type="number" name="Service_Charge" value={oldData.Service_Charge} onChange={handleChange} placeholder='0' />
                    </div>

                    <div className="form-group">
                        <label>Total Amount</label>
                        <input type="number" name="Total_Amount" value={Number(oldData.Govt_Fee) + Number(oldData.Service_Charge)} placeholder='0' />
                    </div>

                    <div className="form-group due-row">
                        <label>Due</label>
                        <input type="number" name="Due" value={oldData.Due} onChange={handleChange} placeholder='0' className='value' />
                    </div>
                </div>

                <div className="form-actions btn">
                    <button type="submit" disabled={isSubmitting} className="submit-btn btn">Update Log</button>
                </div>
                <div className="btn">
                    <div onClick={() => (handleRoute())} className="submit-btn btn cancel-btn">Cancel</div>
                </div>
            </form>
        </div>
    </>)
}
