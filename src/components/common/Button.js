import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  color: #fff;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.2rem;
    `}

  ${(props) =>
    props.teal &&
    css`
      background: ${palette.teal[7]};
      &:hover {
        background: ${palette.teal[6]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} teal={props.teal ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
