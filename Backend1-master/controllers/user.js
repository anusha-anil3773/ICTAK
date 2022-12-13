const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userInfo = require("../models/user");

//read user list
exports.getAllUser = async (req, res) => {
  try {
    const list = await userInfo.find();
    res.send(list);
  } catch (error) {
    console.log(error);
  }
};

// read single user detail
exports.getOneUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await userInfo.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

// add new user
exports.addUser = async (req, res) => {
  try {
    // store the front end entered details in server variable
    console.log(req.body);
    bcrypt.hash(req.body.password, 10).then((hash) => {
      // store hash in the database
      let usernew = {
        user_name: req.body.user_name,
        email_id: req.body.email_id,
        password: hash,
        user_type: req.body.user_type,
        contact_number: req.body.contact_number,
        office_location: req.body.office_location,
        course: req.body.course,
      };

      let user = new userInfo(usernew);
      let saveUser = user.save();
      res.send(saveUser);
    });
  } catch (error) {
    console.log(error);
  }
};

// update user detail
exports.updateUser = async (req, res) => {
  try {
    let id = req.body._id;
    let user = {
      user_name: req.body.user_name,
      email_id: req.body.email_id,
      password: req.body.password,
      user_type: req.body.user_type,
      contact_number: req.body.contact_number,
      office_location: req.body.office_location,
      course: req.body.course,
    };
    let updateInfo = await userInfo.findByIdAndUpdate(
      { _id: id },
      { $set: user }
    );
    res.send(updateInfo);
  } catch (error) {
    console.log(error);
  }
};

// delete user detail
exports.deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let deleteUser = await userInfo.deleteOne({ _id: id });
    res.send(deleteUser);
  } catch (error) {
    console.log(error);
  }
};

//login
exports.login = async (req, res) => {
  // console.log("test",req.body);

  try {
    let user = await userInfo.find({
      email: req.body.email_id,
      password: req.body.password,
    });
    console.log(user,user.adminstatus);
    if (!user) {
      return res.json({ message: "Invalid Credentials" });
    } else if (user.adminstatus) {
      let payload = { email: req.body.email_id, password: req.body.password };
      let token = jwt.sign(payload, "secretkey");

      console.log(user);

      console.log("test", req.body);
      res.send({ token: token, adminstatus: true });
    } else {
      let payload = { email: req.body.email_id, password: req.body.password };
      let token = jwt.sign(payload, "secretkey");

      console.log(user);

      console.log("test", req.body);
      res.send({ token: token, adminstatus: false });
    }
  } catch (error) {
    console.log(error);
  }
};
