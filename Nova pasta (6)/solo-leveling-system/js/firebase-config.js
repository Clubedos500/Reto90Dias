/**
 * Firebase Configuration
 */
const firebaseConfig = {
  apiKey: "AIzaSyA6ZMgqJWDteJzQsBINMv9aGNU5uktY2YU",
  authDomain: "atividade-fisica-ae069.firebaseapp.com",
  projectId: "atividade-fisica-ae069",
  storageBucket: "atividade-fisica-ae069.firebasestorage.app",
  messagingSenderId: "861848484018",
  appId: "1:861848484018:web:e586a285383c98264171ab",
  measurementId: "G-KHGCWRMZFB",
  vapidKey: "BGVhYpwwn92Jh6Fn0KAYQG3Go3fqI1Xvfaa4yQWEJagllXwerC0sZ4jLFy5KIvkVXIpNbAc6UFHtmGsNjuXV1SU"
};

// Initialize Firebase
// Check if firebase is already initialized to avoid errors
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase Initialized");
} else {
    firebase.app(); // if already initialized, use that one
}

// Expose services globally if needed, though firebase.auth() works directly
const auth = firebase.auth();
const db = firebase.firestore();
