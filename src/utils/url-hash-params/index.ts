type UrlHashParamKey = 'mapCenter';

export { saveMapCenterToHashParams, getMapCenterFromHashParams } from './map';

const getHashParams = () => {
    return new URLSearchParams(window.location.hash.slice(1));
};

/**
 * update Hash Params in the URL using data from hashParams
 */
export const updateHashParams = (key: UrlHashParamKey, value: string) => {
    const hashParams = getHashParams();

    if (value === undefined || value === null) {
        hashParams.delete(key);
    } else {
        hashParams.set(key, value);
    }

    // window.location.hash = hashParams.toString();

    // Get the current URL without the hash
    const baseUrl = window.location.href.split('#')[0];

    const newHash = hashParams.toString();

    const newUrl = `${baseUrl}#${newHash}`;

    // Update the URL using replaceState
    window.history.replaceState(null, '', newUrl);
};

export const getHashParamValueByKey = (key: UrlHashParamKey): string => {
    const hashParams = getHashParams();

    if (!hashParams.has(key)) {
        return null;
    }

    return hashParams.get(key);
};
