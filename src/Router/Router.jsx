import {
    createBrowserRouter,

} from "react-router";
import Main_lay_out from "../Root/Main_lay_out";
import Home from "../Pages/Home";
import Register from "../Authentication/Register";
import Login from "../Authentication/Login";
import Privateroute from "../private/Privateroute";
import MyProfile from "../Pages/MyProfile";
import AddItems from "../Pages/AddItems";
import AllItems from "../Pages/AllItems";
import Details from "../Pages/Details";
import MyItems from "../Pages/MyItems";
import RecoveredItems from "../Pages/RecoveredItems";
import Errorpage from "../Components/Errorpage";
import HowItWorks from "../Components/HowItWorks";
import SuccessStories from "../Components/SuccessStories";

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
                path: "/LostFoundItemsPage",
                Component: AllItems
            },
            {
                path: "/SuccessStories",
                Component: SuccessStories
            },
            {
                path: "/howitworks",
                Component: HowItWorks
            },
            {
                path: '/myprofile',
                element:
                    (<Privateroute>
                        <MyProfile></MyProfile>
                    </Privateroute>)
            },
            {
                path: '/AddItem',
                element:
                    (<Privateroute>
                        <AddItems></AddItems>
                    </Privateroute>)
            },
            {
                path: '/myItems',
                element:
                    (<Privateroute>
                        <MyItems></MyItems>
                    </Privateroute>)
            },
            {
                path: '/allRecovered',
                element:
                    (<Privateroute>
                        <RecoveredItems></RecoveredItems>
                    </Privateroute>)
            },
            {
                path: '/items/:id',
                //loader: ({ params }) => fetch(`https://roommateserver-production.up.railway.app/roommates/${params.id}`),
                element:
                    (<Privateroute>
                        <Details></Details>
                    </Privateroute>)
            },
        ]
    },
    {
        path: "*",
        element: <Errorpage />
    }
]);