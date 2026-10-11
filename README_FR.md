# Fasil Lakay — version pilote

## Fichiers
- `index.html` : interface mobile
- `app.js` : recherche, catégories, création d'annonces et stockage local
- `manifest.json` : paramètres d'installation PWA
- `sw.js` : cache hors ligne basique
- `icon.svg` : icône

## Tester sur Android
La PWA s'installe correctement depuis une adresse HTTPS. Le plus simple, sans PC :
1. Télécharge et décompresse le ZIP sur ton téléphone.
2. Ouvre GitHub dans Chrome et connecte-toi.
3. Crée un dépôt public `fasil-lakay` (sans données personnelles).
4. Ajoute les cinq fichiers à la racine du dépôt.
5. Dans Settings > Pages, choisis `Deploy from a branch`, branche `main`, dossier `/ (root)`, puis Save.
6. Attends que GitHub Pages fournisse l'adresse HTTPS. Ouvre-la dans Chrome.
7. Menu ⋮ > « Installer l'application » ou « Ajouter à l'écran d'accueil ».

## Configuration importante
Dans `app.js`, remplace `50900000000` par le numéro WhatsApp professionnel réel, en chiffres seulement avec l'indicatif pays. Ne laisse pas le numéro d'exemple lors du lancement.

## Limites de cette V1
- Les annonces créées sont sauvegardées seulement dans le navigateur du téléphone qui les crée.
- Les exemples sont fictifs.
- Il n'y a pas encore de comptes, de base de données partagée, de modération serveur, ni de paiements.
- N'accepte pas de paiements via cette démo. N'ajoute jamais de clés secrètes côté navigateur.

## Pour lancer une vraie marketplace partagée
La prochaine étape sera de connecter une base de données et une authentification, puis de configurer les règles de sécurité, la modération et les signalements avant d'ouvrir les publications au public.
