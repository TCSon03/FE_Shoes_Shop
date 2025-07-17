import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderStatusSchema } from "../../../validation/order/orderSchema";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetail, updateOrderStatus } from "../../../services/orderApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const OrderEdit = () => {
  const { orderId } = useParams();
  const nav = useNavigate();

  const [order, setOrder] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: {
      status: "pending",
      cancelReason: "",
    },
  });

  const selectedStatus = watch("status");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderDetail(orderId);
        setOrder(res.data.order);
        reset({
          status: res.data.order.status,
          cancelReason: "",
        });
      } catch (err) {
        toast.error("Không lấy được chi tiết đơn hàng");
      }
    };

    fetchOrder();
  }, [orderId, reset]);
  const onSubmit = async (data) => {
    try {
      await updateOrderStatus(orderId, data);
      toast.success("Cập nhật trạng thái thành công");
      nav("/admin/order");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Lỗi khi cập nhật trạng thái"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow font-sans">
      <h2 className="text-xl font-semibold mb-4">
        Cập nhật trạng thái đơn hàng
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Select status */}
        <div>
          <label className="block mb-1 font-medium">Trạng thái</label>
          <select {...register("status")} className="w-full border p-2 rounded">
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="received">Received</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Cancel reason nếu chọn Cancelled */}
        {selectedStatus === "cancelled" && (
          <div>
            <label className="block mb-1 font-medium">Lý do hủy</label>
            <textarea
              {...register("cancelReason")}
              placeholder="Nhập lý do hủy"
              className="w-full border p-2 rounded"
            />
            {errors.cancelReason && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cancelReason.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default OrderEdit;
