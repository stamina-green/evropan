import puppeteer, { Page } from "puppeteer";
import websocket from "websocket";
import EventEmitter from "events";
import * as fs from "fs";
import { exec } from "child_process";

const WebSocketClient = websocket.client;
const ees = new EventEmitter();
if(!fs.existsSync("./scr")) fs.mkdirSync("./scr")
let totalTries = 0;

const args: string[] = []
if(process.platform === "linux") args.push("--no-sandbox", "--window-size=920,1080")

const main = async () => {
  const start = Date.now();
  totalTries++;
  const browser = await puppeteer.launch({ headless: false, defaultViewport: {height: 1080, width: 920}, args });
  const page = await browser.newPage();
  page.on("error", async () => {
    if(Date.now() - start < 3000) {
      process.exit(1)
  };
});
  try {
    await page.goto("https://www.evropa2.cz/souteze/maturitak-evropy-2-3");
  } catch (error) {
    if(process.platform === "linux") {
      await exec('nordvpn disconnect && nordvpn connect Dedicated_IP', async (e, out, err) => {
        console.log(e, out, err);
      })
  }
  }
  const cooButt = await page.waitForSelector("#didomi-notice-agree-button");
  cooButt?.click();
  await page.waitForTimeout(1500);
  let icko = 10;
  let i = 0;
  for (i = 0; i < icko; i++) {
    console.log("i", i);
    if(i === 1) {
      await page.evaluate(() => {
        // @ts-ignore
        window.scrollBy(0, 100)
      });
    }
    try {
      const out = await runCaptcha(page);
      if (out === "err") break;
    } catch (e) {
      console.log("err runCaptcha", e);
      icko++;
      await page.waitForTimeout(3000);
    }
    await page.waitForTimeout(4500);
    let restet;
    try {
      restet = await page.$eval(
        ".jsx-1948174344.success",
        (el: any) => el.innerText
      );
    } catch (e) {
      console.log("err restest");
    }
    console.log(restet);
    if (restet !== "Hlas přijat.") icko++;
  }
  if(i >= 9) {
    ees.emit("num");
  } else { 
    const a =   setTimeout(async () => {
      return process.exit(0)
    }, 30000);
    await connectVPN()
    console.log("reboot inc a");
    clearTimeout(a)
}
  
  
  await page.screenshot({ path: "./scr/out" + Date.now() + ".png" });
  await browser.close();
};
const connectVPN = async (): Promise<void> => {
  return new Promise(async (resolve) => {
  if(process.platform === "linux") {
    await exec('nordvpn connect Dedicated_IP', async (e, out, err) => {
      console.log(e, out, err);
      if(!err && !e) {
        await new Promise((r) => setTimeout(r, 10000))
        connect()
        console.log("reboot inc b");
        return resolve()
      }
      return await connectVPN()
    })
  } else resolve()
})
}
const getTextFromMP3Link = async (link: string): Promise<string> => {
  ees.emit("new", link);
  console.log("emited");

  return new Promise((resolve, reject) => {
    ees.once("resolve", (data) => {
      console.log(data);
      return resolve(data);
    });
    setTimeout(() => {
      reject("timeout");
    }, 10000);
  });
};

const runCaptcha = async (page: Page): Promise<string> => {
  const a = await page.waitForSelector(
    'div[title="8.M – Gymnázium Christiana Dopplera"]'
  );
  if (!a) throw new Error("a not found");
  const button = await (
    await (await a.getProperty("parentNode")).getProperty("parentNode")
  )
    .asElement()
    ?.$("button");
  if (!button) {
    console.log("button not found");
  }
  console.log(button);

  const inner = await button?.evaluate((el: any) => el.innerText);
  if (inner !== "Hlasuj") {
    return "err";
  }
  await button?.click();
  
  const iframe = await page.waitForSelector(
    'iframe[sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"][style="width: 400px; height: 580px;"]',
    { timeout: 3000 }
  );
  await page.screenshot({ path: "example.png" });
  if (!iframe) throw new Error("iframe not found");
  const captcha = await iframe.contentFrame();
  if (!captcha) throw new Error("captcha not found");
  console.log("captcha found");

  await captcha.waitForTimeout(1000);
  const audiobutt = await captcha.waitForSelector("#recaptcha-audio-button");
  console.log("audio button found");

  await audiobutt?.click();
  console.log("audio button clicked");
  setTimeout(() => {
    page.screenshot({ path: "example.png" });
  }, 3000);
  const link = await captcha.waitForSelector(
    ".rc-audiochallenge-tdownload-link"
  , {timeout: 3000});
  await page.waitForTimeout(1000);
  console.log("link found");
  if (!link) throw new Error("link not found");
  const linkVal = await link.evaluate((el) => el.getAttribute("href"));
  if (!linkVal) throw new Error("link Value not found");
  console.log("link value found");
  const output = await getTextFromMP3Link(linkVal);
  console.log("output found");
  await captcha.type("#audio-response", output, { delay: 30 });
  console.log("output typed");
  await page.waitForTimeout(470);
  captcha.click("#recaptcha-verify-button");
  return "ok";
};

const connect = () => {
  client.connect("ws://130.61.150.71:9883/", "echo-protocol");
};
var client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
 
});

client.on("connect", function (connection) {
  console.log("WebSocket Client Connected");

  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());

  });
  connection.on("close", function () {
    console.log("echo-protocol Connection Closed");
    setTimeout(() => {
      connect();
    }, 500);
  });
  ees.on("new", async (data) => {
    console.log("new");

    connection.send(data);
  });
  ees.on("num", async () => {
    console.log("sun");

    connection.send("sun");
  });
  connection.on("message", async function (message) {
    if (message.type === "utf8") {
      ees.emit("resolve", message.utf8Data);
    }
  });
});

(async () => {
  connect();
  for (let i = 0; i < 5; i++) {
    await main();
  }
  process.exit(0)
})();

// setTimeout(() => {
//     main()
//     console.log("done");
// }, 100000);
