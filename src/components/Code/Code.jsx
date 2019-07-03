import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import './Code.css';

const Code = ({ codeString, language, title, ...props }) => {
	return (
  <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <div className="gatsby-highlight" data-language={language}>
        <div className="gatsby-code-title">{title}</div>
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <span className="gatsby-code-lineno">{i + 1}</span>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
								))}
            </div>
						))}
        </pre>
      </div>
			)}
  </Highlight>
	);
};

export default Code;
