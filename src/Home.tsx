import { useHistory } from 'react-router-dom';
import Header from './Header';

export default function Store() {
  const history = useHistory();

  return (
    <>
      <Header />
      <h1>Welcome to Maestro</h1>
    </>
  );
}
