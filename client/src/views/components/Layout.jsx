import { Box } from "@mui/material";
import TopHeader from "./TopHeader";
import SidebarAdm from "./Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout =
	(Component) =>
	({ ...props }) => {
		return (
			<>
				<Navbar />
				<div style={{ display: "flex", minHeight: "100vh" }}>
					<SidebarAdm />
					<Box sx={{ width: "100%", bgcolor: "#fafafa" }}>
						<TopHeader />
						<Box sx={{ p: 3 }}>
							<Component {...props} />
						</Box>
					</Box>
				</div>
				<Footer />
			</>
		);
	};

export default Layout;
