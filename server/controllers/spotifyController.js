const axios = require("axios");

const tokenRequest = async (token) => {
  const dataObj = {
    grant_type: "authorization_code",
    redirect_uri: process.env.REDIRECT_URL,
    code: token,
  };

  const headers = {
    Authorization:
      "Basic " + btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const data = await axios.post(
    "https://accounts.spotify.com/api/token",
    { ...dataObj },
    { headers: headers }
  );

  return data.data;
};

exports.getToken = async (req, res, next) => {
  try {
    const { token } = req.query;
    const accessToken = await tokenRequest(token);
    res.status(200).json({
      title: "cool",
      accessToken,
    });
  } catch (error) {
    next();
  }
};
