import React, {useState, useEffect} from 'react'
import { apiURL } from '../utils/api'
import Filter from '../filter/Filter';

const Counties = () => {

  const [counties, setCounties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  //Fetch data
  const getAllCounties = async()=> {
    try {
      const res = await fetch(`${apiURL}`);

      if(!res.ok) throw new Error('There was an issue');
      const data = await res.json();
      console.log(data);
      setCounties(data);
      setIsLoading(false);

    } catch(error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  
  //Display data
  useEffect(()=> {
    getAllCounties()
  }, [])

  //Filter by region
  const [filteredRegion, setFilteredRegion] = useState('')

  const filteredCounties = counties.filter((county) => {
    if (county.region === 'Oceania') {
      return true
    }
    else return false
  })

  function onFilterValue(filterValue) {
    setFilteredRegion(filterValue);
    if (filterValue=='Oceania') setCounties(filteredCounties);
    else getAllCounties()
  }

  //Filter by size
  const [filteredSize, setFilteredSize] = useState('')

  const lithuaniaCounty = counties.find(item=>item.name=="Lithuania");
  const lithuaniaArea = lithuaniaCounty? lithuaniaCounty.area : 0;

  const sizedCounties = counties.filter((county) => {
    if (county.area < lithuaniaArea) {
      return true
    }
    else return false
  })

  function onSizeValue(sizeValue) {
    setFilteredSize(sizeValue);
    if (sizeValue=='Lithuania') setCounties(sizedCounties);
    else getAllCounties()
  }

  //Order alphabetically
  const ascendingSort = () => {
    let data = [...counties];
    if (data) {
      let sorted = data.sort((a,b) => a.name.localeCompare(b.name));
      setCounties(sorted);
    }
  }

  const descendingSort = () => {
    let data = [...counties];
    if (data) {
      let sorted = data.sort((a,b) => a.name.localeCompare(b.name));
      setCounties(sorted.reverse());
    }
  }

  //Paginate data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const items = counties.slice(firstIndex, lastIndex);
  const pageIndex = Math.ceil(counties.length / itemsPerPage);
  const numbers = [...Array(pageIndex + 1).keys()].slice(1);
  console.log(numbers);

  return (
    <div className='county-wrapper'>
      <div className="county-head">
        <Filter filterValue={onFilterValue} filterSize={onSizeValue}/>
        <div className="sorting-buttons">
          <button className="asc-button" onClick={()=>ascendingSort()}>ASC</button>
          <button className="des-button" onClick={()=>descendingSort()}>DES</button>
        </div>
      </div>
      <div className="county-body">
        {isLoading && !error && <h4>Loading...</h4>}
        {error && !isLoading && <h4>{error.message}</h4>}

        
        
        {
          items?.map(county=>(
            <div className="county__item">
              <div className="county__item-info">
                <h3>{county.name}</h3>
                <h5>Region: {county.region}</h5>
                <h5>Area: {county.area}</h5>
              </div>
              
            </div>
          ))

        }
        <nav className="page-nav">
          <ul className='page-nav-list'>
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>Prev</a>
            </li>
            {
              numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <a href="#" className="page-link" onClick={()=>changeCPage(n)}>{n}</a>
                </li>
              ))
              
            }
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )


  //Navigate pages
  function nextPage() {
    if(currentPage !== pageIndex) {
      setCurrentPage(currentPage +1)
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function prePage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage -1)
    }
  }

}

export default Counties