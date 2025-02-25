import styles from '../styles/PutterHeader.module.css';
import Image from 'next/image';

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
        <div className="relative w-full h-64 mb-6">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
}
