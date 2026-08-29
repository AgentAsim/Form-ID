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

            setNotification({
                ...notification,
                show: true,
                is_error: false,
                status_code: "Success",
                message: "Transaction updated successfully"
            });

            // back to home page
            handleRoute()

            return newData


        }
        catch (err) {
            console.error(`Error in Updating error: ${err}`)
        }
    };

    return (<>
        <div className="form-page-wrapper">
            <div className="form-card">
                
                <div className="form-header-new">
                    <div className="form-header-title-group">
                        <div className="form-header-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Edit Transaction</h2>
                            <p>Update transaction details</p>
                        </div>
                    </div>
                    <button type="button" className="form-close-btn" onClick={handleRoute}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <form className="form-body-new" onSubmit={handleSubmit(handle_Submit)} autoComplete='off'>
                    
                    <section className="form-section">
                        <div className="section-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                            <span>Client Information</span>
                            <div className="section-label-divider"></div>
                        </div>
                        <div className="form-grid">
                            <div className="form-field full">
                                <label htmlFor="id">Log ID</label>
                                <input type="text" id="id" name="id" className="form-input" value={oldData.id} onChange={handleChange} placeholder="Enter ID" disabled required />
                            </div>
                            <div className="form-field full">
                                <label htmlFor="Name">Full Name</label>
                                <input type="text" id="Name" name="Name" className="form-input" value={oldData.Name} onChange={handleChange} placeholder="Enter Name" required />
                            </div>
                            <div className="form-field full">
                                <label htmlFor="Contact">Contact No.</label>
                                <input type="text" id="Contact" name="Contact" className="form-input" value={oldData.Contact} onChange={handleChange} placeholder="1234567890" required />
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <div className="section-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l8.29-8.29c.94-.94.94-2.48 0-3.42L12 2Z"/>
                                <path d="M7 7h.01"/>
                            </svg>
                            <span>Service Details</span>
                            <div className="section-label-divider"></div>
                        </div>
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="Service">Service</label>
                                <input type="text" id="Service" name="Service" className="form-input" value={oldData.Service} onChange={handleChange} placeholder="Service Name" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="Service_Type">Service Type</label>
                                <input type="text" id="Service_Type" name="Service_Type" className="form-input" value={oldData.Service_Type} onChange={handleChange} placeholder="Service Type" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="Month">Month</label>
                                <input type="text" id="Month" name="Month" className="form-input" value={oldData.Month} onChange={handleChange} placeholder="Month" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="Created_At">Created At</label>
                                <input type="text" id="Created_At" name="Created_At" className="form-input" value={oldData.Created_At} onChange={handleChange} placeholder="e.g. YYYY-MM-DD" required />
                            </div>
                            <div className="form-field full">
                                <label htmlFor="Application_ID">Application ID</label>
                                <input type="text" id="Application_ID" name="Application_ID" className="form-input" value={oldData.Application_ID} onChange={handleChange} placeholder="Application no." style={{fontFamily: "monospace"}} />
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <div className="section-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>
                            </svg>
                            <span>Financial Details</span>
                            <div className="section-label-divider"></div>
                        </div>
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="Govt_Fee">Govt Fee (₹)</label>
                                <input type="number" id="Govt_Fee" name="Govt_Fee" className="form-input" value={oldData.Govt_Fee} onChange={handleChange} placeholder="0" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="Service_Charge">Service Charge (₹)</label>
                                <input type="number" id="Service_Charge" name="Service_Charge" className="form-input" value={oldData.Service_Charge} onChange={handleChange} placeholder="0" />
                            </div>
                            
                            <div className="total-amount-box">
                                <div className="total-amount-label">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
                                    </svg>
                                    <span>Total Amount</span>
                                </div>
                                <span className="total-amount-value">₹{(Number(oldData.Govt_Fee) || 0) + (Number(oldData.Service_Charge) || 0)}</span>
                            </div>

                            <div className="form-field">
                                <label htmlFor="Due">Due Amount (₹)</label>
                                <input type="number" id="Due" name="Due" className="form-input" value={oldData.Due} onChange={handleChange} placeholder="0" />
                            </div>
                        </div>
                    </section>

                    <div className="form-actions-new">
                        <button type="button" className="btn-cancel" onClick={handleRoute}>Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="btn-save">Save Changes</button>
                    </div>
                </form>

            </div>
        </div>
    </>)
}
