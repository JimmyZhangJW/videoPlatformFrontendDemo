import React from "react";
import "./Upload.css";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "@material-ui/core/Skeleton";
import {
  updateAvatarImg,
  updateTitle,
  updateDescription
} from "../../stateSlices/uploadSlice";

export default function UploadDetail() {
  const avatarRef = React.createRef();
  const avatarImg = useSelector(state => state.uploader.avatarImg);
  const description = useSelector(state => state.uploader.description);
  const title = useSelector(state => state.uploader.title);
  const dispatch = useDispatch();

  let cardBody;
  if (avatarImg === "") {
    cardBody = (
      <Skeleton
        animation="wave"
        variant="rectangular"
        style={{ maxWidth: 345 }}
        width="100%"
        height={200}
      />
    );
  } else {
    cardBody = <CardMedia style={{ height: 200 }} image={avatarImg} title="" />;
  }
  return (
    <div className="DetailContainer">
      <h2>基本信息</h2>
      <p>封面</p>
      <Card elevation={7} style={{ maxWidth: 345, maxHeight: 500 }}>
        {cardBody}
        <CardContent style={{ alignItems: "center" }}>
          <form>
            <input
              type="file"
              name="myImage"
              hidden={true}
              ref={avatarRef}
              onChange={e => {
                let reader = new FileReader();
                if (e.target.files[0] == null) {
                  return;
                }
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  dispatch(updateAvatarImg(reader.result));
                };
              }}
            />
            <Button
              variant="contained"
              onClick={() => avatarRef.current.click()}
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
        onChange={e => {
          dispatch(updateTitle(e.target.value));
        }}
      />

      <TextField
        className="TextInputs"
        id="outlined-multiline-static"
        label="简介"
        multiline
        rows={4}
        value={description}
        placeholder="请填写全面的简介，让大家更好地了解你的视频吧"
        onChange={e => {
          dispatch(updateDescription(e.target.value));
        }}
      />
    </div>
  );
}
