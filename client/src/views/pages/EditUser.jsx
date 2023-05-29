import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
	name: yup
		.string("Add a name")
		.min(4, "name should have a minimum of 4 characters ")
		.required("name is required"),
});

const EditUser = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [imagePreview, setImagePreview] = useState("");

	const navigate = useNavigate();

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues: {
			name,
			email,
			image: "",
		},

		validationSchema: validationSchema,
		enableReinitialize: true,
		onSubmit: (values, actions) => {
			updateUser(values);
			//alert(JSON.stringify(values, null, 2));
			actions.resetForm();
		},
	});

	//show user by Id
	const showUser = async () => {
		// console.log(id)
		try {
			const { data } = await axios.get(`/api/me`);
      console.log("nya",data);
			setName(data.user.name);
			setEmail(data.user.email);
			setImagePreview(data.user.image.url);
			console.log("User: ", data.name);
		} catch (error) {
			console.log(error);
			toast.error(error, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	useEffect(() => {
		showUser();
	}, []);

	const updateUser = async (values) => {
    console.log("values", values);
		try {
      const { data } = await axios.put(`/api/update/me`, values);
      console.log("data", data);
			if (data.success === true) {
				toast.success("user updated", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				navigate("/user/dashboard");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.error, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	return (
		<>
			<Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
				<Typography variant="h5" sx={{ pb: 4 }}>
					{" "}
					Update User Information{" "}
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						sx={{ mb: 3 }}
						fullWidth
						id="name"
						label="User name"
						name="name"
						InputLabelProps={{
							shrink: true,
						}}
						placeholder="User name"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.name && Boolean(errors.name)}
						helperText={touched.name && errors.name}
					/>

					<Box sx={{ bgcolor: "white", p: 3 }}>
						<p>E-mail: {values.email}</p>
					</Box>

					<Box border="2px dashed blue" sx={{ p: 1 }}>
						<Dropzone
							acceptedFiles=".jpg,.jpeg,.png"
							multiple={false}
							//maxFiles={3}
							onDrop={(acceptedFiles) =>
								acceptedFiles.map((file) => {
									const reader = new FileReader();
									reader.readAsDataURL(file);
									reader.onloadend = () => {
										setFieldValue("image", reader.result);
									};
								})
							}
						>
							{({ getRootProps, getInputProps, isDragActive }) => (
								<Box
									{...getRootProps()}
									p="1rem"
									sx={{
										"&:hover": { cursor: "pointer" },
										bgcolor: isDragActive ? "#cceffc" : "#fafafa",
									}}
								>
									<input name="image" {...getInputProps()} />
									{isDragActive ? (
										<>
											<p style={{ textAlign: "center" }}>
												<CloudUploadIcon
													sx={{ color: "primary.main", mr: 2 }}
												/>
											</p>
											<p style={{ textAlign: "center", fontSize: "12px" }}>
												{" "}
												Drop here!
											</p>
										</>
									) : values.image === null ? (
										<>
											<p style={{ textAlign: "center" }}>
												<CloudUploadIcon
													sx={{ color: "primary.main", mr: 2 }}
												/>
											</p>
											<p style={{ textAlign: "center", fontSize: "12px" }}>
												Drag and Drop image here or click to choose
											</p>
										</>
									) : (
										<>
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-around",
													alignItems: "center",
												}}
											>
												<Box>
													<img
														style={{ maxWidth: "100px" }}
														src={
															values.image === "" ? imagePreview : values.image
														}
														alt=""
													/>
												</Box>
											</Box>
										</>
									)}
								</Box>
							)}
						</Dropzone>
					</Box>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						elevation={0}
						sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
						// disabled={loading}
					>
						Update user
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default EditUser;
