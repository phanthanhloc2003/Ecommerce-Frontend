import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "./router";
import { Fragment, useEffect } from "react";
import { isJsonString } from "./untils";
import { jwtDecode } from "jwt-decode";
import { axiosJWT, getDetailsUser, refreshToken } from "./services/UserService";
import { updateUser } from "./redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./compoments/NotificationCompoment/NotificationComponent";
import Account from "./compoments/AccountComponent/AccountComponent";
import Profile from "./pages/ProfilePage/ProfilePage";
import Phone from "./compoments/PhoneComponent/PhoneComponent";
import Email from "./compoments/EmailCompoment/EmailComponent";
import Pass from "./compoments/PassComponnet/PassComponent";
import DefaultComponent from "./compoments/DefaultComponent/DefaultComponent";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const { decoded, storedata } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storedata);
    }
  }, []);

  const handleDecoded = () => {
    let storedata = localStorage.getItem("accsess_token");
    let decoded = {};
    if (storedata && isJsonString(storedata)) {
      storedata = JSON.parse(storedata);
      decoded = jwtDecode(storedata);
    }
    return { decoded, storedata };
  };

  axiosJWT.interceptors.request.use(
    function (config) {
      console.log("token neww")
      const dataTime = Math.floor(Date.now() / 1000);
      const { decoded } = handleDecoded();
      if (decoded.exp < dataTime) {

        let refresh = localStorage.getItem("refresh_token");
        return refreshToken(refresh ? JSON.parse(refresh) : "")
          .then((data) => {
        
            config.headers["token"] = `bearer ${data.data.access_Token}`;
            return config;
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  const handleGetDetailsUser = async (id, token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, token }));
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routers.map((router, index) => {
            const Page = router.component;

            const isCheckAuth = !router.isPrivate || user.isAdmin;

            const Layout = router.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={index}
                path={
                  isCheckAuth && typeof router.path === "string"
                    ? router.path
                    : undefined
                }
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route path="/profile" element={<Profile />}>
            <Route index path="account/edit" element={<Account />} />
            <Route path="account/edit/phone" element={<Phone />} />
            <Route path="notification" element={<Notification />} />
            <Route path="account/edit/email" element={<Email />} />
            <Route path="account/edit/pass" element={<Pass />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
