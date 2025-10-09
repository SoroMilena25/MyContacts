import { useNavigate } from "react-router-dom";
import '../css/AddContact.css';

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
      navigate("/contacts");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur réseau ou serveur");
    }
  }

return (
    <div className="add-contact-container">
      <div className="add-contact-card">

        <div className="add-contact-header">
          <button 
            onClick={() => navigate("/contacts")} 
            className="btn-back"
            type="button"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="add-contact-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1>Ajouter un contact</h1>
          <p>Remplissez les informations du nouveau contact</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ajouterContact(new FormData(e.target));
          }}
          className="add-contact-form"
        >
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <div className="input-wrapper">
              <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Jean"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <div className="input-wrapper">
              <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Dupont"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Téléphone</label>
            <div className="input-wrapper">
              <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jean.dupont@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="birthday">Date de naissance</label>
            <div className="input-wrapper">
              <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                id="birthday"
                name="birthday"
                type="date"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => navigate("/contacts")}
              className="btn-secondary"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
