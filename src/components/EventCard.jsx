import React from "react";
import DaysCounter from "./DaysCounter";
import { useEffect, useState } from "react";
import DataService from "../services/dataService";
import DeleteEvent from "./DeleteEvent";
import { Link } from "react-router-dom";

function EventCard({
  eventTitle,
  eventDate,
  eventTime,
  id,
  handleEventUpdate,
}) {
  const [eventImages, setEventImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // getImage();
    loadImage();
  }, []);

  async function loadImage() {
    try {
      let images = await DataService.loadEventImage(id);
      setEventImages(images);
      setLoading(false);
    } catch (error) {
      console.error("Error loading event images:", error);
      setLoading(false);
    }
  }

  function getAssignedImg(imgtype) {
    const foundImage = eventImages.find((image) => image.imgtype === imgtype);
    return foundImage ? foundImage.image : null;
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const formattedDate = formatDate(eventDate);

  return (
    <Link to={`/events/editor/${id}`}>
      <figure className="event-card flex-col">
        <img src={getAssignedImg(1)} alt="" />
        <DeleteEvent handleEventUpdate={handleEventUpdate} id={id} />
        <figcaption className="flex-col">
          <h3>{eventTitle}</h3>
          <div className="event-date flex-row">
            <p>
              <b>Date</b>: {formattedDate} | <b>Time</b>: {eventTime}
            </p>
            <DaysCounter date={eventDate} />
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}

export default EventCard;
