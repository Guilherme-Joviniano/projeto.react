import P from 'prop-types';
import '../../input.css';

export const Button = ({ onClick, disabled = false, text }) => {
  return (
    <button disabled={disabled} onClick={onClick} className="button">
      {text}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
