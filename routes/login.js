import express from "express";
const router = express.Router();
import passport from "passport";

router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

router.get("/auth/google/home", passport.authenticate("google", {
  successRedirect: "/home",
  failureRedirect: "/"
}));

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
