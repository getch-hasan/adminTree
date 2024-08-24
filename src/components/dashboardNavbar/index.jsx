import { Link } from 'react-router-dom'

export const DashboardNavbar = () => {

    return <>
        <div className="bg-base-100 sticky top-0 z-50">
            <div className=" bg-gray-200">
                <div className='navbar '>
                    {/* responsive navbar start */}
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to="/dashboard" className='font-content font-semibold'>Dashboard</Link></li>
                                <li><Link to="/dashboard/cart" className='font-content font-semibold'>My Cart </Link></li>
                                <li><Link to="/dashboard/wishlist" className='font-content font-semibold'>My Wishlist </Link></li>
                                <li><Link to="/dashboard/order" className='font-content font-semibold'>My Order </Link></li>
                                <li><Link to="/dashboard/order" className='font-content font-semibold'>Change Password </Link></li>
                                <li><Link to="/dashboard/order" className='font-content font-semibold'>Logout </Link></li>
                            </ul>
                        </div>
                        <Link className="" to="/">
                            <img height={32} width={48} className="mx-auto d-block border border-green-100 rounded-full " src="https://www.homestratosphere.com/wp-content/uploads/2019/07/White-ash-tree.jpg" alt="" />
                        </Link>
                    </div>
                    {/* responsive navbar end */}

                    <div className="navbar-end mt-1">
                        <div className="flex items-center gap-4">

                         
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="">
                                    <div className="w-10 rounded-full">
                                        <span class="material-symbols-outlined">
                                            account_circle
                                        </span>

                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to="/dashboard" className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><Link to="/dashboard">Settings</Link></li>
                                    <li><Link to="/dashboard">Logout</Link></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
}