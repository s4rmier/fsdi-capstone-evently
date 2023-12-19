import React, { useContext, useEffect, useState } from "react";
import LoadingModal from "./LoadingModal";
import DataService from "../services/dataService";
import DataContext from "../../store/dataContext";

function EventInvitation({
  eventTitle,
  eventDescription,
  eventDate,
  eventTime,
  eventAddress,
  eventGalleryUrls,
  eventThumbnail,
  eventCover,
  isPublic,
  eventId,
}) {
  const [loadingIsVisible, setLoadingIsVisible] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const placeHolderR = "/placeholder-r.jpg";
  const placeHolderS = "/placeholder-s.jpg";

  const [RSVPData, setRSVPdata] = useState({
    event: eventId,
    name: "",
    contact: "",
    guests: "",
  });

  useEffect(() => {
    setRSVPdata({
      ...RSVPData,
      event: eventId,
    });
  }, [eventId]);

  const { successLoading, errorLoading } = useContext(DataContext);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const parsedDate = new Date(dateString);
    return parsedDate.toLocaleDateString(undefined, options);
  };

  const parsedEventDate = formatDate(eventDate);

  function handleFormChange(event) {
    let { value } = event.target;
    let { name } = event.target;
    setRSVPdata({ ...RSVPData, [name]: value });
  }

  function clearForm() {
    setRSVPdata({
      event: eventId,
      name: "",
      contact: "",
      guests: "",
    });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (isPublic) {
      console.log(RSVPData);
      await submitRSVP(RSVPData);
    } else {
      null;
    }
    setLoadingIsVisible(false);
  }

  async function submitRSVP(guestData) {
    try {
      const response = await DataService.recordRSVP(guestData);
      setLoadingIsVisible(true);
      if (response.status === 201) {
        successLoading("Response received!");
        setLoadingIsVisible(false);
        setHasResponded(true);
      }
      console.log(response);
    } catch (error) {
      errorLoading();
      setLoadingIsVisible(false);
      console.log(error);
    }
  }

  return (
    <div className="event-preview flex-col">
      <div className="coverImg">
        <img src={eventCover || placeHolderR} alt="" />
      </div>
      <LoadingModal
        modalOpen={loadingIsVisible}
        message={"Loading, please wait"}
      />

      <div className="event-title flex-row">
        <img src={eventThumbnail || placeHolderS} alt="" />
        <div className="title-box">
          <h1>{eventTitle || "Event Title"}</h1>
          <p>
            {eventDate ? parsedEventDate : "Event Date"} @{" "}
            {eventTime || "Event Time"}
          </p>
        </div>
      </div>

      <div className="event-description flex-col align justify">
        <p>
          {eventDescription ||
            "Placeholder text serves as temporary content. This phrase fills space until the final text replaces it. It acts as a stand-in, allowing focus on design and layout elements before actual content integration."}
        </p>
      </div>

      <div className="event-gallery">
        <img src={eventGalleryUrls[0] || "/placeholder-g1.jpg"} alt="" />
        <img src={eventGalleryUrls[1] || "/placeholder-g2.jpg"} alt="" />
        <img src={eventGalleryUrls[2] || "/placeholder-g3.jpg"} alt="" />
        <img src={eventGalleryUrls[3] || "/placeholder-g4.jpg"} alt="" />
      </div>

      <div className="event-address flex-row">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5314.6654825415735!2d-115.29767172405441!3d36.16408513545802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8bf848ebc2f17%3A0x917be66e836d425a!2sEmerald%20at%20Queensridge!5e0!3m2!1sen!2sph!4v1700877167668!5m2!1sen!2sph"
          width="65%"
          height="200"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="flex-col">
          <h2>
            <b>Address:</b> {eventAddress || "123 Event St, Las Vegas, NV"}
          </h2>
          <img src="/qr.svg" alt="" />
        </div>
      </div>

      {hasResponded ? (
        <div className="flex-col align justify responseDiv">
          <h2 className="main-headline">
            Thank you, {RSVPData.name || "Anonymous Guest"}! We received your
            response.
          </h2>
          <h3>We'll see you soon!</h3>
        </div>
      ) : (
        <div className="event-rsvp container flex-col">
          <h1 className="main-headline">
            Let us know you're coming {RSVPData.name}
          </h1>
          <form action="" className="flex-col">
            <div className="flex-row align">
              <label htmlFor="">Name : </label>
              <input
                name="name"
                type="text"
                onChange={(event) => handleFormChange(event)}
                value={RSVPData.name}
              />
            </div>
            <div className="flex-row align">
              <label htmlFor="">Contact # : </label>
              <input
                name="contact"
                type="number"
                onChange={(event) => handleFormChange(event)}
                value={RSVPData.contact}
              />
            </div>
            <div className="flex-row align">
              <label htmlFor="">Extra Guests? : </label>
              <input
                name="guests"
                type="number"
                className="qty-input"
                onChange={(event) => handleFormChange(event)}
                value={RSVPData.guests}
              />
            </div>
            <button
              onClick={(event) => handleFormSubmit(event)}
              type="submit"
              className="button btn-spec"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EventInvitation;
