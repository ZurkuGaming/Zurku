module.exports = [
    {
        itemName: 'Stellarium Ore',
        itemValue: 1,
        itemType: 'Mining',
        description: 'Ore infused with the essence of stars.',
        itemLevel: 0,
    },
    {
        name: 'Galvanium Ore',
        itemValue: 5,
        itemType: 'Mining',
        description: 'Ore infused with the essence of storms.',
        itemLevel: 5,
    },
    {
        name: 'Eclipsium Ore',
        itemValue: 10,
        itemType: 'Mining',
        description: 'Ore infused with the essence of shadows.',
        itemLevel: 10,
    },
    {
        name: 'Lunarite Ore',
        itemValue: 15,
        itemType: 'Mining',
        description: 'Ore infused with the essence of moonlight.',
        itemLevel: 15,
    },
    {
        name: 'Nebulaflare Ore',
        itemValue: 20,
        itemType: 'Mining',
        description: 'Ore infused with the essence of nebula.',
        itemLevel: 20,
    },
    {
        name: 'Phoenixium Ore',
        itemValue: 25,
        itemType: 'Mining',
        description: 'Ore infused with the essence of rebirth.',
        itemLevel: 25,
    },
].map((item, index) => ({ id: index, ...item }));