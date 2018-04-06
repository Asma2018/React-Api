import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const API_KEY = 'bbcb162a9fa6411ba4322b554baa8f2e';
const API_URL = 'https://openexchangerates.org/api/latest.json';

const currenciesWhiteList = ['DKK', 'EUR', 'BTC', 'SEK', 'NOK', 'DZD', 'CAD'];

export default class CurrenciesList extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      rates: null,
      error: null,
    };
    this.fetchData = this.fetchData.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    setTimeout(this.fetchData, 700);
  }

  fetchData() {
    fetch(`${API_URL}?app_id=${API_KEY}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ rates: json.rates });
      })
      .catch(() => this.setState({ error: 'error loading the data' }));
  }

  refreshData() {
    this.setState({ error: null, rates: null });
    setTimeout(this.fetchData, 700);
  }

  render() {
    const { rates, error } = this.state;
    return <div>
      <button onClick={this.refreshData}>Refresh Currencies</button>
      <div>
        {
          error && <h3 className='error-msg'>error: { error }</h3>
        }
        {
          rates && <ul>
            {
              Object
                .keys(rates)
                .filter(rate => currenciesWhiteList.includes(rate))
                .map((rate) => {
                  return <li key={rate}>{ rate } { rates[rate] }</li>
                })
            }
          </ul>
        }
        {
          !rates && !error && <p>no data sorry :/</p>
        }
      </div>
    </div>;
    if (error) {
      return
    }
    if (rates) {
      return (
        <div>
          we have data
        </div>
      );
    } else {
      return
    }
  }

}
render(<CurrenciesList />, document.getElementById('root'));
