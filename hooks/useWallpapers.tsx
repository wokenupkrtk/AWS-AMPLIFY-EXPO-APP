export interface Wallpaper {
    url: string;
    name: string;
}

interface FullWallpaper extends Wallpaper {
    liked: boolean;
    suggested: boolean;
    library: boolean;
}

export function useSuggestedWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.suggested);
}

export function useLikedWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.liked);
}

export function useLibraryWallpapers(): FullWallpaper[] {
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.library);
}


export function useWallpapers(): FullWallpaper[] {
    return [{
        url: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
        "name": "Photo1",
        liked: true,
        suggested: true,
        library: false
    }, {
        url: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
        "name": "Photo2",
        liked: true,
        suggested: false,
        library: true
    },
    {
        url: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
        "name": "Photo3",
        liked: false,
        suggested: true,
        library: false
    }, {
        url: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
        name: "Photo4",
        liked: false,
        suggested: true,
        library: false
    }, {
        url: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
        name: "Photo5",
        liked: false,
        suggested: true,
        library: false
    }, {
        url: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
        name: "Photo6",
        liked: false,
        suggested: true,
        library: false
    }]
}