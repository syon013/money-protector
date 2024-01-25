import Router from './Router';
// import { Provider } from 'react-redux';
//추후 리덕스사용시 임포트하세요. Provider

const App = () => {
  const isLogin = localStorage.getItem('accessToken');

  return (
    // <Provider>
    <Router isLogin={isLogin} />
    // </Provider>
  );
};

export default App;
