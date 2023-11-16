import React from "react"
import { Routes, Route } from 'react-router-dom';
import { HomePage, ArtworkPage, LoginPage, RegisterPage, ProfilePage, CreatePage, NotFoundPage, AboutPage, DMCAPage, EtiquettePage, ContactUsPage, SearchPage } from './pages';
import { Header } from "./components"
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="artwork/:id" element={<ArtworkPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="dmca" element={<DMCAPage />} />
          <Route path="etiquette" element={<EtiquettePage />} />
          <Route path="contactUs" element={<ContactUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}