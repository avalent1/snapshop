import React from 'react';

const order = {
  id: 2315,
  date: '25. June 2025',
  status: 'Ready to ship',
  products: [
    {
      id: 1,
      name: 'Men Round Neck Pure Cotton T-shirt',
      price: 35.00,
      quantity: 1,
      size: 'M',
      image: 'https://res.cloudinary.com/dq9demmal/image/upload/v1751821599/products/yajz8dw4g5uzgbuzl32d.png',
    },
    {
      id: 2,
      name: 'Girls Round Neck Cotton Top',
      price: 30.00,
      quantity: 1,
      size: 'M',
      image: 'https://res.cloudinary.com/dq9demmal/image/upload/v1751821634/products/bw1xc2tqdoewhwcsm4ni.png',
    },
    {
      id: 3,
      name: 'Men Round Neck Pure Cotton T-shirt',
      price: 44.00,
      quantity: 1,
      size: 'M',
      image: 'https://res.cloudinary.com/dq9demmal/image/upload/v1751821721/products/lmp9yrwx8s5lrhy1urwr.png',
    },
  ],
};

const order1 = {
  id: 2320,
  date: '5. August 2025',
  status: 'Ready to ship',
  products: [
    {
      id: 1,
      name: 'Men Round Neck Pure Cotton T-shirt',
      price: 35.00,
      quantity: 1,
      size: 'M',
      image: 'https://res.cloudinary.com/dq9demmal/image/upload/v1751821599/products/yajz8dw4g5uzgbuzl32d.png',
    },
    {
      id: 2,
      name: 'Girls Round Neck Cotton Top',
      price: 30.00,
      quantity: 1,
      size: 'M',
      image: 'https://res.cloudinary.com/dq9demmal/image/upload/v1751821788/products/acul54g6i4dbk1xdznlg.png',
    },
    {
      id: 3,
      name: 'Men Tapered Fit Flat-Front Trousers',
      price: 44.00,
      quantity: 1,
      size: 'M',
      image: 'https://res.cloudinary.com/dq9demmal/image/upload/v1751821909/products/ywae0aww4fdg95vm0zn9.png',
    },
  ],
};


const AdminOrderCard = () => {
  return (
    <div >
      <div className="border rounded-xl p-4 bg-white shadow-sm space-y-4">
        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-3">
          <div>
            <p className="text-lg font-semibold">Order ID: #{order.id}</p>
            <p className="text-sm text-gray-500">Date: {order.date}</p>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              {order.status}
            </span>
            <button className="ml-4 px-3 py-1 text-sm border rounded hover:bg-gray-100 transition">
              Track Order
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {order.products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 px-2 py-2 border rounded-md bg-gray-50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-cover rounded"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
              </div>
              <span className="text-sm">Qty: {product.quantity}</span>
              <span className="text-sm">Size: {product.size}</span>
              <button className="text-xs text-blue-500 underline hover:text-blue-600 transition">Remove</button>
            </div>
          ))}
        </div>
      </div>


      <div className="border rounded-xl p-4 bg-white shadow-sm space-y-4 mt-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-3">
          <div>
            <p className="text-lg font-semibold">Order ID: #{order1.id}</p>
            <p className="text-sm text-gray-500">Date: {order1.date}</p>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              {order1.status}
            </span>
            <button className="ml-4 px-3 py-1 text-sm border rounded hover:bg-gray-100 transition">
              Track Order
            </button>
          </div>
        </div>


        {/* Product List */}
        <div className="space-y-3">
          {order1.products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 px-2 py-2 border rounded-md bg-gray-50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-cover rounded"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
              </div>
              <span className="text-sm">Qty: {product.quantity}</span>
              <span className="text-sm">Size: {product.size}</span>
              <button className="text-xs text-blue-500 underline hover:text-blue-600 transition">Remove</button>
            </div>
          ))}
        </div>
      </div>

    </div>


  );

};

export default AdminOrderCard;
