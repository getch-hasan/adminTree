
export const Dashboard = () => {
    return <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 md:my-0">
            {/* cart item start */}
            <div className="shadow-md py-2 rounded-md">
                <div className="flex justify-between items-center px-3">
                    <div className="flex gap-2">
                        <span class="material-symbols-outlined my-auto border border-primary rounded-md p-2">
                            shopping_cart
                        </span>
                        <div className="">
                            <h3 className=" font-heading text-[14px] text-primary">Cart</h3>
                            <span className=" font-content text-sm"> 3 items</span>
                        </div>
                    </div>

                    <span class="material-symbols-outlined">
                        visibility
                    </span>
                </div>
            </div>
            {/* cart item end */}

            {/* cart item start */}
            <div className="shadow-md py-2 rounded-md">
                <div className="flex justify-between items-center px-3">
                    <div className="flex gap-2">
                        <span class="material-symbols-outlined my-auto border border-primary rounded-md p-2">
                            list_alt
                        </span>
                        <div className="">
                            <h3 className=" font-heading text-[14px] text-primary">Order</h3>
                            <span className=" font-content text-sm"> 3 items</span>
                        </div>
                    </div>

                    <span class="material-symbols-outlined">
                        visibility
                    </span>
                </div>
            </div>
            {/* cart item end */}

            {/* cart item start */}
            <div className="shadow-md py-2 rounded-md">
                <div className="flex justify-between items-center px-3">
                    <div className="flex gap-2">
                        <span class="material-symbols-outlined my-auto border border-primary rounded-md p-2">
                            favorite
                        </span>
                        <div className="">
                            <h3 className=" font-heading text-[14px] text-primary">Wishlist</h3>
                            <span className=" font-content text-sm"> 3 items</span>
                        </div>
                    </div>

                    <span class="material-symbols-outlined">
                        visibility
                    </span>
                </div>
            </div>
            {/* cart item end */}
        </div>

       
    </>
}