import express from "express"
import Auth from "../utils/auth.js";

const router = express.Router()

router.post("/register-student", async (req, res) => {
    await Auth.registerUser(req.body, "student", res)
})

router.post("/register-parent", async (req, res) => {
    await Auth.registerUser(req.body, "parent", res)
})

router.post("/register-teacher", async (req, res) => {
    await Auth.registerUser(req.body, "teacher", res)
})


// Login users
router.post("/login-student", async (req, res) => {
    await Auth.loginUser(req.body, "student", res)
})

router.post("/login-parent", async (req, res) => {
    await Auth.loginUser(req.body, "parent", res)
})

router.post("/login-teacher", async (req, res) => {
    await Auth.loginUser(req.body, "teacher", res)
})


// protected routes
export default router;