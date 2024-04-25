
import { useParams } from 'react-router-dom';
import AcBoard from '../components/AcBoard';
import Header from '../components/Header';

export default function SinglePlace() {
    const place = useParams();
    
  return (
    <div>
      <Header />
        <AcBoard place={place} />

    </div>
  )
}
