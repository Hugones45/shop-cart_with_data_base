import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProductsContext } from "../../context/ProductsContext";
import { BsFillCartPlusFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";

interface productsProps {
  id: number;
  title: string;
  price: number;
  cover: string;
  amount: number;
  description: string;
}


export function Details() {
  const { id } = useParams();
  const { AddCart } = useProductsContext();

  const navigate = useNavigate();

  const [details, setDetails] = useState<productsProps | null>(null);

  const url = `https://shop-cart-itens.vercel.app/products/${id}`;

  useEffect(() => {
    const getData = async () => {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => setDetails(data));
    };

    getData();
  }, []);

  function gotToCart() {
    if (details) {
      AddCart(details);
      navigate("/cart");
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">

      <div className="flex items-center flex-col justify-center gap-10 lg:flex-row">

        <div>
          <img
            className="w-full rounded-lg max-w-2xl mb-2"
            src={details?.cover} alt={details?.title} />
        </div>


        <div className="w-full max-w-6xl">
          <p className="mb-5 text-3xl font-semibold"> {details?.title}</p>
          <p>{details?.description}</p>

          <div className="flex gap-10">
            <p className="mt-5 text-2xl">{details?.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}</p>
            <button className="mt-5 hover:scale-150 duration-200" onClick={() => gotToCart()}>
              <BsFillCartPlusFill size={30} />

            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
