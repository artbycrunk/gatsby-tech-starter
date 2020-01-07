import React, { Component } from 'react';
import './PhotoGallery.css';
import Img from 'gatsby-image';
import Carousel, { Modal, ModalGateway } from 'react-images';

const path = require('path');

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            currentImage: 0,
            imageSizes: props.images.map(image =>
                (
                  {
                    src: image.image_path.childImageSharp.fluid.src,
                    srcSet: image.image_path.childImageSharp.fluid.srcSet
                  }
                )
            )
        };
    }

    static getTitle(currImage) {
        if (currImage.image_anno) {
            return `${currImage.image_anno} ( ${currImage.image_page} )`;
        }
        const filename = path.basename(currImage.image_path.childImageSharp.fluid.src);
        return `${filename}`;
    }

    static getTitleText(image, showTitle) {
        let title = '';
        if (showTitle) {
            title = (
              <p className="image_link_page">
                <strong>{image.image_anno}</strong>
                {` ( ${image.image_page} )`}
              </p>
            );
        }
        return title;
    }

    static getInfo(image) {
        let info = '';
        if (image.image_info) {
            info = <p className="image_info_page">{image.image_info}</p>;
        }
        return info;
    }

    onKeyDown(image, event) {
        event.preventDefault();
        this.setState();
    }

    openLightbox(image, event) {
        event.preventDefault();
        this.setState({ modalIsOpen: true, currentImage: image });
    }

    closeLightbox() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { images, showTitle } = this.props;
        const { imageSizes, currentImage, modalIsOpen } = this.state;

        return (
          <div className="photo-gallery">
            <div className="row">
              {images.map((currImage, index) => (
                <div key={currImage.image_path.childImageSharp.fluid.src}>
                  <div
                    className="image_link"
                    role="link"
                    tabIndex="0"
                    onClick={e => this.openLightbox(index, e)}
                    onKeyDown={e => this.onKeyDown(index, e)}
                  >
                    <Img
                      alt={PhotoGallery.getTitle(currImage)}
                      title={PhotoGallery.getTitle(currImage)}
                      fluid={currImage.image_path.childImageSharp.fluid}
                    />
                  </div>
                  {PhotoGallery.getTitleText(currImage, showTitle)}
                  {PhotoGallery.getInfo(currImage)}
                </div>
                    ))}
            </div>
            
            <ModalGateway>
              {modalIsOpen ? (
                <Modal 
                  onClose={() => this.closeLightbox()} 
                  closeOnEsc
                  closeOnBackdropClick
                >
                  <Carousel
                    views={imageSizes}
                    currentIndex={currentImage}
                  />
                </Modal>
            ) : null}
            </ModalGateway>
          </div>
        );

    }
}

export default PhotoGallery;
