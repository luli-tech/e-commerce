import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../store/store";
import CartTotals from "./cartTotal";


const ShoppingCart = () => {
    let dispatch = useDispatch();
    let { publicData, cart } = useSelector((state) => state.bazzar);

    const add = (productData) => {
        dispatch(
            addToCart({ id: productData.id, title: productData.title, price: productData.price, image: productData.image, description: productData.description, }))
    }

    const remove = (product) => {
        dispatch(removeFromCart(product))
    }

    const resetCart = () => {
        dispatch(clearCart())
    }

    console.log(publicData)
    console.log(cart)

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                {/* Cart Section */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                    {cart?.map((item, id) => (
                        <div
                            key={item.id}
                            className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-4 gap-4"
                        >
                            {/* Remove Button next to Image */}
                            <div className="flex items-center justify-start mb-4 md:mb-0 gap-2">
                                <button
                                    onClick={() => remove(item)}
                                    className="text-red-500 text-xl font-bold"
                                >
                                    ×
                                </button>

                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full md:w-16 md:h-16 max-w-[100px] max-h-[100px] object-cover rounded"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1">
                                {/* Title with Clamp */}
                                <h4 className="font-semibold line-clamp-2">{item.title}</h4>
                                <p className="text-gray-600">${item.price}</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex md:items-center gap-2">
                                <p className="text-gray-600 hidden md:block">Quantity</p>
                                <button onClick={() => remove(item)} className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                                    -
                                </button>
                                <p>{item.quantity}</p>
                                <button onClick={() => add(item)} className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                                    +
                                </button>
                            </div>

                            {/* Total Price */}
                            <p className="ml-0 md:ml-6 font-semibold">${(item.price * item.quantity)}</p>
                        </div>
                    ))}

                    {/* Reset Cart Button */}
                    <button
                        onClick={resetCart}
                        className="w-fit px-1 py-1 bg-red-600 text-white  font-bold hover:bg-red-700"
                    >
                        Reset Cart
                    </button>
                </div>

                {/* Cart Totals */}
                <div className="lg:w-1/3 w-full bg-gray-100 p-6 rounded shadow self-start">
                    <CartTotals />
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
