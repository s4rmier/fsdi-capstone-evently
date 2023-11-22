import React, { useEffect, useState } from "react";
import dataService from "../services/dataService";
import EventCard from "./EventCard";

function EventsDashboard() {
  const [dashboardContent, setDashboardContent] = useState([]);

  function loadData() {
    const data = dataService.getList();
    setDashboardContent(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  let emptyDashboard = (
    <div className="empty-dashboard flex-col align justify">
      <p className="sub-headline">You don't have any events. Create one now?</p>
    </div>
  );

  let notEmptyDashboard = dashboardContent.map((event, index) => (
    <EventCard key={index} {...event} />
  ));

  return (
    <section className="events-dashboard flex-col align">
      <div className="event-card-container justify flex-row">
        {dashboardContent.length === 0 ? emptyDashboard : notEmptyDashboard}
      </div>
      <button className="button btn-spec">
        Create Event <i className="fa-solid fa-plus"></i>
      </button>
    </section>
  );
}

export default EventsDashboard;
