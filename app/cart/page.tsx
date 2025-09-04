"use client";
import { useContext } from "react";
import { GlobalContext } from "../globalproviders/GlobalProvider";
import { Trash2 } from "lucide-react";

import Image from "next/image";

export default function Page() {
    const ctx = useContext(GlobalContext);
    const {cart , dispatch} = ctx;
   
    console.log(dispatch);
  const handleProductIncrement = (id: number) => {
    dispatch({ type: "INCREMENT_LIST_ITEM", payload : {id : id} });
  };

  const handleProductDecrement = (id: number) => {
    dispatch({ type: "DECREMENT_LIST_ITEM", payload : {id : id}});
  };

  const deleteProduct = (id : number) => {
     dispatch({type : "DELETE_LIST_ITEM" , payload : {id : id}})
  }

  return (
    <div className="min-h-[85vh]">
      <h1 className="text-center font-semibold my-5 text-5xl text-shadow-2xs">
        checkout items
      </h1>
      <div className="max-w-[50rem] min-w-[10rem] shadow-md rounded-xl min-h-[20rem] mx-auto">
        <h2 className="text-center">your cart</h2>

        <div className="item-list mx-2">
          {/* single product item  */}
          {cart.length === 0 ? (
            <div className="text-center font-semibold text-gray-600 my-10 text-3xl">
              {"your cart is empty"}
            </div>
          ) : (
            cart.map(({ id, thumbnail, price, title, quantity }, index) => {
              return (
                <div
                  key={index}
                  className="item flex flex-row gap-8 items-center  shadow-sm justify-evenly py-1"
                >
                  <Image
                    src={`${thumbnail}`}
                    width={100}
                    height={100}
                    alt="thumbnail"
                  />
                  <p className="font-semibold captalize ">{title}</p>
                  {
                    <div className="buttons flex items-center gap-4">
                      <button
                         disabled={quantity >= 5}
                        className="disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-600 rounded-full border-1 px-2 text-center cursor-pointer inset-shadow-2xs hover:bg-blue-500 hover:text-white text-lg font-bold"
                        onClick={() => handleProductIncrement(id)}
                      >
                        +
                      </button>
                      <p>{quantity}</p>
                      <button 
                       disabled={quantity <= 1}
                      className="disabled:cursor-not-allowed disabled:bg-gray-700 rounded-full border-1 px-2 text-center cursor-pointer inset-shadow-2xs hover:bg-blue-500 hover:text-white text-lg font-bold" onClick={()=>handleProductDecrement(id)}>
                        {"-"}
                      </button>
                    </div>
                  }
                  <div className="font-semibold">${Math.round((price * quantity) * 100) / 100}</div>
                  <div onClick={() => deleteProduct(id)}  
                  className="hover:bg-red-500 hover:text-white p-2 rounded-sm text-sm hover:cursor-pointer">
                    <Trash2 />
                  </div>
                </div>
              );
            })
          )}
        </div>  
      </div>
    </div>
  );
}
