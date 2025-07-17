import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "./../../../services/cartApi";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const DELIVERY_FEE = 0;
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      setCart(res.data.cart);
    } catch (err) {
      toast.error("Không thể tải giỏ hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (variantId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItemQuantity(variantId, newQuantity);
      await fetchCart();
      toast.success("Cập nhật số lượng thành công");
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi cập nhật số lượng");
    }
  };

  const handleRemoveItem = async (variantId) => {
    try {
      await removeCartItem(variantId);
      await fetchCart();
      toast.success("Đã xóa sản phẩm");
    } catch (err) {
      toast.error("Lỗi khi xóa sản phẩm");
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const calculateSubTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => {
      const price = item.variantId?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const subTotal = calculateSubTotal();
  const total = subTotal + DELIVERY_FEE - discount;

  if (loading) return <div className="p-6">Loading...</div>;

  if (!cart || cart.items.length === 0)
    return <div className="p-6">Your cart is empty.</div>;

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 font-sans mb-7">
      <div className="md:col-span-1 bg-white border border-gray-100 rounded-lg shadow-sm p-6 space-y-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Summary</h2>

        {/* Shipping Estimate */}
        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-gray-800 font-semibold mb-3">
            Estimate Shipping
          </h3>
          <div className="text-sm text-gray-500 mb-4">
            Enter your destination to get a shipping estimate
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 mb-4 text-sm focus:ring-blue-500 focus:border-blue-500">
            <option>Country</option>
            <option>USA</option>
            <option>Vietnam</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/Province
          </label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 mb-4 text-sm focus:ring-blue-500 focus:border-blue-500">
            <option>Choose...</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zip/Postal Code
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Zip/Postal Code"
          />
        </div>

        {/* Price Breakdown */}
        <div className="text-sm text-gray-700 space-y-3 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Sub-Total</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(subTotal, "EUR")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Delivery Charges</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(DELIVERY_FEE, "EUR")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Coupon Discount</span>
            <button
              className="text-green-600 text-sm hover:underline"
              onClick={() => setDiscount(10)} // giả lập giảm $10
            >
              Apply Discount
            </button>
          </div>
          <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-200 mt-4 text-gray-900">
            <span>Total Amount</span>
            <span>{formatCurrency(total, "EUR")}</span>
          </div>
        </div>
      </div>

      {/* Product List Column - Đã chỉnh sửa chiều rộng cart */}
      <div className="md:col-span-2 bg-white border border-gray-100 rounded-lg shadow-sm p-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 text-gray-500 uppercase text-xs">
            <tr>
              {/* Giảm padding để thu hẹp cột */}
              <th className="pb-3 pr-0">Product</th>
              <th className="pb-3 px-0">Price</th>
              <th className="pb-3 px-0">Quantity</th>
              <th className="pb-3 px-0">Total</th>
              <th className="pb-3 pl-0 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cart.items.map((item) => {
              const variant = item.variantId;
              return (
                <tr key={variant?._id} className="">
                  {/* Giảm kích thước ảnh và khoảng cách gap */}
                  <td className="py-4 pr-0 flex items-center gap-2">
                    <img
                      src={
                        variant?.image ||
                        variant?.productId?.thumbnail ||
                        "https://placehold.co/60x60" // Về lại 60x60
                      }
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                    <div>
                      <div className="font-medium text-gray-800 text-sm">
                        {" "}
                        {/* text-sm cho tên sản phẩm */}
                        {variant?.productId?.name || "Product"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {variant?.color} / {variant?.size}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-0 text-gray-700 text-sm">
                    {" "}
                    {formatCurrency(variant?.price || 0, "EUR")}
                  </td>
                  <td className="py-4 px-0">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden w-24 h-8">
                      {" "}
                      <button
                        onClick={() =>
                          handleQuantityChange(variant._id, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-white hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300 h-full flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-1 border-x border-gray-300 text-gray-700 text-sm h-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(variant._id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-white hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300 h-full flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-0 font-semibold text-gray-900 text-sm">
                    {" "}
                    {/* text-sm cho tổng tiền */}
                    {formatCurrency(
                      (variant?.price || 0) * item.quantity,
                      "EUR"
                    )}
                  </td>
                  <td className="py-4 pl-0 text-center">
                    <button
                      onClick={() => handleRemoveItem(variant._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.924a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.924a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.924a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Action buttons - Giữ nguyên như ảnh 2 */}
        <div className="flex justify-between items-center mt-6">
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Continue Shopping
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium text-base transition-colors duration-200 shadow">
            <Link to={`/checkout`}>Check Out</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
