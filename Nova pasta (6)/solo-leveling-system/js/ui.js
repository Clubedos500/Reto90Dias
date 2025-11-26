/**
 * UI Controller
 * Handles DOM updates and interactions
 */

const UI = {
    init: () => {
        // Add Quest Button
        document.getElementById('btn-add-quest').addEventListener('click', () => {
            const title = prompt("Enter Quest Title:");
            if (title) {
                Quests.addCustomQuest(title, "E");
            }
        });
    },

    updateStats: () => {
        const user = System.data.user;
        
        document.getElementById('player-name').textContent = user.name;
        document.getElementById('player-job').textContent = user.job;
        document.getElementById('player-level').textContent = user.level;
        
        document.getElementById('stat-str').textContent = user.stats.str;
        document.getElementById('stat-vit').textContent = user.stats.vit;
        document.getElementById('stat-int').textContent = user.stats.int;
        document.getElementById('stat-per').textContent = user.stats.per;
        document.getElementById('stat-agi').textContent = user.stats.agi;

        // XP Bar
        document.getElementById('xp-current').textContent = user.xp;
        document.getElementById('xp-max').textContent = user.xpToNext;
        
        const pct = Math.min(100, (user.xp / user.xpToNext) * 100);
        document.getElementById('xp-fill').style.width = `${pct}%`;
    },

    renderQuests: () => {
        const container = document.getElementById('quest-list');
        container.innerHTML = '';

        Quests.list.forEach(q => {
            const el = document.createElement('div');
            el.className = `quest-item ${q.status.toLowerCase()}`;
            
            const isChecked = q.status === 'COMPLETED' ? 'checked' : '';
            
            el.innerHTML = `
                <div class="quest-checkbox ${isChecked}" onclick="UI.toggleQuest('${q.id}')"></div>
                <div class="quest-info">
                    <h4>[${q.difficulty}] ${q.title}</h4>
                    <div class="quest-rewards">Rewards: ${q.rewards.xp} XP ${q.rewards.stat ? `+1 ${q.rewards.stat.toUpperCase()}` : ''}</div>
                </div>
            `;
            container.appendChild(el);
        });
    },

    toggleQuest: (id) => {
        const quest = Quests.list.find(q => q.id === id);
        if (quest && quest.status === 'PENDING') {
            Quests.completeQuest(id);
        }
    },

    showNotification: (msg) => {
        const area = document.getElementById('notification-area');
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = msg;
        area.appendChild(notif);

        setTimeout(() => {
            notif.remove();
        }, 3000);
    },

    showModal: (title, msg) => {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').innerText = msg;
        document.getElementById('system-modal').classList.remove('hidden');
    },

    closeModal: () => {
        document.getElementById('system-modal').classList.add('hidden');
    }
};
