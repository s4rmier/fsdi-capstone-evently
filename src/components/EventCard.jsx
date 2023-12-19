import React from "react";
import DaysCounter from "./DaysCounter";
import { useEffect, useState } from "react";
import DataService from "../services/dataService";
import { Link } from "react-router-dom";
import RSVPModal from "./RSVPModal";

function EventCard({ eventTitle, eventDate, eventTime, id }) {
  const [eventImages, setEventImages] = useState([]);
  const [RSVPData, setRSVPData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRSVPModalVisible, setIsRSVPModalVisible] = useState(false);

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

  let totalGuests = 0;

  RSVPData.forEach((guest) => {
    totalGuests += +guest.guests + 1;
  });

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
          <button
            onClick={() => setIsRSVPModalVisible(true)}
            className="button"
          >
            RSVPs
          </button>
          <div className="rsvp-count flex-row align">
            <i className="fa-solid fa-square-check">
              <span>{RSVPData.length || "0"}</span>
            </i>
            <i className="fa-solid fa-users">
              <span>{totalGuests}</span>
            </i>
          </div>
        </div>
        <Link to={`/events/editor/${id}`}>
          <button className="button btn-spec">View</button>
        </Link>
      </div>
      <RSVPModal
        clickHandler={() => setIsRSVPModalVisible(false)}
        isVisible={isRSVPModalVisible}
        RSVPData={RSVPData}
        totalGuests={totalGuests}
      />
    </figure>
  );
}
export default EventCard;
