function sendErrorResponse(res, type, message) {
  return res.status(400).send({ type, message });
}
function send404Error(res, type, message) {
  return res.status(404).send({ type, message });
}
async function Custom400Error(res, options = {}) {
  const { status = 400, type, message } = options; //default value of status can be changed.
  const ErrorObj = {};
  if (type) {
    ErrorObj.type = type;
  }
  if (message) {
    ErrorObj.message = message;
  }
  return res.status(status).send(ErrorObj);
}
module.exports = { sendErrorResponse, send404Error, Custom400Error };
