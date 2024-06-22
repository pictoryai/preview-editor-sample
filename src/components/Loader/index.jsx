import React, { useRef, useEffect } from 'react';
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        height: rect.height,
        width: rect.width
    };
}

export default ({ show }) => {
    const loadingOverlayContainer = useRef(null);
    useEffect(() => {
        if (loadingOverlayContainer.current && loadingOverlayContainer.current.parentNode) {
            let parentOffSet = getOffset(loadingOverlayContainer.current.parentNode);
            loadingOverlayContainer.current.style.height = `${parentOffSet.height}px`;
            loadingOverlayContainer.current.style.width = `${parentOffSet.width}px`;
        }
    })
    return (
        <>
            {
                show
                    ?
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            height: "100%",
                            position: "absolute",
                            width: "100%",
                            zIndex: 100,
                            background: "gray",
                            opacity: 0.5
                        }} ref={loadingOverlayContainer}>
                        <CircularProgress size={40} sx={{ color: "rgba(18, 18, 18, 0.6)" }} />
                    </Box>
                    :
                    <></>
            }
        </>

    );
};