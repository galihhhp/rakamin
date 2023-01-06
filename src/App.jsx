import { decrement, increment } from 'store/features/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

import Dashboard from 'pages/Dashboard';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return <Dashboard />;
}

export default App;
