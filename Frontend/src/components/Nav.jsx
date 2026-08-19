import React, { useContext } from 'react'
import logo from '/logo.png'
import { useState, useEffect } from 'react';
import { RiAddLargeLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineSummarize } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { ContainerContext } from '../Context/context';
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";


export const Nav = () => {
    const { API_Connect, searchPara, setsearchPara, setsearchData, authorized, access_token, super_user, setsummary_data } = useContext(ContainerContext)
    

    const [side_panel, setside_panel] = useState(false);
    const [searchbar, setsearchbar] = useState(false)

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


    const handle_user_role = async () => {
        try {
            const res = await fetch(`${API_Connect}/switch/user/role`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!res.ok) throw Error ("switch user role failed!!!")

            let new_role = await res.json()
            localStorage.setItem("token", new_role.token)
            window.location.reload();
            return new_role.admin

        } catch (err) {
            console.error(`Error to switch user role ${err}`)
        }
    }


    const handleSearch = (e) => {
        e.preventDefault()
        handleSearchPage()
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
        }

        if (url.pathname.startsWith("/post/search/")) {
            directSearch();
        }

        if (url.pathname.startsWith("/summary")) {
            handleSummary();
        }

    }, [url.pathname])


    const handlelogout = (e) => {
        e.preventDefault()
        window.localStorage.removeItem('token')
        window.location.replace('/login')
    }


    const handle_side_panel = () => {
        if (side_panel) {
            setside_panel(false)
        }
        else {
            setside_panel(true)
        }
    }    


    return (
        <>
            <nav>
                <img src={logo} id='logo' onClick={() => (authorized ? navigate("/") : navigate('/login'), setsearchbar(false))} title="Home" />
                
                <form className={`${searchbar ? "search-bar form-group" : "hide-block"}`} onSubmit={handleSearch}>
                        <input type="text" className="search-area" name='query' placeholder='Search' value={searchPara.query} onChange={handleChange}/>
                </form>

                <div className={`add side-bar`} onClick={() => (setside_panel(true), handle_side_panel())} title="Quick Links">
                    <TbLayoutSidebarRightExpandFilled size='25'/>
                </div>


                <div className={`${side_panel ? "side-panel" : "hide-block"}`}> 
                    
                    <div className="btnholder side-panel-btnholder">

                        <div onClick={() => (setsearchbar(true), setside_panel(false))} className='add' title='Search'>
                            <BsSearch />
                        </div>

                        <div className="add" onClick={handle_user_role} title={super_user ? "Normal" : "Admin"}>
                            <AiOutlineUserSwitch />
                        </div>

                        {super_user ? (
                            <> 
                                <div onClick={() => (handleRoute("new post"), setside_panel(false), setsearchbar(false))} className='add' title="New Post">
                                    <RiAddLargeLine />
                                </div>
                                <div onClick={() => (handleRoute("summary"), handleSummary(), setside_panel(false), setsearchbar(false))} className='add' title="Summary">
                                    <MdOutlineSummarize />
                                </div>
                            </>
                        ) : null}

                        <div onClick={handlelogout} className='add' title="Log Out">
                            <BiLogOut />
                        </div>

                    </div>

                </div>
                <div className="nav-btn-container">
                    <form className="search-bar form-group" onSubmit={handleSearch}>
                        <input type="text" className="search-area" name='query' placeholder='Search' value={searchPara.query} onChange={handleChange} />
                    </form>
                    <div className="btnholder">
                        {super_user ? (
                            <>
                                <div onClick={() => (handleRoute("new post"))} className='add' title="New Post">
                                    <RiAddLargeLine />
                                </div>
                                <div onClick={() => (handleRoute("summary"), handleSummary())} className='add' title="Summary">
                                    <MdOutlineSummarize />
                                </div>
                            </>
                        ) : null}
                        <div className='add' onClick={handle_user_role} title={super_user ? "Normal" : "Admin"}>
                            <AiOutlineUserSwitch />
                        </div>
                        <div onClick={handlelogout} className='add logout' title="Log Out">
                            <BiLogOut />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
