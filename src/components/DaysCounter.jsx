import React from "react";

function DaysCounter({ date }) {
  const parsedEventDate = new Date(date);
  const currentDate = new Date();

  const differenceMs = parsedEventDate - currentDate;
  const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return (
    <>
      {daysLeft >= 0 ? (
        <p>
          In {daysLeft} day{daysLeft > 1 && "s"}
        </p>
      ) : (
        <p className="done">Done</p>
      )}
    </>
  );
}

export default DaysCounter;
