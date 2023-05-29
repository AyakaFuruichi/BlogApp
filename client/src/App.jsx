import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Home from "./views/pages/Home";
import NotFound from "./views/pages/NotFound";
import { ToastContainer } from "react-toastify";
import { ProSidebarProvider } from 'react-pro-sidebar'
import { Provider } from "react-redux";
import store from './redux/store'
import Register from "./views/pages/Register";
import Login from "./views/pages/Login";
import SinglePost from "./views/pages/SinglePost";
import AdminRoute from "./views/components/AdminRoute";
import AdminDashboard from "./views/pages/AdminDashboard";
import CreatePost from "./views/pages/CreatePost";
import Layout from "./views/components/Layout";
import EditPost from "./views/pages/EditPost";
import UserDashboard from "./views/pages/UserDashBoard";
import UserRoute from "./views/components/UserRoute";
import EditUser from "./views/pages/EditUser";

//HOC
const AdminDashboardHOC = Layout(AdminDashboard);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const UserDashboardHOC = Layout(UserDashboard);
const UserEditHOC = Layout(EditUser);

function App() {
	return (
		<>
			<ToastContainer />
      <Provider store={store}>
			<ProSidebarProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />}></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/post/:id' element={<SinglePost />} />
            <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
            <Route path='/admin/post/create' element={<AdminRoute><CreatePostHOC /></AdminRoute>} />
            <Route path='/admin/post/edit/:id' element={<AdminRoute><EditPostHOC /></AdminRoute>} />
            <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
            <Route path='/user/edit/me' element={<UserRoute><UserEditHOC /></UserRoute>} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ProSidebarProvider>
      </Provider>
		</>
	);
}

export default App;
