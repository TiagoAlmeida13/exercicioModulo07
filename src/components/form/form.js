import React, { useState } from 'react';
import './form.css';

function Form() {
    const initialFormData = { name: '', email: '', sex: '', documentType: '', documentNumber: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [respostas, setRespostas] = useState([]);
    const [documentTypes, setDocumentTypes] = useState(["RG", "CPF", "CNH"]);
    const [sort, setSort] = useState({ column: 'name', order: 'asc' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(formData).every(val => val)) {
            setRespostas([...respostas, { ...formData, key: respostas.length + 1 }]);
        }

        setFormData(initialFormData);
    };

    const handleSort = (column) => {
        if (sort.column === column) {
            setSort({ column, order: sort.order === 'asc' ? 'desc' : 'asc' });
        } else {
            setSort({ column, order: 'asc' });
        }
    };

    const handleDelete = (key) => {
        setRespostas(respostas.filter(r => r.key !== key))
    };

    const sortedData = respostas.sort((a, b) => {
        if (sort.order === 'asc') {
            return a[sort.column] > b[sort.column] ? 1 : -1;
        } else {
            return a[sort.column] < b[sort.column] ? 1 : -1;
        }
    });

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
                                <th onClick={() => handleSort('name')}>Nome</th>
                                <th onClick={() => handleSort('email')}>Email</th>
                                <th onClick={() => handleSort('sex')}>Sexo</th>
                                <th onClick={() => handleSort('documentType')}>Tipo de documento</th>
                                <th onClick={() => handleSort('documentNumber')}>Número de documento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((resposta, index) => (
                                <tr key={resposta.key}>
                                    <td>{resposta.name}</td>
                                    <td>{resposta.email}</td>
                                    <td>{resposta.sex}</td>
                                    <td>{resposta.documentType}</td>
                                    <td>{resposta.documentNumber}</td>
                                    <td><button onClick={() => handleDelete(resposta.key)}>Delete</button></td>
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
