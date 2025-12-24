import React, { useCallback, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate, useParams } from 'react-router-dom'
import { GetSingleProduct } from '../service/api'
import Loading from '../components/Loading/Loading'

function DetailProduct() {
  const { state, dispatch, loading, setLoading } = useGlobalContext()
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchSingleProduct = useCallback(async () => {
    try {
      setLoading(true)
      const data = await GetSingleProduct(id)
      dispatch({ type: "GET_SINGLE_PRODUCT", payload: data })
      console.log("Product:", data);
    }
    catch (err) {
      console.error("Singledata fetch failed:", err);
    } finally {
      setLoading(false)
    }
  }, [id, dispatch])

  useEffect(() => {
    fetchSingleProduct()
  }, [fetchSingleProduct])

  const data = state.singleProduct
  return (
    <Layout>
      <div className='m-4'>
        {loading ? <Loading /> : data && (
          <div className='bg-white w-full max-w-lg mx-auto rounded-xl p-5 mt-5 md:mt-20 '>
            <img src={data.images} alt={data.title} className='w-full h-64 object-cover' />
            <div className='mt-3'>
              <p className='font-bold text-2xl'>{data.title}</p>
              <p className='text-base mt-4'><span className='text-blue-600 font-bold'>Description:</span> {data.description}</p>
              <p><span className='text-blue-600 font-bold'>Price:</span> ${data.price}</p>
              <p><span className='text-blue-600 font-bold'>Brand:</span> {data.brand}</p>
              <button className='w-full mt-2 text-lg text-blue-600 font-bold' onClick={()=>navigate("/")}>Go Back</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DetailProduct