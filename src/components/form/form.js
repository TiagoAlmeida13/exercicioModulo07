import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './form.css';

function Form() {
    const initialFormData = { name: '', email: '', sex: '', documentType: '', documentNumber: '' };
    const [formData, setFormData] = useState(initialFormData);
    const [respostas, setRespostas] = useState([]);
    const [documentTypes, setDocumentTypes] = useState(["RG", "CPF", "CNH"]);
    const [sort, setSort] = useState({ column: 'name', order: 'asc' });


    const [selected, setSelected] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleSelect = (resposta) => {
        setSelected(resposta);
        setShowModal(true);
    };

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
                <input placeholder='N?? documento' type="number" name="documentNumber" value={formData.documentNumber} onChange={handleChange} />
                <br />
                <input type="submit" value="Enviar" />
            </form>
            <div className="answer">
                {respostas.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('name')}>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((resposta, index) => (
                                <tr >
                                    <td >{resposta.name}</td>
                                    <td><button key={resposta.key} onClick={() => handleSelect(resposta)}>Mais informa????es</button></td>
                                    <td><button onClick={() => handleDelete(resposta.key)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                )}
                <ReactModal
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <h2>Informa????es da resposta</h2>
                    <p>Nome: {selected.name}</p>
                    <p>Email: {selected.email}</p>
                    <p>Sexo: {selected.sex}</p>
                    <p>Tipo de documento: {selected.documentType}</p>
                    <p>N??mero de documento: {selected.documentNumber}</p>
                    <button onClick={() => setShowModal(false)}>Fechar</button>
                </ReactModal>
            </div>
        </div>
    );
}

export default Form;
