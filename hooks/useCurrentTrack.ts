import { useState, useEffect } from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
import type { Track } from 'react-native-track-player';

export const useCurrentTrack = (): { currentTrack: Track | undefined, setEmptyTrack:() =>void } => {
  const [trackIndex, setTrackIndex] = useState<number | undefined>();
  const [currentTrack, setTrack] = useState<Track | undefined>();
  const setEmptyTrack = () =>{
    console.log('-----------------Track Empty----------------')
    setTrack(undefined)
    setTrackIndex(undefined)
    
  }
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async ({ nextTrack }) => {
    console.log("SetTrackIndex", nextTrack)
    setTrackIndex(nextTrack);
  });
  useEffect(() => {
    console.log("Current Track", trackIndex)
    if (trackIndex === undefined )  {
      setTrack(undefined);
      return;
    }
    (async () => {
      TrackPlayer.getTrack(trackIndex).then(track =>{
        console.log("Current Track after get ", track)
        setTrack(track || undefined);
      }).catch(error =>{
        setTrack(undefined);
        console.log(error, "Track Set")
      });
      
    })();
  }, [trackIndex]);
  console.log(currentTrack,"in useCurrentTrack")
  return {currentTrack, setEmptyTrack};
};
