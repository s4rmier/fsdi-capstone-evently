import React from "react";
import DaysCounter from "./DaysCounter";

function EventCard({ eventName, eventDate, eventTime, eventCover }) {
  return (
    <figure className="event-card flex-col">
      <img src={eventCover} alt="" />
      <figcaption className="flex-col">
        <h3>{eventName}</h3>
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
