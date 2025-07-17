import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { orderValidation } from "../../../validation/order/orderSchema";
import { getCart } from "../../../services/cartApi";
import { toast } from "react-toastify";
import { createOrder } from "../../../services/orderApi";
import { createVnpayPaymentUrl } from "../../../services/paymentApi";

const CheckoutPage = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(orderValidation),
    defaultValues: {
      phoneNumber: "",
      paymentMethod: "COD",
      notes: "",
      shippingAddress: {
        street: "",
        ward: "",
        district: "",
        city: "",
      },
    },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    getCart()
      .then((res) => setCart(res.data.cart))
      .catch(() => toast.error("Không thể tải giỏ hàng"));
  }, []);

  const onSubmit = async (data) => {
    try {
      const orderResponse = await createOrder(data);
      const { orderId, totalAmount, paymentMethod } = orderResponse.data;

      if (paymentMethod === "Online") {
        const vnpayData = {
          orderId: orderId,
          amount: totalAmount,
          bankCode: "",
          language: "vn",
        };
        const vnpayResponse = await createVnpayPaymentUrl(vnpayData);
        const vnpUrl = vnpayResponse.data.vnpUrl;

        window.location.href = vnpUrl;
      } else if (paymentMethod === "COD") {
        toast.success("Đặt hàng thành công!");
        navigate(`/order`);
      }
      // }
    } catch (err) {
      console.error("Lỗi đặt hàng hoặc thanh toán:", err);
      const errorMessage = err.response?.data?.message || "Lỗi khi đặt hàng";
      toast.error(errorMessage);
    }
  };

  if (!cart) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Thanh toán
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cột trái: Thông tin khách hàng, Địa chỉ, Phương thức thanh toán */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Thông tin khách hàng */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Thông tin khách hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="sr-only">
                    Họ và tên
                  </label>
                  {/* Giả sử bạn có trường fullName trong form của mình, nếu không có thể bỏ qua */}
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Họ và tên *"
                    defaultValue="Nguyễn Văn A"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly /* Nếu là thông tin người dùng đã đăng nhập */
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="sr-only">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Số điện thoại *"
                    {...register("phoneNumber")}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  {/* Giả sử bạn có trường email trong form của mình, nếu không có thể bỏ qua */}
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue="example@email.com" /* Giả định dữ liệu người dùng */
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly /* Nếu là thông tin người dùng đã đăng nhập */
                  />
                </div>
              </div>
            </div>

            {/* Địa chỉ giao hàng */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.727A8 8 0 0110.5 20.25a8 8 0 01-6.237-3.037M12 18.75V21M12 3v15M10.5 7.5h.008v.008H10.5V7.5zm.008 3.75h.008v.008H10.5v-.008zm.008 3.75h.008v.008H10.5v-.008z"
                  />
                </svg>
                Địa chỉ giao hàng
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="street" className="sr-only">
                    Địa chỉ cụ thể
                  </label>
                  <input
                    type="text"
                    id="street"
                    placeholder="Số nhà, tên đường *"
                    {...register("shippingAddress.street")}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.shippingAddress?.street && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingAddress.street.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="sr-only">
                      Tỉnh/Thành phố
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="Tỉnh/Thành phố *"
                      {...register("shippingAddress.city")}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.shippingAddress?.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingAddress.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="district" className="sr-only">
                      Quận/Huyện
                    </label>
                    <input
                      type="text"
                      id="district"
                      placeholder="Quận/Huyện *"
                      {...register("shippingAddress.district")}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.shippingAddress?.district && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingAddress.district.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="ward" className="sr-only">
                      Phường/Xã
                    </label>
                    <input
                      type="text"
                      id="ward"
                      placeholder="Phường/Xã *"
                      {...register("shippingAddress.ward")}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.shippingAddress?.ward && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingAddress.ward.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="notes" className="sr-only">
                    Ghi chú
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Ghi chú (tuỳ chọn) cho đơn hàng..."
                    {...register("notes")}
                    rows="3"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                {/* ... (SVG icon) ... */}
                Phương thức thanh toán
              </h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out">
                  <input
                    type="radio"
                    value="COD"
                    {...register("paymentMethod")}
                    className="form-radio h-5 w-5 text-blue-600"
                    // defaultChecked // Bỏ defaultChecked nếu muốn có lựa chọn mặc định qua useForm
                  />
                  <span className="ml-3">
                    <span className="block text-base font-medium text-gray-900">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                    <span className="block text-sm text-gray-500">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </span>
                  </span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out">
                  <input
                    type="radio"
                    value="Online" // Giá trị này phải khớp với enum trong Order model của backend
                    {...register("paymentMethod")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3">
                    <span className="block text-base font-medium text-gray-900">
                      Thanh toán online (VNPAY)
                    </span>
                    <span className="block text-sm text-gray-500">
                      Thanh toán qua VNPAY, thẻ tín dụng, ví điện tử
                    </span>
                  </span>
                </label>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Cột phải: Đơn hàng của bạn, Tóm tắt đơn hàng */}
          <div className="flex flex-col gap-8">
            {/* Đơn hàng của bạn (Sản phẩm trong giỏ hàng) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Đơn hàng của bạn
              </h2>
              <div className="space-y-4">
                {/* Dùng `cart.items.map` để render danh sách sản phẩm */}
                {cart.items.map((item) => {
                  const variant = item.variantId;
                  const productName = variant?.productId?.name || "Sản phẩm";
                  const total = item.quantity * variant.price;

                  return (
                    <div
                      key={variant._id}
                      className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={variant.image}
                          alt={productName}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {productName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {variant.color && `Màu: ${variant.color}`}
                          {variant.color && variant.size && " | "}
                          {variant.size && `Size: ${variant.size}`}
                        </div>
                      </div>
                      <div className="text-right font-semibold text-green-600">
                        {total.toLocaleString()}₫
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Tóm tắt đơn hàng
              </h2>
              <div className="space-y-3 text-gray-700 mb-6">
                <div className="flex justify-between items-center">
                  <span>Tạm tính</span>
                  <span className="font-medium">
                    {cart.items
                      .reduce(
                        (sum, item) =>
                          sum + item.quantity * item.variantId.price,
                        0
                      )
                      .toLocaleString()}
                    ₫
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium">0₫</span>{" "}
                  {/* Ví dụ phí vận chuyển */}
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Tổng cộng</span>
                  <span className="text-red-600">
                    {(
                      cart.items.reduce(
                        (sum, item) =>
                          sum + item.quantity * item.variantId.price,
                        0
                      ) + 0
                    ).toLocaleString()}
                    ₫
                  </span>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)} /* Gắn onSubmit vào button */
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {paymentMethod === "Online"
                  ? "Thanh toán qua VNPAY"
                  : "Đặt hàng"}
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Bằng việc đặt hàng, bạn đồng ý với{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Chính sách bảo mật
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
