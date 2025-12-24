function ProductCard({product,children}) {
    return (
        <div className="bg-[#ede9fe] rounded-[7px] p-1 w-[320px] h-auto">
            <p className="font-bold text-lg text-[#0e7490]">{product.title}</p>
            <img src={product.images[0]} alt={product.title} className="w-[290px] h-[290px]" />
            <div className="font-bold space-y-2 ml-2">
                <p className="text-[#4b5563]">{product.title.slice(0, 35)}</p>
                <p className="text-[#0e7490]">${product.price}</p>
                <p className="text-[#4b5563]">Brand: {product.brand}</p>
            </div>
            {children}
        </div>
    )
}

export default ProductCard