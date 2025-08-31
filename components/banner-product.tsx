import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () =>{
    return(

        <>
            <div className="mt-4 text-center md:h-[300px]">
                <p> Sumergete en una experiencia única</p>
                <h4 className="mt-2 text-2xl md:text-4xl font-extrabold uppercase ">Productos listos para la cocina</h4>
                <p className="my-2 text-lg">Cocina con la higienica</p>
                <Link href={"/productos"} className={buttonVariants()}>Comprar</Link>
            </div>
            <div
                className=" h-[400px] sm:h-[570px] lg:h-[900px] bg-center bg-no-repeat bg-contain mt-5"
                style={{ backgroundImage: "url('/prueba1.webp')" }}
                />

        </>
    
    );
}

export default BannerProduct;