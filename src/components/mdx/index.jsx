import React from 'react';

import Title from './Title';
import Subtitle from './Subtitle';
import Paragraph from './Paragraph';
import Link from '../Link/Link';

export default {
	h1: props => <Title {...props} />,
	// h2: props => <Subtitle {...props} />,
	p: props => <Paragraph {...props} />,
	a: props => <Link className="contentLink" {...props} />
};
