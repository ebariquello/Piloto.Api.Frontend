const jwt = require("jsonwebtoken");

const APP_SECRET = "myappsecret";
const Functional = "738679";
const Password = "12345";

module.exports = function (req, resp, next) {
  console.log(req.url);
  if (
    (req.url.startsWith("/auth/login") || req.url.startsWith("/login")) &&
    req.method == "POST"
  ) {
    if (
      req.body != null &&
      req.body.Functional == Functional &&
      req.body.Password == Password
    ) {
      let token = jwt.sign({ data: Functional, expiresIn: "1h" }, APP_SECRET);
      resp.json({
        success: true,
        token: token,
      });
      console.log("resposta de sucesso:", resp);
    } else {
      resp.json({
        success: false,
      });
    }
    resp.end();
    return;
  } else if (
    req.url.startsWith("/users/information") ||
    req.url.startsWith("/parameter/query") ||
    req.url.startsWith("/parameters/parameter/") ||
    req.url.startsWith("/workflows/pending-approvals") ||
    req.url.startsWith("/workflows/submitted-approvals") ||
    req.url.startsWith("/flex-conditions/query") ||
    req.url.startsWith("/flex-conditions/flex-condition-table/") ||
    req.url.startsWith("/flex-conditions/modality") ||
    req.url.startsWith("/flex-conditions/payment-product")
  ) {
    let token = req.headers["authorization"];
    if (token != null) {
      try {
        jwt.verify(token, APP_SECRET);
        next();
        return;
      } catch (err) {
        console.log("Error:", err);
      }
    }
    resp.statusCode = 400;
    resp.end();
    return;
  } else if (req.url.startsWith("/addParameter") && req.method === "POST") {
    let token = req.headers["authorization"];
    if (token != null) {
      try {
        jwt.verify(token, APP_SECRET);

        if (req.body != null) {
          resp.json({
            Result: 8,
            Message:
              "O cadastro da Tabela de Parâmetro foi realizado com sucesso",
            ErrorDetail: null,
          });
        }
        console.log(resp);
        resp.end();
        return;
      } catch (err) {
        console.log("Error:", err);
      }
    }
    resp.statusCode = 400;
    resp.end();
    return;
  } else if (req.url.startsWith("/addFlex") && req.method === "POST") {
    let token = req.headers["authorization"];
    if (token != null) {
      try {
        jwt.verify(token, APP_SECRET);

        if (req.body != null) {
          resp.json({
            Result: 4,
            Message:
              "O cadastro da Tabela de Condições Mínimas de Flex foi realizado com sucesso",
            ErrorDetail: null,
          });
        }
        console.log(resp);
        resp.end();
        return;
      } catch (err) {
        console.log("Error:", err);
      }
    }
    resp.statusCode = 400;
    resp.end();
    return;
  } else if (req.url.startsWith("/completeTask") && req.method === "POST") {
    let token = req.headers["authorization"];
    if (token != null) {
      try {
        jwt.verify(token, APP_SECRET);

        if (req.body != null) {
          resp.json({
            Result: null,
            Message:
              "A tabela:8 de paramêtros de descontos foi:Aprovado com sucesso",
            ErrorDetail: null,
          });
        }
        console.log(resp);
        resp.end();
        return;
      } catch (err) {
        console.log("Error:", err);
      }
    }
    resp.statusCode = 400;
    resp.end();
    return;
  }
  next();
};
