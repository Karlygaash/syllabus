import './App.css';
import MainLayout from './layout/MainLayout';
import Authorization from './page/Authorization';
import Login from './page/Login';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Project from './page/Project';
import Profile from './page/Profile';
import './styles/ConfirmModal.css'
import './styles/global.css'
import AddStep1 from './page/AddStep1';
import AddStep2 from './page/AddStep2';
import AddStep3 from './page/AddStep3';
import AddStep4 from './page/AddStep4';
import SyllabusById from './page/SyllabusById';
import EditStep1 from './page/EditStep1';
import EditStep2 from './page/EditStep2';
import EditStep3 from './page/EditStep3';
import EditStep4 from './page/EditStep4';
import ProfileEdit from './page/ProfileEdit';
import ProfilePassword from './page/ProfilePassword';
import Restore from './page/Restore';
import OtherSyllabus from './page/OtherSyllabus';
import OtherSyllabusById from './page/OtherSyllabusById';
import AddMadeBy from './page/AddMadeBy';
import AddQuestions from './page/AddQuestions';
import EditMadeBy from './page/EditMadeBy';
import EditQuestions from './page/EditQuestions';

function App() {
  const router=createBrowserRouter([
    {
      path: "/login",
		  element: <Login/>,
    },
    {
      path: "/authorization",
      element: <Authorization/>
    },
    {
      path: "/restore",
      element: <Restore/>
    },
    {
      path: "*",
    	element: <h1>404 ERROR</h1>
    },
    {
      element: <MainLayout/>,
      children: [
        {
          path: "/",
          element: <Project/>
        },
        {
          path: "/:syllabusId",
          element: <SyllabusById/>
        },
        {
          path: "/:syllabusId/edit",
          element: <EditStep1/>
        },
        {
          path: "/:syllabusId/edit/step2",
          element: <EditStep2/>
        },
        {
          path: "/:syllabusId/edit/step3",
          element: <EditMadeBy/>
        },
        {
          path: "/:syllabusId/edit/step4",
          element: <EditStep3/>
        },
        {
          path: "/:syllabusId/edit/step5",
          element: <EditQuestions/>
        },
        {
          path: "/:syllabusId/edit/step6",
          element: <EditStep4/>
        },
        {
          path: "/add",
          element: <AddStep1/>
        },
        {
          path: "/add/:syllabusId/step2",
          element: <AddStep2/>
        },
        {
          path: "/add/:syllabusId/step3",
          element: <AddMadeBy/>
        },
        {
          path: "/add/:syllabusId/step4",
          element: <AddStep3/>
        },
        {
          path: "/add/:syllabusId/step5",
          element: <AddQuestions/>
        },
        {
          path: "/add/:syllabusId/step6",
          element: <AddStep4/>
        },
        {
          path: "/profile",
          element: <Profile/>
        },
        {
          path: "/profile/edit",
          element: <ProfileEdit/>
        },
        {
          path: "/profile/password",
          element: <ProfilePassword/>
        },
        {
          path: "/syllabus",
          element: <OtherSyllabus/>
        },
        {
          path: "/syllabus/:syllabusId",
          element: <OtherSyllabusById/>
        }
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
				position="bottom-left"
				autoClose={3000}
				closeOnClick
				draggable
				hideProgressBar={true}
			/>
    </div>
  );
}

export default App;
