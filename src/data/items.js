module.exports = [
    {
        itemName: 'Stellarium Ore',
        itemValue: 1,
        itemType: 'Mining',
        description: 'Ore infused with the essence of stars.',
        level: 0,
    },
    {
        name: 'Galvanium Ore',
        itemValue: 5,
        itemType: 'Mining',
        description: 'Ore infused with the essence of storms.',
        level: 5,
    },
    {
        name: 'Eclipsium Ore',
        itemValue: 10,
        itemType: 'Mining',
        description: 'Ore infused with the essence of shadows.',
        level: 10,
    },
    {
        name: 'Lunarite Ore',
        itemValue: 15,
        itemType: 'Mining',
        description: 'Ore infused with the essence of moonlight.',
        level: 15,
    },
    {
        name: 'Nebulaflare Ore',
        itemValue: 20,
        itemType: 'Mining',
        description: 'Ore infused with the essence of nebula.',
        level: 20,
    },
    {
        name: 'Phoenixium Ore',
        itemValue: 25,
        itemType: 'Mining',
        description: 'Ore infused with the essence of rebirth.',
        level: 25,
    },
].map((item, index) => ({ id: index, ...item }));