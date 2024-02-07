"use client";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/store/product-slice/product-slice";
import { useDispatch, useSelector } from "@/store/store";
import { useState } from "react";
import toast from "react-hot-toast";

export function Cart() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.product);
  console.log(cartData);

  return (
    <>
      <h1 className="mb-3 text-2xl font-semibold">Cart</h1>
      {cartData?.productArray.length > 0 ? (
        <div className="grid grid-cols-3 gap-4" style={{ width: "100%" }}>
          <div className="p-2  col-span-2 rounded-md">
            {cartData?.productArray?.map((item: any, index: number) => {
              return (
                <div
                  key={item?.id}
                  className="flex justify-between shadow-md p-4 rounded-md items-center"
                >
                  <div>
                    <img src={item?.image} className="h-20 w-20" />
                  </div>
                  <h5 className="text-justify w-80">{item?.title}</h5>
                  <h4>{item?.price}</h4>
                  <div>
                    <button
                      className="text-black  mr-1 font-extrabold text-2xl"
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
                      }}
                      disabled={item?.totalQuantity > 1 ? false : true}
                    >
                      -
                    </button>
                    {item?.totalQuantity}
                    <button
                      className="text-black  ml-1 font-extrabold text-2xl"
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="min-w-7 p-2 bg-red-800 text-white rounded-md ml-1"
                    onClick={() => {
                      dispatch(deleteProduct(item.id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <div className="p-2  flex flex-col">
            <h1>
              Total Price:
              {cartData?.productArray
                .reduce((total: any, item: any) => {
                  return total + item?.totalQuantity * item.price;
                }, 0)
                .toFixed(2)}
            </h1>
            <button
              className="mt-3 w-full bg-black p-4 rounded-full text-white"
              onClick={() => {
                toast.success("Confirm purchase");
              }}
            >
              Check out
            </button>
          </div>
        </div>
      ) : (
        <div className="shadow p-2 text-center">No ~Items</div>
      )}
    </>
  );
}
