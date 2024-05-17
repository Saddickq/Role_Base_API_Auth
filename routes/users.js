import express from "express"
import Auth from "../utils/auth.js";

const router = express.Router()

router.post("/api/register-student", async (req, res) => {
    await Auth.registerUser(req, "student", res)
})

router.post("/api/register-parent", async (req, res) => {
    await Auth.registerUser(req, "parent", res)
})

router.post("/api/register-teacher", async (req, res) => {
    await Auth.registerUser(req, "teacher", res)
})



export default router;