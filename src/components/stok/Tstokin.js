import React,{useEffect, useState} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import '../style.css';

function Tambahstokin() {

  const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        refreshToken();
    }, []);

    const [user_update, setuser_update] = useState("");
    const [username, setUsername] = useState("");
   const [fullname, setfullname] = useState("");
   const [jumlah, setjumlah] = useState("");
   const [nama_barang, setnama_barang] = useState("");
   const [id_barang, setid_barang] = useState("");
   const type = "in";
    

    const refreshToken = async () => {
        try{
            const response = await axios.get('http://159.65.137.143:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            //console.log(decoded)
            setUsername(decoded.username)
            setuser_update(decoded.userId)
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

    const savestok = async(e) =>{
        e.preventDefault();
        try{
            await axios.post('http://159.65.137.143:5000/transaksi',{
                id_barang,jumlah,type,user_update,nama_barang
            });
            navigate('/stokin');
        } catch(error){
            setMessage(error.response.data.message);
        }
    }
    const [produk, SetProduk] = useState([]);

    useEffect(() => {
        getproduk();
      }, []);
      const getproduk = async () => {
        const response = await axios.get('http://159.65.137.143:5000/produk');
        SetProduk(response.data)
      }

      const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        const selectedProduct = produk.find((prod) => prod.id.toString() === selectedId);
        if (selectedProduct) {
          setid_barang(selectedId);
          setnama_barang(selectedProduct.nama_produk);
          console.log(selectedProduct.nama_produk);
        }
      };
     
    return (
        <section className="jumbotron d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-last">
              {/* Menggunakan order-lg-last untuk mengubah urutan pada layar besar */}
      
              <div className="form">
                <h3 className="text-center">Tambah Stok</h3>
                <form id="addUserForm" onSubmit={savestok}>
                <p className='has-text-centered'>{message}</p>
                  <div className="form-group">
                    <select className='form-control' value={id_barang} onChange={handleSelectChange} required>
                {produk.map((prod, index) => (
                    <option value={prod.id}>{prod.nama_produk}</option>
                ))}
                </select>
                  </div>
                  <div className="form-group">
                    <input type="number" id="stok" name="stok" placeholder="stok" aria-label="stok" value={jumlah} onChange={(e) => setjumlah(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <button type="submit">Tambahkan</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-container">
                <h3 className="text-center">Tambah Stok</h3>
                <img src="/img/bg.png" alt="Image" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>      
    );
  }
  
  export default Tambahstokin;