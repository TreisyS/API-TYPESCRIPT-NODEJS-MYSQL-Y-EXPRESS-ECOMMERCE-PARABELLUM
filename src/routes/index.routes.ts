import express from "express"; 
import {indexWelcome} from '../controllers/index.controller'

const router = express.Router()

router.route('/')
.get(indexWelcome);



export default router;