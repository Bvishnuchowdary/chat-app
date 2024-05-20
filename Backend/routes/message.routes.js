import express from 'express'
import { getmessages, sendmessage } from '../controllers/message.controller.js'
import protectroute from '../middleware/protectroute.js'

const router = express.Router()

router.post("/send/:id",protectroute,sendmessage)
router.get("/:id",protectroute,getmessages)

export default router