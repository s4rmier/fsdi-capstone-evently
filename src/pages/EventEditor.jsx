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
    isPublic: false,
    userID: "",
    _id: "",
  });

  const [eventImageFiles, setEventImageFiles] = useState({
    eventCover: "",
    eventThumbnail: "",
  });

  const [imageIDs, setImageIDs] = useState({
    coverImgID: "",
    thumbnailImgID: "",
    galleryImgIDs: ["", "", "", ""],
  });

  const [galleryFiles, setGalleryFiles] = useState({
    gallery1File: null,
    gallery2File: null,
    gallery3File: null,
    gallery4File: null,
  });

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

  const [changedCoverImage, setChangedCoverImage] = useState(false);
  const [changedThumbnailImage, setChangedThumbnailImage] = useState(false);
  const [changedGalleryImages, setChangedGalleryImages] = useState([
    false,
    false,
    false,
    false,
  ]);

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
        await getEventImages();
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
        setLoadingIsVisible(false);
      }
    } catch (error) {
      setLoadingIsVisible(false);
    }
  }

  async function getEventImages() {
    try {
      setLoadingIsVisible(true);
      const retrievedImages = await DataService.loadEventImage(eventId);

      if (retrievedImages) {
        let coverImages = retrievedImages.filter(
          (image) => image.imgtype === 1
        );
        let thumbnailImages = retrievedImages.filter(
          (image) => image.imgtype === 2
        );
        let galleryImages = retrievedImages.filter(
          (image) => image.imgtype === 3
        );

        setEventData((prev) => ({
          ...prev,
          eventCover: coverImages[0].image,
          eventThumbnail: thumbnailImages[0].image,
          eventGalleryUrls: [
            galleryImages[0].image,
            galleryImages[1].image,
            galleryImages[2].image,
            galleryImages[3].image,
          ],
        }));

        setImageIDs((prev) => ({
          coverImgID: coverImages[0].id,
          thumbnailImgID: thumbnailImages[0].id,
          galleryImgIDs: [
            galleryImages[0].id,
            galleryImages[1].id,
            galleryImages[2].id,
            galleryImages[3].id,
          ],
        }));
        setLoadingIsVisible(false);
      }
    } catch (error) {
      setLoadingIsVisible(false);
    }
  }

  // PUT Request block when user isEditing an existing event
  async function updateEventData(event, id, updatedData) {
    event.preventDefault();

    try {
      setLoadingIsVisible(true);
      const response = await DataService.updateEventByID(id, updatedData);
      if (response.status === 200) {
        await updateEventImages();
        successLoading();
        clearForm();
        setLoadingIsVisible(false);
        navigate("/events");
      } else {
        setLoadingIsVisible(false);
        errorLoading();
      }
    } catch (error) {
      errorLoading();
      setLoadingIsVisible(false);
    }
  }

  async function updateEventImages() {
    try {
      if (changedCoverImage) {
        console.log("Attempting to delete: ", imageIDs.coverImgID);
        await DataService.deleteImgByImgID(imageIDs.coverImgID);
        if (eventImageFiles.eventCover) {
          await DataService.uploadImage(eventId, eventImageFiles.eventCover, 1);
        }
      }

      if (changedThumbnailImage) {
        console.log("Attempting to delete: ", imageIDs.thumbnailImgID);
        await DataService.deleteImgByImgID(imageIDs.thumbnailImgID);
        if (eventImageFiles.eventThumbnail) {
          await DataService.uploadImage(
            eventId,
            eventImageFiles.eventThumbnail,
            2
          );
        }
      }

      for (let i = 0; i < changedGalleryImages.length; i++) {
        if (changedGalleryImages[i]) {
          console.log("Gallery image at index", i, "has changed");

          if (imageIDs.galleryImgIDs[i]) {
            console.log(
              "Attempting to delete image with ID:",
              imageIDs.galleryImgIDs[i]
            );
            await DataService.deleteImgByImgID(imageIDs.galleryImgIDs[i]);
          }

          const file = galleryFiles[`gallery${i + 1}File`];
          if (file) {
            await DataService.uploadImage(eventId, file, 3);
            console.log("Uploaded new image at index", i);
          }

          const changedGalleryImagesCopy = [...changedGalleryImages];
          changedGalleryImagesCopy[i] = false;
          setChangedGalleryImages(changedGalleryImagesCopy);
        }
      }
    } catch (error) {
      errorLoading();
    }
  }

  // Sending POST request to save the entry to the database

  async function submitEvent(event, eventData) {
    event.preventDefault();

    try {
      setLoadingIsVisible(true);
      const response = await DataService.postEvent(eventData);
      if (response.status === 201) {
        uploadImages(response.data.id);
        successLoading();
        clearForm();
        setLoadingIsVisible(false);
        navigate("/events");
      } else {
        setLoadingIsVisible(false);
      }
    } catch (error) {
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

        const updatedGalleryUrls = [...eventData.eventGalleryUrls];
        updatedGalleryUrls[index] = imageData;
        setEventData({ ...eventData, eventGalleryUrls: updatedGalleryUrls });

        const updatedGalleryFiles = { ...galleryFiles };
        updatedGalleryFiles[`gallery${index + 1}File`] = file;
        setGalleryFiles(updatedGalleryFiles);

        const changedGalleryImagesCopy = [...changedGalleryImages];
        changedGalleryImagesCopy[index] = true;
        setChangedGalleryImages(changedGalleryImagesCopy);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleFileInputChange(event, fieldName) {
    const file = event.target.files[0];

    if (fieldName === "eventThumbnail") {
      setChangedThumbnailImage(true);
    } else if (fieldName === "eventCover") {
      setChangedCoverImage(true);
    }

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

        <div className="event-control-panel flex-row align">
          {editingEvent && <DeleteEvent id={eventId} />}
          {editingEvent && (
            <Link to={`/events/invite/${eventId}`}>
              <button className="button">Share</button>
            </Link>
          )}
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
                onChange={(event) => handleInputChange(event)}
                value={eventData.eventAddress}
                type="text"
                id="eventAddress"
                placeholder="Enter the address for the event"
              />
            </div>

            <div className="form-input flex-col">
              <label htmlFor="coverPhoto">Cover Photo:</label>
              <input
                type="file"
                onChange={(event) => handleFileInputChange(event, "eventCover")}
                name="eventCoverFile"
                accept="image/*"
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
