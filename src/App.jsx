import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from './pages/PageNotFound';
import Private from './ui/private';
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from './components/Navbar';
// import Home from './pages/Home';
import Footer from './components/Footer';
import styled from 'styled-components';
import PropertySearch from './pages/PropertySearch';

const AppContainer = styled.div`
  font-family: 'Inter', sans-serif;
`;

function App() {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AppContainer>
          <Navbar />
          <Routes>
            {/* <Route element={<Private />}> */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<PropertySearch />} />
            {/* </Route> */}


            {/* <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="createAdmin" element={<CreateAdmin />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </AppContainer>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
