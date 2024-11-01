import grpc from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";
import { ledger } from "./delete_transaction.js";

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

test("delete by transaction id", (done) => {
	// Added mock data to the ledger for testing
	ledger.push(
		new core.Transaction({
			transaction_id: "txn-123",
			sender: "user1",
			receiver: "user2",
			amount: 120.0,
			timestamp: "2024-10-20T12:00:00Z",
		}),
	);
	// Deleting an existing transaction
	client.DeleteTransaction(
		new core.TransactionId({ transaction_id: "txn-123" }),
		(err, response) => {
			done();
			expect(err).toBeNull();
			expect(response?.succeeded).toEqual(true);
			expect(
				ledger.find((txn) => txn.transaction_id === "txn-123"),
			).toBeUndefined();
		},
	);
	// Deleting a transaction that does not exist, which should return false
	client.DeleteTransaction(
		new core.TransactionId({ transaction_id: "Does not exist" }),
		(err, response) => {
			expect(err).toBeNull();
			expect(response?.succeeded).toEqual(false);
		},
	);
});
