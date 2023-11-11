const checkRole = (id_role) => {
  return (req, res, next) => {
    const userRole = req.id_role;
    if (userRole === id_role) {
      next();
    } else {
      res.status(400).json({ message: "Access Denied" });
    }
  };
};
export default checkRole;
