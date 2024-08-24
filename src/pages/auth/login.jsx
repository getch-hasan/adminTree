import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { getToken, networkErrorHandeller, setToken } from '../../utils/helper'

const inputStyle = "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await NetworkServices.Authentication.login(data)
            if (response.status === 200) {
                setToken(response.data.data.token);
                navigate("/dashboard");
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    useEffect(() => {
        if (getToken()) {
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <section className="flex items-center justify-center h-screen">
            <div className="shadow border border-green-100 rounded-lg" style={{ width: "350px" }}>
                <img height={60} width={60} className="mx-auto d-block border border-green-100 rounded-full mt-3" src="https://www.homestratosphere.com/wp-content/uploads/2019/07/White-ash-tree.jpg" alt="" />
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* email */}
                    <div className="my-4">
                        <label className="block">
                            <label htmlFor="" className="uppercase text-[11px] font-bold">Email <span className=" text-red-500">*</span></label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", {
                                    required: true
                                })}
                                className={inputStyle}
                                placeholder="you@example.com" />
                            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                        </label>
                    </div>
                    {/* password */}
                    <div className="my-4">
                        <label className="block">
                            <label htmlFor="" className="uppercase text-[11px] font-bold">Password <span className=" text-red-500">*</span></label>
                            <input
                                type="password"
                                name="password"
                                {...register("password", {
                                    required: true
                                })}
                                className={inputStyle}
                                placeholder="11111111" />
                            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                        </label>
                    </div>
                    {/* submit button */}
                    <div className="my-4 flex justify-center">
                        <PrimaryButton loading={loading} name="submit"></PrimaryButton>
                    </div>

                </form>
            </div>
        </section>
    )
}