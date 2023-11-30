import React, { useEffect, useState } from "react";
import DataService from "../services/dataService";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
0;
function EventsDashboard() {
  const [dashboardContent, setDashboardContent] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    let events = await DataService.getEvents();
    setDashboardContent(events);
  }

  let emptyDashboard = (
    <div className="empty-dashboard flex-col align justify">
      <p className="sub-headline">You don't have any events. Create one now?</p>
    </div>
  );

  let notEmptyDashboard = dashboardContent.map((eventItem, index) => (
    <EventCard key={index} {...eventItem} />
  ));

  return (
    <section className="events-dashboard flex-col align">
      <div className="event-card-container justify flex-row">
        {dashboardContent.length === 0 ? emptyDashboard : notEmptyDashboard}
      </div>
      <Link to="/events/new">
        <button className="button btn-spec">
          Create Event <i className="fa-solid fa-plus"></i>
        </button>
      </Link>
    </section>
  );
}

export default EventsDashboard;
