import { Avatar, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const UserDashboard = () => {
	const { user } = useSelector((state) => state.userProfile);

	return (
		<>
			<Box sx={{ bgcolor: "white", p: 3 }}>
				<h1>Dashboard</h1>

				<Avatar
					sx={{
						bgcolor: "red",
						width: 200,
						height: 200,
						border: "0.1px solid lightgray",
					}}
					aria-label="recipe"
					src={user && user.image.url}
				/>

				<p>
					<strong>User Name:</strong> {user && user.name}
				</p>
				<p>
					<strong>E-mail:</strong> {user && user.email}
				</p>
				<p>
					<strong>Role:</strong> {user && user.role}
				</p>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					width: "170px",
				}}
			>
				<Button variant="contained" color="secondary" startIcon={<EditIcon />}>
				<Link to={`/user/edit/me`} style={{ color: "white", textDecoration: "none" }}>
					{/* <IconButton aria-label="edit">
						<EditIcon sx={{ color: "#1976d2" }} />
					</IconButton> */}
					Edit Profile
				</Link>
				</Button>
			</Box>
		</>
	);
};

export default UserDashboard;
