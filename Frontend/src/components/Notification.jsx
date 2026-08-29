import React, { useContext, useEffect } from 'react'
import { ContainerContext } from '../Context/context'
import { IoIosNotificationsOutline } from "react-icons/io";


export const Notification = () => {

    const { notification, setNotification } = useContext(ContainerContext)

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification(prev => ({
                    ...prev,
                    show: false,
                    is_error: false,
                    status_code: "",
                    message: ""
                }));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notification.message, setNotification]);

    return (
        <>
            <div className={`notification-toast-new ${notification.is_error ? 'error' : ''}`}>
                <div className="notification-icon-box">
                    {notification.is_error ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    )}
                </div>
                <div className="notification-content">
                    <h4 className="notification-title">{notification.status_code}</h4>
                    <p className="notification-message">{notification.message}</p>
                </div>
                <button className="notification-close-btn" onClick={() => setNotification(prev => ({ ...prev, show: false, is_error: false, status_code: "", message: "" }))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        </>
    )
}
