export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(item => (
        <li key={item.id}>
          {item.name}: {item.number}
          <button type="button" id={item.id} onClick={onDelete}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
