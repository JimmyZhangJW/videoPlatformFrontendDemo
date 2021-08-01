import React, {useState} from "react";
import "./Upload.css";
import {Snackbar, TextField, CardMedia, CardContent, Card, Button, Skeleton, Alert, LinearProgress} from "@material-ui/core"

/**
 * UploadDetail renders upload details
 * @param props requires title, avatarImg, description, setTitle, setAvatarImg, setDescription
 * @returns {JSX.Element}
 * @constructor
 */
export default function UploadDetail(props) {
    const avatarRef = React.createRef();
    const {title, totalChunkNum, avatarImg, fileMD5, loading, computedChunkNum, description, setTitle, setAvatarImg, setDescription} = props

    let cardBody;
    if (avatarImg === "") {
        cardBody = (
            <Skeleton
                animation="wave"
                variant="rectangular"
                style={{maxWidth: 345}}
                width="100%"
                height={200}
            />
        );
    } else {
        cardBody = <CardMedia style={{height: 200}} image={avatarImg} title=""/>;
    }

    const [alertDisplayed, setAlertDisplayed] = useState(false)

    return (
        <div className="DetailContainer">
            <h2>基本信息</h2>
            <p>打包进度</p>
            <LinearProgress variant="determinate" value={computedChunkNum / totalChunkNum * 100}/>
            <p>封面</p>
            <Card elevation={7} style={{maxWidth: 345, maxHeight: 500}}>
                {cardBody}
                <CardContent style={{alignItems: "center"}}>
                    <form>
                        <input
                            type="file"
                            name="myImage"
                            hidden={true}
                            ref={avatarRef}
                            accept="image/*"
                            onChange={e => {
                                let reader = new FileReader();
                                if (e.target.files[0] == null) {
                                    return;
                                }
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onload = () => setAvatarImg(reader.result);
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => avatarRef.current.click()}
                            disabled={loading}
                        >
                            上传封面
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <TextField
                className="TextInputs"
                required
                id="outlined-required"
                label="标题"
                placeholder="标题哦"
                value={title}
                disabled={loading}
                onChange={e => setTitle(e.target.value)}
            />

            <TextField
                className="TextInputs"
                id="outlined-multiline-static"
                label="简介"
                multiline
                rows={4}
                value={description}
                placeholder="请填写全面的简介，让大家更好地了解你的视频吧"
                disabled={loading}
                onChange={e => setDescription(e.target.value)}
            />

            <Snackbar
                open={totalChunkNum === computedChunkNum && fileMD5 !== "" && !alertDisplayed}
                onClose={() => setAlertDisplayed(true)}
                key={"snackbar"}
                autoHideDuration={3000}
            >
                <Alert severity="success">Chunks are computed successfully!</Alert>
            </Snackbar>

        </div>
    );
}
