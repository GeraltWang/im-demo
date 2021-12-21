import websdk from "easemob-websdk"
import config from "./WebIMConfig";

const WebIM = {}
WebIM.config = config
const conn = WebIM.conn = new websdk.connection(config)

export default conn
