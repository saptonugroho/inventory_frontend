import React,{useEffect, useState} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import '../style.css';
import './produk.css';

function Tambahproduk() {

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
   const [nama_produk, setnama_produk] = useState("");
   const [stok, setstok] = useState("");

    

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

    const saveproduk = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/produk',{
                nama_produk,stok
            });
            navigate('/produk');
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
                <h3 className="text-center">Tambah Produk</h3>
                <form id="addUserForm" onSubmit={saveproduk}>
                <p className='has-text-centered'>{message}</p>
                  <div className="form-group">
                    <input type="text" id="nama_produk" name="nama_produk" placeholder="nama_produk" aria-label="Nama Produk" value={nama_produk} onChange={(e) => setnama_produk(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <input type="number" id="stok" name="stok" placeholder="stok" aria-label="stok" value={stok} onChange={(e) => setstok(e.target.value)} required />
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
  
  export default Tambahproduk;