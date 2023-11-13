import React from "react"
import { Routes, Route } from 'react-router-dom';
import { HomePage, ArtworkPage, LoginPage, RegisterPage, ProfilePage,CreatePage, NotFoundPage } from './pages';
import {Header} from "./components"
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<HomePage />} />
          <Route path="artwork/:id" element={<ArtworkPage/>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage/>}/>
          <Route path="profile/:id" element={<ProfilePage/>} /> 
          <Route path="create" element={<CreatePage/>} />
          <Route path="*" element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </>
  )
}