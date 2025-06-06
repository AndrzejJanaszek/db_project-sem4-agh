import { useState } from 'react';
import styles from "../css/Product.module.css";

const ProductParametersTable = () => {
    const [parameters, setParameters] = useState([
        { id: 1, name: "RAM", value: "16 GB" },
        { id: 2, name: "Pojemność dysku", value: "512 GB" }
    ]);

    const handleChange = (id, field, newValue) => {
        setParameters(prev =>
            prev.map(param =>
                param.id === id ? { ...param, [field]: newValue } : param
            )
        );
    };

    const handleAdd = () => {
        const newId = parameters.length ? Math.max(...parameters.map(p => p.id)) + 1 : 1;
        setParameters([...parameters, { id: newId, name: "", value: "" }]);
    };

    const handleRemove = (id) => {
        setParameters(prev => prev.filter(param => param.id !== id));
    };

    return (
        <section>
            <table className={styles.formParametersTable}>
                <thead>
                    <tr>
                        <th colSpan={3}>Parametry</th>
                    </tr>
                    <tr>
                        <th>Parametr</th>
                        <th colSpan={2}>Wartość</th>
                    </tr>
                </thead>
                <tbody>
                    {parameters.map((param, index) => (
                        <tr key={param.id}>
                            <td>
                                <input
                                    type="text"
                                    name={`paramName_${index + 1}`}
                                    value={param.name}
                                    onChange={(e) => handleChange(param.id, "name", e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name={`paramValue_${index + 1}`}
                                    value={param.value}
                                    onChange={(e) => handleChange(param.id, "value", e.target.value)}
                                />
                            </td>
                            <td>
                                <button type="button" onClick={() => handleRemove(param.id)}>x</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" className="btnBlue" onClick={handleAdd}>
                Dodaj parametr
            </button>
        </section>
    );
};

export default ProductParametersTable;
