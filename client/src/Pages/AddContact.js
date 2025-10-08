import { useNavigate } from "react-router-dom";

export default function AddContact() {
  const navigate = useNavigate();

  async function ajouterContact(formData) {
    const token = localStorage.getItem("token");
    const body = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      birthday: formData.get("birthday"),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de l'ajout du contact");
        return;
      }

      alert("Contact ajouté avec succès !");
      navigate("/contacts"); // retour à la liste
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur réseau ou serveur");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        ajouterContact(new FormData(e.target));
      }}
      className="flex flex-col gap-2 p-4 max-w-md mx-auto"
    >
      <h1 className="text-2xl font-semibold mb-4">Ajouter un contact</h1>

      <input name="firstName" type="text" placeholder="Prénom" required className="border p-2" />
      <input name="lastName" type="text" placeholder="Nom" required className="border p-2" />
      <input name="phone" type="tel" placeholder="Téléphone" required className="border p-2" />
      <input name="email" type="email" placeholder="Email" required className="border p-2" />
      <input name="birthday" type="date" required className="border p-2" />

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded flex-1"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={() => navigate("/contacts")}
          className="bg-gray-400 text-white p-2 rounded flex-1"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
