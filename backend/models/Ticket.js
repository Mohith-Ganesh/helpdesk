const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});


const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Pending', 'Closed'], default: 'Active' },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    notes: [noteSchema],
    lastUpdatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
