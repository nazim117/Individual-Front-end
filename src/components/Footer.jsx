function Footer(){
    return(
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Get Help</h4>
                <ul>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Returns</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="#"><i className="fab fa-facebook-square"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-whatsapp"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </footer>
    )
}
export default Footer;