import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";

function AllBranchCard() {
  const [branches, setBranches] = useState([]);

  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get("/branch");
      setBranches(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBranches();
  }, []);
  return (
    <>
      <div className="w-full items-center px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-4">
        {branches.length === 0 ? (
          <Loading />
        ) : (
          branches.map((item, key) => (
            <>
              <Link
                to={item._id}
                key={key}
                className="m-2 items-center"
              >
                <div className="bg-gray-900 rounded-xl   duration-300 shadow-xl group">
                  <img
                    src={item?.image}
                    alt="image"
                    className="w-full rounded-t-xl max-h-40"
                  />

                  <h1 className="text-xl text-center font-bold text-white my-4 group-hover:text-gray-50">
                    {item.branchName}
                  </h1>
                </div>
              </Link>
            </>
          ))
        )}
      </div>
    </>
  );
}

export default AllBranchCard;
