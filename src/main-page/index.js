import React, { Component } from 'react';
// import logo from './globologo.png';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featuredHouse';
import HouseFilter from './houseFilter';
import SearchResults from '../searchResults';
import HouseDetail from '../house';

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

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  }



  render() {
    let activeComponent = null;
    if (this.state.country)
      activeComponent = <SearchResults country={this.state.country}
        filteredHouses={this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    if (this.state.activeHouse)
      activeComponent = <HouseDetail house={this.state.activeHouse} />;
    if (!activeComponent)
      activeComponent = <FeaturedHouse house={this.state.featuredHouse} />;
    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses} />
        {activeComponent}
      </div>
    );
  }
}

export default App;
