import React from "react";
import DaysCounter from "./DaysCounter";
import { useEffect, useState } from "react";
import DataService from "../services/dataService";
import { Link } from "react-router-dom";

function EventCard({ eventTitle, eventDate, eventTime, id }) {
  const [eventImages, setEventImages] = useState([]);
  const [RSVPData, setRSVPData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    await loadImage();
    await loadRSVPData();
  }

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

  async function loadRSVPData() {
    try {
      let response = await DataService.getResponses(id);
      setRSVPData(response);
    } catch (error) {
      console.log(error);
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
    <figure className="event-card flex-col">
      <img src={getAssignedImg(1)} alt="" />
      <figcaption className="flex-col">
        <h3>{eventTitle}</h3>
        <div className="event-date flex-row">
          <p>
            <b>Date</b>: {formattedDate} | <b>Time</b>: {eventTime}
          </p>
          <DaysCounter date={eventDate} />
        </div>
      </figcaption>
      <div className="card-panel flex-row align">
        <div className="rsvpdata flex-row align">
          <button className="button">RSVPs</button>
          <h4>
            <i className="fa-solid fa-square-check">
              <span>{RSVPData.length || "0"}</span>
            </i>
          </h4>
        </div>
        <Link to={`/events/editor/${id}`}>
          <button className="button btn-spec">View</button>
        </Link>
      </div>
    </figure>
  );
}
export default EventCard;
