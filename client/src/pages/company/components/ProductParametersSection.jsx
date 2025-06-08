import styles from "../css/Product.module.css";

const ProductParametersTable = ({ parameters, setParameters }) => {
    const handleChange = (index, field, newValue) => {
        setParameters(prev =>
            prev.map((param, i) =>
                i === index ? { ...param, [field]: newValue } : param
            )
        );
    };

    const handleAdd = () => {
        setParameters(prev => [...prev, { name: "", value: "" }]);
    };

    const handleRemove = (index) => {
        setParameters(prev => prev.filter((_, i) => i !== index));
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
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    name={`paramName_${index + 1}`}
                                    value={param.name}
                                    onChange={(e) => handleChange(index, "name", e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name={`paramValue_${index + 1}`}
                                    value={param.value}
                                    onChange={(e) => handleChange(index, "value", e.target.value)}
                                />
                            </td>
                            <td>
                                <button type="button" onClick={() => handleRemove(index)}>x</button>
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
