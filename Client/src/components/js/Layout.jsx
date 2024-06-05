import Header from "./Header";
import '../css/Outlet.css'
import React from 'react';
import { Outlet ,useParams} from "react-router-dom";
import DefaultPage from "./DefaultPage";

export default function Layout() {
    const keys=Object.keys(localStorage); 
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const {id}=useParams();
    
    return (
        <>
            {keys.length != 0 &&userInfo.user_id==id&&
                <>
                    <Header />
                    <Outlet />
                </>
            }
            {
                keys.length == 0&&<DefaultPage string={"oops you are not login"} />
            }
            {
                userInfo&&userInfo.user_id!=id&&<DefaultPage string={"oops you try to entrance with unone user"} changeUser={true}/>
            }
        </>
    )
}
