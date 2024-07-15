import React from 'react'
import './StudentAdd.css'
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/arrow-left.png'

const StudentAdd: React.FC = () => {

  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    // возможность перехода на страницу list
    navigate('/list');
  };

  return (
    <div className='add-page'>
      <div className="header">
        <div className="add-page-upper">
          <img src={logo} alt="logo" />
          <p>STUDENTS by <span>FlyBuddyErich</span></p>
        </div>
      </div>
      <div className="add-page-wrapper">
        <div className="high-box-student">
            <div className="back-box-student">
              <img src={arrowLeft} alt="Exit" onClick={handleButtonClick} className='back-to-list-button'/>
              <p>НАЗАД К СПИСКУ СТУДЕНТОВ</p>
            </div>
          <div className="student-adding-box">
            <h1>Новый студент</h1>
            <div className="student-adding-box-container">
              <img src="" alt="profile-pic" />
              <p>Сменить аватар</p>
              <p>500x500</p>
            </div>
          </div>
        </div>
        <div className="student-ipnuts-container">
          <label>
            ФИО 
            <input type="text" placeholder='Иванов Иван Иванович' />
            </label>
            <label> 
              Email 
              <input name="email" placeholder='Enter your email'/>
            </label>
              <label> 
              Специальность
                <select className='sorting-list'>
                  <option value="value1">mt</option>
                  <option value="value2">kb</option>
                  <option value="value3">kn</option>
                </select>
              </label>
              <label> 
              Группа
                <select className='sorting-list'>
                  <option value="value1">value1</option>
                  <option value="value2">value2</option>
                  <option value="value3">value3</option>
                </select>
              </label>
              <label> 
              Рейтинг 
              <input name="rating" placeholder='0'/>
            </label>
            <label> 
              Пол
                <select className='sorting-list'>
                  <option value="sex1">Мужской</option>
                  <option value="sex2">Женский</option>
                </select>
              </label>
              <label> 
              Любимый цвет
                <select className='sorting-list'>
                  <option value="red">Красный</option>
                  <option value="green">Зеленый</option>
                  <option value="blue">Синий</option>
                </select>
              </label>
        </div>
        <button className='add-new-student'>Создать</button>
      </div>
    </div>
  )
}

export default StudentAdd