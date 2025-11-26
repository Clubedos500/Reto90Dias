/**
 * System Core Logic
 * Handles User Data, Stats, XP, and Leveling
 */

const System = {
    data: {
        user: {
            name: "JIN-WOO",
            job: "SHADOW MONARCH",
            level: 1,
            xp: 0,
            xpToNext: 100,
            stats: {
                str: 10,
                vit: 10,
                int: 10,
                per: 10,
                agi: 10
            },
            streak: 0,
            lastLogin: null
        }
    },

    init: (user) => {
        System.currentUser = user;
        if (user) {
            // Try to load from Cloud first
            Database.init(user);
        } else {
            System.loadData();
        }
        
        // We wait a bit for cloud sync if needed, but for now just proceed
        // In a real app, we'd show a loader until Database.syncData() finishes
        
        System.checkDailyReset();
        UI.updateStats();
    },

    loadData: () => {
        const saved = localStorage.getItem('sl_system_data');
        if (saved) {
            System.data = JSON.parse(saved);
        } else {
            // Default data
        }
    },

    saveData: (syncToCloud = true) => {
        localStorage.setItem('sl_system_data', JSON.stringify(System.data));
        if (syncToCloud && System.currentUser) {
            Database.save();
        }
    },

    checkDailyReset: () => {
        const today = new Date().toDateString();
        if (System.data.user.lastLogin !== today) {
            // Check if missed a day (simple check: if lastLogin was not yesterday)
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (System.data.user.lastLogin && System.data.user.lastLogin !== yesterday.toDateString()) {
                 UI.showModal("PENALTY ZONE", "You failed to complete daily quests yesterday.\nSurvival requires constancy.");
            }

            // New Day Logic
            System.data.user.lastLogin = today;
            Quests.generateDailyQuests();
            System.saveData();
            UI.showNotification("DAILY QUESTS UPDATED");
        }
    },

    addXP: (amount) => {
        System.data.user.xp += amount;
        UI.showNotification(`RECEIVED ${amount} XP`);
        
        if (System.data.user.xp >= System.data.user.xpToNext) {
            System.levelUp();
        } else {
            System.saveData();
            UI.updateStats();
        }
    },

    levelUp: () => {
        System.data.user.level++;
        System.data.user.xp -= System.data.user.xpToNext;
        System.data.user.xpToNext = Math.floor(System.data.user.xpToNext * 1.2);
        
        // Increase random stats for now, or give points (simplified: auto increase)
        System.data.user.stats.str += 1;
        System.data.user.stats.vit += 1;
        System.data.user.stats.int += 1;
        System.data.user.stats.per += 1;
        System.data.user.stats.agi += 1;

        System.saveData();
        UI.updateStats();
        UI.showModal("LEVEL UP!", `You have reached Level ${System.data.user.level}.\nAll stats increased by +1.`);
    },

    increaseStat: (stat, amount) => {
        if (System.data.user.stats[stat] !== undefined) {
            System.data.user.stats[stat] += amount;
            System.saveData();
            UI.updateStats();
            UI.showNotification(`${stat.toUpperCase()} INCREASED BY ${amount}`);
        }
    }
};
