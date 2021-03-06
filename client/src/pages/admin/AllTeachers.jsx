import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import { UserAuthContext } from "../../context/user";

function AllTeachers() {
  const [teachers, setTeachers] = useState([]);
  const { authData } = useContext(UserAuthContext);

  const getAllTeachers = async () => {
    try {
      let url;
      url =
        authData.role === "superAdmin" ? "/teacher" : "/teacher/my-teachers";
      let { data } = await Axios.get(url);
      setTeachers(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteTeacher = async (teacherId) => {
    try {
      if (window.confirm("Do you want to delete teacher")) {
        await Axios.delete(`/teacher/${teacherId}`);
        getAllTeachers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTeachers();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
          All Teachers
        </h3>{" "}
        <div className="w-full mx-auto">
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {teachers.length > 0 ? <TeacherTable /> : <Loading />}
              <div className="overflow-hidden h-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function TeacherTable() {
    return (
      <div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      USERNAME
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      BRANCH
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      EDIT
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      DELETE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {teacher.teacherName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {teacher.branch?.branchName}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link
                          to={"/edit-teacher/" + teacher._id}
                          className={" cursor-pointer"}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </td>
                      <td
                        onClick={() => deleteTeacher(teacher._id)}
                        className="text-sm text-red-600 font-light px-6 py-4 whitespace-nowrap "
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={"cursor-pointer"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllTeachers;
