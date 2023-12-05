import React, { useEffect, useState } from "react";
import DataService from "../services/dataService";
import EventCard from "./EventCard";

function EventsDashboard() {
  const [dashboardContent, setDashboardContent] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    let events = await DataService.getEvents();
    setDashboardContent(events);
  }

  const handleEventUpdate = () => {
    loadData();
  };

  // UI Related

  let emptyDashboard = (
    <div className="empty-dashboard flex-col align justify">
      <p className="sub-headline">You don't have any events. Create one now?</p>
    </div>
  );

  let notEmptyDashboard = dashboardContent.map((eventItem, index) => (
    <EventCard
      handleEventUpdate={handleEventUpdate}
      key={index}
      {...eventItem}
    />
  ));

  return (
    <section className="events-dashboard flex-col align">
      <div className="event-card-container justify flex-row">
        {dashboardContent.length === 0 ? emptyDashboard : notEmptyDashboard}
      </div>
    </section>
  );
}

export default EventsDashboard;
