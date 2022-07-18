import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('<Button />', () => {
  it('should render the button with the text "Load more"', () => {
    const onClick = jest.fn();
    render(<Button text="Load more" onClick={onClick} />);

    expect.assertions(1);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const onClick = jest.fn();
    render(<Button text="Load more" onClick={onClick} />);

    const button = screen.getByRole('button', { name: /load more/i });

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const onClick = jest.fn();
    render(<Button text="Load more" onClick={onClick} disabled={true} />);

    expect(screen.getByRole('button', { name: /load more/i })).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    const onClick = jest.fn();
    render(<Button text="Load more" onClick={onClick} disabled={false} />);

    expect(screen.getByRole('button', { name: /load more/i })).toBeEnabled();
  });

  it('should match snapshot', () => {
    const onClick = jest.fn();
    const { container } = render(<Button text="Load more" onClick={onClick} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
