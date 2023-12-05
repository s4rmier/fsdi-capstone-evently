import axios from "axios";

class DataService {
  serverURL = "http://127.0.0.1:8000";

  async getEvents() {
    const response = await axios.get(this.serverURL + "/api/event/");
    return response.data;
  }

  async loadEventImage(id) {
    const response = await axios.get(
      this.serverURL + `/api/eventImage/${id}/images`
    );
    console.log("load event image", response.data);
    return response.data;
  }

  async postEvent(eventData) {
    const response = await axios.post(
      this.serverURL + "/api/event/",
      eventData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }

  async uploadImage(eventId, file, imgType) {
    const formdata = new FormData();
    formdata.append("event", eventId);
    formdata.append("image", file);
    formdata.append("imgtype", imgType);

    const response = await axios.post(
      this.serverURL + "/api/eventImage/",
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }
}
export default new DataService();
