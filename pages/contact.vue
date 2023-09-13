<template>
  <div class="contact-page">
    <h1>Contactez-nous</h1>

    <div class="contact-info">
      <div class="contact-details">
        <h2>Coordonnées</h2>
        <p>
          Société de Babyfoots Connectés<br />
          Adresse : 123 Rue des Babyfoots<br />
          Code Postal : 12345<br />
          Ville : Babyfootville<br />
          Téléphone : (123) 456-7890<br />
          Email : contact@babyfootconnect.com
        </p>
      </div>

      <div class="contact-map">
        <h2>Nos emplacements</h2>
        <iframe
          src="https://boitier.floodz.fr"
          width="100%"
          height="500px"
          frameborder="0"
          scrolling="no"
        ></iframe>
        <iframe
          src="https://capteur.floodz.fr"
          width="100%"
          height="500px"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>

    <div class="contact-form">
      <h2>Formulaire de Contact</h2>
      <!-- Ajoutez ici votre formulaire de contact personnalisé -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.contact-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

.contact-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.contact-details {
  flex: 1;
}

.contact-map {
  flex: 1;
}

.contact-form {
  margin-top: 20px;
  text-align: center;
}

iframe {
  width: 100%;
  height: 500px;
  border: 0;
  margin-bottom: 20px;
}
</style>
