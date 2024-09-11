import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-primary text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold'>
          Biomedical IQ
        </Link>
        <nav>
          <Link to='/login' className='mr-4'>
            Login
          </Link>
          <Link to='/register' className='bg-white text-primary px-4 py-2 rounded'>
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
