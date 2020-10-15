const express = require("express");
var bodyParser = require('body-parser')
const path = require("path");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
require("dotenv").config();

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// app.use(express.static(path.join(__dirname, "build")));

app.post("/token", (req, res) => {
  console.log("req.body", req.body);
  const { identity, roomName } = req.body;
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKeySID,
    twilioApiKeySecret,
    {
      ttl: MAX_ALLOWED_SESSION_DURATION,
    }
  );
  token.identity = identity;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);
  console.log("on server token", token);
  res.send(token.toJwt());
  // res.json(req.body);
  console.log(`issued token for ${identity} in room ${roomName}`);
});

// app.get("*", (_, res) =>
//   res.sendFile(path.join(__dirname, "build/index.html"))
// );

app.listen(8081, () => console.log("token server running on 8081"));
