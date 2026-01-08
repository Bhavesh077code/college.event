
const AdminEventCard = ({ event, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={event.image}
        className="h-44 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">{event.title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {event.description}
        </p>

        <div className="flex gap-2 mt-4">
          <a
            href={`/admin/edit/${event._id}`}
            className="flex-1 text-center bg-blue-500 text-white py-1 rounded"
          >
            Edit
          </a>

          <button
            onClick={() => onDelete(event._id)}
            className="flex-1 bg-red-500 text-white py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEventCard;
