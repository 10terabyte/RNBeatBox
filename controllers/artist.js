import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const followsCollection = firestore().collection('follows');
const artistCollection = firestore().collection('artists')
export const handleFollow = (artistID, userID) => {
    return new Promise(function (resolve, reject) {
        console.log(artistID, userID)
        followsCollection.where("target", "==", artistID).where('follower', '==', userID).get().then(querySnapshot => {
            if (querySnapshot.size) {
                querySnapshot.forEach(result => {
                    console.log(result.ref.delete())
                })
                artistCollection.doc(artistID).get().then(docRes =>{
                    let oldFollows = (docRes.data().follows || 0)
                    if(oldFollows){
                        artistCollection.doc(artistID).update({follows: oldFollows  - 1})
                        resolve({
                            status: "success",
                            message: "You unfollowed this artist successfully."
                        })
                    }
                    else{
                        resolve({
                            status: "success",
                            message: "You unfollowed this artist successfully."
                        })
                    }
                    
                }).catch(error =>{
                    reject(error)
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
                    artistCollection.doc(artistID).get().then(docRes =>{
                        let oldFollows = (docRes.data().follows || 0)
                        artistCollection.doc(artistID).update({follows: oldFollows + 1})
                        resolve({
                            status: "success",
                            message: "You followed this artist successfully."
                        })
                    }).catch(error =>{
                        reject(error)
                    })
                    
                });
            }
        }).catch(error => {
            reject(error)
        });
    });

}

