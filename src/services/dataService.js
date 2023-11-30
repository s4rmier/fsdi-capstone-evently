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
}

export default new DataService();
