import React from "react";
import "./Upload.css";
import UploadDetail from "./UploadDetail";
import UploadButton from "./UploadButton";

import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { stepBackward } from "../../stateSlices/uploadSlice";

const steps = ["上传视频", "添加详细信息"];

export default function UploadStepper() {
  // const [activeStep, setActiveStep] = React.useState(0);
  const activeStep = useSelector(state => state.uploader.step);
  const dispatch = useDispatch();
  const handleFinish = () => {
    if (activeStep === 1) {
      // TODO: handle upload logic here
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      dispatch(stepBackward());
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {activeStep === 0 ? <UploadButton /> : <UploadDetail />}
        {activeStep === steps.length - 1 ? (
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              style={{ color: "white" }}
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              上一步
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              style={{ color: "white" }}
              variant="contained"
              onClick={handleFinish}
            >
              上传
            </Button>
          </Box>
        ) : (
          <div />
        )}
      </React.Fragment>
    </Box>
  );
}
