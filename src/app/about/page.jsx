import Navbar from '../components/Navbar';

const AboutPage = () => {
  return (
    <>
<header>
    <Navbar />
  </header>
    <div>
      <h1 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-white md:text-2xl lg:text-2xl mt-5'>About me</h1>
      <p>I am Raziel and I made this as a personal project to showcase my skills :)</p>
      <h1 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-white md:text-2xl lg:text-2xl mt-5'>My Github: </h1>
        <a href="https://github.com/razielnavarro" target="_blank" rel="noopener noreferrer">https://github.com/razielnavarro</a>
    </div>
    </>
  );
};
export default AboutPage;
