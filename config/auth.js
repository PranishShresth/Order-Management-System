const loginRequired = (req, res, next) => {
  if (!req.session.user) return res.redirect("/");
  return next();
};

const StayLoggedin = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  return next();
};

module.exports = { loginRequired, StayLoggedin };
