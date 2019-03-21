import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import styled from 'styled-components';
import theme from 'prism-react-renderer/themes/nightOwl';


export const Pre = styled.pre`
	text-align: left;
	margin: 1em 0;
	padding: 0.5em;
`;

export const LineNo = styled.span`
	display: inline-block;
	width: 2em;
	user-select: none;
	opacity: 0.3;
`;

const Code = ({ codeString, language, ...props }) => {
	return (
  <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <div className="gatsby-highlight">
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
								))}

            </div>
						))}
        </Pre>
      </div>
			)}
  </Highlight>
	);
};

export default Code;
