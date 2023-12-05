import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventInvitation from "../components/EventInvitation";
import DataService from "../services/dataService";
import LoadingModal from "../components/LoadingModal";

function EventEditor({ successLoading }) {
  const navigate = useNavigate();
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

  const [eventImageFiles, setEventImageFiles] = useState({
    eventCover: "",
    eventThumbnail: "",
  });

  const [galleryFiles, setGalleryFiles] = useState({
    gallery1File: null,
    gallery2File: null,
    gallery3File: null,
    gallery4File: null,
  });

  const [loadingIsVisible, setLoadingIsVisible] = useState(false);

  // Sending POST request to save the entry to the database

  async function submitEvent(event, eventData) {
    event.preventDefault();

    try {
      setLoadingIsVisible(true);
      const response = await DataService.postEvent(eventData);
      if (response.status === 201) {
        console.log(response.data);
        uploadImages(response.data.id);
        successLoading();
        clearForm();
        setLoadingIsVisible(false);
        navigate("/events");
      } else {
        console.log(response.error);
        setLoadingIsVisible(false);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setLoadingIsVisible(false);
    }
  }

  async function uploadImages(eventId) {
    // in series
    if (eventImageFiles.eventCover) {
      await DataService.uploadImage(eventId, eventImageFiles.eventCover, 1);
    }
    if (eventImageFiles.eventThumbnail) {
      await DataService.uploadImage(eventId, eventImageFiles.eventThumbnail, 2);
    }

    // for
    for (let i = 0; i < eventData.eventGalleryUrls.length; i++) {
      const file = galleryFiles[`gallery${i + 1}File`];
      if (eventData.eventGalleryUrls[i] && file) {
        await DataService.uploadImage(
          eventId,
          file,
          3 // Set image type as 3 for all gallery images
        );
        console.log("Successful gallery upload: ", i);
      }
    }
    // in parallel
    // promise.all([a, b])
  }

  // Form Related

  function handleInputChange(event) {
    let { value } = event.target;
    let { name } = event.target;
    setEventData({ ...eventData, [name]: value });
  }

  // function handleGalleryChange(index, event) {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imageData = reader.result;
  //       const updatedGalleryUrls = [...eventData.eventGalleryUrls];
  //       updatedGalleryUrls[index] = imageData;
  //       setEventData({ ...eventData, eventGalleryUrls: updatedGalleryUrls });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // } *Old code to fallback incase below didnt work*

  function handleGalleryChange(index, event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;

        // Update the base64 representation state
        const updatedGalleryUrls = [...eventData.eventGalleryUrls];
        updatedGalleryUrls[index] = imageData;
        setEventData({ ...eventData, eventGalleryUrls: updatedGalleryUrls });

        // Update the file state
        const updatedGalleryFiles = { ...galleryFiles };
        updatedGalleryFiles[`gallery${index + 1}File`] = file;
        setGalleryFiles(updatedGalleryFiles);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleFileInputChange(event, fieldName) {
    const file = event.target.files[0];

    setEventImageFiles({
      ...eventImageFiles,
      [fieldName]: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setEventData({ ...eventData, [fieldName]: imageData });
      };
      reader.readAsDataURL(file);
    }
  }

  function clearForm() {
    setEventData({
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
  }

  return (
    <main className="event-editor container">
      <div className="page-title">
        <h1 className="main-headline">Event Editor</h1>
        <p>Update, modify, or delete your event</p>
      </div>

      <LoadingModal
        modalOpen={loadingIsVisible}
        message={"Uploading, please wait"}
      />

      {/* <button className="button btn-spec" onClick={successLoading}>
        Notification Tester
      </button> */}

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
                required
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
                required
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
                required
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
                required
              ></textarea>
            </div>
          </div>

          <div className="form-divider flex-col">
            <div className="form-input flex-col">
              <label htmlFor="eventAddress">Event Address:</label>
              <input
                name="eventAddress"
                onChange={(event) => handleInputChange(event)}
                value={eventData.eventAddress}
                type="text"
                id="eventAddress"
                placeholder="Enter the address for the event"
                required
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="coverPhoto">Cover Photo:</label>
              <input
                type="file"
                onChange={(event) => handleFileInputChange(event, "eventCover")}
                name="eventCoverFile"
                accept="image/*"
                required
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="thumbnailPhoto"> Thumbnail Photo :</label>
              <input
                type="file"
                onChange={(event) =>
                  handleFileInputChange(event, "eventThumbnail")
                }
                name="eventThumbnailFile"
                id="thumbnailPhoto"
                accept="image/*"
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="">Gallery Photos:</label>
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleGalleryChange(index, event)}
                    name={`gallery${index + 1}File`}
                  />
                </div>
              ))}
            </div>

            <div className="button-group flex-row align">
              <Link to="/events">
                <button className="button">Cancel</button>
              </Link>

              <button
                onClick={(event) => submitEvent(event, eventData)}
                type="submit"
                className="button btn-spec"
              >
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
