import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../Axios";
import AddBranchPayment from "./AddBranchPayment";

function PaymentDetails() {
  const { id } = useParams();

  const [openForm, setOpenForm] = useState(false);
  const [payment, setPayment] = useState({});
  const navigate = useNavigate();

  const getPayment = async () => {
    try {
      let { data } = await Axios.get("/payment/" + id);
      setPayment(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePayment = async () => {
    try {
      if (window.confirm("Do you want to delete this payment")) {
        await Axios.delete(`/payment/${id}`);
        setPayment(null);
        navigate("/all-payments");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPayment();
  }, [id]);
  return (
    <div>
      <h1 className="text-center text-[#0F3D3E] font-bold text-3xl">
        Payment Details Page
      </h1>
      {openForm && (
        <AddBranchPayment
          getPayment={getPayment}
          id={id}
          setOpenForm={setOpenForm}
          amount={payment.amount}
        />
      )}

      <div className="flex">
        <div className="bg-[#66BFBF] w-2/4 text-center text-xl mx-auto uppercase text-white my-4 py-4">
          {payment?.paymentName}
        </div>
        <div className="bg-[#66BFBF] w-2/4 text-center text-xl mx-auto text-white my-4 py-4">
          ₹ {payment?.amount}
        </div>
        <div className="bg-[#66BFBF] w-2/4 text-center text-xl mx-auto text-white my-4 py-4">
          <button
            onClick={() => setOpenForm(true)}
            className="bg-white px-8 py-2 rounded-lg text-green-400 hover:bg-green-200"
          >
            add
            <FontAwesomeIcon icon={faAdd} />
          </button>
          <button
            onClick={deletePayment}
            className="bg-white ml-4 px-3 py-2 rounded-lg text-red-400 hover:bg-red-200"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>

      <div className="w-3/4 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-100 dark:bg-[#66BFBF]">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Branch Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Amount Paid
                      </th>{" "}
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Pending Amount
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Remarks
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Paid At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-bg-gray-800 divide-y divide-gray-200 dark:divide-[#66BFBF]">
                    {payment?.paidBranches?.map((paid, index) => (
                      <tr key={index} className=" ">
                        <td className="py-4 px-6 text-sm  text-gray-900 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm  text-gray-900 whitespace-nowrap">
                          {paid.branch?.branchName}
                        </td>
                        <td className="py-4 px-6 text-sm  text-gray-500 whitespace-nowrap">
                          {paid.amount}* {paid.studentCount} (₹
                          {paid.amount * paid.studentCount} )
                        </td>
                        <td className="py-4 px-6 text-sm  text-gray-900 whitespace-nowrap">
                          {payment.amount - paid.amount * paid.studentCount}
                        </td>
                        <td className="py-4 px-6 text-sm  text-gray-900 whitespace-nowrap">
                          {paid.remarks}
                        </td>
                        <td className="py-4 px-6 text-sm  text-gray-900 whitespace-nowrap">
                          {moment(paid.time).format("DD MM YYYY | h:mm:ss a")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
