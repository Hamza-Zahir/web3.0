import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { HiInformationCircle } from "react-icons/hi";
 
import Transaction_card from "./transaction_card";


const Transactions = () => {

  const { Transactoins, CurrentAccount } = useContext(TransactionContext);
  return (
    <div id="Transactions" className="Transactions text-light py-1 my-4 col-xl-11 mx-auto">
      {CurrentAccount ? (<h1 className="text-center my-4 ">Lates Transaction</h1>) : (
        <h1 className="text-center my-4 ">
          Connect your account to see your transactions
        </h1>
      )}
      {
        Transactoins.length && CurrentAccount ? (
          <>
            <div className="row justify-content-center p-0 m-0 mt-2 ">

              {Transactoins.map((tra) => {
                return (
                  <Transaction_card
                    key={tra.id}
                    addressFrom={tra.addressFrom}
                    addressTo={tra.addressTo }
                    amount={tra.amount }
                    message={tra.message }
                    timestamp={tra.timestamp }
                    keyword={tra.keyword} />
                );
              })}
            </div>
          </>
        ) : ("")}
      {(CurrentAccount && !Transactoins.length) ? (
        <div className="info text-light  border border-dark box-sh p-4 my-2 mx-auto col-10 bor-rud d-flex ">
          <span className="icon rounded-circle"><HiInformationCircle fontSize={20} /></span>
          <h5> You have no transactions yet</h5>
        </div>
      ) : ("")
      }

    </div>
  );
};

export default Transactions;
