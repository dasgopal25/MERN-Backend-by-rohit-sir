const Auth = (req, res, next) => {
  const token = req.headers.token;

  if (token === "ABCDEF") {
    next(); // 
  } else {
    return res.status(403).send("Unauthorized"); 
  }
};

module.exports = Auth;
