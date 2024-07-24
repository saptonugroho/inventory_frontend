import React,{useEffect, useState} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import '../style.css';
import './Pemasok.css';

function Tambahuser() {

  const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        refreshToken();
    }, []);

   const [nama, setnama] = useState("");
   const [nohp, setnohp] = useState("");
   const [alamat, setalamat] = useState("");

    

    const refreshToken = async () => {
        try{
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
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

    const savepemasok = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/pemasok',{
               nama, alamat, nohp
            });
            navigate('/pemasok');
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
                <h3 className="text-center">Tambah Pemasok</h3>
                <form id="addUserForm" onSubmit={savepemasok}>
                <p className='has-text-centered'>{message}</p>
                <div className="form-group">
                    <input type="text" id="nama" name="nama" placeholder="nama" aria-label="nama" value={nama} onChange={(e) => setnama(e.target.value)} required />
                  </div>
                 
                  <div className="form-group">
                    <input type="text" id="nohp" name="nohp" placeholder="nohp" aria-label="nohp" value={nohp} onChange={(e) => setnohp(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <input type="text" id="alamat" name="alamat" placeholder="alamat" aria-label="alamat" value={alamat} onChange={(e) => setalamat(e.target.value)} required />
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