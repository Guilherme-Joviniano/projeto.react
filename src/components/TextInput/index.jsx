import './styles.css';

export const TextInput = ({handleChange, searchValue}) => {
    return (
        <input
            onChange = { handleChange } 
            placeholder = { "Digite Sua Busca Aqui" }
            value = { searchValue }
            className = "input-search"
            type="search" />
    )
}