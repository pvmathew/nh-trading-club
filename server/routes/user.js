const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // CHeck for all fields
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check if user exists
  User.findOne({ username }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User doesn't exist" });

    // The user exists, so let's check if the password matches
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result)
        return res.status(400).json({ msg: "Password is incorrect" });

      // Password matches! So let's pass the user a fresh JWT login token
      jwt.sign({ username }, process.env.JWT_SECRET, (err, token) => {
        if (err) throw err;
        res.send({ token: token, username });
      });
    });
  });
});

router.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  // CHeck for all fields
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check if user exists
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User exists" });

    const newUser = new User({
      username,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          console.log(user);
        });
      });
    });
  });

  //Create salt & hash
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(newUser.password, salt, (err, hash) => {
  //     if (err) throw err;
  //     newUser.password = hash;
  //     newUser.save().then((user) => {
  //       jwt.sign(
  //         { id: user.id },
  //         process.env.jwtSecret,
  //         { expiresIn: 3600 },
  //         (err, token) => {
  //           if (err) throw err;
  //           res.json({
  //             token,
  //             user: {
  //               id: user.id,
  //               name: user.name,
  //               email: user.email,
  //             },
  //           });
  //         }
  //       );
  //     });
  //   });
  // });
  // });
});

module.exports = router;
