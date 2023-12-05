import { useState } from "react";

import DataService from "../services/dataService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteEvent({ id, handleEventUpdate }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const successLoading = () => toast("Deleted Successfully");
  const errorLoading = () => toast("Error communicating with the server");

  async function submitDeleteRequest() {
    try {
      const response = await DataService.deleteEvent(id);
      if (response.status === 204) {
        handleEventUpdate();
        successLoading();
      } else {
        handleEventUpdate();
        errorLoading();
      }
    } catch {
      console.log(error);
    }
  }
  return (
    <>
      {confirmDelete && (
        <div className="delete-confirmation-modal">
          <div className="confirmation-modal-body flex-col align justify">
            <h3>Are you sure you want to delete this event?</h3>
            <p>This action cannot be undone</p>
            <div>
              <button
                onClick={() => submitDeleteRequest(id)}
                className="button"
              >
                Delete <i className="fa-solid fa-triangle-exclamation"></i>
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={() => setConfirmDelete(true)}
        className="button delete-event-btn"
      >
        <i className="fa-solid fa-trash"></i>
      </div>
    </>
  );
}
