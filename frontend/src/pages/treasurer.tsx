import DuesProfile from '@/components/DuesProfile';
import DuesProfilesContainer from '@/components/DuesProfilesContainer';
import Sidebar from '@/components/Sidebar';

function App() {
  const user = {
    id: 1,
    username: 'patricknguyen',
    role: 'developer',
    dues: 0,
  };
    return (
      <div className="">
      <Sidebar/>
      <DuesProfilesContainer/>
    </div>
  );
  }


export default App;