import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const beatPlayLogCollection = firestore().collection('beatPlayLog');
const beatFavoriteCollection = firestore().collection('beatFavorites');

const beatCollection = firestore().collection('beats')
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
export const savePlayLog = (beatID, userID) => {
    return new Promise(function (resolve, reject) {
        beatPlayLogCollection.add(
            {
                target: beatID,
                player: userID,
                created: database().getServerTime()
            }
        ).then(result => {
            beatCollection.doc(beatID).get().then(docRes => {
                let oldPlayCount = (docRes.data().playCount || 0)
                beatCollection.doc(beatID).update({ playCount: oldPlayCount + 1 })
                resolve({
                    status: "success",
                })
            }).catch(error => {
                reject(error)
            })

        }).catch(error => {
            reject(error)
        });
    });
}

export const playBeat = async (musicItem, userID) => {
    console.log("Play Beat Function", userID, musicItem.key)
    return new Promise(function (resolve, reject) {
        savePlayLog(musicItem.key, userID).then(result => {
            // setCurrentTrack(undefined)
            TrackPlayer.reset().then(() =>{
                var track = {
                    url: musicItem.track_file, // Load media from the network
                    title: musicItem.track_name,
                    artist: musicItem.singer,
                    album: musicItem.genre,
                    genre: musicItem.genre,
                    artwork: musicItem.track_thumbnail, // Load artwork from the network
                    amount_of_credits: musicItem.amount_of_credits
                };
                TrackPlayer.add([track]).then(result => {
                //   TrackPlayer.skipToNext()
                  TrackPlayer.play()
                  resolve({status: 'success'})
                }).catch(error => {
                    reject(error)
                })
            })
            
            // console.log(music, "MUSIC")

        }).catch(error => {
            reject(error)
        })
    });


}

// export handleFavorite
export const favoriteBeat = (beatID, userID) => {
    return new Promise(function (resolve, reject) {
        console.log(beatID, userID)
        beatFavoriteCollection.where("target", "==", beatID).where('userid', '==', userID).get().then(querySnapshot => {
            if (querySnapshot.size) {
                querySnapshot.forEach(result => {
                    console.log(result.ref.delete())
                })
                beatCollection.doc(beatID).get().then(docRes =>{
                    let oldFollows = (docRes.data().follows || 0)
                    if(oldFollows){
                        beatCollection.doc(beatID).update({follows: oldFollows  - 1})
                        resolve({
                            status: "success",
                            message: "You unfollowed this beat successfully."
                        })
                    }
                    else{
                        resolve({
                            status: "success",
                            message: "You unfollowed this beat successfully."
                        })
                    }

                }).catch(error =>{
                    reject(error)
                })

            }
            else {
                beatFavoriteCollection.add(
                    {
                        target: beatID,
                        userid: userID,
                        created: database().getServerTime()
                    }
                ).then(result => {
                    beatCollection.doc(beatID).get().then(docRes =>{
                        let oldFollows = (docRes.data().follows || 0)
                        beatCollection.doc(beatID).update({follows: oldFollows + 1})
                        resolve({
                            status: "success",
                            message: "You followed this beat successfully."
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
