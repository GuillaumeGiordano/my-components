<script>
  import { AppWindow, Image, Monitor, ShoppingCart } from "@lucide/svelte";
  import Tilt3D from "./Tilt3D.svelte";
  import Button from "../buttons/Button.svelte";
</script>

<div class="demo">
  <Tilt3D>
    <div class="card card--vitrine">
      <div class="card-header">
        <div class="card-icon"><Monitor size={22} /></div>
        <span class="card-tag">Le plus demandé</span>
      </div>
      <h3>Site vitrine</h3>
      <p>
        Présentez votre activité avec un site élégant, rapide et pensé pour convertir vos
        visiteurs.
      </p>
      <Button variant="primary" size="sm" href="/g2webdev/offres/site-vitrine">
        En savoir plus
      </Button>
    </div>
  </Tilt3D>

  <Tilt3D>
    <div class="card card--portfolio">
      <div class="card-header">
        <div class="card-icon"><Image size={22} /></div>
        <span class="card-tag">Créatifs</span>
      </div>
      <h3>Portfolio</h3>
      <p>
        Mettez vos réalisations en valeur dans une galerie soignée et entièrement
        responsive.
      </p>
      <Button variant="primary" size="sm" href="/g2webdev/offres/portfolio">
        En savoir plus
      </Button>
    </div>
  </Tilt3D>

  <Tilt3D>
    <div class="card card--ecom">
      <div class="card-header">
        <div class="card-icon"><ShoppingCart size={22} /></div>
        <span class="card-tag">Vente en ligne</span>
      </div>
      <h3>E-commerce</h3>
      <p>
        Une boutique sécurisée et performante pour vendre vos produits partout, 24h/24.
      </p>
      <Button variant="primary" size="sm" href="/g2webdev/offres/e-commerce">
        En savoir plus
      </Button>
    </div>
  </Tilt3D>

  <Tilt3D>
    <div class="card card--app">
      <div class="card-header">
        <div class="card-icon"><AppWindow size={22} /></div>
        <span class="card-tag">Sur mesure</span>
      </div>
      <h3>Application web</h3>
      <p>
        Des outils métier sur mesure, accessibles partout et taillés pour votre
        organisation.
      </p>
      <Button variant="primary" size="sm" href="/g2webdev/offres/application-web">
        En savoir plus
      </Button>
    </div>
  </Tilt3D>
</div>

<style lang="scss">
  .demo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
  }

  .card {
    --accent: var(--primary);
    position: relative;
    padding: 24px;
    border-radius: 12px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-top: 3px solid var(--accent);
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .card--vitrine {
    --accent: var(--primary);
  }
  .card--portfolio {
    --accent: #8b5cf6;
  }
  .card--ecom {
    --accent: #22c55e;
  }
  .card--app {
    --accent: #f59e0b;
  }
  .card-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-tag {
    align-self: flex-start;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }
  .card h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-heading);
  }
  .card p {
    margin: 0;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.4;
  }
</style>
