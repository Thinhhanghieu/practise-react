import { createBrowserRouter } from "react-router-dom";
import Reducer from "../pages/Reducer";
import MainLayout from "../components/layout/MainLayout";
import ReactFormilkPage from "../pages/ReactHookForm";
import FormikContext from "../pages/FormikContext";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
    children: [
      {
        path:'reducer',
        element: <Reducer/>
      },
      {
        path: 'formilk',
        element: <ReactFormilkPage/>
      },
      {
        path: 'formik-context',
        element: <FormikContext/>
      }
    ]
	},
]);
