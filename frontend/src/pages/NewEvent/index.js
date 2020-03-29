import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './style.css';

const NewEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ngo_id = localStorage.getItem('ngoId');
  const history = useHistory();

  const handleEvent = async e => {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('event', data, {
        headers: { Authorization: ngo_id }
      });
      history.push('/profile');
    } catch (e) {
      alert('Event creation fail, please try again');
    }
  };

  return (
    <div className='new-event-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='helpr logo' />
          <h1>Add new case</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur.
          </p>
          <Link className='back-link' to='/profile'>
            <FiArrowLeft size={16} color='#E02041' />
            Back to home
          </Link>
        </section>

        <form onSubmit={handleEvent}>
          <input
            placeholder='Case title'
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Description'
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder='Value $'
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className='button' type='submit'>
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEvent;

NewEvent.propTypes = {};
