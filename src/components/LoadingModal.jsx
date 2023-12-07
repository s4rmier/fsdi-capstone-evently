import { useEffect } from "react";

// This component expects 2 props, a state variable to manage open/close, and a message like "Loading Please Wait"

function LoadingModal({ modalOpen, message }) {
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  return modalOpen ? (
    <div className="loading-modal modal-container">
      <div className="modal-body">
        <img src="/loading.gif" alt="" />
        <h3 className="sub-headline">{message}</h3>
      </div>
    </div>
  ) : null;
}

export default LoadingModal;
