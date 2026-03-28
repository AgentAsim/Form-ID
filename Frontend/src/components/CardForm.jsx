import React from 'react'
import { useContext, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { ContainerContext } from '../Context/context';

export const CardForm = () => {
    const { isUpdate, setupdateForm, updateForm, setShow } = useContext(ContainerContext)

    const [formData, setFormData] = useState({
        Name: '',
        Contact: '',
        Service: '',
        Service_Type: '',
        Month: '',
        Application_ID: '',
        Govt_Fee: '',
        Service_Charge: '',
        Total_Amount: '',
        Due: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Card Form Submitted: ", formData);
    };


    if (updateForm === false) return null;

    return (
        <>
            {/* Swapped standard div for a form element, kept the same class */}
            <form className="service-card update-form" onSubmit={handleSubmit}>

                <h1 className='updateform-heading'>
                    <MdModeEdit />
                    Update logs Details
                </h1>
                <div className="card-header">
                    <div className="update-header form-group">

                        {/* Input taking the place of the h3 heading */}
                        <span className="user-id form-group data-row">Enter ID</span>
                        <input
                            type="text"
                            name="Name"
                            className="user-name card-input"
                            placeholder="Enter ID"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="update-header form-group">
                        {/* Input taking the place of the h3 heading */}
                        <span className="user-id form-group data-row">Enter Name</span>
                        <input
                            type="text"
                            name="Name"
                            className="user-name card-input"
                            placeholder="Enter Name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="card-body updateform-body">
                    <div className="details">
                        <div className="data-row form-group">
                            <span className="label">Contact</span>
                            <input type="text" name="Contact" className="value card-input" placeholder="e.g. 9876543210" value={formData.Contact} onChange={handleChange} />
                        </div>
                        <div className="data-row form-group">
                            <span className="label">Service</span>
                            <input type="text" name="Service" className="value card-input" placeholder="Service Name" value={formData.Service} onChange={handleChange} />
                        </div>
                        <div className="data-row form-group">
                            <span className="label">Service Type</span>
                            <input type="text" name="Service_Type" className="value card-input" placeholder="Type" value={formData.Service_Type} onChange={handleChange} />
                        </div>
                        <div className="data-row form-group">
                            <span className="label">Month</span>
                            <input type="text" name="Month" className="value card-input" placeholder="Month" value={formData.Month} onChange={handleChange} />
                        </div>
                        <div className="data-row form-group">
                            <span className="label">Application ID</span>
                            <input type="text" name="Application_ID" className="value card-input" placeholder="App ID" value={formData.Application_ID} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="financials">
                        <div className="data-row form-group">
                            <span className="label">Govt Fee (₹)</span>
                            <input type="number" name="Govt_Fee" className="value card-input" placeholder="0" value={formData.Govt_Fee} onChange={handleChange} />
                        </div>
                        <div className="data-row form-group">
                            <span className="label">Service Fee (₹)</span>
                            <input type="number" name="Service_Charge" className="value card-input" placeholder="0" value={formData.Service_Charge} onChange={handleChange} />
                        </div>
                        <div className="data-row form-group total-row">
                            <span className="label">Total Fee</span>
                            <input type="number" name="Total_Amount" className="value card-input" placeholder="0" value={formData.Total_Amount} onChange={handleChange} />
                        </div>
                        <div className="data-row form-group due-row">
                            <span className="label">Due Amount</span>
                            <input type="number" name="Due" className="value card-input" placeholder="0" value={formData.Due} onChange={handleChange} />
                        </div>
                    </div>

                </div>
                {/* Inline styled button to fit the card bottom natively */}
                <button type="submit" className='update-form-btn'>
                    Update Card Details
                </button>
                <div className='update-form-btn' onClick={() => (setShow("home"), setupdateForm(false))}>
                    Cancel
                </div>
            </form>
        </>
    )
}
