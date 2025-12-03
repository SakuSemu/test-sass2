// Enhanced shop items with V3 utility system
export const shopItems = [
    {
        id: 1,
        name: 'Cool Hat',
        price: 50,
        emoji: '🧢',
        type: 'hat',
        buff: {
            type: 'coinBonus',
            value: 10, // +10% coins
            description: '+10% bonus coins from correct answers'
        },
        unlockLevel: 1,
        description: 'A stylish cap that helps you think better! Earn extra coins with every correct answer.'
    },
    {
        id: 2,
        name: 'Skateboard',
        price: 150,
        emoji: '🛹',
        type: 'accessory',
        buff: {
            type: 'xpBoost',
            value: 15, // +15% XP
            description: '+15% XP boost from all activities'
        },
        unlockLevel: 3,
        description: 'Cruise through lessons faster! This skateboard gives you an XP boost.'
    },
    {
        id: 3,
        name: 'Guitar',
        price: 300,
        emoji: '🎸',
        type: 'accessory',
        buff: {
            type: 'special',
            value: 1,
            description: 'Unlocks celebration sound effects'
        },
        unlockLevel: 5,
        description: 'Rock out when you level up! Adds fun sound effects to your achievements.'
    },
    {
        id: 4,
        name: 'Robot Pet',
        price: 500,
        emoji: '🤖',
        type: 'pet',
        buff: {
            type: 'hint',
            value: 1,
            description: 'Gives hints in challenging games'
        },
        unlockLevel: 7,
        description: 'Your helpful companion! Get hints when you\'re stuck on tough questions.'
    },
    {
        id: 5,
        name: 'Super Cape',
        price: 100,
        emoji: '🦸',
        type: 'cape',
        buff: {
            type: 'dailyBonus',
            value: 5,
            description: '+5 coins daily login bonus'
        },
        unlockLevel: 2,
        description: 'Feel like a superhero! Earn bonus coins just for logging in each day.'
    },
    {
        id: 6,
        name: 'Telescope',
        price: 250,
        emoji: '🔭',
        type: 'accessory',
        buff: {
            type: 'special',
            value: 1,
            description: 'Unlocks Space Savings Goal theme'
        },
        unlockLevel: 4,
        description: 'Reach for the stars! Unlocks a special space-themed savings goal.'
    },
];

export const getItemById = (id) => shopItems.find(item => item.id === id);
export const getItemsByLevel = (level) => shopItems.filter(item => item.unlockLevel <= level);
