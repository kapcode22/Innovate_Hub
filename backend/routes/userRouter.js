import express from "express";
import { login, logout, register,getUser } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthorized, logout); // Logout should be accessible without isAuthorized
router.get("/getuser", isAuthorized, getUser);
// router.get("/:id/verify/:token", async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) return res.status(400).send({ message: "Invalid link" });
  
//       const token = await Token.findOne({
//         userId: user._id,
//         token: req.params.token,
//       });
//       if (!token) return res.status(400).send({ message: "Invalid link" });
  
//       user.verified = true;
//       await user.save();
//       await token.remove();
  
//       res.status(200).send({ message: "Email verified successfully" });
//     } catch (error) {
//       res.status(500).send({ message: "Internal server error" });
//     }
//   });
  
export default router;
