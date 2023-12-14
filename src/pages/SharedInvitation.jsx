import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInvitation from "../components/EventInvitation";
import LoadingModal from "../components/LoadingModal";
import DataService from "../services/dataService";

function SharedInvitation() {
  const { eventId } = useParams();
  const [loadingIsVisible, setLoadingIsVisible] = useState(false);

  const [eventData, setEventData] = useState({
    eventTitle: "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventAddress: "",
    eventGalleryUrls: ["", "", "", ""],
    eventThumbnail: "",
    eventCover: "",
    isPublic: true,
    userID: "",
    _id: "",
  });

  useEffect(() => {
    retrieveData();
  }, [eventId]);

  async function retrieveData() {
    await getEventData();
    await getEventImages();
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
          isPublic: true,
          eventId: eventId,
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
        setLoadingIsVisible(false);
      }
    } catch (error) {
      setLoadingIsVisible(false);
    }
  }

  return (
    <div id="shared-event">
      <LoadingModal
        modalOpen={loadingIsVisible}
        message={"Loading, please wait"}
      />
      <EventInvitation {...eventData} />
    </div>
  );
}

export default SharedInvitation;
