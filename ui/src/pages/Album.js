import React, { Component } from "react";
import { observer } from "mobx-react";
import { extendObservable } from "mobx";
import AlbumModel from "../models/AlbumModel";
import { Upload, Button, message, Icon } from "antd";

class Album extends Component {
  constructor(props) {
    super(props);
    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
        window.location.hostname === "[::1]" ||
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );
    this.baseApi = isLocalhost
      ? "http://localhost:3001"
      : "https://my-picshare.herokuapp.com";
    extendObservable(this, { album: {} });
    AlbumModel.getImages(props.match.params.id);
    AlbumModel.find(props.match.params.id).then(data => {
      this.album = data.result;
    });
  }

  render() {
    const props = {
      name: "file",
      action: `${this.baseApi}/api/upload`,
      headers: {
        authorization: "authorization-text"
      },
      data: { album: this.props.match.params.id },
      onChange: info => {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          AlbumModel.getImages(this.props.match.params.id);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return (
      <div>
        <br />
        Name : {this.album.title}
        <br />
        By : {this.album.user ? this.album.user.name : ""}
        <br />
        {AlbumModel.images.map(image => {
          return (
            <div key={image.key}>
              <img
                src={`${this.baseApi}/images/${image.name}`}
                width="200"
                alt={image.title}
              />
              <br />
              {image.title}
            </div>
          );
        })}
        <br />
        Upload Image :{" "}
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
      </div>
    );
  }
}

export default observer(Album);
