import React,{useEffect, useState} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import '../style.css';
import './Tuser.css';

function Tambahuser() {

  const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        refreshToken();
    }, []);

   const [username, setUsername] = useState("");
   const [fullname, setfullname] = useState("");
   const [password, setpassword] = useState("");
   const [confPassword, setconfPassword] = useState("");

    

    const refreshToken = async () => {
        try{
            const response = await axios.get('http://159.65.137.143:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            console.log(decoded)
            setName(decoded.username)
            setExpire(decoded.exp)
            
        } catch (error){
            if(error.response){
                navigate('/');
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://159.65.137.143:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            const decoded = jwtDecode(response.data.accessToken);
            setToken(response.data.accessToken);
            setName(decoded.username)
            setExpire(decoded.exp)
        }
        return config;
    }, (error) =>{
        return Promise.reject(error);
    });

    const saveuser = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://159.65.137.143:5000/Register',{
                username,fullname,password,confPassword
            });
            navigate('/user');
        } catch(error){
            setMessage(error.response.data.message);
        }
    }
     
    return (
        <section className="jumbotron d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-last">
              {/* Menggunakan order-lg-last untuk mengubah urutan pada layar besar */}
      
              <div className="form">
                <h3 className="text-center">Tambah User</h3>
                <form id="addUserForm" onSubmit={saveuser}>
                <p className='has-text-centered'>{message}</p>
                  <div className="form-group">
                    <input type="text" id="username" name="username" placeholder="username" aria-label="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <input type="text" id="fullname" name="fullname" placeholder="fullname" aria-label="fullname" value={fullname} onChange={(e) => setfullname(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <input type="password" id="password" name="password" placeholder="password" aria-label="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <input type="password" id="confPassword" name="confPassword" placeholder="confPassword" aria-label="confPassword" value={confPassword} onChange={(e) => setconfPassword(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <button type="submit">Tambahkan</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-container">
                <h3 className="text-center">Tambah User</h3>
                <img src="/img/bg.png" alt="Image" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>      
    );
  }
  
  export default Tambahuser;