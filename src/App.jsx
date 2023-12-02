import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventEditor from "./pages/EventEditor";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalState from "../store/globalState";

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/new" element={<EventEditor />} />
          </Routes>

          <Footer />
        </>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
