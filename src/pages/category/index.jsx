
import { Link } from 'react-router-dom';
import { NetworkServices } from '../../network';
import DataTable from 'react-data-table-component';
import { Toastify } from '../../components/toastify';
import { useCallback, useEffect, useState } from 'react';
import { networkErrorHandeller } from '../../utils/helper';
import { SkeletonTable } from '../../components/loading/skeleton-table';


export const CategoryList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    /* fetch Data */
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await NetworkServices.Category.index()
            if (response.status === 200) {
                setData(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(true)
            networkErrorHandeller(error)
        }
    }, [])

    /* destory */
    const destroy = async(id) => {
        try {
            const response = await NetworkServices.Category.destroy(id)
            console.log("res", response);
            if (response.status === 200) {
                fetchData()
                return Toastify.Success(response.data.message) 
            }
        } catch (error) {
            networkErrorHandeller(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const columns = [
        {
            name: 'Category name',
            selector: row => row.category_name,
            sortable: true,
        },
        {
            name: 'Sub Category',
            cell: (row) => (
                row.childs.map((item, i) => {
                    return <span className='border ml-2 rounded px-2 bg-gray-200' key={i}>{item.category_name}</span>
                })
            ),
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-1">
                    <Link to={`/dashboard/category/edit/${row.category_id}`}>
                        <span className="bg-green-500 text-white btn btn-sm material-symbols-outlined">
                            edit
                        </span>
                    </Link>

                    <span onClick={()=> destroy(row.category_id)}>
                        <span className="bg-red-500 text-white btn btn-sm material-symbols-outlined">
                            delete
                        </span>
                    </span>
                </div>
            ),
        },
    ];

    return <>
        <section className="flex justify-between shadow-md p-4 px-6 rounded-md">
            <h2 className=" font-semibold text-xl">Categories</h2>
            <Link to="/dashboard/category/create">
                <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                    add
                </span>
            </Link>
        </section>

        <section className='my-5'>
            <div className='shadow-md p-4 px-6 rounded-md'>
                {loading ? <SkeletonTable /> :
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        title="Category List"
                    />
                }
            </div>
        </section >
    </>
}