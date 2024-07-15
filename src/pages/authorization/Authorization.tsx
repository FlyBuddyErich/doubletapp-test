import React from 'react'
import './Authorization.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Authorization: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true); 
  const navigate = useNavigate(); 
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); 
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const handleButtonClick = () => {
    // возможность перехода на страницу list
    navigate('/list');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => { // проверяем вводит ли пользователь символы в строку пароля, чтобы кнопка забыли пароль появлась
    if (event.target.value.length > 0) {
      setIsPasswordTyping(true); // показывает надпись забыли пароль только тогда, когда пользователь вводит пароль в input 
    } else {
      setIsPasswordTyping(false);
    }
  };

  const handleTextChange = () => { // Когда пользователь нажимает войти - элементы меняются на log in. Нажатие на зарегистрироваться возвращает обратно
    setIsSignUp(!isSignUp);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForgotPasswordEmail(event.target.value); // при нажатии на забыли пароль изменяется страница
  };

  const handleBackToAuthClick = () => { // кнопка снизу, чтобы пользователь мог вернутся к авторизации
    setShowForgotPassword(false);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const eyeClosedIcon = require('../../assets/eye close.png');
  const eyeOpenIcon = require('../../assets/eye open.png');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }; // когда пользователь нажимает на иконку глаза - пароль становится видимым, также работает в обратную сторону

  return (
    <div className='authorization-wrapper'>
      <div className="upper-box">
        <img
          className='logo'
          src={logo}
          alt="logo"
        />
        {!showForgotPassword && (
          <p>{isSignUp ? 'SIGN UP' : 'LOG IN'}</p>
        )}
      </div>
      {!showForgotPassword ? (
        <div className="bottom-box">
          <div className="input-container">
            <label>
              Email <input
                name="email"
                placeholder='Enter your email'
              />
            </label>
            <label>
              Пароль <input
                id="passwordInput"
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                placeholder="•••••••••"
                onChange={handlePasswordChange}
              />
              <img
                src={isPasswordVisible ? eyeOpenIcon : eyeClosedIcon}
                id="imageButton"
                alt="Show/Hide Password"
                onClick={togglePasswordVisibility}
                className='eye-icon'
              />
            </label>
          </div>
          {isPasswordTyping && (
              <p className='password-recovery' onClick={handleForgotPasswordClick}>
                Забыли пароль?
              </p>
            )}
          <div className="bottom-box-text">
            <button onClick={handleButtonClick}>{isSignUp ? 'Зарегистрироваться' : 'Войти'}</button>
            <p className='high-text'>
              {isSignUp ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
              <span
                className='sign-in-link'
                onClick={handleTextChange}
              >
                {isSignUp ? ' Войти' : ' Зарегистрироваться'}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="bottom-box">
          <p className='password-recovery-text-upper'>
            Восстановление пароля
          </p>
          <p className='password-recovery-text-bottom'>
            Укажите вашу почту. Мы отправим на нее письмо с ссылкой на восстановление пароля.
          </p>
          <div className="input-container">
            <label>
              Email <input
                name="forgotPasswordEmail"
                placeholder='Enter your email'
                value={forgotPasswordEmail}
                onChange={handleForgotPasswordEmailChange}
              />
            </label>
          </div>
          <button disabled={!forgotPasswordEmail}>
            Отправить ссылку
          </button>
          <p className='back-to-auth' onClick={handleBackToAuthClick}>
            Вернуться к авторизации
          </p>
        </div>
      )}
    </div>
  );
};

export default Authorization;
