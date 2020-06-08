import React, { useState, useEffect } from "react";
// import { getCourses } from "../api/courseApi";
import courseStore from "../stores/courseStore";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CoursesPage() {
  //const [courses, setCourses] = useState([]);
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    //  getCourses().then((result) => setCourses(result));
    //  setCourses(courseStore.getCourses());

    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();

    // THIS WILL DO UNMOUNT LOGIC
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleDeleteCourse(id) {
    //console.log(id);
    deleteCourse(id);
    toast.warn("Course Deleted.");
    //debugger;
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} onDeleteCourse={handleDeleteCourse} />
    </>
  );
}

/*
class CoursesPage extends React.Component {
  state = { courses: [] };

  componentDidMount() {
    getCourses().then((result) => this.setState({ courses: result }));
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author ID</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map((course) => {
              return (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.authorId}</td>
                  <td>{course.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
*/

export default CoursesPage;
