


import Admin from "../pages/AdminPage/AdminPage"
import DetailPage from "../pages/DetailPage/DetailPage"
import HomePage from "../pages/HomePage/HomePage"
import LogIn from "../pages/LogInPage/LogInPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import OrderPage from "../pages/OrderPage/OrderPage"
import Payment from "../pages/PaymentPage/paymentPage"
import ProductType from "../pages/ProductTypePage/ProductTypePage"
import ProductsPage from "../pages/ProductsPage/ProductsPage"




export const routers = [
    {
        path: "/",
        component: HomePage,
        isShowHeader: true
    },
    {
        path: "/order",
        component: OrderPage,
        isShowHeader: true
    },
    {
        path: "/products",
        component: ProductsPage,
        isShowHeader: true
    },
    {
        path: "*",
        component: NotFoundPage
    },
    {
        path: "/detail/:id",
        component: DetailPage,
        isShowHeader: true
    },
    {
        path: "/login",
        component: LogIn,
        isShowHeader: false
    },
    {
        path:'/system/admin',
        component: Admin,
        isShowHeader: false,
        isPrivate : true
    },
    {
        path: "product/:type",
        component: ProductType,
        isShowHeader: true
    }   ,
    {
        path: "/payment",
        component: Payment,
        isShowHeader: true
    }   
]