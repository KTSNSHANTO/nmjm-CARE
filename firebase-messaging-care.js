// Import Firebase scripts (for service worker usage)
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr2PoGkROnTXULmbcHlmv4Inh88fMxpCQ",
  authDomain: "nmjm-care.firebaseapp.com",
  projectId: "nmjm-care",
  storageBucket: "nmjm-care.firebasestorage.app",
  messagingSenderId: "579916912360",
  appId: "1:579916912360:web:9317dcb63282e8d7ba5b5d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Get token with Public VAPID Key
messaging.getToken({
  vapidKey: "BKZE-scOEsXK-I2YzNIMfPZA9kzy1o__TmuIjqJ2vFu2hoao82dPCsd9M0XUxOu7Bo-v-aAJFvcroywDdISdoVQ"
})
.then((token) => {
  console.log("Push Token:", token);

  // OPTIONAL: Send token to your server (if needed in future)
  // fetch('YOUR-SERVER-URL/save-token', {
  //   method: 'POST',
  //   body: JSON.stringify({ token }),
  //   headers: { "Content-Type": "application/json" }
  // });
})
.catch((err) => {
  console.error("Unable to get permission or token:", err);
});

// Background notification handler
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message received:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png"  // Change to your site icon if needed
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
