import express from "express";
import { getMessage, sendMessage } from '../controllers/message.controller.js'
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id",protectRoute,getMessage);
router.post("/send/:id",protectRoute,sendMessage);  // protectroute is us e for checking user is login or not if login go to next or not so reject


export default router; 

