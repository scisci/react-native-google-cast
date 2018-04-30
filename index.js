import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native'

const { RNGoogleCast: GoogleCast } = NativeModules

import CastButton from './CastButton'
export { CastButton }

type CastState = 'NoDevicesAvailable' | 'NotConnected' | 'Connecting' | 'Connected';

export const states = ['NoDevicesAvailable', 'NotConnected', 'Connecting', 'Connected'];

export default {
  getCastState(): Promise<CastState> {
    return GoogleCast.getCastState()
  },
  castMedia(params: {
    mediaUrl: string,
    title: string,
    subtitle: string,
    studio: string,
    imageUrl: string,
    posterUrl: string,
    streamDuration: number,
    playPosition: number,
  }) {
    return GoogleCast.castMedia(params)
  },
  /**
   * Ends the current session.
   *
   * This is an asynchronous operation.
   *
   * Resolves if the operation has been started successfully, rejects if there is no session currently established or if the operation could not be started.
   *
   * @param {Boolean} stopCasting Whether casting of content on the receiver should be stopped when the session is ended.
   * @returns {Promise}
   */
  endSession(stopCasting: Boolean = false): Promise {
    return GoogleCast.endSession(stopCasting)
  },
  /**
   * Begins (or resumes) playback of the current media item.
   */
  play: GoogleCast.play,
  /**
   * Pauses playback of the current media item.
   */
  pause: GoogleCast.pause,
  /**
   * Stops playback of the current media item.
   */
  stop: GoogleCast.stop,
  /**
   * Seeks to a new position within the current media item.
   *
   * @param {number} playPosition
   */
  seek(playPosition: number) {
    return GoogleCast.seek(playPosition)
  },
  launchExpandedControls: GoogleCast.launchExpandedControls,
  showIntroductoryOverlay: GoogleCast.showIntroductoryOverlay,

  initChannel(namespace: string) {
    return GoogleCast.initChannel(namespace)
  },
  sendMessage(namespace: string, message: string) {
    return GoogleCast.sendMessage(message, namespace)
  },

  // TODO use the same native event interface instead of hacking it here
  EventEmitter:
    Platform.OS === 'ios'
      ? new NativeEventEmitter(GoogleCast)
      : DeviceEventEmitter,

  SESSION_STARTING: GoogleCast.SESSION_STARTING,
  SESSION_STARTED: GoogleCast.SESSION_STARTED,
  SESSION_START_FAILED: GoogleCast.SESSION_START_FAILED,
  SESSION_SUSPENDED: GoogleCast.SESSION_SUSPENDED,
  SESSION_RESUMING: GoogleCast.SESSION_RESUMING,
  SESSION_RESUMED: GoogleCast.SESSION_RESUMED,
  SESSION_ENDING: GoogleCast.SESSION_ENDING,
  SESSION_ENDED: GoogleCast.SESSION_ENDED,

  STATE_CHANGED: GoogleCast.STATE_CHANGED,

  MEDIA_STATUS_UPDATED: GoogleCast.MEDIA_STATUS_UPDATED,
  MEDIA_PLAYBACK_STARTED: GoogleCast.MEDIA_PLAYBACK_STARTED,
  MEDIA_PLAYBACK_ENDED: GoogleCast.MEDIA_PLAYBACK_ENDED,

  CHANNEL_CONNECTED: GoogleCast.CHANNEL_CONNECTED,
  CHANNEL_DISCONNECTED: GoogleCast.CHANNEL_DISCONNECTED,
  CHANNEL_MESSAGE_RECEIVED: GoogleCast.CHANNEL_MESSAGE_RECEIVED,

  STATE_NO_DEVICES_AVAILABLE: 1,
  STATE_NOT_CONNECTED: 2,
  STATE_CONNECTING: 3,
  STATE_CONNECTED: 4,
}
