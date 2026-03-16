import React from 'react'
import { RiAddLargeLine } from "react-icons/ri";
import { useContext, useEffect } from 'react';
import { ContainerContext } from '../Context/context';



export const Nav = () => {

    const { setShow } = useContext(ContainerContext)

    return (
        <>
            <nav>
                <div id='logo'>
                    Shop
                </div>
                <div onClick={() => setShow("form")} className='add'>
                    <span>Add</span>
                    <RiAddLargeLine />
                </div>
            </nav>
        </>
    )
}
