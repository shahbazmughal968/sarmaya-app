"use client";
import {
  useAllProductListQuery,
  useProductListQuery,
} from "@/services/product-api/product-api";
import { productArrayFunc } from "@/store/product-slice/product-slice";
import { useDispatch, useSelector } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import toast from "react-hot-toast";

export function ProductList() {
  const router = useSearchParams();
  console.log(router.get("category"));

  const dispatch = useDispatch();
  const productList = useSelector((state) => state?.product?.productArray);
  const { data, isLoading }: any = useProductListQuery({
    category: router.get("category"),
  });
  const { data: allProductList }: any = useAllProductListQuery(null);

  const addToCart = (product: any) => {
    const filteredArray = productList?.findIndex(
      (items: any) => items?.id === product?.id
    );

    if (filteredArray === -1) {
      dispatch(productArrayFunc(product));
      toast.success("Product Added Successfully");
    } else toast.error("Product already Exists");
  };

  const productListFunc = () => {
    return router.get("category") ? data : allProductList;
  };

  return (
    <div className="px-2">
      <h1 className="mb-3 text-2xl font-semibold">{router.get("name")}</h1>
      <div className="grid grid-cols-4 gap-3 rounded-md ">
        {productListFunc()?.map((product: any) => (
          <div className=" flex flex-col  bg-slate-50 border rounded-lg shadow  shadow-2xl">
            <div>
              <img
                src={product?.image}
                alt="product image"
                className="h-56 w-full object-cover rounded-lg"
              />

              <div className="p-3 text-black">
                <h5 className="mb-2  font-bold text-black">{product?.title}</h5>

                <p className="mb-1 text-lg text-gray-700 dark:text-gray-400">
                  Price: {product?.price}$
                </p>
              </div>
            </div>
            <div className="p-3 flex justify-between">
              <button className=" bg-black p-3  text-white rounded-full">
                <Link
                  href={{
                    pathname: `product/details`,
                    query: { id: product?.id },
                  }}
                >
                  View Details
                </Link>
              </button>
              <button
                className="bg-black p-3  text-white rounded-full"
                onClick={() => {
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
