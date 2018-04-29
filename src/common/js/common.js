let common = {
    //传入音乐信息，返回歌手、专辑信息对象
    artistsAlbumInfo: function (obj) {
        let allArtists = '', album = '',allInfo = {};
        let artLen = obj.artists.length;
        for (let i = 0;i < artLen;i++) {
            allArtists += obj.artists[i].name;
            if (i+1 < artLen) 
            allArtists += '/'
        }
        album = obj.album.name;
        allInfo.artists = allArtists;
        allInfo.album = album;
        allInfo.artistsAndAlbum = allArtists + ' - ' + album;
        return allInfo;
    },
    //从传入的数组中随机取n个不重复的数据 返回新数组
    getNFromArrRandom: function (arr, n) {
        let newArr = [];
        for (let i = 0;i < n;i++) {
            let random = Math.floor(Math.random()*arr.length);
            if (arr[random] != null) {
                newArr.push(arr[random]);
                arr[random] = null;
            } else {
                i--;
            }
            
        }
        return newArr;
    }
}

export default common;