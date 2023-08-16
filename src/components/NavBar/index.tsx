import { NavLink } from "react-router-dom"
import { GiShoppingCart } from "react-icons/Gi"
import { AiTwotoneShop } from "react-icons/Ai"

export function NavBar() {



    return (
        <div className="w-full bg-slate-300 mb-4">

            <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-3xl font-semibold p-4">
                <NavLink className='hover:text-blue-700/100 hover:scale-150 duration-200' to='/'><AiTwotoneShop size={39} /></NavLink>
                <NavLink to="/cart"><GiShoppingCart size={39} /></NavLink>
            </div>
        </div>
    )
}