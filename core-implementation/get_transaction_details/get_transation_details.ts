import { core } from "../../generated/core/core.js";
import { GRPCFunc } from "../../proto.js";

export const GetTransactionDetails: GRPCFunc<core.TransactionId, core.Transaction> = (request, respond) => {
    // TODO: retrieve transaction details
    respond(
		null,
		new core.Transaction({
			transaction_id: "123",
			sender: "me",
			receiver: "you",
			amount: 500,
			timestamp: "2024-10-20T12:00:00Z",
		})
	);
};