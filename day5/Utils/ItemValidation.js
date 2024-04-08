const ajv = require("ajv");
const Ajv = new ajv();

const item = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        price: { type: "number" },
        desc: { type: "string" },
    },
    required: ['id', 'name'],
    additionalProperties: false
}



module.exports = Ajv.compile(item);