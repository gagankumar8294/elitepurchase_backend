// routes/authRoutes.js
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
  passport.authenticate("google", { failureRedirect: "https://elitepurchase.in/login" }),
  (req, res) => {
    // ✅ Log user data in backend console
    console.log("Logged in user data:", req.user);

    // Redirect to frontend after login
    res.redirect("https://elitepurchase.in/");
  }
);

// 🔹 Get user info (to check if logged in)
Authrouter.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

// 🔹 Logout
Authrouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

export default Authrouter;
