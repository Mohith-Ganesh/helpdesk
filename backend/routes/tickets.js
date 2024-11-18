const express = require('express');
const Ticket = require('../models/Ticket');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all tickets (Admin/Agent)
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Fetch tickets where the customer matches the logged-in user's ID
        const tickets = await Ticket.find({ customer: req.user._id })
            .populate('customer', 'name')
            .sort({ lastUpdatedOn: -1 });

        res.json(tickets);
    } catch (err) {
        console.error('Error fetching tickets:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/all', authMiddleware, async (req, res) => {
    const tickets = await Ticket.find().populate('customer', 'name').sort({ lastUpdatedOn: -1 });
    res.json(tickets);
});


// Create a ticket (Customer)
router.post('/create', authMiddleware, async (req, res) => {
    const { title } = req.body;

    try {
        const ticket = new Ticket({ title, customer: req.user._id, customerName: req.user.name });
        await ticket.save();
        res.status(201).json(ticket);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a note to a ticket
router.post('/:id/notes', authMiddleware, async (req, res) => {
    const { message } = req.body;

    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        ticket.notes.push({ user: req.user._id, message });
        ticket.lastUpdatedOn = new Date();
        await ticket.save();

        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
