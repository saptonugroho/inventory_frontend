import React,{useEffect, useState} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate, Link} from "react-router-dom";
import '../style.css';

function Produk() {

    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try{
            const response = await axios.get('http://159.65.137.143:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            //console.log(decoded)
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

  const [produk, SetProduk] = useState([]);

  useEffect(() => {
    getproduk();
  }, []);
  const getproduk = async () => {
    const response = await axios.get('http://159.65.137.143:5000/produk');
    SetProduk(response.data)
  }
     
    return (
      <>
      <main>
        <div className="container1">
          <h1>Produk</h1>
          <div className="user-cards">
            {produk.map((produk, index) => (
            <div className="user-card col-md-3 mb-4" data-user-id="{user.id}">
              <img src="../image/01.png" alt="User Image" />
              <p>Nama Produk: {produk.nama_produk}</p>
              <p>Stok Produk: {produk.stok}</p>
              <Link to={`/updateproduk/${produk.id}`} rel="stylesheet" className="delete-button">Edit</Link>
            </div>
            ))}
          </div>
          <a href="/tambahproduk" className="btn">Tambah Produk</a>
        </div>
      </main>
      </>
    );
  }
  
  export default Produk;