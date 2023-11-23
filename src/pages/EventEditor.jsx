import React from "react";

function EventEditor() {
  return (
    <main className="event-editor container">
      <div className="page-title">
        <h1 className="main-headline">Event Editor</h1>
        <p>Update, modify, or delete your event</p>
      </div>
      <section className="editor-body flex-row">
        <form className="flex-col" method="">
          <div>
            <label htmlFor="eventTitle">Event Title: </label>
            <input id="eventTitle" type="text" maxLength={64} />
          </div>

          <button type="submit" className="button btn-spec">
            Save
          </button>
        </form>
      </section>
    </main>
  );
}

export default EventEditor;
