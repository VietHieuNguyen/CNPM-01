const CRUDService = require("../services/crud.service");


module.exports.getHomePage = async (req, res) => {
  try {
    let data = await CRUDService.getAllUser();
    return res.render("home", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports.getAboutPage = (req, res) => {
  return res.render("about");
};

module.exports.getCRUD = (req, res) => {
  return res.render("crud");
};

module.exports.getFindAllCrud = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("users/findAllUser", {
    dataList: data,
  });
};

module.exports.postCRUD = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  return res.redirect("/get-crud");
};

module.exports.getEditCRUD = async (req, res) => {
  let userId = req.query.id;

  if (!userId) {
    return res.send("Can not get user id");
  }

  let userData = await CRUDService.getUserInfoById(userId);
  if (!userData || Array.isArray(userData)) {
    return res.send("User not found");
  }

  return res.render("users/editUser", {
    data: userData,
  });
};

module.exports.putCRUD = async (req, res) => {
  await CRUDService.updateUser(req.body);
  return res.redirect("/get-crud");
};

module.exports.deleteCRUD = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.send("Not find User");
  }

  await CRUDService.deleteUserById(id);
  return res.redirect("/get-crud");
};
