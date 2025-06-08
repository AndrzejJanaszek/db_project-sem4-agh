import styles from "../css/Product.module.css";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from "react";

const ProductDescriptionSection = ({ description, setDescription }) => {
    const [tab, setTab] = useState("markdown"); // "markdown" lub "preview"

    return (
        <section>
            <h3>Opis (markdown)</h3>
            <div className={styles.editor}>
                <div className={styles.editorNav}>
                    <p
                        className={`${styles.editorNavTab} ${tab === "markdown" ? styles.editorNavTabActive : ""}`}
                        onClick={() => setTab("markdown")}
                    >
                        markdown
                    </p>
                    <p
                        className={`${styles.editorNavTab} ${tab === "preview" ? styles.editorNavTabActive : ""}`}
                        onClick={() => setTab("preview")}
                    >
                        podgląd
                    </p>
                </div>

                {tab === "markdown" ? (
                    <textarea
                        className={styles.editorTextarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                ) : (
                    <div className={styles.editorPreview}>
                        <ReactMarkdown
                            children={description || "*Brak treści*"}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={oneDark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductDescriptionSection;
