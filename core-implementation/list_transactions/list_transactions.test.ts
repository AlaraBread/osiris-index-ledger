import grpc, { ServiceError } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";

let client: core.IndexLedgerClient;
beforeAll(async () => {
	await serverUp;
	client = new core.IndexLedgerClient(
		target,
		grpc.credentials.createInsecure(),
	);
});

afterAll(() => {
	server.forceShutdown();
});
//TODO: record 5 transactions
test("list 5 transactions", (done) => {
	client.ListTransactions(
		new core.TransactionLimit({
			limit: 5,
		}),
		function (
			err: ServiceError | null,
			response: core.TransactionList | undefined,
		) {
			done();
			expect(response?.list.length).toBeLessThanOrEqual(5);
			//TODO: test requesting more than the max number of records
		},
	);
});
