async function injectBodyFromUrl(url, targetSelector) {
    try {
        const res = await fetch(url, { credentials: 'same-origin' }); // ou 'include' si besoin
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const htmlText = await res.text();
        console.log(htmlText)
        // Parse le HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Sélectionne le conteneur cible
        const target = document.querySelector(targetSelector);
        if (!target) throw new Error('Cible introuvable: ' + targetSelector);

        // Clone et ajoute chaque enfant du body
        Array.from(doc.body.childNodes).forEach(node => {
            target.appendChild(node.cloneNode(true));
        });

    } catch (err) {
        console.error('Erreur injection HTML:', err);
    }
}