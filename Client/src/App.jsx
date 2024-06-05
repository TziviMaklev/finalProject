import './App.css'
import Home from './components/js/HeaderComp/Home';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import DefaultPage from './components/js/DefaultPage';
import Login from './components/js/EntranceComp/Login';
import SignUp from './components/js/EntranceComp/SignUp';
import Layout from './components/js/Layout'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultPage string={"welcom🥳"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/users/:id/home" element={<Layout />}>
          <Route index element={<Home />} />
         
        </Route>
        <Route path="*" element={<DefaultPage string={"oops the page you want arn't found😚"} />} />
      </Routes >

    </>
  )
}

 export default App
// import {Input} from "@nextui-org/input";
// import React from "react";
// // import {Input} from "@nextui-org/react";

// export default function App() {
//   return (
//     <Input
//       isRequired
//       type="email"
//       label="Email"
//       defaultValue="junior@nextui.org"
//       className=' max-w-xs '

//     />
//   );
// }
