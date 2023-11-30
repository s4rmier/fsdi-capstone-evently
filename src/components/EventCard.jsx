import React from "react";
import DaysCounter from "./DaysCounter";
import { useEffect, useState } from "react";
import DataService from "../services/dataService";

function EventCard({ title, date, time, id }) {
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
        <h3>{title}</h3>
        <div className="event-date flex-row">
          <p>
            <b>Date</b>: {date} | <b>Time</b>: {time}
          </p>
          <DaysCounter date={date} />
        </div>
      </figcaption>
    </figure>
  );
}

export default EventCard;
