const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
	let target = "";

	if (req.url.startsWith("/api")) {
		target = "http://96.44.169.103:9093";
	}

	createProxyMiddleware({
		target,
		changeOrigin: true,
		pathRewrite: {
			"^/api": "/"
		}
	})(req, res);
};
