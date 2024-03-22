import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Correct import for Formik
import * as Yup from "yup"; // Correct import for Yup

function App() {
  //form
  const initialValue = {
    title: "",
    postText: "",
    username: ""
  };
  const onSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:8080/posts", data)
      .then((res) => {
        console.log("Data posted to db");
        // Fetch the updated data from the server after posting
        axios.get("http://localhost:8080/posts")
          .then((res) => {
            setPosts(res.data); // Update the posts state with the new data
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      })
      .catch((error) => {
        console.error("Error posting data to db:", error);
      });
  };
  
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(16).required()
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="App">
      {posts && posts.map((el) => (
        <div key={el.id}>
          <h3>{el.title}</h3>
          <p>{el.postText}</p>
          <p>{el.username}</p>
        </div>
      ))}

      <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form>
          <label htmlFor="title">Title</label>
          <ErrorMessage name="title" component="div" />
          <Field name="title" id="title" />
          <label htmlFor="postText">Post</label>
          <ErrorMessage name="postText" component="div" />
          <Field name="postText" id="postText" />
          <label htmlFor="username">Username</label>
          <ErrorMessage name="username" component="div" />
          <Field name="username" id="username" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
