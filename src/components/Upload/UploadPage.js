import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import UploadButton from "./UploadButton";
import UploadDetail from "./UploadDetail";
import Button from "@material-ui/core/Button";

const steps = ["上传视频", "添加详细信息"];

export default function UploadPage() {
    const [step, setStep] = useState(0)

    const [, setFileName] = useState("")
    const [, setFileChunks] = useState([])
    const [avatarImg, setAvatarImg] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const reset = () => {
        setStep(0)
        setFileName("")
        setFileChunks([])
        setTitle("")
        setAvatarImg("")
        setDescription("")
    }

    const onVideoUploadChanged = e => {
        if (e.target.files[0] == null) {
            return;
        }
        setFileName(e.target.files[0].name);
        setTitle(e.target.files[0].name);
        setStep(1);
    }

    return (
        <Box sx={{width: "100%"}}>
            <Stepper activeStep={step}>
                {steps.map((label) => {
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
                {step === 0 ? <UploadButton onChange={onVideoUploadChanged}/> :
                    <UploadDetail title={title} avatarImg={avatarImg} description={description} setTitle={setTitle}
                                  setAvatarImg={setAvatarImg} setDescription={setDescription}/>}
                {step === steps.length - 1 ? (
                    <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
                        <Button
                            style={{color: "white"}}
                            variant="contained"
                            disabled={step === 0}
                            onClick={() => reset()}
                            sx={{mr: 1}}
                        >
                            上一步
                        </Button>

                        <Box sx={{flex: "1 1 auto"}}/>

                        <Button
                            style={{color: "white"}}
                            variant="contained"
                            onClick={() => alert("implement me")}
                        >
                            上传
                        </Button>
                    </Box>
                ) : (
                    <div/>
                )}
            </React.Fragment>
        </Box>

    )

}
