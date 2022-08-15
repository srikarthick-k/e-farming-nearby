import React, { Fragment, useState } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI
import { TextareaAutosize } from "@mui/material";
import { Button } from "@mui/material";

// toast.configure()
const Feedback = () => {
  document.title = "Feedback";
  const [feedback, setFeedback] = useState("");
  const uid = localStorage.getItem("uid");

  const feedbackChange = (e) => {
    setFeedback(e.target.value);
  };
  const onSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const body = { uid, feedback };
      const response = await fetch("http://localhost:4000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status === 202) {
        toast.success("Thank you for your feedback", {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          window.location = "/category";
        }, 1000);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  document.title = "Feedback";
  return (
    <Fragment>
      <Navbar />
      <center>
        <h1>Feedback</h1>
        <form onSubmit={onSubmitFeedback}>
          <TextareaAutosize
            minRows={10}
            placeholder="Description"
            style={{ width: 200 }}
            value={feedback}
            onChange={feedbackChange}
            maxLength={500}
            required
          />{" "}
          <br />
          <Button type="submit" id="btn">
            SUBMIT
          </Button>
        </form>
      </center>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default Feedback;
