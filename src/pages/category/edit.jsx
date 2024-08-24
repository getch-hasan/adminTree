import Select from 'react-select';
import { useParams } from "react-router-dom";
import { Toastify } from "../../components/toastify"
import { Link, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { useCallback, useEffect, useState } from "react"
import { networkErrorHandeller } from "../../utils/helper"
import { SingleSelect, TextInput } from '../../components/input';
import { SkeletonForm } from '../../components/loading/skeleton-table';

export const CategoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    /* reosure show */
    const fetchData = useCallback(async () => {
        try {
            const response = await NetworkServices.Category.show(id)
            if (response.status === 200) {
                setData(response.data.data)
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }, [])

    /* submit reosurce */
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const payload = {
                ...data,
                parent_id: data?.parent_id?.value
            }
            const response = await NetworkServices.Category.update(id, payload)
            if (response.status === 201) {
                navigate('/dashboard/category')
                return Toastify.Success(response.data.message);
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }

    /* category parent list */
    const fetchCategory = useCallback(async () => {
        try {
            const response = await NetworkServices.Category.parentList()
            if (response.status === 200) {
                const options = response.data.data.map(item => ({
                    "value": item.category_id,
                    "label": item.category_name,
                }))
                setOptions(options)
            }

        } catch (error) {
            networkErrorHandeller(error)
        }
    }, [])


    useEffect(() => {
        fetchData()
        fetchCategory()
    }, [])


    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Category Create</h2>
            <Link to="/dashboard/category">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    list
                </span>
            </Link>
        </section>
        {data ?
            <section className="shadow-md my-5 p-4 px-6">
                <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4">
                        <SingleSelect
                            label="Category"
                            name="parent_id"
                            control={control}
                            error={errors.parent_id && errors.parent_id.message}
                            defaultvalue={
                                data
                                    ? {
                                        label: data?.parent?.category_name,
                                        value: data?.parent?.category_id,
                                    }
                                    : null
                            }
                            options={options}
                            isClearable={true}
                            placeholder="Select parent category"
                            rules={{ required: "Category is required" }}
                        />
                    </div>

                    <div>
                        {/* category name */}
                        <TextInput
                            label="Category Name"
                            name="category_name"
                            type="text"
                            placeholder="Enter category name"
                            control={control}
                            error={errors.category_name && errors.category_name.message}
                            defaultvalue={data ? data?.category_name : "s"}
                            rules={{ required: "Category name is required" }}
                        />
                    </div>

                    {/* submit button */}
                    <div className="my-4 flex justify-center">
                        <PrimaryButton loading={loading} name="submit"></PrimaryButton>
                    </div>

                </form>
            </section>
            : <>
                <SkeletonForm></SkeletonForm>
            </>}

       

    </>
}