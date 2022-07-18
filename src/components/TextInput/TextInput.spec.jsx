import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput>', () => {
  it('should call have a value of searchValue', () => {
    const handleChange = jest.fn();
    render(<TextInput handleChange={handleChange} searchValue={'testando'} />);

    const input = screen.getByPlaceholderText(/digite sua busca aqui/i);

    expect(input.value).toBe('testando');
  });
  it('should call handle change on each key pressed', async () => {
    const handleChange = jest.fn();
    render(<TextInput handleChange={handleChange} searchValue={'test'} />);

    const input = screen.getByPlaceholderText(/digite sua busca aqui/i);
    const testTypeValue = 'test';

    await userEvent.type(input, testTypeValue);

    expect(input.value).toBe(testTypeValue);
    expect(handleChange).toBeCalledTimes(testTypeValue.length);
  });
  it('should match snapshot', () => {
    const handleChange = jest.fn();
    const { container } = render(<TextInput handleChange={handleChange} searchValue={''} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
