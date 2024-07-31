import React, { useState, useEffect } from "react";
import {useAuth} from "../../context/authContext"
import axios from "axios";
import { useParams,Navigate } from "react-router-dom";
import api from "../../services/api";
const TransactionPage = () => {
    const { userLoggedIn } = useAuth();

  const { accountId } = useParams();
  const [transactionInfo, setTransactionDetails] = useState(null);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/${accountId}/transactions`);
        console.log(response.data[0]);
        setTransactionDetails(response.data[0]);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [accountId]);

  return (
    <div className="m-[5rem]">
         {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      <h1 className="m-5 font-semiBold text-center text-3xl">
        TRANSACTIONS FOR ACCOUNT NO: {accountId}
      </h1>
      <ul className="flex justify-center p-5">
        <table className=" border-collapse">
          <thead className="">
            <tr className="border border-gray-300 ">
              <th className="bg-gray-100 p-2 text-gray-700 font-semibold border border-gray-300 text-center">
                Amount
              </th>
              <th className="bg-gray-100 p-2 text-gray-700 font-semibold border border-gray-300 text-center ">
                Date
              </th>
              <th className="bg-gray-100 p-2 text-gray-700 font-semibold border border-gray-300 text-center  ">
                Price
              </th>
              <th className="bg-gray-100 p-2 text-gray-700 font-semibold border border-gray-300 text-center  ">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="">
            {transactionInfo?.transactions?.map((transaction, index) => (
              <tr
                key={index}
                className="bg-white border border-gray-300"
              >
                <td className="p-2 border border-gray-300 text-left ">
                  {transaction.amount}
                </td>
                <td className="p-2 border border-gray-300 text-left ">
                {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-300 text-left ">
                  {parseFloat(transaction.price).toFixed(3)}
                </td>
                <td className="p-2 border border-gray-300 text-left ">
                  {parseFloat(transaction.total).toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
    </div>
  );
};

export default TransactionPage;
