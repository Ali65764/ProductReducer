import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import ProductCard from '../components/ProductCard/ProductCard'
import { FaTrashCan } from 'react-icons/fa6'
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { toast } from 'react-toastify'

const ActionCard = React.memo(({ data, navigate, handleRemoveBasket }) => (
  <>
    <p className='ml-2 text-[#0e7490] font-bold mt-2'>Total: ${(data.count * data.price).toFixed(2)}</p>
    <div className='flex justify-center mt-2'>
      <button className='p-2 bg-red-600 text-white rounded-md' onClick={() => dispatch({ type: "DECREMENT_PRODUCT", payload: data })}><FiMinus /></button>
      <p className='text-3xl text-[#4b5563] font-semibold w-11 text-center'>{data.count}</p>
      <button className='p-2 bg-green-600 text-white rounded-md' onClick={() => dispatch({ type: "INCREMENT_PRODUCT", payload: data })}><FiPlus /></button>
    </div>
    <div className="space-x-5 mt-3 mb-3 text-center flex items-center justify-center">
      <button className='text-[#0000ff] text-[38px]' onClick={() => navigate(`/detailproduct/${data.id}`)}><FaEye /></button>
      <button className="text-red-600 text-3xl" onClick={handleRemoveBasket}>
        <FaTrashCan />
      </button>
    </div>
  </>
))

function Basket() {
  const { state, dispatch } = useGlobalContext()
  const navigate = useNavigate()

  const handleRemoveBasket = (data) => {
    dispatch({ type: "REMOVE_BASKET", payload: data })
    toast.success("Product removed from basket!", { autoClose: 1500 });
  }

  return (
    <Layout>
      <div className='flex justify-center mt-3'>
        <button className='py-2 px-4 bg-red-600 rounded-md text-white' onClick={() => dispatch({ type: "REMOVE_ALL_PRODUCTS" })}>Remove All</button>
      </div>
      <div className='flex flex-wrap gap-16 py-7 justify-center'>
        {state.basket.map((data) => (
          <ProductCard product={data} key={data.id}>
            <ActionCard data={data} navigate={navigate} dispatch={dispatch} handleRemoveBasket={() => handleRemoveBasket(data)} />
          </ProductCard>
        ))}
      </div>
    </Layout>
  )
}

export default Basket