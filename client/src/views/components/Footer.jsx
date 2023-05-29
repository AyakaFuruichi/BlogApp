import { Box } from '@mui/material'

const Footer = () => {
    return (
        <>
            <Box sx={{ bgcolor: "rgba(0,0,0,.7)", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ color: "#fafafa" }}>Blog App @2023</Box>
            </Box>
        </>
    )
}

export default Footer