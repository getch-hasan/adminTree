import { getToken } from "../utils/helper"
import { Product } from "../pages/product"
import { Navigate } from "react-router-dom"
import { Dashboard } from '../components/dashboard'
import { ProductEdit } from "../pages/product/edit"
import { CategoryEdit } from "../pages/category/edit"
import { CategoryList } from '../pages/category/index'
import { ProductCreate } from "../pages/product/create"
import { CategoryCreate } from "../pages/category/create"
import { DashboardLayout } from "../layouts/dashboard.layout"

const appRoutes = [
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "*", element: <Navigate to="/404" /> },
            { path: "", element: <Dashboard /> },
            
            /** category */
            { path: "category", element: <CategoryList /> },
            { path: "category/create", element: <CategoryCreate /> },
            { path: "category/edit/:id", element: <CategoryEdit /> },

            /** product */
            { path: "product", element:  <Product /> },
            { path: "product/create", element: <ProductCreate/> },
            { path: "product/edit/:id", element: <ProductEdit /> },
        ],
    },
]; 

/* Generate permitted routes */
export const permittedRoutes = () => {
    const token = getToken();
    if (token) {
        return appRoutes;
    }

    return [];
};