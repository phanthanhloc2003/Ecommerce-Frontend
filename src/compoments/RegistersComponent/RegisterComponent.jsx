import { useForm } from "react-hook-form";
import { logupUser } from "../../services/UserService";
import { useMutaionHooks } from "../../hook/userMutaionHook";
import { useEffect } from "react";
import {  useSnackbar } from 'notistack';

function Register({closeRegisterForm}) {
  const { enqueueSnackbar } = useSnackbar();
  const handleRegisterClick = () => {
    closeRegisterForm()
  }
  const {
    register,
    handleSubmit,
   
  } = useForm();

  const onSubmit = async (value) => {
    await mutation.mutate({ ...value });
  };

 
  const mutation = useMutaionHooks((data) => logupUser(data))

  const {isSuccess ,isError } = mutation
  
  useEffect(() => {
    if(isSuccess){
      enqueueSnackbar('This is a success message!',  { variant: 'success', anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },autoHideDuration: 3000, }); 
      closeRegisterForm()
    }
    else if (isError){
      enqueueSnackbar(`${mutation.error.response.data.message}`,  { variant: 'error', anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },autoHideDuration: 3000, }); 
    }
      },[isSuccess,isError]);
  
    return ( 
        <>
         {/* register form */}
         <div className="from-box register">
              <div className="logreg-title">
                <h2>Rigister</h2>
                <p>Please provide the followwing to verify your identity</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}> 
                <div className="input-box">
                  <span className="icon">
                    <i className="bi bi-person-circle"></i>
                  </span>
                  <input type="text"
               {...register("name")}
                  required name="name" />
                  <label>name</label>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input type="email" 
                    {...register("email")}
                  required name="email" />
                  <label>email</label>
                </div>

                <div className="input-box">
                  <span className="icon">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input type="password" 
                {...register("password")}
                  name="password" required />
                  <label>password</label>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input type="password" 
                     {...register("confirmPassword")}
                  name="confirmPassword" required />
                  <label>confirmPassword</label>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <i className="bi bi-phone"></i>
                  </span>
                  <input type="text" 
                   {...register("phone")}
                  name="phone" required />
                  <label>phone</label>
                </div>

                <div className="remenber-forgot">
                  <label>
                    <input type="checkbox" />
                    agree to the terms & conditions
                  </label>
                  <a href="#/">Forgot password?</a>
                </div>

                <button className="btn">Register</button>
                <div className="logref-link">
                  <p>
                    Already have an account?
                    <a
                      href="#/"
                      onClick={handleRegisterClick}
                      className="register-link"
                    >
                      {" "}
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
        </>
     );
}

export default Register;