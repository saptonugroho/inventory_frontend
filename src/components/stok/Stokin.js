import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect, useState} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate, Link} from "react-router-dom";
import moment from 'moment';
import 'moment/locale/id';
import '../style.css';

function Stokin() {
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

    const [transaksiin, Settransaksiin] = useState([]);

    useEffect(() => {
    gettransaksiin();
    }, []);
    const gettransaksiin = async () => {
    const response = await axios.get('http://159.65.137.143:5000/transaksiin');
    Settransaksiin(response.data)
    console.log(response)
    }

    function formatDate(date) {
        return moment(date).locale('id').format('DD MMMM YYYY');
    }
    return (
        <main>
            <div className='container1'>
			<a href="/tambahstokin" className="btn">Buat Transaksi</a>
				<table className="table">
				<thead>
					<tr>
					<th scope="col">#</th>
					<th scope="col">Produk</th>
					<th scope="col">Stok</th>
					<th scope="col">Tanggal</th>
					</tr>
				</thead>
				<tbody>
                    {transaksiin.map((trans, index) => (
					<tr>
					<th>{index + 1}</th>
					<td>{trans.nama_barang}</td>
					<td>{trans.jumlah}</td>
					<td>
                        {
                        formatDate(trans.createdAt)
                        }
                    </td>
					</tr>
                    ))}
				</tbody>
				</table>
            </div>
        </main>
    );
  }
  
  export default Stokin;