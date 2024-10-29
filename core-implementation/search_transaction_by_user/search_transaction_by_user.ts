import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// Populated with transaction data
export const ledger: core.Transaction[] = [];

// TODO: Get Data from database
export const searchTransactionByUser: handleUnaryCall<
    core.UserId, 
    core.TransactionList
  > = (request, respond) => {
    
    const userID = request.request.user_id;
    
    
    // Gets user ID which is a sender or receiever
      // Code that matches user id of sender and receiever
      const userTransactions = ledger.filter(
        (transaction) =>
          transaction.sender === userID || transaction.receiver === userID,
      );

      // Construct a transaction:List to respond with
      const TransactionList = new core.TransactionList({
        list: userTransactions,
      });

      respond(null, TransactionList);
    
};

