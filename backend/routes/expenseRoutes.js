const router = require('express').Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/authMiddleware');

//create Expense
router.post('/', auth, async (req,res) =>{
    try {
        const newExpense = new Expense({
             ...req.body,
            user: req.user.id
        });
        const savedExpense = await newExpense.save();
        res.status(201).json({savedExpense});

    } catch (err) {
        res.status(500).json({error: err.message});

    }
});

//Get all expenses for logged-in user
router.get('/', auth, async (req,res) => {
    try {
        const expenses = await Expense.find({
            user:res.user.id 
        }).sort({date: -1});
        res.json(expenses);
    } catch (error) {
        res.status(500).json({error: err.message});
        
    }
});

//Get sinle expense
router.get('/', auth, async (req,res) => {
    try {
        const expenses = await Expense.findOne({
            _id:res.params.id,
            user: req.user.id 
        });
        
        if(!expense )
            return res.status(404).json({
               message: 'Expense not found'
        });
        res.json(expense);
    } catch (err) {
        res.status(500).json({error: err.message});
        
    }
});

//Update expense
router.get('/', auth, async (req,res) => {
    try {
        const UpdateExpense = await Expense.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id
        }, 
        req.body,
        {new: true}
        );
        if(!updatedExpense)
            return res.status(404).json({
                message: 'Expense not found'
            });
        res.json(updatedExpense);
    } catch (err) {
        res.status(500).json({error: err.message});
        
    }
});

//Delete expense
router.get('/', auth, async (req,res) => {
    try {
        const deleteExpenses = await Expense.findOneAndDelete({
            _id: res.params.id,
            user: req.user.id 
        });
        if(!deleteExpenses)
            return res.status(404).json({
              message: 'Expense not found'
            });
        res.json({message: 'Expense Deleted Successfully'});
    } catch (err) {
        res.status(500).json({error: err.message});
        
    }
});

module.exports = router;