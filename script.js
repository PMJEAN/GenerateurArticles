
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
                
            }
        });
    };
    
    reader.readAsText(file); // Lire le fichier comme texte
}
// Fonction pour générer dynamiquement les options du menu déroulant
function generateColumnOptions() {
    const selectElement = document.getElementById('filterColumn');
    selectElement.innerHTML = ''; // Vider les options existantes

    if (csvData.length === 0) return; // Si aucune donnée, ne rien faire

    const columns = Object.keys(csvData[0]); // Extraire les noms des colonnes
    // Les options des colonnes à partir de la colonne 5 et plus
    for (let i = 4; i < columns.length; i++) {
        const option = document.createElement('option');
        option.value = i; // La colonne 5 a l'index 4, etc.
        option.textContent = columns[i]; // Nom de la colonne (probabilité)
        selectElement.appendChild(option);
    }
}
// Fonction pour générer le tableau en fonction de la colonne sélectionnée
function generateTable() {
    const selectedColumn = parseInt(document.getElementById("filterColumn").value);
    const tbody = document.querySelector("#itemsTable tbody");
    tbody.innerHTML = ''; // Vider le tableau existant

    if (selectedColumn === undefined || csvData.length === 0) return;

    csvData.forEach(item => {
        const ARTICLE = item["ARTICLE"];
        const PRIX = item["PRIX"];
        const QTE = parseInt(item["QTE"]);
        const DETAILS = item["DETAILS"];
        const probability = parseInt(item[Object.keys(item)[selectedColumn]]); // Probabilité selon la colonne sélectionnée



    
    generateTable(); // Re-génère le tableau basé sur la colonne sélectionnée et la probabilité
}
