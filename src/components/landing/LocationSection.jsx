import { Clock, MapPin } from 'lucide-react';

function LocationSection() {
  return (
    <section id="localizacao" className="section location">
      <div className="container location__content">
        <div className="location__info">
          <span className="section__eyebrow">Localização</span>

          <h2>Venha conhecer o Comercial Sagarana</h2>

          <p>
            Encontre nosso estabelecimento com facilidade e confira de perto
            nossas ofertas e produtos para o dia a dia.
          </p>

          <div className="location__details">
            <div className="location__detail">
              <MapPin size={22} />
              <div>
                <strong>Endereço</strong>
                <span>Av. Pôsto Agropecuária, N° 1202 - Vista Alegre, Formosa - GO, 73805-853</span>
              </div>
            </div>

            <div className="location__detail">
              <Clock size={22} />
              <div>
                <strong>Horário de funcionamento</strong>
                <span>Segunda a sábado, das 8h às 20h <br />
                Domingo das 8h às 13h</span>
              </div>
            </div>
          </div>

          <a
            href="https://goo.gl/maps/tqxxH3i8BqTk8BGPA"
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
          >Abrir no Google Maps
          </a>
        </div>

        <div className="location__map">
          <iframe
            title="Localização do Comercial Sagarana"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.188015647589!2d-47.34977842510782!3d-15.528048385075753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93509896c09a03a5%3A0x4c5161f67812ab7f!2sComercial%20Sagarana!5e0!3m2!1sen!2sbr!4v1745245461092!5m2!1sen!2sbr"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;