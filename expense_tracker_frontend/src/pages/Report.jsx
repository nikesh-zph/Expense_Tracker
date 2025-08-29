import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#4ade80', '#f87171', '#60a5fa'];

const categoryMapping = {
    Rent: 1, Bills: 2, Groceries: 3, Transportation: 4, Healthcare: 5,
    Salary: 6, Freelance: 7, Investments: 8, Gifts: 9, Other: 10,
};

const incomeTypes = ['Salary', 'Freelance', 'Investments', 'Gifts', 'Other'];
const expenseTypes = ['Rent', 'Bills', 'Groceries', 'Transportation', 'Healthcare'];

const Report = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [lastIncome, setLastIncome] = useState(0);
    const [lastExpense, setLastExpense] = useState(0);
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const email = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");

    const fetchTotalByCategory = async (categoryId, month, year) => {
        const res = await axios.get(`http://localhost:8081/mywallet/report/getTotalByCategory`, {
            params: { email, categoryId, month, year },
        });
        return res.data.response || 0;
    };

    const fetchMonthlySummary = async () => {
        const res = await axios.get(`http://localhost:8081/mywallet/report/getMonthlySummaryByUser`, {
            params: { email },
        });
        setMonthlySummary(res.data.response || []);
    };

    const fetchTotalTransactions = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/mywallet/report/getTotalNoOfTransactions`, {
                params: {
                    userId,
                    month: selectedMonth.toString().padStart(2, '0'),
                    year: selectedYear
                },
            });
            setTotalTransactions(res.data.response || 0);
        } catch (error) {
            console.error("Error fetching total transactions:", error);
        }
    };

    const getLastMonthYear = () => {
        let m = selectedMonth - 1;
        let y = selectedYear;
        if (m < 1) {
            m = 12;
            y -= 1;
        }
        return { m, y };
    };

    useEffect(() => {
        const fetchData = async () => {
            const incomeTotals = await Promise.all(
                incomeTypes.map((type) => fetchTotalByCategory(categoryMapping[type], selectedMonth, selectedYear))
            );
            const expenseTotals = await Promise.all(
                expenseTypes.map((type) => fetchTotalByCategory(categoryMapping[type], selectedMonth, selectedYear))
            );

            const last = getLastMonthYear();
            const lastIncomeTotals = await Promise.all(
                incomeTypes.map((type) => fetchTotalByCategory(categoryMapping[type], last.m, last.y))
            );
            const lastExpenseTotals = await Promise.all(
                expenseTypes.map((type) => fetchTotalByCategory(categoryMapping[type], last.m, last.y))
            );

            setTotalIncome(incomeTotals.reduce((a, b) => a + b, 0));
            setTotalExpense(expenseTotals.reduce((a, b) => a + b, 0));
            setLastIncome(lastIncomeTotals.reduce((a, b) => a + b, 0));
            setLastExpense(lastExpenseTotals.reduce((a, b) => a + b, 0));

            await fetchMonthlySummary();
            await fetchTotalTransactions();
        };

        fetchData();
    }, [selectedMonth, selectedYear]);

    const cashInHand = Math.max(totalIncome - totalExpense, 0);
    const cashInHandLast = Math.max(lastIncome - lastExpense, 0);

    const monthOptions = [...Array(12)].map((_, i) => ({
        value: i + 1,
        label: new Date(0, i).toLocaleString('default', { month: 'long' }),
    }));

    const yearOptions = [2023, 2024, 2025];

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Digital Expense Board</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white"
                >
                    {monthOptions.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white"
                >
                    {yearOptions.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {/* Summary Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Income', curr: totalIncome, last: lastIncome, color: 'text-green-400' },
                    { label: 'Total Expense', curr: totalExpense, last: lastExpense, color: 'text-red-400' },
                    { label: 'Cash In Hand', curr: cashInHand, last: cashInHandLast, color: 'text-blue-400' },
                    { label: 'Total Transactions', curr: totalTransactions, last: null, color: 'text-purple-400' },
                ].map(({ label, curr, last, color }) => (
                    <div key={label} className="bg-gray-800 p-6 rounded-2xl shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-2">{label}</h3>
                        <p className={`text-2xl font-bold ${color}`}>
                            {label === 'Total Transactions' ? curr : `This Month: $${curr.toFixed(2)}`}
                        </p>
                        {last !== null && (
                            <p className="text-sm text-gray-400 mt-1">Last Month: ${last.toFixed(2)}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h4 className="text-lg font-semibold mb-4">Monthly Income vs Expense</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlySummary}>
                            <XAxis dataKey="month" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }} />
                            <Legend wrapperStyle={{ color: '#fff' }} />
                            <Bar dataKey="total_income" fill="#4ade80" name="Income" />
                            <Bar dataKey="total_expense" fill="#f87171" name="Expense" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
                    <h4 className="text-lg font-semibold mb-4">This Month Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Income', value: totalIncome },
                                    { name: 'Expense', value: totalExpense },
                                    { name: 'Cash In Hand', value: cashInHand },
                                ]}
                                cx="50%" cy="50%" outerRadius={100}
                                label
                                dataKey="value"
                            >
                                {COLORS.map((color, index) => (
                                    <Cell key={`cell-${index}`} fill={color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }} />
                            <Legend wrapperStyle={{ color: '#fff' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Report;
