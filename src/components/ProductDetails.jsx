import { useState } from "react";

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  if (!product) return null;

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-4">
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg border"
        />
      </div>

      <div className="flex gap-2 mb-6">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.title} ${index + 1}`}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
              selectedImage === img ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Product Info */}
      <h3 className="text-xl font-semibold text-zinc-800 mb-2">
        {product.title}
      </h3>
      <p className="text-zinc-600 mb-2">{product.description}</p>
      <p className="text-lg font-medium text-blue-600 font-outfit">
        ${product.price}
      </p>
    </div>
  );
};

export default ProductDetails;
