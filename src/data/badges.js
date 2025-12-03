// Badge definitions for achievement system
export const badges = [
    {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Complete your first game',
        emoji: '👣',
        xpReward: 25,
        condition: (stats) => stats.gamesPlayed >= 1
    },
    {
        id: 'saver_lv1',
        name: 'Saver Level 1',
        description: 'Save 50 coins without spending',
        emoji: '💰',
        xpReward: 25,
        condition: (stats) => stats.maxCoins >= 50
    },
    {
        id: 'challenge_champ',
        name: 'Challenge Champion',
        description: 'Get 10 correct answers in a row',
        emoji: '🏆',
        xpReward: 50,
        condition: (stats) => stats.correctStreak >= 10
    },
    {
        id: 'shopaholic',
        name: 'Shopaholic',
        description: 'Purchase 5 items from the shop',
        emoji: '🛍️',
        xpReward: 30,
        condition: (stats) => stats.itemsPurchased >= 5
    },
    {
        id: 'generous_giver',
        name: 'Generous Giver',
        description: 'Donate coins 3 times',
        emoji: '❤️',
        xpReward: 40,
        condition: (stats) => stats.donations >= 3
    },
    {
        id: 'perfect_week',
        name: 'Perfect Week',
        description: 'Log in 7 days in a row',
        emoji: '📅',
        xpReward: 75,
        condition: (stats) => stats.loginStreak >= 7
    },
    {
        id: 'level_5',
        name: 'Rising Star',
        description: 'Reach level 5',
        emoji: '⭐',
        xpReward: 100,
        condition: (stats) => stats.level >= 5
    },
    {
        id: 'game_master',
        name: 'Game Master',
        description: 'Complete all 4 mini-games',
        emoji: '🎮',
        xpReward: 60,
        condition: (stats) => stats.uniqueGamesCompleted >= 4
    },
    {
        id: 'smart_spender',
        name: 'Smart Spender',
        description: 'Make 10 correct "Need vs Want" choices',
        emoji: '🧠',
        xpReward: 35,
        condition: (stats) => stats.needsVsWantsCorrect >= 10
    },
    {
        id: 'money_master',
        name: 'Money Master',
        description: 'Reach level 10',
        emoji: '👑',
        xpReward: 200,
        condition: (stats) => stats.level >= 10
    }
];

export const getBadgeById = (id) => badges.find(badge => badge.id === id);
export const checkBadgeConditions = (stats) => {
    return badges.filter(badge =>
        badge.condition(stats) && !stats.unlockedBadges?.includes(badge.id)
    );
};
