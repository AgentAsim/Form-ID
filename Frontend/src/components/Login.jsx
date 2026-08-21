import React from 'react'
import { useContext, useState } from 'react'
import { ContainerContext } from '../Context/context'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export const Login = () => {

    const { API_Connect, setAuthorized } = useContext(ContainerContext)

    const { handleSubmit, formState: { isSubmitting } } = useForm();

    const navigate = useNavigate();

    const [login_credentials, setlogin_credentials] = useState(
        {
            username: '',
            password: ''
        }
    )


    const handle_change = (e) => {
        const { name, value } = e.target;
        setlogin_credentials({
            ...login_credentials,
            [name]: value
        });
    }


    let handle_login = async (credentials) => {

        try {
            const res = await fetch(`${API_Connect}/token`, {
                method: 'POST',
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(login_credentials)
            });

            if (!res.ok) alert('Username or Password Incorrect!')

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.access_token);
                window.location.replace('/');
                setAuthorized(true);
                return "Access Granted!!!"
            }

        }
        catch (err) {
            console.error(`${err}`)
        }

    }



    return (
        <>
            <div className="login-card">
                <h2>Welcome Back</h2>
                <p>Please enter your details to login.</p>

                <form className="login-card-form" onSubmit={handleSubmit(handle_login)}>
                    <div className="form-group-login">
                        <label for="username">Username</label>
                        <input type="text" name='username' value={login_credentials.username} onChange={handle_change} id="username" placeholder="username" required />
                    </div>

                    <div className="form-group-login">
                        <label for="password">Password</label>
                        <input type="password" name="password" value={login_credentials.password} onChange={handle_change} id="password" placeholder="password" required />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="login-btn">Sign In</button>
                </form>

                <div className="options" style={{display: "None"}}>
                    <span>Don't have an account? <a href="#">Create one</a></span>
                </div>
            </div>
        </>
    )
}
