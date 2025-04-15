const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");

const userModel = require("./models/user-model");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.post("/register", async (req, res) => {
//   let { userName, email, password } = req.body;
//   bycrpt.genSalt(10, (err, Salt) => {
//     bycrpt.hash(password, Salt, async (err, hash) => {
//       let newUser = await userModel.create({
//         userName,
//         email,
//         password: hash,
//       });
//       let token = jwt.sign({ email, userID: newUser._id }, "shhhhhh");
//       res.cookie("token", token);
//       res.send("Loged in successfully");
//     });
//   });
// });

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("Something Went Wrong...");
  bycrpt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let currToken = jwt.sign(
        {
          email: req.body.email,
          userID: user._id,
        },
        "shhhhhh"
      );
      res.json({
        success: true,
        message: "Login Successful",
        token: currToken,
      });
    } else {
      return res.json({
        success: false,
        message: "Login failed...",
      });
    }
  });
});

app.listen(3000, () => {
  console.log(`Backend Running at port https://localhost:${3000}`);
});
