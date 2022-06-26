import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login, // { username, password}
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value, // value: e.target.value
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    // LOGIN 액션 디스패치
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  // 로그인 실패, 성공 여부
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('비밀번호가 일치하지 않습니다.');
    }
    if (auth) {
      console.log('로그인 성공');
      console.log(auth);
      // check
      dispatch(check()); // CHECK 액션 디스패치
    }
  }, [auth, authError, dispatch]);

  // 로그인 성공시 -> 홈으로 이동
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('local storage error');
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
