/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Posts } from './index';
import { postsPropsMock } from './mock';

const props = postsPropsMock;

describe('<Posts>', () => {
  it('should render posts', () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
  });

  it('should not render posts', () => {
    render(<Posts />);

    expect(screen.queryAllByRole('heading', { name: /title/i })).toHaveLength(0);
  });
  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
