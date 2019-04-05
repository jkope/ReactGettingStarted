import React, { Component } from 'react';
// import logo from './globologo.png';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featuredHouse';
import HouseFilter from './houseFilter';

class App extends Component {
  state = {}

  componentDidMount() {
    this.fetchHouses();
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  fetchHouses = () => {
    fetch('/houses.json')
      .then(res => res.json())
      .then(allHouses => {
        this.allHouses = allHouses;
        this.determineFeaturedHouse()
        this.determineUniqueCountries();
      })
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }



  render() {
    return (
      <div className="container">
        <Header subtitle='Providing Houses all over the world' />
        <HouseFilter />
        <FeaturedHouse countries={this.state.countries} filterHouses={this.filterHouses}  />
      </div>
    );
  }
}

export default App;
