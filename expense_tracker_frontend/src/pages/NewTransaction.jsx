import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
    FaMoneyBillWave,
    FaFileInvoiceDollar,
    FaShoppingCart,
    FaBus,
    FaHeartbeat,
    FaBriefcase,
    FaLaptopCode,
    FaChartLine,
    FaGift,
    FaQuestionCircle
} from "react-icons/fa";

const categoryMapping = {
    Rent: 1,
    Bills: 2,
    Groceries: 3,
    Transportation: 4,
    Healthcare: 5,
    Salary: 6,
    Freelance: 7,
    Investments: 8,
    Gifts: 9,
    Other: 10,
};

const categoryIcons = {
    Rent: <FaMoneyBillWave />,
    Bills: <FaFileInvoiceDollar />,
    Groceries: <FaShoppingCart />,
    Transportation: <FaBus />,
    Healthcare: <FaHeartbeat />,
    Salary: <FaBriefcase />,
    Freelance: <FaLaptopCode />,
    Investments: <FaChartLine />,
    Gifts: <FaGift />,
    Other: <FaQuestionCircle />,
};

const incomeTypes = ["Salary", "Freelance", "Investments", "Gifts", "Other"];
const expenseTypes = ["Rent", "Bills", "Groceries", "Transportation", "Healthcare"];

const NewTransaction = () => {
    const [transactionType, setTransactionType] = useState("Income");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const userEmail = localStorage.getItem("userEmail");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userEmail) {
            toast.error("Please log in to submit a transaction");
            return;
        }

        const selectedCategoryId = categoryMapping[subCategory];

        if (!selectedCategoryId) {
            toast.error("Invalid category selected");
            return;
        }

        const transactionData = {
            userEmail,
            categoryId: selectedCategoryId,
            description,
            amount: parseFloat(amount),
            date,
        };

        try {
            const response = await axios.post("http://localhost:8081/mywallet/transaction/new", transactionData);
            if (response.status === 200 || response.status === 201) {
                toast.success("Transaction saved successfully!");
                resetForm();
            } else {
                toast.error("Failed to save transaction. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving the transaction.");
        }
    };

    const resetForm = () => {
        setDescription("");
        setAmount("");
        setSubCategory("");
    };

    const categoryOptions = transactionType === "Income" ? incomeTypes : expenseTypes;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">
                    New {transactionType} Transaction
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 text-white">
                    {/* Toggle */}
                    <div className="flex gap-6">
                        <button
                            type="button"
                            className={`flex-1 py-3 rounded-lg font-semibold border transition ${
                                transactionType === "Income"
                                    ? "bg-green-600 text-white border-green-700"
                                    : "bg-gray-700 border-green-600 text-green-400"
                            }`}
                            onClick={() => {
                                setTransactionType("Income");
                                setSubCategory("");
                            }}
                        >
                            Income
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-3 rounded-lg font-semibold border transition ${
                                transactionType === "Expense"
                                    ? "bg-red-600 text-white border-red-700"
                                    : "bg-gray-700 border-red-600 text-red-400"
                            }`}
                            onClick={() => {
                                setTransactionType("Expense");
                                setSubCategory("");
                            }}
                        >
                            Expense
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {categoryOptions.map((type, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className={`flex items-center gap-3 p-3 rounded-lg border w-full transition ${
                                    subCategory === type
                                        ? "bg-green-700 border-green-400"
                                        : "bg-gray-700 hover:bg-gray-600 border-gray-600"
                                }`}
                                onClick={() => setSubCategory(type)}
                            >
                                <span className="text-green-300 text-xl">{categoryIcons[type]}</span>
                                <span className="text-white font-medium">{type}</span>
                            </button>
                        ))}
                    </div>

                    {/* Description */}
                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    {/* Amount */}
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={0}
                        required
                    />

                    {/* Date */}
                    <input
                        type="date"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Save Transaction
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewTransaction;
