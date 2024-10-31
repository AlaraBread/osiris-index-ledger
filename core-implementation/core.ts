import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { recordTransaction } from "./record_transaction/record_transaction.js";
import { GetTransactionDetails } from "./get_transaction_details/get_transaction_details.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
	addService(
		server,
		loadProtoService("proto/core/core.proto", "core", "IndexLedger"),
		{
			RecordTransaction: recordTransaction,
			GetTransactionDetails: GetTransactionDetails,
		},
	);
}
