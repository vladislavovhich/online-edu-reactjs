export function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash); 
    }

    let color = '#';

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF; 

        color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
}

export function stringAvatar(name: string, width: number, height: number) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width,
            height
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}