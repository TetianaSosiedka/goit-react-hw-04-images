import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { HeaderSearchbar, SearchForm } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => console.log('header', new Date()));

  const handleInputName = ({ target }) => {
    setName(target.value);
    setDisabled(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (name.trim() === '') {
      toast.error('Fill in the search term!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    onSubmit(name);

    setName('');
    setDisabled(true);
  };

  return (
    <HeaderSearchbar>
      <SearchForm onSubmit={handleSubmit}>
        <button type="submit" disabled={disabled}>
          <span>
            <BsSearch />
          </span>
        </button>

        <input
          onChange={handleInputName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
        />
      </SearchForm>
    </HeaderSearchbar>
  );
};

export default Searchbar;
