"use client";
import { useSingleProductListQuery } from "@/services/product-api/product-api";
import { productArrayFunc } from "@/store/product-slice/product-slice";
import { useDispatch, useSelector } from "@/store/store";
import Link from "next/link";
import toast from "react-hot-toast";

export function ProductDetails({ id }: any) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state?.product?.productArray);
  const { data, isLoading } = useSingleProductListQuery({ id });
  console.log(data);

  const addToCart = () => {
    const filteredArray = productList?.findIndex(
      (items: any) => items?.id === data?.id
    );

    if (filteredArray === -1) {
      dispatch(productArrayFunc(data));
      toast.success("Item Successfully");
    } else toast.error("Item already Exists");
  };

  return (
    <div className="h-full">
      <div className=" mt-10 align-middle h-100">
        <div className=" w-full p-4">
          <img
            src={data?.image}
            alt="product image"
            className="h-60 w-4/5 object-contain rounded-lg"
          />
        </div>
        <div className="w-98">
          <div className="p-5 text-black">
            <h5 className="mb-2 text-2xl font-bold text-black">
              {data?.title}
            </h5>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data?.category}
            </p>
            <p className="mb-3 text-xs text-gray-700 dark:text-gray-400">
              {data?.description}
            </p>
            <p className="mb-3 text-xl text-gray-700 dark:text-gray-400">
              Price: {data?.price}
            </p>
          </div>
          <div className="p-3">
            <button
              className=" bg-black p-4 rounded-full text-white"
              onClick={addToCart}
            >
              <div className="flex align-middle justify-center">
                {" "}
                Add to Cart{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
