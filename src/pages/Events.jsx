import React from "react";
import "./events.css";
import EventsDashboard from "../components/EventsDashboard";

function Events() {
  return (
    <main className="events-section container">
      <div className="page-title">
        <h1 className="main-headline">Events Dashboard</h1>
        <p>Create, view, and manage your events</p>
      </div>
      <EventsDashboard />
    </main>
  );
}

export default Events;
