const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const config = dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.all("/*", (req, res) => {
  console.log("originalUrl", req.originalUrl);
  console.log("method", req.method); // POST, GET
  console.log("body", req.body); //
  const paramsArr = req.originalUrl.split("/");
  const recipient = paramsArr[1];
  const restParams = paramsArr.slice(2, paramsArr.length).join("/");
  console.log("restParams_______", restParams);
  console.log("recipient", recipient);
  const recipientURL = process.env[recipient];
  console.log("recipientURL", recipientURL);
  if (recipientURL) {
    console.log(req.params);
    const axiosConfig = {
      method: req.method,
      url: `${recipientURL}${restParams && "/" + restParams}`,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
    };
    console.log("axiosConfig: ", axiosConfig);
    axios(axiosConfig)
      .then(function (response) {
        console.log("response from recipient", response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log("some error: ", JSON.stringify(error));
        if (error.response) {
          const { status, data } = error.response;
          res.status(status).json(data);
        } else {
          res.status(500).json({ error: error.message });
        }
      });
  } else {
    res.status(502).json({ error: "Cannot process request" });
  }
});
app.listen(PORT, (error) => {
  console.log("PORT", PORT);
});
