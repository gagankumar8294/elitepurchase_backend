import express from "express";
import passport from "passport";

const Authrouter = express.Router();

// 🔹 Start Google Login
Authrouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔹 Google Callback
Authrouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    // ✅ Log user data in backend console
    console.log("Logged in user data:", req.user);

    // Redirect to frontend after login
    res.redirect("http://localhost:3000");
  }
);

// 🔹 Get user info (to check if logged in)
Authrouter.get("/me", (req, res) => {
  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

// 🔹 Logout
Authrouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000");
  });
});

export default Authrouter;
