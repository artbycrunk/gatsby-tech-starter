import React from 'react';
import { preToCodeBlock } from 'mdx-utils';

import Title from './Title';
import Subtitle from './Subtitle';
import Paragraph from './Paragraph';
import Link from '../Link/Link';
import Code from '../Code/Code';

export default {
	h1: props => <Title {...props} />,
	// h2: props => <Subtitle {...props} />,
	p: props => <Paragraph {...props} />,
	a: props => <Link className="contentLink" {...props} />,
	pre: props => {
		const preProps = preToCodeBlock(props);
		if (preProps) {
			return <Code {...preProps} />;
		}
		return <pre {...props} />;
	}
};
