import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken'

export const adminRequireAuth = async (req, res, next) => {
  const token = req.cookies?.admin;

  if (!token) {
    res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user_id = decoded._id;

    const user = await Admin.findOne({ _id: req.user_id, role: 'Admin' })
    if (!user) {
      res.status(401).json({ success: false, message: 'Admin doesn\'t exist.' });
      return;
    }

    next(); 
  } catch (error) {
    console.log(error)
    res.status(403).json({ error: error.message });
  }
};

export const userRequireAuth = async (req, res, next) => {
  const token = req.cookies?.admin;

  if (!token) {
    res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user_id = decoded._id;

    const user = await Admin.findById(req.user_id)
    if (!user) {
      res.status(401).json({ success: false, message: 'Admin doesn\'t exist.' });
      return;
    }

    next(); 
  } catch (error) {
    console.log(error)
    res.status(403).json({ error: error.message });
  }
};