import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { RiAddLargeLine } from "react-icons/ri";
import { IoLogOutSharp } from "react-icons/io5";
import { FaSheetPlastic } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import { ContainerContext } from '../Context/context';



export const Nav = () => {
    const { API_Connect, searchPara, setsearchPara, setsearchData, authorized, access_token, super_user, setsummary_data } = useContext(ContainerContext)

    const navigate = useNavigate();
    const url = useLocation();

    let searchTerm = url.pathname.split('/')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsearchPara({
            ...searchPara,
            [name]: value
        })
    }


    const handleRoute = (button_identifier) => {
        if (authorized) {
            if (button_identifier === "new post") {
                navigate("/new/post")
            }
            else if (button_identifier === "summary") {
                navigate("/summary")
            }
        }
        else {
            navigate("/login")
        }
    }


    let searchPathWords = searchPara.query.split(' ')
    let searchPath = searchPathWords.join('+')
    const handleSearchPage = () => {
        navigate(`/post/search/${searchPath}`)
    }


    const handleSearch = async (data) => {
        data.preventDefault()

        // API call here
        try {
            const res = await fetch(`${API_Connect}/search/post/${searchPara.query}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!res.ok) throw Error("search request failed!")

            let post_res = await res.json()
            setsearchData(post_res)
            return post_res
        }
        catch (err) {
            console.error(`Error Occure in Posting Form with error code ${err}`)
        }
        finally {
            handleSearchPage()
        }
    }

    const handleSummary = async () => {
        

        try {
            let res = await fetch(`${API_Connect}/finance/summary`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': "application/json"
                }
            });

            if (!res.ok) throw Error("Finance Summary not found!!!");

            let finance_res = await res.json();
            setsummary_data(finance_res);
            return finance_res;
        }
        catch (err) {
            console.error(`Error Occure in Finance Summary with error code ${err}`)
        }
    }

    useEffect(() => {

        const directSearch = async () => {
            // API call
            try {
                const res = await fetch(`${API_Connect}/search/post/${searchTerm.at(-1)}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!res.ok) throw Error("search request failed!")

                let post_res = await res.json()
                setsearchData(post_res)
                return post_res
            }
            catch (err) {
                console.error(`Error Occure in Posting Form with error code ${err}`)
            }
            finally {
                navigate(`/post/search/${searchTerm.at(-1)}`)
            }
        }

        if (url.pathname.startsWith("/post/search/")) {
            directSearch();
        }

        if (url.pathname.startsWith("/summary")) {
            handleSummary()
        }

    }, [])


    const handlelogout = (e) => {
        e.preventDefault()
        window.localStorage.removeItem('token')
        window.location.replace('/login')
    }
    


    return (
        <>
            <nav>
                <div id='logo' onClick={() => authorized ? navigate("/") : navigate('/login')}>
                    Shop
                </div>
                <form className="search-bar form-group" onSubmit={handleSearch}>
                    <input type="text" className="search-area" name='query' placeholder='Search' value={searchPara.query} onChange={handleChange} />
                </form>
                <div className="btnholder">
                    {super_user ? (
                        <>
                            <div onClick={() => (handleRoute("new post"))} className='add'>
                                <RiAddLargeLine />
                            </div>
                            <div onClick={() => (handleRoute("summary"), handleSummary())} className='add'>
                                <FaSheetPlastic />
                            </div>
                        </>
                    ) : null}
                    <div onClick={handlelogout} className='add logout'>
                        <IoLogOutSharp />
                    </div>
                </div>
            </nav>
        </>
    )
}
