import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Home from "./components/Home";

import Toko from "./components/toko/Toko";
import TambahToko from "./components/toko/Ttoko";
import Updatetoko from "./components/toko/Utoko";

import Pemasok from "./components/pemasok/Pemasok";
import TambahPemasok from "./components/pemasok/Tpemasok";
import UpdatePemasok from "./components/pemasok/Upemasok";

import Pelanggan from "./components/pelanggan/Pelanggan";
import Tambahpelanggan from "./components/pelanggan/Tpelanggan";
import Updatepelanggan from "./components/pelanggan/Upelanggan";

import Produk from "./components/produk/Produk";
import Tambahproduk from "./components/produk/Tproduk";
import Updateproduk from "./components/produk/Uproduk";


import Stokin from "./components/stok/Stokin";
import Tambahstokin from "./components/stok/Tstokin";
import Stokout from "./components/stok/Stokout";
import Tambahstokout from "./components/stok/Tstokout";


import User from "./components/user/User";
import Updateuser from "./components/user/Uuser";
import Tambahuser from "./components/user/Tuser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/dashboard" element={<><Navbar/> <Home/></>} />
        
        <Route exact path="/user" element={<><Navbar/> <User/> <Footer /></>} />
        <Route exact path="/tambahuser" element={<><Navbar/> <Tambahuser/> <Footer /></>} />
        <Route exact path="/updateuser/:id" element={<><Navbar/> <Updateuser/> <Footer /></>} />

        <Route exact path="/toko" element={<><Navbar/> <Toko /> <Footer /></>} />
        <Route exact path="/tambahtoko" element={<><Navbar/> <TambahToko /> <Footer /></>} />
        <Route exact path="/updatetoko/:id" element={<><Navbar/> <Updatetoko /> <Footer /></>} />

        <Route exact path="/pemasok" element={<><Navbar/> <Pemasok /> <Footer /></>} />
        <Route exact path="/tambahpemasok" element={<><Navbar/> <TambahPemasok /> <Footer /></>} />
        <Route exact path="/updatepemasok/:id" element={<><Navbar/> <UpdatePemasok /> <Footer /></>} />

        <Route exact path="/pelanggan" element={<><Navbar/> <Pelanggan /> <Footer /></>} />
        <Route exact path="/tambahpelanggan" element={<><Navbar/> <Tambahpelanggan /> <Footer /></>} />
        <Route exact path="/updatepelanggan/:id" element={<><Navbar/> <Updatepelanggan /> <Footer /></>} />

        <Route exact path="/produk" element={<><Navbar/> <Produk /> <Footer /></>} />
        <Route exact path="/tambahproduk" element={<><Navbar/> <Tambahproduk /> <Footer /></>} />
        <Route exact path="/updateproduk/:id" element={<><Navbar/> <Updateproduk /> <Footer /></>} />

        <Route exact path="/stokin" element={<><Navbar/> <Stokin /> <Footer /></>} />
        <Route exact path="/tambahstokin" element={<><Navbar/> <Tambahstokin /> <Footer /></>} />
        <Route exact path="/stokout" element={<><Navbar/> <Stokout /> <Footer /></>} />
        <Route exact path="/tambahstokout" element={<><Navbar/> <Tambahstokout /> <Footer /></>} />

        <Route exact path="/home" element={ <Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
