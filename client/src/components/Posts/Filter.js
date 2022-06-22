import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Posts from './Posts';

const Filter = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const [cards, setCards] = useState();
  const [filtered, setFiltered] = useState([]);
  const [first, setFirst] = useState();
  useEffect(() => {
    setFiltered([...posts]);
  }, [posts]);

  const changeCards = (e) => {
    e.preventDefault();
    setCards(Number(e.target.value));
  };
  const changeFirst = (e) => {
    e.preventDefault();
    setCards(Number(e.target.value));
  };
  const handleSubmit = (e) => {
    console.log(filtered);
    e.preventDefault();
    console.log(typeof cards);
    const newFiltered = filtered.filter((post) => post.numCreditCards === cards);
    console.log(newFiltered);
    setFiltered(newFiltered);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2} direction="column">
          <label htmlFor="cards">number of credit cards
            <input type="number" id="cards" onChange={changeCards} />
          </label>
          <Button variant="contained" onClick={changeFirst}>{first ? 'And' : 'Or'}</Button>
          <Button variant="contained" type="submit">Filter</Button>
        </Stack>
      </form>
      <Posts filtered={filtered} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Filter;
