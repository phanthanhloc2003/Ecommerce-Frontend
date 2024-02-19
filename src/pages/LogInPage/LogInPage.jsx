import { useState } from "react";
import "../LogInPage/login.css";

import Register from "../../compoments/RegistersComponent/RegisterComponent";
import Login from "../../compoments/LogInCompoment/LogInComponent";

function LogIn() {
  const [isWrapperActive, setIsWrapperActive] = useState(false);


  const closeRegisterForm = () => {
    setIsWrapperActive(false);
  };

  const closeLogInForm = () => {
    setIsWrapperActive(true);
  };


  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          logo{" "}
        </a>
        <nav className="navbar">
          <a href="#/">home</a>
          <button className="btnLogin-popup">Login</button>
        </nav>
      </header>

      <section className="section">
        <div className={`wrapper ${isWrapperActive ? "active" : ""}`}>
          <a href="/" className="icon-close">
            <i className="bi bi-x-circle"></i>
          </a>
          <div className="logreg-box">
            {/* login form */}
            <Login onCloseLogInForm={closeLogInForm}  />

            <Register closeRegisterForm={closeRegisterForm} />
          </div>
          <div className="media-options">
            <a href="#/">
              <span>
                <i className="bi bi-google"></i>
                Login with Google
              </span>
            </a>
            <a href="#/">
              <span>
                <i className="bi bi-facebook"></i>
                Login with Facebook
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default LogIn;
