const db = firebase.firestore();
const imageData = db.collection('image-data');


async function firebaseData() {
    const snapshot = await imageData.get()
    return snapshot.docs.map(doc => doc.data());
}

export { firebaseData }