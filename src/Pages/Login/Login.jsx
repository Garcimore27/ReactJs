import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import bcrypt from "bcryptjs-react";

export default function Login() {
    // const bcrypt = require('bcrypt');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});

  // Ici dans les params je recupere l'evennement onSubmit (la variable "e")
  const handleSubmit = (e) => {
    // Qui me permet d'annuler le comportement par defaut d'HTML et des formulaires qui est de recharger la page
    // après la soumission
    e.preventDefault();
    let userEmail = {
        email,
        password
      };
      fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail),
      })
      .then((res) => res.json())
      .then(
        async function(data) {
        console.log("Data From Node", data)
        console.log("Email From Node", data.email)
        console.log("Email From React", email)
        console.log("Password From Node", data.password)
        console.log("Password From React", password)
        console.log("LastName From Node", data.lastName)
        console.log("FirstName From Node", data.firstName)
        const passOK = await bcrypt.compare(password, data.password);
        if (data.email === email && passOK && password_confirmation === password) {
            setUser(data);
            setLogged(true);
            timeOut();
            console.log("VALIDATION OK - USER CONNECTED !");
        } //End of if
        else{
            setLogged(false);
            timeOut();
            console.log("ERREUR DE VALIDATION !");
        } //End of else
        console.log("passOK ? :", passOK)
        console.log("USER: ", user)
        } //End of function(data)

        ) //End of .then
  }; //End of handleSubmit

  const timeOut = () => {
    setTimeout(() => {
      setLogged(false);
    }, 5000);
  };

  return (

    <div className="container">
        <div className="row centered-form">
        <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
        	<div className="panel panel-default">
        		<div className="panel-heading">
			    		<h3 className="panel-title">Formulaire de Connexion <small> {logged ? "Connecté" : "Déconnecté"}</small></h3>
			 			</div>
			 			<div className="panel-body">
			    		<form role="form" onSubmit={handleSubmit}>

			    			<div className="form-group">
			    				<input type="email" name="email" id="email" className="form-control input-sm" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
			    			</div>

			    			<div className="row">
			    				<div className="col-xs-6 col-sm-6 col-md-6">
			    					<div className="form-group">
			    						<input type="password" name="password" id="password" className="form-control input-sm" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
			    					</div>
			    				</div>
			    				<div className="col-xs-6 col-sm-6 col-md-6">
			    					<div className="form-group">
			    						<input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password" onChange={(e) => setPassword_confirmation(e.target.value)}/>
			    					</div>
			    				</div>
			    			</div>
			    			<div className="row">
			    				<div className="col-xs-6 col-sm-6 col-md-6">
			    			        <input type="submit" value="Connexion" className="btn btn-info btn-block" />
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <Link to="/register" className="btn btn-warning btn-block">S'inscrire</Link>
                                </div>
                            </div>
                            {logged !== false && (
                            // Ensuite, si logged est vrai (donc par exemple si logged est un object, alors logged est vrai par defaut)
                            // alors j'affiche la class success (pour mettre vert)
                            // Si logged est faux (ou undefined), alors j'affiche la class error
                            <div className={logged ? "success" : "error"}>
                                {/* Idem ici, si c'est vrai, j'affiche bonjour prenom nom, sinon j'affiche id incorrect */}
                                {logged
                                ? `Bonjour ${user.firstName} ${user.lastName}`
                                : "Identifiants incorrect"}
                            </div>
                            )}
			    		</form>
			    	</div>
	    		</div>
    		</div>
    	</div>
    </div>
  );
}
