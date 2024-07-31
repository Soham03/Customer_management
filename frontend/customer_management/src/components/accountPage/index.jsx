import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

import axios from "axios";
import { Link,Navigate } from "react-router-dom";
import api from "../../services/api";
const AccountPage = () => {
  const { userLoggedIn } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [filteredAccountIDs, setFilteredAccountIDs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterAccountIDs, setShowFilterAccountIDs] = useState(false);
  const [showDistinctProducts, setDistinctProducts] = useState(true);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.log("Error fetching customers", error);
      }
    };
    fetchCustomers();

    const distinctProducts = async () => {
      try {
        const response = await api.get("/distinct-products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching customers", error);
      }
    };
    distinctProducts();
  }, []);

  useEffect(() => {
    const fetchFilteredAccounts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(
          `/below-amount?page=${currentPage}&limit=${itemsPerPage}`
        );
        setFilteredAccountIDs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching filtered accounts", error);
        setIsLoading(false);
      }
    };

    if (showFilterAccountIDs) {
      fetchFilteredAccounts();
    }
  }, [showFilterAccountIDs, currentPage, itemsPerPage]);

  const handleTransactionFilter = () => {
    setShowFilterAccountIDs(true);
    setDistinctProducts(false);
  };

  const handleProductsFilter = () => {
    setDistinctProducts(true);
    setShowFilterAccountIDs(false);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next") return prevPage + 1;
      if (direction === "prev") return Math.max(prevPage - 1, 1);
      return prevPage;
    });
  };
  return (
    <div className="m-[10rem]">
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      <div className="flex justify-center">
        <button
          className="border-2 p-2 my-5 border-radius-5 mx-2 "
          onClick={handleProductsFilter}
        >
          Distinct Products List
        </button>
        <button
          className="border-2 p-2 my-5 border-radius-5 mx-2"
          onClick={handleTransactionFilter}
        >
          Transactions Below 5000
        </button>
      </div>
      <div className="grid grid-cols-2">
        <div className="">
          <h1 className="font-medium mb-3 text-center">
            List of Active Customers:
          </h1>
          <table className="border-solid border-2 border-black-600">
            <thead>
              <tr
                key={Math.random() * 10 + 5}
                className="border-solid border-2 border-black-600"
              >
                <th className="p-3 font-medium border-r-2">NAME</th>
                <th className="p-3 font-medium border-r-2">ADDRESS</th>
                <th className="p-3 font-medium border-r-2">ACCOUNTS</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((customer) => (
                <tr key={Math.random() * 10}>
                  <td className="p-3 border-2 text-center">{customer.name}</td>
                  <td className="p-3 border-2 text-center">
                    {customer.address}
                  </td>
                  <td className="border-2">
                    {customer.accounts.map((account) => (
                      <div className="p-3 text-center" key={account}>
                        <Link to={`/transactions/${account}`}>{account}</Link>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="">
          {showFilterAccountIDs ? (
            <div className="border-2 p-2">
              <h1 className="mb-3 font-medium text-center">
                Account IDs whose at least one transaction amount is lesser than
                5000:
              </h1>
              {isLoading ? (
                <h1 className="flex justify-center">Loading...</h1>
              ) : (
                <>
                  <div className="flex justify-center">
                    <table className="border-solid border-2 border-black-600">
                      <thead>
                        <tr
                          key={Math.random() * 10}
                          className="border-solid border-2 border-black-600"
                        >
                          <th className="p-3 font-medium border-r-2 text-center">
                            Account IDs:
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center ">
                        {filteredAccountIDs.map((accountId) => (
                          <tr key={Math.random() * 10}>
                            <td className="p-3 border-2 ">
                              <Link to={`/transactions/${accountId}`}>
                                {accountId}
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      className="border-2 p-2"
                      onClick={() => handlePageChange("prev")}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                      className="border-2 p-2"
                      onClick={() => handlePageChange("next")}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="">
              <div className="mb-3 font-medium text-center">
                Distinct List of Products:
              </div>
              <div className="flex justify-center">
                <table className="border-solid border-2 border-black-600 ">
                  <thead>
                    <tr
                      key={Math.random() * 10}
                      className="border-solid border-2 border-black-600"
                    >
                      <th className="p-3 font-medium border-r-2 text-center">
                        Account IDs:
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center ">
                    {products?.map((product) => (
                      <tr key={Math.random() * 10}>
                        <td className="p-3 border-2 ">
                          <h1>{product}</h1>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
