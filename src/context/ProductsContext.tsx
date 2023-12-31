import { useState, useEffect, ReactNode, } from "react";
import { useContext, createContext } from "react";
import { productsProps } from "../pages/home";
import toast from "react-hot-toast"

interface ContextData {
    user: cartProps[],
    AddCart: (newItem: productsProps) => void,
    PlusOrMinus: (newItem: productsProps, action: string) => void
    DeleteProduct: (newItem: productsProps) => void
}

interface cartProps {
    id: number,
    title: string,
    price: number,
    cover: string,
    amount: number,
}

interface childrenProps {
    children: ReactNode
}

export const ProductsContext = createContext({} as ContextData)

export const ProductsContextProvider = ({ children }: childrenProps) => {

    const [user, setUser] = useState<cartProps[]>([])

    const url = "https://shop-cart-itens.vercel.app/user"

    const getUser = () => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => setUser(data))
    }

    useEffect(() => {
        getUser()
    }, [])



    async function AddCart(newItem: productsProps) {

        const checkId = user.some((item) => item.id === newItem.id)

        const newToCart = {
            id: newItem.id,
            title: newItem.title,
            price: newItem.price,
            cover: newItem.cover,
            amount: newItem.amount
        }

        if (!checkId) {
            toast.success("Item added to the cart!", {
                style: {
                    borderRadius: "10",
                    background: "#121212",
                    color: "#fff"
                }
            })

            const addProduct = await fetch("http://localhost:3000/user", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newToCart)
            })

            const instantPro = await addProduct.json()
            setUser((prev) => [...prev, instantPro])

        } else {
            toast.error("Item has already been added to the cart!", {
                style: {
                    borderRadius: "10",
                    background: "#121212",
                    color: "#fff"
                }
            })
        }
    }

    async function PlusOrMinus(newItem: productsProps, action: string) {
        let newResult = newItem.amount

        if (action === "plus") {
            if (newResult === 6) {
                return
            }
            newResult++
        }

        if (action === "minus") {
            if (newResult === 1) {
                return
            }
            newResult--
        }

        const finalResult = { ...newItem, amount: newResult }
        await fetch(`${url}/${newItem.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(finalResult)
        })

        getUser()
    }

    async function DeleteProduct(newItem: productsProps) {
        await fetch(`${url}/${newItem.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then((resp) => resp.json())
            .then((_data) => setUser((prev) => prev.filter((itemDel) => itemDel.id !== newItem.id)))
    }

    return (
        <ProductsContext.Provider value={{ user, AddCart, PlusOrMinus, DeleteProduct }}>
            {children}


        </ProductsContext.Provider>
    )
}

export function useProductsContext() {
    return useContext(ProductsContext)
}