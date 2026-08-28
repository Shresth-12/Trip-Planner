import pkg from "jsonwebtoken"
import { JWT_SECRET } from "../config.js"

const { verify } = pkg

export function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null

    if (!token) {
        return res.status(401).json({ message: "Authentication required" })
    }

    try {
        const decoded = verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}