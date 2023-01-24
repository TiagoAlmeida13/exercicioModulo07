import React, { useState } from 'react';
import './form.css';

function Form() {
    const [formData, setFormData] = useState({ name: '', email: '', sex: '', documentType: '', documentNumber: '' });
    const [resposta, setResposta] = useState({});
    const [documentTypes, setDocumentTypes] = useState(["RG", "CPF", "CNH"]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        if (formData.name !== "" && formData.email !== "" && formData.sex !== "" && formData.documentType !== "" && formData.documentNumber !== "") {

            setResposta(formData);
        }

        setFormData({ name: '', email: '', sex: '', documentType: '', documentNumber: '' });
    }

    return (
        <div class="form">
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
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </label>
                <br />
                <input placeholder='Nº documento' type="number" name="documentNumber" value={formData.documentNumber} onChange={handleChange} />
                <br />
                <input type="submit" value="Enviar" />
            </form>
            <div class="answer">
                {resposta.name && resposta.email && resposta.sex && resposta.documentType && resposta.documentNumber && (
                    <div>
                        Nome: {resposta.name} <br />
                        Email: {resposta.email} <br />
                        Sexo: {resposta.sex} <br />
                        Tipo de documento: {resposta.documentType} <br />
                        Nº documento: {resposta.documentNumber}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Form;