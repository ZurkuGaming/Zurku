// progressBar.js

function createXPProgressBar(userData) {
    // Calculate the percentage of XP the user has towards the next level
    const percentage = userData.xp / userData.xpRequired;

    // Calculate the number of filled and empty parts of the progress bar
    let filled = Math.round(percentage * 8);
    filled = Math.min(8, filled); // Ensure filled is not greater than 8
    const empty = Math.max(0, 8 - filled); // Ensure empty is not less than 0

    // Create the progress bar string
    const progressBar = '<:xpbarfilled:1194820990878896138>'.repeat(filled) + '<:xpbarempty:1194820993475170434>'.repeat(empty);

    return progressBar;
}

function createHealthProgressBar(userData) {
    // Calculate the percentage of health the user has
    const percentage = userData.health / userData.maxHealth;

    // Calculate the number of filled and empty parts of the progress bar
    let filled = Math.round(percentage * 8);
    filled = Math.min(8, filled); // Ensure filled is not greater than 8
    const empty = Math.max(0, 8 - filled); // Ensure empty is not less than 0

    // Create the progress bar string
    const progressBar = '<:healthbarfilled:1192950502179209276>'.repeat(filled) + '<:healthbarempty:1192950495208296569>'.repeat(empty);

    return progressBar;
}

function createEnergyProgressBar(userData) {
    // Calculate the percentage of energy the user has
    const percentage = userData.energy / userData.maxEnergy;

    // Calculate the number of filled and empty parts of the progress bar
    let filled = Math.round(percentage * 8);
    filled = Math.min(8, filled); // Ensure filled is not greater than 8
    const empty = Math.max(0, 8 - filled); // Ensure empty is not less than 0

    // Create the progress bar string
    const progressBar = '<:energybarfilled:1192950499889119252>'.repeat(filled) + '<:energybarempty:1192950498152685588>'.repeat(empty);

    return progressBar;
}

module.exports = {
    createXPProgressBar,
    createHealthProgressBar,
    createEnergyProgressBar,
};