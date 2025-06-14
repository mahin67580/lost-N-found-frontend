import {
    createBrowserRouter,

} from "react-router";
import Main_lay_out from "../Root/Main_lay_out";
import Home from "../Pages/Home";
import Register from "../Authentication/Register";
import Login from "../Authentication/Login";
import Privateroute from "../private/Privateroute";
import MyProfile from "../Pages/MyProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Main_lay_out,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: '/myprofile',
                element:
                    (<Privateroute>
                        <MyProfile></MyProfile>
                    </Privateroute>)
            },
        ]
    },
]);