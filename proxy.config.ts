const proxy = [
  {
    context: '/dev',
    target: 'https://127.0.0.1:2323',
    "secure": false,
    onProxyReq: (proxyReq, req, res) => {
      // add custom header to request
      proxyReq.setHeader('host', 'zuq4xjjpak.execute-api.us-east-1.amazonaws.com');
    }
  }
];
module.exports = proxy;
