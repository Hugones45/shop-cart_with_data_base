import { useProductsContext } from "../../context/ProductsContext"
import { BsTrash } from "react-icons/Bs"

export function Cart() {

    const { user, PlusOrMinus, DeleteProduct } = useProductsContext()

    return (
        <div className="w-full max-w-6xl mx-auto ">


            <div className="flex gap-20">
                <div>
                    {user.map((item) =>

                        <section key={item.id} className="flex items-center justify-between border-b-2 mb-2 p-3 gap-3">
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    className="w-32 hover:scale-110 duration-300"
                                    src={item.cover} alt={item.title} />

                                <p className="text-cente font-semibold">ASmartwatch Samsung Galaxy Watch 5, BT, 40mm</p>
                            </div>

                            <div className="flex items-center gap-5 p-1 md:gap-20 lg:gap-40">
                                <strong>Preço - R$ {item.price}</strong>

                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => PlusOrMinus(item, 'minus')}
                                        className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">-</button>
                                    <p>{item.amount}</p>
                                    <button
                                        onClick={() => PlusOrMinus(item, 'plus')}
                                        className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">+</button>
                                </div>

                                <div className="cursor-pointer" onClick={() => DeleteProduct(item)}><BsTrash size={24} /></div>

                                <strong>Total - R$ {parseFloat((item.amount * item.price).toFixed(2))}</strong>
                            </div>

                        </section>
                    )}
                </div>

                <div className="w-full px-5">
                    <div className="flex justify-between flex-col items-center w-full max-w-6xl">

                        <div className="w-full max-w-4xl bg-green-300 flex justify-between">
                            <h1>Sub Total</h1>
                            <h1>R$ 200,00</h1>
                        </div>

                        <div className="w-full max-w-4xl bg-green-300 flex justify-between">
                            <h1>Frete</h1>
                            <h1>R$ 200,00</h1>
                        </div>

                        <div className="w-full max-w-4xl bg-green-300 flex justify-between">
                            <h1>Total</h1>
                            <h1>R$ 200,00</h1>
                        </div>

                        <div>


                        </div>

                    </div>
                    <button>Finalizar Compra</button>
                </div>
            </div>
        </div>
    )
}