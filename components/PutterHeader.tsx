import styles from '../styles/PutterHeader.module.css';

interface PutterHeaderProps {
  title: string;
  brand: string;
  year: string;
  keySpecs: string[];
  imageUrl: string;
}

export default function PutterHeader({ title, brand, year, keySpecs, imageUrl }: PutterHeaderProps) {
  return (
    <div className={styles.putterHeader}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.badges}>
          <span className={styles.badge}>{brand}</span>
          <span className={styles.badge}>{year}</span>
        </div>
        <div className={styles.keySpecs}>
          {keySpecs.map((spec, index) => (
            <span key={index} className={styles.keySpec}>
              {spec}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.headerImage}>
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
}
