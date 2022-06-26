import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 0.25em;
    cursor: pointer;

    &:hover {
      color: ${palette.teal[7]};
    }
  }

  .right {
    display: flex;
    align-items: center;
  }
`;

// 헤더 높이만큼 콘텐츠를 내려야함. (position: fixed이므로)
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 2rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            BLOGROW
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login" teal>
                로그인
              </Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
