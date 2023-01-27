import React, { useState } from 'react';
import './form.css';

function Form() {
    const initialFormData = { name: '', email: '', sex: '', documentType: '', documentNumber: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [respostas, setRespostas] = useState([]);
    const [documentTypes, setDocumentTypes] = useState(["RG", "CPF", "CNH"]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // check if all required fields are filled
        if (Object.values(formData).every(val => val)) {
            setRespostas([...respostas, formData]);
        }

        setFormData(initialFormData);
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Sexo:
                    <input type="radio" name="sex" value="masculino" onChange={handleChange} checked={formData.sex === "masculino"} /> Masculino
                    <input type="radio" name="sex" value="feminino" onChange={handleChange} checked={formData.sex === "feminino"} /> Feminino
                </label>
                <br />
                <label>
                    Tipo de documento:
                    <select name="documentType" value={formData.documentType} onChange={handleChange}>
                        <option value="">Selecione</option>
                        {documentTypes.map((item, index) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </label>
                <br />
                <input placeholder='Nº documento' type="number" name="documentNumber" value={formData.documentNumber} onChange={handleChange} />
                <br />
                <input type="submit" value="Enviar" />
            </form>
            <div className="answer">
                {respostas.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Sexo</th>
                                <th>Tipo de documento</th>
                                <th>Número de documento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {respostas.map((resposta, index) => (
                                <tr key={index}>
                                    <td>{resposta.name}</td>
                                    <td>{resposta.email}</td>
                                    <td>{resposta.sex}</td>
                                    <td>{resposta.documentType}</td>
                                    <td>{resposta.documentNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Form;
