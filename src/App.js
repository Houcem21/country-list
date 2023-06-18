import './App.css';
import Counties from './components/counties/Counties';

function App() {
  return (
    <>
    <div className='header-container'>
      <header className='header'><h5>List of countries</h5></header>
    </div>
    <div className='main-container'>
      <Counties />
    </div>
    </>
  );
}

export default App;
