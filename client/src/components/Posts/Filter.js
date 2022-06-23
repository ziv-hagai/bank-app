import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputLabel, Slider, Checkbox, Select, MenuItem } from '@material-ui/core';
import Posts from './Posts';

const Filter = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const [isCards, setIsCards] = useState(true);
  const [cards, setCards] = useState([0, 5]);
  const [first, setFirst] = useState('&&');
  const [isBalance, setIsBalance] = useState(true);
  const [balance, setBalance] = useState([0, 100000]);
  const [second, setSecond] = useState('&&');
  const [isMortgage, setIsMortgage] = useState(true);
  const [mortgage, setMortgage] = useState();
  const [allCities, setAllCities] = useState([]);
  const [isCities, setIsCities] = useState(true);
  const [cities, setCities] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered([...posts]);
    setAllCities([...new Set(posts.map((post) => post.city).sort())]);
  }, [posts]);

  const changeCards = (event, newValue) => {
    setCards(newValue);
  };

  const checkCards = () => {
    setIsCards(!isCards);
  };

  const changeFirst = () => {
    setFirst(first === '&&' ? '||' : '&&');
  };

  const changeBalance = (event, newValue) => {
    setBalance(newValue);
  };

  const checkBalance = () => {
    setIsBalance(!isBalance);
  };

  const changeSecond = () => {
    setSecond(second === '&&' ? '||' : '&&');
  };

  const changeMortgage = (event, newValue) => {
    setMortgage(newValue);
  };

  const checkMortgage = () => {
    setIsMortgage(!isMortgage);
  };

  const changeCities = (e) => {
    setCities(e.target.value);
  };

  const checkCities = () => {
    setIsCities(!isCities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFiltered = cards === -1 ? [...posts] : posts.filter((post) => post.numCreditCards === cards);
    setFiltered(newFiltered);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputLabel id="cards-label">Number of Credit Cards
          <Checkbox
            onChange={checkCards}
          /><Slider
            control={<Checkbox defaultChecked />}
            value={cards}
            onChange={changeCards}
            valueLabelDisplay="auto"
            marks
            min={0}
            max={5}
            step={1}
            disabled={isCards}
          />
        </InputLabel>
        <Button type="button" onClick={changeFirst}>{first === '&&' ? 'And' : 'Or'}</Button>
        <InputLabel id="balance-label">Balance
          <Checkbox
            onChange={checkBalance}
          />
          <Slider
            value={balance}
            onChange={changeBalance}
            valueLabelDisplay="auto"
            marks
            min={0}
            max={100000}
            step={10000}
            disabled={isBalance}
          />
        </InputLabel>
        <Button type="button" onClick={changeSecond}>{second === '&&' ? 'And' : 'Or'}</Button>
        <InputLabel id="mortgage-label">Mortgage
          <Checkbox
            onChange={checkMortgage}
          />
          <Select
            value={mortgage}
            onChange={changeMortgage}
            disabled={isMortgage}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </InputLabel>
        <InputLabel id="cities-label">Cities
          <Checkbox
            onChange={checkCities}
          />
          <Select
            value={cities}
            multiple
            onChange={changeCities}
            disabled={isCities}
          >
            {allCities.map((city, index) => (
              <MenuItem key={index} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </InputLabel>
        <Button type="submit">Filter</Button>
      </form>
      <Posts filtered={filtered} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Filter;
