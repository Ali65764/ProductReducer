import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext()

const initialValue = {
    products: [],
    singleProduct: null,
    favourite: JSON.parse(localStorage.getItem("favourite")) || [],
    search: "",
    originalData: [],
    basket: JSON.parse(localStorage.getItem("basket")) || [],
    totalPrice: 0,
    totalItems: 0
}


function reducer(state, action) {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload, originalData: action.payload };
        case "GET_SINGLE_PRODUCT":
            return { ...state, singleProduct: action.payload };
        case "ADD_FAVOURITE":
            const isAlreadyFavourite = state.favourite.find((fv) => fv.id === action.payload.id)
            if (isAlreadyFavourite) {
                const updatedFavourite = state.favourite.filter((fv) => fv.id !== action.payload.id)
                return { ...state, favourite: updatedFavourite }
            }
            else {
                const newFavourites = [...state.favourite, { ...action.payload }]
                return { ...state, favourite: newFavourites }
            };
        case "REMOVE_PRODUCT":
            const selectProduct = state.favourite.filter((fav) => fav.id !== action.payload.id)
            return { ...state, favourite: selectProduct };
        case "SEARCH_PRODUCTS":
            return { ...state, search: action.payload };
        case "SORT_PRODUCTS":
            const sortedData = [...state.products]
            sortedData.sort((a, b) => {
                switch (action.payload) {
                    case "Sort By Title":
                        return a.title.localeCompare(b.title)
                    case "Sort By Brand":
                        return (a.brand || "").localeCompare(b.brand)
                    case "Low To High":
                        return a.price - b.price
                    case "High To Low":
                        return b.price - a.price
                }
            })
            return { ...state, products: sortedData };
        case "RESET_PRODUCTS":
            return { ...state, products: state.originalData };
        case "ADD_BASKET":
            const newBasket = [...state.basket, { ...action.payload, count: 1 }]
            return { ...state, basket: newBasket };
        case "REMOVE_BASKET":
            const removeProduct = state.basket.filter((bsk) => bsk.id !== action.payload.id)
            return { ...state, basket: removeProduct };
        case "REMOVE_ALL_PRODUCTS":
            return { ...state, basket: [] }
        case "INCREMENT_PRODUCT":
            const incrementProduct = state.basket.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, count: item.count + 1 }
                }
                return item;
            })
            return { ...state, basket: incrementProduct };
        case "DECREMENT_PRODUCT":
            const decrementProduct = state.basket.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, count: item.count > 1 ? item.count - 1 : item.count }
                }
                return item;
            })
            return { ...state, basket: decrementProduct };
        case "CALCULATE_PRODUCTS":
            const totalProducts = state.basket.reduce((total, item) => total + item.count * item.price, 0)
            return { ...state, totalPrice: totalProducts };
        case "CALCULATE_ITEMS":
            const totalItems = state.basket.reduce((total, item) => total + item.count, 0)
            return { ...state, totalItems: totalItems }
        default:
            return state;
    }
}

const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValue)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        localStorage.setItem("favourite", JSON.stringify(state.favourite))
    }, [state.favourite])

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(state.basket))
    }, [state.basket])


    return (
        <GlobalContext.Provider value={{ state, dispatch, loading, setLoading }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext)
export { GlobalContextProvider, useGlobalContext }