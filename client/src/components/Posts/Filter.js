import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputLabel, Slider, Checkbox, Select, MenuItem, Paper } from '@material-ui/core';
import Posts from './Posts';
import useStyles from './styles';

const Filter = ({ setCurrentId }) => {
  const classes = useStyles();
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

    // function filterFunc({ city, balance, haveMortgage, numCreditCards }) {

    //   function filterCities(city) {
    //     return (req.citiesFilter.includes(city));
    //   };

    // };
    // const newFiltered = isCards ? [...posts] : posts.filter((post) => cards.includes(post.numCreditCards));

    function filterFunc({ city, balance, haveMortgage, numCreditCards }) {
      return (req.citiesFilter.includes(city))
        && balance >= balanced[0] && balance <= balanced[1]
        && mortgage.includes(haveMortgage)
        && numCreditCards >= cards[0] && numCreditCards <= cards[1];
    }

    const newFiltered = posts.filter(filterFunc);
    console.log(posts);
    console.log(newFiltered);
    setFiltered(newFiltered);
  };

  return (
    <div>
      <Paper className={classes.paper} id="filter">
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputLabel id="cities-label"><Checkbox onChange={checkCities} />Cities</InputLabel>
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
          <Button disabled={isBalance} size="small" id="first" variant="contained" color="primary" type="button" onClick={changeFirst}>{first === '&&' ? 'And' : 'Or'} </Button>
          <InputLabel id="balance-label"><Checkbox onChange={checkBalance} />Balance</InputLabel>
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
          <Button disabled={isMortgage} size="small" id="second" variant="contained" color="primary" type="button" onClick={changeSecond}>{second === '&&' ? 'And' : 'Or'}</Button>
          <InputLabel id="mortgage-label"><Checkbox onChange={checkMortgage} />Mortgage</InputLabel>
          <Select
            value={mortgage}
            onChange={changeMortgage}
            disabled={isMortgage}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <Button disabled={isCards} size="small" id="third" variant="contained" color="primary" type="button" onClick={changeThird}>{third === '&&' ? 'And' : 'Or'}</Button>
          <InputLabel id="cards-label"><Checkbox onChange={checkCards} />Number of Credit Cards</InputLabel>
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

          <Button size="large" type="submit" variant="contained" color="secondary">Filter</Button>
        </form>
      </Paper>
      <Posts filtered={filtered} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Filter;
