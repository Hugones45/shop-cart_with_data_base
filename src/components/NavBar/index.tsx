import { NavLink } from "react-router-dom"
import { GiShoppingCart } from "react-icons/Gi"
import { AiTwotoneShop } from "react-icons/Ai"
import { useProductsContext } from "../../context/ProductsContext"

export function NavBar() {

    const { user } = useProductsContext()

    return (
        <div className="w-full bg-slate-300 mb-4 sticky top-0 z-50">

            <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-3xl font-semibold p-4">
                <NavLink className='hover:text-blue-700/100 hover:scale-150 duration-200' to='/'><AiTwotoneShop size={39} /></NavLink>

                <div className="relative mr-2">
                    <NavLink to="/cart"><GiShoppingCart size={42} /></NavLink>
                    {user.length > 0 && <div className="absolute left-6 bottom-3 bg-red-600 rounded-full h-8 w-8 text-white flex items-center justify-center text-2xl"><p>{user.length}</p></div>}
                </div>

            </div>
        </div>
    )
}