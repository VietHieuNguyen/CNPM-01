const bcrypt = require("bcrypt");
const db = require("../models/index");
const salt = 10;

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hash(data.password, salt);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.find();
      // Map to plain objects so they contain the 'id' property from schema's toObject setup
      resolve(users.map(u => u.toObject()));
    } catch (error) {
      reject(error);
    }
  });
};

const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findById(userId);
      if (user) {
        resolve(user.toObject());
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findById(data.id);
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        await user.save();

        let allUsers = await db.User.find();
        resolve(allUsers.map(u => u.toObject()));
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findById(userId);
      if (user) {
        await user.deleteOne();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById,
};
