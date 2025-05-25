import React from 'react';
import styles from "./css/AddProduct.module.css";

const AddProduct = () => {
    return (
        <div className={styles.pageContainer}>
            <section className={styles.variantBar}>
                <div className={styles.variantBarHeader}>
                    <h3>Warianty</h3>
                    <button type="button" className="btnBlue">+</button>
                </div>
                <div className={styles.variantBarList}>
                    <div className={styles.variantBarListItem}>
                        <div className={styles.variantBarListItemContent}>
                            <h3>Wariant Name 1</h3>
                            <p>Descriptiuon Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ex.</p>
                        </div>
                        <div className={styles.variantBarListItemPanel}>
                            <button type="button" className="btnBlue">copy</button>
                            <button type="button" className="btnRed">X</button>
                        </div>
                    </div>
                    <div className={`${styles.variantBarListItem} ${styles.variantBarListItem_active}`}>
                        <div className={styles.variantBarListItemContent}>
                            <h3>Wariant Name 1</h3>
                            <p>Descriptiuon Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ex.</p>
                        </div>
                        <div className={styles.variantBarListItemPanel}>
                            <button type="button" className="btnBlue">copy</button>
                            <button type="button" className="btnRed">X</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.formContainer}>
                <form action="" method='post' className={styles.form}>
                    <label htmlFor="">
                        <p>Nazwa</p>
                        <input type="text" name='name' />
                    </label>
                    <div className={styles.formPriceBox}>
                        <label htmlFor="">
                            <p>Cena</p>
                            <input type="text" name='price' />
                        </label>
                        <label htmlFor="">
                            <p>Ilość</p>
                            <input type="text" name='amount' />
                        </label>
                    </div>
                    <table className={styles.formParametersTable}>
                        <tr>
                            <th colSpan={2}>Parametry</th>
                        </tr>
                        <tr>
                            <th>Parametr</th>
                            <th>Wartość</th>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name='paramName_1' value='RAM' />
                            </td>
                            <td>
                                <input type="text" name='paramValue_1' convaluetent='16 GB' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name='paramName_2' value='Pojemność dysku' />
                            </td>
                            <td>
                                <input type="text" name='paramValue_2' value='512 GB' />
                            </td>
                        </tr>
                    </table>
                    <button type="button" className='btnBlue'>Dodaj parametr</button>
                    <section>
                        <div className='imgList'>
                            <div className='imgContainer'>
                                <img src="" alt="" />
                                <button type="button">x</button>
                            </div>
                        </div>
                        <button type="button" className='btnBlue'>Dodaj plik</button>
                    </section>
                    <section>
                        <h3>Opis (markdown)</h3>
                        <div className='editor'>
                            <div className="editorNav">
                                <p>markdown</p>
                                <p>podgląd</p>
                            </div>
                            <textarea name="" id=""></textarea>
                        </div>
                    </section>
                    <button type="submit" className="btnBlue">Zapisz zmiany</button>
                </form>
            </section>
        </div>
    );
}

export default AddProduct;
