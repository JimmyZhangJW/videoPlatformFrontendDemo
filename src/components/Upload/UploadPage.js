import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import UploadButton from "./UploadButton";
import UploadDetail from "./UploadDetail";
import Button from "@material-ui/core/Button";
import SparkMD5 from 'spark-md5';
import UploadLoadingButton from "./UploadLoadingButton"
import {setVideos} from "../../stateSlices/playerSlice"
import {useDispatch} from "react-redux"

const steps = ["上传视频", "添加详细信息"];
const ChunkSize = 10 * 1024 * 1024;

export default function UploadPage() {
    const [step, setStep] = useState(0)
    const [fileName, setFileName] = useState("")
    const [fileChunks, setFileChunks] = useState([])
    const [avatarImg, setAvatarImg] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [fileChunkMD5s, setFileChunkMD5s] = useState([])
    const [fileMD5, setFileMD5] = useState("")
    const [totalChunkNum, setTotalChunkNum] = useState(-1)
    const [computedChunkNum, setComputedChunkNum] = useState(0)
    const [fileSize, setFileSize] = useState(0)

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const dispatch = useDispatch()
    let fileChunkMD5Local = []

    const reset = () => {
        setStep(0)
        setFileName("")
        setFileChunks([])
        setTitle("")
        setAvatarImg("")
        setDescription("")
        setFileChunkMD5s([])
        setFileMD5("")
        setTotalChunkNum(-1)
        setComputedChunkNum(0)
        fileChunkMD5Local = []
        setFileSize(0)
        setSuccess(false)
        setLoading(false)
    }

    const onVideoUploadChanged = e => {
        if (e.target.files[0] == null) {
            return;
        }
        truncateVideoAndComputeMD5(e.target.files[0])
        setFileName(e.target.files[0].name);
        setTitle(e.target.files[0].name);
        setStep(1);
    }

    const truncateVideoAndComputeMD5 = file => {
        setFileSize(file.size)
        let remainingSize = file.size
        let sliceBuffer = []
        let idx = 0
        setTotalChunkNum(Math.ceil(file.size / ChunkSize) * 2)
        fileChunkMD5Local = Array(Math.ceil(file.size / ChunkSize))

        while (remainingSize > ChunkSize) {
            const blobChunk = file.slice(sliceBuffer.length * ChunkSize, (sliceBuffer.length + 1) * ChunkSize)
            computeFileChunkMD5(idx, blobChunk)
            sliceBuffer.push(blobChunk)
            remainingSize -= ChunkSize
            idx++
        }
        if (remainingSize > 0) {
            let blobChunk = file.slice(sliceBuffer.length * ChunkSize, file.size)
            sliceBuffer.push(blobChunk)
            computeFileChunkMD5(idx, blobChunk)
        }
        setFileChunks(sliceBuffer)
        computeFileMD5(file)

    }

    const computeFileChunkMD5 = (idx, file) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
            fileChunkMD5Local[idx] = SparkMD5.hashBinary(fileReader.result)
            setFileChunkMD5s(fileChunkMD5Local)
            setComputedChunkNum(prev => prev + 1)
        }
        fileReader.readAsBinaryString(file)
    }

    const computeFileMD5 = file => {
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        let chunks = Math.ceil(file.size / ChunkSize)
        let currentChunk = 0
        let fileReader = new FileReader();
        let spark = new SparkMD5.ArrayBuffer()
        fileReader.onload = e => {
            console.log('read chunk nr', currentChunk + 1, 'of', chunks);
            spark.append(e.target.result);
            currentChunk++;
            setComputedChunkNum(prev => prev + 1)
            if (currentChunk < chunks) {
                loadNext();
            } else {
                setFileMD5(spark.end())
            }
        }
        const loadNext = () => {
            let start = currentChunk * ChunkSize
            let end = ((start + ChunkSize) >= file.size) ? file.size : start + ChunkSize
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }
        loadNext()
    }

    const handleUpload = async () => {
        setSuccess(false)
        setLoading(true)
        // First, we need to upload the video metadata to the server
        let meta = {
            title: title,
            file_name: fileName,
            description: description,
            avatar_img: avatarImg,
            hash: fileMD5,
            size: fileSize,
            chunks: []
        }

        // Insert chunks' metas into video meta
        for (let i = 0; i < fileChunkMD5s.length; i++) {
            meta.chunks.push({
                index: i,
                hash: fileChunkMD5s[i],
                file_hash: fileMD5
            })
        }
        let response = await fetch("http://localhost:8080/videoMetas", {
            body: JSON.stringify(meta),
            headers: {
                "Content-Type": 'application/json',
            },
            method: "post"
        })
        let jsonResponse = await response.json()

        if (jsonResponse.continue === 0) {
            // continue = 0 means the file has already been uploaded, no need to upload again
            handleFinishUploading()
            return
        }

        // The following logic handles uploading file chunks and merge, it will repeat until mergeSuccess = true
        let mergeSuccess = false
        // let missingHashes = fileChunkMD5s
        do {
            // Upload fileChunks onto server
            for (let i = 0; i < fileChunkMD5s.length; i++) {
                let formData = new FormData();
                formData.append("content", fileChunks[i])
                formData.append("index", i)
                formData.append("hash", fileChunkMD5s[i])
                formData.append("file_hash", fileMD5)
                fetch('http://localhost:8080/videoChunks', {method: "POST", body: formData, mode: 'no-cors'});
            }

            // try to merge chunks
            let mergeFormData = new FormData();
            mergeFormData.append("hash", fileMD5)
            let response = await fetch("http://localhost:8080/merge", {
                method: "POST",
                body: mergeFormData
            })
            let jsonResponse = await response.json()
            mergeSuccess = jsonResponse.success
        } while (!mergeSuccess)
        handleFinishUploading()
    }

    const handleFinishUploading = () => {
        setSuccess(true)
        setLoading(false)

        async function fetchMyVideos() {
            let response = await fetch('http://localhost:8080/videoMetas')
            response = await response.json()
            dispatch(setVideos(response))
        }

        fetchMyVideos()
        setTimeout(() => {
            reset()
        }, 1000)
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
                    <UploadDetail loading={loading} fileMD5={fileMD5} fileChunkMD5s={fileChunkMD5s} title={title} avatarImg={avatarImg}
                                  description={description}
                                  setTitle={setTitle} totalChunkNum={totalChunkNum} computedChunkNum={computedChunkNum}
                                  setAvatarImg={setAvatarImg} setDescription={setDescription}/>}
                {step === steps.length - 1 && (
                    <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
                        <Button
                            style={{color: "white", "max-height": "50px", "align-self": "center"}}
                            variant="contained"
                            disabled={step === 0}
                            onClick={() => reset()}
                            sx={{mr: 1}}
                        >
                            上一步
                        </Button>

                        <Box sx={{flex: "1 1 auto"}}/>

                        <UploadLoadingButton disabled={fileMD5 === "" || computedChunkNum !== totalChunkNum} loading={loading} success={success}
                                             handleButtonClick={handleUpload}/>
                    </Box>
                )}
            </React.Fragment>
        </Box>
    )
}
