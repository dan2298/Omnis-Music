import { Audio } from 'expo-av'
const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

export async function setAudioMode() {
    await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
    })
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

export function onForwardPress() {
    if (this.props.addedQueue.length) {
        this.props.getCurrentSong(this.props.addedQueue[0])
        this.loadPlayback(this.props.addedQueue[0])
        this.props.finishSong()
    } else {
        if (this.playbackInstance != null) {
            this.advanceIndex(1);
        }
    }
}

export function onBackwardPress() {
    if (this.playbackInstance != null) {
        if (this.state.playbackInstancePosition > 3000) {
            this.setState({ isPlaying: false })
            this.loadPlayback(this.props.currentSong)
        } else {
            if (this.props.currentSong.onQueue) {
                this.advanceIndex(0)
            } else {
                this.advanceIndex(-1);
            }
        }
    }
}

export function advancedIndex(forward) {
    if (this.props.list[this.index + forward]) {
        this.index += forward
        this.props.getCurrentSong(this.props.list[this.index])
        this.loadPlayback()
        this.props.getQueue()
    }
}

export function onLoopPress() {
    if (this.playbackInstance != null) {
        this.playbackInstance.setIsLoopingAsync(
            this.state.loopingType !== LOOPING_TYPE_ONE
        );
    }
};

export function onShufflePress() {
    if (!this.props.buttons.shufflePressed) {
        this.props.shuffleList()
        this.props.getQueue()
        this.index = 0
    } else {
        this.props.getOriginalList()
        this.props.getQueue(true)
        for (let i = 0; i < this.props.songs.length; i++) {
            if (this.props.currentSong.fileName === this.props.songs[i].fileName) {
                this.index = i
                break;
            }
        }
    }
}

export function playbackPressed(song) {
    if (song.onQueue) {

    } else {
        for (let i = 0; i < this.props.list.length; i++) {
            if (song.fileName === this.props.list[i].fileName) {
                this.index = i
                break;
            }
        }
        this.setState({ isPlaying: false })
        this.loadPlayback(song)
        this.props.getCurrentSong(song)
        this.props.getQueue()
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
        return {
            position: this.getMMSSFromMillis(this.state.playbackInstancePosition),
            duration: this.getMMSSFromMillis(this.state.playbackInstanceDuration)
        }
    }
    return "";
}

export async function rateSliderSlidingComplete(value) {
    this.trySetRate(value, this.state.shouldCorrectPitch);
}

export async function setRate(rate, shouldCorrectPitch) {
    if (this.playbackInstance != null) {
        try {
            await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
        } catch (error) {
            console.log(error)
        }
    }
}