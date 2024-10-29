/*

Source for comments: https://chatgpt.com/share/67213342-70c0-8003-91ef-8b6c29b25934

*/


import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// Populated with transaction data - This acts as an in-memory database for transaction records.
export const ledger: core.Transaction[] = [];

// TODO: Integrate with a real database to retrieve data instead of using the in-memory ledger.
export const searchTransactionByUser: handleUnaryCall<
    core.UserId, 
    core.TransactionList
  > = (request, respond) => {
    
    // Extract the user ID from the incoming request.
    const userID = request.request.user_id;
    
    // Filter transactions by user ID - retrieves transactions where the user is either the sender or receiver.
    const userTransactions = ledger.filter(
      (transaction) =>
        transaction.sender === userID || transaction.receiver === userID,
    );

    // Create a TransactionList response object with the filtered transactions.
    const TransactionList = new core.TransactionList({
      list: userTransactions,
    });

    // Send the response back to the client with the TransactionList data.
    respond(null, TransactionList);
};
