import { useState, useEffect } from "react"
import { BsFillCartPlusFill } from "react-icons/bs"
import { useProductsContext } from "../../context/ProductsContext"
import { useNavigate } from "react-router-dom"

export interface productsProps {
    id: number,
    title: string,
    price: number,
    cover: string,
    amount: number,
}

export function Home() {

    const navigate = useNavigate()

    const { AddCart } = useProductsContext()

    const [products, setProducts] = useState<productsProps[]>([])

    const url = "https://shop-cart-itens.vercel.app/products"

    const getProductsData = async () => {
        const data = await fetch(url)
        const json = await data.json()

        setProducts(json)
    }

    useEffect(() => {
        getProductsData()
    }, [])

    function goDetails(item: number) {
        navigate(`/products/${item}`)
    }

    return (
        <div className="w-full max-w-6xl mx-auto mb-16 px-5">

            <h1 className="text-center text-4xl m-5 font-bold text-zinc-500">Good Stuff!!</h1>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                {products.map((item) => <section key={item.id} className="w-full cursor-pointer">

                    <section className="w-full flex items-center flex-col mb-2 gap-3">

                        <img
                            onClick={() => goDetails(item.id)}
                            className="w-full rounded-lg max-h-70 hover:scale-105 duration-300"
                            src={item.cover} alt={item.title} />
                        <h1 className="text-2xl font-semibold text-center">{item.title}</h1>
                        <p>{item.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}</p>
                        <button className="hover:scale-150 duration-200" onClick={() => AddCart(item)}><BsFillCartPlusFill size={30} /></button>
                    </section>

                </section>)}

            </div>
        </div>
    )
}

