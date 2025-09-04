"use client";
import { useContext } from "react";
import { GlobalContext } from "../globalproviders/GlobalProvider";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";


export default function Page() {
    const ctx = useContext(GlobalContext);
    const {cart , dispatch} = ctx;
   
  const handleProductIncrement = (id: number) => {
    dispatch({ type: "INCREMENT_LIST_ITEM", payload : {id : id} });
  };

  const handleProductDecrement = (id: number) => {
    dispatch({ type: "DECREMENT_LIST_ITEM", payload : {id : id}});
  };

  const deleteProduct = (id : number) => {
     dispatch({type : "DELETE_LIST_ITEM" , payload : {id : id}})
  }

        const totalcost = cart.reduce((acc : any, item : any) => {
                       acc+=(item.quantity * item.price);
                       return acc;
        } , 0) 
        console.log(totalcost);
        
        
  return (
    <div className="min-h-[85vh]">
      <h1 className="text-center font-semibold my-5 text-3xl text-shadow-2xs">
        checkout items
      </h1>
      <div className="max-w-[50rem] min-w-[10rem] shadow-md rounded-xl min-h-[20rem] mx-auto flex flex-col justify-between">
        <h2 className="text-center font-normal text-shadow-gray-800 text-xl">your cart</h2>

        <div className="item-list mx-2">
          {/* single product item  */}
          {cart.length === 0 ? (
            <div className="text-center font-semibold text-gray-600 my-10 text-3xl flex flex-col gap-4 items-center">
              <p>{"your cart is empty"}</p>
              <button
              onClick={() => {redirect('/')}}
              className="bg-gray-700 text-gray-50 font-light py-2 cursor-pointer rounded-md !inline w-1/2 text-xl">back to shopping </button>
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

        {/* total count is here   */}
            {
              cart.length > 0 ?  
        (
          <>
            <div className="total-count text-xl font-bold text-gray-700 my-5 capitalize flex justify-between px-5">
              <p>total</p>
              <p>${Math.round(totalcost * 100) / 100}</p>
            </div>
            <div className="proceed-button-container">
              <button 
              className="bg-gray-700 py-3 shadow-md hover:scale-105 transition-all hover:shadow-lg rounded-md  cursor-pointer text-gray-50 font-semibold text-xl block w-full">proceed to checkout</button>
            </div>
          </>
        )
              : ""
            }
      </div>
    </div>
  );
}
