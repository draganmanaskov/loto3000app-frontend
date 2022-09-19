import useDarkMode from '../hooks/useDarkMode';

import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeIcon = ({status}) => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
      <span onClick={handleMode} className={`${status ? "static" : "hidden"}`}>
        {darkTheme ? (
          <FaSun size='26' className='top-navigation-icon' />
        ) : (
          <FaMoon size='26' className='top-navigation-icon' />
        )}
      </span>
    );
  };

  export default ThemeIcon