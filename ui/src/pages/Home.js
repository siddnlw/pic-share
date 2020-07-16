import React, { Component } from "react";
import { observer } from "mobx-react";
import { Input, Button, Card, Row } from "antd";

import AlbumModel from "../models/AlbumModel";
import { handleErrors } from "../models/ErrorHandler";
import { TextCenter } from "../styles/Home";
import { Container } from "../styles/Common";

const { Meta } = Card;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { newAlbum: "" };
    AlbumModel.getAll();
  }

  createAlbum = () => {
    if (this.state.newAlbum === "") return;
    AlbumModel.create({ title: this.state.newAlbum })
      .then(res => {
        AlbumModel.getAll();
      })
      .catch(handleErrors);
  };

  render() {
    let extraCount = 3 - (AlbumModel.all.length % 3);
    if (AlbumModel.isLoading) return <div>Loading...</div>;
    return (
      <Container>
        <h1>
          <TextCenter>Albums</TextCenter>
        </h1>

        <Row type="flex" justify="space-around" align="middle">
          {AlbumModel.all.map((album, index) => (
            <Card
              key={index}
              hoverable
              style={{ width: "30%" }}
              cover={
                <img
                  alt="example"
                  src="http://www.goodtrend.goodebookreviews.com/wp-content/uploads/woocommerce-placeholder-600x600.png"
                />
              }
            >
              <Meta title={album.title} description={album.user.name} />
            </Card>
          ))}
          {[...Array(extraCount).keys()].map(element => {
            return <div style={{ width: "30%" }}> </div>;
          })}
        </Row>
        <Input onChange={e => this.setState({ newAlbum: e.target.value })} />
        <Button onClick={this.createAlbum}>Create</Button>
      </Container>
    );
  }
}

export default observer(Home);
