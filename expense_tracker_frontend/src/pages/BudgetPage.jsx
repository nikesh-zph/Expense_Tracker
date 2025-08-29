import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const categoryOptions = {
    Rent: { id: 1, icon: "🏠" },
    Bills: { id: 2, icon: "💡" },
    Groceries: { id: 3, icon: "🛒" },
    Transportation: { id: 4, icon: "🚌" },
    Healthcare: { id: 5, icon: "🩺" },
    Entertainment: { id: 6, icon: "🎬" }
};

const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`;
};

const BudgetPortal = () => {
    const [userId] = useState(1);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedCategory, setSelectedCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [allBudgets, setAllBudgets] = useState({});
    const [allLimitData, setAllLimitData] = useState({});

    const fetchAllBudgets = async () => {
        const results = {};
        for (const [name, { id }] of Object.entries(categoryOptions)) {
            try {
                const res = await axios.get('http://localhost:8081/mywallet/budget/getByCategory', {
                    params: { userId, month, year, categoryId: id }
                });
                results[name] = res.data.response;
            } catch (e) {
                results[name] = 0;
            }
        }
        setAllBudgets(results);
        toast.success('✅ Fetched all category budgets');
    };

    const fetchLimit = async () => {
        const limitResults = {};
        const promises = Object.entries(categoryOptions).map(async ([name, { id }]) => {
            try {
                const res = await axios.get('http://localhost:8081/mywallet/budget/getLimit', {
                    params: { userId, month, year, categoryId: id }
                });
                limitResults[name] = res.data.response;
            } catch (err) {
                limitResults[name] = null;
            }
        });

        await Promise.all(promises);
        setAllLimitData(limitResults);
        toast.success('🎯 Limits for all categories fetched!');
    };

    const addBudget = async () => {
        if (!selectedCategory || !amount) return toast.error('Fill all fields');
        try {
            const id = categoryOptions[selectedCategory].id;
            await axios.post('http://localhost:8081/mywallet/budget/create', {
                userId,
                categoryId: id,
                month,
                year,
                amount: Number(amount)
            });
            toast.success('✅ Budget added');
            fetchAllBudgets();
            fetchLimit(); // update limits after adding
            setAmount('');
        } catch (e) {
            toast.error('❌ Failed to add budget');
        }
    };

    useEffect(() => {
        fetchAllBudgets();
        fetchLimit(); // Fetch limits automatically
    }, [month, year]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <Toaster />
            <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">💰 Budget Portal</h2>

                {/* Filters */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <select
                        className="bg-gray-700 p-3 rounded text-white border border-gray-600"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {Object.entries(categoryOptions).map(([name, { id, icon }]) => (
                            <option key={id} value={name}>{icon} {name}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Month"
                        value={month}
                        min={1}
                        max={12}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="bg-gray-700 p-3 rounded text-white border border-gray-600"
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={year}
                        min={2000}
                        max={2100}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="bg-gray-700 p-3 rounded text-white border border-gray-600"
                    />
                </div>

                {/* Add Budget */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-gray-700 p-3 rounded text-white border border-gray-600 w-full"
                    />
                    <button
                        onClick={addBudget}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded w-full md:w-auto"
                    >
                        ➕ Add Budget
                    </button>
                </div>

                {/* Budget Table */}
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 mb-6">
                    <h3 className="text-xl text-blue-400 mb-3 font-semibold">📊 All Budgets</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
                        {Object.entries(allBudgets).map(([name, value]) => (
                            <div key={name} className="bg-gray-800 p-3 rounded border border-gray-700">
                                <div className="text-sm text-gray-400">{categoryOptions[name].icon} {name}</div>
                                <div className="text-lg text-green-400 font-semibold">{formatCurrency(value)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Limit Details for all categories */}
                {Object.entries(allLimitData).map(([name, data]) => (
                    data && (
                        <div key={name} className="bg-gray-700 p-6 rounded-lg border border-gray-600 mb-4">
                            <h3 className="text-lg text-yellow-300 mb-4 font-semibold">
                                💡 Limit Summary for <span className="underline">{name}</span>
                            </h3>
                            <div className="grid grid-cols-3 text-center gap-4 text-sm">
                                <div>
                                    <div className="text-gray-400">Budgeted</div>
                                    <div className="text-green-400 font-bold">{formatCurrency(data.budgetAmount)}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400">Spent</div>
                                    <div className="text-red-400 font-bold">{formatCurrency(data.transactionAmount)}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400">Remaining</div>
                                    <div className={`font-bold ${data.remainingAmount < 0 ? 'text-red-500' : 'text-green-300'}`}>
                                        {formatCurrency(data.remainingAmount)}
                                    </div>
                                </div>
                            </div>
                            {data.remainingAmount < 0 ? (
                                <p className="text-center text-red-400 mt-4 font-medium">⚠️ Over budget by {formatCurrency(Math.abs(data.remainingAmount))}</p>
                            ) : (
                                <p className="text-center text-green-400 mt-4 font-medium">✅ You're within budget!</p>
                            )}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default BudgetPortal;
