const mongoose = require('mongoose');

const SlipSchema = new mongoose.Schema({
    fromDate: Date,
    toDate: Date,
    wagesPerDay: Number,
    presentDays: Number,
    salary: Number,
});

const SalarySlipSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    slips: [SlipSchema]
});

module.exports = mongoose.model('SalarySlip', SalarySlipSchema);
