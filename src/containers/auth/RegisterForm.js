import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    // auth 모듈의 state를 불러옴
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    // user 모듈의 state를 불러옴
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value, // value: e.target.value
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    // 인풋 하나라도 비어있으면
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      // 비밀번호 확인 불일치시
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' })); // password 인풋을 빈칸으로 만듬
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ username, password })); // REGISTER 액션 디스패치
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 회원가입 실패/성공 처리
  useEffect(() => {
    if (authError) {
      // 계정명이 이미 존재할 때 - 409 Conflict
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      // 그 외 이유
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었나 체크
  useEffect(() => {
    if (user) {
      console.log('check API 성공');
      console.log(user);
    }
  }, [user]);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/'); // 홈으로 이동

      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('local storage error');
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
