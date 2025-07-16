import React, { useEffect, useState } from "react";
import { getCart, removeCartItem } from "../../../services/cartApi";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deletingItemId, setDeletingItemId] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCart();
      setCart(response.data.cart);
    } catch (err) {
      console.error("Lỗi khi tải giỏ hàng:", err);
      setError(err.response?.data?.message || "Không thể tải giỏ hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Hàm để xóa sản phẩm khỏi giỏ hàng
  const handleDeleteItem = async (variantId) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      setDeletingItemId(variantId); // Đặt trạng thái đang xóa
      try {
        const response = await removeCartItem(variantId);
        // Sau khi xóa thành công, fetch lại giỏ hàng để cập nhật UI
        await fetchCart();
        toast.success(response.message || "Xóa sản phẩm thành công!");
      } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
        toast.error(err.response?.data?.message || "Xóa sản phẩm thất bại.");
      } finally {
        setDeletingItemId(null); // Xóa trạng thái đang xóa
      }
    }
  };

  // Tính toán tổng phụ (Sub-Total)
  const calculateSubTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => {
      // Đảm bảo variantId và price tồn tại trước khi tính toán
      const price = item.variantId?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  const subTotal = calculateSubTotal();
  const deliveryCharges = 32.4; // Giả định phí giao hàng
  const totalAmount = subTotal + deliveryCharges;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Đang tải giỏ hàng...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Lỗi: {error}
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Giỏ hàng của bạn đang trống.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 font-inter">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Giỏ hàng của bạn
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sản phẩm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Số lượng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tổng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <tr key={item.variantId._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <img
                            className="h-16 w-16 rounded-md object-cover"
                            src={
                              item.variantId.image ||
                              item.variantId.productId?.thumbnail ||
                              "https://placehold.co/64x64/e0e0e0/ffffff?text=No+Image"
                            }
                            alt={
                              item.variantId.productId?.name || "Product Image"
                            }
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.variantId.productId?.name || "Tên sản phẩm"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.variantId.color} / {item.variantId.size}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.variantId.price || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center border border-gray-300 rounded-md w-24">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.variantId._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-full text-center text-sm font-medium text-gray-800 focus:outline-none bg-transparent"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.variantId._id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                          disabled={
                            item.quantity >= (item.variantId.stock || Infinity)
                          } // Disable if stock is reached
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format((item.variantId.price || 0) * item.quantity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteItem(item.variantId._id)}
                        className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={deletingItemId === item.variantId._id}
                      >
                        {deletingItemId === item.variantId._id ? (
                          <i className="ri-loader-4-line animate-spin text-lg"></i>
                        ) : (
                          <i className="ri-delete-bin-line text-lg"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-blue-600 hover:underline mt-4 inline-block cursor-pointer">
            Tiếp tục mua sắm
          </p>
        </div>

        {/* Right Column: Summary */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tóm tắt đơn hàng
          </h2>

          {/* Estimate Shipping */}
          <div className="mb-4">
            <div className="flex justify-between items-center cursor-pointer py-2 border-b border-gray-200">
              <span className="text-gray-700 font-medium">
                Ước tính phí vận chuyển
              </span>
              <i className="ri-arrow-down-s-line text-lg text-gray-500"></i>
            </div>
            <div className="mt-3 space-y-3">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quốc gia *
                </label>
                <select
                  id="country"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Việt Nam</option>
                  <option>Hoa Kỳ</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tỉnh/Thành phố
                </label>
                <select
                  id="state"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Hà Nội</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mã bưu chính
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="Mã bưu chính"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>Tổng phụ</span>
              <span className="font-semibold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(subTotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Phí giao hàng</span>
              <span className="font-semibold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(deliveryCharges)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mã giảm giá</span>
              <a href="#" className="text-blue-600 hover:underline">
                Áp dụng giảm giá
              </a>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
              <span>Tổng cộng</span>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalAmount)}
              </span>
            </div>
          </div>

          <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
