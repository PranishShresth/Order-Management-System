const loginRequired = (req, res, next) => {
  if (!req.session.user)
    return res
      .status(401)
      .send(
        "<h4 style='text-align:center'>Please log in to access the resource</h4>"
      );
  return next();
};

const StayLoggedin = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  return next();
};

module.exports = { loginRequired, StayLoggedin };
