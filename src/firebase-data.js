const db = firebase.firestore();

async function firebaseData(collection) {
  const sect = db.collection(collection);
  const snapshot = await sect.get();
  return snapshot.docs.map((doc) => doc.data())[0];
}

export { firebaseData };
