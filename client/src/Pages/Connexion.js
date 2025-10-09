import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import '../css/Connexion.css';

export default function Connexion() {

  const navigate = useNavigate();

  async function seConnecter(formData) {
    const email = formData.get("email");
    const mdp = formData.get("mdp");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
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
    <div className="connexion-container">
      <div className="connexion-card">

        <div className="connexion-header">
          <div className="connexion-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1>MyContacts</h1>
          <p>Connectez-vous à votre compte</p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            seConnecter(new FormData(event.target));
          }}
          className="connexion-form"
        >

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <div className="input-wrapper">
              <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mdp">Mot de passe</label>
            <div className="input-wrapper">
              <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                id="mdp"
                name="mdp"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Se connecter
          </button>
        </form>

        <div className="divider">
          <span>Ou</span>
        </div>

        <button
          onClick={() => navigate("/inscription")}
          className="btn-secondary"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Créer un compte
        </button>

        <p className="connexion-footer">© 2025 - Tous droits réservés</p>
      </div>
    </div>
  );
}
