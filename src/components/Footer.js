import React from 'react';
import './style.css';

function Footer() {
    return (
        <main>
        <footer className="text-center text-lg-start text-muted" style={{ backgroundColor: '#b99470' }}>
  <div className="container">
    {/* Section: Links  */}
    <section className="mt-5">
      <div className="row">
        {/* Grid column */}
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold"><i className="fas fa-gem me-3"></i>Ibob</h6>
          <p>Ibob Inventory</p>
        </div>
        {/* Grid column */}
      
        {/* Grid column */}
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold">Contact</h6>
          <p><i className="fas fa-home me-3"></i>Tambakboyo, Condongcatur</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            info@example.com
          </p>
          <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
          <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
        </div>
        {/* Grid column */}
      </div>
      {/* Grid row */}
    </section>
    {/* Section: Links  */}
  </div>

  {/* Footer */}
  <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
    © 2021 Copyright:
    <a className="text-reset fw-bold" href="#">IBOB </a>
  </div>
  {/* Footer */}
</footer>
        </main>
      
    );
  }
  
  export default Footer;