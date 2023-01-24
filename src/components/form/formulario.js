import React, { useState } from 'react';

function FormExample() {
    // Define o estado inicial dos campos de input
    const [formData, setFormData] = useState({ name: '', email: '', sex: '', documentType: '', documentNumber: '' });
    const [resposta, setResposta] = useState({});
    const [documentTypes, setDocumentTypes] = useState(["RG", "CPF", "CNH"]);

    // Função para atualizar o estado dos campos de input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Função para enviar o formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica se os valores dos campos não estão vazios
        if (formData.name !== "" && formData.email !== "" && formData.sex !== "" && formData.documentType !== "" && formData.documentNumber !== "") {
            // Atualiza a resposta
            setResposta(formData);
        }

        // Limpa os campos de input
        setFormData({ name: '', email: '', sex: '', documentType: '', documentNumber: '' });
    }

    return (
        <div>
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
                <label>
                    Número do documento:
                    <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" value="Enviar" />
            </form>
            <div>
                {resposta.name && resposta.email && resposta.sex && resposta.documentType && resposta.documentNumber && (
                    <div>
                        Nome: {resposta.name} <br />
                        Email: {resposta.email} <br />
                        Sexo: {resposta.sex} <br />
                        Tipo de documento: {resposta.documentType} <br />
                        Número do documento: {resposta.documentNumber}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FormExample;