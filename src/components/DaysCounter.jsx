import React from "react";

function DaysCounter({ date }) {
  const parsedEventDate = new Date(date);
  const currentDate = new Date();

  const differenceMs = parsedEventDate - currentDate;
  const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  let dateCount;

  if (daysLeft == 0) {
    dateCount = <p className="special">Today</p>;
  } else if (daysLeft >= 1) {
    dateCount = (
      <p className="not-important">
        In {daysLeft} Day{daysLeft > 1 ? "s" : ""}
      </p>
    );
  } else {
    dateCount = <p>Done</p>;
  }

  return <>{dateCount}</>;
}

export default DaysCounter;
