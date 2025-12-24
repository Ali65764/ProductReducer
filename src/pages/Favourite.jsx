import React from 'react'
import Layout from '../components/Layout/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import ProductCard from '../components/ProductCard/ProductCard';
import { FaEye } from 'react-icons/fa';
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ActionCard = React.memo(({ navigate, handleRemove, data }) => (
  <div className="space-x-5 mt-5 mb-3 text-center flex items-center justify-center">
    <button className='text-[#0000ff] text-5xl' onClick={() => navigate(`/detailproduct/${data.id}`)}><FaEye /></button>
    <button className="text-red-600 text-4xl" onClick={handleRemove}>
      <FaTrashCan />
    </button>
  </div>
))

function Favourite() {
  const { state, dispatch } = useGlobalContext();
  const navigate = useNavigate()

  const handleRemove = (data) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: data })
    toast.success("Product removed from favourite!", { autoClose: 1500 })
  }
  return (
    <Layout>
      <div className='flex flex-wrap gap-16 py-10 justify-center'>
        {state.favourite.map((data) => (
          <ProductCard product={data} key={data.id}>
            <ActionCard data={data} navigate={navigate} handleRemove={() => handleRemove(data)} />
          </ProductCard>
        ))}
      </div>
    </Layout>
  )
}

export default Favourite  