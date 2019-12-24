import { Audio } from 'expo-av'

export async function setAudioMode() {
    try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        })
    } catch (err) {
        console.log(err)
    }
}

export async function playOrPause() {
    if (this.playbackInstance != null) {
        if (this.state.isPlaying) {
            this.playbackInstance.pauseAsync();
            this.props.pause()
        } else {
            this.playbackInstance.playAsync();
            this.props.play()
        }
    }
}

export function sliderValueChange(value) {
    if (this.playbackInstance != null && !this.isSeeking) {
        this.isSeeking = true;
        this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
        this.playbackInstance.pauseAsync();
    }
};

export async function sliderSlidingComplete(value) {
    if (this.playbackInstance != null) {
        this.isSeeking = false;
        const seekPosition = value * this.state.playbackInstanceDuration;
        if (this.shouldPlayAtEndOfSeek) {
            this.playbackInstance.playFromPositionAsync(seekPosition);
        } else {
            this.playbackInstance.setPositionAsync(seekPosition);
        }
    }
}

export function seekSliderPosition() {
    if (
        this.playbackInstance != null &&
        this.state.playbackInstancePosition != null &&
        this.state.playbackInstanceDuration != null
    ) {
        return (
            this.state.playbackInstancePosition /
            this.state.playbackInstanceDuration
        );
    }
    return 0;
}

export function MMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
        const string = number.toString();
        if (number < 10) {
            return "0" + string;
        }
        return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
}

export function timestamp() {
    if (
        this.playbackInstance != null &&
        this.state.playbackInstancePosition != null &&
        this.state.playbackInstanceDuration != null
    ) {
        return `${this.getMMSSFromMillis(
            this.state.playbackInstancePosition
        )} / ${this.getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
}