import React, { useEffect } from 'react'
import { IoHome } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

const NavLink = ({ to, label }) => {
    const { pathname } = useLocation()
    return (
        <Link to={to} className={`${pathname === to ? "text-white" : "text-[#808080]"}`}>{label}</Link>
    )
}
function NavBar() {
    const { state, dispatch } = useGlobalContext()
    useEffect(() => {
        dispatch({ type: "CALCULATE_PRODUCTS" })
        dispatch({ type: "CALCULATE_ITEMS" })
    }, [state.basket, dispatch])

    return (
        <div className='bg-black  p-5'>
            <div className='flex flex-col md:flex-row items-center justify-center text-[40px] md:space-x-3'>
                <div className='flex justify-center items-center space-x-3'>
                    <NavLink to={'/'} label={<IoHome />} />
                    <NavLink to={'/favourite'} label={<FaHeart />}></NavLink>
                </div>

                <div className='flex md:mt-0 mt-2 bg-slate-900 px-2 py-1 rounded-md relative'>
                    <NavLink to={"/basket"} label={<FaBasketShopping />} />
                    <span className=' ml-2 text-white flex justify-center items-center bg-red-600 w-6 h-6 rounded-full text-base'>
                        {state.totalItems}
                    </span>
                </div>

                <div className='flex items-center bg-slate-900 rounded-md py-1 px-2 md:mt-0 mt-3'>
                    <AiFillDollarCircle className='text-[#808080]' />
                    <span className='text-xl text-white ml-1'>{state.totalPrice.toFixed(2)}$</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar