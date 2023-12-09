import axios from "axios";

class DataService {
  serverURL = "http://127.0.0.1:8000";

  async getEvents() {
    const response = await axios.get(this.serverURL + "/api/event/");
    return response.data;
  }

  async getEventByID(id) {
    const response = await axios.get(this.serverURL + `/api/event/${id}`);
    return response.data;
  }

  async loadEventImage(id) {
    const response = await axios.get(
      this.serverURL + `/api/eventImage/${id}/images`
    );
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

  async deleteEvent(id) {
    const response = await axios.delete(this.serverURL + `/api/event/${id}/`);
    return response;
  }

  async deleteImgByImgID(id) {
    const response = await axios.delete(
      this.serverURL + `/api/eventImage/${id}`
    );
    return response;
  }

  async updateEventByID(id, updatedData) {
    try {
      const response = await axios.put(
        this.serverURL + `/api/event/${id}/`,
        updatedData
      );
      console.log("Updated successfully: ", response.data);
      return response;
    } catch {
      console.error("Error updating data: ", error);
      throw new Error("Failed to update data");
    }
  }
}
export default new DataService();
