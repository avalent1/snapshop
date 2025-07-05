"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cloudinary_1 = __importDefault(require("./config/cloudinary"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
// app config
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
(0, cloudinary_1.default)();
// middleware
app.use(express_1.default.json());
//we can access the API from anywhere, any ip address
// api endpoints
app.use('/api/user', userRoute_1.default);
app.use('/api/product', productRoute_1.default);
app.get('/', (req, res) => {
    res.send("API working");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
