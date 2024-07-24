import React,{useEffect, useState} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate, Link} from "react-router-dom";
import './Pemasok.css';
import '../style.css';

function Pemasok() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');

  const [nama, setnama] = useState('');
  const [alamat, setalamat] = useState('');
  const [nohp, setnohp] = useState('');
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

const [Pemasok, SetPemasok] = useState([]);

useEffect(() => {
  getPemasok();
}, []);
const getPemasok = async () => {
  const response = await axios.get('http://localhost:5000/pemasok');
  SetPemasok(response.data)
  console.log(response)
}
    return (
        <main>
        <section className="jumbotron d-flex align-items-center">
        <div className="container">
          <h3 className="text-center">Pemasok</h3>
         
          <div className="row user-list mt-1">
          {Pemasok.map((tok, index) => (
            <div className="col-md-3 mb-4">
              <div className="user-card rounded border border-primary p-3">
                <img src="../image/01.png" alt="User Image" width="100" />
                <h5 className="card-title">{tok.nama}</h5>
                <p className="card-text">No Hp: {tok.nohp}</p>
                <p className="card-text">Alamat: {tok.alamat}</p>
                <button className="delete-button">Hapus</button>
                <Link to={`/updatePemasok/${tok.id}`} className="delete-button">Edit</Link>
              </div>
            </div>
          ))}
          </div>
      
          <Link to="/tambahpemasok" className="btn btn-add-user mt-3 mx-auto d-block" style={{ width: '170px' }}>Tambah Pemasok</Link>
        </div>
      </section>
            </main>
      
    );
  }
  
  export default Pemasok;