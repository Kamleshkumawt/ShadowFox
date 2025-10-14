import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        // console.log('token',token);
        if(!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // console.log('decoded token',decoded);

        if(!decoded) {
            return res.status(401).json({ success: false, message: 'Unauthorized token' });
        }

        

        req.user = { _id: decoded._id };

        next();

    } catch (error) {
          console.error('Auth middleware error:', error);
        return res.status(500).json({ success: false, message: 'Unauthorized' });
    }
}