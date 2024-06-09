// src/MyComponent.js
import React, {useState, useEffect} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import "./style.css";

const Home = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try{
            const response = await axios.get('http://localhost:5000/token');
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
            const response = await axios.get('http://localhost:5000/token');
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

  return (
    <>
      <main>
        <div className="Home">
          <div className="container content-container">
            <div className="text-container">
              <h2><b>Selamat Datang, {name}</b></h2>
              <h1><b>INVENTORY</b></h1>
              <h3><b>Penyimpanan, Penerimaan, dan Pengambilan</b></h3>
              <br />
              <p>Kami menyediakan platform yang memudahkan Anda untuk mengelola stok barang dengan efisien dan akurat. Dapatkan kendali penuh atas persediaan Anda dan tingkatkan produktivitas bisnis dengan fitur-fitur canggih kami.</p>
            </div>
            <div className="image-container">
              <img src="/image/2.png" alt="Library Image" />
            </div>
          </div>
        </div>
      </main>
      <script src="./dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

export default Home;
