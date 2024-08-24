import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/helper";
export const DashboardSidebar = () => {
    const navigate = useNavigate()
    /* logout */
    const logout = () => {
        removeToken()
        navigate('/')
    }
    return <>
        <div className=" col-span-1 h-screen  bg-gray-200  hidden lg:flex">
            <div className="mx-auto">
                <div className="flex  items-center my-2 mt-5">
                    <Link to="/dashboard" className="w-48 bg-white px-2 text-black font-content text-left flex items-center rounded-md py-1">
                        <img className="h-8 w-8" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHozIxtgJx0gbDdzgKy7hcRkDoP7houIjY65EDeY&s" alt="" />
                        <div className=" px-2">
                            <h4 className=" font-semibold">Bokhtiar toshar</h4>
                        </div>
                    </Link>
                </div>

                <div className="flex  items-center my-2 mt-5">
                    <Link to="/dashboard" className="w-48 bg-white px-2 text-black font-content text-left flex gap-1 items-center rounded-md py-1">
                        <span class="material-symbols-outlined text-gray-600">
                            dashboard
                        </span>
                        <span className=" font-semibold">Dashboard</span>
                    </Link>
                </div>

                <div className="flex  items-center my-2">
                    <Link to="/dashboard/category" className="w-48 bg-white px-2 text-black font-content text-left flex gap-1 items-center rounded-md py-1">
                        <span class="material-symbols-outlined text-gray-600">
                            shopping_cart
                        </span>
                        <span className=" font-semibold">Category</span>
                    </Link>
                </div>

                <div className="flex  items-center my-2">
                    <Link to="/dashboard/product" className="w-48 bg-white px-2 text-black font-content text-left flex gap-1 items-center rounded-md py-1">
                        <span class="material-symbols-outlined text-gray-600">
                            favorite
                        </span>
                        <span className=" font-semibold">Product</span>
                    </Link>
                </div>

                <div className="flex  items-center my-2">
                    <Link to="/dashboard/order" className="w-48 bg-white px-2 text-black font-content text-left flex gap-1 items-center rounded-md py-1">
                        <span class="material-symbols-outlined text-gray-600">
                            list_alt
                        </span>
                        <span className=" font-semibold">Order</span>
                    </Link>
                </div>

                <div className="flex  items-center my-2">
                    <Link to="" className="w-48 bg-white px-2 text-black font-content text-left flex gap-1 items-center rounded-md py-1">
                        <span class="material-symbols-outlined text-gray-600">
                            lock_open
                        </span>
                        <span className=" font-semibold">Chnage Password</span>
                    </Link>
                </div>

                <div className="flex  items-center my-2">
                    <span onClick={() => logout()} className="cursor-pointer w-48 bg-white px-2 text-black font-content text-left flex gap-1 items-center rounded-md py-1">
                        <span class="material-symbols-outlined text-gray-600">
                            logout
                        </span>
                        <span className=" font-semibold">Logout</span>
                    </span>
                </div>
            </div>
        </div>
    </>
}