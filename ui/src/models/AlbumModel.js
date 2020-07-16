import BaseModel from "./BaseModel";
import { extendObservable } from "mobx";

class AlbumModel extends BaseModel {
  constructor() {
    super("api/albums");
    extendObservable(this, {
      all: [],
      images: [],
      isLoading: true
    });
  }

  getAll = () => {
    return fetch(`${this.baseApi}/${this.api}`)
      .then(data => data.json())
      .then(res => {
        this.all = res.data.map(e => {
          e.key = e._id;
          return e;
        });
        this.isLoading = false;
      });
  };

  getImages = id => {
    return fetch(`${this.baseApi}/api/${id}/images`)
      .then(data => data.json())
      .then(res => {
        this.images = res.data.map(e => {
          e.key = e._id;
          return e;
        });
      });
  };
}

const album = new AlbumModel();

export default album;
