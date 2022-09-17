const { Schema, default: mongoose } = require('mongoose');
const moment = require('moment');

const PersonSchema = new Schema(
    {
        name: {
            first: { type: String, required: true, maxlength: 100 },
            last: { type: String, required: true, maxlength: 100 }
        },
        age: { type: Number, required: true },
        isActive: { type: Boolean, required: true },
        registered: {
            type: String,
            required: true,
            validator: (v) => {
                const date = moment(v, "LLLL");
                return date.isValid();
            }
        },
        balance: {
            type: String,
            required: true,
            validator: (v) => {
                return /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/.test(v);
            }
        }
    },
    {collection: "persons"}
);

module.exports = mongoose.model('Persons', PersonSchema);