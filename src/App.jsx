import Dashboard from 'pages/Dashboard';
import TodosProvider from 'store/TodosProvider';

function App() {
  return (
    <TodosProvider>
      <Dashboard />
    </TodosProvider>
  );
}

export default App;
