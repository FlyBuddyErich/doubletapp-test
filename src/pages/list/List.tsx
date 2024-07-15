import React, { useEffect, useState } from 'react';
import '../list/List.css';
import logo from '../../assets/logo.png';
import plusIcon from '../../assets/plus.png';
import deleteIcon from '../../assets/delete.png';
import sortIcon from '../../assets/sort.png';
import { useNavigate } from 'react-router-dom';

interface Person {
    id: number;
    name: string;
    specialty: string;
    group: string;
    birthday: string;
    rating: number;
    avatar: string;
    color: string;
}

const List: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [sortOption, setSortOption] = useState<string>('name a-z');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/student-add');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://front-assignment-api.2tapp.cc/api/persons');
                const data = await response.json();
                console.log('Fetched data:', data);

                if (data && Array.isArray(data.students)) {
                    setPersons(data.students);
                } else {
                    console.error('Expected an array in "students" key, but got:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const sortPersons = (persons: Person[]) => {        // сортировка студентов 
        switch (sortOption) {
            case 'name a-z':
                return [...persons].sort((a, b) => a.name.localeCompare(b.name));
            case 'name z-a':
                return [...persons].sort((a, b) => b.name.localeCompare(a.name));
            case 'younger':
                return [...persons].sort((a, b) => calculateAge(a.birthday) - calculateAge(b.birthday));
            case 'older':
                return [...persons].sort((a, b) => calculateAge(b.birthday) - calculateAge(a.birthday));
            case 'high-points':
                return [...persons].sort((a, b) => b.rating - a.rating);
            case 'low-points':
                return [...persons].sort((a, b) => a.rating - b.rating);
            case 'color':
                return [...persons].sort((a, b) => getCustomColor(a.color).localeCompare(getCustomColor(b.color)));
            default:
                return persons;
        }
    };

    const getCustomColor = (color: string): string => {     // смена цветов на кастомные
        switch (color.toLowerCase()) {
            case 'green':
                return '#83C872';
            case 'red':
                return '#E25B5B';
            case 'blue':
                return '#49C2E8';
            default:
                return color;
        }
    };

    const calculateAge = (birthday: string): number => {        // В api стоит дата рождения, этот код просчитывает именно возраст автоматически
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleDelete = (id: number, name: string) => {        // сообщение об удалении студента
        setPersons(persons.filter(person => person.id !== id));
        setMessage(`Студент ${name} удален!`);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const sortedPersons = sortPersons(persons);

    const filteredPersons = sortedPersons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='list-page'>
            <div className="header">
                <div className="list-page-wrapper">
                    <img src={logo} alt="logo" />
                    <p>STUDENTS by <span>FlyBuddyErich</span></p>
                </div>
            </div>
            <div className="high-box">
                <div className="upper-line">
                    <h1>Студенты</h1>
                    <button className='add-student-button' onClick={handleButtonClick}>
                        <img src={plusIcon} alt="plus icon" /> Добавить студента
                    </button>
                </div>
                <div className="middle-line">
                    <input
                        type="text"
                        placeholder='Поиск по имени'
                        className='search-by-name'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="custom-select">
                        <img src={sortIcon} alt="sort" className='sort-icon' />
                        <select className='sorting-list' value={sortOption} onChange={handleSortChange}>
                            <option value="name a-z">Имя А-Я</option>
                            <option value="name z-a">Имя Я-А</option>
                            <option value="younger">Сначала моложе</option>
                            <option value="older">Сначала старше</option>
                            <option value="high-points">Высокий рейтинг</option>
                            <option value="low-points">Низкий рейтинг</option>
                            <option value="color">Любимый цвет</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bottom-box-list">
                <p className='user-name-upper'>ФИО</p>
                <p className='user-speciality-upper'>Специальность</p>
                <p className='user-group-upper'>Группа</p>
                <p className='user-age-upper'>Возраст</p>
                <p className='user-rating-upper'>Рейтинг</p>
            </div>
            <div className="list-box">
                {filteredPersons.map(person => (
                    <div key={person.id} className="student-info">
                        <img src={person.avatar} alt="user-pic" className='user-profile-pic' />
                        <div className="user-name">{person.name}</div>
                        <div className="user-speciality">{person.specialty}</div>
                        <div className="user-group-number">{person.group}</div>
                        <div className="user-age">{calculateAge(person.birthday)}</div>
                        <div className="user-rating">{person.rating}</div>
                        <div style={{ background: getCustomColor(person.color) }} className="user-color"></div>
                        <img
                            src={deleteIcon}
                            alt="user-delete-icon"
                            onClick={() => handleDelete(person.id, person.name)}
                            className="delete-icon"
                        />
                    </div>
                ))}
            </div>
            {message && <div className='message-box'>{message}</div>}
        </div>
    );
};

export default List;