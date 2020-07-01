const db = firebase.firestore();
const imageData = db.collection('image-data');


const charCoords = (imageName, char) => {
    imageData.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data()[imageName][char]);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

export { charCoords }