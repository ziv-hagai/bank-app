import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputLabel, Slider, Checkbox, Select, MenuItem, Paper } from '@material-ui/core';
import Posts from './Posts';
import useStyles from './styles';

const Filter = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  const [allCities, setAllCities] = useState([]);
  const [isCities, setIsCities] = useState(false);
  const [cities, setCities] = useState([]);
  const [first, setFirst] = useState(true);
  const [isBalance, setIsBalance] = useState(false);
  const [balanced, setBalanced] = useState([0, 100000]);
  const [second, setSecond] = useState(true);
  const [isMortgage, setIsMortgage] = useState(false);
  const [mortgage, setMortgage] = useState(['Yes', 'No']);
  const [third, setThird] = useState(true);
  const [isCards, setIsCards] = useState(false);
  const [cards, setCards] = useState([0, 5]);
  const [filtered, setFiltered] = useState([]);
  const balanceMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 50000,
      label: '50,000',
    },
    {
      value: 100000,
      label: '100,000',
    },
  ];
  const cardsMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 5,
      label: '5',
    },
  ];
  useEffect(() => {
    setFiltered([...posts]);
    setAllCities([...new Set(posts.map((post) => post.city).sort())]);
  }, [posts]);

  const changeCities = (e) => {
    setCities(e.target.value);
  };

  const checkCities = () => {
    setIsCities(!isCities);
  };

  const changeFirst = () => {
    setFirst(!first);
  };

  const changeBalance = (event, newValue) => {
    setBalanced(newValue);
  };

  const checkBalance = (event) => {
    event.preventDefault();
    setIsBalance(!isBalance);
  };

  const changeSecond = () => {
    setSecond(!second);
  };

  const changeMortgage = (e) => {
    setMortgage(e.target.value);
    console.log(mortgage);
  };

  const checkMortgage = () => {
    setIsMortgage(!isMortgage);
  };

  const changeThird = () => {
    setThird(!third);
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
      citiesFilter: isCities && cities.length ? cities : allCities,
      isFirst: first,
      balanceFilter: isBalance ? balanced : [0, 100000],
      isSecond: second,
      mortgageFilter: isMortgage ? mortgage : ['Yes', 'No'],
      isThird: third,
      cardsFilter: isCards ? cards : [0, 5],
    };
    console.log(req);

    function filterCities({ city }) { return req.citiesFilter.includes(city); }
    function filterBalance({ balance }) { return balance >= balanced[0] && balance <= balanced[1]; }
    function filterMortgage({ haveMortgage }) { return mortgage.includes(haveMortgage); }
    function filterCards({ numCreditCards }) { return numCreditCards >= cards[0] && numCreditCards <= cards[1]; }

    let newFiltered = isCities ? posts.filter(filterCities) : posts;

    if (isBalance) { newFiltered = req.isFirst ? newFiltered.filter(filterBalance) : newFiltered.concat(posts.filter(filterBalance)); }
    console.log(isMortgage);
    if (isMortgage) { newFiltered = req.isSecond ? newFiltered.filter(filterMortgage) : newFiltered.concat(posts.filter(filterMortgage)); }

    if (isCards) { newFiltered = req.isThird ? newFiltered.filter(filterCards) : newFiltered.concat(posts.filter(filterCards)); }
    console.log(newFiltered);

    newFiltered = newFiltered.filter((item, index) => (newFiltered.indexOf(item) === index));
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
            disabled={!isCities}
          >
            {allCities.map((city, index) => (
              <MenuItem key={index} value={city}>{city}</MenuItem>
            ))}
          </Select>
          <Button disabled={!isBalance} size="small" id="first" variant="contained" color="primary" type="button" onClick={changeFirst}>{first ? 'And' : 'Or'} </Button>
          <InputLabel id="balance-label"><Checkbox onChange={checkBalance} />Balance</InputLabel>
          <Slider
            value={balanced}
            onChange={changeBalance}
            valueLabelDisplay="auto"
            marks={balanceMarks}
            min={0}
            max={100000}
            step={10000}
            disabled={!isBalance}
          />
          <Button disabled={!isMortgage} size="small" id="second" variant="contained" color="primary" type="button" onClick={changeSecond}>{second ? 'And' : 'Or'}</Button>
          <InputLabel id="mortgage-label"><Checkbox onChange={checkMortgage} />Mortgage</InputLabel>
          <Select
            value={mortgage}
            onChange={changeMortgage}
            disabled={!isMortgage}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <Button disabled={!isCards} size="small" id="third" variant="contained" color="primary" type="button" onClick={changeThird}>{third ? 'And' : 'Or'}</Button>
          <InputLabel id="cards-label"><Checkbox onChange={checkCards} />Number of Credit Cards</InputLabel>
          <Slider
            value={cards}
            onChange={changeCards}
            valueLabelDisplay="auto"
            marks={cardsMarks}
            min={0}
            max={5}
            step={1}
            disabled={!isCards}
          />
          <Button size="large" type="submit" variant="contained" color="secondary">Filter</Button>
        </form>
      </Paper>
      <Posts filtered={filtered} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Filter;
