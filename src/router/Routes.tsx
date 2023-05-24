import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import Catalog from "../features/catalog/catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import AboutPage from "../features/about/AboutPage";
//import { ContactPage } from "@mui/icons-material";
import ServerError from "../app/errors/ServerError";
import NotFound from "../app/errors/NotFound";
import BasketPage from "../features/basket/BasketPage";
import Login from "../features/account/Login";
import Register from "../features/account/Register";
import ContactPage from "../features/contact/ContactPage";
import CheckoutPage from "../features/checkout/CheckoutPage";
import Order from "../features/orders/Orders";
import Orders from "../features/orders/Orders";
import Inventory from "../features/admin/Inventory";
import CheckoutWrapper from "../features/checkout/CheckputWrapper";
import { useSelector } from "react-redux";

function InventoryRoute() {
    const user = localStorage.getItem('user');
    const parsedUser = user && JSON.parse(user);
    const role = parsedUser?.data?.uloga;
  
    if (role === 'admin') {
      return <Inventory />;
    } else {
      return <Navigate to="/login" />;
    }
  }

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {path:'',element:<HomePage/>},
            {path:'catalog',element:<Catalog/>},
            {path:'catalog/:id',element:<ProductDetails/>},
            {path:'about',element:<AboutPage/>},
            {path:'contact',element:<ContactPage/>},
            {path:'server-error',element:<ServerError/>},
            {path:'not-found',element:<NotFound/>},
            {path:'login',element:<Login/>},
            {path:'register',element: <Register/>},
            {path:'basket', element:<BasketPage/>},
            {path:'checkout',element:<CheckoutWrapper/>},
            {path:'orders',element:<Orders/>},
            {
                path:'inventory',
                element: <InventoryRoute/>
            },
            {path:'*',element:<Navigate replace to='/not-found'/>} 
        ]
    }
])