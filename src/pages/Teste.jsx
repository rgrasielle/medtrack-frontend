import { useState } from "react";
import axios from "axios";

const Teste = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChangeEmail = (e) => {
        const novosDados = { email: e.target.value, senha: data.password }
        setData(novosDados);
    };

    const handleChangeSenha = (e) => {
        const novosDados = { email: data.email, password: e.target.value }
        setData(novosDados);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: data.email,
            password: data.password
        };
        console.log(userData);
    };

    function onSubmit(data) {
        console.log(data);
        chamarAPI(data);
    }

    const chamarAPI = (userData) => {
        axios.post("https://reqres.in/api/login", userData).then((response) => {
            console.log(response.status, response.data.token);
        });
    }


    return (
        <div>
            <h1>Login Account</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChangeEmail}
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChangeSenha}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Teste