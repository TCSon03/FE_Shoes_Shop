import { Link, useLocation } from "react-router-dom";

const PaymentFail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        Thanh Toán Thất Bại
      </h1>
      <p className="text-gray-700 mb-6">
        Rất tiếc, giao dịch của bạn đã không thành công.
      </p>
      {message && (
        <p className="text-sm text-red-600 mb-6">
          Chi tiết lỗi: {decodeURIComponent(message)}
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

export default PaymentFail;
