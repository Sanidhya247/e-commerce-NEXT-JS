import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Order = ({ subTotal }) => {
    const router  = useRouter();
    console.log(router.query.order)
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              E-COMMERCE
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Congratulations ! Your order has been successfully placed.
            </h1>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <div className="overflow-x-auto relative">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="py-3 px-6 rounded-l-lg">
                              <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-sm px-1">
                                ITEMS
                              </a>
                            </th>
                            <th scope="col" className="py-3 px-6">
                              <a className="flex-grow border-b-2 border-gray-300 py-2 text-sm px-1">
                                QTY
                              </a>
                            </th>
                            <th scope="col" className="py-3 px-6 rounded-r-lg">
                              <a className="flex-grow border-b-2 border-gray-300 py-2 text-sm px-1">
                                PRICE
                              </a>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white dark:bg-gray-800">
                            <th
                              scope="row"
                              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Apple MacBook Pro 17``
                            </th>
                            <td className="py-4 px-6">1</td>
                            <td className="py-4 px-6">$2999</td>
                          </tr>
                          <tr className="bg-white dark:bg-gray-800">
                            <th
                              scope="row"
                              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Microsoft Surface Pro
                            </th>
                            <td className="py-4 px-6">1</td>
                            <td className="py-4 px-6">$1999</td>
                          </tr>
                          <tr className="bg-white dark:bg-gray-800">
                            <th
                              scope="row"
                              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Magic Mouse 2
                            </th>
                            <td className="py-4 px-6">1</td>
                            <td className="py-4 px-6">$99</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" className="py-3 px-6 text-base">
                              Total
                            </th>
                            <td className="py-3 px-6">3</td>
                            <td className="py-3 px-6">21,000</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            height={1000}
            width={1000}
            alt="ecommerce"
            className="lg:w-1/2  lg:h-auto h-64 object-cover object-center rounded"
            src={"https://dummyimage.com/400x400"}
          />
        </div>
      </div>
    </section>
  );
};

export default Order;
