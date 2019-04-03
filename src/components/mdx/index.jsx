import React from 'react';
import Title from './Title';
import Subtitle from './Subtitle';
import Paragraph from './Paragraph';
import Link from '../Link/Link';
import Code from '../Code/Code';

function preToCodeBlock(preProps) {
	if (
		// children is MDXTag
		preProps.children &&
		// MDXTag props
		preProps.children.props &&
		// if MDXTag is going to render a <code>
		preProps.children.props.name === 'code'
	) {
		// we have a <pre><code> situation
		const {
			children: codeString,
			props: { className, ...props }
		} = preProps.children.props;

		let language;
		let title;
		if (className) {
			const [_language, _title] = className.split(':');
			if (_language) [, language] = _language.split('-');
			if (_title) [, title] = _title.split('=');
		}

		return {
			codeString: codeString.trim(),
			language,
			title,
			...props
		};
	}
	return false;
}

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
