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
    }
}

export default common;