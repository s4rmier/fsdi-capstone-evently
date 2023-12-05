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
    try {
      let images = await DataService.loadEventImage(id);
      setEventImages(images);
    } catch (error) {
      console.error("Error loading event images:", error);
    }
  }

  function getAssignedImg(imgtype) {
    if (eventImages.length > 0) {
      const foundImage = eventImages.find((image) => image.imgtype === imgtype);
      return foundImage ? foundImage.image : null;
    } else {
      return null;
    }
  }

  return (
    <figure className="event-card flex-col">
      <img src={getAssignedImg(1)} alt="" />
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
