import './styles.css';

export const Button = (props) =>  {
    const { onClick, disabled, text } = props;
    
    return(
        <button 
            disabled = { disabled }
            className='button'
            onClick={ onClick }> 
            { text }
        </button>
        )
    
}