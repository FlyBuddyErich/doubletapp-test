import React, { useState } from 'react';
import './CustomSelect.css';
import sortIcon from '../assets/sort.png'

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

const CustomSelect: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('name a-z');
    const [isOpen, setIsOpen] = useState(false);
    const [sortOption, setSortOption] = useState<string>('name a-z');
    const [persons, setPersons] = useState<Person[]>([]);

    const options = [
        { value: 'name a-z', label: 'Имя А-Я' },
        { value: 'name z-a', label: 'Имя Я-А' },
        { value: 'younger', label: 'Сначала моложе' },
        { value: 'older', label: 'Сначала старше' },
        { value: 'high-points', label: 'Высокий рейтинг' },
        { value: 'low-points', label: 'Низкий рейтинг' }
    ];

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const sortPersons = (persons: Person[]) => {
        switch (sortOption) {
            case 'name a-z':
                return [...persons].sort((a, b) => a.name.localeCompare(b.name));
            case 'name z-a':
                return [...persons].sort((a, b) => b.name.localeCompare(a.name));
            case 'younger':
                return [...persons].sort((a, b) => calculateAge(b.birthday) - calculateAge(a.birthday));
            case 'older':
                return [...persons].sort((a, b) => calculateAge(a.birthday) - calculateAge(b.birthday));
            case 'high-points':
                return [...persons].sort((a, b) => b.rating - a.rating);
            case 'low-points':
                return [...persons].sort((a, b) => a.rating - b.rating);
            default:
                return persons;
        }
    };

    const calculateAge = (birthday: string): number => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const sortedPersons = sortPersons(persons);

    return (
        <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
            <img src={sortIcon} alt="sort" className='sort-icon'/>
            <div className={`select-box ${isOpen ? 'open' : ''}`}>
                <div className="selected-option">{options.find(o => o.value === selectedOption)?.label}</div>
                {isOpen && (
                    <div className="options">
                        {options.map(option => (
                            <div
                                key={option.value}
                                className={`option ${selectedOption === option.value ? 'selected' : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;