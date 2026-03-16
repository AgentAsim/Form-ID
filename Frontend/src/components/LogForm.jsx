import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { ContainerContext } from '../Context/context';

export const LogForm = () => {


    const { Show, setShow } = useContext(ContainerContext);


    const [formData, setFormData] = useState({
        Name: '',
        Contact: '',
        Service: '',
        Service_Type: '',
        Govt_Fee: 0,
        Service_Charge: 0,
        Total_Amount: 0,
        Month: '',
        Created_At: '',
        Application_ID: '',
        Due: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted: ", formData);
        // Add your submission logic/API call here
    };

    if (Show === "form") {
        return (<>
            <div className={`form-page-container`}>
                <form className="theme-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h2>Add New Log</h2>
                        <p>Enter the service details below.</p>
                    </div>

                    <div className="form-grid">
                        {/* Text Inputs */}
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" name="Contact" value={formData.Contact} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Service</label>
                            <input type="text" name="Service" value={formData.Service} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Service Type</label>
                            <input type="text" name="Service_Type" value={formData.Service_Type} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Month</label>
                            {/* Could also be type="month" depending on your needs */}
                            <input type="text" name="Month" value={formData.Month} onChange={handleChange} placeholder="e.g. March" />
                        </div>

                        <div className="form-group">
                            <label>Created At</label>
                            <input type="date" name="Created_At" value={formData.Created_At} onChange={handleChange} />
                        </div>

                        <div className="form-group full-width">
                            <label>Application ID</label>
                            <input type="text" name="Application_ID" value={formData.Application_ID} onChange={handleChange} />
                        </div>

                        {/* Financial/Integer Inputs */}
                        <div className="form-group">
                            <label>Govt Fee</label>
                            <input type="number" name="Govt_Fee" value={formData.Govt_Fee} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Service Charge</label>
                            <input type="number" name="Service_Charge" value={formData.Service_Charge} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Total Amount</label>
                            <input type="number" name="Total_Amount" value={formData.Total_Amount} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Due</label>
                            <input type="number" name="Due" value={formData.Due} onChange={handleChange} />
                        </div>
                    </div>

                    {/* <div className=""> */}
                    <div className="form-actions btn">
                        <button type="submit" className="submit-btn btn">Save Log</button>
                    </div>
                    <div className="form-actions btn">
                        <button onClick={() => setShow("home")} type="submit" className="submit-btn btn">Cancel</button>
                    </div>
                    {/* </div> */}
                </form>
            </div>
        </>)
    }
}
