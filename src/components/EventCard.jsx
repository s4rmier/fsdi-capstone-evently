import React from "react";
import DaysCounter from "./DaysCounter";
import { useEffect, useState } from "react";
import DataService from "../services/dataService";

function EventCard({ eventTitle, eventDate, eventTime, id }) {
  const [eventImages, setEventImages] = useState([]);

  useEffect(() => {
    getImage();
  }, []);

  async function getImage() {
    let eventCover = await DataService.loadEventImage(id);
    setEventImages(eventCover);
  }

  function getCoverImage() {
    if (eventImages?.length < 1) {
      return "";
    }

    return eventImages[0].image;
  }

  return (
    <figure className="event-card flex-col">
      <img src={getCoverImage()} alt="" />
      <figcaption className="flex-col">
        <h3>{eventTitle}</h3>
        <div className="event-date flex-row">
          <p>
            <b>Date</b>: {eventDate} | <b>Time</b>: {eventTime}
          </p>
          <DaysCounter date={eventDate} />
        </div>
      </figcaption>
    </figure>
  );
}

export default EventCard;
