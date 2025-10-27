async function injectBodyFromUrl(url, targetSelector) {
    try {
        const res = await fetch(url, { credentials: 'same-origin' }); // ou 'include' si besoin
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const htmlText = await res.text();

        // Parse le HTML en Document
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Récupère le contenu du body
        const bodyHtml = doc.body.innerHTML;

        // Injecte dans l'élément cible
        const target = document.querySelector(targetSelector);
        if (!target) throw new Error('Cible introuvable: ' + targetSelector);
        target.innerHTML = bodyHtml;

    } catch (err) {
        console.error('Erreur injection HTML:', err);
    }
}