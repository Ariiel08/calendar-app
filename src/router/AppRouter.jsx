import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


export const AppRouter = () => {

    const { status, checkToken } = useAuthStore();

    useEffect(() => {
        checkToken();
    }, []);

    if( status === 'checking' ){

        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginPage /> }/>
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>

                            <Route path="/" element={ <CalendarPage /> }/>
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

        </Routes>
    )
}
