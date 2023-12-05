import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventEditor from "./pages/EventEditor";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalState from "../store/globalState";
import EventDetailsPage from "./components/EventDetailsPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <>
          <Header />

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/new" element={<EventEditor />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
          </Routes>

          <Footer />
        </>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
