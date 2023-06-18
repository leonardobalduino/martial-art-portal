import React, { Component } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Box,
  Typography,
  Button,
  ListItem,
  withStyles,
} from "@material-ui/core";

import UploadService from "components/Upload/upload-files.service.js";

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
  buttonUpload: {
    float: "left",
    marginRight: "10px",
  },
}))(LinearProgress);

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      progress: 0,

      message: "",
      isError: false,
      imageInfos: [],
      id: props.id,
    };
  }

  // componentDidMount() {
  //   UploadService.getFiles().then((response) => {
  //     this.setState({
  //       imageInfos: response.data,
  //     });
  //   });
  // }

  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: "",
    });
  }

  upload() {
    this.setState({
      progress: 0,
    });
    console.log(this.state.id);
    UploadService.upload(this.state.id, this.state.currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message + "Image salva com succeso!",
          isError: false,
        });
        return;
      })
      .then(() => {
        this.setState({
          message: "Image salva com succeso!",
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Não foi possível salvar a imagem!",
          currentFile: undefined,
          isError: true,
        });
      });
  }

  render() {
    const {
      currentFile,
      previewImage,
      progress,
      message,
      imageInfos,
      isError,
    } = this.state;

    return (
      <div className="mg20">
        <label
          htmlFor="btn-upload"
          style={{ float: "left", marginRight: "10px" }}
        >
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            accept={["image/jpeg", "image/pjpeg", "image/png", "image/gif"]}
            onChange={this.selectFile}
          />
          <Button className="btn-choose" variant="outlined" component="span">
            Selecione uma imagem
          </Button>
        </label>

        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!currentFile}
          onClick={this.upload}
        >
          Salvar imagem
        </Button>

        <div className="file-name">{currentFile ? currentFile.name : null}</div>
        {currentFile && (
          <Box className="my20" display="none" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${progress}%`}</Typography>
            </Box>
          </Box>
        )}

        {previewImage && (
          <div>
            <img
              className="preview my20"
              height="100px"
              src={previewImage}
              alt=""
            />
          </div>
        )}

        {message && (
          <Typography
            variant="subtitle2"
            className={`upload-message ${isError ? "error" : ""}`}
          >
            {message}
          </Typography>
        )}

        <ul className="list-group">
          {imageInfos &&
            imageInfos.map((image, index) => (
              <ListItem divider key={index}>
                <img
                  src={image.url}
                  alt={image.name}
                  height="100px"
                  className="mr20"
                />
                <a href={image.url}>{image.name}</a>
              </ListItem>
            ))}
        </ul>
      </div>
    );
  }
}

UploadImages.propTypes = {
  id: PropTypes.string,
};
