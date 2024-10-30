import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { recordTransaction } from "./record_transaction/record_transaction.js";
// Added (dtd35)
import { searchTransactionByUser } from "./search_transaction_by_user/search_transaction_by_user.js";
import { getAccountBalance } from "./get_account_balance/get_account_balance.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/core/core.proto", "core", "IndexLedger"),
		{
			RecordTransaction: recordTransaction,
			// dtd35
			SearchTransactionsByUser: searchTransactionByUser,
			getAccountBalance: getAccountBalance
		},
	);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
}
