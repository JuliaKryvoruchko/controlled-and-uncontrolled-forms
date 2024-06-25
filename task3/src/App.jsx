import './App.css';
import ControlledApp from './Controlled';
import UncontrolledApp from './Uncontrolled';


function App({ initialValuesControlled, initialValuesUncontrolled }) {

  return (
    <div className='block'>
      <ControlledApp initialValues={initialValuesControlled} />
      <UncontrolledApp initialValues={initialValuesUncontrolled} />
    </div>
  );
}

export default App;
