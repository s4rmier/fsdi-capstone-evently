import React from "react";

function EventPreview({
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
    </div>
  );
}

export default EventPreview;
