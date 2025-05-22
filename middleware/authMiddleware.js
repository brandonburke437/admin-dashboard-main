const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Remove "Bearer " prefix if included
    const actualToken = token.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    // After: req.user = decoded;
console.log("Decoded JWT payload:", req.user);


    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
                                                      