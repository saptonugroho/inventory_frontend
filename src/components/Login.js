import React,{useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const Auth = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://159.65.137.143:5000/users', {
                username: username,
                password: password
            });
            navigate('/dashboard');
        } catch (error){
            if(error.response){
                setMessage(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try{
            const response = await axios.get(`http://159.65.137.143:5000/token`);
            if(response){
                navigate('/dashboard');
            }
            
        } catch (error){
            if(error.response){
                navigate('/');
            }
        }
    }
    const apiHost = process.env.REACT_APP_API;
    console.log('API Host:', apiHost);
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={Auth} className="box">
                        <p className='has-text-centered'>{message}</p>
                            <div className="field mt-5">
                                <label className="label">Username</label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Password</label>
                                <div className="controls">
                                    <input type="password" className="input" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button className="button is-success is-fullwidth">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login
