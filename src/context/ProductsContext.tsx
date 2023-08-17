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
        const checkId = user.some((item) => item.id === newItem.id);
        const newToCart = {
            id: newItem.id,
            title: newItem.title,
            price: newItem.price,
            cover: newItem.cover,
            amount: newItem.amount,
        };

        if (!checkId) {
            try {
                // Step 1: Send POST request to add product
                const addProductResponse = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newToCart),
                });

                // Step 2: Check if the response is successful
                if (addProductResponse.ok) {
                    // Step 3: Parse the response JSON
                    const instantPro = await addProductResponse.json();
                    // Step 4: Update the user state with the new product
                    setUser((prev) => [...prev, instantPro]);

                    toast.success("Item adicionado ao carrinho!", {
                        style: {
                            borderRadius: "10px",
                            background: "#121212",
                            color: "#fff",
                        },
                    });
                } else {
                    console.error("Error adding product:", addProductResponse.statusText);
                    // Handle error here if needed
                }
            } catch (error) {
                console.error("Error adding product:", error);
                // Handle error here if needed
            }
        } else {
            toast.error("O item já foi adicionado ao carrinho!", {
                style: {
                    borderRadius: "10px",
                    background: "#121212",
                    color: "#fff",
                },
            });
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
        });
        await getUser(); // Wait for the user data to be updated
        setUser((prev) => prev.filter((itemDel) => itemDel.id !== newItem.id))
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