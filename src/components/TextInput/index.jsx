import P from 'prop-types';

export const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input
      onChange={handleChange}
      placeholder={'Digite Sua Busca Aqui'}
      value={searchValue}
      className="input-search"
      type="search"
    />
  );
};

TextInput.propTypes = {
  handleChange: P.func.isRequired,
  searchValue: P.string.isRequired,
};
