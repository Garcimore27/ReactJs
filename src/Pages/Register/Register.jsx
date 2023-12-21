import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  // Ici dans les params je recupere l'evennement onSubmit (la variable "e")
  const handleSubmit = (e) => {
    // Qui me permet d'annuler le comportement par defaut d'HTML et des formulaires qui est de recharger la page
    // après la soumission
    e.preventDefault();

    // Ensuite je crée un objet qui regroupe toutes les infos de mon utilisateur qui viens de s'inscrire
    let user = {
      email,
      password,
      lastName,
      firstName,
    };

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
  };

  return (
    // J'ecoute l'evennement onSubmit qui s'execute quand on soumet le formulaire (que ce soit avec la touche entrée ou le bouton envoyer)
    // Et l'evennement appel ma fonction handleSubmit
    <div className="container">
      <div className="row col-8">
        <div className="col-6 mt-4">
          <h1>Inscription</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-4 mt-2 py-3 bg-primary rounded">
          <form className="login text-warning" onSubmit={handleSubmit}>
            <label className="mt-2" htmlFor="lastName">
              Nom
            </label>
            {/* Pour chaques input, j'ecoute l'evennement onChange afin de mettre a jour ma variable en fonction de mon input */}
            {/* Ca permet d'avoir en temps réel le contenu de l'input dans ma variable correspondante */}
            {/* Pour recuperer le contenu de l'input, je recupère l'evennement (la variable "e") */}
            {/* Dans cet evennement, je recupère ma cible (donc l'input) puis sa valeur */}
            {/* et j'utilise le setLastName pour définir ma variable avec le contenu de mon input */}
            <input
              className="rounded"
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="mt-2" htmlFor="firstName">
              Prénom
            </label>
            <input
              className="rounded"
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="mt-2" htmlFor="email">
              Email
            </label>
            <input
              className="rounded"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="mt-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="rounded"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="col-12">
                <div className="row">
                    <div className="col-4">
                        <button className="btn btn-success mt-4" >S'inscrire<span className="vr mx-2"></span><span>&#8658;</span></button>
                    </div>
                    <div className="col-4 ms-2">
                        <Link to="/login" className="btn btn-warning mt-4">Connexion</Link>
                    </div>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
