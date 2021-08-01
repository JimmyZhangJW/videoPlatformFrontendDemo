import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import {green} from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

export default function CircularIntegration(props) {
    const {loading, success, handleButtonClick, disabled} = props
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{m: 1, position: 'relative'}}>
                <Fab
                    aria-label="upload"
                    color="primary"
                    sx={buttonSx}
                    disabled={disabled}
                    onClick={handleButtonClick}
                >
                    {success ? <CheckIcon/> : <CloudUploadIcon/>}
                </Fab>
                {loading && (
                    <CircularProgress
                        size={68}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}