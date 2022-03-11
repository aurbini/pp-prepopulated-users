export const reverseName = (name: string): string => {
    let reverseName: string = '';
    const nameSplit = name.split(',');
    for (let i = nameSplit.length; i > 0; i--) {
        reverseName += nameSplit[i];
    }
    return reverseName;
};
