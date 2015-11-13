"use strict";

var express = require("express");
var router = express.Router();
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var Logger = require("../inc/Logger");
var User = require("../models/User/Model");

passport.use(new Strategy((username, password, done) => {
    User.find(username).then((user) => {
        if (user === null) {
            Logger.warn(`User ${JSON.stringify(username)} not found`);
            return done(null, false);
        } else {
            if (user.at("/password") !== password) {
                Logger.warn(`Invalid password for user ${JSON.stringify(username)}`);
                return done(null, false);
            } else {
                return done(null, user);
            }
        }
    }).catch((err) => {
        return (done(err));
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.find(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err);
    });
});

router.use(passport.initialize());
router.use(passport.session());

router.post("/login", passport.authenticate("local",
    { failureRedirect: "/" }),
    (req, res) => { res.redirect("/"); }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.use((req, res, next) => {
    if (req.user instanceof User) {
        res.locals.me = req.user;
    } else {
        res.locals.me = false;
    }
    next();
});

module.exports = router;