import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const beatPlayLogCollection = firestore().collection('beatPlayLog');
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
    return new Promise(function (resolve, reject) {
        savePlayLog(musicItem.key, userID).then(result => {
            var track = {
                url: musicItem.track_file, // Load media from the network
                title: musicItem.track_name,
                artist: musicItem.singer,
                album: musicItem.genre,
                genre: musicItem.genre,
                artwork: musicItem.track_thumbnail, // Load artwork from the network
            };
            TrackPlayer.add([track]).then(result => {
            TrackPlayer.skipToNext()
            TrackPlayer.play()
            resolve({status: 'success'})
            }).catch(error => {
                reject(error)
            })
            // console.log(music, "MUSIC")

        }).catch(error => {
            reject(error)
        })
    });


}