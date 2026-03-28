import React from 'react'
import { RiAddLargeLine } from "react-icons/ri";
import { useContext } from 'react';
import { ContainerContext } from '../Context/context';



export const Nav = () => {

    const { setShow, setupdateForm, setnewForm } = useContext(ContainerContext)

    return (
        <>
            <nav>
                <div id='logo'>
                    Shop
                </div>
                <div className="btnholder">
                    <div onClick={() => (setShow("form"), setnewForm(true), setupdateForm(false))} className='add'>
                        <RiAddLargeLine />
                    </div>
                </div>
            </nav>
        </>
    )
}
