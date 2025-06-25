import type { Response } from "../../../../models/response";
import type { GetAllProductsResponse } from "../../../../models/responses/get-all-products-response";

export const getAllProductsMock = {
  errorCode: 0,
  errorMessage: "",
  response: [
    {
        _id: 1,
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613297/p_img1_xwwelr.png"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: 2,
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 200,
        image: 
        ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613296/p_img2_1_sokrvs.png",
          "https://res.cloudinary.com/dq9demmal/image/upload/v1750613296/p_img2_2_viv236.png",
          "https://res.cloudinary.com/dq9demmal/image/upload/v1750613296/p_img2_3_qqtqdh.png",
          "https://res.cloudinary.com/dq9demmal/image/upload/v1750613297/p_img2_4_vtthqt.png"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        _id: 3,
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 220,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613298/p_img3_iiexto.png"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        bestseller: true
    },
    {
        _id: 4,
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 110,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613298/p_img4_klzilt.png"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "XXL"],
        bestseller: true
    },
    {
        _id: 5,
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 130,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613297/p_img5_sutvog.png"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        bestseller: true
    },
    {
        _id: 6,
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 140,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613298/p_img6_sbupgg.png"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        bestseller: true
    },
    {
        _id: 7,
        name: "Men Tapered Fit Flat-Front Trousers",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 190,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613298/p_img7_lsdms7.png"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        bestseller: false
    },
    {
        _id: 8,
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 140,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613298/p_img8_vbweja.png"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false
    },
    {
        _id: 9,
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613298/p_img9_ge2ynx.png"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        bestseller: false
    },
    {
        _id: 10,
        name: "Men Tapered Fit Flat-Front Trousers",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 110,
        image: ["https://res.cloudinary.com/dq9demmal/image/upload/v1750613298/p_img10_ik2z4q.png"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        bestseller: false
    },
  ],
} as Response<GetAllProductsResponse>;