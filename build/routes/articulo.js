"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // ESMODULES
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send('obteniendo todas las entradas');
});
router.post('/', (_req, res) => {
    res.send('Guardando');
});
exports.default = router;
