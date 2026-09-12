import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    ['01', 'Form', 'Clean silhouettes, strong proportion and details that stay quiet until you notice them.'],
    ['02', 'Movement', 'Pieces designed around real days — carried, layered, opened, closed and lived with.'],
    ['03', 'Material', 'Tactile surfaces, polished hardware and finishes chosen to feel considered in the hand.'],
    ['04', 'Color', 'A compact palette of sand, black, coral and cobalt inspired by light, shadow and city rhythm.'],
  ];

  return (
    <main>
      <section className="fs-about-hero" aria-labelledby="about-title">
        <div className="shell fs-about-hero-inner">
          <p className="eyebrow">SAFRA / FÈS / DROP 01</p>
          <h1 className="fs-about-display" id="about-title">A point of view<br />you can <em>carry.</em></h1>
          <div className="fs-about-hero-foot">
            <p>SAFRA is a contemporary accessories label shaped by warm stone, sharp shadow, graphic color and the pace of everyday movement.</p>
            <span>OBJECTS FOR MOVEMENT · EST. 2026</span>
          </div>
        </div>
      </section>

      <section className="fs-about-story">
        <div className="shell fs-about-story-grid">
          <p className="eyebrow">01 / Our point of view</p>
          <h2>Useful first.<br /><em>Memorable always.</em></h2>
          <div className="fs-about-story-copy">
            <p>SAFRA begins with everyday objects: the bag you reach for without thinking, the frame that changes a silhouette, the piece of metal that catches light for a second.</p>
            <p>The collection takes visual cues from Fès — sun-warmed neutrals, deep interior shadows, precise geometry and sudden color — then translates them into a quieter, contemporary language.</p>
            <p>Nothing is added just to decorate. Shape, weight, finish and color are there to make each piece feel clear, useful and unmistakably itself.</p>
          </div>
        </div>
      </section>

      <section className="fs-about-manifesto">
        <div className="fs-about-manifesto-head">
          <div>
            <p className="eyebrow" style={{ color: '#df9787' }}>02 / The SAFRA code</p>
            <h2>Less noise.<br />More presence.</h2>
          </div>
          <p>We like objects that earn attention slowly: through proportion, touch, balance and the way they become part of a person rather than compete with them.</p>
        </div>

        <div className="fs-about-values">
          {values.map(([number, title, body]) => (
            <article className="fs-about-value" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="fs-about-origin">
        <div className="shell fs-about-origin-grid">
          <div className="fs-about-origin-image" aria-hidden="true"></div>
          <div className="fs-about-origin-copy">
            <p className="eyebrow">03 / Fès, Morocco</p>
            <h2>Warm light.<br />Hard edges.<br /><em>Soft movement.</em></h2>
            <p>Our palette lives between mineral neutrals and decisive accents. Sand and ivory create calm; black gives structure; cobalt and coral interrupt the quiet at exactly the right moment.</p>
            <Link className="text-link" to="/shop">See the palette in the collection ↗</Link>
          </div>
        </div>
      </section>

      <section className="shell fs-about-cta">
        <h2>Carry something with a point of view.</h2>
        <Link className="btn btn-dark" to="/shop">Explore Drop 01</Link>
      </section>
    </main>
  );
}
