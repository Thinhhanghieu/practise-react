import { createBrowserRouter } from "react-router-dom";
import Reducer from "../pages/Reducer";
import MainLayout from "../components/layout/MainLayout";
import ReactFormilkPage from "../pages/ReactHookForm";
import FormikContext from "../pages/FormikContext";
import UseMemo from "../pages/UseMemo";
import UseCallBack from "../pages/UseCallback";
import AgeSelector from "../pages/RandomAge";
import FormAntd from "../pages/FormAntd";

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
      },
      {
        path: 'use-memo',
        element: <UseMemo/>
      },
      {
        path: 'use-callback',
        element: <UseCallBack/>
      },
      {
        path: 'age-option',
        element: <AgeSelector/>
      },
      {
        path: 'form-antd',
        element: <FormAntd></FormAntd>
      }
    ]
	},
]);
