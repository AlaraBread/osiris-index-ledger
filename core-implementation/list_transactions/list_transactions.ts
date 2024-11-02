import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

var test_list: core.Transaction[] = [
	new core.Transaction({ transaction_id: "00" }),
	new core.Transaction({ transaction_id: "01" }),
	new core.Transaction({ transaction_id: "02" }),
	new core.Transaction({ transaction_id: "03" }),
];

export const listTransactions: handleUnaryCall<
	core.TransactionLimit,
	core.TransactionList
> = (request, respond) => {
	// TODO: configure default transaction limit to be 100
	var limit: number = 100;
	limit = request.request.limit;

	// retreive limit number of transactions from database and assemble into list
	var list_of_transactions: core.Transaction[] = [];
	for (let i = 0; i < limit; i++) {
		// TODO: actually retrieve transactions from database
		try {
			list_of_transactions.push(test_list[i]);
		} catch {
			break;
		}
	}

	respond(
		null,
		new core.TransactionList({
			list: test_list,
		}),
	);
};
