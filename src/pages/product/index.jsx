import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { NetworkServices } from '../../network/index'
import { useCallback, useEffect, useState } from "react"
import { BreadCrumbs } from "../../components/breadCrumbs"
import { networkErrorHandeller } from "../../utils/helper"
import { SkeletonTable } from '../../components/loading/skeleton-table';

export const Product = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    /* fetchData */ 
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await NetworkServices.Product.index()
            if (response.status === 200) {
                setData(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            networkErrorHandeller(error)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const columns = [
        {
            name: 'Image',
            cell: (row) => (
                <img src={`http://localhost:8000/${row.image}`} className='p-2 h-16 w-16 rounded-full' alt="" />
            ),
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Category',
            cell: (row) => (
                row?.category?.category_name
            ),
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    <Link to={`/dashboard/product/edit/${row.product_id}`}>
                        <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
                            edit
                        </span>
                    </Link>

                    {/* <span onClick={() => destroy(row.category_id)}>
                        <span className="bg-red-500 text-white btn btn-sm material-symbols-outlined">
                            delete
                        </span>
                    </span> */}
                </div>
            ),
        },
    ];

    return <>
        <BreadCrumbs title="Product List" link="/dashboard/product/create" icon="add" />

        <section className='my-5'>
            <div className='shadow-md p-4 px-6 rounded-md'>
                {loading ? <SkeletonTable /> :
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        title="Product List"
                    />
                }
            </div>
        </section >
    </>
}