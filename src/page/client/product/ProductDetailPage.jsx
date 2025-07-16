import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVariantById } from "../../../services/variantApi";
import { toast } from "react-toastify";
import { addItemToCart } from "../../../services/cartApi";

const ProductDetailPage = () => {
  const { id } = useParams(); // Lấy ID biến thể từ URL
  const navigate = useNavigate(); // Khởi tạo navigate hook

  const [mainVariantData, setMainVariantData] = useState(null); // Biến thể chính được tải ban đầu
  const [allProductVariants, setAllProductVariants] = useState([]); // Tất cả biến thể của sản phẩm
  const [selectedVariant, setSelectedVariant] = useState(null); // Biến thể đang được hiển thị (có thể thay đổi khi người dùng chọn)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(""); // Ảnh lớn đang được chọn
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const [activeTab, setActiveTab] = useState("description"); // Tab đang hoạt động: 'description', 'returnPolicy', 'reviews'

  // State để quản lý trạng thái loading riêng cho nút "Thêm vào giỏ"
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        // API call now returns { mainVariant, allRelatedVariants }
        const response = await getVariantById(id); 

        setMainVariantData(response.data.mainVariant); // Lưu biến thể chính
        setAllProductVariants(response.data.allRelatedVariants); // Lưu tất cả biến thể liên quan
        setSelectedVariant(response.data.mainVariant); // Đặt biến thể được chọn ban đầu là biến thể chính

        // Thiết lập ảnh đầu tiên của biến thể được chọn làm ảnh chính
        if (
          response.mainVariant &&
          response.mainVariant.images &&
          response.mainVariant.images.length > 0
        ) {
          setSelectedImage(response.mainVariant.images[0]);
        } else if (
          response.mainVariant &&
          response.mainVariant.productId?.thumbnail
        ) {
          setSelectedImage(response.mainVariant.productId.thumbnail);
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
        setError(
          err.response?.data?.message || "Không thể tải chi tiết sản phẩm."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]); // Chạy lại khi ID biến thể trên URL thay đổi

  // Cập nhật ảnh chính khi selectedVariant thay đổi (ví dụ khi chọn màu/size khác)
  useEffect(() => {
    if (selectedVariant) {
      if (selectedVariant.images && selectedVariant.images.length > 0) {
        setSelectedImage(selectedVariant.images[0]);
      } else if (selectedVariant.productId?.thumbnail) {
        setSelectedImage(selectedVariant.productId.thumbnail);
      }
      setQuantity(1); // Reset số lượng về 1 khi biến thể thay đổi
    }
  }, [selectedVariant]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount)); // Đảm bảo số lượng không nhỏ hơn 1
  };

  // Hàm xử lý khi chọn một biến thể khác (click vào nút biến thể)
  const handleVariantClick = (variantToSelect) => {
    setSelectedVariant(variantToSelect);
    // Tùy chọn: nếu bạn muốn URL thay đổi theo biến thể được chọn
    // navigate(`/product-detail/${variantToSelect._id}`);
  };

  // Hàm xử lý khi click "Thêm vào giỏ hàng"
  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Vui lòng chọn một biến thể sản phẩm.");
      return;
    }
    if (quantity <= 0) {
      toast.error("Số lượng phải lớn hơn 0.");
      return;
    }
    if (quantity > selectedVariant.stock) {
      toast.error(`Số lượng yêu cầu vượt quá số lượng tồn kho (${selectedVariant.stock}).`);
      return;
    }

    setAddingToCart(true); // Bắt đầu quá trình thêm vào giỏ hàng
    try {
      const response = await addItemToCart({
        variantId: selectedVariant._id,
        quantity: quantity,
      });
      toast.success(response.message || "Đã thêm sản phẩm vào giỏ hàng!");
      // Có thể cập nhật UI giỏ hàng nhỏ (nếu có) hoặc chuyển hướng
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
      toast.error(err.response?.data?.message || "Thêm vào giỏ hàng thất bại.");
    } finally {
      setAddingToCart(false); // Kết thúc quá trình thêm vào giỏ hàng
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Đang tải chi tiết sản phẩm...
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

  // Nếu không có variant chính được tải
  if (!mainVariantData) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Không tìm thấy sản phẩm.
      </div>
    );
  }

  // Lấy thông tin sản phẩm từ biến thể đang được chọn
  const product = selectedVariant?.productId || mainVariantData?.productId;

  // Xác định trạng thái còn hàng/hết hàng dựa trên selectedVariant
  const isInStock = selectedVariant ? selectedVariant.stock > 0 : false;

  // Giả định dữ liệu khuyến mãi và mô tả tĩnh như trong ảnh
  const promotions = [
    {
      id: 1,
      value: "50k",
      text: "Miễn phí vận chuyển",
      code: "FREESHIP2025",
      hsd: "15/07/2025",
    },
    {
      id: 2,
      value: "100k",
      text: "Giảm thêm 100k",
      code: "GIAM100",
      hsd: "15/07/2025",
    },
    {
      id: 3,
      value: "10%",
      text: "Đơn hàng từ 4 triệu",
      code: "EXTRA10%",
      hsd: "30/06/2025",
    },
    {
      id: 4,
      value: "20%",
      text: "Đơn hàng từ 12 triệu",
      code: "EXTRA20%",
      hsd: "30/06/2025",
    },
  ];

  const productDescription = `
    <h3 class="text-xl font-semibold mb-4 text-gray-800">Đặc điểm nổi bật</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li><strong>Chất liệu:</strong> Thân giày bằng vải canvas bền bỉ, lót trong bằng vải dệt, đế ngoài bằng cao su giúp tăng độ bền và linh hoạt.</li>
        <li><strong>Thiết kế:</strong> Kiểu dáng thấp cổ (low-top) với dây buộc truyền thống, logo Converse Star Chevron nổi bật ở bên hông.</li>
        <li><strong>Đệm lót:</strong> Lót giày êm ái, hỗ trợ tốt cho các hoạt động hàng ngày.</li>
        <li><strong>Đế giày:</strong> Đế cao su lưu hóa (vulcanized rubber) giúp tăng độ bền và độ bám.</li>
    </ul>
    <h3 class="text-xl font-semibold mt-6 mb-4 text-gray-800">Công nghệ và tiện ích</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li><strong>Đệm lót OrthoLite:</strong> Mang lại cảm giác êm ái và hỗ trợ tối ưu cho bàn chân trong suốt quá trình sử dụng.</li>
        <li><strong>Đế ngoài cao su:</strong> Đảm bảo độ bám tốt và tăng độ bền cho đôi giày.</li>
    </ul>
  `;

  // Hàm để copy mã khuyến mãi
  const copyToClipboard = (text) => {
    // Sử dụng document.execCommand('copy') cho tương thích iframe
    document.execCommand('copy', false, text);
    toast.info(`Đã sao chép mã: ${text}`); // Thay alert bằng toast
  };

  return (
    <div className="container mx-auto p-4 md:p-8 font-inter">
      {/* Product breadcrumb/header */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Trang chủ &gt; Giày dép &gt; {product?.name || "Sản phẩm"}
        </p>
      </div>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Left Column: Images */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-lg h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center mb-4 shadow-md">
            <img
              src={
                selectedImage ||
                product?.thumbnail ||
                "https://placehold.co/500x500/e0e0e0/ffffff?text=No+Image"
              }
              alt={product?.name || "Product Image"}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto w-full max-w-lg justify-center">
            {/* Ảnh thumbnail của Product */}
            {product?.thumbnail && (
              <img
                src={product.thumbnail}
                alt="Product Thumbnail"
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                  selectedImage === product.thumbnail
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(product.thumbnail)}
              />
            )}
            {/* Các ảnh của Variant đang được chọn */}
            {selectedVariant?.images && selectedVariant.images.length > 0 ? (
              selectedVariant.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Variant Image ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === image
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))
            ) : (
              // Nếu không có ảnh biến thể, hiển thị ảnh thumbnail của sản phẩm nếu có
              product?.thumbnail && (
                <img
                  src={product.thumbnail}
                  alt="Product Thumbnail"
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage === product.thumbnail
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(product.thumbnail)}
                />
              )
            )}
            {/* Nếu không có ảnh nào (cả thumbnail và variant images), hiển thị placeholder */}
            {!product?.thumbnail &&
              (!selectedVariant?.images ||
                selectedVariant.images.length === 0) && (
                <img
                  src="https://placehold.co/80x80/e0e0e0/ffffff?text=No+Image"
                  alt="No Image"
                  className="w-20 h-20 object-cover rounded-md border-2 border-transparent"
                />
              )}
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="w-full lg:w-1/2 p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            🔥Deal Cuối - Chốt Nhanh! {product?.name || "Tên Sản Phẩm"}
          </h1>
          {/* Hiển thị trạng thái còn hàng/hết hàng */}
          <p
            className={`font-semibold text-sm mb-4 ${
              isInStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {isInStock
              ? `Còn hàng (${selectedVariant?.stock} sản phẩm)`
              : "Hết hàng"}
          </p>

          <div className="text-gray-700 text-sm mb-4">
            Thương hiệu:{" "}
            <span className="font-semibold">
              {product?.brandId?.name || "N/A"}
            </span>{" "}
            | Loại:{" "}
            <span className="font-semibold">
              {product?.categoryId?.name || "N/A"}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <p className="text-red-600 text-3xl font-bold">
              {selectedVariant?.price
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(selectedVariant.price)
                : "N/A"}
            </p>
            {/* Giá gốc nếu có */}
            {selectedVariant?.originalPrice && (
              <p className="text-gray-400 line-through text-lg">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(selectedVariant.originalPrice)}
              </p>
            )}
          </div>

          {/* New Section: Select Variant Type */}
          <div className="mb-6">
            <p className="text-gray-700 font-semibold mb-2">Chọn loại:</p>
            <div className="flex flex-wrap gap-2">
              {allProductVariants.length > 0 ? (
                allProductVariants.map((variantOption) => (
                  <button
                    key={variantOption._id}
                    onClick={() => handleVariantClick(variantOption)}
                    className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                      selectedVariant?._id === variantOption._id
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {/* Hiển thị thông tin biến thể, ví dụ: "Màu: Đỏ, Size: 40" */}
                    {`${variantOption.color || "N/A"} / ${
                      variantOption.size || "N/A"
                    }`}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Không có biến thể khác.</p>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-2 text-xl text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1 || !isInStock || addingToCart} // Disable thêm khi đang thêm vào giỏ
              >
                -
              </button>
              <span className="px-4 py-2 text-lg font-semibold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-2 text-xl text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity >= selectedVariant?.stock || !isInStock || addingToCart} // Disable thêm khi đang thêm vào giỏ
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart} // Gắn hàm handleAddToCart vào nút
              className="flex-1 bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isInStock || addingToCart} // Disable nếu hết hàng hoặc đang thêm vào giỏ
            >
              {addingToCart ? "Đang thêm..." : "Thêm vào giỏ"}
            </button>
            <button
              className="flex-1 border border-blue-500 text-blue-500 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isInStock || addingToCart} // Disable nếu hết hàng hoặc đang thêm vào giỏ
            >
              Mua ngay
            </button>
          </div>

          {/* Store Availability */}
          <div className="flex items-center text-gray-700 mb-6">
            <i className="ri-store-line mr-2"></i>
            <p>
              Có {selectedVariant?.stock} sản phẩm có sẵn tại cửa hàng.
            </p>
            <i className="ri-add-line ml-auto cursor-pointer"></i>
          </div>

          {/* Promotions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white shadow-sm"
              >
                <div className="flex items-center">
                  <span className="text-xl font-bold text-red-500 mr-3">
                    {promo.value}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {promo.text}
                    </p>
                    <p className="text-xs text-gray-500">Mã: {promo.code}</p>
                    <p className="text-xs text-gray-500">HSD: {promo.hsd}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(promo.code)}
                  className="px-3 py-1 bg-gray-100 text-blue-600 rounded-md text-sm hover:bg-gray-200 transition-colors"
                >
                  Sao chép mã
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Description, Return Policy, Reviews Tabs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "description"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            MÔ TẢ
          </button>
          <button
            onClick={() => setActiveTab("returnPolicy")}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "returnPolicy"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            CHÍNH SÁCH ĐỔI TRẢ
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "reviews"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            BÌNH LUẬN
          </button>
        </div>

        {activeTab === "description" && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: productDescription }}
          >
            {/* Nội dung mô tả sản phẩm sẽ được render ở đây */}
          </div>
        )}
        {activeTab === "returnPolicy" && (
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold mb-4">Chính sách đổi trả</h3>
            <p>
              Sản phẩm được đổi trả trong vòng 7 ngày kể từ ngày mua hàng nếu có
              lỗi từ nhà sản xuất. Vui lòng giữ lại hóa đơn và bao bì gốc.
            </p>
            <p className="mt-2">
              Các sản phẩm đã qua sử dụng hoặc bị hư hỏng do lỗi của người dùng
              sẽ không được đổi trả.
            </p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold mb-4">Bình luận</h3>
            <p>Chưa có bình luận nào cho sản phẩm này.</p>
            {/* Thêm form bình luận và danh sách bình luận ở đây */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
