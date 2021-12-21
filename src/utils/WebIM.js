import websdk from "easemob-websdk"
import config from "./WebIMConfig";

export const WebIM = {}
WebIM.config = config
export const conn = WebIM.conn = new websdk.connection(config)

// export default conn
