import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import Share from './Share'
import axios from "axios";
// states are immutable objects and cannot be changed thus they must be recreated if want to be modified
function Portfolio() {
  var HashMap = require('hashmap');
  const [shares, setShares] = useState([]);
  const [balance, setBalance] = useState(0);
  const [prices, setPrices] = useState(new Map());

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/shares/")
    .then(function (response) {
      return setShares(response.data)
    })
  }, []);

  useEffect( () => {
    getCalls()
  }, [shares])

  async function getCalls() {
    var counter = 0;
    for(const share of shares) {
      const response = await axios.get(`http://127.0.0.1:8000/data/${share.ticker}`)
      var addition =  (Math.round(response.data['c'] * 100 * share.count) / 100)
      counter += addition
      setPrices(map => new Map(map.set(share.id.toString(), Math.round(response.data['c'] * 100 ) / 100)))
      setBalance(counter);
    }
  }
  function getPrice(id) {
    return prices.get(id.toString())
  }

  return (
    <div className='col-md-7 border'>
      <h2> {balance} </h2>
      <div className='table-wrapper'>
      <table className = "table">
        <thead>
          <tr> 
            <th scope="col">Count</th>
            <th scope="col">Ticker</th>
            <th scope="col">Price</th>
            <th scope="col">Graph</th>
          </tr>
        </thead>
        <tbody>
        {shares.map((share) => (<Share key = {share.id} share = {share} price = {getPrice(share.id)} />))}
        </tbody>
      </table>
    </div> 
      </div>
  )
}

export default Portfolio

  // var HashMap = require('hashmap');
  // var map = new HashMap();

  // useEffect( () => {
  //   {shares.map( function(share) {
  //     console.log("hello")
  //     axios.get(`http://127.0.0.1:8000/data/${share.ticker}`)
  //     .then(function (response) {
  //       console.log(response.data['price'])
  //       map.set(share.id.toString(), response.data['price'])
  //       setBalance(balance + response.data['price'])
  //       console.log(map)
  //     })
  //   })
  // }
  // }, [])
  