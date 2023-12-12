"use client"
import { RetailerMenu } from "@/components/retailerMenu/retailerMenu";
import { AffiliatesGroups } from "@/components/affiliatesGroups/affiliatesGroup";
import { ApiDataContextProvider, RetailerProps } from "@/context/apiDataContext";
import { UploadSales } from "@/components/uploadSales/uploadSales";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CreateRetailer } from "@/components/createRetailer/createRetailer";
import { CreateAffiliate } from "@/components/createAffiliate/createAffiliate";
import { ImportSales } from "@/components/ImportSales/ImportSales";

interface PageClientProps {
    retailers: RetailerProps[];
}

export const PageClient = ({ retailers }: PageClientProps) => {

    return (
        <ApiDataContextProvider
            retailers={retailers}
        >
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
            <div className="relative mt-10 w-[90vw] max-x-[800px] inset-x-0 m-auto">
                <CreateRetailer/>
                <CreateAffiliate/>
                <hr className="my-10"/>
                 <ImportSales/>       
            </div>
        </ApiDataContextProvider>
    );
}