/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 52. Workout Playlist
//
// You are given an array containing the lengths of available songs.
// Determine whether it is possible to create a playlist whose total length is
// exactly equal to workoutLength, subject to the restriction that each song
// may appear at most maxTimes times in the playlist.
//
// Return true if such a playlist exists, and false otherwise.
//
// Throw an Error if workoutLength, maxTimes, or any song length is negative.
//
// Examples:
//
// canMakePlaylist([3, 5, 7], 10, 2);      // true  (3 + 7)
// canMakePlaylist([4], 8, 2);             // true  (4 + 4)
// canMakePlaylist([4], 12, 2);            // false
// canMakePlaylist([5, 9], 8, 3);          // false
// canMakePlaylist([], 0, 2);              // true
// canMakePlaylist([], 5, 2);              // false
// canMakePlaylist([2, 3], 7, 2);          // true  (2 + 2 + 3)
// canMakePlaylist([2, 3], 9, 2);          // false

var canMakePlaylist = function (songLengths, workoutLength, maxTimes) {
};
