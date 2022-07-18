import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '.';
import { handlers } from './mock';

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render seach, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem Posts');

    // expect.assertions(1);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Digite Sua Busca Aqui/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem Posts');

    // expect.assertions(1);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Digite Sua Busca Aqui/i);
    expect(search).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /title1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title2/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title3/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title4/i })).not.toBeInTheDocument();

    await userEvent.type(search, 'title1');

    expect(screen.getByRole('heading', { name: /title1/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title3/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title4/i })).not.toBeInTheDocument();

    await userEvent.clear(search);

    expect(screen.queryByRole('heading', { name: /title2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title3/i })).toBeInTheDocument();

    await userEvent.type(search, 'dumbyText');

    expect(screen.getByText('Não existem Posts')).toBeInTheDocument();
  });

  it('should load more posts when button clicked', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem Posts');

    // expect.assertions(1);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(screen.queryByRole('heading', { name: 'title4' })).not.toBeInTheDocument();

    await userEvent.click(button);

    expect(screen.getByRole('heading', { name: 'title4' })).toBeInTheDocument();
  });
});
