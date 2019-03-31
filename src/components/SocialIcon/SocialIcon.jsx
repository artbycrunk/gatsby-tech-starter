import React, { Component } from 'react';
import Link from '../Link/Link';

class SocialIcon extends Component {
	static getData() {
		return {
			default: {
				_viewbox: '0 0 64 64',
				_circleRadius: 32,
				_fgColor: 'white'
			},
			twitter: {
				_bgColor: '#00aced',
				_path:
					'M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z',
				_linkTo: 'https://twitter.com/intent/user?screen_name=$socialID'
			},
			linkedin: {
				_bgColor: '#007fb1',
				_path:
					'M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z',
				_linkTo: 'https://in.linkedin.com/in/$socialID'
			},
			github: {
				_bgColor: 'black',
				_fgColor: 'white',
				_viewbox: '0 0 24 24',
				_circleRadius: 12,
				_size: 2,
				_path:
					'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
				_linkTo: 'https://github.com/$socialID'
			}
		};
	}

	render() {
		const { socialID, network } = this.props;
		let { size, fgColor, bgColor } = this.props;

		const data = SocialIcon.getData();

		const { _fgColor, _viewbox, _circleRadius } = data.default;

		let path;
		let viewbox = _viewbox;
		let circleRadius = _circleRadius;
		let linkTo;

		if (!fgColor) {
			fgColor = _fgColor;
		}

		if (Object.prototype.hasOwnProperty.call(data, network)) {
			const { _path, _bgColor, _fgColor, _size, _viewbox, _circleRadius, _linkTo } = data[network];
			if (!bgColor) bgColor = _bgColor;
			if (!fgColor && _fgColor) fgColor = _fgColor;
			if (_size) size -= _size;
			if (_viewbox) viewbox = _viewbox;
			if (_circleRadius) circleRadius = _circleRadius;
			path = _path;
            linkTo = _linkTo.replace('$socialID', socialID);
		}

		return (
  <Link className="social_icon" target="_blank" rel="noopener noreferrer" to={linkTo}>
    <div>
      <svg className="social-svg" viewBox={viewbox} width={size} height={size}>
        <g>
          <circle cx={circleRadius} cy={circleRadius} r={circleRadius - 1} fill={bgColor} />
        </g>
        <g>
          <path d={path} fill={fgColor} />
        </g>
      </svg>
    </div>
  </Link>
		);
	}
}

export default SocialIcon;
