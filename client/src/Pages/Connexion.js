import { useNavigate } from 'react-router-dom';

export default function Connexion() {

  const navigate = useNavigate();

  async function seConnecter(formData) {
    const email = formData.get("email");
    const mdp = formData.get("mdp");

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mdp }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur de connexion");
        return;
      }

      console.log("Token reçu :", data.token);
      alert("Connexion réussie");

      localStorage.setItem("token", data.token);

      navigate("/contacts"); 

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur réseau ou serveur");
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          seConnecter(new FormData(event.target));
        }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-xl font-bold mb-2">Connexion</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />

        <input
          name="mdp"
          type="password"
          placeholder="Mot de passe"
          required
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Se connecter
        </button>
      </form>

      <button
        onClick={() => navigate("/inscription")}
        className="bg-green-600 text-white p-2 rounded mt-2"
      >
        S'inscrire
      </button>
    </div>
  );
}
