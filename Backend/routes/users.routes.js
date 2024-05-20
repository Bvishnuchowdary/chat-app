import express from 'express'
import getusersfromsidebar from '../controllers/users.controller.js'
import protectroute from '../middleware/protectroute.js'

const router = express.Router()

router.get("/",protectroute,getusersfromsidebar)

export default router