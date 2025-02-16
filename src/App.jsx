import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from './pages/PageNotFound';
import Private from './ui/private';
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import styled from 'styled-components';
import PropertySearch from './pages/PropertySearch';
import PropertyDetailPage from './pages/PropertyDetailPage ';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddFlat from './pages/AddFlat';
import MediaUploadPage from './pages/MediaUploadPage ';
import UpdateFlat from './pages/UpdateFlat';
import SignupForm from './pages/SignupForm';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './components/AboutUsChoose';


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
            <Route path="/" element={<Home />} />
            <Route element={<Private />}>
              <Route path="/property-search" element={<PropertySearch />} />
              <Route path="/property-detail/:flatId" element={<PropertyDetailPage />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/addFlat" element={<AddFlat />} />
              <Route path="/flat/update/:flatId" element={<UpdateFlat />} />
              <Route path="/upload/flat/:flatId" element={<MediaUploadPage />} />
            </Route>


            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/about" element={<AboutUs />} />
            {/* <Route path="createAdmin" element={<CreateAdmin />} /> */}
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
