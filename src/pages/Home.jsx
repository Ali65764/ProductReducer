import React, { useCallback, useEffect } from "react";
import Layout from "../components/Layout/Layout"
import { useGlobalContext } from "../context/GlobalContext"
import { GetProducts } from "../service/api";
import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import ProductCard from "../components/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { toast } from "react-toastify";

const ActionCard = React.memo(({ isInBasket, isInFavourite, navigate, handleAddBasket, product, handleAddFavourite }) => (
    <div className="text-center mt-5">
        <button className="text-white bg-[#374151] py-1 px-5 rounded-md"
            onClick={handleAddBasket}>
            {isInBasket(product.id) ? "Added" : "Add To Card"}
        </button>
        <div className="space-x-5 text-5xl mt-3">
            <button className="text-[#0000ff]" onClick={() => navigate(`/detailproduct/${product.id}`)}><FaEye /></button>
            <button className="text-red-600 text-[45px]"
                onClick={handleAddFavourite}>
                {isInFavourite(product.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
        </div>
    </div>
))

function Home() {
    const { state, dispatch, loading, setLoading } = useGlobalContext();
    const navigate = useNavigate()

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            const data = await GetProducts()
            dispatch({ type: "GET_PRODUCTS", payload: data.products })
            console.log(data);

        }
        catch (err) {
            console.error("Data fetch failed:", err);
            throw err;
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const isInFavourite = (productId) => {
        return state.favourite.find((fav) => fav.id === productId)
    }

    const isInBasket = (productId) => {
        return state.basket.find((bsk) => bsk.id === productId)
    }

    const filteredProducts = state.products.filter((prod) =>
        prod.title.toLowerCase().includes(state.search.toLowerCase()));

    const handleAddBasket = (product) => {
        dispatch({ type: "ADD_BASKET", payload: product })
        toast.success("Product added basket successfully!", { autoClose: 1500 })
    }

    const handleAddFavourite = (product, isFav) => {
        dispatch({ type: "ADD_FAVOURITE", payload: product })
        toast[isFav ? "warning" : "success"](
            isFav ? "Product removed from favourite" : "Product added favourite successfully" ,{autoClose:1500}
        )
    }
    return (
        <Layout>
            <div className="flex md:flex-row flex-col justify-center items-center md:space-y-0 space-y-3 md:space-x-2 bg-[#374151] p-5">
                <input type="Search" className=" w-[230px] outline-none px-3 py-1 rounded-md" placeholder="Search..."
                    onChange={(e) => dispatch({ type: "SEARCH_PRODUCTS", payload: e.target.value })} />
                <select className="py-1 px-3 rounded-md w-[170px]" onChange={(e) => dispatch({ type: "SORT_PRODUCTS", payload: e.target.value })}>
                    <option>Select Sorted</option>
                    <option value="Sort By Title">Sort By Title</option>
                    <option value="Sort By Brand">Sort By Brand</option>
                    <option value="Low To High">Low To High</option>
                    <option value="High To Low">High To Low</option>
                </select>
                <button className=" text-md bg-[#ddd6fe] px-4 py-1 rounded-md" onClick={() => dispatch({ type: "RESET_PRODUCTS" })}>Reset</button>
            </div>

            <div className="flex flex-wrap gap-16 py-10 justify-center">
                {loading ?
                    <Loading />
                    : filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product}>
                            <ActionCard isInBasket={isInBasket} isInFavourite={isInFavourite} product={product}
                                navigate={navigate} dispatch={dispatch} handleAddBasket={() => handleAddBasket(product)}
                                handleAddFavourite={() => handleAddFavourite(product, isInFavourite(product.id))} />
                        </ProductCard>
                    ))
                }
            </div>
        </Layout>
    )
}

export default Home