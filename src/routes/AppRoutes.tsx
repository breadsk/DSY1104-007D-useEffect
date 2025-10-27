
import { useRoutes } from "react-router-dom";

import { ImagesApp } from "../ImagesApp";
import { RobotComponent } from "../imagesComponents/RobotComponent";

export const AppRoutes = () => {

    const routes = useRoutes([
        {
            path:'/',
            element: <ImagesApp />
        },
        {
            path:'/robot-component',
            element: <RobotComponent />
        },
        {
            path:'*',
            element:<div>Pagina no encontrada</div>
        }
    ]);

    return routes;
}
