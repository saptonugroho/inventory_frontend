import React,{useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    const Logout = async(e) =>{
        e.preventDefault();
        try{
            await axios.delete('http://localhost:5000/users');
            navigate('/');
        } catch (error){
            if(error.response){
                console.log(error);
            }
        }
    }

    useEffect(() => {
      refreshToken();
  }, []);

  const refreshToken = async () => {
      try{
          const response = await axios.get('http://localhost:5000/token');
          setToken(response.data.accessToken);
          const decoded = jwtDecode(response.data.accessToken);
          setName(decoded.username)
          setExpire(decoded.exp)
          setRole(decoded.role)
          
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
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark shadow">
          <div className="container">
            <a className="navbar-brand col-ms-3" href="#">
              <img src="../image/1-removebg-preview.png" alt="IBOB Logo" />
              <h2>IBOB</h2>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
              {role !== 2 && (
                <li className="nav-item">
                  <a href="/user" className="nav-link">User</a>
                </li>
              )}
                <li className="nav-item">
                  <a href="/produk" className="nav-link">Product</a>
                </li>
                <li className="nav-item">
                  <a href="/stokin" className="nav-link">Stock In</a>
                </li>
                <li className="nav-item">
                  <a href="/stokout" className="nav-link">Stock Out</a>
                </li>
                <li className="nav-item">
                  <a href="/toko" className="nav-link">Toko</a>
                </li>
                <li className="nav-item">
                  <a href="/pemasok" className="nav-link">Pemasok</a>
                </li>
                <li className="nav-item">
                  <a href="/pelanggan" className="nav-link">Pelanggan</a>
                </li>
              </ul>
              <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="avatar" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="../image/image-removebg-preview.png" alt="fullname" width="32" height="32" className="rounded-circle me-2" />
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="avatar">
                  <li><a className="dropdown-item" href="editprofil.html">My Profile</a></li>
                  <li><a className="dropdown-item" href="#">Change Password</a></li>
                  <li><button onClick={Logout} className="dropdown-item">Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      </>
  )
}

export default Navbar
