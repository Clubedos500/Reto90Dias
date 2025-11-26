/**
 * Quest Management
 * Generates and tracks daily quests
 */

const Quests = {
    list: [],
    
    templates: [
        { title: "Flexões: 10 Reps", type: "DAILY", difficulty: "E", rewards: { xp: 10, stat: "str", val: 1 } },
        { title: "Agachamentos: 10 Reps", type: "DAILY", difficulty: "E", rewards: { xp: 10, stat: "str", val: 1 } },
        { title: "Corrida: 1km", type: "DAILY", difficulty: "D", rewards: { xp: 20, stat: "agi", val: 1 } },
        { title: "Leitura: 10 Páginas", type: "DAILY", difficulty: "E", rewards: { xp: 15, stat: "int", val: 1 } },
        { title: "Meditação: 5 Min", type: "DAILY", difficulty: "E", rewards: { xp: 10, stat: "per", val: 1 } },
        { title: "Beber Água: 2L", type: "DAILY", difficulty: "E", rewards: { xp: 5, stat: "vit", val: 1 } },
        { title: "Estudar: 30 Min", type: "DAILY", difficulty: "D", rewards: { xp: 25, stat: "int", val: 1 } }
    ],

    init: () => {
        Quests.loadQuests();
        UI.renderQuests();
        Quests.startTimer();
    },

    loadQuests: () => {
        const saved = localStorage.getItem('sl_quests');
        if (saved) {
            Quests.list = JSON.parse(saved);
        }
    },

    saveQuests: (syncToCloud = true) => {
        localStorage.setItem('sl_quests', JSON.stringify(Quests.list));
        if (syncToCloud && System.currentUser) {
            Database.save();
        }
    },

    generateDailyQuests: () => {
        // Clear old dailies
        Quests.list = [];
        
        // Pick 4 random quests
        const shuffled = [...Quests.templates].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);

        selected.forEach((tmpl, index) => {
            Quests.list.push({
                id: `q_${Date.now()}_${index}`,
                ...tmpl,
                status: "PENDING"
            });
        });

        // Add the "Penalty" quest (hidden until failure, but logic exists)
        // For now, just save
        Quests.saveQuests();
    },

    completeQuest: (id) => {
        const quest = Quests.list.find(q => q.id === id);
        if (quest && quest.status !== "COMPLETED") {
            quest.status = "COMPLETED";
            Quests.saveQuests();
            
            // Give Rewards
            System.addXP(quest.rewards.xp);
            if (quest.rewards.stat) {
                System.increaseStat(quest.rewards.stat, quest.rewards.val);
            }

            UI.renderQuests();
        }
    },

    addCustomQuest: (title, difficulty) => {
        const rewardsMap = {
            'E': 10, 'D': 20, 'C': 40, 'B': 80, 'A': 150, 'S': 300
        };
        
        const newQuest = {
            id: `custom_${Date.now()}`,
            title: title,
            type: "CUSTOM",
            difficulty: difficulty,
            status: "PENDING",
            rewards: { xp: rewardsMap[difficulty] || 10, stat: null, val: 0 }
        };

        Quests.list.push(newQuest);
        Quests.saveQuests();
        UI.renderQuests();
    },

    startTimer: () => {
        setInterval(() => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            const diff = tomorrow - now;
            const h = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const s = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
            
            const el = document.getElementById('quest-timer');
            if(el) el.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }
};
