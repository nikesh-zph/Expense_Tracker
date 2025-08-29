import React, { useState } from 'react';

const BankForm = () => {
    const [formData, setFormData] = useState({
        accountHolder: '',
        bankName: '',
        accountNumber: ''
    });

    const [qrFile, setQrFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const userEmail = localStorage.getItem("userEmail");
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleQrChange = (e) => {
        setQrFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const form = new FormData();

            // Always include email
            form.append('email', userEmail);

            if (qrFile) {
                form.append('file', qrFile);
            } else {
                const formWithEmail = { ...formData, email: userEmail };
                form.append('data', JSON.stringify(formWithEmail));
            }

            const response = await fetch('http://localhost:8081/api/banking/add', {
                method: 'POST',
                body: form
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data);
                alert("Bank Info saved successfully!");
                setFormData({
                    accountHolder: '',
                    bankName: '',
                    accountNumber: ''

                });
                setQrFile(null);
            } else {
                alert(data.message || 'Error saving bank info');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10 text-black">
            <h2 className="text-xl font-bold mb-4">Add Bank Info</h2>

            <form onSubmit={handleSubmit}>
                {!qrFile && (
                    <>
                        <input
                            type="text"
                            name="accountHolder"
                            placeholder="Account Holder Name"
                            value={formData.accountHolder}
                            onChange={handleChange}
                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="bankName"
                            placeholder="Bank Name"
                            value={formData.bankName}
                            onChange={handleChange}
                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="accountNumber"
                            placeholder="Account Number"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                            required
                        />
                    </>
                )}

                <div className="my-4 text-center">
                    <span className="text-sm">OR</span>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleQrChange}
                    className="w-full mb-4"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Saving...' : 'Submit'}
                </button>
            </form>

            {result && (
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">Saved Bank Info:</h3>
                    <ul className="text-sm">
                        <li><strong>Holder:</strong> {result.accountHolder}</li>
                        <li><strong>Bank:</strong> {result.bankName}</li>
                        <li><strong>Account No:</strong> {result.accountNumber}</li>
                        <li><strong>Email:</strong> {result.email}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BankForm;
