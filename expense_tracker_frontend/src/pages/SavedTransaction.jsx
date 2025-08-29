import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
        categoryId: '',
        amount: '',
        description: '',
        frequency: '',
        upcomingDate: ''
    });
    const [editingTransaction, setEditingTransaction] = useState(null);
    const userId = localStorage.getItem("userId");

    const categoryMap = {
        1: 'Rent', 2: 'Bills', 3: 'Groceries', 4: 'Transportation', 5: 'Healthcare',
        6: 'Salary', 7: 'Freelance', 8: 'Investments', 9: 'Gifts', 10: 'Other'
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/mywallet/saved/user`, {
                params: { id: userId }
            });
            if (response.data?.status === "SUCCESS") {
                setTransactions(response.data.response);
            } else {
                console.error('Unexpected response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction(prev => ({ ...prev, [name]: value }));
    };

    const handleEditTransaction = (tx) => {
        setEditingTransaction(tx);
        setNewTransaction({
            categoryId: tx.categoryId,
            amount: tx.amount,
            description: tx.description,
            frequency: tx.frequency,
            upcomingDate: tx.upcomingDate
        });
    };

    const handleDeleteTransaction = async (planId) => {
        try {
            await axios.delete(`http://localhost:8081/mywallet/saved/delete`, { params: { id: planId } });
            fetchTransactions();
            alert('Transaction deleted successfully!');
        } catch (error) {
            console.error('Error deleting transaction:', error);
            alert('Failed to delete transaction.');
        }
    };

    const handleCreateOrUpdateTransaction = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...newTransaction, userId };
            if (editingTransaction) {
                await axios.put(`http://localhost:8081/mywallet/saved/edit`, payload, {
                    params: { id: editingTransaction.planId }
                });
                alert('Transaction updated successfully!');
            } else {
                await axios.post('http://localhost:8081/mywallet/saved/create', payload);
                alert('Transaction added successfully!');
            }
            setNewTransaction({ categoryId: '', amount: '', description: '', frequency: '', upcomingDate: '' });
            setEditingTransaction(null);
            fetchTransactions();
        } catch (error) {
            console.error('Error creating/updating transaction:', error);
            alert('Failed to create/update transaction.');
        }
    };

    const handleAddSavedTransaction = async (planId) => {
        try {
            await axios.get(`http://localhost:8081/mywallet/saved/add`, { params: { id: planId } });
            alert('Transaction added to active list!');
            fetchTransactions();
        } catch (error) {
            console.error('Error adding saved transaction:', error);
            alert('Failed to add transaction.');
        }
    };

    const handleSkipTransaction = async (planId) => {
        try {
            await axios.get(`http://localhost:8081/mywallet/saved/skip`, { params: { id: planId } });
            alert('Transaction skipped successfully!');
            fetchTransactions();
        } catch (error) {
            console.error('Error skipping transaction:', error);
            alert('Failed to skip transaction.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-green-400 tracking-tight">🌙 My Wallet</h1>

            {/* Create or Edit Transaction Section */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-md mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-green-300">{editingTransaction ? "✏️ Edit Transaction" : "➕ Add New Transaction"}</h2>
                <form onSubmit={handleCreateOrUpdateTransaction} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                        name="categoryId"
                        value={newTransaction.categoryId}
                        onChange={handleInputChange}
                        required
                        className="p-3 bg-gray-700 text-white border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">Select Category</option>
                        {Object.entries(categoryMap).map(([id, name]) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={newTransaction.amount}
                        onChange={handleInputChange}
                        required
                        className="p-3 bg-gray-700 text-white border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={newTransaction.description}
                        onChange={handleInputChange}
                        required
                        className="p-3 bg-gray-700 text-white border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500"
                    />

                    <select
                        name="frequency"
                        value={newTransaction.frequency}
                        onChange={handleInputChange}
                        required
                        className="p-3 bg-gray-700 text-white border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">Select Frequency</option>
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="YEARLY">Yearly</option>
                        <option value="ONE_TIME">One Time</option>
                    </select>

                    <input
                        type="date"
                        name="upcomingDate"
                        value={newTransaction.upcomingDate}
                        onChange={handleInputChange}
                        required
                        className="p-3 bg-gray-700 text-white border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 md:col-span-2"
                    />

                    <button
                        type="submit"
                        className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition md:col-span-2 font-semibold"
                    >
                        {editingTransaction ? "Update Transaction" : "Save Transaction"}
                    </button>
                </form>
            </div>

            {/* Saved Transactions Section */}
            <div>
                <h2 className="text-2xl font-semibold mb-6 text-green-300">💼 Saved Transactions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {transactions.map((tx) => (
                        <div key={tx.planId} className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl border border-green-500 transition">
                            <h3 className="text-xl font-bold text-green-400 mb-2">{tx.categoryName}</h3>
                            <p className="text-2xl font-extrabold text-white mb-1">₹ {tx.amount}</p>
                            <p className="text-sm text-gray-300 mb-1"><strong>Description:</strong> {tx.description}</p>
                            <p className="text-sm text-gray-300 mb-1"><strong>Frequency:</strong> {tx.frequency}</p>
                            <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full mt-3">{tx.dueInformation}</span>

                            <div className="flex flex-wrap gap-2 mt-5">
                                <button
                                    onClick={() => handleEditTransaction(tx)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTransaction(tx.planId)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    🗑️ Delete
                                </button>
                                <button
                                    onClick={() => handleAddSavedTransaction(tx.planId)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    ➕ Add
                                </button>
                                <button
                                    onClick={() => handleSkipTransaction(tx.planId)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    ⏭️ Skip
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;
