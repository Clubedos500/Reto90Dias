/**
 * Database Handler
 * Syncs LocalStorage with Supabase Postgres
 */

const Database = {
    userId: null,

    init: async (user) => {
        if (user) {
            Database.userId = user.id;
            await Database.syncData();
        }
    },

    syncData: async () => {
        if (!Database.userId) return;

        try {
            // Fetch profile
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', Database.userId)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
                console.error("Error fetching profile:", error);
                return;
            }

            if (data) {
                // Cloud data exists, update local
                console.log("Cloud data found, syncing...");
                
                if (data.system_data && Object.keys(data.system_data).length > 0) {
                    System.data = data.system_data;
                    System.saveData(false); // Save local only, don't loop back to cloud
                    UI.updateStats();
                }
                
                if (data.quests && data.quests.length > 0) {
                    Quests.list = data.quests;
                    Quests.saveQuests(false); // Save local only
                    UI.renderQuests();
                }
            } else {
                // No profile found, create one with local data
                console.log("No cloud profile, creating...");
                Database.save();
            }
        } catch (e) {
            console.error("Error syncing DB:", e);
        }
    },

    save: async () => {
        if (!Database.userId) return;

        const payload = {
            id: Database.userId,
            email: System.currentUser ? System.currentUser.email : null,
            system_data: System.data,
            quests: Quests.list,
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from('profiles')
            .upsert(payload);

        if (error) {
            console.error("Save error:", error);
        } else {
            console.log("Data saved to Cloud");
        }
    }
};
