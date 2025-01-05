import {  useNavigate } from "react-router-dom";
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