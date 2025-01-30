import './NotFound.css';

function NotFound () {
  return (
    <main className='not-found'>
      <div className='not-found__error'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
    </main>
  );
}

export default NotFound;