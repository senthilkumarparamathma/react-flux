import React, { useState, useEffect } from "react";
// import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
// import * as courseApi from "../api/courseApi";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
import { toast } from "react-toastify";

const ManageCourse = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path `/course/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      //courseApi.getCourseBySlug(slug).then((_course) => setCourse(_course));
      setCourse(courseStore.getCourseBySlug(slug));
    }
    // THIS WILL DO UNMOUNT LOGIC
    return () => courseStore.removeChangeListener(onChange);
  }, [courses, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange(event) {
    // debugger;

    // const updatedCourse = { ...course, title: event.target.value };
    // let updatedCourse = { ...course };
    // updatedCourse.title = event.target.value;

    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";
    setErrors(_errors);
    //Form is valid if the error object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    // courseApi.saveCourse(course).then(() => {
    //   props.history.push("/courses");
    //   toast.success("Course Saved. ");
    // });
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      course.id
        ? toast.success("Course Updated. ")
        : toast.success("Course Saved. ");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* <Prompt when={true} message="Are you sure you want to leave?." /> */}
      {/* {props.match.params.slug} */}
    </>
  );
};

export default ManageCourse;
