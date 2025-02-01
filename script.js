console.log("Fichier script.js ajouté avec succès !");
let csvData = []; 

// Fonction pour charger et parser le fichier CSV
function loadCSVData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const text = e.target.result;
        // Utilisation de PapaParse pour parser le CSV
        const data = Papa.parse(text, {
            header: true, // Les en-têtes du CSV seront utilisés comme noms de colonnes
            skipEmptyLines: true, // Ignorer les lignes vides
            complete: function(results) {
                csvData = results.data; // Stocker les données parsées dans csvData
                generateColumnOptions(); // Mettre à jour le menu déroulant avec les nouvelles colonnes
                generateTable(); // Générer immédiatement le tableau avec les options actuelles
            }
        });
    };
    
    reader.readAsText(file); // Lire le fichier comme texte
}
