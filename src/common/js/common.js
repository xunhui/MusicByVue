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
    },
    //随机播放一：从播放列表随机取一首与上一首不同的歌(Random)
    getDifRandomFromArr: function (arr, nowIndex) {
        if (arr.length == 1) {
            return 0;
        }
        let randomIndex = Math.floor(Math.random() * arr.length);
        while (randomIndex == nowIndex) {
            randomIndex = Math.floor(Math.random() * arr.length);
        }
        console.log()
        return randomIndex;
    },
    //随机播放二：打乱播放列表(Shuffle)
    getFromShuffleArr: function (arr) {
        let temp;
        for (let i = arr.length - 1;i > 0;i++) {
            let random = Math.floor(Math.random() * (i+1));
            temp = arr[i];
            arr[i] = arr[random];
            arr[random] = temp;
        }
        return arr;
    },
    //将音频总时长的秒数返回成xx分:xx秒的格式
    getFormatTimeFromDuration: function (duration) {
        let minute = Math.floor(duration/60).toString();
        let seconds = Math.floor(duration%60);
        if (seconds < 10) {
            seconds = '0' + seconds.toString();
        } else {
            seconds = seconds.toString();
        }
        return minute + ':' + seconds;
        console.log(minute + ':' + seconds)
    }
}

export default common;