import { ReactNative } from "@vendetta/metro/common"

const { DCDSoundManager } = ReactNative.NativeModules;

const soundUrl = "https://raw.githubusercontent.com/Rico040/meine-themen/master/sounds/discordo-discord.mp3";
const soundId = 6970;
let soundDuration = -1;

// Function to prepare the sound
const prepareSound = function () {
    return new Promise(function (resolve) {
        DCDSoundManager.prepare(soundUrl, "notification", soundId, function (error, sound) {
            resolve(sound);
        });
    });
};

// Variables to manage sound playback state
let timeoutId = null;
let isPlaying = false;

// Function to play the sound, thanks to moyai obfuscated code
async function playSound() {
    if (isPlaying) {
        if (timeoutId != null) clearTimeout(timeoutId);
        DCDSoundManager.stop(soundId);
        isPlaying = false;
    }
    isPlaying = true;
    await DCDSoundManager.play(soundId);
    timeoutId = setTimeout(function () {
        isPlaying = false;
        DCDSoundManager.stop(soundId);
        timeoutId = null;
    }, soundDuration);
}
let isPrepared = false;

export default {
    onLoad: () => {
        if (!isPrepared) {
            prepareSound().then(function (sound) {
                isPrepared = true;
                soundDuration = sound.duration;
                playSound()
            });
        }
    }
}