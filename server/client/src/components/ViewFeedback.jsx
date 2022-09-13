import React, { Fragment, useState, useEffect } from "react";
import "../style.css"

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const renderFeedback = async () => {
    try {
      const response = await fetch("/feedback", {
        method: "GET",
      });
      const jsonData = await response.json();
      setFeedback(jsonData.rows);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    renderFeedback();
  }, []);

  console.log(feedback);
  return (
    <Fragment>
        <center>
            <h2>FEEDBACKS</h2>
        </center>
      <ul>
        {feedback.map((feed) => (
          <li key={feed.id} className="card-style" >{feed.feed}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ViewFeedback;
