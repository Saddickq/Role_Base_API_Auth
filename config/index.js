import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const SECRET = process.env.SECRET


export { PORT, DB_URL, SECRET }