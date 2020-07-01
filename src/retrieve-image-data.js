const db = firebase.firestore();
const imageData = db.collection('image-data');


async function charCoords(imageName, char) {
    const snapshot = await imageData.get()
    return snapshot.docs.map(doc => doc.data())[0][imageName][char];
}

export { charCoords }