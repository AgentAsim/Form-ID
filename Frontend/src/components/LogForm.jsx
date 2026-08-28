import React, { use } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { ContainerContext } from '../Context/context';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Notification } from './Notification';

export const LogForm = () => {

    const { API_Connect, access_token, notification, setNotification } = useContext(ContainerContext);

    const { handleSubmit, formState: { isSubmitting } } = useForm();

    const navigate = useNavigate();
    const handleRoute = () => {
        navigate(`/`)
    }


    // Form field data titles
    const [formData, setFormData] = useState({
        Name: '',
        Contact: '',
        Service: '',
        Service_Type: '',
        Govt_Fee: 0,
        Service_Charge: 0,
        //Total_Amount: '',
        Created_At: 'Default',
        Application_ID: 'NA',
        Due: 0
    });

    // track form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    // handle form submition
    const handle_Submit = async (data) => {
        //data.preventDefault();

        // API call here
        try {
            // POST data
            const res = await fetch(`${API_Connect}/post`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(formData)

            })
            
            if (!res.ok) {
                setNotification({
                    ...notification,
                    "is_error": true,
                    "status_code": res.status,
                    "message": res.statusText
                });
                throw new Error("post request failed!")
            }
            let post_res = await res.json()

            // back to home page
            handleRoute()

            return post_res
        }
        catch (err) {
            console.error(`Error Occure in Posting Form with error code ${err}`)
        }

    };

    if (notification.is_error) {
        return <Notification />
    }

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
                            <h2>New Transaction</h2>
                            <p>Fill in the details below</p>
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
                                <label htmlFor="Name">Full Name</label>
                                <input type="text" id="Name" name="Name" className="form-input" value={formData.Name} onChange={handleChange} placeholder="Name" required />
                            </div>
                            <div className="form-field full">
                                <label htmlFor="Contact">Contact No.</label>
                                <input type="text" id="Contact" name="Contact" className="form-input" value={formData.Contact} onChange={handleChange} placeholder="1234567890" required />
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
                                <input type="text" id="Service" name="Service" className="form-input" value={formData.Service} onChange={handleChange} placeholder="Service" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="Service_Type">Service Type</label>
                                <input type="text" id="Service_Type" name="Service_Type" className="form-input" value={formData.Service_Type} onChange={handleChange} placeholder="Service Type" required />
                            </div>
                            <div className="form-field full">
                                <label htmlFor="Application_ID">Application ID</label>
                                <input type="text" id="Application_ID" name="Application_ID" className="form-input" value={formData.Application_ID} onChange={handleChange} placeholder="Application no." style={{fontFamily: "monospace"}} />
                            </div>
                            <div className="form-field full">
                                <label htmlFor="Created_At">Created At</label>
                                <input type="text" id="Created_At" name="Created_At" className="form-input" value={formData.Created_At} onChange={handleChange} placeholder="e.g. YYYY-MM-DD" required />
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
                                <input type="number" id="Govt_Fee" name="Govt_Fee" className="form-input" value={formData.Govt_Fee} onChange={handleChange} placeholder="0" />
                            </div>
                            <div className="form-field">
                                <label htmlFor="Service_Charge">Service Charge (₹)</label>
                                <input type="number" id="Service_Charge" name="Service_Charge" className="form-input" value={formData.Service_Charge} onChange={handleChange} placeholder="0" />
                            </div>
                            
                            <div className="total-amount-box">
                                <div className="total-amount-label">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
                                    </svg>
                                    <span>Total Amount</span>
                                </div>
                                <span className="total-amount-value">₹{(Number(formData.Govt_Fee) || 0) + (Number(formData.Service_Charge) || 0)}</span>
                            </div>

                            <div className="form-field">
                                <label htmlFor="Due">Due Amount (₹)</label>
                                <input type="number" id="Due" name="Due" className="form-input" value={formData.Due} onChange={handleChange} placeholder="0" />
                            </div>
                        </div>
                    </section>

                    <div className="form-actions-new">
                        <button type="button" className="btn-cancel" onClick={handleRoute}>Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="btn-save">Create Transaction</button>
                    </div>
                </form>

            </div>
        </div>
    </>)
}
