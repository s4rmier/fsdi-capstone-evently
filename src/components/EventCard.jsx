import React from "react";

function EventCard({ eventName, eventDate, eventTime, eventCover }) {
  const parsedEventDate = new Date(eventDate);
  const currentDate = new Date();

  const differenceMs = parsedEventDate - currentDate;
  const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return (
    <figure className="event-card flex-col">
      <img src={eventCover} alt="" />
      <figcaption className="flex-col">
        <h3>{eventName}</h3>
        <div className="event-date flex-row">
          <p>
            <b>Date</b>: {eventDate} | <b>Time</b>: {eventTime}
          </p>
          <p>
            In {daysLeft} day{daysLeft > 1 && "s"}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default EventCard;
