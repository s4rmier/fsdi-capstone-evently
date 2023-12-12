import { useContext, useState } from "react";
import DataService from "../services/dataService";
import DataContext from "../../store/dataContext";
import { useNavigate } from "react-router-dom";

export default function DeleteEvent({ id }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const { successLoading, errorLoading } = useContext(DataContext);

  async function submitDeleteRequest() {
    try {
      const response = await DataService.deleteEvent(id);
      if (response.status === 204) {
        setConfirmDelete(false);
        navigate("/events");
        successLoading("Deleted");
      } else {
        handleEventUpdate();
        errorLoading();
      }
    } catch {
      setConfirmDelete(false);
      errorLoading();
    }
  }

  if (confirmDelete) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
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

      <button
        onClick={() => setConfirmDelete(true)}
        className="button delete-event-btn"
      >
        Delete Event <i className="fa-solid fa-trash"></i>
      </button>
    </>
  );
}
