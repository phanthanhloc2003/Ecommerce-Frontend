import { useForm } from "react-hook-form";
import {  useSnackbar } from 'notistack';
import { getDetailsUser, loginUser } from "../../services/UserService";
import { useMutaionHooks } from "../../hook/userMutaionHook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/features/user/userSlice";



function Login({ onCloseLogInForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar();
  const handleLogInClick = () => {
    onCloseLogInForm();
  };
  const mutation = useMutaionHooks((data) => loginUser(data));
  const { data, isSuccess,isError } = mutation;

  
  const {
    register,
    handleSubmit} = useForm();
  const onSubmit = async (data) => {
    await mutation.mutate({ ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('This is a success message!',  { variant: 'success', anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },autoHideDuration: 2000, }); 

      localStorage.setItem("accsess_token",JSON.stringify(data?.access_Token))
      localStorage.setItem("refresh_token",JSON.stringify(data?.refresh_Token))
      if(data?.access_Token){
        const decoded = jwtDecode(data?.access_Token)
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id,data?.access_Token)
        }
      }
      navigate("/");
    }
    else if (isError){
      enqueueSnackbar(`${mutation.error.response.data.message}`,  { variant: 'error', anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },autoHideDuration: 2000, }); 
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id , token) => {
    const res = await getDetailsUser(id , token);
    dispatch(updateUser({...res?.data, token}))
  }
  return (
    <>
      <div className="from-box login">
        <div className="logreg-title">
          <h2>login</h2>
          <p>Please login to use the platform</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box">
            <span className="icon">
              <i className="bi bi-envelope"></i>
            </span>
            <input type="text" {...register("email")} required />
            <label>email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="bi bi-lock"></i>
            </span>
            <input type="password" {...register("password")} required />
            <label>password</label>
          </div>
          <div className="remenber-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#/">Forgot password?</a>
          </div>

          <button className="btn" type="submit">
            login
          </button>
          <div className="logref-link">
            <p>
              Don't have an
              <a href="#/" onClick={handleLogInClick} className="register-link">
                {" "}
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
