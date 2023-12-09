import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import EventInvitation from "../components/EventInvitation";
import DataService from "../services/dataService";
import LoadingModal from "../components/LoadingModal";
import DataContext from "../../store/dataContext";
import DeleteEvent from "../components/DeleteEvent";

function EventEditor() {
  const navigate = useNavigate();
  const { successLoading, errorLoading } = useContext(DataContext);
  const [loadingIsVisible, setLoadingIsVisible] = useState(false);
  const { eventId } = useParams();

  // Form data

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

  const [galleryImgId, setGalleryImgId] = useState([]);

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

  //  Logic block for checking whether user is creating a new event or editing an existing event
  const [editingEvent, setEditingEvent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    retriveData();
  }, [location.pathname, eventId]);

  async function retriveData() {
    const isEditing = location.pathname.includes("/editor/");

    if (isEditing) {
      setEditingEvent(true);
      if (eventId) {
        await getEventData();
        getEventImages();
      }
    }
  }

  async function getEventData() {
    try {
      setLoadingIsVisible(true);
      const retrievedEventData = await DataService.getEventByID(eventId);
      if (retrievedEventData) {
        setEventData({
          eventTitle: retrievedEventData.eventTitle,
          eventDescription: retrievedEventData.eventDescription,
          eventDate: retrievedEventData.eventDate,
          eventTime: retrievedEventData.eventTime,
          eventAddress: retrievedEventData.eventAddress,
          _id: retrievedEventData.id,
          eventGalleryUrls: ["", "", "", ""],
          eventThumbnail: "",
          eventCover: "",
        });
        // console.log("Event Retrieved: ", retrievedEventData);
        setLoadingIsVisible(false);
      }
    } catch (error) {
      setLoadingIsVisible(false);
      console.log(error);
    }
  }

  async function getEventImages() {
    try {
      // console.log(eventData);

      setLoadingIsVisible(true);
      const retrievedEventImages = await DataService.loadEventImage(eventId);
      if (retrievedEventImages) {
        setEventData((currentData) => ({
          ...currentData,
          eventGalleryUrls: [
            retrievedEventImages[2].image,
            retrievedEventImages[3].image,
            retrievedEventImages[4].image,
            retrievedEventImages[5].image,
          ],
          eventThumbnail: retrievedEventImages[0].image,
          eventCover: retrievedEventImages[1].image,
        }));

        let retreivedImgIds = [];
        retrievedEventImages.forEach((eventImg) => {
          retreivedImgIds.push(eventImg.id);
        });

        setGalleryImgId((prev) => retreivedImgIds);
        // console.log(galleryImgId);

        // console.log("Event Images Retrieved: ", retrievedEventImages);
        setLoadingIsVisible(false);
      }
    } catch (error) {
      setLoadingIsVisible(false);
      console.log(error);
    }
  }

  // PUT Request block when user isEditing an existing event
  async function updateEventData(event, id, updatedData) {
    event.preventDefault();

    try {
      setLoadingIsVisible(true);
      const response = await DataService.updateEventByID(id, updatedData);
      if (response.status === 200) {
        successLoading();
        clearForm();
        setLoadingIsVisible(false);
        navigate("/events");
      } else {
        console.error("Error updating event. Response:", response);
        setLoadingIsVisible(false);
        errorLoading();
      }
    } catch (error) {
      console.log("Error updating event:", error);
      errorLoading();
      setLoadingIsVisible(false);
    }
  }

  // Sending POST request to save the entry to the database

  async function submitEvent(event, eventData) {
    event.preventDefault();

    try {
      setLoadingIsVisible(true);
      const response = await DataService.postEvent(eventData);
      if (response.status === 201) {
        // console.log(response.data);
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
      errorLoading();
      setLoadingIsVisible(false);
    }
  }

  async function uploadImages(eventId) {
    if (eventImageFiles.eventCover) {
      await DataService.uploadImage(eventId, eventImageFiles.eventCover, 1);
    }
    if (eventImageFiles.eventThumbnail) {
      await DataService.uploadImage(eventId, eventImageFiles.eventThumbnail, 2);
    }

    for (let i = 0; i < eventData.eventGalleryUrls.length; i++) {
      const file = galleryFiles[`gallery${i + 1}File`];
      if (eventData.eventGalleryUrls[i] && file) {
        await DataService.uploadImage(eventId, file, 3);
      }
    }
  }

  // Capturing user input

  function handleInputChange(event) {
    let { value } = event.target;
    let { name } = event.target;
    setEventData({ ...eventData, [name]: value });
  }

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

  return (
    <main className="event-editor container flex-col">
      <div className="page-title flex-row align">
        <div>
          <h1 className="main-headline">Event Editor</h1>
          <p>Update, modify, or delete your event</p>
        </div>

        <div className="event-control-panel">
          {editingEvent && <DeleteEvent id={eventId} />}
        </div>
      </div>

      <LoadingModal
        modalOpen={loadingIsVisible}
        message={
          editingEvent ? "Updating, please wait" : "Uploading, please wait"
        }
      />

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
                onClick={
                  editingEvent
                    ? (event) => updateEventData(event, eventId, eventData)
                    : (event) => submitEvent(event, eventData)
                }
                type="submit"
                className="button btn-spec"
              >
                {editingEvent ? "Update" : "Save"}
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
