import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { HiInformationCircle } from "react-icons/hi";

import Transaction_card from "./transaction_card";

const Transactions = () => {
  const { Transactoins, CurrentAccount } = useContext(TransactionContext);
  return (
    <div
      id="Transactions"
      className="Transactions text-light py-1 my-4 col-xl-11 mx-auto"
    >
      {!CurrentAccount && !Transactoins.length ? (
        <div className="info text-light  border border-dark box-sh p-4 my-2 mx-auto col-10 bor-rud d-flex ">
          <span className="icon rounded-circle">
            <HiInformationCircle fontSize={20} />
          </span>
          <h5>
            Please connect your account and switch to ropsten test network to
            see last transactions
          </h5>
        </div>
      ) : (
        ""
      )}
      {CurrentAccount && !Transactoins.length ? (
        <div className="info text-light  border border-dark box-sh p-4 my-2 mx-auto col-10 bor-rud d-flex ">
          <span className="icon rounded-circle">
            <HiInformationCircle fontSize={20} />
          </span>
          <h5>
            {" "}
            Please switch to ( Ropsten Test Network) to see last transactions
          </h5>
        </div>
      ) : (
        ""
      )}
      {CurrentAccount && Transactoins.length ? (
        <h1 className="text-center my-4 ">Last Transaction</h1>
      ) : (
        ""
      )}
      {Transactoins.length ? (
        <div>
          <div className="row justify-content-center p-0 m-0 mt-2 ">
            {Transactoins.map((tra) => {
              return (
                <Transaction_card
                  key={tra.id}
                  addressFrom={tra.addressFrom}
                  addressTo={tra.addressTo}
                  amount={tra.amount}
                  message={tra.message}
                  timestamp={tra.timestamp}
                  keyword={tra.keyword}
                />
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Transactions;
