const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  address: String,
  phoneNumber: String,
  gender: Boolean, // false for Male, true for Female (matching Sequelize behavior)
  image: String,
  roleId: String,
  positionId: String
}, {
  timestamps: true
});

// Configure virtual to get string id
userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    return ret;
  }
});

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    return ret;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;