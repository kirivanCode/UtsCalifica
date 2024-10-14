import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { url: 'https://risbelmagazine.es/wp-content/uploads/2024/01/peliculas-de-anime-tristes-Cinco-centimetros-por-segundo-1024x768.jpg', alt: 'Imagen 1' },
    { url: 'https://media.cnn.com/api/v1/images/stellar/prod/2024-05-07t012426z-1755337355-rc2cl7a6o2f4-rtrmadp-3-milken-conference-copy.jpg?c=16x9&q=h_833,w_1480,c_fill', alt: 'Imagen 2' },
    { url: 'https://www.greendrive-accessories.com/blog/wp-content/uploads/2024/03/SpaceX-Starship-Revolutionizing-Space-Travel.jpeg', alt: 'Imagen 3' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.url}
            alt={slide.alt}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          />
        ))}
      </div>

      <section className={styles.news}>
        <h2>Noticias</h2>
        {/* Aquí puedes agregar tus noticias */}
        <p>SpaceX dijo en las redes sociales el lunes por la noche que el quinto vuelo de prueba de Starship podría lanzarse tan pronto como el 13 de octubre, a la espera de la aprobación regulatoria.</p>

      </section>

      <section className={styles.info}>
        <h2>Información</h2>
        {/* Aquí puedes agregar tu información */}
        <p>mucho texto</p>
      </section>

      <section className={styles.videos}>
        <h2>Videos Destacados</h2>
        {/* Aquí puedes agregar tus videos destacados */}
        <iframe width="560" height="315" src="https://www.youtube.com/embed/TyCB25oXUA4?si=tkE0p-JHHUGiORgt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Gw96jPDtoDQ?si=zmFVqIrfAYCTTPCd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </section>

      <footer className={styles.footer}>
        <h3>Sobre Nosotros</h3>
        <p>Estudiantes universiatios que quieren tener 5 millones de dolares hoy...</p>
        <p>Contacto: no se</p>
        <p>somos los mejores programadores</p>
      </footer>
    </div>
  );
};

export default Home;