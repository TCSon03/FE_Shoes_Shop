import { useEffect, useState } from "react";
import { getAllOrdersForAdmin } from "../../../services/orderApi";
import { Link } from "react-router-dom";

const LIMIT_OPTIONS = [5, 10, 20];

const AdminOrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0); // total items from API
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getAllOrdersForAdmin({ page, limit, search });
      console.log(res);

      setOrders(res.data.orders || []);
      setTotal(res.data.total || 0); // Assuming 'total' is the key for total count
    } catch (err) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, search]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // The 'handleSoftDeleteBrand' and 'Link' components from the brand example
  // are not applicable here unless you implement similar functionality for orders.
  // I've kept the action buttons with icons, assuming you'll wire them up.

  return (
    <div className="container mx-auto p-4 font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold text-[#1D2939]">
          Tất cả đơn hàng
        </h1>
        {/* Optional: Add a button here if you have an action similar to "Thêm Brand" */}
        {/* <Link
          to="/admin/orders/add" // Adjust this path as needed
          className="flex items-center gap-4 bg-purple-600 py-3 px-4 text-white font-medium rounded-xl hover:drop-shadow-xl hover:bg-purple-700 transition-all duration-300"
        >
          <i className="ri-add-line font-semibold"></i>
          <p>Thêm Đơn hàng</p>
        </Link> */}
      </div>

      {/* Search and Limit controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên người dùng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/3"
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="limit" className="text-gray-700">
            Hiển thị:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LIMIT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-gray-600">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Đang tải...
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    Không có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <p className="font-medium">
                        {order.userId?.fullName || "Ẩn danh"}
                      </p>
                      <span className="text-xs text-gray-500">
                        {order.userId?.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(order.createdAt).toLocaleString("vi-VN", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.totalAmount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-2">
                      <button
                        title="Xem chi tiết"
                        className="px-3 py-2 rounded-full text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      >
                        <i className="ri-eye-fill text-lg"></i>
                      </button>
                      <button
                        title="Cập nhật"
                        className="px-3 py-2 rounded-full text-yellow-600 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      >
                        <Link to={`/admin/order/${order._id}/status`}>
                          <i className="ri-loop-right-line text-lg"></i>
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
          <div className="text-gray-700 text-sm">
            Hiển thị {orders.length} trên tổng số {total} Đơn hàng
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
            >
              Trang trước
            </button>
            <span className="text-gray-700 font-medium">
              Trang {page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
            >
              Trang tiếp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderListPage;
