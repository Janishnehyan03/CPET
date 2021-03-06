import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import StudentDetails from "./StudentDetails";
import SelectedBranch from "./SelectedBranch";
import VerifyDetails from "./VerifyDetails";
import { useNavigate } from "react-router-dom";

function AddStudents() {
  const initialState = {
    studentName: "",
    fatherName: "",
    motherName: "",
    houseName: "",
    dob: "",
    place: "",
    postOffice: "",
    guardian: "",
    district: "",
    state: "",
    pinCode: "",
    aadhar: "",
    phone: "",
    branch: "",
    class: "",
    academicYear: "",
  };

  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [goNext, setGoNext] = useState(false);
  const navigate = useNavigate();
  let currentYear = new Date().getFullYear().toString();
  let nextYear = (new Date().getFullYear() + 1).toString();

  const validate = (values) => {
    let errors = {};
    if (!values.studentName) {
      errors.studentName = "Student Name is required";
    }
    if (!values.fatherName) {
      errors.fatherName = "Father Name is required";
    }
    if (!values.motherName) {
      errors.motherName = "Mother Name is required";
    }
    if (!values.guardian) {
      errors.guardian = "Guardian is required";
    }
    if (!values.dob) {
      errors.dob = "DOB is required";
    }
    if (!values.aadhar) {
      errors.aadhar = "Aadhar Number is required";
    }
    if (!values.district) {
      errors.district = "District is required";
    }
    if (!values.postOffice) {
      errors.postOffice = "Post Office is required";
    }
    if (!values.phone) {
      errors.phone = "Phone Number is required";
    }
    if (!values.state) {
      errors.state = "State is required";
    }
    if (!values.pinCode) {
      errors.pinCode = "Pin Code is required";
    }
    if (!values.houseName) {
      errors.houseName = "House Name is required";
    }
    return errors;
  };

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const nextPage = (e) => {
    e.preventDefault();
    setGoNext(true);
    setFormErrors(validate(formData));
  };
  const prevPage = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/student/register", {
        ...formData,
        academicYear: currentYear + "-" + nextYear,
      });
      if (res.status === 200) {
        setFormData(initialState);
        toast.success("Student Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
        if (formData.class === "mahdiyya-third-year") {
          navigate("/mahdiyya-third/" + res.data._id);
        } else {
          navigate("/admission-created");
        }
      }
    } catch (error) {
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && goNext) {
      setPage(page + 1);
    }
  }, [formErrors]);

  switch (page) {
    case 1:
      return (
        <StudentDetails
          formData={formData}
          onChange={onChange}
          nextPage={nextPage}
          formErrors={formErrors}
        />
      );
    case 2:
      return (
        <SelectedBranch
          formData={formData}
          onChange={onChange}
          nextPage={nextPage}
          prevPage={prevPage}
          setFormData={setFormData}
        />
      );
    case 3:
      return (
        <VerifyDetails
          formData={formData}
          prevPage={prevPage}
          handleSubmit={handleSubmit}
        />
      );
  }
}

export default AddStudents;
