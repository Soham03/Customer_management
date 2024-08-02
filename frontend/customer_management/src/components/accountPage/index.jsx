import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Link,Navigate } from "react-router-dom";
import api from "../../services/api";
const AccountPage = () => {

  const { userLoggedIn } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [filteredAccountIDs, setFilteredAccountIDs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterAccountIDs, setShowFilterAccountIDs] = useState(true);
  const [showDistinctProducts, setDistinctProducts] = useState(false);
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

    setCurrentPage((prevPage) => (direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)));

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
        <div className="border-2 mx-2">
          <h1 className="font-medium mb-3 text-center mt-2">
            List of Active Customers:
          </h1>
          <div className="justify-center flex">
          <table className="border-solid border-2 border-black-600 ">
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
                <tr key={customer._id}>
                  <td className="p-3 border-2 text-center">{customer.name}</td>
                  <td className="p-3 border-2 text-center">
                    {customer.address}
                  </td>
                  <td className="border-2 mx-2">
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
        </div>
        <div className="">
          {showFilterAccountIDs ? (
            <div className="border-2">
              <h1 className="mb-3 font-medium text-center mt-2">
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
                              <Link to={`/transactions/${accountId}/?source=filter`}>
                                {accountId}
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between mt-4 p-2">
                    <button
                      className="border-2 w-[6rem] py-2"
                      onClick={() => handlePageChange("prev")}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                      className="border-2 w-[6rem] py-2"
                      onClick={() => {
                        console.log("next")
                        handlePageChange("next")}}
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
                        PRODUCTS:
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
