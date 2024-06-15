/**
 * Check if a given string represents a valid image file (jpg, jpeg, png, gif).
 * @param {string} str - The string to be checked.
 * @returns {boolean} True if the string represents a valid image file, false otherwise.
 */
function imageFile(str) {
    // Regular expression to check for valid image file extensions
    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif)$/);

    // If the input string is empty, return false
    if (str == null) {
        return false;
    }

    // Return true if the input string matches the regular expression
    if (regex.test(str) == true) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Check if a given file path represents a valid audio file (mp3, wav, ogg, flac, m4a, mp4).
 * @param {string} filePath - The file path to be checked.
 * @returns {boolean} True if the file path represents a valid audio file, false otherwise.
 */
function isAudioFile(filePath) {
    const audioFileRegex = /\.(mp3|wav|ogg|flac|m4a|mp4)$/i;

    // If the file path is empty, return false
    if (filePath == null) {
        return false;
    }

    // Return true if the file path matches the audio file regex
    if (audioFileRegex.test(filePath) == true) {
        return true;
    }
    else {
        return false;
    }
}

// Export the functions for external use
module.exports = {
    isAudioFile,
    imageFile
};
