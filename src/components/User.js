import React from 'react';
import './style.css';

function User() {
    return (
      <main>
        <div className="container1">
          <h1>User</h1>
          <div className="search-container">
            <form action="#">
              <div className="search-box">
                <input type="text" placeholder="cari nama user..." name="search" />
                <button type="submit">
                </button>
              </div>
            </form>
          </div>
          <div className="user-cards">
            <div className="user-card" data-user-id="1">
              <img src="../image/01.png" alt="User Image" />
              <p>Name: Sapto Nugroho</p>
              <p>ID: 1</p>
              <button className="delete-button">Hapus</button>
            </div>
            <div className="user-card" data-user-id="2">
              <img src="../image/02.png" alt="User Image" />
              <p>Name: Sapto Nugroho</p>
              <p>ID: 2</p>
              <button className="delete-button">Hapus</button>
            </div>
            <div className="user-card" data-user-id="3">
              <img src="../image/03.png" alt="User Image" />
              <p>Name: Siti Nigrihi</p>
              <p>ID: 3</p>
              <button className="delete-button">Hapus</button>
            </div>
            <div className="user-card" data-user-id="4">
              <img src="../image/jhbj.png" alt="User Image" />
              <p>Name: Sapto Nugroho</p>
              <p>ID: 4</p>
              <button className="delete-button">Hapus</button>
            </div>
          </div>
          <a href="tambahuser.html" className="btn">Tambah User</a>
        </div>
      </main>
    );
  }
  
  export default User;