"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const post_seed_questions_1 = __importDefault(require("./Routes/post_seed_questions"));
const get_questions_1 = __importDefault(require("./Routes/get_questions"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = 5000;
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
}));
const __dirname = path_1.default.resolve();
app.use(express_1.default.static(path_1.default.join(__dirname, 'frontend/build')));
app.use(express_1.default.json());
app.use("/seed-questions", post_seed_questions_1.default);
app.use("/questions", get_questions_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'frontend', 'build', 'index.html'));
});
app.listen(port, () => {
    console.log(`API of ${process.env.NODE_ENV} listening at http://localhost:${port}`);
});
exports.default = app;
