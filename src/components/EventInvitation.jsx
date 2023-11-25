import React from "react";

function EventInvitation({
  eventTitle,
  eventDescription,
  eventDate,
  eventTime,
  eventAddress,
  eventGalleryUrls,
  eventThumbnail,
  eventCover,
}) {
  const placeHolderR = "/placeholder-r.jpg";
  const placeHolderS = "/placeholder-s.jpg";

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const parsedDate = new Date(dateString);
    return parsedDate.toLocaleDateString(undefined, options);
  };

  const parsedEventDate = formatDate(eventDate);

  return (
    <div className="event-preview flex-col">
      <div className="coverImg">
        <img src={eventCover || placeHolderR} alt="" />
      </div>

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

      <div className="event-rsvp container flex-col">
        <h1 className="main-headline">Let us know you're coming</h1>
        <form action="" className="flex-col align">
          <div className="flex-row align">
            <label htmlFor="">Name : </label>
            <input type="text" />
          </div>
          <div className="flex-row align">
            <label htmlFor="">Contact # : </label>
            <input type="number" />
          </div>
          <div className="flex-row align">
            <label htmlFor="">Extra Guests? : </label>
            <input type="" />
          </div>
          <button className="button btn-spec">RSVP</button>
        </form>
      </div>
    </div>
  );
}

export default EventInvitation;
