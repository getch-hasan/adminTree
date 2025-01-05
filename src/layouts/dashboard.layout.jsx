import { Outlet } from "react-router-dom";
import { DashboardNavbar } from "../components/dashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar/DashboardSidebar";

export const DashboardLayout = () => {
    return (
        <>
            <DashboardNavbar />
            <section className="">
                <div className="grid grid-cols-1 md:grid-cols-5 ">
                    <DashboardSidebar />
                    <div className=" col-span-4 p-5">
                        <Outlet />
                    </div>
                </div>
            </section>
        </>
    );
};
