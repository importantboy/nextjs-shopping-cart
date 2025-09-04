import Image from "next/image";
import Addtocartbtn from "./addtocartbtn";
interface IcardProp {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
}

export default function Card({ id, thumbnail, title, price }: IcardProp) {
  return (
    <div
      className="min-h-[300px] shadow-md min-w-[20rem] flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
      key={id}
    >
        
      <Image src={`${thumbnail}`} width={200} height={200} alt="thumbnail" priority/>
      <div className="px-2 w-full">
        <h2 className="text-md my-2">{title}</h2>
        <h3 className="text-lg font-semibold text-blue-500">${price}</h3>
         <Addtocartbtn id={id}/>
      </div>
    </div>
  );
}
