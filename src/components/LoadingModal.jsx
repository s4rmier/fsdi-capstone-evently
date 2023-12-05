function LoadingModal({ modalOpen, message }) {
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
