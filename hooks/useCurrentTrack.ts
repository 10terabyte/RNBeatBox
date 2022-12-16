import { useState, useEffect } from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import type { Track } from 'react-native-track-player';

export const useCurrentTrack = (): Track | undefined => {
  const [trackIndex, setTrackIndex] = useState<number | undefined>();
  const [track, setTrack] = useState<Track | undefined>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async ({ nextTrack }) => {
    console.log("SetTrackIndex", nextTrack)
    setTrackIndex(nextTrack);
  });
  useEffect(() => {
    console.log("Current Track", trackIndex)
    if (trackIndex === undefined) return;
    (async () => {
      
      TrackPlayer.getTrack(trackIndex).then(track =>{
        console.log("Current Track")
        setTrack(track || undefined);
      }).catch(error =>{
        console.log(error, "Track Set")
      });
      
    })();
  }, [trackIndex]);

  return track;
};
