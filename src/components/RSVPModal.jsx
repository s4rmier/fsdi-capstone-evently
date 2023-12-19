import React from "react";

function RSVPModal({ isVisible, RSVPData, clickHandler, totalGuests }) {
  return isVisible ? (
    <div id="rsvp-modal" className="flex-col">
      <div className="modal-title flex-row">
        <div>
          <h3>RSVP Responses</h3>
          <p>Unofficial Guest List</p>
        </div>
        <div className="flex-row align">
          <i className="fa-solid fa-users">
            <span>{totalGuests}</span>
          </i>
          <button onClick={clickHandler} className="button">
            Close
          </button>
        </div>
      </div>
      {RSVPData.map((response) => (
        <div className="guest-info" key={response.id}>
          <h3>{response.name}</h3>
          <div className="flex-row align">
            <p>
              <i className="fa-solid fa-phone">
                <span>{response.contact}</span>
              </i>
            </p>
            <i className="fa-solid fa-user-plus">
              <span>{response.guests}</span>
            </i>
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

export default RSVPModal;
