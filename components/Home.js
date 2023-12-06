import styles from '../styles/Home.module.css';
import City from './City';
import Header from './Header';

function Home() {
  return (
    <div class="flex flex-col h-screen w-screen bg-gradient-to-b from-cyan-500 to-blue-500 ">
      <Header />
      <div class="flex flex-row justify-center items-center flex-wrap overflow-y-auto overflow-x-hidden">
        <City />
        <City />
        <City />
        <City />
        <City />
        <City />
        <City />
        <City />
        <City />
        <City />
        <City />
        <City />
      </div>
    </div>
  );
}

export default Home;
