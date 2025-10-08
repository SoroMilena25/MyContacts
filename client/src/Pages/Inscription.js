import { useNavigate } from 'react-router-dom';

export default function Inscription() {

  const navigate = useNavigate();

  async function sInscrire(formData) {
    const email = formData.get("email");
    const mdp = formData.get("mdp");
    const pseudo = formData.get("pseudo");

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mdp, pseudo }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de l'inscription");
        return;
      }

      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");

      navigate("/connexion"); 

    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur réseau ou serveur");
    }
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); sInscrire(new FormData(event.target)); }} className="flex flex-col gap-2 p-4">
      <h1>Inscription</h1>

      <input
        name="pseudo"
        type="text"
        placeholder="Pseudo"
        required
        className="border p-2"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border p-2"
      />

      <input
        name="mdp"
        type="password"
        placeholder="Mot de passe"
        required
        className="border p-2"
      />

      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        S'inscrire
      </button>
    </form>
  );
}
