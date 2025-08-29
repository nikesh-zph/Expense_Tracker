import React, { useEffect, useState } from "react";
import axiosInstance from "../authAxiosService.js";
import toast from "react-hot-toast";

const TransactionHistory = () => {
    const [incomeData, setIncomeData] = useState({ Today: [], Yesterday: [] });
    const [expenseData, setExpenseData] = useState({ Today: [], Yesterday: [] });
    const [searchKey, setSearchKey] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const userEmail = localStorage.getItem("userEmail");
    const pageSize = 10;

    const fetchTransactionsByType = async (type, setter) => {
        try {
            const res = await axiosInstance.get(`/transaction/getByUser`, {
                params: {
                    email: userEmail,
                    pageNumber,
                    pageSize,
                    searchKey,
                    transactionType: type,
                },
            });

            const data = res.data?.response?.data || {};
            setter({
                Today: data.Today || [],
                Yesterday: data.Yesterday || [],
            });
            setTotalRecords(res.data?.response?.totalNoOfRecords || 0);
        } catch (err) {
            toast.error(`Failed to load ${type} transactions`);
            console.error(err);
        }
    };

    const deleteTransaction = async (transactionId) => {
        try {
            await axiosInstance.delete(`/transaction/delete`, {
                params: { transactionId },
            });
            toast.success("Transaction deleted");
            fetchAll(); // refresh
        } catch (err) {
            toast.error("Delete failed");
            console.error(err);
        }
    };

    const fetchAll = () => {
        fetchTransactionsByType("TYPE_INCOME", setIncomeData);
        fetchTransactionsByType("TYPE_EXPENSE", setExpenseData);
    };

    useEffect(() => {
        fetchAll();
    }, [searchKey, pageNumber]);

    const renderTable = (transactions, color) => (
        <table className="w-full text-left border-collapse text-white">
            <thead>
            <tr className={`bg-${color}-800 text-white`}>
                <th className="p-3">Date</th>
                <th className="p-3">Category</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Actions</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((txn) => (
                <tr key={txn.transactionId} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="p-3">{txn.date}</td>
                    <td className="p-3">{txn.categoryName}</td>
                    <td className="p-3">{txn.description}</td>
                    <td className="p-3 text-green-400 font-medium">${txn.amount}</td>
                    <td className="p-3 flex gap-2">
                        <button
                            onClick={() => toast("Redirecting to update...")}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => deleteTransaction(txn.transactionId)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    const renderSection = (data, title, color) => (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
            <h2 className={`text-2xl font-bold mb-4 text-${color}-400`}>{title}</h2>

            {data.Today.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mb-2 text-white">Today</h3>
                    {renderTable(data.Today, color)}
                </>
            )}

            {data.Yesterday.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-white">Yesterday</h3>
                    {renderTable(data.Yesterday, color)}
                </>
            )}

            {data.Today.length === 0 && data.Yesterday.length === 0 && (
                <p className="text-gray-400">No {title.toLowerCase()} transactions found.</p>
            )}
        </div>
    );

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(totalRecords / pageSize);
        const pages = Array.from({ length: totalPages }, (_, i) => i);
        return (
            <div className="flex justify-center mt-6 text-white">
                <button
                    onClick={() => handlePageChange(pageNumber - 1)}
                    disabled={pageNumber === 0}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md mx-1 disabled:opacity-50"
                >
                    Previous
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 mx-1 rounded-md ${
                            page === pageNumber ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                        }`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(pageNumber + 1)}
                    disabled={pageNumber === totalPages - 1}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md mx-1 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 text-white">
            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white"
                    placeholder="Search transactions..."
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </div>

            {renderSection(incomeData, "Income", "green")}
            {renderSection(expenseData, "Expense", "red")}

            {renderPagination()}
        </div>
    );
};

export default TransactionHistory;
