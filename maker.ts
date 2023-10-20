import * as fs from "fs";
import * as https from "https";

import { client as WebSocketClient } from "websocket";
import { Leopard } from "@picovoice/leopard-node";
const handle = new Leopard(
  "317VQEYx5kWv1wJH8bzG24xHp1JdTtuhAefuuU9Ik2KH4iFkaVmCnw=="
);

const main = async () => {
    return new Promise((resolve) => {
  var client = new WebSocketClient();

  client.on("connectFailed", function (error) {
    console.log("Connect Error: " + error.toString());
    client.connect("ws://130.61.150.71:9883/", "echo-protocol");
  });

  client.on("connect", (connection) => {
    console.log("WebSocket Client Connected");
    connection.sendUTF("register");
    connection.on("error", function (error) {
      console.log("Connection Error: " + error.toString());
      client.connect("ws://130.61.150.71:9883/", "echo-protocol");
    });
    connection.on("close", async () => {
      console.log("echo-protocol Connection Closed");
      await new Promise(r => setTimeout(r, 500))
      resolve("a")
    });
    connection.on("message", async function (message) {
      if (message.type === "utf8") {
        const [datmark, data] = message.utf8Data.split(";");
        if (!data) return;
        connection.send(`OK:${datmark}:${await getFilefromLink(data)}`);
      }
    });
  });

  client.connect("ws://130.61.150.71:9883/", "echo-protocol");
})
};
const getFilefromLink = async (link: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream("./file.mp3");
    https.get(link, function (response) {
      console.log("downloading file");

      response.pipe(file);

      // after download completed close filestream
      file.on("finish", async () => {
        file.close();
        console.log("file downloaded");
        let out
        try {
        out = handle.processFile("./file.mp3");
        } catch (e) {
          console.log("error processing file");
          
        out = {transcript: "a"}
        }

        return resolve(out.transcript);
      });
      file.on("error", (err) => {
        console.log("error downloading file");
        return reject(err);
      });
    });
  });
};
(async () => {
  for (let i = 0; i < 1000; i++) {
    await main();
  }
})();
