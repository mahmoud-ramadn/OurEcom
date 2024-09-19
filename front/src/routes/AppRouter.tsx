
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoaderFunctionArgs } from 'react-router-dom';
import { lazy, Suspense } from "react";

import { MainLayout } from "@layouts/index"
  

const Home=lazy(()=>import("@pages/Home"))
const Categories = lazy(() => import("@pages/Categories"))
const Products=lazy(()=>import("@pages/Products"))
const AboutUs=lazy(()=>import("@pages/AboutUs"))
const Login=lazy(()=>import("@pages/Login/Login"))
const Register=lazy(()=>import("@pages/Register/Register"))
const Cart = lazy(() => import("@pages/Cart"));
const WishList=lazy(()=>import("@pages/WishList"))

import Error from "@pages/Error"
import PageSupenseFallback from "@components/feedback/PageSuspenseFallback/PageSupenseFallback";
import LottieHandler from "@components/feedback/LottiesHandler/LottieHandler";
import ProtectedRoute from "@components/Auth/ProtectedRoute";
const Orders = lazy(() => import("@pages/Orders"));
const Profile = lazy(() => import("@pages/Profile"));
const ProfileLayout=lazy(()=>import("@layouts/ProfileLayout/ProfileLayout"));



const loader = ({ params }: LoaderFunctionArgs): boolean => {
  if (typeof params.prefix !== "string" || !/^[a-z]+$/i.test(params.prefix)) {
    throw new Response("Bad Request", {
      statusText: 'Category not found',
      status: 400
    });
  }
  return true;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={
        <div style={{ marginTop: '10%' }}>

          <LottieHandler type='loading' message="loading please Wait" />
        </div>
      }>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [{
      index: true,
      element:
        <PageSupenseFallback>
          <Home />

        </PageSupenseFallback>
    },
    {
      path: 'categories',
      element:
        <PageSupenseFallback>
          <Categories />
        </PageSupenseFallback>
    },
    {
      path: 'products/:prefix',

      element:
        <PageSupenseFallback>
          <Products />
        </PageSupenseFallback>

      ,
      loader: loader,
    },
    {
      path: 'about-us',
      element:
        <PageSupenseFallback>

          <AboutUs />
        </PageSupenseFallback>

    },
    {
      path: 'cart',
      element:
        <PageSupenseFallback>

          <Cart />
        </PageSupenseFallback>

    },
    {
      path: 'wishlist',
      element:
        <PageSupenseFallback>

          <WishList />
        </PageSupenseFallback>
       
    },
    {
      path: 'login',
      element:
        <PageSupenseFallback>

          <Login />
        </PageSupenseFallback>

      },
      {
        path: 'register',
        element:
          <PageSupenseFallback>
  
            <Register />
  
          </PageSupenseFallback>
            
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <PageSupenseFallback>
              <ProfileLayout />
            </PageSupenseFallback>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSupenseFallback>
                <Profile />
              </PageSupenseFallback>
            ),
          },
          {
            path: "orders",
            element: (
              <PageSupenseFallback>
                <Orders />
              </PageSupenseFallback>
            ),
          },
      
      
      
        ]
    
      }
  ]}])







const AppRouter = () => {
 



  return (
      

<RouterProvider router={router} />

    

  )
 
}

export default AppRouter