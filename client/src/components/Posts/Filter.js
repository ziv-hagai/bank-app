import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputLabel, Slider, Checkbox, Select, MenuItem } from '@material-ui/core';
import Posts from './Posts';

const Filter = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  const [allCities, setAllCities] = useState([]);
  const [isCities, setIsCities] = useState(true);
  const [cities, setCities] = useState([]);

  const [first, setFirst] = useState('&&');

  const [isBalance, setIsBalance] = useState(true);
  const [balanced, setBalanced] = useState([0, 100000]);

  const [second, setSecond] = useState('&&');

  const [isMortgage, setIsMortgage] = useState(true);
  const [mortgage, setMortgage] = useState(['Yes', 'No']);

  const [third, setThird] = useState('&&');

  const [isCards, setIsCards] = useState(true);
  const [cards, setCards] = useState([0, 5]);

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered([...posts]);
    setAllCities([...new Set(posts.map((post) => post.city).sort())]);
  }, [posts]);

  const changeCities = (e) => {
    setCities(e.target.value);
    console.log(cities);
  };

  const checkCities = () => {
    setIsCities(!isCities);
  };

  const changeFirst = () => {
    setFirst(first === '&&' ? '||' : '&&');
  };

  const changeBalance = (event, newValue) => {
    setBalanced(newValue);
  };

  const checkBalance = (event) => {
    event.preventDefault();
    setIsBalance(!isBalance);
  };

  const changeSecond = () => {
    setSecond(second === '&&' ? '||' : '&&');
  };

  const changeMortgage = (e) => {
    setMortgage(e.target.value);
    console.log(mortgage);
  };

  const checkMortgage = () => {
    setIsMortgage(!isMortgage);
  };

  const changeThird = () => {
    setThird(third === '&&' ? '||' : '&&');
  };

  const changeCards = (event, newValue) => {
    setCards(newValue);
  };

  const checkCards = (event) => {
    event.preventDefault();
    setIsCards(!isCards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const req = {
      citiesFilter: isCities ? allCities : cities,
      isFirst: first,
      balanceFilter: isBalance ? [0, 100000] : balanced,
      isSecond: second,
      mortgageFilter: isMortgage ? ['Yes', 'No'] : mortgage,
      isThird: third,
      cardsFilter: isCards ? [0, 5] : cards,
    };
    console.log(req);
    // const newFiltered = isCards ? [...posts] : posts.filter((post) => cards.includes(post.numCreditCards));

    function filterFunc({ city, balance, haveMortgage, numCreditCards }) {
      return req.citiesFilter.includes(city)
        && balance >= balanced[0] && balance <= balanced[1]
        && mortgage.includes(haveMortgage)
        && numCreditCards >= cards[0] && numCreditCards <= cards[1];
    }

    const newFiltered = posts.filter(filterFunc);
    console.log(posts);
    console.log(newFiltered);
    setFiltered(newFiltered);

    // balance: "20000"
    // city: "Kiev"
    // haveMortgage: "Yes"
    // numCreditCards: 2
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Checkbox onChange={checkCities} />
        <InputLabel id="cities-label">Cities
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
        <Button id="first" type="button" onClick={changeFirst}>{first === '&&' ? 'And' : 'Or'}</Button>
        <Checkbox onChange={checkBalance} />
        <InputLabel id="balance-label">Balance
          <Slider
            value={balanced}
            onChange={changeBalance}
            valueLabelDisplay="auto"
            marks
            min={0}
            max={100000}
            step={10000}
            disabled={isBalance}
          />
        </InputLabel>
        <Button id="second" type="button" onClick={changeSecond}>{second === '&&' ? 'And' : 'Or'}</Button>
        <Checkbox onChange={checkMortgage} />
        <InputLabel id="mortgage-label">Mortgage
          <Select
            value={mortgage}
            onChange={changeMortgage}
            disabled={isMortgage}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </InputLabel>

        <Button id="third" type="button" onClick={changeThird}>{third === '&&' ? 'And' : 'Or'}</Button>
        <Checkbox onChange={checkCards} />
        <InputLabel id="cards-label">Number of Credit Cards
          <Slider
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
        <Button type="submit">Filter</Button>
      </form>
      <Posts filtered={filtered} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Filter;
