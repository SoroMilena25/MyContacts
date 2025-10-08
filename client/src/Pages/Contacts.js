import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Erreur lors du chargement des contacts");
        setLoading(false);
        return;
      }

      setContacts(data);
    } catch (err) {
      setError("Erreur réseau ou serveur");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce contact ?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Erreur lors de la suppression");
        return;
      }

      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      alert("Erreur réseau ou serveur");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Mes contacts</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>

      <button
        onClick={() => navigate("/ajoutContact")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Ajouter un contact
      </button>

      {contacts.length === 0 ? (
        <p>Aucun contact trouvé.</p>
      ) : (
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li key={contact._id} className="border p-3 rounded shadow-sm flex justify-between items-center">
              <div>
                <p><strong>{contact.firstName} {contact.lastName}</strong></p>
                <p>Email : {contact.email}</p>
                <p>Téléphone : {contact.phone}</p>
                <p>Date de naissance : {new Date(contact.birthday).toLocaleDateString()}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/modifierContact/${contact._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
