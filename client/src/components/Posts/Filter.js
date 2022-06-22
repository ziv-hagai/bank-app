import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import Posts from './Posts';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

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
    setCards(e.target.value);
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
        <InputLabel id="cards-label">Number of Credit Cards</InputLabel>
        <Select
          id="cards"
          labelId="cards-label"
          value={cards}
          label="cards"
          onChange={changeCards}
        >
          <MenuItem value={-1}>All</MenuItem>
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
        <TextField />

        <Button type="button" onClick={changeFirst}>{first ? 'And' : 'Or'}</Button>
        <Button type="submit">Filter</Button>

      </form>
      <Posts filtered={filtered} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Filter;
