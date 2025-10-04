import { Link } from '@tanstack/react-router'
import styles from './export-page.module.scss';

export const ErrorPage = () => {
  return (
    <div className={styles['error-page']}>
      <h1 className={styles['error-page__heading']}>Coś poszło nie tak</h1>
      <Link className={styles['error-page__link']} to={'/'}>Powróć do strony głównej</Link>
    </div>
  )
}
