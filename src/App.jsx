import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import EventEditor from "./pages/EventEditor";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalState from "../store/globalState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedInvitation from "./pages/SharedInvitation";
import BlogDetails from "./components/BlogDetails";

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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/events/new" element={<EventEditor />} />
            <Route path="/events/editor/:eventId" element={<EventEditor />} />
            <Route
              path="/events/invite/:eventId"
              element={<SharedInvitation />}
            />
          </Routes>

          <Footer />
        </>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
