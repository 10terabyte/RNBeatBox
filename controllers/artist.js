import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const followsCollection = firestore().collection('follows');
export const handleFollow = (artistID, userID) => {
    return new Promise(function (resolve, reject) {
        followsCollection.where("target", "==", artistID).where('follower', '==', userID).get().then(querySnapshot => {
            if (querySnapshot.size) {
                querySnapshot.forEach(result => {
                    console.log(result.ref.delete())
                })
                resolve({
                    status: "success",
                    message: "You unfollowed this artist successfully."
                })
            }
            else {
                followsCollection.add(
                    {
                        target: artistID,
                        target_item: "artist",
                        follower: userID
                    }
                ).then(result => {
                    resolve({
                        status: "success",
                        message: "You followed this artist successfully."
                    })
                });
            }
        }).catch(error => {
            reject(error)
        });
    });

}

