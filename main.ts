import grpc from "@grpc/grpc-js";
import core from "./core-implementation/core.js";

export let target = "0.0.0.0:50051";
export const server = new grpc.Server();
core(server);
function tryBind() {
	server.bindAsync(
		target,
		grpc.ServerCredentials.createInsecure(),
		(err, port) => {
			if (err != null) {
				if (err.message.includes("address already in use")) {
					const oldTarget = target;
					target =
						"0.0.0.0:" + Math.floor(Math.random() * 20000 + 10000);
					console.log(
						`failed to bind to ${oldTarget}\nAttempting to bind to ${target}`,
					);
					tryBind();
				} else {
					return console.error(err);
				}
			}
			console.log(`grpc listening on port ${port}`);
		},
	);
}

tryBind();
