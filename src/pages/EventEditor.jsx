import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventInvitation from "../components/EventInvitation";

function EventEditor() {
  const [eventData, setEventData] = useState({
    eventTitle: "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventAddress: "",
    eventGalleryUrls: ["", "", "", ""],
    eventThumbnail: "",
    eventCover: "",
    userID: "",
    _id: "",
  });

  function handleInputChange(event) {
    let { value } = event.target;
    let { name } = event.target;
    setEventData({ ...eventData, [name]: value });
  }

  function handleGalleryChange(index, event) {
    const { value } = event.target;
    const updatedGalleryUrls = [...eventData.eventGalleryUrls];
    updatedGalleryUrls[index] = value;
    setEventData({ ...eventData, eventGalleryUrls: updatedGalleryUrls });
  }

  return (
    <main className="event-editor container">
      <div className="page-title">
        <h1 className="main-headline">Event Editor</h1>
        <p>Update, modify, or delete your event</p>
      </div>

      <section className="editor-body flex-row justify">
        <form className="flex-row">
          <div className="form-divider flex-col">
            <div className="form-input flex-col">
              <label htmlFor="eventTitle">Event Title: </label>
              <input
                onChange={(event) => handleInputChange(event)}
                value={eventData.eventTitle}
                id="eventTitle"
                name="eventTitle"
                type="text"
                maxLength={28}
                placeholder="Enter event title (max 28 characters)"
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="eventDate">Event Date:</label>
              <input
                name="eventDate"
                onChange={(event) => handleInputChange(event)}
                value={eventData.eventDate}
                type="date"
                id="eventDate"
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="eventTime">Event Time:</label>
              <input
                name="eventTime"
                onChange={(event) => handleInputChange(event)}
                value={eventData.eventTime}
                type="time"
                id="eventTime"
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="eventDescription">Event Description:</label>
              <textarea
                name="eventDescription"
                onChange={(event) => handleInputChange(event)}
                value={eventData.eventDescription}
                id="eventDescription"
                cols="30"
                rows="7"
                maxLength={256}
                placeholder="Enter event description (max 256 characters)"
              ></textarea>
            </div>
          </div>

          <div className="form-divider flex-col">
            <div className="form-input flex-col">
              <label htmlFor="eventAddress">Event Address:</label>
              <input
                name="eventAddress"
                onChange={() => handleInputChange(event)}
                value={eventData.eventAddress}
                type="text"
                id="eventAddress"
                placeholder="Enter the address for the event"
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="coverPhoto">Cover Photo:</label>
              <input
                name="eventCover"
                onChange={(event) => handleInputChange(event)}
                value={eventData.eventCover}
                type="url"
                placeholder="Insert image URL"
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="thumbnailPhoto"> Thumbnail Photo :</label>
              <input
                type="url"
                onChange={(event) => handleInputChange(event)}
                value={eventData.eventThumbnail}
                name="eventThumbnail"
                id="thumbnailPhoto"
                placeholder="Insert image URL"
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="">Gallery Photos:</label>
              <input
                onChange={(event) => handleGalleryChange(0, event)}
                value={eventData.eventGalleryUrls[0]}
                name="gallery1"
                type="url"
                placeholder="Insert image URL"
              />

              <input
                onChange={(event) => handleGalleryChange(1, event)}
                value={eventData.eventGalleryUrls[1]}
                name="gallery2"
                type="url"
                placeholder="Insert image URL"
              />

              <input
                onChange={(event) => handleGalleryChange(2, event)}
                value={eventData.eventGalleryUrls[2]}
                name="gallery3"
                type="url"
                placeholder="Insert image URL"
              />

              <input
                onChange={(event) => handleGalleryChange(3, event)}
                value={eventData.eventGalleryUrls[3]}
                name="gallery4"
                type="url"
                placeholder="Insert image URL"
              />
            </div>

            <div className="button-group flex-row align">
              <Link to="/events">
                <button className="button">Cancel</button>
              </Link>

              <button type="submit" className="button btn-spec">
                Save
              </button>
            </div>
          </div>
        </form>

        <div className="editor-preview flex-col">
          <EventInvitation {...eventData} />
        </div>
      </section>
    </main>
  );
}

export default EventEditor;
