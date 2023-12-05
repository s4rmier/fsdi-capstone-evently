import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventEditor from "./pages/EventEditor";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalState from "../store/globalState";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const successLoading = () => toast("Submitted Successfully");
  const errorLoading = () => toast("Error communicating with the server");

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
            <Route
              path="/events"
              element={
                <Events
                  errorLoading={errorLoading}
                  successLoading={successLoading}
                />
              }
            />
            <Route
              path="/events/new"
              element={<EventEditor successLoading={successLoading} />}
            />
          </Routes>

          <Footer />
        </>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
