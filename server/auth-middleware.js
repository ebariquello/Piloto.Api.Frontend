const jwt = require('jsonwebtoken');

const APP_SECRET = 'myappsecret';
const USERNAME = "admin";
const PASSWORD = "pass@word1";

module.exports = function (req, resp, next) {
    if ((req.url == "/api/login" || req.url == "/login") && req.method == "POST") {
        if (req.body != null && req.body.name == USERNAME && req.body.password == PASSWORD) {
            let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
            console.log('token gerado:', token);
            resp.json({ success: true, token: token });
        }
        else {
            resp.json({ success: false })
        }
        resp.end();
        return;
    } else if ((((req.url.startsWith("/api/products")
            || req.url.startsWith("/products"))
        || (req.url.startsWith("/api/categories")
            || req.url.startsWith("/categories"))) && req.method != "GET")
        || ((req.url.startsWith("/api/orders")
            || req.url.startsWith("/orders")) && req.method != "POST")) {

        let token = req.headers["authorization"];

        console.log('token recebido', token);
        if (token != null && token.startsWith("Bearer ")) {
            let tokenSanitized = token.substring(7, token.length).trim();
           
            try {
                console.log('token sanitizado', tokenSanitized);
                jwt.verify(tokenSanitized, APP_SECRET);
                next();
                return;
            } catch (err) {
                console.log("Error:", err)
            }
          
        }
        resp.statusCode = 400;
        resp.end();
        return;
    }
    next();  

  
}
