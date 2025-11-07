import express from "express";
import cors from "cors";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import memberRoutes from "./routes/member.routes.js";
import equipmentsRoutes from "./routes/equipment.routes.js";
import borrowHistoryRoutes from "./routes/borrowHistory.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/products.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import authRoutes from "./routes/auth.route.js";
import { chatAIagent } from "./controllers/ai.controller.js";

const app = express();

const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5173'

// middleware & static files
app.use(cors({
    origin: origin,
    credentials: true
}))
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.post('/api/ai/chat', chatAIagent)
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/products', productRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/equipments', equipmentsRoutes);
app.use('/api/borrow-history', borrowHistoryRoutes);
app.use('/api/admins', adminRoutes)
app.use('/api/auth', authRoutes)

export default app;