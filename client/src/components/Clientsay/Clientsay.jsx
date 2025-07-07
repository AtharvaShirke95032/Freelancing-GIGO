import './ClientSay.scss';

const clients = [
  {
    name: 'Sophie Turner',
    handle: '@sophie.designs',
    message: 'Just signed up last week and already hired a talented designer. Super smooth experience!',
    avatar: 'https://i.pravatar.cc/50?img=12',
  },
  {
    name: 'Liam Chen',
    handle: '@liam.codes',
    message: 'Found a skilled developer within hours of posting. This platform is a game changer for startups.',
    avatar: 'https://i.pravatar.cc/50?img=15',
  },
  {
    name: 'Ava Patel',
    handle: '@ava.marketing',
    message: 'Was skeptical at first, but the onboarding was so easy and I got amazing results on my first project!',
    avatar: 'https://i.pravatar.cc/50?img=17',
  },
  {
    name: 'Noah Williams',
    handle: '@noah.films',
    message: 'Joined recently and already completed two projects. The talent pool here is solid!',
    avatar: 'https://i.pravatar.cc/50?img=20',
  },
];


const ClientSay = () => {
  return (
    <section className="clientsay-section">
      <h2>What Our Clients Say!!</h2>
      <p className="subtitle">
        We value our clients' feedback and strive to provide the best service possible. Here's what they have to say about us.
      </p>
      <div className="slider">
        <div className="fade fade-left"></div>
        <div className="slide-track">
          {clients.concat(clients).map((client, index) => (
            <div className="testimonial-card" key={index}>
              <div className="client-info">
                <img src={client.avatar} alt={client.name} />
                <div>
                  <strong>{client.name}</strong>
                  <span>{client.handle}</span>
                </div>
              </div>
              <p>{client.message}</p>
            </div>
          ))}
        </div>
        <div className="fade fade-right"></div>
      </div>
    </section>
  );
};

export default ClientSay;
