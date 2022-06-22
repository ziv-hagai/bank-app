import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Posts from './Posts';

const Filter = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const [cards, setCards] = useState(-1);
  const [filtered, setFiltered] = useState([]);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    setFiltered([...posts]);
  }, [posts]);

  const changeCards = (e) => {
    e.preventDefault();
    setCards(e.target.value.length ? Number(e.target.value) : -1);
  };

  const changeFirst = (e) => {
    e.preventDefault();
    setFirst(!first);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFiltered = cards === -1 ? [...posts] : posts.filter((post) => post.numCreditCards === cards);
    setFiltered(newFiltered);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* <Stack spacing={2} direction="column"> */}
        <label htmlFor="cards">number of credit cards
          <input type="number" id="cards" onChange={changeCards} />
        </label>
        <button type="button" onClick={changeFirst}>{first ? 'And' : 'Or'}</button>
        <button type="submit">Filter</button>
        {/* </Stack> */}
      </form>
      <Posts filtered={filtered} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Filter;
