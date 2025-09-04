"use client";
import { ShoppingCart, Upload } from "lucide-react";
import Link from "next/link";

import { useContext } from "react";
import { GlobalContext } from "../globalproviders/GlobalProvider";
export default function Header() {
  const ctx = useContext(GlobalContext);
  const length = ctx.cart.length;
  return (
    <div className="py-5 bg-gray-800  text-gray-50 flex px-20 justify-between ">
      <Link
        href={"/"}
        className="capitalize text-orange-300 text-xl font-bold tracking-wider"
      >
        Easy sell
      </Link>
      <div className="flex items-center gap-5 capitalize">
        <Link href={"/products/upload"} className="text-lg">
          {`upload`} <Upload className="inline" />
        </Link>
        <Link href={"cart"} className="text-lg relative">
          cart <ShoppingCart className="inline" />
          <span className=" rounded-full text-sm bg-blue-500 px-2 absolute -top-2 left-15">
            {length}
          </span>
        </Link>
      </div>
    </div>
  );
}
