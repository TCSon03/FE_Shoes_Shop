// src/pages/PaymentSuccess.jsx (hoặc PaymentSuccess.js)
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const amount = queryParams.get("amount");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="text-green-500 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Thanh Toán Thành Công!
      </h1>
      <p className="text-gray-700 mb-6">
        Giao dịch của bạn đã hoàn tất thành công.
      </p>

      {orderId && (
        <p className="text-base text-gray-700 mb-2">
          Mã đơn hàng: <strong className="font-semibold">{orderId}</strong>
        </p>
      )}
      {amount && (
        <p className="text-base text-gray-700 mb-6">
          Số tiền:{" "}
          <strong className="font-semibold">
            {parseInt(amount).toLocaleString("vi-VN")}₫
          </strong>
        </p>
      )}

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Quay lại Trang chủ
      </Link>
    </div>
  );
};

export default PaymentSuccess;
