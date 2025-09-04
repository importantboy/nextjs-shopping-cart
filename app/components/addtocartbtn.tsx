"use client";
import toast from "react-hot-toast";

import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../globalproviders/GlobalProvider";


interface itemid {
  id: number;
}

export default function Addtocartbtn({ id }: itemid) {
     const ctx = useContext(GlobalContext);

  const fetchData = async (itemid : number) => {
    toast("added to cart", {
    id: "worked",
    });


    const url = `https://dummyjson.com/products/${itemid}`;
    const options = { method: "GET", headers: { accept: "application/json" } };
    const data =(await fetch(url , options)).json();
    const {id , title , thumbnail , price} = await data;
    const cartdata = {id , title , thumbnail , price , quantity : 1};

       ctx.dispatch({type : "ADD_TO_CART" , payload : cartdata})
}

        
  return (
    <div>
      <Link
        href={"#"}
        className="py-2 px-4 bg-gray-800 text-gray-50 rounded block my-5 text-center w-full"
        onClick={() => fetchData(id)}
      >
        add to cart
      </Link>
    </div>
  );
}
