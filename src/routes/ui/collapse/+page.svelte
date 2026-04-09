<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import Collapse from "$lib/components/ui/Collapse.svelte";
  import "$lib/styles/demo-page.css";
</script>

<svelte:head><title>Collapse — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Collapse</h1>

    <p>
      Accordéon natif basé sur <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> —
      sémantique HTML, accessible au clavier, avec animation CSS fluide d'ouverture et de fermeture.
    </p>
  </div>

  <!-- VARIANT DEFAULT -->
  <section class="variant">
    <h2>Default — séparateur simple</h2>
    <ComponentPreview>
      <div class="demo-col">
        <Collapse name="rgaa" title="Qu'est-ce que le RGAA ?">
          Le Référentiel Général d'Amélioration de l'Accessibilité (RGAA) est le cadre
          réglementaire français qui impose aux organismes publics de rendre leurs sites
          web accessibles aux personnes en situation de handicap.
        </Collapse>

        <Collapse name="rgaa" title="Quels navigateurs sont supportés ?">
          La balise <code>&lt;details&gt;</code> est supportée par tous les navigateurs modernes
          (Chrome, Firefox, Safari, Edge) sans aucun polyfill nécessaire.
        </Collapse>

        <Collapse name="rgaa" title="Peut-on imbriquer des Collapse ?">
          Oui, les éléments <code>&lt;details&gt;</code> peuvent être imbriqués librement.
          Chaque niveau d'imbrication conserve son propre état ouvert/fermé indépendamment.
        </Collapse>
      </div>
    </ComponentPreview>
  </section>

  <!-- VARIANT BORDERED -->
  <section class="variant">
    <h2>Bordered — encadré</h2>

    <ComponentPreview>
      <div class="demo-col">
        <Collapse variant="bordered" title="Livraison">
          Les commandes sont expédiées sous 24h ouvrées. La livraison standard prend 3 à 5
          jours ouvrés selon votre localisation. Un suivi en temps réel est disponible par
          email.
        </Collapse>

        <Collapse variant="bordered" title="Retours et remboursements">
          Vous disposez de 30 jours pour retourner un article non utilisé dans son
          emballage d'origine. Le remboursement est effectué sous 5 à 10 jours ouvrés
          après réception du colis retourné.
        </Collapse>

        <Collapse variant="bordered" title="Garantie produit">
          Tous nos produits bénéficient d'une garantie fabricant de 2 ans couvrant les
          défauts de matériaux et de fabrication. La garantie ne couvre pas les dommages
          liés à une utilisation incorrecte.
        </Collapse>
      </div>
    </ComponentPreview>
  </section>

  <!-- VARIANT CARD -->
  <section class="variant">
    <h2>Card — carte élevée</h2>

    <ComponentPreview>
      <div class="demo-col">
        <Collapse variant="card" title="Installation">
          <ol class="steps">
            <li>Cloner le dépôt : <code>git clone …</code></li>
            <li>Installer les dépendances : <code>npm install</code></li>
            <li>Lancer le serveur de développement : <code>npm run dev</code></li>
          </ol>
        </Collapse>

        <Collapse variant="card" title="Configuration">
          <p>
            Copiez <code>.env.example</code> en <code>.env</code> et renseignez les variables
            suivantes :
          </p>

          <ul class="config-list">
            <li><code>DATABASE_URL</code> — URL de connexion à la base de données</li>
            <li><code>SECRET_KEY</code> — Clé secrète pour les sessions</li>
            <li><code>SMTP_HOST</code> — Serveur d'envoi d'emails</li>
          </ul>
        </Collapse>

        <Collapse variant="card" title="Déploiement">
          Buildez l'application avec <code>npm run build</code>, puis déployez le dossier
          <code>build/</code> sur votre hébergeur. Compatible Vercel, Netlify, Railway et tout
          hébergeur Node.js.
        </Collapse>
      </div>
    </ComponentPreview>
  </section>

  <div class="props-table">
    <h2>Props</h2>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>title</td><td>string</td><td>Texte du déclencheur (summary)</td></tr>
        <tr
          ><td>open</td><td>boolean</td><td
            >Ouvert par défaut (défaut : <code>false</code>)</td
          ></tr
        >
        <tr
          ><td>variant</td><td>'default' | 'bordered' | 'card'</td><td
            >Style visuel (défaut : <code>default</code>)</td
          ></tr
        >
        <tr><td>children</td><td>Snippet</td><td>Contenu affiché à l'ouverture</td></tr>
      </tbody>
    </table>
  </div>

  <div class="props-table">
    <h2>Technique d'animation</h2>
    <table>
      <thead><tr><th>Propriété CSS</th><th>Fermé</th><th>Ouvert</th></tr></thead>
      <tbody>
        <tr
          ><td>grid-template-rows</td><td><code>0fr</code></td><td><code>1fr</code></td
          ></tr
        >
        <tr
          ><td>Avantage</td><td colspan="2"
            >Anime la hauteur de <code>0</code> → <code>auto</code> sans JS, cross-browser</td
          ></tr
        >
      </tbody>
    </table>
  </div>
</div>

<style>
  .demo-col {
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 0;
    max-width: 600px;
  }

  code {
    font-family: var(--font-mono);
    font-size: 12px;
    background: var(--bg-muted);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
    color: var(--text-base);
  }

  .steps {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0;
  }

  .config-list {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 8px 0 0;
  }
</style>
