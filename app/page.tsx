import Card from "./components/Card";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const url = 'https://dummyjson.com/products?limit=8';
        const options = {method: 'GET', headers: {accept: 'application/json'}};
            let apidata = null;
        try {
        const response = await fetch(url, options);
        const data = await response.json();

        apidata = await data.products;
        
        } catch (error) {
        console.error(error);
        return;
        }


  return (
    <>
 <Toaster />
     <h1 className="text-center font-semibold my-5 text-5xl capitalize">products</h1>
     <div className="min-h-screen bg-white p-10 flex gap-x-5 gap-y-8 flex-wrap items-center justify-center">
          {apidata && apidata.map((product: any) => (
            <Card
              key={product.id}
              id={product.id}
              thumbnail={product.thumbnail}
              title={product.title}
              price={product.price}
            />
          ))}
     </div>
     </>
  );
}
