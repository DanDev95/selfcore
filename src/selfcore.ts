import axios from "axios";
import { Message, Error, WebHook } from "./types";
import WebSocket from "ws";
import EventEmitter from "events";

const eventEmitter = new EventEmitter();

class Selfcore {
  token: string;
  headers: object;

  constructor(token: string) {
    this.token = token;
    this.headers = {
      authorization: this.token,
      accept: "*/*",
      "accept-language": "en-US",
      referer: "https://discord.com/channels/@me",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.263 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36`,
      "x-debug-options": "bugReporterEnabled",
      "x-super-properties":
        "eyJvcyI6Ik1hYyBPUyBYIiwiYnJvd3NlciI6IkRpc2NvcmQgQ2xpZW50IiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X3ZlcnNpb24iOiIwLjAuMjYzIiwib3NfdmVyc2lvbiI6IjIwLjUuMCIsIm9zX2FyY2giOiJ4NjQiLCJzeXN0ZW1fbG9jYWxlIjoiZW4tVVMiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjo5MzQ1MiwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=",
    };
  }

  async sendMessage(
    channelId: string,
    content: string
  ): Promise<Message | Error> {
    try {
      let res = await axios.post(
        `https://discord.com/api/v9/channels/${channelId}/messages`,
        {
          content,
        },
        { headers: this.headers }
      );
      return res.data;
    } catch (err) {
      return { error: err };
    }
  }

  async deleteMessage(
    channelId: string,
    messageId: string
  ): Promise<void | Error> {
    try {
      let res = await axios.delete(
        `https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`,
        { headers: this.headers }
      );
    } catch (err) {
      return { error: err.response.data.message };
    }
  }

  async joinGuild(invite: string): Promise<void | Error> {
    try {
      console.log(this.headers);

      let res = await axios.post(
        `https://discord.com/api/v9/invites/${invite}`,
        undefined,
        { headers: this.headers }
      );
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  static async sendWebhook(
    url: string,
    message: string | WebHook
  ): Promise<Object | Error> {
    try {
      if (typeof message === "object") {
        let res = await axios.post(url, message);
        return res.data;
      } else {
        let res = await axios.post(url, { content: message });
        return res.data;
      }
    } catch (err) {
      return { error: err };
    }
  }

  async getProfile() {
    try {
      let res = await axios.get(
        "https://discord.com/api/v9/users/816004387574251621/profile?with_mutual_guilds=false",
        { headers: this.headers }
      );
      return res.data;
    } catch (err) {
      return { error: err };
    }
  }

  static Gateway = class extends EventEmitter {
    token: string;
    ws: WebSocket;
    sessionId: string | null = null;
    sequenceNumber: number | null = null;
    heartbeatInterval: NodeJS.Timeout | null = null;
    expectHeartbeatAck: boolean = false;
    baseGatewayUrl: string = 'wss://gateway.discord.gg/?v=9&encoding=json';
    resumeGatewayUrl: string = this.baseGatewayUrl;

    constructor(token: string) {
      super();
      this.token = token;
      this.connectToGateway();
    }

    //connect to gateway and handle events
    connectToGateway(resume = false) {
      const url = resume ? this.resumeGatewayUrl : this.baseGatewayUrl;
      this.ws = new WebSocket(url);

      this.ws.on('open', () => {
        if (resume) {
          this.resumeSession();
        }
      });

      this.ws.on('message', (data: string) => {
        const response = JSON.parse(data);
        if (response.s) this.sequenceNumber = response.s;
        switch (response.op) {
          case 10: // Hello event
            this.handleHello(response.d.heartbeat_interval);
            break;
          case 11: // Heartbeat ACK
            this.expectHeartbeatAck = false;
            break;
          case 9: // Invalid Session
            this.ws.close(4000);
            setTimeout(() => this.connectToGateway(false), 5000);
            break;
          case 7: // Reconnect request
            this.ws.close(4000);
            setTimeout(() => this.connectToGateway(true), 5000);
            break;
          case 0: // Dispatch
            if (response.t === "MESSAGE_CREATE") {
              this.emit("message", response.d);
            } else if (response.t === "READY") {
              this.sessionId = response.d.session_id;
              this.resumeGatewayUrl = response.d.resume_gateway_url;
            }
            break;
          default:
            break;
        }
      });

      this.ws.on('close', (code) => {
        clearInterval(this.heartbeatInterval!);
        const resumeCodes = [4000, 4001, 4002, 4003, 4005, 4006, 4007, 4008, 4009];
        const canResume = typeof code === 'undefined' || resumeCodes.includes(code);
        setTimeout(() => this.connectToGateway(canResume), 5000);
      });
    }

    //handle hello event
    handleHello(heartbeat_interval: number) {
      this.heartbeatInterval = setInterval(() => {
        if (this.expectHeartbeatAck) {
          this.ws.close(4000); // Close connection if no ACK
          return;
        }
        this.sendHeartbeat();
        this.expectHeartbeatAck = true;
      }, heartbeat_interval);
    }

    //send heartbeat to gateway
    sendHeartbeat() {
      if (this.sequenceNumber !== null) {
        this.ws.send(JSON.stringify({ op: 1, d: this.sequenceNumber }));
      }
    }

    //identify for the first connection
    identify() {
      let payload = {
        op: 2,
        d: {
          token: this.token,
          properties: {
            $os: "linux",
            $browser: "chrome",
            $device: "chrome"
          },
          compress: false,
          large_threshold: 250,
          shard: [0, 1],
          presence: {
            status: 'online',
            since: 0,
            activities: [],
            afk: false,
          }
        }
      };
      this.ws.send(JSON.stringify(payload));
    }

    //resume session after disconnection
    resumeSession() {
      if (this.sessionId && this.sequenceNumber) {
        let payload = {
          op: 6,
          d: {
            token: this.token,
            session_id: this.sessionId,
            seq: this.sequenceNumber
          }
        };
        this.ws.send(JSON.stringify(payload));
      }
    }
  };
}
export default Selfcore;
