const ajv = require("ajv");
const Ajv = new ajv();
const order = {
    type: "object",
    properties: {
        id: { type: "number" },
        totalPrice: { type: "number" },
        items: { type: "array" }
    },
    required: ['id'],
    additionalProperties: false
}
module.exports = Ajv.compile(order);