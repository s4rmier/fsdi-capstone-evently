import React from "react";
import "./events.css";
import EventsDashboard from "../components/EventsDashboard";
import { Link } from "react-router-dom";

function Events() {
  return (
    <main className="events-section container">
      <div className="page-title flex-row align">
        <div>
          <h1 className="main-headline">Events Dashboard</h1>
          <p>Create, view, and manage your events</p>
        </div>
        <Link to="/events/new">
          <button className="button btn-spec">
            Create Event <i className="fa-solid fa-plus"></i>
          </button>
        </Link>
      </div>
      <EventsDashboard />
    </main>
  );
}

export default Events;
