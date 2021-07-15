import React from "react";
import "./Upload.css";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/core/Skeleton";

/**
 * UploadDetail renders upload details
 * @param props requires title, avatarImg, description, setTitle, setAvatarImg, setDescription
 * @returns {JSX.Element}
 * @constructor
 */
export default function UploadDetail(props) {
  const avatarRef = React.createRef();
  const {title, avatarImg, description, setTitle, setAvatarImg, setDescription} = props

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
                reader.onload = () => setAvatarImg(reader.result);
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
        onChange={e => setDescription(e.target.value)}
      />
    </div>
  );
}
