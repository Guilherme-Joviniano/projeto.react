import P from 'prop-types';

export const PostCard = ({ title, cover, body, id }) => (
  <div key={id} className="flex-row-reverse justify-center hover:drop-shadow-2xl transition-all duration-300">
    <div className="min-h-full w-96 flex flex-col-reverse md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
      <div className="p-6 flex flex-col justify-start">
        <h5 className="text-gray-900 text-xl font-medium mb-2 hover:underline">{title}</h5>
        <p className="text-gray-900 text-xs mb-2">{body}</p>
      </div>
      <img className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg" src={cover} alt={title} />
    </div>
  </div>
);

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
};
