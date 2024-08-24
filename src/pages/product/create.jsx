import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify"
import { NetworkServices } from '../../network/index'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { PrimaryButton } from "../../components/button";
import { BreadCrumbs } from "../../components/breadCrumbs";
import { networkErrorHandeller } from "../../utils/helper";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SingleSelect, TextInput } from "../../components/input";


export const ProductCreate = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const [options, setOptions] = useState([])
    const [plantBody, setPlantBody] = useState()
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState();
    const [fields, setFields] = useState([{ size: '', price: '' }]);

    /** file submit */
    function handleChangeFile(event) {
        setFile(event.target.files[0])
    }

    console.log("gt", plantBody);

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()

    const addField = () => {
        setFields([...fields, { size: '', price: '' }]);
    };

    const removeField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleChange = (index, field, value) => {
        const updatedFields = [...fields];
        updatedFields[index][field] = value;
        setFields(updatedFields);
    };

    const onSubmit = async (data) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("image", file);
        formData.append("size", JSON.stringify(fields));
        formData.append("body", data?.body);
        formData.append("title", data?.title);
        formData.append("price", data?.price);
        formData.append("ratting", data?.ratting);
        formData.append("plant_body", plantBody);
        formData.append("category_id", data?.category_id?.value);

        try {
            const response = await NetworkServices.Product.store(formData)
            navigate('/dashboard/product')
            return Toastify.Success(response.data.message);

        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    };

    /** fetchCategory */
    const fetchCategory = async () => {
        try {
            const results = [];
            const response = await NetworkServices.Category.index()
            console.log("cate res", response);
            if (response.status === 200) {
                const arrLenght = response.data.data.length;
                if (arrLenght > 0) {
                    for (let i = 0; i < arrLenght; i++) {
                        results.push({
                            value: response.data.data[i].category_id,
                            label: response.data.data[i].category_name,
                        });
                    }
                }
            }
            setOptions(results)
            return results;
        } catch (error) {
            if (error) {
                networkErrorHandeller(error);
                return [];
            }
        }
    };

    useEffect(() => {
        fetchCategory()
    }, [])

    return <>
        <BreadCrumbs title="Product Create" link="/dashboard/product" icon="list" />

        <section className="shadow-md my-5 p-4 px-6">
            <form enctype="multipart/form-data" className="px-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* product title */}
                    <TextInput
                        label="Product Title"
                        name="title"
                        type="text"
                        placeholder="Enter product title"
                        control={control}
                        error={errors.title && errors.title.message}
                        rules={{ required: "Product title is required" }}
                    />
                    {/* file */}

                    <div className="">
                        <p className="text-sm mb-1 text-gray-500">Image</p>
                        <input className="w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300" type="file" onChange={handleChangeFile} />
                    </div>
                    {/* product price */}
                    <TextInput
                        label="Product Price"
                        name="price"
                        type="text"
                        placeholder="Enter product price"
                        control={control}
                        error={errors.price && errors.price.message}
                        rules={{ required: "Product price is required" }}
                    />

                    {/* product title */}
                    <TextInput
                        label="Product Ratting"
                        name="ratting"
                        type="text"
                        placeholder="Enter product ratting"
                        control={control}
                        error={errors.ratting && errors.ratting.message}
                        rules={{ required: "Product ratting is required" }}
                    />
                    {/* ctegory */}
                    <SingleSelect
                        label="Select Category"
                        name="category_id"
                        control={control}
                        error={errors.category_id && errors.category_id.message}
                        options={options}
                        isClearable={true}
                        placeholder="Select category"
                    />

                    {/* size */}
                    <div>
                        {fields.map((field, index) => (
                            <>
                                <p className="text-sm mb-1 text-gray-500">Size with price</p>
                                <div key={index} className="field-wrapper grid grid-cols-3 gap-3">

                                    <input
                                        type="text"
                                        placeholder="Size"
                                        value={field.size}
                                        className="w-full border border-gray-200 rounded-md p-3"
                                        onChange={(e) => handleChange(index, 'size', e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="price"
                                        value={field.price}
                                        className="w-full border border-gray-200 rounded-md p-3"
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                    />
                                    <div className=" gap-3 my-auto">
                                        <span onClick={addField} class="border border-green-500 rounded-full material-symbols-outlined p-1">
                                            add
                                        </span>
                                        <span onClick={() => removeField(index)} class=" ml-1 border border-green-500 rounded-full material-symbols-outlined p-1">
                                            remove
                                        </span>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                {/* product title */}
                <div className="my-3">
                    <TextInput
                        label="Product body"
                        name="body"
                        type="text"
                        placeholder="Enter product body"
                        control={control}
                        error={errors.body && errors.body.message}
                        rules={{ required: "Product body is required" }}
                    />
                </div>

                <div className="mt-5">
                    <p className="text-sm mb-1 text-gray-500">Plant Body</p>
                    <CKEditor
                        {...register("plant_body")}
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor&nbsp;5!</p>"
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log("body", data);
                            // console.log({ event, editor, data });
                            setPlantBody(data)
                        }}
                        onBlur={(event, editor) => {
                            // console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            // console.log('Focus.', editor);
                        }}
                    />
                </div>

                {/* submit button */}
                <div className="my-4 flex justify-center col-span-2">
                    <PrimaryButton loading={loading} name="Product Submit"></PrimaryButton>
                </div>

            </form>
        </section>
    </>
}