import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/constants/Constants';
import EditOrderModal from './EditOrderModal'; // Adjust path if needed

const DRESS_STATUSES = [
    { value: 'STARTED', label: 'Started' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'FINISHED', label: 'Finished' },
];

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(baseUrl + '/auth/orders/');
                setOrders(response.data.results);
                setFilteredOrders(response.data.results);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        if (Array.isArray(orders)) {
            const filtered = orders.filter(order => {
                const matchesSearch = order.customer_contact_number.includes(searchTerm);
                const matchesStatus = statusFilter ? order.order_status === statusFilter : true;
                return matchesSearch && matchesStatus;
            });

            setFilteredOrders(filtered);
        }
    }, [searchTerm, statusFilter, orders]);

    const handleEditClick = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleOrderUpdated = () => {
        // Refresh the orders list after an update
        fetchOrders();
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(baseUrl + '/auth/orders/');
            setOrders(response.data.results);
            setFilteredOrders(response.data.results);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const calculateRemainingBalance = (amountPerPiece, quantity, advanceAmount) => {
        return (amountPerPiece * quantity) - advanceAmount;
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Order List</h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                    <label className="block text-gray-700 font-bold mr-2">Search by Contact Number:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center">
                    <label className="block text-gray-700 font-bold mr-2">Filter by Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Statuses</option>
                        {DRESS_STATUSES.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed bg-white border border-gray-200 rounded-md overflow-hidden">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Customer Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Contact Number</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Dress Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Amount Per Piece</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Advance Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Tailor Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Remaining Balance</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold max-w-[150px] truncate">Finishing Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.order_id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm">{order.order_id}</td>
                                    <td className="px-6 py-4 text-sm">{order.customer_name}</td>
                                    <td className="px-6 py-4 text-sm">{order.customer_contact_number}</td>
                                    <td className="px-6 py-4 text-sm">{order.dress_type}</td>
                                    <td className="px-6 py-4 text-sm">{order.amount_per_piece}</td>
                                    <td className="px-6 py-4 text-sm">{order.quantity}</td>
                                    <td className="px-6 py-4 text-sm">{order.advance_amount}</td>
                                    <td className="px-6 py-4 text-sm">{order.tailor_name}</td>
                                    <td className="px-6 py-4 text-sm">
                                        {calculateRemainingBalance(order.amount_per_piece, order.quantity, order.advance_amount).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm max-w-[150px] truncate">{new Date(order.finishing_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm">{order.order_status}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleEditClick(order.order_id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-6 py-4 text-center text-gray-500">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Order Modal */}
            {isModalOpen && (
                <EditOrderModal
                    orderId={selectedOrderId}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onOrderUpdated={handleOrderUpdated}
                />
            )}
        </div>
    );
};

export default OrderList;