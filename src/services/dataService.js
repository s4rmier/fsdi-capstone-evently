import axios from "axios";

class DataService {
  serverURL = "http://127.0.0.1:8000";

  async getEvents() {
    const response = await axios.get(this.serverURL + "/api/event/");
    console.log(response.data);
    return response.data;
  }

  async loadEventImage(id) {
    const response = await axios.get(
      this.serverURL + `/api/eventImage/${id}/images`
    );
    console.log(response.data);
    return response.data;
  }

  async submitEvent(eventData) {
    try {
      const response = await axios.post(
        this.serverURL + "/api/event/",
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log(response.data);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  }
}

export default new DataService();
