import React, { Component } from 'react';
import './PhotoGallery.css';
import Img from 'gatsby-image';
import Lightbox from 'react-images';

class PhotoGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lightbox: false,
			currentImage: false,
			imageSizes: props.images.map(image =>
				Object.assign({
					src: image.image_path.childImageSharp.sizes.src,
					srcSet: image.image_path.childImageSharp.sizes.srcSet
				})
			)
		};
	}

	static getTitle(image, showTitle) {
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
		console.log(image);
		let info = '';
		if (image.image_info) {
			info = <p className="image_info_page">{image.image_info}</p>;
			console.log(info);
		}
		return info;
	}

	onKeyDown(image, event) {
		event.preventDefault();
		this.setState();
	}

	gotoPrevLightboxImage() {
		const { currentImage } = this.state;
		this.setState({ currentImage: currentImage - 1 });
	}

	gotoNextLightboxImage() {
		const { currentImage } = this.state;
		this.setState({ currentImage: currentImage + 1 });
	}

	openLightbox(image, event) {
		event.preventDefault();
		this.setState({ lightbox: true, currentImage: image });
	}

	closeLightbox() {
		this.setState({ lightbox: false });
	}

	render() {
		const { images, showTitle } = this.props;
		const { imageSizes, currentImage, lightbox } = this.state;

		return (
  <div className="photo-gallery">
    <div className="row">
      {images.map((currImage, index) => (
        <div>
          <div
            className="image_link"
            role="link"
            tabIndex={index}
            onClick={e => this.openLightbox(index, e)}
            onKeyDown={e => this.onKeyDown(index, e)}
          >
            <Img
              key={index}
									//   className={image.title}
              alt={`${currImage.image_anno} ( ${currImage.image_page} )`}
              title={`${currImage.image_anno} ( ${currImage.image_page} )`}
              sizes={currImage.image_path.childImageSharp.sizes}
            />
          </div>
          {PhotoGallery.getTitle(currImage, showTitle)}
          {PhotoGallery.getInfo(currImage)}
        </div>
					))}
    </div>
    <Lightbox
      backdropClosesModal
      images={imageSizes}
      currentImage={currentImage}
      isOpen={lightbox}
      onClickPrev={() => this.gotoPrevLightboxImage()}
      onClickNext={() => this.gotoNextLightboxImage()}
      onClose={() => this.closeLightbox()}
				/>
  </div>
		);
	}
}

export default PhotoGallery;
