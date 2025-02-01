import './ClearButton.css';

import Button from '../Button/Button';

function ClearButton ({...props}) {
  return (
    <Button {...props}>
      <span className='clickable clear-button'>✕</span>
    </Button>
  );
}

export default ClearButton;