const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Set up reverse proxy for GoPro API
app.use('/data', createProxyMiddleware({
    target: 'http://192.168.1.17:3000', // The internal GoPro HTTP server
    changeOrigin: true,  // Handle virtual hosted sites
    secure: false,       // Disable SSL verification since target is HTTP
    pathRewrite: {
        '^/data': '', // Strip the /api/data prefix from the request path
    },
    onProxyRes(proxyRes) {
        // Add the necessary CORS headers to allow frontend access
        proxyRes.headers['Access-Control-Allow-Origin'] = 'https://gopro-app.vercel.app';  // Frontend URL
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';  // Allow credentials for session-based APIs
    },
    onError(err, req, res) {
        // Handle proxy errors
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error occurred' });
    }
}));

// Start the server on port 3000 or a port specified by environment variables
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
