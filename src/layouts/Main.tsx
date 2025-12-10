import  {Suspense} from "react";
import {Outlet} from "@tanstack/react-router";

import Header from "./components/Header";
import Footer from "./components/Footer";


const Main = () => {
    return (
        <Suspense fallback={'loading'}>
            <Header/>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet/>
            </main>
            <Footer/>
        </Suspense>
    )
}

export default Main