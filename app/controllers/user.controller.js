const User = require("../models/user.model.js");
const crypto = require("crypto");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "User details can not be empty",
    });
  }

  const id = crypto.randomBytes(16).toString("hex");

  const user = new User({
    userId: id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    type: req.body.type,
    email: req.body.email,
    mobile: req.body.mobile,
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send({
        message: "New User Added Successfully!",
        userId: id
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  if (!req.query.userId) {
    return res.status(400).send({
      message: "User Id can not be empty",
    });
  }
  User.findOne({
      userId: req.query.userId
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.query.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.query.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.query.userId,
      });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "User Details can not be empty",
    });
  }

  if (!req.query.userId) {
    return res.status(400).send({
      message: "User Id can not be empty",
    });
  }

  // Find user and update it with the request body
  User.findOneAndUpdate({
      userId: req.query.userId
    }, {
      userId: req.query.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      type: req.body.type,
      email: req.body.email,
      mobile: req.body.mobile,
    }, {
      new: true,
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.query.userId
        });
      }
      res.send({
        message: "User with id " + req.query.userId + "updated Successfully!"
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.query.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.query.userId,
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  if (!req.query.userId) {
    return res.status(400).send({
      message: "User Id can not be empty",
    });
  }
  User.findOneAndRemove({
      userId: req.query.userId
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({
        message: "User with id " + req.query.userId +" deleted successfully!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.query.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.query.userId,
      });
    });
};

// Send Verification Code to the given mobile number
exports.sendVerificationCode = (req, res) => {
  if (!req.query.mobile) {
    return res.status(400).send({
      message: "User Id can not be empty",
    });
  }
  User.findOne({
      mobile: req.query.mobile
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User with mobile " + req.query.mobile + "not found!",
        });
      }
      // generate verification code
      // store it
      // send the verification to the mobile
      res.send({
        message: "Verification code send successfully to the mobile " + req.query.mobile
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with mobile " + req.query.mobile,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with mobile " + req.query.mobile,
      });
    });
};