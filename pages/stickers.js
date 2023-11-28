import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Product from "../models/Product";

const stickers = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font container">
        <div className="container px-5 py-24 mx-auto  ">
          <div className="flex flex-wrap justify-center ">
            {Object.keys(products).map((item) => {
              return (
                <Link
                passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                  className=" md:text-left lg:w-1/6 md:w-1/2 p-4 w-full shadow-lg cursor-pointer m-9"
                >
                  <span className="block relative  rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="m-auto md:mx-0 block"
                      src={products[item].img}
                    />
                  </span>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].desc}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                    {products[item].size.includes('S')&& <span className="border border-grey-500 px-1 mx-1">S</span>}
                    {products[item].size.includes('M')&& <span className="border border-grey-500 px-1 mx-1">M</span>}
                    {products[item].size.includes('L')&& <span className="border border-grey-500 px-1 mx-1">L</span>}
                    {products[item].size.includes('XL')&& <span className="border border-grey-500 px-1 mx-1">XL</span>}
                    {products[item].size.includes('XXL')&& <span className="border border-grey-500 px-1 mx-1">XXL</span>}
                    {products[item].size.includes('XXXL')&& <span className="border border-grey-500 px-1 mx-1">XXXL</span>}
                    </div>
                    <div className="mt-1">
                    {products[item].color.includes('Red')&& <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Blue')&& <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Black')&& <button className="border-2 border-gray-300 ml-1 bg-black-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Purple')&& <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Yellow')&& <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "sticker" });
  let stickers={};
  for(let item of products){
      if(item.title in stickers){ 
          if(!stickers[item.title].color.includes(item.color) && item.availableQty > 0){
              stickers[item.title].color.push(item.color);
          }
          if(!stickers[item.title].size.includes(item.size) && item.availableQty > 0){
              stickers[item.title].size.push(item.size);
          }
      }else{
          stickers[item.title]=JSON.parse(JSON.stringify(item));
          if(item.availableQty >0){
              stickers[item.title].color = [item.color]
              stickers[item.title].size = [item.size]
          }
      }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(stickers)) },
  };
}

export default stickers;
