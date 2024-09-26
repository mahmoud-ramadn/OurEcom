import { Footer, Header } from "@components/common";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
const { container, Wrapper  } = styles;

const MainLayout = () => {
  
  const [dark,setDark]=useState(false)

  return (
    <div style={{
      backgroundColor: dark ? "#070326" : '',
      
      color:dark? "white":''
      

    }}  >
<div className={`${container} `}   >
      <Header handl={()=>setDark(!dark)} />
      <div className={Wrapper}>
        <Outlet />
        <Footer />
      </div>
    </div>


    </div>
    
  );
};

export default MainLayout;
