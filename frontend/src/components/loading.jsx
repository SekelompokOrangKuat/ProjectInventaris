import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Loading = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CircularProgress />
        </Box>
    )
}

export default Loading;