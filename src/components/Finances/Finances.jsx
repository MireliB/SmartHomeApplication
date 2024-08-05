import React, { useState } from 'react'

import { Box, Card, CardContent, Typography, Grid, Button, TextField } from '@mui/material';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../Header';

export default function Finances() {
    const [expenses, setExpenses] = useState([
        { id: 1, name: "Electrical Bill", amount: 120, date: "2024-07-01" },
        { id: 1, name: "Water Bill", amount: 50, date: "2024-07-05" },
        { id: 1, name: "Internet Bill", amount: 75, date: "2024-07-10" },
    ]);

    const [newExpense, setNewExpense] = useState({ name: "", amount: "", date: "" });
    //Placeholder data for chart
    const chartData = [
        { name: "Jan", Expenses: 400 },
        { name: "Feb", Expenses: 300 },
        { name: "Mar", Expenses: 500 },
        { name: "Apr", Expenses: 450 },
        { name: "May", Expenses: 600 },
        { name: "Jun", Expenses: 350 },
        { name: "Jul", Expenses: 500 },
    ];


    const addExpenseHandler = () => {

        setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }]);
        setNewExpense({ name: "", amount: "", date: "" });

    }

    const newExpenseNameHandler = (e) => {
        setNewExpense({ ...newExpense, name: e.target.value });
    }
    const newExpenseAmountHandler = (e) => {
        setNewExpense({ ...newExpense, amount: e.target.value })
    }
    const newExpenseDateHandler = (e) => {
        setNewExpense({ ...newExpense, date: e.target.value })
    }
    return (
        <Box p={2}>
            <Header
                title={"Finances"}
                subtitle={"Check your Bills"}
            />
            <Card sx={{ mb: 2, backgroundColor: '#424242' }}>
                <CardContent>
                    <Typography variant='h5'>Monthly Summary</Typography>
                    <Typography variant='body1'>Total Expenses: ${expenses.reduce((acc, expense) => acc + expense.amount, 0)}</Typography>
                </CardContent>
            </Card>

            {/* chart section */}
            <Card sx={{ mb: 2, backgroundColor: "#424242" }}>
                <CardContent>
                    <Typography variant='h5' mb={2}>Expense Overview</Typography>
                    <ResponsiveContainer width={"100%"} height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray={"3 3 "} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Expenses" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* detailed expenses section */}
            <Card sx={{ mb: 2, backgroundColor: '#424242' }}>
                <CardContent>
                    <Typography variant="h5" mb={2}>Detailed Expenses</Typography>
                    <Grid container spacing={2}>
                        {expenses.map((expense) => (
                            <Grid item xs={12} md={4} key={expense.id}>
                                <Card sx={{ backgroundColor: '#616161' }}>
                                    <CardContent>
                                        <Typography variant="h6">{expense.name}</Typography>
                                        <Typography variant="body2">Amount: ${expense.amount}</Typography>
                                        <Typography variant="body2">Date: {expense.date}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
            {/* add new expense section */}
            <Card sx={{ mb: 2, backgroundColor: "#424242" }}>
                <CardContent>
                    <Typography variant='h5' mb={2}>Add New Expense</Typography>
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <TextField label="Name"
                            variant='outlined'
                            fullWidth
                            value={newExpense.name}
                            onChange={newExpenseNameHandler}
                            inputProps={{ style: { color: "white" } }}
                        />
                        <TextField label="Amount"
                            variant='outlined'
                            fullWidth
                            value={newExpense.amount}
                            onChange={newExpenseAmountHandler}
                            inputProps={{ style: { color: "white" } }}
                        />
                        <TextField label="Date"
                            variant='outlined'
                            fullWidth
                            value={newExpense.date}
                            onChange={newExpenseDateHandler}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ style: { color: "white" } }}
                        />
                        <Button variant='contained' color='primary' onClick={addExpenseHandler}>Add Expense</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
