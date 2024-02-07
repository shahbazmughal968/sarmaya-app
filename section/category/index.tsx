"use client";
import {
  useAllProductListQuery,
  useCategoriesListQuery,
} from "@/services/product-api/product-api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Category() {
  const router = useRouter();
  const { data, isLoading } = useCategoriesListQuery(null);
  const { data: allProductList }: any = useAllProductListQuery(null);
  return (
    <>
      <div className="py-6 px-8 mt-20 h-full">
        <div className="grid grid-cols-4 gap-4 ">
          {data?.map((category: any) => {
            return (
              <div
                key={category}
                className="h-10 border rounded-full flex justify-center items-center bg-black text-white cursor-pointer text-xl font-bold capitalize shadow-2xl"
                onClick={() => router.push(`/product?category=${category}`)}
              >
                {category}
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-2 ">
        <div className="grid grid-cols-4 gap-3 ">
          {allProductList?.map((product: any) => (
            <div className=" flex flex-col  bg-slate-50 border rounded-lg shadow  shadow-2xl">
              <div>
                <img
                  src={product?.image}
                  alt="product image"
                  className="h-56 w-full object-cover rounded-lg"
                />

                <div className="p-3 text-black">
                  <h5 className="mb-2  font-bold text-black">
                    {product?.title}
                  </h5>

                  <p className="mb-1 text-lg text-gray-700 dark:text-gray-400">
                    Price: {product?.price}$
                  </p>
                </div>
              </div>
              <div className="p-3  ">
                <button className=" bg-black p-3 w-full  text-white rounded-full">
                  <Link
                    href={{
                      pathname: `product/details`,
                      query: { id: product?.id },
                    }}
                  >
                    View Details
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
